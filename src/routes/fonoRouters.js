const express = require('express');
const router = express.Router();
const AcompanhamentoFonoController = require('../controllers/registroFonoaudiologoController'); // Certifique-se de que a capitalização está correta

const acompanhamentoFonoController = new AcompanhamentoFonoController();

// Rota para registrar um novo acompanhamento fonoaudiológico
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
