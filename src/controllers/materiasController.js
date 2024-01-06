const MateriasRepositorio = require("../repository/materiasRepositorio");

class materiasController {
    constructor() {
        this.MateriasRepositorio = new MateriasRepositorio();
    } 

    async registrarMateria(req, res) {
        try {
            const {nome_materia} = req.body;

            if(!nome_materia) {
                return res.status(404).json({ error: "Todos os campos são obrigatórios."})
            }

            await this.MateriasRepositorio.registrarMateria(nome_materia);

            return res.status(200).json({ message: "Disciplina registrada com sucesso."});
        } catch (error) { 
            console.error("Erro ao processar solicitação:", error);
            return res.status(500).json({ error: "Erro interno do servidor."});
    }
}

    async obterMateriaPorId(req, res) {
        const id = req.params.id;

        try {
            const disciplina = await this.MateriasRepositorio.obterMateriaPorId(id);

            if(!disciplina) {
                return res.status(404).json({ error: "Disciplina não encontrada." });
            }

            return res.status(200).json(disciplina);
        } catch (error) {
            console.error("Erro ao obter a disciplina por ID:", error);
            return res.status(500).json({ error: "Erro interno do servidor."});    }
        }


        async obterTodasMaterias(req, res) {
            try {
                const { page, pageSize } = req.query;
                const pageNumber = parseInt(page, 10) || 1;
                const pageSizeNumber = parseInt(pageSize, 10) || 10;
    
                const todasMateriasComPaginacao = await MateriasRepositorio.obterTodasMaterias(pageNumber, pageSizeNumber);
    
                return res.status(200).json(todasMateriasComPaginacao);
            } catch (error) {
                console.error('Erro ao obter todas as matérias:', error.message);
                return res.status(500).json({ error: 'Erro interno do servidor.' });
            }
        }



        async atualizarMateria(req, res) {
            try {
                const id = req.params.id;
                const {nome_materia} = req.body;

                if(!nome_materia) {
                    return res.status(400).json({ error: "Todos os campos devem ser preenchidos."});
            }

            await this.MateriasRepositorio.atualizarMateria(id, nome_materia);
            return res.status(200).json({ message: "Disciplina cadastrada com sucesso."});
        } catch (error) {
            console.error('Erro ao processar solicitação de atualização:', error);
            return res.status(500).json({ error: 'Erro interno do servidor.' });
        }
    }


    async excluirMateriaPorId(req, res) {
        try {
            const id = req.params.id;
            const resultadoExclusao = await this.MateriasRepositorio.excluirMateriaPorId(id);

            if(resultadoExclusao) {
                return res.status(200).json({ message: "Disciplina deletada com sucesso."});
            } else {
                return res.status(404).json({ message: "Disciplina não encontrada" });
            }
        } catch (error) {
            console.error("Erro ao processar solicatação de exclusão", error);
            return res.status(500).json({error: "Erro interno do servidor."});
        }
    }


}

module.exports = materiasController;