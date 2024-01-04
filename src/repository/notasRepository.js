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



  async recuperarNotas(idAluno) {
    try {
        const query = "SELECT * FROM notas WHERE id_aluno = ?";
        const queryParams = [idAluno];

        const [result] = await db.execute(query, queryParams);

        if (result.length === 0) {
            return null;
        }

        const notasData = result[0];
        const notas = notasData.map(nota => new NotasModel(
            nota.valorNota,
            nota.idAtividade,
            nota.idAluno
        ));

        return notas;
    } catch (error) {
        console.error('Erro ao obter notas por ID de aluno:', error.message);
        throw error;
    }
}



    async atualizarNota(idNota, novaNota) {
      try {
      const { valorNota, idAtividade, idAluno } = novaNota;

      const query = 'UPDATE notas SET valor_nota = ?, id_atividade = ?, id_aluno = ? WHERE id_nota = ?';
      await db.query(query, [valorNota, idAtividade, idAluno, idNota]);

      console.log('Nota atualizada com sucesso.');

      const notaAtualizada = new NotasModel(valorNota, idAtividade, idAluno);
      notaAtualizada.idNota = idNota;

      return notaAtualizada;
  } catch (error) {
      console.error('Erro ao atualizar nota por ID:', error.message);
      throw error;
  }
}



async excluirNota(id) {
  try {
      const notaExcluida = await this.recuperarNotas(id);

      const query = 'DELETE FROM notas WHERE id_nota = ?';
      await db.execute(query, [id]);

      console.log('Nota excluída com sucesso.');
      return notaExcluida;
  } catch (error) {
      console.error('Erro ao excluir nota por ID:', error.message);
      throw error;
  }
}

  

}

module.exports = new NotasRepository();
