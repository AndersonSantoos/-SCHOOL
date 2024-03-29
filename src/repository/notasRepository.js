const NotasModel = require("../models/notasModel");
const db = require("../db/dbConfig");
class NotasRepository {

  async criarNota(nota) {
    const novaNota = new NotasModel(
      nota.valorNota,
      nota.idAtividade,
      nota.matriculaAluno
    );
    const [result] = await db.execute(
      "INSERT INTO notas (valor_nota, id_atividade, matricula_aluno) VALUES (?, ?, ?)",
      [novaNota.valorNota, novaNota.idAtividade, novaNota.matriculaAluno]
    );
    return result.insertId;
  }

  async recuperarNotas(matriculaALuno) {
    try {
        const query = "SELECT * FROM notas WHERE matricula_aluno = ?";
        const queryParams = [matriculaALuno];  
        const [result] = await db.execute(query, queryParams);

        if (result.length === 0) {
            return null; 
        }
        const notasData = result[0];
        const nota = new NotasModel(
            parseFloat(notasData.valor_nota.toFixed(2)), 
            notasData.id_atividade,
            notasData.matricula_aluno
        );
        return nota;
    } catch (error) {
        console.error('Erro ao obter notas por ID de aluno:', error.message);
        throw error;
    }
}

async notasPorPaginacao(pagina = 1, tamanhoPagina = 5) {
  try {
    const offset = (pagina - 1) * tamanhoPagina;
    const query = `SELECT * FROM notas LIMIT ${offset}, ${tamanhoPagina}`;
    const [result] = await db.execute(query);

    if (result.length === 0) {
      return null;
    }

    const notas = result.map(notasData => {
      return new NotasModel(
        parseFloat(notasData.valor_nota.toFixed(2)),
        notasData.id_atividade,
        notasData.matricula_aluno
      );
    });

    // Obter o número total de notas
    const totalNotasQuery = 'SELECT COUNT(*) as total FROM notas';
    const totalNotasResult = await db.execute(totalNotasQuery);
    const totalNotas = totalNotasResult[0][0].total;

    // Calcular o número total de páginas
    const totalPages = Math.ceil(totalNotas / tamanhoPagina);

    // Construir o objeto de resposta incluindo links para a próxima e anterior página
    const response = {
      notas,
      pagination: {
        currentPage: pagina,
        pageSize: tamanhoPagina,
        totalItems: totalNotas,
        totalPages,
        hasNextPage: pagina < totalPages,
        hasPreviousPage: pagina > 1,
        nextPage: pagina < totalPages ? `/todas_notas?page=${pagina + 1}&pageSize=${tamanhoPagina}` : null,
        previousPage: pagina > 1 ? `/todas_notas?page=${pagina - 1}&pageSize=${tamanhoPagina}` : null,
      },
    };

    return response;
  } catch (error) {
    console.error('Erro ao obter notas com paginação:', error.message);
    throw error;
  }
}

async atualizarNota(id, novaNota) {
  try {
    const notaExistente = await this.recuperarNotas(id);
    if (!notaExistente) {
      throw new Error("Nota não encontrada");
    }
    const notaAtualizada = new NotasModel(
      novaNota.valorNota || notaExistente.valorNota,
      novaNota.idAtividade || notaExistente.idAtividade,
      novaNota.matriculaAluno || notaExistente.matriculaAluno
    );
    const query = "UPDATE notas SET valor_nota = ?, id_atividade = ?, matricula_aluno = ? WHERE id_nota = ?";
    const queryParams = [
      notaAtualizada.valorNota,
      notaAtualizada.idAtividade,
      notaAtualizada.matriculaAluno,
      id
    ];
    await db.execute(query, queryParams);
    console.log("Nota atualizada com sucesso.");
    return notaAtualizada;
  } catch (error) {
    console.error("Erro ao atualizar nota por ID:", error.message);
    throw error;
  }
}

  async excluirNota(id) {
    try {
      const notaExcluida = await this.recuperarNotas(id);
      const query = "DELETE FROM notas WHERE id_nota = ?";
      await db.execute(query, [id]);
      console.log("Nota excluída com sucesso.");
      return notaExcluida;
    } catch (error) {
      console.error("Erro ao excluir nota por ID:", error.message);
      throw error;
    }
  }
}

module.exports = new NotasRepository();
