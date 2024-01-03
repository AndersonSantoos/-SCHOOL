const express = require('express');
const router = express.Router();
const AcompanhamentoFonoController = require('../controllers/fonoController');

const acompanhamentoFonoController = new AcompanhamentoFonoController();


router.post('/add_fono', async (req, res) => {
    await acompanhamentoFonoController.registrarAcompanhamento(req, res);
});

router.get('/info_fono/:id', async (req, res) => {
    await acompanhamentoFonoController.obterAcompanhamentoPorId(req, res);
});

router.put('/edit_fono/:id', async (req, res) => {
    await acompanhamentoFonoController.atualizarAcompanhamento(req, res);
});

router.delete('/excluir_fono/:id', async (req, res) => {
    await acompanhamentoFonoController.excluirAcompanhamento(req, res);
});

module.exports = router;
