const express = require('express');
const router = express.Router();
const MateriasController = require('../controllers/materiasController');
const materiasController = new MateriasController();
const authenticationMiddleware = require('../middleware/authenticationMiddleware'); // Importe o middleware de autenticação

router.post("/add_materia", authenticationMiddleware, async (req, res, next) => {
   try{
      await materiasController.registrarMateria(req, res);
      next();
   }catch (error) {
      console.error('Erro ao registrar matéria:', error.message);
      res.status(500).json({ error: 'Erro ao registrar matéria.' });
   }
   });

router.get("/info_materia/:id", authenticationMiddleware, async (req, res, next) => {
   try{
      await materiasController.obterMateriaPorId(req, res);
      next();
   }catch (error) {
      console.error('Erro ao obter matéria por ID:', error.message);
      res.status(500).json({ error: 'Erro ao obter  matéria por ID.' });
   }
   });

router.get('/todas_materias', authenticationMiddleware, async (req, res, next) => {
   try{
      await MateriasController.obterTodasMaterias(req, res);
      next();
   } catch (error) {
      console.error('Erro ao obter todos as matérias:', error.message);
      res.status(500).json({ error: 'Erro ao obter todos as matérias.' });
   }
   });

   router.put('/edit_materia/:id', authenticationMiddleware, async (req, res, next) => {
      try {
          await materiasController.atualizarMateria(req, res);
          next();
      } catch (error) {
          console.error('Erro ao atualizar matéria:', error.message);
          res.status(500).json({ error: 'Erro ao atualizar matéria.' });
      }
  });
  
  router.delete('/excluir_materia/:id', authenticationMiddleware, async (req, res, next) => {
      try {
          await materiasController.excluirMateriaPorId(req, res);
          next();
      } catch (error) {
          console.error('Erro ao excluir matéria:', error.message);
          res.status(500).json({ error: 'Erro ao excluir matéria.' });
      }
  });

module.exports = router;