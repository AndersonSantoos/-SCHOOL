const acompanhamentoPsicologico = require("../models/acompanhamentoPsicologicoModel");

class AcompanhamentoPsicologicoRepository {
    constructor() {
        this.db = require('../db/dbConfig');
    }

    async registrarAcompanhamentoPsicologico(aluno, observacoes, documentos) {
        try {
            if (!aluno || !observacoes || !documentos) {
                throw new Error('Todos os campos devem ser preenchidos.');
            }

            const query = 'INSERT INTO acompanhamento_psicologico (aluno, observacoes, documentos) VALUES (?, ?, ?)';
            await this.db.query(query, [aluno, observacoes, documentos]);

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
            const result = await this.db.query(query, [id]);

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

    async atualizarAcompanhamentoPsicologico(id, aluno, observacoes, documentos) {
        try {
            const query = 'UPDATE acompanhamento_psicologico SET aluno = ?, observacoes = ?, documentos = ? WHERE id = ?';
            await this.db.query(query, [aluno, observacoes, documentos, id]);

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

            const query = 'DELETE FROM acompanhamento_psicologico WHERE id = ?';
            await this.db.query(query, [id]);

            console.log('Acompanhamento psicológico excluído com sucesso.');
            return acompanhamentoExcluido;
        } catch (error) {
            console.error('Erro ao excluir acompanhamento por ID:', error.message);
            throw error;
        }
    }
}

module.exports = AcompanhamentoPsicologicoRepository;
