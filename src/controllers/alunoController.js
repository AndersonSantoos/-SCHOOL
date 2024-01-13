const alunoRepositorio = require("../repository/alunoRepositorio");

class alunoController {
    constructor() {
        this.AlunoRepositorio = new alunoRepositorio();
    }

    async registrarAluno(req, res) {
        try {
            const {nome_aluno, nome_pai, cpf_pai, nome_mae, cpf_mae, endereco, contato_responsavel, id_turma } = req.body;

            if (!nome_aluno || !nome_pai || !cpf_pai || !nome_mae || !cpf_pai || !endereco || !contato_responsavel || !id_turma) {
                return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
            }
            await this.AlunoRepositorio.registrarAluno(nome_aluno, nome_pai, cpf_pai, nome_mae, cpf_mae, endereco, contato_responsavel, id_turma);
            return res.status(200).json({ message: 'Aluno registrado com sucesso.' });
        } catch (error) {
            console.error('Erro ao processar solicitação:', error);
            return res.status(500).json({ error: 'Erro interno do servidor.' });
        }
    }

    async obterAlunoPorId(req, res) {
        const id = req.params.id;
        try {
            const registro = await this.AlunoRepositorio.obterAlunoPorId(id);
            if (!registro) {
                return res.status(404).json({ error: 'Acompanhamento não encontrado.' });
            }
            return res.status(200).json(registro);
        } catch (error) {
            console.error('Erro ao obter acompanhamento por ID:', error);
            return res.status(500).json({ error: 'Erro interno do servidor.' });
        }
    }

    async obterTodosAlunosPaginados(req, res) {
        try {
            const { pagina = 1, tamanhoPagina = 5 } = req.query;
            const resultadoPaginado = await this.AlunoRepositorio.obterTodosAlunosPaginados(pagina, tamanhoPagina);
            res.json(resultadoPaginado);
        } catch (error) {
            console.error('Erro ao obter todos os alunos paginados:', error.message);
            res.status(500).json({ error: 'Erro interno do servidor.' });
        }
    }
    
    async atualizarAluno(req, res) {
        try {
            const { id } = req.params;
            const { nome_aluno, nome_pai, cpf_pai, nome_mae, cpf_mae, endereco, contato_responsavel, id_turma } = req.body;
            const alunoAtualizado = await this.AlunoRepositorio.atualizarAluno(id, nome_aluno, nome_pai, cpf_pai, nome_mae, cpf_mae, endereco, contato_responsavel, id_turma);
            res.json({ aluno: alunoAtualizado, message: 'Aluno atualizado com sucesso.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro interno do servidor.' });
        }
    }

    async excluirAluno(req, res) {
        try {
            const { id } = req.params;
            await this.AlunoRepositorio.excluirAlunoPorId(id);
            res.json({ message: 'Aluno excluído com sucesso.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro interno do servidor.' });
        }
    }
}

module.exports = alunoController;