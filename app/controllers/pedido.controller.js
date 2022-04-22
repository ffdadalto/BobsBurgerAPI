const db = require("../models");

const Pedido = db.pedido;
// const Op = db.Sequelize.Op
const { Op } = require("sequelize");

// Cria e salva um novo tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body.nome) {
        res.status(400).send({
            message: "Nome do Pedido não pode ser vazio.",
        });
        return;
    }
    // Cria um tutorial
    const pedido = {
        nome: req.body.nome,
        ClienteId: req.body.ClienteId
    };
    // Salva o tutorial no banco de dados
    Pedido.create(pedido)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Ocorreu algum erro enquanto cadastravamos o cliente",
            });
        });
};

// Retorna todos os tutoriais do banco de dados
exports.findAll = (req, res) => {
    const nome = req.query.nome;
    var condition = nome ? {
            nome: {
                [Op.like]: `%${nome}%`,
            },
        } :
        null;
    Pedido.findAll({ where: condition, include: db.cliente })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message ||
                    "Ocorreu algum erro enquanto tentavamos obter os clientes",
            });
        });
};