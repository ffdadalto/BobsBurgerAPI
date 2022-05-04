module.exports = app => {
    const pedido = require("../controllers/pedido.controller.js");

    var router = require("express").Router();

    // Obter todos os pedidos inativos
    router.get("/inativo", pedido.findAllInactive);

    // Obter todos os pedidos ativos
    router.get("/ativo", pedido.findAllActive);

    // Obter um pedido a partir do id
    router.get("/:id", pedido.findOne);

    // Atualiza um pedido pelo id
    router.put("/:id", pedido.update);

    // Exclui um pedido a partir do id
    router.delete("/:id", pedido.delete);

    // Criar um novo pedido
    router.post("/", pedido.create);

    // Obter todos os pedidos
    router.get("/", pedido.findAll);

    // Exclui todos os pedidos
    router.delete("/", pedido.deleteAll);

    app.use('/api/pedido', router);
};