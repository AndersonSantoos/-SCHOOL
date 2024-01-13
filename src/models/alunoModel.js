class alunoModel {
    constructor(nome_aluno, nome_pai, cpf_pai,
         nome_mae, cpf_mae, endereco,
          contato_responsavel, id_turma) {
            this.nome_aluno = nome_aluno;
            this.nome_pai = nome_pai;
            this.cpf_pai = cpf_pai;
            this.nome_mae = nome_mae;
            this.cpf_mae = cpf_mae;
            this.contato_responsavel = contato_responsavel;
            this.id_turma = id_turma;
    }
}
module.exports = alunoModel;