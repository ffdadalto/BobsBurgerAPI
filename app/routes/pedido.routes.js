module.exports = app => {
    const pedido = require("../controllers/pedido.controller.js");

    var router = require("express").Router();

    // Criar um novo cliente
    router.post("/", pedido.create);

    // Obter todos os clientes
    router.get("/", pedido.findAll);

    app.use('/api/pedido', router);
};