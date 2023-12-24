class acompanhamentoPsicologico {
    constructor(aluno, observacoes, documentos) {
        this.aluno = aluno;
        this.observacoes = observacoes;
        this.documentos = documentos;
        this.registrosIndividuais = [];
    }

    registrarAcompanhamento(aluno, observacoes, documentos) {
        this.registrosIndividuais.push({
            aluno: aluno,
            observacoes: observacoes,
            documentos: documentos
        });
    }
}

module.exports = acompanhamentoPsicologico;