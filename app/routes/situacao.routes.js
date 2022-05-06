module.exports = app => {
    const situacao = require("../controllers/situacao.controller.js");

    var router = require("express").Router();

    // Obter todos os situacaos inativos
    router.get("/inativo", situacao.findAllInactive);

    // Obter todos os situacaos ativos
    router.get("/ativo", situacao.findAllActive);

    // Obter um situacao a partir do id
    router.get("/:id", situacao.findOne);

    // Atualiza um situacao pelo id
    router.put("/:id", situacao.update);

    // Exclui um situacao a partir do id
    router.delete("/:id", situacao.delete);

    // Criar um novo situacao
    router.post("/", situacao.create);

    // Obter todos os situacaos
    router.get("/", situacao.findAll);

    // Exclui todos os situacaos
    router.delete("/", situacao.deleteAll);

    app.use('/api/situacao', router);
};