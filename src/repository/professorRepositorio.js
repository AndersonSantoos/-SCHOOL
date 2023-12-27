const AcompanhamentoProfessor = require('../models/acompanhamentoProfessorModel');

class AcompanhamentoRepository {
    constructor() {
        this.db = require('../db/dbConfig');
        this.acompanhamentoProfessor = new AcompanhamentoProfessor();
    }

    async registrarBriga(aluno, descricao, relato, visaoGeral) {
        try {
            if (!aluno || !descricao || !relato || !visaoGeral) {
                throw new Error('Todos os campos devem ser preenchidos.');
            }
            const query = 'INSERT INTO eventos_acompanhamento (aluno, tipo_evento, descricao, relato, visao_geral) VALUES (?, ?, ?, ?, ?)';
            await this.db.query(query, [aluno, 'Briga', descricao, relato, visaoGeral]);

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
            await this.db.query(query, [aluno, 'Rendimento Abaixo', descricao, relato, visaoGeral]);
    
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
            await this.db.query(query, [aluno, 'Pouca Participacao', descricao, relato, visaoGeral]);
    
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
            await this.db.query(query, [aluno, 'Alto Rendimento', descricao, relato, visaoGeral]);
    
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
            await this.db.query(query, [aluno, 'Relato Extra', relato, null]);
    
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
            await this.db.query(query, [visaoGeral]);
    
            this.acompanhamentoProfessor.registrarVisaoGeralTurma(visaoGeral);

            console.log('Visão geral da turma cadastrada com sucesso.');
        } catch (err) {
            console.error('Erro ao cadastrar visão geral da turma:', err.message);
            throw err;
        }
    }

    async atualizarAcompanhamento(id, novosDados) {
        try {
            const { descricao, relato, visao_geral, aluno, tipo_evento } = novosDados;
    
            if (!aluno || !descricao || !relato || !visao_geral || !tipo_evento) {
                throw new Error('Todos os campos devem ser preenchidos.');
            }
    
            console.log("Valores da consulta:", descricao, relato, visao_geral, aluno, tipo_evento, id);
    
            const query = 'UPDATE eventos_acompanhamento SET descricao = ?, relato = ?, visao_geral = ?, aluno = ?, tipo_evento = ? WHERE id = ?';
            await this.db.execute(query, [descricao, relato, visao_geral, aluno, tipo_evento, id]);
    
            console.log('Acompanhamento atualizado com sucesso.');
        } catch (error) {
            console.error('Erro ao atualizar acompanhamento:', error.message);
            throw error;
        }
    }

    async recuperarAcompanhamento(id) {
        try {
            const query = 'SELECT * FROM eventos_acompanhamento WHERE id = ?';
            const [acompanhamento] = await this.db.query(query, [id]);

            return acompanhamento[0];
        } catch (error) {
            console.error('Erro ao recuperar acompanhamento:', error);
            throw error;
        }
    }

    async excluirAcompanhamento(id) {
        try {
            const query = 'DELETE FROM eventos_acompanhamento WHERE id = ?';
            await this.db.execute(query, [id]);
        } catch (error) {
            console.error('Erro ao excluir acompanhamento:', error);
            throw error;
        }
    }
}

module.exports = AcompanhamentoRepository;
