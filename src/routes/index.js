import express from "express";
import usuariosRouter from "./usuariosRoutes.js"
import responsaveisRouter from "./responsaveisRoutes.js"
import animaisRouter from "./animaisRoutes.js"

const routes = (app) => {
    app.route('/').get((_, res) => {
        res.send({message: "Home"})
    });

    app.use(
        express.json(),
        usuariosRouter,
        responsaveisRouter,
        animaisRouter
    );
};

export default routes;