const AcompanhamentoCoordenador = require("../models/coordenadorModel");
const db = require("../db/dbConfig");

class AcompanhamentoCoordenadorRepository {


    async registrarAcompanhamentoCoordenador(matriculaAluno, aluno, encaminhamento, profissionalEncaminhado) {
        try {
            if (!matriculaAluno || !aluno || !encaminhamento || !profissionalEncaminhado) {
                throw new Error('Todos os campos devem ser preenchidos.');
            }

            const query = 'INSERT INTO acompanhamento_coordenador (matricula_aluno, aluno, encaminhamento, profissional_encaminhado) VALUES (?, ?, ?, ?)';
            await db.query(query, [matriculaAluno, aluno, encaminhamento, profissionalEncaminhado]);

            const acompanhamento = new AcompanhamentoCoordenador({
                matriculaAluno,
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
          const query = 'SELECT matricula_aluno, aluno, encaminhamento, profissional_encaminhado FROM acompanhamento_coordenador WHERE id = ?';
          const result = await db.query(query, [id]);
    
          // console.log('Resultado da consulta:', result);
    
          if (result[0].length === 0) {
            return null;
          }
    
          const acompanhamentoData = result[0][0];
          const acompanhamento = new AcompanhamentoCoordenador(
            acompanhamentoData.matricula_aluno,
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



      async obterTodosAcompanhamentos(pageNumber = 1, pageSize = 10) {
        try {
            const offset = (pageNumber - 1) * pageSize;
            const query = 'SELECT * FROM acompanhamento_coordenador LIMIT ?, ?';
            const result = await db.query(query, [offset, pageSize]);
    
            const acompanhamentos = result[0].map(acompanhamentoData => {
                return new AcompanhamentoCoordenador(
                  acompanhamentoData.matricula_aluno,
                    acompanhamentoData.aluno,
                    acompanhamentoData.encaminhamento,
                    acompanhamentoData.profissional_encaminhado
                );
            });
    
            // Verificar se há mais registros para a próxima página
            const hasNextPage = acompanhamentos.length === pageSize;
    
            // Construir o objeto de resposta incluindo os links para a próxima e a página anterior
            const response = {
                acompanhamentos,
                pagination: {
                    currentPage: pageNumber,
                    pageSize,
                    hasNextPage,
                    hasPreviousPage: pageNumber > 1,
                    nextPage: hasNextPage ? `/todos_acompanhamentos?page=${pageNumber + 1}&pageSize=${pageSize}` : null,
                    previousPage: pageNumber > 1 ? `/todos_acompanhamentos?page=${pageNumber - 1}&pageSize=${pageSize}` : null
                }
            };
    
            return response;
        } catch (error) {
            console.error('Erro ao obter todos os acompanhamentos:', error.message);
            throw error;
        }
    }
    
    
    



      async atualizarAcompanhamento(id, matriculaAluno, aluno, encaminhamento, profissionalEncaminhado) {
        const query = `
          UPDATE acompanhamento_coordenador
          SET matricula_aluno = ?, aluno = ?, encaminhamento = ?, profissional_encaminhado = ?
          WHERE id = ?;
        `;
    
        try {
          const result = await db.query(query, [matriculaAluno, aluno, encaminhamento, profissionalEncaminhado, id]);
          // console.log('Resultado da atualização:', result);
    
          
          return result;
        } catch (error) {
          console.error('Erro ao atualizar acompanhamento:', error.message);
          throw error;
        }
      }


      async excluirAcompanhamento(id) {

        try {

          const acompanhamentoExcluido = await this.obterAcompanhamentoPorId(id);
          const query = 'UPDATE acompanhamento_coordenador SET status = ?, versao = versao + 1 WHERE id = ?';
          await db.query(query, ['excluido', id]);

          // console.log('Resultado do soft delete:', acompanhamentoExcluido);
    
          return acompanhamentoExcluido;
        } catch (error) {
          console.error('Erro no soft delete do acompanhamento:', error.message);
          throw error;
        }
      }

}

module.exports = AcompanhamentoCoordenadorRepository;
