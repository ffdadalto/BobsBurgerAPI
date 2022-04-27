module.exports = app => {
    const bairro = require("../controllers/bairro.controller.js");

    var router = require("express").Router();

    // Criar um novo cliente
    router.post("/", bairro.create);

    // Obter todos os clientes inativos
    router.get("/inativo", bairro.findAllInactive);

    // Obter um cliente a partir do id
    router.get("/:id", bairro.findOne);

    // Obter todos os clientes
    router.get("/", bairro.findAll);

    // Atualiza um cliente pelo id
    router.put("/:id", bairro.update);

    // Exclui um cliente a partir do id
    router.delete("/:id", bairro.delete);

    // Exclui todos os clientes
    router.delete("/", bairro.deleteAll);

    app.use('/api/bairro', router);
};