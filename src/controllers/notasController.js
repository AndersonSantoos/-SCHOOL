const notasRepository = require('../repository/notasRepository');  


class NotasController {
  async criarNota(req, res) {
    try {
      const { valorNota, idAtividade, idAluno } = req.body;
      const novaNota = { valorNota, idAtividade, idAluno };

      const idInserido = await notasRepository.criarNota(novaNota);

      res.status(201).json({ success: true, idNota: idInserido });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Erro interno do servidor" });
    }
  }



  async recuperarNotas(req, res) {
    try {
        const idAluno = req.params.id; 
        const notas = await notasRepository.recuperarNotas(idAluno);

        res.status(200).json({ success: true, notas });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Erro interno do servidor" });
    }
}




async atualizarNota(req, res) {
  try {
    const { id } = req.params;
    const { valorNota, idAtividade, idAluno } = req.body;
    const novaNota = { valorNota, idAtividade, idAluno };

    const notaAtualizada = await notasRepository.atualizarNota(id, novaNota);

    res.status(200).json({ success: true, nota: notaAtualizada });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Erro interno do servidor" });
  }
}


  async excluirNota(req, res) {
    try {
      const { id } = req.params;

      const excluido = await notasRepository.excluirNota(id);

      if (excluido) {
        res.status(200).json({ success: true, mensagem: "Nota excluída com sucesso" });
      } else {
        res.status(404).json({ success: false, mensagem: "Nota não encontrada ou não excluída" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Erro interno do servidor" });
    }
  }



}

module.exports = NotasController;
