const express = require('express');
const router = express.Router();
const AcompanhamentoPsicologicoController = require("../controllers/psicologoController"); 
const acompanhamentoPsicologicoController = new AcompanhamentoPsicologicoController(); 

router.post('/add_psicologico', async (req, res) => {
    try{
        await acompanhamentoPsicologicoController.registrarAcompanhamentoPsicologico(req, res);
    } catch (error) {
        console.error('Erro ao registrar acompanhamento Psicológico:', error.message);
        res.status(500).json({ error: 'Erro ao registrar acompanhamento Psicológico.' });
    }
    });

router.get('/info_psicologico/:id', async (req, res) => {
    try{
        await acompanhamentoPsicologicoController.obterAcompnhamentoPorId(req, res); 
    } catch (error) {
        console.error('Erro ao obter acompanhamento por ID:', error.message);
        res.status(500).json({ error: 'Erro ao obter acompanhamento por ID.' });
    }
    });

router.get("/todos_acompanhamentos_psicologicos", async (req, res) => {
    try{
        await acompanhamentoPsicologicoController.obterTodosAcompanhamentosPsicologicos(req, res);
    } catch (error) {
        console.error('Erro ao obter todos acompanhamentos Psicológicos:', error.message);
        res.status(500).json({ error: 'Erro ao obter todos acompanhamentos Psicológicos.' });
    }
    });

router.put('/edit_psicologico/:id', async (req, res) => {
    try{
        await acompanhamentoPsicologicoController.atualizarAcompanhamentoPsicologico(req, res);
    } catch (error) {
        console.error('Erro ao atualizar acompanhamento Psicológico:', error.message);
        res.status(500).json({ error: 'Erro ao atualizar acompanhamento Psicológico.' });
    }
    });

router.delete('/excluir_psicologico/:id', async (req, res) => {
    try{
        await acompanhamentoPsicologicoController.excluirAcompanhamentoPsicologico(req, res);
    } catch (error) {
        console.error('Erro ao excluir acompanhamento Psicológico:', error.message);
        res.status(500).json({ error: 'Erro ao excluir acompanhamento Psicológico.' });
    }
    });

module.exports = router;