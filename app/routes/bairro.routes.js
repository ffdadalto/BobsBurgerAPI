module.exports = app => {
    const bairro = require("../controllers/bairro.controller.js");

    var router = require("express").Router();

    // Obter todos os bairros inativos
    router.get("/inativo", bairro.findAllInactive);

    // Obter todos os bairros ativos
    router.get("/ativo", bairro.findAllActive);

    // Obter todos os nomes dos bairros
    router.get("/nomes", bairro.getNames);

    // Obter um bairro a partir do id
    router.get("/:id", bairro.findOne);

    // Atualiza um bairro pelo id
    router.put("/:id", bairro.update);

    // Exclui um bairro a partir do id
    router.delete("/:id", bairro.delete);

    // Criar um novo bairro
    router.post("/", bairro.create);

    // Obter todos os bairros
    router.get("/", bairro.findAll);

    // Exclui todos os bairros
    router.delete("/", bairro.deleteAll);

    app.use('/api/bairro', router);
};