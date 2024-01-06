const acompanhamentoPsicologico = require("../models/psicologoModel");
const db = require("../db/dbConfig");

class AcompanhamentoPsicologicoRepository {
    constructor() {
        
    }

    async registrarAcompanhamentoPsicologico(aluno, observacoes, documentos) {
        try {
            if (!aluno || !observacoes || !documentos) {
                throw new Error('Todos os campos devem ser preenchidos.');
            }

            const query = 'INSERT INTO acompanhamento_psicologico (aluno, observacoes, documentos) VALUES (?, ?, ?)';
            await db.query(query, [aluno, observacoes, documentos]);

            const acompanhamento = new acompanhamentoPsicologico({
                aluno,
                observacoes,
                documentos
            });

            console.log('Acompanhamento psicológico cadastrado com sucesso.');
            return acompanhamento;
        } catch (error) {
            console.error('Erro ao cadastrar acompanhamento psicológico:', error.message);
            throw error;
        }
    }

    async obterAcompanhamentoPorId(id) {
        try {
            const query = 'SELECT * FROM acompanhamento_psicologico WHERE id = ?';
            const result = await db.query(query, [id]);

            console.log('Resultado da consulta:', result);

            if (result[0].length === 0) {
                return null;
            }

            const acompanhamentoData = result[0][0];
            const acompanhamento = new acompanhamentoPsicologico(
                acompanhamentoData.aluno,
                acompanhamentoData.observacoes,
                acompanhamentoData.documentos
            );

            return acompanhamento;
        } catch (error) {
            console.error('Erro ao obter acompanhamento por ID:', error.message);
            throw error;
        }
    }


    async obterTodosAcompanhamentosPsicologicos(pageNumber = 1, pageSize = 10) {
        try {
            const offset = (pageNumber - 1) * pageSize;
            const query = 'SELECT * FROM acompanhamento_psicologico LIMIT ?, ?';
            const result = await db.query(query, [offset, pageSize]);

            const acompanhamentos = result[0].map(acompanhamentoData => {
                return new acompanhamentoPsicologicoModel(
                    acompanhamentoData.aluno,
                    acompanhamentoData.observacoes,
                    acompanhamentoData.documentos
                );
            });

            // Obter o número total de acompanhamentos
            const totalAcompanhamentosQuery = 'SELECT COUNT(*) as total FROM acompanhamento_psicologico';
            const totalAcompanhamentosResult = await db.query(totalAcompanhamentosQuery);
            const totalAcompanhamentos = totalAcompanhamentosResult[0][0].total;

            // Calcular o número total de páginas
            const totalPages = Math.ceil(totalAcompanhamentos / pageSize);

            // Construir o objeto de resposta incluindo os links para a próxima e a página anterior
            const response = {
                acompanhamentos,
                pagination: {
                    currentPage: pageNumber,
                    pageSize,
                    totalItems: totalAcompanhamentos,
                    totalPages,
                    hasNextPage: pageNumber < totalPages,
                    hasPreviousPage: pageNumber > 1,
                    nextPage: pageNumber < totalPages ? `/todos_acompanhamentos_psicologicos?page=${pageNumber + 1}&pageSize=${pageSize}` : null,
                    previousPage: pageNumber > 1 ? `/todos_acompanhamentos_psicologicos?page=${pageNumber - 1}&pageSize=${pageSize}` : null
                }
            };

            return response;
        } catch (error) {
            console.error('Erro ao obter todos os acompanhamentos psicológicos:', error.message);
            throw error;
        }
    }

    

    async atualizarAcompanhamentoPsicologico(id, aluno, observacoes, documentos) {
        try {
            const query = 'UPDATE acompanhamento_psicologico SET aluno = ?, observacoes = ?, documentos = ? WHERE id = ?';
            await db.query(query, [aluno, observacoes, documentos, id]);

            console.log('Acompanhamento psicológico atualizado com sucesso.');

            const acompanhamentoAtualizado = new acompanhamentoPsicologico(aluno, observacoes, documentos);
            acompanhamentoAtualizado.id = id;

            return acompanhamentoAtualizado;
        } catch (error) {
            console.error('Erro ao atualizar acompanhamento por ID:', error.message);
            throw error;
        }
    }

    async excluirAcompanhamentoPsicologico(id) {
        try {
            const acompanhamentoExcluido = await this.obterAcompanhamentoPorId(id);
    
            const query = 'UPDATE acompanhamento_psicologico SET status = ?, versao = versao + 1 WHERE id = ?';
            await db.query(query, ['excluido', id]);
    
            console.log('Acompanhamento psicológico excluído com sucesso.');
            return acompanhamentoExcluido;
        } catch (error) {
            console.error('Erro ao excluir acompanhamento por ID:', error.message);
            throw error;
        }
    }
    
}

module.exports = AcompanhamentoPsicologicoRepository;
