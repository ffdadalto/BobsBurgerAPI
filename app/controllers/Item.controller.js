const db = require("../models");
const utilitarios = require("../utilitarios/DateTimeNow");

const Item = db.item;
// const Op = db.Sequelize.Op
const { Op } = require("sequelize");

// Cria e salva um novo tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body.nome) {
        res.status(400).send({
            message: "Nome do item não pode ser vazio.",
        });
        return;
    }

    // Cria um item
    const item = {
        nome: req.body.nome,
        valor: req.body.valor,
        ativo: req.body.ativo,
        dataCadastro: utilitarios.dateTimeNow()
    };
    // Salva o item no banco de dados
    Item.create(item)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Ocorreu algum erro enquanto cadastravamos o item",
            });
        });
};

// Retorna todos os items do banco de dados
exports.findAll = (req, res) => {
    Item.findAll({
            // include: { all: true }, // trás somente o primeiro filho
            order: [
                ['id', 'DESC'], // Ordena pelo nome
            ],
        })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message ||
                    "Ocorreu algum erro enquanto tentavamos obter os items",
            });
        });
};

// Retorna um item pelo id passado por parametro
exports.findOne = (req, res) => {
    const id = req.params.id;
    Item.findByPk(id, { include: db.bairro })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: "Erro ao obter o item id=" + id,
            });
        });
};

// Atualiza um item pelo id passado por parametro
exports.update = (req, res) => {
    const id = req.params.id;
    Item.update(req.body, {
            where: { id: id },
        })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Item foi atualizado com sucesso.",
                });
            } else {
                res.send({
                    message: `Não foi possível atualizar o item id=${id}. Talvez ele não foi localizado ou o body da requisição está vazio`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Erro ao atualizado o item id=" + id,
            });
        });
};

// Deleta um item pelo id passado por parametro
exports.delete = (req, res) => {
    const idsExclusao = req.params.id;
    Item.destroy({
            where: { id: idsExclusao },
        })
        .then(() => {
            res.send({
                message: "Item excluido com sucesso!",
            });
        })
        .catch((err) => {
            res.status(500).send({
                message: `Não foi possível excluir o item id=${idsExclusao}. Erro: ${err}`
            });
        });
};

// Deleta todos os items
exports.deleteAll = (req, res) => {
    const ids = req.body;
    Item.destroy({
            where: {
                id: ids
            },
            // truncate: false,
        })
        .then((nums) => {
            res.send({ message: `${nums} Items foram deletados com sucesso!` });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message ||
                    "Algum erro ocorreu enquanto deletavamos todos os items.",
            });
        });
};

// Retorna todos os items inativos
exports.findAllInactive = (req, res) => {
    Item.findAll({ where: { ativo: false } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocorreu algum erro enquanto tentavamos obter os items inativos."
            });
        });
};

// Retorna todos os itens inativos
exports.findAllInactive = (req, res) => {
    Item.findAll({
            where: { ativo: false },
            order: [
                ['id', 'DESC'], // Ordena pelo nome descendente
            ],
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocorreu algum erro enquanto tentavamos obter os itens inativos."
            });
        });
};

// Retorna todos os itens ativos
exports.findAllActive = (req, res) => {
    Item.findAll({
            where: { ativo: true },
            order: [
                ['id', 'DESC'], // Ordena pelo nome descendente
            ],
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocorreu algum erro enquanto tentavamos obter os itens ativos."
            });
        });
};