const atividadeModel = require("../models/atividadeModel");
const db = require("../db/dbConfig");
class atividadeRepositorio {
    constructor(){
    }

    async registrarAtividade(nome_atividade, id_materia, id_unidade) {
        try {
            if(!nome_atividade || !id_materia || !id_unidade) {
                throw new Error("Todos os campos devem ser preenchidos.")
            }
            const query = "INSERT INTO atividades (nome_atividade, id_materia, id_unidade) VALUES (?, ?, ?)";
            await db.query(query, [nome_atividade, id_materia, id_unidade]);
            const atividade = new atividadeModel({
                nome_atividade,
                id_materia,
                id_unidade
            });
            console.log("Atividade cadastrada com sucesso.");
            return atividade;
        } catch (error) {
            console.error("Erro ao cadastrar uma nova atividade", error);
            throw error;
        }
    }

    async obterAtividadePorId(id) {
        try {
            const query = "SELECT * FROM atividades WHERE id_atividade = ?";
            const result = await db.query(query, [id]);
            // console.log("Resultado da consulta: ", result);
            if(result[0].length === 0) {
                return null;
            }
            const atividadeData = result[0][0];
            const atividade = new atividadeModel(atividadeData.nome_atividade,
                 atividadeData.id_materia,
                 atividadeData.id_unidade
                );

            console.log("Resultado da inserção da unidade:", atividade);
            return atividade;
        } catch (error) {
            console.error("Erro ao obter a atividade por ID:", error.message);
            throw error;
        }
    }

    async obterTodasAtividades(pageNumber = 1, pageSize = 10) {
        try {
            const offset = (pageNumber - 1) * pageSize;
            const query = 'SELECT * FROM atividades LIMIT ?, ?';
            const result = await db.query(query, [offset, pageSize]);

            const atividades = result[0].map(atividadeData => {
                return new atividadeModel(
                    atividadeData.nome_atividade,
                    atividadeData.id_materia,
                    atividadeData.id_unidade
                );
            });

            const totalAtividadesQuery = 'SELECT COUNT(*) as total FROM atividades';
            const totalAtividadesResult = await db.query(totalAtividadesQuery);
            const totalAtividades = totalAtividadesResult[0][0].total;
            const totalPages = Math.ceil(totalAtividades / pageSize);
            const response = {
                atividades,
                pagination: {
                    currentPage: pageNumber,
                    pageSize,
                    totalItems: totalAtividades,
                    totalPages,
                    hasNextPage: pageNumber < totalPages,
                    hasPreviousPage: pageNumber > 1,
                    nextPage: pageNumber < totalPages ? `/atividades?page=${pageNumber + 1}&pageSize=${pageSize}` : null,
                    previousPage: pageNumber > 1 ? `/atividades?page=${pageNumber - 1}&pageSize=${pageSize}` : null
                }
            };
            return response;
        } catch (error) {
            console.error('Erro ao obter todas as atividades:', error.message);
            throw error;
        }
    }

    async atulizarAtividade(id, nome_atividade, id_materia, id_unidade) {
        try {
          const query = "UPDATE atividades SET nome_atividade = ?, id_materia = ?, id_unidade = ? WHERE id_atividade = ?";
          await db.query(query, [nome_atividade, id_materia, id_unidade, computa_nota, id]);
          console.log("Atividade editada com sucesso.");
          const atividadeAtualizada = new atividadeModel(nome_atividade, id_materia, id_unidade);
          atividadeAtualizada.id = id;
          return atividadeAtualizada;
        } catch (error) {
          console.log("Erro ao atualizar a unidade por ID: ", error);
          throw error;
        }
      }

    async excluirAtividadePorId(id) {
        try {
            const atividadeExistente = await this.obterAtividadePorId(id);
            if(!atividadeExistente) {
                throw new Error("Atividade não encontrada para exclusão");
            }
            const query = "DELETE FROM atividades WHERE id_atividade = ?";
            await db.query(query, [id]);
            console.log("Atividade excluída com sucesso.");
            return true;
        } catch (error) {
            console.error("Erro ao excluir atividade por ID:", error.message);
            throw error;
        }
    }
}

module.exports = atividadeRepositorio;