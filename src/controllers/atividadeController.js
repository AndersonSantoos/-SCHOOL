const atividadeRepositorio = require("../repository/atividadeRepositorio");


class atividadeController {
    constructor() {
        this.AtividadeRepositorio = new atividadeRepositorio();
    }

    async registrarAtividade(req, res) {
        try {
            const {nome_atividade, id_materia, id_unidade, computa_nota} = req.body;

            if(!nome_atividade || !id_materia || !id_unidade || !computa_nota) {
                return res.status(404).json({ error: "Todos os campos são obrigatórios."});
        }

        await this.AtividadeRepositorio.registrarAtividade(nome_atividade, id_materia, id_unidade, computa_nota);

        return res.status(200).json({ error: "Atividade registrada com sucesso."});
    } catch (error) {
        console.error("Erro ao processar a solicitação", error);
        return res.status(500).json({ error: "Erro interno do servidor."});
        }
    }


    async obterAtividadePorId(req, res) {
        const id = req.params.id;
      
        try {
          const atividade = await this.AtividadeRepositorio.obterAtividadePorId(id);
      
          if (!atividade) {
            return res.status(404).json({ error: "Atividade não encontrada." });
          }
      
          return res.status(200).json(atividade);
        } catch (error) {
          console.error("Erro ao obter a atividade por ID:", error);
          return res.status(500).json({ error: "Erro interno do servidor." });
        }
      }


    async atualizarAtividade(req, res) {
        try {
            const id = req.params.id;
            const {nome_atividade, id_materia, id_unidade, computa_nota} = req.body;

            if(!nome_atividade || !id_materia || !id_unidade || !computa_nota) {
                return res.status(404).json({ error: "Todos os campos devem ser preenchidos."});
            }

            await this.AtividadeRepositorio.atulizarAtividade(id, nome_atividade, id_materia, id_unidade, computa_nota);
            return res.status(200).json({ message: "Atividade atualizada com sucesso."});
        } catch (error) {
            console.error("Erro ao processar a solicitação:", error);
            return res.status(500).json({ error: "Erro interno do servidor."});
        }
    }


    async excluirAtividadePorId(req, res) {
        try {
            const id = req.params.id;
            const resultadoExclusao = await this.AtividadeRepositorio.excluirAtividadePorId(id);

            if(resultadoExclusao) {
                return res.status(200).json({ message: "Atividade deletada com sucesso."});
            } else {
                return res.status(404).json({ message: "Atividade não encontrada" });
            }
        } catch (error) {
            console.error("Erro ao processar solicatação de exclusão", error);
            return res.status(500).json({ error: "Erro interno do servidor."});
        }
    }
}

module.exports = atividadeController;