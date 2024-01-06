const AcompanhamentoCoordenadorRepository = require("../repository/coordenadorRepositorio");

class AcompanhamentoCoordenadorController {
    constructor() {
        this.acompanhamentoCoordenadorRepository = new AcompanhamentoCoordenadorRepository();
    }

    async registrarAcompanhamentoCoordenador(req, res) {
        try {
            const { aluno, encaminhamento, profissionalEncaminhado } = req.body;

            if (!aluno || !encaminhamento || !profissionalEncaminhado) {
                return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
            }

            await this.acompanhamentoCoordenadorRepository.registrarAcompanhamentoCoordenador(aluno, encaminhamento, profissionalEncaminhado);

            return res.status(200).json({ message: 'Acompanhamento de coordenador registrado com sucesso.' });
        } catch (error) {
            return res.status(500).json({ error: 'Erro interno do servidor.' });
        }
    }


    async obterAcompanhamentoPorId(req, res) {
        const id = req.params.id;
    
        try {
          const acompanhamento = await this.acompanhamentoCoordenadorRepository.obterAcompanhamentoPorId(id);
    
          if (!acompanhamento) {
            return res.status(404).json({ error: 'Acompanhamento não encontrado.' });
          }
    
          return res.status(200).json(acompanhamento);
        } catch (error) {
          console.error('Erro ao obter acompanhamento por ID:', error);
          return res.status(500).json({ error: 'Erro interno do servidor.' });
        }
      }


      async obterTodosAcompanhamentos(req, res) {
        try {
            const { page, pageSize } = req.query;
            const pageNumber = parseInt(page, 10) || 1;
            const pageSizeNumber = parseInt(pageSize, 10) || 10;
    
            const acompanhamentosComPaginacao = await this.acompanhamentoCoordenadorRepository.obterTodosAcompanhamentos(pageNumber, pageSizeNumber);
    
            return res.status(200).json(acompanhamentosComPaginacao);
        } catch (error) {
            console.error('Erro ao obter todos os acompanhamentos:', error.message);
            return res.status(500).json({ error: 'Erro interno do servidor.' });
        }
    }
    
    
    

      async atualizarAcompanhamento(req, res) {
        const id = req.params.id;
        const { aluno, encaminhamento, profissional_encaminhado } = req.body;
    
        try {
          
          const acompanhamentoExistente = await this.acompanhamentoCoordenadorRepository.obterAcompanhamentoPorId(id);
    
          if (!acompanhamentoExistente) {
            return res.status(404).json({ error: 'Acompanhamento não encontrado.' });
          }
    
          
          await this.acompanhamentoCoordenadorRepository.atualizarAcompanhamento(
            id,
            aluno || acompanhamentoExistente.aluno,
            encaminhamento || acompanhamentoExistente.encaminhamento,
            profissional_encaminhado || acompanhamentoExistente.profissional_encaminhado
          );
    
          return res.status(200).json({ message: 'Acompanhamento atualizado com sucesso.' });
        } catch (error) {
          console.error('Erro ao atualizar acompanhamento:', error);
          return res.status(500).json({ error: 'Erro interno do servidor.' });
        }
      }


      async excluirAcompanhamento(req, res) {
        const id = req.params.id;
    
        try {
          
          const acompanhamentoExistente = await this.acompanhamentoCoordenadorRepository.obterAcompanhamentoPorId(id);
    
          if (!acompanhamentoExistente) {
            return res.status(404).json({ error: 'Acompanhamento não encontrado.' });
          }
    
          
          await this.acompanhamentoCoordenadorRepository.excluirAcompanhamento(id);
    
          return res.status(200).json({ message: 'Acompanhamento soft deletado com sucesso.' });
        } catch (error) {
          console.error('Erro no soft delete do acompanhamento:', error);
          return res.status(500).json({ error: 'Erro interno do servidor.' });
        }
      }


}

module.exports = AcompanhamentoCoordenadorController;
