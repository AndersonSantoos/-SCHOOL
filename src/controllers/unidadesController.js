const unidadesRepositorio = require("../repository/unidadesRepositorio");


class unidadesController {
    constructor() {
        this.UnidadesRepositorio = new unidadesRepositorio();
    }


    async registrarUnidade(req, res) {
        try {
            const {nome_unidade} = req.body;

            if(!nome_unidade) {
                return res.status(404).json({error: "Todos os campos são obrigatórios."});
            }

            await this.UnidadesRepositorio.registrarUnidade(nome_unidade);

            return res.status(200).json({ message: "Unidade registrada com sucesso."});
        } catch (error) {
            console.error("Erro ao processar a solicitação:", error);
        }   return res.status(500).json({ error: "Erro interno do servidor."})
    }



    async obterUnidadePorId(req, res) {
        const id = req.params.id;

        try {
            const unidade = await this.UnidadesRepositorio.obterUnidadePorId(id);

            if(!unidade) {
                return res.status(404).json({ error: "Unidade não encontrada."});
            }

            return res.status(200).json(unidade);
        } catch (error) {
            console.error("Erro ao obter a unidade por ID:", error);
            return res.status(500).json({ error: "Erro interno do servidor."});
        }
    }


    async atualizarUnidade(req, res) {
        try {
            const id = req.params.id;
            const {nome_unidade} = req.body;

            if(!nome_unidade) {
                return res.status(404).json({ error: "Todos os campos devem ser preenchidos."});
            }

            await this.UnidadesRepositorio.atualizarUnidade(id, nome_unidade);
            return res.status(200).json({ message: "Unidade atualizada com sucesso."});
        } catch (error) {
            console.error("Erro ao processar solicitação de atualização:", error);
            return res.status(500).json({ error: "Erro interno do servidor."});
        }
    }


    async excluirUnidadePorId(req, res) {
        try {
            const id = req.params.id;
            const resultadoExclusao = await this.UnidadesRepositorio.excluirUnidadePorId(id);

            if(resultadoExclusao) {
                return res.status(200).json({ message: "Disciplina deletada com sucesso."});
            } else {
                return res.status(404).json({ message: "Disciplina não encontrada" });
            }
        } catch (error) {
            console.error("Erro ao processar solicatação de exclusão", error);
            return res.status(500).json({ error: "Erro interno do servidor."});
        }
    }
}



module.exports = unidadesController;