const AcompanhamentoProfessor = require('../models/professorModel');
const db = require("../db/dbConfig");
class AcompanhamentoRepository {
    constructor() {
        
        this.acompanhamentoProfessor = new AcompanhamentoProfessor();
    }

    async registrarBriga(aluno, descricao, relato, visaoGeral) {
        try {
            if (!aluno || !descricao || !relato || !visaoGeral) {
                throw new Error('Todos os campos devem ser preenchidos.');
            }
            const query = 'INSERT INTO eventos_acompanhamento (aluno, tipo_evento, descricao, relato, visao_geral) VALUES (?, ?, ?, ?, ?)';
            await db.query(query, [aluno, 'Briga', descricao, relato, visaoGeral]);

            this.acompanhamentoProfessor.registrarEvento(aluno, 'Briga', descricao);
            this.acompanhamentoProfessor.registrarVisaoGeralTurma(visaoGeral);

            console.log('Evento de Briga cadastrado com sucesso.');
        } catch (err) {
            console.error('Erro ao cadastrar evento de Briga:', err.message);
            throw err;
        }
    }

    async registrarRendimentoAbaixo(aluno, descricao, relato, visaoGeral) {
        try {
            if (!aluno || !descricao || !relato || !visaoGeral) {
                throw new Error('Todos os campos devem ser preenchidos.');
            }
    
            const query = 'INSERT INTO eventos_acompanhamento (aluno, tipo_evento, descricao, relato, visao_geral) VALUES (?, ?, ?, ?, ?)';
            await db.query(query, [aluno, 'Rendimento Abaixo', descricao, relato, visaoGeral]);
    
            this.acompanhamentoProfessor.registrarEvento(aluno, 'Rendimento Abaixo', descricao);
            this.acompanhamentoProfessor.registrarVisaoGeralTurma(visaoGeral);

            console.log('Evento de Rendimento Abaixo cadastrado com sucesso.');
        } catch (err) {
            console.error('Erro ao cadastrar evento de Rendimento Abaixo:', err.message);
            throw err;
        }
    }

    async registrarPoucaParticipacao(aluno, descricao, relato, visaoGeral) {
        try {
            if (!aluno || !descricao || !relato || !visaoGeral) {
                throw new Error('Todos os campos devem ser preenchidos.');
            }
    
            const query = 'INSERT INTO eventos_acompanhamento (aluno, tipo_evento, descricao, relato, visao_geral) VALUES (?, ?, ?, ?, ?)';
            await db.query(query, [aluno, 'Pouca Participacao', descricao, relato, visaoGeral]);
    
            this.acompanhamentoProfessor.registrarEvento(aluno, 'Pouca Participacao', descricao);
            this.acompanhamentoProfessor.registrarVisaoGeralTurma(visaoGeral);

            console.log('Evento de Pouca Participação cadastrado com sucesso.');
        } catch (err) {
            console.error('Erro ao cadastrar evento de Pouca Participação:', err.message);
            throw err;
        }
    }

    async registrarAltoRendimento(aluno, descricao, relato, visaoGeral) {
        try {
            if (!aluno || !descricao || !relato || !visaoGeral) {
                throw new Error('Todos os campos devem ser preenchidos.');
            }
    
            const query = 'INSERT INTO eventos_acompanhamento (aluno, tipo_evento, descricao, relato, visao_geral) VALUES (?, ?, ?, ?, ?)';
            await db.query(query, [aluno, 'Alto Rendimento', descricao, relato, visaoGeral]);
    
            this.acompanhamentoProfessor.registrarEvento(aluno, 'Alto Rendimento', descricao);
            this.acompanhamentoProfessor.registrarVisaoGeralTurma(visaoGeral);

            console.log('Evento de Alto Rendimento cadastrado com sucesso.');
        } catch (err) {
            console.error('Erro ao cadastrar evento de Alto Rendimento:', err.message);
            throw err;
        }
    }

    async registrarRelatoExtra(aluno, relato) {
        try {
            if (!aluno || !relato) {
                throw new Error('Todos os campos devem ser preenchidos.');
            }
    
            const query = 'INSERT INTO eventos_acompanhamento (aluno, tipo_evento, descricao, relato) VALUES (?, ?, ?, ?)';
            await db.query(query, [aluno, 'Relato Extra', relato, null]);
    
            this.acompanhamentoProfessor.registrarEvento(aluno, 'Relato Extra', relato);

            console.log('Evento de Relato Extra cadastrado com sucesso.');
        } catch (err) {
            console.error('Erro ao cadastrar evento de Relato Extra:', err.message);
            throw err;
        }
    }

    async registrarVisaoGeralTurma(visaoGeral) {
        try {
            if (!visaoGeral) {
                throw new Error('O campo de visão geral deve ser preenchido.');
            }
    
            const query = 'INSERT INTO visao_geral_turma (descricao) VALUES (?)';
            await db.query(query, [visaoGeral]);
    
            this.acompanhamentoProfessor.registrarVisaoGeralTurma(visaoGeral);

            console.log('Visão geral da turma cadastrada com sucesso.');
        } catch (err) {
            console.error('Erro ao cadastrar visão geral da turma:', err.message);
            throw err;
        }
    }

