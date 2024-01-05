const unidadesModel = require("../models/unidadesModel");
const db = require("../db/dbConfig");

class unidadesRepositorio {
    constructor() {
    }

    async registrarUnidade(nome_unidade) {
        try {
            if(!nome_unidade) {
                throw new Error("Todos os campos devem ser preenchidos");
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