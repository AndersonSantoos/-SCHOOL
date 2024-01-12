const express = require('express');
const router = express.Router();
const AcompanhamentoFonoController = require('../controllers/fonoController');
const acompanhamentoFonoController = new AcompanhamentoFonoController();

router.post('/add_fono', async (req, res) => {
    try {
        await acompanhamentoFonoController.registrarAcompanhamento(req, res);
    } catch (error) {
        console.error('Erro ao adicionar acompanhamento:', error.message);
        res.status(500).json({ error: 'Erro ao adicionar acompanhamento.' });
    }
});

router.get('/info_fono/:id', async (req, res) => {
    try {
        await acompanhamentoFonoController.obterAcompanhamentoPorId(req, res);
    } catch (error) {
        console.error('Erro ao obter informações do acompanhamento:', error.message);
        res.status(500).json({ error: 'Erro ao obter informações do acompanhamento.' });
    }
});

router.get('/todos_acompanhamentos_fonoaudiologicos', async (req, res) => {
    try {
        await acompanhamentoFonoController.obterTodosAcompanhamentosFonoaudiologicos(req, res);
    } catch (error) {
        console.error('Erro ao obter todos os acompanhamentos fonoaudiológicos:', error.message);
        res.status(500).json({ error: 'Erro ao obter todos os acompanhamentos fonoaudiológicos.' });
    }
});

router.get('/obterHistoricoAcompanhamentoPorId/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const historico = await acompanhamentoFonoController.obterHistoricoAcompanhamentoPorIdController(id);

        if (historico) {
            res.json(historico);
        } else {
            res.status(404).json({ error: 'Histórico de acompanhamento fonoaudiológico não encontrado.' });
        }
    } catch (error) {
        console.error('Erro ao obter histórico de acompanhamento por ID:', error.message);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
});

router.get('/todos_historicos', async (req, res) => {
    try {
        await acompanhamentoFonoController.obterTodosHistoricosAcompanhamentoFono(req, res);
    } catch (error) {
        console.error('Erro ao processar solicitação:', error);
        return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
});

router.put('/edit_fono/:id', async (req, res) => {
    try {
        await acompanhamentoFonoController.atualizarAcompanhamento(req, res);
    } catch (error) {
        console.error('Erro ao editar acompanhamento:', error.message);
        res.status(500).json({ error: 'Erro ao editar acompanhamento.' });
    }
});

router.delete('/excluir_fono/:id', async (req, res) => {
    try {
        await acompanhamentoFonoController.excluirAcompanhamentoFonoaudiologoController(req, res); // Correção na chamada de função
    } catch (error) {
        console.error('Erro ao excluir acompanhamento:', error.message);
        res.status(500).json({ error: 'Erro ao excluir acompanhamento.' });
    }
});

module.exports = router;
