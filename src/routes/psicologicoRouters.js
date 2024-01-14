const express = require('express');
const router = express.Router();
const AcompanhamentoPsicologicoController = require("../controllers/psicologoController"); 
const acompanhamentoPsicologicoController = new AcompanhamentoPsicologicoController(); 
const authenticationMiddleware = require('../middleware/authenticationMiddleware'); // Importe o middleware de autenticação

router.post('/add_psicologico', authenticationMiddleware, async (req, res, next) => {
    try{
        await acompanhamentoPsicologicoController.registrarAcompanhamentoPsicologico(req, res);
        next();
    } catch (error) {
        console.error('Erro ao registrar acompanhamento Psicológico:', error.message);
        res.status(500).json({ error: 'Erro ao registrar acompanhamento Psicológico.' });
    }
    });

router.get('/info_psicologico/:id', authenticationMiddleware, async (req, res, next) => {
    try{
        await acompanhamentoPsicologicoController.obterAcompnhamentoPorId(req, res); 
        next();
    } catch (error) {
        console.error('Erro ao obter acompanhamento por ID:', error.message);
        res.status(500).json({ error: 'Erro ao obter acompanhamento por ID.' });
    }
    });

router.get("/todos_acompanhamentos_psicologicos", authenticationMiddleware, async (req, res, next) => {
    try{
        await acompanhamentoPsicologicoController.obterTodosAcompanhamentosPsicologicos(req, res);
        next();
    } catch (error) {
        console.error('Erro ao obter todos acompanhamentos Psicológicos:', error.message);
        res.status(500).json({ error: 'Erro ao obter todos acompanhamentos Psicológicos.' });
    }
    });

router.put('/edit_psicologico/:id', authenticationMiddleware, async (req, res, next) => {
    try{
        await acompanhamentoPsicologicoController.atualizarAcompanhamentoPsicologico(req, res);
        next();
    } catch (error) {
        console.error('Erro ao atualizar acompanhamento Psicológico:', error.message);
        res.status(500).json({ error: 'Erro ao atualizar acompanhamento Psicológico.' });
    }
    });

router.delete('/excluir_psicologico/:id', authenticationMiddleware, async (req, res, next) => {
    try{
        await acompanhamentoPsicologicoController.excluirAcompanhamentoPsicologico(req, res);
        next();
    } catch (error) {
        console.error('Erro ao excluir acompanhamento Psicológico:', error.message);
        res.status(500).json({ error: 'Erro ao excluir acompanhamento Psicológico.' });
    }
    });

module.exports = router;