module.exports = app => {
    const cidade = require("../controllers/cidade.controller.js");

    var router = require("express").Router();

    // Criar um novo cliente
    router.post("/", cidade.create);

    // Obter todos os clientes inativos
    router.get("/inativo", cidade.findAllInactive);

    // Obter um cliente a partir do id
    router.get("/:id", cidade.findOne);

    // Obter todos os clientes
    router.get("/", cidade.findAll);

    // Atualiza um cliente pelo id
    router.put("/:id", cidade.update);

    // Exclui um cliente a partir do id
    router.delete("/:id", cidade.delete);

    // Exclui todos os clientes
    router.delete("/", cidade.deleteAll);

    app.use('/api/cidade', router);
};