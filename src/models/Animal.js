import mongoose from "mongoose";

const animalSchema = new mongoose.Schema(
    {
        id: {type: String},
        nome: {type: String, required: true},
        idade: {type: Number, required: true},
        raca: {type: String},
        cor: {type: String},
        porte: {type:String},
        caracteristicas: {type: String},
        cidade: {type: String},
        responsavel: {type: mongoose.Schema.Types.ObjectId, ref: "responsaveis", required: true}
    }
)

const animais = mongoose.model("animais", animalSchema)

export default animais;