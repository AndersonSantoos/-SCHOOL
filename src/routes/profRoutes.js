const express = require('express');
const AcompanhamentoController = require('../controllers/profController');
const router = express.Router();
const acompanhamentoController = new AcompanhamentoController();


router.post('/add_prof', async (req, res) => {
    await acompanhamentoController.cadastrarEvento(req, res);               //FUNCIONANDO
});


router.put('/edit_prof/:id', async (req, res) => {
    await acompanhamentoController.atualizarAcompanhamento(req, res);       //FUNCIONANDO
});


router.get('/recuperar_prof/:id', async (req, res) => {                     //FUNCIONANDO
    await acompanhamentoController.recuperarAcompanhamento(req, res);
});

router.get('/todos_acompanhamentos', async (req, res) => {
    await acompanhamentoController.obterTodosAcompanhamentos(req, res);
});

   
router.delete('/excluir_prof/:id', async (req, res) => {                    //FUNCIONANDO
    await acompanhamentoController.excluirAcompanhamento(req, res);
});

module.exports = router;
