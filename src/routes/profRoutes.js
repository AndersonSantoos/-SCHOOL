const express = require('express');
const AcompanhamentoController = require('../controllers/profController');
const router = express.Router();
const acompanhamentoController = new AcompanhamentoController();

router.post('/add_prof', async (req, res) => {
    try{
        await acompanhamentoController.cadastrarEvento(req, res);
    } catch (error) {
        console.error('Erro ao cadastrar evento:', error.message);
        res.status(500).json({ error: 'Erro ao cadastrar evento.' });
    }
    });

router.put('/edit_prof/:id', async (req, res) => {
    try{
        await acompanhamentoController.atualizarAcompanhamento(req, res);
    } catch (error) {
        console.error('Erro ao atualizar acompanhamento:', error.message);
        res.status(500).json({ error: 'Erro ao editar acompanhamento.' });
    }
    });

router.get('/info_prof/:id', async (req, res) => {     
    try{
        await acompanhamentoController.recuperarAcompanhamento(req, res);
    } catch (error) {
        console.error('Erro ao recuperar acompanhamento:', error.message);
        res.status(500).json({ error: 'Erro ao recuperar acompanhamento.' });
    }                
    });

router.get('/todos_acompanhamentos', async (req, res) => {
    try{
        await acompanhamentoController.obterTodosAcompanhamentos(req, res);   
    } catch (error) {
        console.error('Erro ao obter todos acompanhamentos:', error.message);
        res.status(500).json({ error: 'Erro ao obter todos acompanhamentos.' });
    }
    });

router.get('/obter_historico/:id', async (req, res) => {
    try{
        await acompanhamentoController.obterHistoricoAcompanhamento(req, res);
    } catch (error) {
        console.error('Erro ao obter histórico de acompanhamento:', error.message);
        res.status(500).json({ error: 'Erro ao obter histórico de acompanhamento.' });
    }
    });

router.get('/obter_ultima_versao/:id', async (req, res) => {
    try{
        await acompanhamentoController.obterUltimaVersaoAcompanhamento(req, res);
    } catch (error) {
        console.error('Erro ao obter última versão de acompanhamento:', error.message);
        res.status(500).json({ error: 'Erro ao obter última versão de acompanhamento.' });
    }
   });
   
router.delete('/excluir_prof/:id', async (req, res) => {
    try{
        await acompanhamentoController.excluirAcompanhamento(req, res);
    } catch (error) {
        console.error('Erro ao excluir acompanhamento:', error.message);
        res.status(500).json({ error: 'Erro ao excluir acompanhamento.' });
    }                
    });

module.exports = router;