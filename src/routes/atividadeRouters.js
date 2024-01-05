const express = require("express");
const router = express.Router();
const atividadeController = require("../controllers/atividadeController");
const AtividadeController = new atividadeController();


router.post("/add_atividade", async (req, res) => {
    await AtividadeController.registrarAtividade(req, res);
})

router.get("/info_atividade/:id", async (req, res) => {
    await AtividadeController.obterAtividadePorId(req, res);
})

router.put("/edit_atividade/:id", async (req, res) => {
    await AtividadeController.atualizarAtividade(req, res);
});

router.delete("/excluir_atividade/:id", async (req, res) => {
    await AtividadeController.excluirAtividadePorId(req, res);
});


module.exports = router;