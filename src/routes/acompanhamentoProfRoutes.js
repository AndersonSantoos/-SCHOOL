const express = require('express');
const AcompanhamentoController = require('../controllers/acompanhamentoController');

const router = express.Router();
const acompanhamentoController = new AcompanhamentoController();

// Rota para cadastrar um evento
router.post('/cadastrar-evento', async (req, res) => {
    await acompanhamentoController.cadastrarEvento(req, res);               //FUNCIONANDO
});

// Rota para atualizar um acompanhamento
router.put('/atualizar-acompanhamento/:id', async (req, res) => {
    await acompanhamentoController.atualizarAcompanhamento(req, res);       //FUNCIONANDO
});

// Rota para recuperar informações de um acompanhamento
router.get('/recuperar-acompanhamento/:id', async (req, res) => {           //FUNCIONANDO
    await acompanhamentoController.recuperarAcompanhamento(req, res);
});

// Rota para excluir um acompanhamento (soft delete)
router.delete('/excluir-acompanhamento/:id', async (req, res) => {          //FUNCIONANDO
    await acompanhamentoController.excluirAcompanhamento(req, res);
});

module.exports = router;
