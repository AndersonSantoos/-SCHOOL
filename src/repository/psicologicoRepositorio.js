const acompanhamentoPsicologico = require("../models/acompanhamentoPsicologico");

class acompanhamentoPsicologicoRepository {
  constructor() {
    this.db = require("../db/dbConfig");
    this.acompanhamentoPsicologico = new acompanhamentoPsicologico();
  }

  async registrarAcompanhamentoPsicologico(aluno, observacoes, documentos) {
    const query =
      "INSERT INTO acompanhamento_psicologico (aluno, observacoes, documentos) VALUES (?,?,?)";
    await this.db.query(query, [aluno, observacoes, documentos], (err) => {
      if (err) {
        console.error("Erro ao cadastrar acompanhamento psicologico:", err);
      }
    });
  }

  async obterAcompanhamentoPorId(id) {
    try {
      const query = "SELECT * FROM acompanhamento_psicologico WHERE id =?";
      const result = await this.db.query(query, [id]);

      console.log("Resultado da consulta:" + result);

      if (result.length === 0) {
        return null;
      }

      const acompanhamento = result[0][0];
      return acompanhamento;
    } catch (error) {
      console.error("Erro ao obter acompanhamento por ID:", error);
      throw error;
    }
  }

  async atualizarAcompanhamentoPsicologico(id, aluno, observacoes, documentos) {
    try {
      const query =
        "UPDATE acompanhamento_psicologico SET aluno =?, observacoes =?, documentos =? WHERE id =?";
      await this.db.query(query, [aluno, observacoes, documentos, id]);
    } catch (error) {
      console.error("Erro ao atualizar acompanhamento por ID:", error);
      throw error;
    }
  }

  async excluirAcompanhamentoPsicologico(id) {
    try {
      const query = "DELETE FROM acompanhamento_psicologico WHERE id =?";
      await this.db.query(query, [id]);
    } catch (error) {
      console.error("Erro ao excluir acompanhamento por ID:", error);
      throw error;
    }
  }

}

module.exports = acompanhamentoPsicologicoRepository;
