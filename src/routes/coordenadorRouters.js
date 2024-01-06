const express = require("express");
const router = express.Router();
const AcompanhamentoCoordenadorController = require("../controllers/coordenadorController");
const acompanhamentoCoordenadorController = new AcompanhamentoCoordenadorController();

router.post("/add_coordenador", async (req, res) => {
    await acompanhamentoCoordenadorController.registrarAcompanhamentoCoordenador(req, res);
});


router.get("/info_coordenador/:id", async (req, res) => {
    await acompanhamentoCoordenadorController.obterAcompanhamentoPorId(req, res);
});


router.get("/todos_acompanhamentos", async (req, res) => {
    await acompanhamentoCoordenadorController.obterTodosAcompanhamentos(req, res);
});



router.put('/edit_coordenador/:id', async (req, res) => {
    await acompanhamentoCoordenadorController.atualizarAcompanhamento(req, res);
});


router.delete("/excluir_coordenador/:id", async (req, res) => {
    await acompanhamentoCoordenadorController.excluirAcompanhamento(req, res);
});

module.exports = router;
