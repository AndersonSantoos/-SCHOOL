const express = require('express');
const router = express.Router();
const alunoController = require('../controllers/alunoController');
const AlunoController = new alunoController();
const authenticationMiddleware = require('../middleware/authenticationMiddleware'); 

router.post('/add_aluno', authenticationMiddleware, async (req, res, next) => {
    try {
        await AlunoController.registrarAluno(req, res);
        next();
    } catch (error) {
        console.error('Erro ao adicionar o aluno:', error.message);
        res.status(500).json({ error: 'Erro ao adicionar aluno.' });
    }
});

router.get('/info_aluno/:id', authenticationMiddleware, async (req, res, next) => {
    try {
        await AlunoController.obterAlunoPorId(req, res);
        next();
    } catch (error) {
        console.error('Erro ao obter informações do aluno:', error.message);
        res.status(500).json({ error: 'Erro ao obter informações do aluno.' });
    }
});

router.get('/alunos_paginados', authenticationMiddleware, async (req, res, next) => {
    try {
        await AlunoController.obterTodosAlunosPaginados(req, res);
        next();
    } catch (error) {
        console.error('Erro ao obter todos os alunos paginados:', error.message);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
});

router.put('/edit_aluno/:id', authenticationMiddleware, async (req, res, next) => {
    try {
        await AlunoController.atualizarAluno(req, res);
        next();
    } catch (error) {
        console.error('Erro ao editar aluno:', error.message);
        res.status(500).json({ error: 'Erro ao editar aluno.' });
    }
});

router.delete('/excluir_aluno/:id', authenticationMiddleware, async (req, res, next) => {
    try {
        await AlunoController.excluirAluno(req, res);
        next();
    } catch (error) {
        console.error('Erro ao excluir aluno:', error.message);
        res.status(500).json({ error: 'Erro ao excluir aluno.' });
    }
});

module.exports = router;