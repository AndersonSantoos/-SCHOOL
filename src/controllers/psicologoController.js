const acompanhamentoPsicologicoRepository = require("../repository/psicologoRepositorio");

class AcompanhamentoPsicologicoController {
    constructor() {
        this.acompanhamentoPsicologicoRepository = new acompanhamentoPsicologicoRepository();
    }

    async registrarAcompanhamentoPsicologico(req, res) {
        try {
            const { aluno, observacoes, documentos } = req.body;

            if(!aluno || !observacoes || !documentos) {
                return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
            }

            await this.acompanhamentoPsicologicoRepository.registrarAcompanhamentoPsicologico(aluno, observacoes, documentos);
            return res.status(200).json({ message: 'Acompanhamento psicologico registrado com sucesso.' });
        } catch (error) {
            console.log("Erro ao processar a solicitação" + error);
            return res.status(500).json({ error: 'Erro interno do servidor.' });
        }
    }


    async obterAcompnhamentoPorId(req, res) {
        const id = req.params;

        try {
            const acompanhamento = await this.acompanhamentoPsicologicoRepository.obterAcompanhamentoPorId(id);
            if(!acompanhamento) {
                return res.status(404).json({ error: 'Acompanhamento não encontrado.' });
            }

            return res.status(200).json(acompanhamento);
        } catch (error) {
            console.error('Erro ao obter acompanhamento por ID:', error);
            return res.status(500).json({ error: 'Erro interno do servidor.' });
        }
    }

    async atualizarAcompanhamentoPsicologico(req, res) {
        try {
            const id = req.params.id;
            const { aluno, observacoes, documentos } = req.body;

            if(!aluno || !observacoes || !documentos) {
                return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
            }

            await this.acompanhamentoPsicologicoRepository.atualizarAcompanhamentoPsicologico(id, aluno, observacoes, documentos);
            return res.status(200).json({ message: 'Acompanhamento psicologico atualizado com sucesso.' });
        } catch (error) {
            console.error('Erro ao processar solicitação de atualização:', error);
            return res.status(500).json({ error: 'Erro interno do servidor.' });
        }
    }

    async excluirAcompanhamentoPsicologico(req, res) {
        try {
            const id = req.params.id;
            const resultadoExclusao = await this.acompanhamentoPsicologicoRepository.excluirAcompanhamentoPsicologico(id);
    
            if (resultadoExclusao) {
                return res.status(200).json({ message: 'Acompanhamento psicológico excluído com sucesso.' });
            } else {
                return res.status(404).json({ error: 'Acompanhamento psicológico não encontrado.' });
            }
        } catch (error) {
            console.error('Erro ao processar solicitação de exclusão:', error);
            return res.status(500).json({ error: 'Erro interno do servidor.' });
        }
    }
    
}

module.exports = AcompanhamentoPsicologicoController;