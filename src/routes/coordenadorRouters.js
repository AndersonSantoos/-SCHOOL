const express = require("express");
const router = express.Router();
const AcompanhamentoCoordenadorController = require("../controllers/coordenadorController");
const acompanhamentoCoordenadorController = new AcompanhamentoCoordenadorController();
const authenticationMiddleware = require('../middleware/authenticationMiddleware'); 

router.post("/add_coordenador", authenticationMiddleware, async (req, res, next) => {
    try{
        await acompanhamentoCoordenadorController.registrarAcompanhamentoCoordenador(req, res);
        next();
    } catch (error) {
        console.error('Erro ao adicionar acompanhamento:', error.message);
        res.status(500).json({ error: 'Erro ao adicionar acompanhamento.' });
    }
    });

router.get("/info_coordenador/:id", authenticationMiddleware, async (req, res, next) => {
    try{
        await acompanhamentoCoordenadorController.obterAcompanhamentoPorId(req, res);
        next();
    } catch (error) {
        console.error('Erro ao obter informações do acompanhamento po ID:', error.message);
        res.status(500).json({ error: 'Erro ao obter informações do acompanhamento por ID.' });
    }
    });

router.get("/todos_acompanhamentos", authenticationMiddleware, async (req, res, next) => {
    try{
        await acompanhamentoCoordenadorController.obterTodosAcompanhamentos(req, res);
        next();
    } catch (error) {
        console.error('Erro ao obter todos os acompanhamentos :', error.message);
        res.status(500).json({ error: 'Erro ao obter todos os acompanhamentos .' });
    }    
    });

router.put('/edit_coordenador/:id', authenticationMiddleware, async (req, res, next) => {
    try{
        await acompanhamentoCoordenadorController.atualizarAcompanhamento(req, res);
        next();
    } catch (error) {
        console.error('Erro ao atualizar acompanhamento:', error.message);
        res.status(500).json({ error: 'Erro ao atualizar acompanhamento.' });
    }
    });

router.delete("/excluir_coordenador/:id", authenticationMiddleware, async (req, res, next) => {
    try{
        await acompanhamentoCoordenadorController.excluirAcompanhamento(req, res);
        next();
    } catch (error) {
        console.error('Erro ao excluir acompanhamento:', error.message);
        res.status(500).json({ error: 'Erro ao excluir acompanhamento.' });
    }
    });

module.exports = router;