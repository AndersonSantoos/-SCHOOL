const materiasModel = require("../models/materiasModel");
const db = require("../db/dbConfig");
class MateriasRepositorio {
    constructor() {
    }

    async registrarMateria(nome_materia) {
        try {
            if(!nome_materia) {
                throw new Error('Todos os campos devem ser preenchidos.');
            }
            const query = "INSERT INTO materias (nome_materia) VALUES (?)";
            await db.query(query, [nome_materia]);
            const disciplina = new materiasModel({
                nome_materia
            });
            console.log(("Disciplina cadastrada com sucesso."));
            return disciplina;
        } catch (error) {
            console.error("Erro ao cadastrar uma nova matéria", error.message);
            throw error;
        }
    }

    async obterMateriaPorId(id) {
        try {
            const query = "SELECT * FROM materias WHERE id_materia = ?";
            const result = await db.query(query, [id]);
            //console.log("Resultado da consulta:", result);
            if (result[0].length === 0) {
                return null;
            }
            const disciplinaData = result[0][0];
            const disciplina = new materiasModel(disciplinaData.nome_materia); // Use a classe correta
            //console.log("Resultado da inserção da disciplina:", disciplina);
            return disciplina;
        } catch (error) {
            console.error("Erro ao obter disciplina por ID:", error.message);
            throw error;
        }
    }

    async obterTodasMaterias(pageNumber = 1, pageSize = 10) {
        try {
            const offset = (pageNumber - 1) * pageSize;
            const query = 'SELECT * FROM materias LIMIT ?, ?';
            const result = await db.query(query, [offset, pageSize]);
            const materias = result[0].map(materiaData => {
                return new MateriasModel(materiaData.nome_materia);
            });
            // Obter o número total de matérias
            const totalMateriasQuery = 'SELECT COUNT(*) as total FROM materias';
            const totalMateriasResult = await db.query(totalMateriasQuery);
            const totalMaterias = totalMateriasResult[0][0].total;
            // Calcular o número total de páginas
            const totalPages = Math.ceil(totalMaterias / pageSize);
            // Construir o objeto de resposta incluindo os links para a próxima e a página anterior
            const response = {
                materias,
                pagination: {
                    currentPage: pageNumber,
                    pageSize,
                    totalItems: totalMaterias,
                    totalPages,
                    hasNextPage: pageNumber < totalPages,
                    hasPreviousPage: pageNumber > 1,
                    nextPage: pageNumber < totalPages ? `/todas_materias?page=${pageNumber + 1}&pageSize=${pageSize}` : null,
                    previousPage: pageNumber > 1 ? `/todas_materias?page=${pageNumber - 1}&pageSize=${pageSize}` : null
                }
            };
            return response;
        } catch (error) {
            console.error('Erro ao obter todas as matérias:', error.message);
            throw error;
        }
    }
    
    async atualizarMateria(id, nome_materia) {
        try {
            const query = 'UPDATE materias SET nome_materia = ? WHERE id_materia = ?';
            await db.query(query, [nome_materia, id]);
            console.log("Disciplina editada com sucesso.");
            const disciplinaAtualizada = new materiasModel(nome_materia);
            disciplinaAtualizada.id = id; 
            return disciplinaAtualizada;
        } catch (error) {
            console.log("Erro ao atualizar a disciplina por ID:", error.message);
            throw error;
        }
    }

    async excluirMateriaPorId(id) {
        try {
            // Verifica se a matéria existe antes de excluir
            const materiaExistente = await this.obterMateriaPorId(id);
            if (!materiaExistente) {
                throw new Error('Matéria não encontrada para exclusão.');
            }
            // Realiza a exclusão da matéria
            const query = 'DELETE FROM materias WHERE id_materia = ?';
            await db.query(query, [id]);
            console.log('Matéria excluída com sucesso.');
            return true; // Retorna true para indicar sucesso na exclusão
        } catch (error) {
            console.error('Erro ao excluir matéria por ID:', error.message);
            throw error;
        }
    }
}

module.exports = MateriasRepositorio;