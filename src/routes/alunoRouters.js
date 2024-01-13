const express = require('express');
const router = express.Router();
const alunoController = require('../controllers/alunoController');
const AlunoController = new alunoController();

router.post('/add_aluno', async (req, res) => {
    try {
        await AlunoController.registrarAluno(req, res);
    } catch (error) {
        console.error('Erro ao adicionar o aluno:', error.message);
        res.status(500).json({ error: 'Erro ao adicionar aluno.' });
    }
});

router.get('/info_aluno/:id', async (req, res) => {
    try {
        await AlunoController.obterAlunoPorId(req, res);
    } catch (error) {
        console.error('Erro ao obter informações do aluno:', error.message);
        res.status(500).json({ error: 'Erro ao obter informações do aluno.' });
    }
});

router.get('/alunos_paginados', async (req, res) => {
    try {
        await AlunoController.obterTodosAlunosPaginados(req, res);
    } catch (error) {
        console.error('Erro ao obter todos os alunos paginados:', error.message);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
});

router.put('/edit_aluno/:id', async (req, res) => {
    try {
        await AlunoController.atualizarAluno(req, res);
    } catch (error) {
        console.error('Erro ao editar aluno:', error.message);
        res.status(500).json({ error: 'Erro ao editar aluno.' });
    }
});

router.delete('/excluir_aluno/:id', async (req, res) => {
    try {
        await AlunoController.excluirAluno(req, res);
    } catch (error) {
        console.error('Erro ao excluir aluno:', error.message);
        res.status(500).json({ error: 'Erro ao excluir aluno.' });
    }
});

module.exports = router;