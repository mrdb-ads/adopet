import express from "express"
import ResponsavelController from "../controllers/responsaveisController.js"

const router = express.Router();

router
    .get("/tutores", ResponsavelController.getResponsaveis)
    .get("/tutores/:id", ResponsavelController.getResponsavelById)
    .post("/tutores", ResponsavelController.cadastrarResponsavel)
    .put("/tutores/:id", ResponsavelController.atualizarResponsavel)
    .delete("/tutores/:id", ResponsavelController.deletarResponsavel)

export default router;