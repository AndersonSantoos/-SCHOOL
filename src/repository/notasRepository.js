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


  async recuperarNotas(idAluno) {
    try {
        const query = "SELECT * FROM notas WHERE matricula_aluno = ?";
        const queryParams = [matriculaAluno];

        const [result] = await db.execute(query, queryParams);
        // console.log("Resultado da consulta: ", result);

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


async obterTodasNotas(pageNumber = 1, pageSize = 10) {
  try {
    const offset = (pageNumber - 1) * pageSize;
    const query = 'SELECT * FROM notas LIMIT ?, ?';
    const result = await db.execute(query, [offset, pageSize]);

    const notas = result[0].map(notaData => {
      return new NotasModel(
        parseFloat(notaData.valor_nota.toFixed(2)), 
        notaData.id_atividade,
        notaData.matricula_aluno
      );
    });

    // Obter o número total de notas
    const totalNotasQuery = 'SELECT COUNT(*) as total FROM notas';
    const totalNotasResult = await db.execute(totalNotasQuery);
    const totalNotas = totalNotasResult[0][0].total;

    // Calcular o número total de páginas
    const totalPages = Math.ceil(totalNotas / pageSize);

    // Construir o objeto de resposta incluindo os links para a próxima e a página anterior
    const response = {
      notas,
      pagination: {
        currentPage: pageNumber,
        pageSize,
        totalItems: totalNotas,
        totalPages,
        hasNextPage: pageNumber < totalPages,
        hasPreviousPage: pageNumber > 1,
        nextPage: pageNumber < totalPages ? `/todas_notas?page=${pageNumber + 1}&pageSize=${pageSize}` : null,
        previousPage: pageNumber > 1 ? `/todas_notas?page=${pageNumber - 1}&pageSize=${pageSize}` : null
      }
    };

    return response;
  } catch (error) {
    console.error('Erro ao obter todas as notas:', error.message);
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