    async atualizarAcompanhamento(id, novosDados) {
        try {
            const { descricao, relato, visaoGeral, aluno, tipoEvento } = novosDados;
    
            if (!aluno || !descricao || !relato || !visaoGeral || !tipoEvento) {
                throw new Error('Todos os campos devem ser preenchidos.');
            }
    
            console.log("Valores da consulta:", descricao, relato, visaoGeral, aluno, tipoEvento, id);
    
            const query = 'UPDATE eventos_acompanhamento SET descricao = ?, relato = ?, visao_geral = ?, aluno = ?, tipo_evento = ? WHERE id = ?';
            await db.execute(query, [descricao, relato, visaoGeral, aluno, tipoEvento, id]);
    
            console.log('Acompanhamento atualizado com sucesso.');
        } catch (error) {
            console.error('Erro ao atualizar acompanhamento:', error.message);
            throw error;
        }
    }


    async recuperarAcompanhamento(id) {
        try {
            const query = 'SELECT id, aluno, tipo_evento, descricao, relato, visao_geral, status, versao FROM eventos_acompanhamento WHERE id = ? AND status != ?';
            const [acompanhamento] = await db.query(query, [id, 'excluido']);
    
            return acompanhamento[0];
        } catch (error) {
            console.error('Erro ao recuperar acompanhamento:', error);
            throw error;
        }
    }


    async obterTodosAcompanhamentos(pageNumber = 1, pageSize = 10) {
        try {
            const offset = (pageNumber - 1) * pageSize;
            const query = 'SELECT * FROM eventos_acompanhamento WHERE status != ? LIMIT ?, ?';
            const result = await db.query(query, ['excluido', offset, pageSize]);

            const acompanhamentos = result[0].map(acompanhamentoData => {
                return {
                    id: acompanhamentoData.id,
                    aluno: acompanhamentoData.aluno,
                    tipoEvento: acompanhamentoData.tipo_evento,
                    descricao: acompanhamentoData.descricao,
                    relato: acompanhamentoData.relato,
                    visaoGeral: acompanhamentoData.visao_geral
                };
            });

            // Obter o número total de acompanhamentos
            const totalAcompanhamentosQuery = 'SELECT COUNT(*) as total FROM eventos_acompanhamento WHERE status != ?';
            const totalAcompanhamentosResult = await db.query(totalAcompanhamentosQuery, ['excluido']);
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
                    nextPage: pageNumber < totalPages ? `/todos_acompanhamentos?page=${pageNumber + 1}&pageSize=${pageSize}` : null,
                    previousPage: pageNumber > 1 ? `/todos_acompanhamentos?page=${pageNumber - 1}&pageSize=${pageSize}` : null
                }
            };

            return response;
        } catch (error) {
            console.error('Erro ao obter todos os acompanhamentos:', error.message);
            throw error;
        }
    }



    async obterHistoricoAcompanhamento(id) {
        try {
            const query = 'SELECT id, aluno, tipo_evento, descricao, relato, visao_geral, status, versao FROM historico_acompanhamento_prof WHERE acompanhamento_id = ?';
            const historico = await db.query(query, [id]);

            return historico[0];
        } catch (error) {
            console.error('Erro ao obter histórico de acompanhamento:', error.message);
            throw error;
        }
    }

    async obterUltimaVersaoAcompanhamento(id) {
        try {
            const query = 'SELECT * FROM historico_acompanhamento_prof WHERE acompanhamento_id = ? ORDER BY versao DESC LIMIT 1';
            const [ultimaVersao] = await db.query(query, [id]);

            return ultimaVersao[0];
        } catch (error) {
            console.error('Erro ao obter última versão de acompanhamento:', error.message);
            throw error;
        }
    }

    async excluirAcompanhamento(id) {
        try {
            const acompanhamentoExcluido = await this.recuperarAcompanhamento(id);

            if (!acompanhamentoExcluido) {
                return false;
            }

            const { aluno, tipoEvento, descricao, relato, visaoGeral, status, versao } = acompanhamentoExcluido;

            // Salvar cópia na tabela de histórico
            const historicoQuery = 'INSERT INTO historico_acompanhamento_prof (acompanhamento_id, aluno, tipo_evento, descricao, relato, visao_geral, status, versao) SELECT id, aluno, tipo_evento, descricao, relato, visao_geral, status, versao FROM eventos_acompanhamento WHERE id = ?';
            await db.query(historicoQuery, [id]);


            // Atualizar versão e marcar como excluído
            const query = 'UPDATE eventos_acompanhamento SET status = ?, versao = versao + 1 WHERE id = ?';
            await db.query(query, ['excluido', id]);

            console.log('Acompanhamento excluído com sucesso.');
            return true;
        } catch (error) {
            console.error('Erro ao excluir acompanhamento por ID:', error.message);
            throw error;
        }
    }
    
}

module.exports = AcompanhamentoRepository;
