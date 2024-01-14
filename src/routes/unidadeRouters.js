const express = require("express");
const router = express.Router();
const unidadesController = require("../controllers/unidadesController");
const UnidadesController = new unidadesController();
const authenticationMiddleware = require('../middleware/authenticationMiddleware'); // Importe o middleware de autenticação

router.post("/add_unidade", authenticationMiddleware, async (req, res, next) => {
    try{
        await UnidadesController.registrarUnidade(req, res);
        next();
    } catch (error) {
        console.error('Erro ao registrar unidade:', error.message);
        res.status(500).json({ error: 'Erro ao registrar unidade.' });
    }
    });

router.get("/info_unidade/:id", authenticationMiddleware, async (req, res, next) => {
    try{
        await UnidadesController.obterUnidadePorId(req, res);
        next();
    } catch (error) {
        console.error('Erro ao obter unidade por ID:', error.message);
        res.status(500).json({ error: 'Erro ao obter unidade por ID.' });
    }
    });

router.get("/todas_unidades", authenticationMiddleware,  async (req, res, next) => {
    try{
        await unidadesController.obterTodasUnidades(req, res);
        next();
    } catch (error) {
        console.error('Erro ao obter todas unidades:', error.message);
        res.status(500).json({ error: 'Erro ao obter todas unidades.' });
    }
   });

router.put("/edit_unidade/:id", authenticationMiddleware, async (req, res, next) => {
    try{
        await UnidadesController.atualizarUnidade(req, res);
        next();
    } catch (error) {
        console.error('Erro ao atualizar unidade:', error.message);
        res.status(500).json({ error: 'Erro ao atualizar unidade.' });
    }
    });

router.delete("/excluir_unidade/:id", authenticationMiddleware, async (req, res, next) => {
    try{
        await UnidadesController.excluirUnidadePorId(req, res);
        next();
    } catch (error) {
        console.error('Erro ao excluir unidade por ID:', error.message);
        res.status(500).json({ error: 'Erro ao excluir unidade por ID.' });
    }
    });
module.exports = router;