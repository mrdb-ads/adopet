import usuarios from "../models/Usuario.js";

class UsuarioController {

    static getUsuarios = async (req, res) => {
        try {
            const usuariosLista = await usuarios.find()
            if (usuariosLista.length){
                res.json(usuariosLista)
            } else {
                res.send({message: "Sem usuários"})
            }
        } catch (err) {
            console.log(err);
        }
    }

    static getUsuarioById = async (req, res) => {
        try {
            const usuario = await usuarios.findById(req.params.id);
            if (usuario) {
                res.send(usuario);
            } else {
                res.status(404).send({message: "Usuário não encontrado"});
            }
        } catch (err) {
            console.log(err);
            res.send({message: "Erro ao buscar usuário"});
        }
    }

    static cadastrarUsuario = async (req, res) => {
        try {
            let usuario = new usuarios(req.body);
            let novoUsuario = await usuario.save();

            if(novoUsuario) {
                res.status(201).send(novoUsuario.toJSON());
            }
        } catch (err) {
            console.log(err);
            res.status(500).send({message: "Erro ao criar usuário"})
        }
    }

    static atualizarUsuario = async (req, res) => {
        try {
            const id = req.params.id;
            const usuarioAtualizado = await usuarios.findByIdAndUpdate(id, {$set: req.body});

            if(usuarioAtualizado) {
                res.send({message: "Usuário atualizado com sucesso"});
            } else {
                res.status(404).send({message: "Usuário não encontrado"});
            }
        } catch (err) {
            res.send({message: "Erro ao atualizar usuário"});
            console.log(err);
        }
    }

    static deletarUsuario = async (req, res) => {
        try {
            const usuarioDeletado = await usuarios.findByIdAndDelete(req.params.id);

            if (usuarioDeletado) {
                res.send({message: "Usuário deletado com sucesso"});
            } else {
                res.status(404).send({message: "Usuário não encontrado"});
            }
        } catch (err) {
            console.log(err);
            res.send({message: "Erro ao deletar usuário"});
        }
    }
}

export default UsuarioController;