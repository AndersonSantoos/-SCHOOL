const express = require('express');
const router = express.Router();
const AcompanhamentoFonoController = require('../controllers/fonoController');
const acompanhamentoFonoController = new AcompanhamentoFonoController();
const jwt = require('jsonwebtoken');
const authenticationMiddleware = require('../middleware/authenticationMiddleware');

router.post('/gerar_token', (req, res) => {
    const userData = {
        userId: '123456',
        username: 'exemplo',
    };
    const token = jwt.sign(userData, process.env.SECRET_KEY, { expiresIn: '30d' });
    res.json({ token });
});

router.post('/add_fono', authenticationMiddleware, async (req, res, next) => {
    try {
        await acompanhamentoFonoController.registrarAcompanhamento(req, res);
        next();
    } catch (error) {
        console.error('Erro ao adicionar acompanhamento:', error.message);
        res.status(500).json({ error: 'Erro ao adicionar acompanhamento.' });
    }
});

router.get('/info_fono/:id', authenticationMiddleware, async (req, res, next) => {
    try {
        await acompanhamentoFonoController.obterAcompanhamentoPorId(req, res);
        next();
    } catch (error) {
        console.error('Erro ao obter informações do acompanhamento:', error.message);
        res.status(500).json({ error: 'Erro ao obter informações do acompanhamento.' });
    }
});

router.get('/todos_acompanhamentos_fonoaudiologicos', authenticationMiddleware, async (req, res, next) => {
    try {
        await acompanhamentoFonoController.obterTodosAcompanhamentosFonoaudiologicos(req, res);
        next();
    } catch (error) {
        console.error('Erro ao obter todos os acompanhamentos fonoaudiológicos:', error.message);
        res.status(500).json({ error: 'Erro ao obter todos os acompanhamentos fonoaudiológicos.' });
    }
});

router.get('/obterHistoricoAcompanhamentoPorId/:id', authenticationMiddleware, async (req, res, next) => {
    try {
        const id = req.params.id;
        const historico = await acompanhamentoFonoController.obterHistoricoAcompanhamentoPorIdController(id);
        next();

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

router.get('/todos_historicos', authenticationMiddleware, async (req, res, next) => {
    try {
        await acompanhamentoFonoController.obterTodosHistoricosAcompanhamentoFono(req, res);
        next();
    } catch (error) {
        console.error('Erro ao processar solicitação:', error);
        return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
});

router.put('/edit_fono/:id', authenticationMiddleware, async (req, res, next) => {
    try {
        await acompanhamentoFonoController.atualizarAcompanhamento(req, res);
        next();
    } catch (error) {
        console.error('Erro ao editar acompanhamento:', error.message);
        res.status(500).json({ error: 'Erro ao editar acompanhamento.' });
    }
});

router.delete('/excluir_fono/:id', authenticationMiddleware, async (req, res, next) => {
    try {
        await acompanhamentoFonoController.excluirAcompanhamentoFonoaudiologoController(req, res);
        next();
    } catch (error) {
        console.error('Erro ao excluir acompanhamento:', error.message);
        res.status(500).json({ error: 'Erro ao excluir acompanhamento.' });
    }
});

module.exports = router;
