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
      const params = req.query;
      const notas = await notasRepository.recuperarNotas(params);

      res.status(200).json({ success: true, notas });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Erro interno do servidor" });
    }
  }

  async atualizarNota(req, res) {
    try {
      const { idNota } = req.params; // supondo que o ID da nota seja passado nos parâmetros da URL
      const novaNota = req.body;

      const atualizado = await notasRepository.atualizarNota(idNota, novaNota);

      if (atualizado) {
        res.status(200).json({ success: true, mensagem: "Nota atualizada com sucesso" });
      } else {
        res.status(404).json({ success: false, mensagem: "Nota não encontrada ou não atualizada" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Erro interno do servidor" });
    }
  }


  async excluirNota(req, res) {
    try {
      const { id } = req.params; // supondo que o ID da nota seja passado nos parâmetros da URL

      // Antes de excluir a nota, você pode verificar se a atividade associada também deve ser excluída
      // Exemplo: const excluirAtividade = req.query.excluirAtividade === 'true';

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
