module.exports = app => {
    const usuario = require("../controllers/usuario.controller.js");

    var router = require("express").Router();

    // Login
    router.get("/login", usuario.login);

    // Obter todos os usuarios inativos
    router.get("/inativo", usuario.findAllInactive);

    // Obter todos os usuarios ativos
    router.get("/ativo", usuario.findAllActive);

    // Obter um usuario a partir do id
    router.get("/:id", usuario.findOne);

    // Atualiza um usuario pelo id
    router.put("/:id", usuario.update);

    // Exclui um usuario a partir do id
    router.delete("/:id", usuario.delete);

    // Criar um novo usuario
    router.post("/", usuario.create);

    // Obter todos os usuarios
    router.get("/", usuario.findAll);

    app.use('/api/usuario', router);
};