const express = require('express');
const router = express.Router();
const NotasController = require('../controllers/notasController');
const notasController = new NotasController();

router.post("/notas", async (req, res) => {
   await notasController.criarNota(req, res)
});

router.get("/recuperarNotas", async (req, res) => {
   await notasController.recuperarNotas(req, res)
});

router.put("/atualizarNota/:id", async (req, res) => {
   await notasController.atualizarNota(req, res)
});

router.delete("/excluirNota/:id", async (req, res) => {
   await notasController.excluirNota(req, res)
})


module.exports = router;
