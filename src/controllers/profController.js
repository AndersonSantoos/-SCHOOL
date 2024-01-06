const AcompanhamentoRepository = require('../repository/profRepositorio');

class AcompanhamentoController {
    constructor() {
        this.acompanhamentoRepository = new AcompanhamentoRepository();
    }

    async cadastrarEvento(req, res) {
        try {
            const { aluno, tipoEvento, descricao, relato, visaoGeral } = req.body;

            if (!aluno || !tipoEvento || !descricao || !relato || !visaoGeral) {
                return res.status(400).json({ success: false, message: 'Os campos "aluno" e "tipoEvento" são obrigatórios.' });
            }

            let registrarEventoFunction;

            switch (tipoEvento.toLowerCase()) {
                case 'briga':
                case 'rendimento abaixo':
                case 'pouca participacao':
                case 'alto rendimento':
                    registrarEventoFunction = this.acompanhamentoRepository[`registrar${tipoEvento.replace(/\s+/g, '')}`];
                    break;
                case 'relato extra':
                    if (!relato) {
                        return res.status(400).json({ success: false, message: 'O campo "relato" é obrigatório para "Relato Extra".' });
                    }
                    registrarEventoFunction = this.acompanhamentoRepository.registrarRelatoExtra;
                    break;
                case 'visão geral turma':
                    if (!visaoGeral) {
                        return res.status(400).json({ success: false, message: 'O campo "visaoGeral" é obrigatório para "Visão Geral Turma".' });
                    }
                    registrarEventoFunction = this.acompanhamentoRepository.registrarVisaoGeralTurma;
                    break;
                default:
                    return res.status(400).json({ success: false, message: 'Tipo de evento desconhecido.' });
            }

            if (typeof registrarEventoFunction === 'function') {
                // Ajuste para passar relato e visaoGeral conforme necessário
                if (tipoEvento.toLowerCase() === 'relato extra') {
                    registrarEventoFunction.call(this.acompanhamentoRepository, aluno, descricao, relato, null);
                } else if (tipoEvento.toLowerCase() === 'visão geral turma') {
                    registrarEventoFunction.call(this.acompanhamentoRepository, visaoGeral);
                } else {
                    registrarEventoFunction.call(this.acompanhamentoRepository, aluno, descricao, relato, visaoGeral);
                }

                res.status(201).json({ success: true, message: `${tipoEvento} registrado com sucesso.` });
            } else {
                res.status(500).json({ success: false, message: 'Erro ao processar o formulário.' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Erro ao processar o formulário.' });
        }
    }
    

    async obterRelatorio(req, res) {
        try {
          const relatorio = await this.acompanhamentoRepository.obterRelatorio();
          res.status(200).json({ success: true, relatorio });
        } catch (error) {
          console.error(error);
          res.status(500).json({ success: false, message: 'Erro ao obter relatório.' });
        }
      }



      async atualizarAcompanhamento(req, res) {
        try {
            const { id, descricao, relato, visaoGeral, aluno, tipoEvento } = req.body;
    
            if (!id || !descricao) {
                return res.status(400).json({ success: false, message: 'Os campos "id" e "descricao" são obrigatórios.' });
            }
    
            const acompanhamentoAtualizado = await this.acompanhamentoRepository.atualizarAcompanhamento(id, {
                descricao,
                relato,
                visaoGeral: visaoGeral, 
                aluno,
                tipoEvento, 
            });
    
            res.status(200).json({ success: true, message: 'Acompanhamento atualizado com sucesso.', data: acompanhamentoAtualizado });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Erro ao atualizar o acompanhamento.' });
        }
    }
    

    

    async recuperarAcompanhamento(req, res) {
        const { id } = req.params;

        try {
            const acompanhamento = await this.acompanhamentoRepository.recuperarAcompanhamento(id);

            if (acompanhamento) {
                res.status(200).json({ success: true, data: acompanhamento });
            } else {
                res.status(404).json({ success: false, message: 'Acompanhamento não encontrado' });
            }
        } catch (error) {
            console.error('Erro ao recuperar acompanhamento:', error);
            res.status(500).json({ success: false, message: 'Erro interno no servidor' });
        }
    }


    async obterTodosAcompanhamentos(req, res) {
        try {
            const { page, pageSize } = req.query;
            const pageNumber = parseInt(page, 10) || 1;
            const pageSizeNumber = parseInt(pageSize, 10) || 10;

            const acompanhamentosComPaginacao = await this.acompanhamentoRepository.obterTodosAcompanhamentos(pageNumber, pageSizeNumber);

            return res.status(200).json(acompanhamentosComPaginacao);
        } catch (error) {
            console.error('Erro ao obter todos os acompanhamentos:', error.message);
            return res.status(500).json({ error: 'Erro interno do servidor.' });
        }
    }
      
    
    

    async excluirAcompanhamento(req, res) {
        try {
            const { id } = req.params;
    
            const resultadoExclusao = await this.acompanhamentoRepository.excluirAcompanhamento(id);
    
            if (resultadoExclusao) {
                return res.status(200).json({ message: 'Acompanhamento excluído com sucesso.' });
            } else {
                return res.status(404).json({ error: 'Acompanhamento não encontrado.' });
            }
        } catch (error) {
            console.error('Erro ao processar solicitação de exclusão do acompanhamento:', error);
            return res.status(500).json({ error: 'Erro interno do servidor.' });
        }
    }

    
}

module.exports = AcompanhamentoController;
