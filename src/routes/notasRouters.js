const express = require('express');
const router = express.Router();
const NotasController = require('../controllers/notasController');
const notasController = new NotasController();
const authenticationMiddleware = require('../middleware/authenticationMiddleware'); // Importe o middleware de autenticação

router.post("/add_notas", authenticationMiddleware, async (req, res, next) => {
   try{
      await notasController.criarNota(req, res);
      next();
   }catch (error) {
      console.error('Erro ao adicionar nota:', error.message);
      res.status(500).json({ error: 'Erro ao adicionar nota.' });
   }
   });

router.get("/info_notas/:id", authenticationMiddleware, async (req, res, next) => {
   try{
      await notasController.recuperarNotas(req, res);
      next();
   } catch (error) {
      console.error('Erro ao recuperar notas:', error.message);
      res.status(500).json({ error: 'Erro ao recuperar notas.' });
   }
   });

   router.get("/todas_notas", authenticationMiddleware, async (req, res, next) => {
      try {
        await notasController.notasPorPaginacao(req, res);
        next();
      } catch (error) {
        console.error('Erro ao recuperar notas:', error.message);
        res.status(500).json({ error: 'Erro ao recuperar notas.' });
      }
    });
   
router.put("/edit_notas/:id", authenticationMiddleware, async (req, res, next) => {
   try{
      await notasController.atualizarNota(req, res);
      next();
   } catch (error) {
      console.error('Erro ao atualizar nota:', error.message);
      res.status(500).json({ error: 'Erro ao atualizar nota.' });
   }
   });

router.delete("/excluir_notas/:id", authenticationMiddleware, async (req, res, next) => {
   try{
      await notasController.excluirNota(req, res);
      next();
   } catch (error) {
      console.error('Erro ao excluir nota:', error.message);
      res.status(500).json({ error: 'Erro ao excluir nota.' });
   }
   });
module.exports = router;