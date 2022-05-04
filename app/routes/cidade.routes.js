module.exports = app => {
    const cidade = require("../controllers/cidade.controller.js");

    var router = require("express").Router();

    // Obter todos os cidades inativos
    router.get("/inativo", cidade.findAllInactive);

    // Obter todos os cidades ativos
    router.get("/ativo", cidade.findAllActive);

    // Obter um cidade a partir do id
    router.get("/:id", cidade.findOne);

    // Atualiza um cidade pelo id
    router.put("/:id", cidade.update);

    // Exclui um cidade a partir do id
    router.delete("/:id", cidade.delete);

    // Criar um novo cidade
    router.post("/", cidade.create);

    // Obter todos os cidades
    router.get("/", cidade.findAll);

    // Exclui todos os cidades
    router.delete("/", cidade.deleteAll);

    app.use('/api/cidade', router);
};