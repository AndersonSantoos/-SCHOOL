const acompanhamentoPsicologicoRepository = require("../repository/psicologoRepositorio");

class AcompanhamentoPsicologicoController {
    constructor() {
        this.acompanhamentoPsicologicoRepository = new acompanhamentoPsicologicoRepository();
    }

    async registrarAcompanhamentoPsicologico(req, res) {
        try {
            const { aluno, observacoes, documentos } = req.body;

            if(!aluno || !observacoes || !documentos) {
                return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
            }

            await this.acompanhamentoPsicologicoRepository.registrarAcompanhamentoPsicologico(aluno, observacoes, documentos);
            return res.status(200).json({ message: 'Acompanhamento psicologico registrado com sucesso.' });
        } catch (error) {
            console.log("Erro ao processar a solicitação" + error);
            return res.status(500).json({ error: 'Erro interno do servidor.' });
        }
    }


    async obterAcompnhamentoPorId(req, res) {
        const id = req.params.id;

        try {
            const acompanhamento = await this.acompanhamentoPsicologicoRepository.obterAcompanhamentoPorId(id);
            if(!acompanhamento) {
                return res.status(404).json({ error: 'Acompanhamento não encontrado.' });
            }

            return res.status(200).json(acompanhamento);
        } catch (error) {
            console.error('Erro ao obter acompanhamento por ID:', error);
            return res.status(500).json({ error: 'Erro interno do servidor.' });
        }
    }


    async obterTodosAcompanhamentosPsicologicos(pageNumber = 1, pageSize = 10) {
        try {
            const offset = (pageNumber - 1) * pageSize;
            const query = 'SELECT * FROM acompanhamento_psicologico LIMIT ?, ?';
            const result = await db.query(query, [offset, pageSize]);

            const acompanhamentos = result[0].map(acompanhamentoData => {
                return new acompanhamentoPsicologicoModel(
                    acompanhamentoData.aluno,
                    acompanhamentoData.observacoes,
                    acompanhamentoData.documentos
                );
            });

            // Obter o número total de acompanhamentos
            const totalAcompanhamentosQuery = 'SELECT COUNT(*) as total FROM acompanhamento_psicologico';
            const totalAcompanhamentosResult = await db.query(totalAcompanhamentosQuery);
            const totalAcompanhamentos = totalAcompanhamentosResult[0][0].total;

            // Calcular o número total de páginas
            const totalPages = Math.ceil(totalAcompanhamentos / pageSize);

            // Construir o objeto de resposta incluindo os links para a próxima e a página anterior
            const response = {
                acompanhamentos,
                pagination: {
                    currentPage: pageNumber,
                    pageSize,
                    totalItems: totalAcompanhamentos,
                    totalPages,
                    hasNextPage: pageNumber < totalPages,
                    hasPreviousPage: pageNumber > 1,
                    nextPage: pageNumber < totalPages ? `/todos_acompanhamentos_psicologicos?page=${pageNumber + 1}&pageSize=${pageSize}` : null,
                    previousPage: pageNumber > 1 ? `/todos_acompanhamentos_psicologicos?page=${pageNumber - 1}&pageSize=${pageSize}` : null
                }
            };

            return response;
        } catch (error) {
            console.error('Erro ao obter todos os acompanhamentos psicológicos:', error.message);
            throw error;
        }
    }


    async obterTodosAcompanhamentosPsicologicos(req, res) {
        try {
            const { page, pageSize } = req.query;
            const pageNumber = parseInt(page, 10) || 1;
            const pageSizeNumber = parseInt(pageSize, 10) || 10;

            const acompanhamentosComPaginacao = await this.acompanhamentoPsicologicoRepository.obterTodosAcompanhamentosPsicologicos(pageNumber, pageSizeNumber);

            return res.status(200).json(acompanhamentosComPaginacao);
        } catch (error) {
            console.error('Erro ao obter todos os acompanhamentos psicológicos:', error.message);
            return res.status(500).json({ error: 'Erro interno do servidor.' });
        }
    }

    

    async atualizarAcompanhamentoPsicologico(req, res) {
        try {
            const id = req.params.id;
            const { aluno, observacoes, documentos } = req.body;

            if(!aluno || !observacoes || !documentos) {
                return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
            }

            await this.acompanhamentoPsicologicoRepository.atualizarAcompanhamentoPsicologico(id, aluno, observacoes, documentos);
            return res.status(200).json({ message: 'Acompanhamento psicologico atualizado com sucesso.' });
        } catch (error) {
            console.error('Erro ao processar solicitação de atualização:', error);
            return res.status(500).json({ error: 'Erro interno do servidor.' });
        }
    }

    async excluirAcompanhamentoPsicologico(req, res) {
        try {
            const id = req.params.id;
            const resultadoExclusao = await this.acompanhamentoPsicologicoRepository.excluirAcompanhamentoPsicologico(id);
    
            if (resultadoExclusao) {
                return res.status(200).json({ message: 'Acompanhamento psicológico excluído com sucesso.' });
            } else {
                return res.status(404).json({ error: 'Acompanhamento psicológico não encontrado.' });
            }
        } catch (error) {
            console.error('Erro ao processar solicitação de exclusão:', error);
            return res.status(500).json({ error: 'Erro interno do servidor.' });
        }
    }
    
}

module.exports = AcompanhamentoPsicologicoController;