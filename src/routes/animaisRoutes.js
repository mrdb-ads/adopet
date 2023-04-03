import express from "express"
import AnimalController from "../controllers/animaisController.js"

const router = express.Router();

router
    .get("/animais", AnimalController.getAnimais)
    .get("/animais/:id", AnimalController.getAnimalById)
    .post("/animais", AnimalController.cadastrarAnimal)
    .put("/animais/:id", AnimalController.atualizarAnimal)
    .delete("/animais/:id", AnimalController.deletarAnimal)

export default router;