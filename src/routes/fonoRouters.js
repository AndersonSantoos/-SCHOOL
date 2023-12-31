const express = require('express');
const router = express.Router();
const AcompanhamentoFonoController = require('../controllers/fonoController');

const acompanhamentoFonoController = new AcompanhamentoFonoController();


router.post('/', (req, res) => {
    acompanhamentoFonoController.registrarAcompanhamento(req, res);
});

router.get('/info/:id', (req, res) => {
    acompanhamentoFonoController.obterAcompanhamentoPorId(req, res);
});

router.put('/atualizar/:id', (req, res) => {
    acompanhamentoFonoController.atualizarAcompanhamento(req, res);
});

router.delete('/excluir/:id', (req, res) => {
    acompanhamentoFonoController.excluirAcompanhamento(req, res);
});

module.exports = router;
