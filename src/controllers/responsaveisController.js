import responsaveis from "../models/Responsavel.js";

class ResponsavelController {

    static getResponsaveis = async (_, res) => {
        try {
            const responsaveisLista = await responsaveis.find()
                                                        .populate('animais')
                                                        .exec();
            if (responsaveisLista.length){
                res.json(responsaveisLista)
            } else {
                res.send({message: "Nenhum tutor encontrado"});
            }
        } catch (err) {
            console.log(err);
        }
    }

    static getResponsavelById = async (req, res) => {
        try {
            const responsavel = await responsaveis.findById(req.params.id);
            if (responsavel){
                res.json(responsavel);
            } else {
                res.send({message: "Tutor não encontrado"});
            }
        } catch (err) {
            console.log(err);
            res.send({message: "Erro ao procurar tutor"});
        }
    }

    static cadastrarResponsavel = async (req, res) => {
        try {
            let responsavel = new responsaveis(req.body);
            let novoResponsavel = await responsavel.save();

            if(novoResponsavel) {
                res.status(201).send(novoResponsavel.toJSON());
            }
        } catch (err) {
            console.log(err);
            res.send({message: "Erro ao criar tutor"});
        }
    }

    static atualizarResponsavel = async (req, res) => {
        try {
            const id = req.params.id;
            const responsavelAtualizado = await responsaveis.findByIdAndUpdate(id, {$set: req.body});

            if(responsavelAtualizado) {
                res.send({message: "Tutor atualizado com sucesso"});
            } else {
                res.status(404).send({message: "Tutor não encontrado"});
            }
        } catch (err) {
            res.send({message: "Erro ao atualizar tutor"});
            console.log(err);
        }
    }

    static deletarResponsavel = async (req, res) => {
        try {
            const responsavelDeletado = await responsaveis.findByIdAndDelete(req.params.id);

            if (responsavelDeletado) {
                res.send({message: "Tutor deletado com sucesso"});
            } else {
                res.status(404).send({message: "Tutor não encontrado"});
            }
        } catch (err) {
            console.log(err);
            res.send({message: "Erro ao deletar tutor"});
        }
    }
}

export default ResponsavelController;