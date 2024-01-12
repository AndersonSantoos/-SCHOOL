const AcompanhamentoFonoRepository = require('../repository/fonoRepositorio');

class AcompanhamentoFonoController {
    constructor() {
        this.acompanhamentoFonoRepository = new AcompanhamentoFonoRepository();
    }

    async registrarAcompanhamento(req, res) {
        try {
            const {matriculaAluno, aluno, observacoes, documentos } = req.body;

            if (!matriculaAluno || !aluno || !observacoes || !documentos) {
                return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
            }
            await this.acompanhamentoFonoRepository.registrarAcompanhamentoFonoaudiologo(matriculaAluno, aluno, observacoes, documentos);
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

    async obterTodosAcompanhamentosFonoaudiologicos(req, res) {
        try {
            const { page, pageSize } = req.query;
            const pageNumber = parseInt(page, 10) || 1;
            const pageSizeNumber = parseInt(pageSize, 10) || 10;
            const acompanhamentoFonoRepository = new AcompanhamentoFonoRepository();
            const acompanhamentosComPaginacao = await acompanhamentoFonoRepository.obterTodosAcompanhamentosFonoaudiologicos(
                pageNumber,
                pageSizeNumber
            );

            return res.status(200).json(acompanhamentosComPaginacao);
        } catch (error) {
            console.error('Erro ao obter todos os acompanhamentos fonoaudiológicos:', error.message);
            return res.status(500).json({ error: 'Erro interno do servidor.' });
        }
    }
    
    async atualizarAcompanhamento(req, res) {
        try {
            const id = req.params.id;
            const { matriculaAluno, aluno, observacoes, documentos } = req.body;
            if (!matriculaAluno || !aluno || !observacoes || !documentos) {
                return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
            }
            await this.acompanhamentoFonoRepository.atualizarAcompanhamentoFonoaudiologo(id, matriculaAluno, aluno, observacoes, documentos);
            return res.status(200).json({ message: 'Acompanhamento fonoaudiológico atualizado com sucesso.' });
        } catch (error) {
            console.error('Erro ao processar solicitação de atualização:', error);
            return res.status(500).json({ error: 'Erro interno do servidor.' });
        }
    }

    async obterHistoricoAcompanhamentoPorIdController(req, res) {
        const id = req.params.id;
        try {
            const historico = await this.acompanhamentoFonoRepository.obterHistoricoAcompanhamentoPorId(id);
            if (!historico) {
                return res.status(404).json({ error: 'Histórico de acompanhamento fonoaudiológico não encontrado.' });
            }
            return res.status(200).json(historico);
        } catch (error) {
            console.error('Erro ao obter histórico de acompanhamento (fono) por ID no controlador:', error);
            return res.status(500).json({ error: 'Erro interno do servidor.' });
        }
    }
    
    async obterTodosHistoricosAcompanhamentoFono(req, res) {
        try {
            const { page, pageSize } = req.query;
            const pageNumber = parseInt(page, 10) || 1;
            const pageSizeNumber = parseInt(pageSize, 10) || 10;
            const historicosComPaginacao = await this.acompanhamentoFonoRepository.obterTodosHistoricosAcompanhamentoFono(
                pageNumber,
                pageSizeNumber
            );
            return res.status(200).json(historicosComPaginacao);
        } catch (error) {
            console.error('Erro ao obter todos os históricos de acompanhamento fonoaudiológicos:', error.message);
            return res.status(500).json({ error: 'Erro interno do servidor.' });
        }
    }
    

    async excluirAcompanhamentoFonoaudiologoController(req, res) {
        const id = req.params.id;
        try {
            const acompanhamentoExcluido = await this.acompanhamentoFonoRepository.excluirAcompanhamentoFonoaudiologo(id);
            if (acompanhamentoExcluido) {
                res.json({ message: 'Acompanhamento fonoaudiológico excluído com sucesso.' });
            } else {
                res.status(404).json({ error: 'Acompanhamento fonoaudiológico não encontrado.' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erro ao excluir acompanhamento fonoaudiológico.' });
        }
    }
}
module.exports = AcompanhamentoFonoController;
