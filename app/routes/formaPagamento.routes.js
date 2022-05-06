module.exports = app => {
    const formaPagamento = require("../controllers/formaPagamento.controller.js");

    var router = require("express").Router();

    // Obter todos os formaPagamentos inativos
    router.get("/inativo", formaPagamento.findAllInactive);

    // Obter todos os formaPagamento ativos
    router.get("/ativo", formaPagamento.findAllActive);

    // Obter um formaPagamento a partir do id
    router.get("/:id", formaPagamento.findOne);

    // Atualiza um formaPagamento pelo id
    router.put("/:id", formaPagamento.update);

    // Exclui um formaPagamento a partir do id
    router.delete("/:id", formaPagamento.delete);

    // Criar um novo formaPagamento
    router.post("/", formaPagamento.create);

    // Obter todos os formaPagamentos
    router.get("/", formaPagamento.findAll);

    // Exclui todos os formaPagamentos
    router.delete("/", formaPagamento.deleteAll);

    app.use('/api/formaPagamento', router);
};