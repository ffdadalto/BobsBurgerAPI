module.exports = app => {
    const item = require("../controllers/item.controller.js");

    var router = require("express").Router();

    // Criar um novo cliente
    router.post("/", item.create);

    // Obter todos os clientes inativos
    router.get("/inativo", item.findAllInactive);

    // Obter um cliente a partir do id
    router.get("/:id", item.findOne);

    // Obter todos os clientes
    router.get("/", item.findAll);

    // Atualiza um cliente pelo id
    router.put("/:id", item.update);

    // Exclui um cliente a partir do id
    router.delete("/:id", item.delete);

    // Exclui todos os clientes
    router.delete("/", item.deleteAll);

    app.use('/api/item', router);
};