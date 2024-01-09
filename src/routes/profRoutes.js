const express = require('express');
const AcompanhamentoController = require('../controllers/profController');
const router = express.Router();
const acompanhamentoController = new AcompanhamentoController();


router.post('/add_prof', async (req, res) => {
    await acompanhamentoController.cadastrarEvento(req, res);               
});


router.put('/edit_prof/:id', async (req, res) => {
    await acompanhamentoController.atualizarAcompanhamento(req, res);       
});


router.get('/info_prof/:id', async (req, res) => {                     
    await acompanhamentoController.recuperarAcompanhamento(req, res);
});

router.get('/todos_acompanhamentos', async (req, res) => {
    await acompanhamentoController.obterTodosAcompanhamentos(req, res);
});


router.get('/obter_historico/:id', async (req, res) => {
    await acompanhamentoController.obterHistoricoAcompanhamento(req, res);
});


router.get('/obter_ultima_versao/:id', async (req, res) => {
    await acompanhamentoController.obterUltimaVersaoAcompanhamento(req, res);
})

   
router.delete('/excluir_prof/:id', async (req, res) => {                    
    await acompanhamentoController.excluirAcompanhamento(req, res);
});

module.exports = router;
