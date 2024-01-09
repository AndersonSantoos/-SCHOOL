const acompanhamentoFonoaudiologo = require("../models/fonoModel");
const db = require("../db/dbConfig")

class AcompanhamentoFonoRepository {
    constructor() {
    }

    async registrarAcompanhamentoFonoaudiologo(aluno, observacoes, documentos) {
        try {
            if (!aluno || !observacoes || !documentos) {
                throw new Error('Todos os campos devem ser preenchidos.');
            }

            const query = 'INSERT INTO acompanhamento_fonoaudiologo (aluno, observacoes, documentos) VALUES (?, ?, ?)';
            await db.query(query, [aluno, observacoes, documentos]);

            const acompanhamento = new acompanhamentoFonoaudiologo({
                aluno,
                observacoes,
                documentos
            });

            console.log('Acompanhamento fonoaudiológico cadastrado com sucesso.');
            return acompanhamento;
        } catch (error) {
            console.error('Erro ao cadastrar acompanhamento fonoaudiológico:', error.message);
            throw error;
        }
    }
    


    async obterAcompanhamentoPorId(id) {
        try {
            const query = 'SELECT * FROM acompanhamento_fonoaudiologo WHERE id = ?';
            const result = await db.query(query, [id]);
    
            // console.log('Resultado da consulta:', result);
    
            if (result[0].length === 0) {
                return null;
            }
    
            const acompanhamentoData = result[0][0];
            const acompanhamento = new acompanhamentoFonoaudiologo(
                acompanhamentoData.aluno,
                acompanhamentoData.observacoes,
                acompanhamentoData.documentos
            );
    
            // console.log("Resultado do acompanhamento:", acompanhamento)
            return acompanhamento;
        } catch (error) {
            console.error('Erro ao obter acompanhamento por ID:', error.message);
            throw error;
        }
    }


    async obterTodosAcompanhamentosFonoaudiologicos(pageNumber = 1, pageSize = 10) {
        try {
            const offset = (pageNumber - 1) * pageSize;
            const query = 'SELECT * FROM acompanhamento_fonoaudiologo LIMIT ?, ?';
            const result = await db.query(query, [offset, pageSize]);

            const acompanhamentos = result[0].map(acompanhamentoData => {
                return new acompanhamentoFonoaudiologo(
                    acompanhamentoData.aluno,
                    acompanhamentoData.observacoes,
                    acompanhamentoData.documentos
                );
            });

            // Obter o número total de acompanhamentos fonoaudiológicos
            const totalAcompanhamentosQuery = 'SELECT COUNT(*) as total FROM acompanhamento_fonoaudiologo';
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
                    nextPage: pageNumber < totalPages ? `/todos_acompanhamentos_fonoaudiologicos?page=${pageNumber + 1}&pageSize=${pageSize}` : null,
                    previousPage: pageNumber > 1 ? `/todos_acompanhamentos_fonoaudiologicos?page=${pageNumber - 1}&pageSize=${pageSize}` : null
                }
            };

            return response;
        } catch (error) {
            console.error('Erro ao obter todos os acompanhamentos fonoaudiológicos:', error.message);
            throw error;
        }
    }

    
    
    

    async atualizarAcompanhamentoFonoaudiologo(id, aluno, observacoes, documentos) {
        try {
            const query = 'UPDATE acompanhamento_fonoaudiologo SET aluno = ?, observacoes = ?, documentos = ? WHERE id = ?';
            await db.query(query, [aluno, observacoes, documentos, id]);
    
            console.log('Acompanhamento fonoaudiológico atualizado com sucesso.');
    
            
            const acompanhamentoAtualizado = new acompanhamentoFonoaudiologo(aluno, observacoes, documentos);
            acompanhamentoAtualizado.id = id; 
    
            return acompanhamentoAtualizado;
        } catch (error) {
            console.error('Erro ao atualizar acompanhamento por ID:', error.message);
            throw error;
        }
    }
    
    


    async obterHistoricoAcompanhamento(id) {
        try {
            const query = 'SELECT id, aluno, observacoes, documentos, status, versao FROM historico_acompanhamento_fono WHERE acompanhamento_id = ?';
            const historico = await db.query(query, [id]);
    
            return historico[0];
        } catch (error) {
            console.error('Erro ao obter histórico de acompanhamento:', error.message);
            throw error;
        }
    }
    
    async obterUltimaVersaoAcompanhamento(id) {
        try {
            const query = 'SELECT * FROM historico_acompanhamento_fono WHERE acompanhamento_id = ? ORDER BY versao DESC LIMIT 1';
            const [ultimaVersao] = await db.query(query, [id]);
    
            return ultimaVersao[0];
        } catch (error) {
            console.error('Erro ao obter última versão de acompanhamento:', error.message);
            throw error;
        }
    }
    
    async excluirAcompanhamentoFonoaudiologo(id) {
        try {
            const acompanhamentoExcluido = await this.obterAcompanhamentoPorId(id);
    
            if (!acompanhamentoExcluido) {
                return false;
            }
    
            const { aluno, observacoes, documentos, status, versao } = acompanhamentoExcluido;
    
            // Salvar cópia na tabela de histórico
            const historicoQuery = 'INSERT INTO historico_acompanhamento_fonoaudiologo (acompanhamento_id, aluno, observacoes, documentos, status, versao) SELECT id, aluno, observacoes, documentos, status, versao FROM acompanhamento_fonoaudiologo WHERE id = ?';
            await db.query(historicoQuery, [id]);
    
            // Atualizar versão e marcar como excluído
            const query = 'UPDATE acompanhamento_fonoaudiologo SET status = ?, versao = versao + 1 WHERE id = ?';
            await db.query(query, ['excluido', id]);
    
            console.log('Acompanhamento fonoaudiológico excluído com sucesso.');
            return true;
        } catch (error) {
            console.error('Erro ao excluir acompanhamento por ID:', error.message);
            throw error;
        }
    }
    
    


}   


   

module.exports = AcompanhamentoFonoRepository;
