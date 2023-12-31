const express = require('express');
const router = express.Router();
const AcompanhamentoPsicologicoController = require("../controllers/psicologoController"); 
const acompanhamentoPsicologicoController = new AcompanhamentoPsicologicoController(); 

router.post('/cadastrarPsicologico', (req, res) => {
    acompanhamentoPsicologicoController.registrarAcompanhamentoPsicologico(req, res);
});

router.get('/infoPsicologico/:id', (req, res) => {
    acompanhamentoPsicologicoController.obterAcompnhamentoPorId(req, res); // Corrigido o nome da função
});

router.put('/atualizarPsicologico/:id', (req, res) => {
    acompanhamentoPsicologicoController.atualizarAcompanhamentoPsicologico(req, res);
});

router.delete('/excluirPsicologico/:id', (req, res) => {
    acompanhamentoPsicologicoController.excluirAcompanhamentoPsicologico(req, res);
});

module.exports = router;
