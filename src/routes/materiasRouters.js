const express = require('express');
const router = express.Router();
const MateriasController = require('../controllers/materiasController');
const materiasController = new MateriasController();

router.post("/add_materia", async (req, res) => {
   try{
      await materiasController.registrarMateria(req, res);
   }catch (error) {
      console.error('Erro ao registrar matéria:', error.message);
      res.status(500).json({ error: 'Erro ao registrar matéria.' });
   }
   });

router.get("/info_materia/:id", async (req, res) => {
   try{
      await materiasController.obterMateriaPorId(req, res);
   }catch (error) {
      console.error('Erro ao obter matéria por ID:', error.message);
      res.status(500).json({ error: 'Erro ao obter  matéria por ID.' });
   }
   });

router.get('/todas_materias', async (req, res) => {
   try{
      await MateriasController.obterTodasMaterias(req, res);
   } catch (error) {
      console.error('Erro ao obter todos as matérias:', error.message);
      res.status(500).json({ error: 'Erro ao obter todos as matérias.' });
   }
   });

module.exports = router;