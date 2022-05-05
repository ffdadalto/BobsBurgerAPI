module.exports = app => {
    const configuracao = require("../controllers/configuracao.controller.js");

    var router = require("express").Router();

    // // Obter todos os configuracaos inativos
    // router.get("/inativo", configuracao.findAllInactive);

    // Obter todos os configuracaos ativos
    router.get("/sobre", configuracao.getSobre);

    // // Obter um configuracao a partir do id
    // router.get("/:id", configuracao.findOne);

    // Atualiza um configuracao pelo id
    router.put("/:id", configuracao.update);

    // // Exclui um configuracao a partir do id
    // router.delete("/:id", configuracao.delete);

    // Criar um novo configuracao
    router.post("/", configuracao.create);

    // Obter todos os configuracaos
    router.get("/", configuracao.findAll);

    // // Exclui todos os configuracaos
    // router.delete("/", configuracao.deleteAll);

    app.use('/api/configuracao', router);
};