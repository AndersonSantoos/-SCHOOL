const AcompanhamentoFonoRepository = require('../repository/fonoRepositorio');

class AcompanhamentoFonoController {
    constructor() {
        this.acompanhamentoFonoRepository = new AcompanhamentoFonoRepository();
    }

    async registrarAcompanhamento(req, res) {
        try {
            const { aluno, observacoes, documentos } = req.body;

            if (!aluno || !observacoes || !documentos) {
                return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
            }

            await this.acompanhamentoFonoRepository.registrarAcompanhamentoFonoaudiologo(aluno, observacoes, documentos);

            return res.status(200).json({ message: 'Acompanhamento fonoaudiológico registrado com sucesso.' });
        } catch (error) {
            console.error('Erro ao processar solicitação:', error);
            return res.status(500).json({ error: 'Erro interno do servidor.' });
        }
    }


    async obterAcompanhamentoPorId(req, res) {
        const id = req.params.id;
    
        try {
            const acompanhamento = await this.acompanhamentoFonoRepository.obterAcompanhamentoPorId(id);
    
            if (!acompanhamento) {
                return res.status(404).json({ error: 'Acompanhamento não encontrado.' });
            }
    
            return res.status(200).json(acompanhamento);
        } catch (error) {
            console.error('Erro ao obter acompanhamento por ID:', error);
            return res.status(500).json({ error: 'Erro interno do servidor.' });
        }
    }
    

    async atualizarAcompanhamento(req, res) {
        try {
            const id = req.params.id;
            const { aluno, observacoes, documentos } = req.body;

            if (!aluno || !observacoes || !documentos) {
                return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
            }

            // Aqui você deve implementar a lógica para atualizar o acompanhamento com o ID fornecido
            // Utilize o método do seu repositório para realizar a atualização

            // Exemplo hipotético:
            await this.acompanhamentoFonoRepository.atualizarAcompanhamentoFonoaudiologo(id, aluno, observacoes, documentos);

            return res.status(200).json({ message: 'Acompanhamento fonoaudiológico atualizado com sucesso.' });
        } catch (error) {
            console.error('Erro ao processar solicitação de atualização:', error);
            return res.status(500).json({ error: 'Erro interno do servidor.' });
        }
    }

    async excluirAcompanhamento(req, res) {
        try {
            const id = req.params.id;

            // Aqui você deve implementar a lógica para excluir o acompanhamento com o ID fornecido
            // Utilize o método do seu repositório para realizar a exclusão

            // Exemplo hipotético:
            await this.acompanhamentoFonoRepository.excluirAcompanhamentoFonoaudiologo(id);

            return res.status(200).json({ message: 'Acompanhamento fonoaudiológico excluído com sucesso.' });
        } catch (error) {
            console.error('Erro ao processar solicitação de exclusão:', error);
            return res.status(500).json({ error: 'Erro interno do servidor.' });
        }
    }
    


}

module.exports = AcompanhamentoFonoController;
