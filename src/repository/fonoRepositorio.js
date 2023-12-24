const AcompanhamentoFonoaudiologo = require("../models/acompanhamentoFono");

class AcompanhamentoFonoRepository {
    constructor() {
        this.db = require('../db/dbConfig');
        this.acompanhamentoFono = new AcompanhamentoFonoaudiologo();
    }

    registrarAcompanhamentoFonoaudiologo(aluno, observacoes, documentos) {
        const query = 'INSERT INTO acompanhamento_fonoaudiologo (aluno, observacoes, documentos) VALUES (?, ?, ?)';
        this.db.query(query, [aluno, observacoes, documentos], (err) => {
            if (err) {
                console.error('Erro ao cadastrar acompanhamento fonoaudiologo:', err);
            }
        });
    }


    async obterAcompanhamentoPorId(id) {
        try {
            const query = 'SELECT * FROM acompanhamento_fonoaudiologo WHERE id = ?';
            const result = await this.db.query(query, [id]);
    
            console.log('Resultado da consulta:', result);
    
            if (result[0].length === 0) {
                return null;
            }
    
            const acompanhamento = result[0][0];
            return acompanhamento;
        } catch (error) {
            console.error('Erro ao obter acompanhamento por ID:', error);
            throw error;
        }
    }

    async atualizarAcompanhamentoFonoaudiologo(id, aluno, observacoes, documentos) {
        try {
            const query = 'UPDATE acompanhamento_fonoaudiologo SET aluno = ?, observacoes = ?, documentos = ? WHERE id = ?';
            await this.db.query(query, [aluno, observacoes, documentos, id]);
        } catch (error) {
            console.error('Erro ao atualizar acompanhamento por ID:', error);
            throw error;
        }
    }

    async excluirAcompanhamentoFonoaudiologo(id) {
        try {
            const query = 'DELETE FROM acompanhamento_fonoaudiologo WHERE id = ?';
            await this.db.query(query, [id]);
        } catch (error) {
            console.error('Erro ao excluir acompanhamento por ID:', error);
            throw error;
        }
    }
    
    
    
}   


   

module.exports = AcompanhamentoFonoRepository;
