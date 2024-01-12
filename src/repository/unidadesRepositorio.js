const unidadesModel = require("../models/unidadesModel");
const db = require("../db/dbConfig");
class unidadesRepositorio {
    constructor() {
    }

    async registrarUnidade(nome_unidade) {
        try {
            if(!nome_unidade) {
                throw new Error("Todos os campos devem ser preenchidos.");
            }
            const query = "INSERT INTO unidades (nome_unidade) VALUES (?)";
            await db.query(query, [nome_unidade]);
            const unidade = new unidadesModel({
                nome_unidade
            });
            console.log("Disciplina cadastrada com sucesso.");
            return unidade;
        } catch (error) {
            console.error("Erro ao cadastrar uma nova unidade", error);
            throw error;
        }
    }

    async obterUnidadePorId(id) {
        try {
            const query = "SELECT * FROM unidades WHERE id_unidade = ?";
            const result = await db.query(query, [id]);
            // console.log("Resultado da consulta: ", result);
            if(result[0].length === 0) {
                return null;
            }
            const unidadeData = result[0][0];
            const unidade = new unidadesModel(unidadeData.nome_unidade);
            // console.log("Resultado da inserção da unidade:", unidade);
            return unidade;
        } catch (error) {
            console.error("Erro ao obter a unidade por ID:", error.message);
            throw error;
        }
    }

    async obterTodasUnidades(pageNumber = 1, pageSize = 10) {
        try {
            const offset = (pageNumber - 1) * pageSize;
            const query = "SELECT * FROM unidades LIMIT ?, ?";
            const result = await db.query(query, [offset, pageSize]);
            const unidades = result[0].map(unidadeData => {
                return new unidadesModel(unidadeData.nome_unidade);
            });
    
            // Obter o número total de unidades
            const totalUnidadesQuery = "SELECT COUNT(*) as total FROM unidades";
            const totalUnidadesResult = await db.query(totalUnidadesQuery);
            const totalUnidades = totalUnidadesResult[0][0].total;
            // Calcular o número total de páginas
            const totalPages = Math.ceil(totalUnidades / pageSize);
            // Construir o objeto de resposta incluindo os links para a próxima e a página anterior
            const response = {
                unidades,
                pagination: {
                    currentPage: pageNumber,
                    pageSize,
                    totalItems: totalUnidades,
                    totalPages,
                    hasNextPage: pageNumber < totalPages,
                    hasPreviousPage: pageNumber > 1,
                    nextPage: pageNumber < totalPages ? `/todas_unidades?page=${pageNumber + 1}&pageSize=${pageSize}` : null,
                    previousPage: pageNumber > 1 ? `/todas_unidades?page=${pageNumber - 1}&pageSize=${pageSize}` : null
                }
            };
            return response;
        } catch (error) {
            console.error("Erro ao obter todas as unidades:", error.message);
            throw error;
        }
    }
    
    async atualizarUnidade(id, nome_unidade) {
        try {
            const query = "UPDATE unidades SET nome_unidade = ? WHERE id_unidade = ?";
            await db.query(query, [nome_unidade, id]);
            console.log("Unidade editada com sucesso.");
            const unidadeAtualizada = new unidadesModel(nome_unidade);
            unidadeAtualizada.id = id;
            return unidadeAtualizada;
        } catch (error) {
            console.log("Erro ao atualizar a unidade por ID:", error);
            throw error;
        }
    }

    async excluirUnidadePorId(id) {
        try {
            const unidadeExistente = await this.obterUnidadePorId(id);
            if(!unidadeExistente) {
                throw new Error("Unidade não encontrada para exclusão.");
            }
            const query = "DELETE FROM unidades WHERE id_unidade = ? ";
            await db.query(query, [id]);
            console.log("Unidade excluída com sucesso.");
            return true;
        } catch (error) {
            console.error("Erro ao excluir unidade por ID:", error.message);
            throw error;
        }
    }
}
module.exports = unidadesRepositorio;