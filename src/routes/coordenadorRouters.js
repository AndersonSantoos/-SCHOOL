const express = require("express");
const router = express.Router();
const AcompanhamentoCoordenadorController = require("../controllers/coordenadorController");
const acompanhamentoCoordenadorController = new AcompanhamentoCoordenadorController();

router.post("/add_coordenador", async (req, res) => {
    try{
        await acompanhamentoCoordenadorController.registrarAcompanhamentoCoordenador(req, res);
    } catch (error) {
        console.error('Erro ao adicionar acompanhamento:', error.message);
        res.status(500).json({ error: 'Erro ao adicionar acompanhamento.' });
    }
    });

router.get("/info_coordenador/:id", async (req, res) => {
    try{
        await acompanhamentoCoordenadorController.obterAcompanhamentoPorId(req, res);
    } catch (error) {
        console.error('Erro ao obter informações do acompanhamento po ID:', error.message);
        res.status(500).json({ error: 'Erro ao obter informações do acompanhamento por ID.' });
    }
    });

router.get("/todos_acompanhamentos", async (req, res) => {
    try{
        await acompanhamentoCoordenadorController.obterTodosAcompanhamentos(req, res);
    } catch (error) {
        console.error('Erro ao obter todos os acompanhamentos :', error.message);
        res.status(500).json({ error: 'Erro ao obter todos os acompanhamentos .' });
    }    
    });

router.put('/edit_coordenador/:id', async (req, res) => {
    try{
        await acompanhamentoCoordenadorController.atualizarAcompanhamento(req, res);
    } catch (error) {
        console.error('Erro ao atualizar acompanhamento:', error.message);
        res.status(500).json({ error: 'Erro ao atualizar acompanhamento.' });
    }
    });

router.delete("/excluir_coordenador/:id", async (req, res) => {
    try{
        await acompanhamentoCoordenadorController.excluirAcompanhamento(req, res);
    } catch (error) {
        console.error('Erro ao excluir acompanhamento:', error.message);
        res.status(500).json({ error: 'Erro ao excluir acompanhamento.' });
    }
    });

module.exports = router;