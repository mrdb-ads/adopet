import animais from "../models/Animal.js";
import responsaveis from "../models/Responsavel.js";

class AnimalController {

    static getAnimais = async (_, res) => {
        try {
            const animaisLista = await animais.find()
                                              .select('nome idade')
                                              .populate('responsavel', ('nome email'))
                                              .exec();

            if (animaisLista.length){
                res.json(animaisLista)
            } else {
                res.send({message: "Nenhum animal encontrado"});
            }
        } catch (err) {
            console.log(err);
            res.send({message: "Erro ao procurar animais"});
        }
    }

    static getAnimalById = async (req, res) => {
        try {
            const animal = await animais.findById(req.params.id);
            if (animal){
                res.json(animal);
            } else {
                res.send({message: "Animal não encontrado"});
            }
        } catch (err) {
            console.log(err);
            res.send({message: "Erro ao procurar animal"});
        }
    }
    
    static cadastrarAnimal = async (req, res) => {
        try {
            let animal = new animais(req.body);
            
            let novoAnimal = await animal.save();
        
            if(novoAnimal) {
                if(animal.responsavel) {
                    const id = novoAnimal._id;
                    const tutor = await responsaveis.findById(animal.responsavel);
                    tutor.animais.push(id);
                    const atualizaResponsavel = await responsaveis.findByIdAndUpdate(animal.responsavel, {$set: tutor})
    
                    if (!atualizaResponsavel) {
                        res.status(500).send({message: "Erro ao cadastrar animal"});
                        return;
                    }
                }
                res.status(201).send(novoAnimal.toJSON());
            }
            
        } catch (err) {
            console.log(err);
            res.send({message: "Erro ao criar animal"});
        }
    }

    static atualizarAnimal = async (req, res) => {
        try {
            const id = req.params.id;
            const animalAtualizado = await animais.findByIdAndUpdate(id, {$set: req.body});

            if(animalAtualizado) {
                res.send({message: "Animal atualizado com sucesso"});
            } else {
                res.status(404).send({message: "Animal não encontrado"});
            }
        } catch (err) {
            res.send({message: "Erro ao atualizar animal"});
            console.log(err);
        }
    }

    static deletarAnimal = async (req, res) => {
        try {
            const animalDeletado = await animais.findByIdAndDelete(req.params.id);

            if (animalDeletado) {
                res.send({message: "Animal deletado com sucesso"});
            } else {
                res.status(404).send({message: "Animal não encontrado"});
            }
        } catch (err) {
            console.log(err);
            res.send({message: "Erro ao deletar animal"});
        }
    }
}

export default AnimalController;