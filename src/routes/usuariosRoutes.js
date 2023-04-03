import express from "express"
import UsuarioController from "../controllers/usuariosController.js"

const router = express.Router();

router
    .get("/usuarios", UsuarioController.getUsuarios)
    .get("/usuarios/:id", UsuarioController.getUsuarioById)
    .post("/usuarios", UsuarioController.cadastrarUsuario)
    .put("/usuarios/:id", UsuarioController.atualizarUsuario)
    .delete("/usuarios/:id", UsuarioController.deletarUsuario)

export default router;