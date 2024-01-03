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
    
    


    async excluirAcompanhamentoFonoaudiologo(id) {
        try {
            const acompanhamentoExcluido = await this.obterAcompanhamentoPorId(id);
    
            const query = 'UPDATE acompanhamento_fonoaudiologo SET status = ?, versao = versao + 1 WHERE id = ?';
            await db.query(query, ['excluido', id]);
    
            console.log('Acompanhamento fonoaudiológico excluído com sucesso.');
            return acompanhamentoExcluido;
        } catch (error) {
            console.error('Erro ao excluir acompanhamento por ID:', error.message);
            throw error;
        }
    }  
}   


   

module.exports = AcompanhamentoFonoRepository;
