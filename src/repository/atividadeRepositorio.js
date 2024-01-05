const atividadeModel = require("../models/atividadeModel");
const db = require("../db/dbConfig");


class atividadeRepositorio {
    constructor(){
    }


    async registrarAtividade(nome_atividade, id_materia, id_unidade, computa_nota) {
        try {
            if(!nome_atividade || !id_materia || !id_unidade || !computa_nota) {
                throw new Error("Todos os campos devem ser preenchidos.")
            }

            const query = "INSERT INTO atividades (nome_atividade, id_materia, id_unidade, computa_nota) VALUES (?, ?, ?, ?)";
            await db.query(query, [nome_atividade, id_materia, id_unidade, computa_nota]);

            const atividade = new atividadeModel({
                nome_atividade,
                id_materia,
                id_unidade,
                computa_nota
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
                 atividadeData.id_unidade,
                 atividadeData.computa_nota
                );

            console.log("Resultado da inserção da unidade:", atividade);
            return atividade;
        } catch (error) {
            console.error("Erro ao obter a atividade por ID:", error.message);
            throw error;
        }
    }


    async atulizarAtividade(id, nome_atividade, id_materia, id_unidade, computa_nota) {
        try {
          const query = "UPDATE atividades SET nome_atividade = ?, id_materia = ?, id_unidade = ?, computa_nota = ? WHERE id_atividade = ?";
          await db.query(query, [nome_atividade, id_materia, id_unidade, computa_nota, id]);
      
          console.log("Atividade editada com sucesso.");
      
          const atividadeAtualizada = new atividadeModel(nome_atividade, id_materia, id_unidade, computa_nota);
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