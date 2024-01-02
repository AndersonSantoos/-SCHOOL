const express = require('express');
const AcompanhamentoController = require('../controllers/profController');
const router = express.Router();
const acompanhamentoController = new AcompanhamentoController();

// Rota para cadastrar um evento
router.post('/add_prof', async (req, res) => {
    await acompanhamentoController.cadastrarEvento(req, res);               //FUNCIONANDO
});

// Rota para atualizar um acompanhamento
router.put('/edit_prof/:id', async (req, res) => {
    await acompanhamentoController.atualizarAcompanhamento(req, res);       //FUNCIONANDO
});

// Rota para recuperar informações de um acompanhamento
router.get('/recuperar_prof/:id', async (req, res) => {                     //FUNCIONANDO
    await acompanhamentoController.recuperarAcompanhamento(req, res);
});

// Rota para excluir um acompanhamento (soft delete)    
router.delete('/excluir_prof/:id', async (req, res) => {                    //FUNCIONANDO
    await acompanhamentoController.excluirAcompanhamento(req, res);
});

module.exports = router;
