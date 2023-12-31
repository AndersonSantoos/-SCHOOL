const NotasModel = require("../models/notasModel");
const db = require("../db/dbConfig");

class NotasRepository {
  async criarNota(nota) {
    const novaNota = new NotasModel(nota.valorNota, nota.idAtividade, nota.idAluno);

    const [result] = await db.execute(
      "INSERT INTO notas (valor_nota, id_atividade, id_aluno) VALUES (?, ?, ?)",
      [novaNota.valorNota, novaNota.idAtividade, novaNota.idAluno]
    );

    return result.insertId;
  }

  async recuperarNotas(params) {
    const { idAluno, ano, idMateria, idUnidade, pagina, itensPorPagina } = params;
    const paginaAtual = pagina || 1;
    const itensPorPaginaAtual = itensPorPagina || 10;
    const offset = (paginaAtual - 1) * itensPorPaginaAtual;

    let query = "SELECT * FROM notas WHERE 1=1";
    const queryParams = [];

    if (idAluno) {
      query += " AND id_aluno = ?";
      queryParams.push(idAluno);
    }

    // Adicione mais condições conforme necessário (ano, matéria, unidade, etc.)

    query += " LIMIT ? OFFSET ?";
    queryParams.push(itensPorPaginaAtual, offset);

    const [result] = await db.execute(query, queryParams);
    return result;
  }


  async atualizarNota(idNota, novaNota) {
    try {
      const { valorNota, idAtividade, idAluno } = novaNota;

      const [result] = await db.execute(
        "UPDATE notas SET valor_nota = ?, id_atividade = ?, id_aluno = ? WHERE id_nota = ?",
        [valorNota, idAtividade, idAluno, idNota]
      );

      return result.affectedRows > 0;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }


  async excluirNota(id) {
    try {
      const [result] = await db.execute("DELETE FROM notas WHERE id_nota = ?", [id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  

}

module.exports = new NotasRepository();
