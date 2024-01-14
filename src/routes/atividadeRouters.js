const express = require("express");
const router = express.Router();
const atividadeController = require("../controllers/atividadeController");
const AtividadeController = new atividadeController();
const authenticationMiddleware = require('../middleware/authenticationMiddleware'); // Importe o middleware de autenticação

router.post("/add_atividade", authenticationMiddleware, async (req, res, next) => {
    try{
        await AtividadeController.registrarAtividade(req, res);
        next();
    } catch (error) {
        console.error('Erro ao inserir informações da atividade:', error.message);
        res.status(500).json({ error: 'Erro ao inserir informações da atividade.' });
    }
    });

router.get("/info_atividade/:id", authenticationMiddleware, async (req, res, next) => {
    try{
        await AtividadeController.obterAtividadePorId(req, res);
        next();
    } catch (error) {
        console.error('Erro ao obter atividade por ID:', error.message);
        res.status(500).json({ error: 'Erro ao obter atividade por ID.' });
    }
   });

router.get('/todasAtividades', authenticationMiddleware, async (req, res, next) => {
    try{
        await atividadeController.obterTodasAtividades(req, res);
        next();
    } catch(error) {
        console.error('Erro ao obter todas atividades:', error.message);
        res.status(500).json({ error: 'Erro ao obter todas atividades.' });
    }
    });

router.put("/edit_atividade/:id", authenticationMiddleware, async (req, res, next) => {
    try{
        await AtividadeController.atualizarAtividade(req, res);
        next();
    } catch (error){
        console.error('Erro ao atualizar atividade:', error.message);
        res.status(500).json({ error: 'Erro ao atualizar atividade.' });
    }
    });

router.delete("/excluir_atividade/:id", authenticationMiddleware, async (req, res, next) => {
    try{
        await AtividadeController.excluirAtividadePorId(req, res);
        next();
    } catch (error) {
        console.error('Erro ao excluir atividade por ID:', error.message);
        res.status(500).json({ error: 'Erro ao excluir atividade por ID.' });
    }
    });

module.exports = router;