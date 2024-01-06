const express = require('express');
const router = express.Router();
const NotasController = require('../controllers/notasController');
const notasController = new NotasController();

router.post("/add_notas", async (req, res) => {
   await notasController.criarNota(req, res)
});

router.get("/info_notas/:id", async (req, res) => {
   await notasController.recuperarNotas(req, res)
});

router.get('/todas_notas', async (req, res) => {
   await notasController.obterTodasNotas(req, res);
 });

router.put("/edit_notas/:id", async (req, res) => {
   await notasController.atualizarNota(req, res)
});

router.delete("/excluir_notas/:id", async (req, res) => {
   await notasController.excluirNota(req, res)
})


module.exports = router;
