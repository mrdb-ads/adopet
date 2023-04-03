import mongoose from "mongoose";

const responsavelSchema = new mongoose.Schema(
    {
        id: {type: String},
        nome: {type: String, required: true},
        email: {type: String, required: true},
        senha: {type: String},
        animais: [{type: mongoose.Schema.Types.ObjectId, ref: "animais"}]
    }
)

const responsaveis = mongoose.model("responsaveis", responsavelSchema)

export default responsaveis;