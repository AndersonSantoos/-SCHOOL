class AcompanhamentoCoordenador {
    constructor(aluno, encaminhamento, profissionalEncaminhado) {
        this.aluno = aluno;
        this.encaminhamento = encaminhamento;
        this.profissionalEncaminhado = profissionalEncaminhado;
        this.registrosIndividuais = [];
    }

    registrarAcompanhamento(aluno, encaminhamento, profissionalEncaminhado) {
        this.registrosIndividuais.push({
            aluno: aluno,
            encaminhamento: encaminhamento,
            profissionalEncaminhado: profissionalEncaminhado
        });
    }
}

module.exports = AcompanhamentoCoordenador;
