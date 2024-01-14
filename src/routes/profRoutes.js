const express = require('express');
const AcompanhamentoController = require('../controllers/profController');
const router = express.Router();
const acompanhamentoController = new AcompanhamentoController();
const authenticationMiddleware = require('../middleware/authenticationMiddleware'); // Importe o middleware de autenticação

router.post('/add_prof', authenticationMiddleware, async (req, res, next) => {
    try{
        await acompanhamentoController.cadastrarEvento(req, res);
        next();
    } catch (error) {
        console.error('Erro ao cadastrar evento:', error.message);
        res.status(500).json({ error: 'Erro ao cadastrar evento.' });
    }
    });

router.put('/edit_prof/:id', authenticationMiddleware, async (req, res, next) => {
    try{
        await acompanhamentoController.atualizarAcompanhamento(req, res);
        next();
    } catch (error) {
        console.error('Erro ao atualizar acompanhamento:', error.message);
        res.status(500).json({ error: 'Erro ao editar acompanhamento.' });
    }
    });

router.get('/info_prof/:id', authenticationMiddleware, async (req, res, next) => {     
    try{
        await acompanhamentoController.recuperarAcompanhamento(req, res);
        next();
    } catch (error) {
        console.error('Erro ao recuperar acompanhamento:', error.message);
        res.status(500).json({ error: 'Erro ao recuperar acompanhamento.' });
    }                
    });

router.get('/todos_acompanhamentos', authenticationMiddleware, async (req, res, next) => {
    try{
        await acompanhamentoController.obterTodosAcompanhamentos(req, res);   
        next();
    } catch (error) {
        console.error('Erro ao obter todos acompanhamentos:', error.message);
        res.status(500).json({ error: 'Erro ao obter todos acompanhamentos.' });
    }
    });

router.get('/obter_historico/:id', authenticationMiddleware, async (req, res, next) => {
    try{
        await acompanhamentoController.obterHistoricoAcompanhamento(req, res);
        next();
    } catch (error) {
        console.error('Erro ao obter histórico de acompanhamento:', error.message);
        res.status(500).json({ error: 'Erro ao obter histórico de acompanhamento.' });
    }
    });

router.get('/obter_ultima_versao/:id', authenticationMiddleware, async (req, res, next) => {
    try{
        await acompanhamentoController.obterUltimaVersaoAcompanhamento(req, res);
        next();
    } catch (error) {
        console.error('Erro ao obter última versão de acompanhamento:', error.message);
        res.status(500).json({ error: 'Erro ao obter última versão de acompanhamento.' });
    }
   });
   
router.delete('/excluir_prof/:id', authenticationMiddleware, async (req, res, next) => {
    try{
        await acompanhamentoController.excluirAcompanhamento(req, res);
        next();
    } catch (error) {
        console.error('Erro ao excluir acompanhamento:', error.message);
        res.status(500).json({ error: 'Erro ao excluir acompanhamento.' });
    }                
    });

module.exports = router;