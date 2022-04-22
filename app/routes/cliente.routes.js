module.exports = app => {
    const cliente = require("../controllers/cliente.controller.js");

    var router = require("express").Router();

    // Criar um novo cliente
    router.post("/", cliente.create);

    // Obter todos os clientes inativos
    router.get("/inativo", cliente.findAllInactive);

    // Obter um cliente a partir do id
    router.get("/:id", cliente.findOne);

    // Obter todos os clientes
    router.get("/", cliente.findAll);



    // Atualiza um cliente pelo id
    router.put("/:id", cliente.update);



    // Exclui um cliente a partir do id
    router.delete("/:id", cliente.delete);

    // Exclui todos os clientes
    router.delete("/", cliente.deleteAll);

    app.use('/api/cliente', router);
};