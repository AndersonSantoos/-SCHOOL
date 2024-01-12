const express = require('express');
const router = express.Router();
const NotasController = require('../controllers/notasController');
const notasController = new NotasController();

router.post("/add_notas", async (req, res) => {
   try{
      await notasController.criarNota(req, res)
   }catch (error) {
      console.error('Erro ao adicionar nota:', error.message);
      res.status(500).json({ error: 'Erro ao adicionar nota.' });
   }
   });

router.get("/info_notas/:id", async (req, res) => {
   try{
      await notasController.recuperarNotas(req, res)
   } catch (error) {
      console.error('Erro ao recuperar notas:', error.message);
      res.status(500).json({ error: 'Erro ao recuperar notas.' });
   }
   });

router.get('/todas_notas', async (req, res) => {
   try{
      await notasController.obterTodasNotas(req, res);
   } catch (error) {
      console.error('Erro ao obter todas notas:', error.message);
      res.status(500).json({ error: 'Erro ao obter todas notas.' });
   }
   });

router.put("/edit_notas/:id", async (req, res) => {
   try{
      await notasController.atualizarNota(req, res)
   } catch (error) {
      console.error('Erro ao atualizar nota:', error.message);
      res.status(500).json({ error: 'Erro ao atualizar nota.' });
   }
   });

router.delete("/excluir_notas/:id", async (req, res) => {
   try{
      await notasController.excluirNota(req, res)
   } catch (error) {
      console.error('Erro ao excluir nota:', error.message);
      res.status(500).json({ error: 'Erro ao excluir nota.' });
   }
   });


module.exports = router;