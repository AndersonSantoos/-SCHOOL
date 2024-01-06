const express = require("express");
const router = express.Router();
const unidadesController = require("../controllers/unidadesController");
const UnidadesController = new unidadesController();


router.post("/add_unidade", async (req, res) => {
    await UnidadesController.registrarUnidade(req, res);
});


router.get("/info_unidade/:id", async (req, res) => {
    await UnidadesController.obterUnidadePorId(req, res);
});


router.get("/todas_unidades", async (req, res) => {
    await unidadesController.obterTodasUnidades(req, res);
});


router.put("/edit_unidade/:id", async (req, res) => {
    await UnidadesController.atualizarUnidade(req, res); //
});


router.delete("/excluir_unidade/:id", async (req, res) => {
    await UnidadesController.excluirUnidadePorId(req, res);
});


module.exports = router;