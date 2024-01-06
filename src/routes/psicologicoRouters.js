const express = require('express');
const router = express.Router();
const AcompanhamentoPsicologicoController = require("../controllers/psicologoController"); 
const acompanhamentoPsicologicoController = new AcompanhamentoPsicologicoController(); 

router.post('/add_psicologico', async (req, res) => {
    await acompanhamentoPsicologicoController.registrarAcompanhamentoPsicologico(req, res);
});

router.get('/info_psicologico/:id', async (req, res) => {
    await acompanhamentoPsicologicoController.obterAcompnhamentoPorId(req, res); 
});

router.get("/todos_acompanhamentos_psicologicos", async (req, res) => {
    await acompanhamentoPsicologicoController.obterTodosAcompanhamentosPsicologicos(req, res);
});

router.put('/edit_psicologico/:id', async (req, res) => {
    await acompanhamentoPsicologicoController.atualizarAcompanhamentoPsicologico(req, res);
});

router.delete('/excluir_psicologico/:id', async (req, res) => {
    await acompanhamentoPsicologicoController.excluirAcompanhamentoPsicologico(req, res);
});

module.exports = router;
