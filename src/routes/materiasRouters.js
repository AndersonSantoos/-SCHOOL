const express = require('express');
const router = express.Router();
const MateriasController = require('../controllers/materiasController');
const materiasController = new MateriasController();


router.post("/add_materia", async (req, res) => {
   await materiasController.registrarMateria(req, res);
});


router.get("/info_materia/:id", async (req, res) => {
   await materiasController.obterMateriaPorId(req, res);
});


router.put("/edit_materia/:id", async (req, res) => {
   await materiasController.atualizarMateria(req, res);
});


router.delete("/excluir_materia/:id", async (req, res) => {
   await materiasController.excluirMateriaPorId(req, res);
});

module.exports = router;
