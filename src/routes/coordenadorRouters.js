const express = require("express");
const router = express.Router();
const AcompanhamentoCoordenadorController = require("../controllers/coordenadorController");
const acompanhamentoCoordenadorController = new AcompanhamentoCoordenadorController();

router.post("/registrar", async (req, res) => {
    await acompanhamentoCoordenadorController.registrarAcompanhamentoCoordenador(req, res);
});


router.get("/read/:id", async (req, res) => {
    await acompanhamentoCoordenadorController.obterAcompanhamentoPorId(req, res);
});



router.put('/editar/:id', async (req, res) => {
    await acompanhamentoCoordenadorController.atualizarAcompanhamento(req, res);
});


router.delete("/deleteCoordenador/:id", async (req, res) => {
    await acompanhamentoCoordenadorController.excluirAcompanhamento(req, res);
});

module.exports = router;
