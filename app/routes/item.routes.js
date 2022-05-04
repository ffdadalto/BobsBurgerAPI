module.exports = app => {
    const item = require("../controllers/item.controller.js");

    var router = require("express").Router();

    // Obter todos os items inativos
    router.get("/inativo", item.findAllInactive);

    // Obter todos os items ativos
    router.get("/ativo", item.findAllActive);

    // Obter um item a partir do id
    router.get("/:id", item.findOne);

    // Atualiza um item pelo id
    router.put("/:id", item.update);

    // Exclui um item a partir do id
    router.delete("/:id", item.delete);

    // Criar um novo item
    router.post("/", item.create);

    // Obter todos os items
    router.get("/", item.findAll);

    // Exclui todos os items
    router.delete("/", item.deleteAll);

    app.use('/api/item', router);
};