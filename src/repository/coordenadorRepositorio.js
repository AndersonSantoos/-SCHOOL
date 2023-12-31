const AcompanhamentoCoordenador = require("../models/coordenadorModel");
const db = require("../db/dbConfig");

class AcompanhamentoCoordenadorRepository {


    async registrarAcompanhamentoCoordenador(aluno, encaminhamento, profissionalEncaminhado) {
        try {
            if (!aluno || !encaminhamento || !profissionalEncaminhado) {
                throw new Error('Todos os campos devem ser preenchidos.');
            }

            const query = 'INSERT INTO acompanhamento_coordenador (aluno, encaminhamento, profissional_encaminhado) VALUES (?, ?, ?)';
            await db.query(query, [aluno, encaminhamento, profissionalEncaminhado]);

            const acompanhamento = new AcompanhamentoCoordenador({
                aluno,
                encaminhamento,
                profissionalEncaminhado
            });

            console.log("Acompanhamento de coordenador cadastrado com sucesso.");
            return acompanhamento;
        } catch (error) {
            console.error("Erro ao cadastrar acompanhamento de coordenador:", error.message);
            throw error;
        }
    }


    async obterAcompanhamentoPorId(id) {
        try {
          const query = 'SELECT aluno, encaminhamento, profissional_encaminhado FROM acompanhamento_coordenador WHERE id = ?';
          const result = await db.query(query, [id]);
    
          console.log('Resultado da consulta:', result);
    
          if (result[0].length === 0) {
            return null;
          }
    
          const acompanhamentoData = result[0][0];
          const acompanhamento = new AcompanhamentoCoordenador(
            acompanhamentoData.aluno,
            acompanhamentoData.encaminhamento,
            acompanhamentoData.profissional_encaminhado
          );
    
          return acompanhamento;
        } catch (error) {
          console.error('Erro ao obter acompanhamento por ID:', error.message);
          throw error;
        }
      }



      async atualizarAcompanhamento(id, novoAluno, novoEncaminhamento, novoProfissionalEncaminhado) {
        const query = `
          UPDATE acompanhamento_coordenador
          SET aluno = ?, encaminhamento = ?, profissional_encaminhado = ?
          WHERE id = ?;
        `;
    
        try {
          const result = await db.query(query, [novoAluno, novoEncaminhamento, novoProfissionalEncaminhado, id]);
          console.log('Resultado da atualização:', result);
    
          
          return result;
        } catch (error) {
          console.error('Erro ao atualizar acompanhamento:', error.message);
          throw error;
        }
      }


      async excluirAcompanhamento(id) {
        const query = `
          UPDATE acompanhamento_coordenador
          SET status = 'excluido'
          WHERE id = ? AND status = 'ativo';
        `;
    
        try {
          const result = await db.query(query, [id]);
          console.log('Resultado do soft delete:', result);
    
          
          return result;
        } catch (error) {
          console.error('Erro no soft delete do acompanhamento:', error.message);
          throw error;
        }
      }

}

module.exports = AcompanhamentoCoordenadorRepository;
