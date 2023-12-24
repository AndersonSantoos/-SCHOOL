const db = require('../db/dbConfig');
const AcompanhamentoProfessor = require('../models/acompanhamentoProfessor');



class AcompanhamentoRepository {
    constructor() {
        this.db = require('../db/dbConfig');
        this.acompanhamentoProfessor = new AcompanhamentoProfessor();
    }

    registrarBriga(aluno, descricao, relato, visaoGeral) {
        const query = 'INSERT INTO eventos_acompanhamento (aluno, tipo_evento, descricao, relato, visao_geral) VALUES (?, ?, ?, ?, ?)';
        this.db.query(query, [aluno, 'Briga', descricao, relato, visaoGeral], (err) => {
            if (err) {
                console.error('Erro ao cadastrar evento de Briga:', err);
            }
        });
    }

    registrarRendimentoAbaixo(aluno, descricao, relato, visaoGeral) {
        const query = 'INSERT INTO eventos_acompanhamento (aluno, tipo_evento, descricao, relato, visao_geral) VALUES (?, ?, ?, ?, ?)';
        this.db.query(query, [aluno, 'Rendimento Abaixo', descricao, relato, visaoGeral], (err) => {
            if (err) {
                console.error('Erro ao cadastrar evento de Rendimento Abaixo:', err);
            }
        });
    }

    registrarPoucaParticipacao(aluno, descricao, relato, visaoGeral) {
        const query = 'INSERT INTO eventos_acompanhamento (aluno, tipo_evento, descricao, relato, visao_geral) VALUES (?, ?, ?, ?, ?)';
        this.db.query(query, [aluno, 'Pouca Participacao', descricao, relato, visaoGeral], (err) => {
            if (err) {
                console.error('Erro ao cadastrar evento de Pouca Participação:', err);
            } 
        });
    }

    registrarAltoRendimento(aluno, descricao, relato, visaoGeral) {
        const query = 'INSERT INTO eventos_acompanhamento (aluno, tipo_evento, descricao, relato, visao_geral) VALUES (?, ?, ?, ?, ?)';
        this.db.query(query, [aluno, 'Alto Rendimento', descricao, relato, visaoGeral], (err) => {
            if (err) {
                console.error('Erro ao cadastrar evento de Alto Rendimento:', err);
            }
        });
    }

    registrarRelatoExtra(aluno, relato) {
        const query = 'INSERT INTO eventos_acompanhamento (aluno, tipo_evento, descricao, relato) VALUES (?, ?, ?, ?)';
        this.db.query(query, [aluno, 'Relato Extra', relato, null], (err) => {
            if (err) {
                console.error('Erro ao cadastrar evento de Relato Extra:', err);
            }
        });
    }

    registrarVisaoGeralTurma(visaoGeral) {
        const query = 'INSERT INTO visao_geral_turma (descricao) VALUES (?)';
        this.db.query(query, [visaoGeral], (err) => {
            if (err) {
                console.error('Erro ao cadastrar visão geral da turma:', err);
            }
        });
    }


      async atualizarAcompanhamento(id, novosDados) {
        try {
          const { descricao, relato, visao_geral, aluno, tipo_evento } = novosDados;
      
          if (!aluno) {
            throw new Error('O campo "aluno" é obrigatório.');
          }
      
          // Se o campo "tipo_evento" não estiver presente, atribua um valor padrão
          if (!tipo_evento) {
            throw new Error('O campo "tipo_evento" deve ser preenchido');
          }
      
          console.log("Valores da consulta:", descricao, relato, visao_geral, aluno, tipo_evento, id);
      
          const query = 'UPDATE eventos_acompanhamento SET descricao = ?, relato = ?, visao_geral = ?, aluno = ?, tipo_evento = ? WHERE id = ?';
          const promise = this.db.execute(query, [descricao, relato, visao_geral, aluno, tipo_evento, id]);
      
          return promise;
        } catch (error) {
          console.error('Erro ao atualizar acompanhamento:', error);
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
