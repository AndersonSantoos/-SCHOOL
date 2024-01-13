class AcompanhamentoProfessor {
    constructor() {
        this.registrosIndividuais = [];
        this.visaoGeralTurma = '';
    }

    registrarEvento(matriculaAluno, aluno, evento, descricao) {
        this.registrosIndividuais.push({
            matriculaAluno: matriculaAluno,
            aluno: aluno,
            evento: evento,
            descricao: descricao
        });
    }

    registrarVisaoGeralTurma(visaoGeral) {
        this.visaoGeralTurma = visaoGeral;
    }

    obterRelatorio() {
        return {
            registrosIndividuais: this.registrosIndividuais,
            visaoGeralTurma: this.visaoGeralTurma
        };
    }
}
module.exports = AcompanhamentoProfessor;
    