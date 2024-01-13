const alunoModel = require("../models/alunoModel");
const db = require("../db/dbConfig");

class alunoRepositorio {
    constructor() {
    }

    async registrarAluno(nome_aluno, nome_pai, cpf_pai, nome_mae, cpf_mae, endereco, contato_responsavel, id_turma) {
        try {
            if(!nome_aluno || !nome_pai || !cpf_pai || !nome_mae || !cpf_mae || !endereco || !contato_responsavel || !id_turma) {
                throw new Error("Todos os campos devem ser preenchidos.");
            }
            const query = "INSERT INTO aluno (nome_aluno, nome_pai, cpf_pai, nome_mae, cpf_mae, endereco, contato_responsavel, id_turma) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
            await db.query(query, [nome_aluno, nome_pai, cpf_pai, nome_mae, cpf_mae, endereco, contato_responsavel, id_turma]);
            const registro = new alunoModel({
                nome_aluno,
                nome_pai, 
                cpf_pai,
                nome_mae,
                cpf_mae,
                endereco,
                contato_responsavel,
                id_turma
            });
            console.log("Aluno cadastrado.");
            return registro;
        } catch (error) {
            console.error("Erro ao cadastrar aluno.");
            throw error;
        }
    }

    async obterAlunoPorId(id) {
        try {
            const query = 'SELECT * FROM aluno WHERE matricula_aluno = ?';
            const result = await db.query(query, [id]);
            if (result[0].length === 0) {
                return null;
            }
            const registroData = result[0][0];
            const registro = new alunoModel(
                registroData.nome_aluno,
                registroData.nome_pai,
                registroData.cpf_pai,
                registroData.nome_mae,
                registroData.cpf_mae,
                registroData.endereco,
                registroData.contato_responsavel,
                registroData.id_turma
            );
            return registro;
        } catch (error) {
            console.error('Erro ao obter aluno por ID:', error.message);
            throw error;
        }
    }

    async obterTodosAlunosPaginados(pagina, tamanhoPagina) {
        try {
            const paginaNumerica = parseInt(pagina, 10);
            const tamanhoPaginaNumerico = parseInt(tamanhoPagina, 10);
            if (isNaN(paginaNumerica) || isNaN(tamanhoPaginaNumerico) || paginaNumerica <= 0 || tamanhoPaginaNumerico <= 0) {
                throw new Error("Parâmetros inválidos para paginação.");
            }
            const offset = (paginaNumerica - 1) * tamanhoPaginaNumerico;
    
            // Query para obter os alunos na página atual
            const queryAlunos = 'SELECT * FROM aluno LIMIT ? OFFSET ?';
            const resultAlunos = await db.query(queryAlunos, [tamanhoPaginaNumerico, offset]);
            const registros = resultAlunos[0].map(registroData => new alunoModel(
                registroData.nome_aluno,
                registroData.nome_pai,
                registroData.cpf_pai,
                registroData.nome_mae,
                registroData.cpf_mae,
                registroData.endereco,
                registroData.contato_responsavel,
                registroData.id_turma
            ));
            // Query para contar o total de alunos
            const queryTotalAlunos = 'SELECT COUNT(*) as total FROM aluno';
            const resultTotalAlunos = await db.query(queryTotalAlunos);
            const totalAlunos = resultTotalAlunos[0][0].total;
            const totalPaginas = Math.ceil(totalAlunos / tamanhoPaginaNumerico);
            const nextPage = paginaNumerica < totalPaginas ? paginaNumerica + 1 : null;
            const prevPage = paginaNumerica > 1 ? paginaNumerica - 1 : null;
            const links = {
                nextPage: nextPage ? `/alunos_paginados?pagina=${nextPage}&tamanhoPagina=${tamanhoPagina}` : null,
                prevPage: prevPage ? `/alunos_paginados?pagina=${prevPage}&tamanhoPagina=${tamanhoPagina}` : null,
            };
            return {
                paginaAtual: paginaNumerica,
                totalPaginas,
                totalAlunos,
                links,
                alunos: registros,
            };
        } catch (error) {
            console.error('Erro ao obter todos os alunos paginados:', error.message);
            throw error;
        }
    }
    
    async atualizarAluno(matricula_aluno, nome_aluno, nome_pai, cpf_pai, nome_mae, cpf_mae, endereco, contato_responsavel, id_turma) {
        try {
            if (!matricula_aluno || !nome_aluno || !nome_pai || !cpf_pai || !nome_mae || !cpf_mae || !endereco || !contato_responsavel || !id_turma) {
                throw new Error("Todos os campos devem ser preenchidos.");
            }
            const query = `
                UPDATE aluno
                SET
                    nome_aluno = ?,
                    nome_pai = ?,
                    cpf_pai = ?,
                    nome_mae = ?,
                    cpf_mae = ?,
                    endereco = ?,
                    contato_responsavel = ?,
                    id_turma = ?
                WHERE matricula_aluno = ?
            `;
            await db.query(query, [nome_aluno, nome_pai, cpf_pai, nome_mae, cpf_mae, endereco, contato_responsavel, id_turma, matricula_aluno]);
            const registroAtualizado = new alunoModel({
                matricula_aluno,
                nome_aluno,
                nome_pai,
                cpf_pai,
                nome_mae,
                cpf_mae,
                endereco,
                contato_responsavel,
                id_turma
            });
            console.log("Aluno atualizado.");
            return registroAtualizado;
        } catch (error) {
            console.error("Erro ao atualizar aluno.");
            throw error;
        }
    }
    
    async excluirAlunoPorId(matricula_aluno) {
        try {
            const query = 'DELETE FROM aluno WHERE matricula_aluno = ?';
            await db.query(query, [matricula_aluno]);
            console.log('Aluno excluído.');
        } catch (error) {
            console.error('Erro ao excluir aluno:', error.message);
            throw error;
        }
    }
}
module.exports = alunoRepositorio;