const db = require("../models");
const utilitarios = require("../utilitarios/DateTimeNow");

const Pedido = db.pedido;
// const Op = db.Sequelize.Op
const { Op } = require("sequelize");

// Cria e salva um novo pedido
exports.create = (req, res) => {
    // Validate request
    if (!req.body.numero) {
        res.status(400).send({
            message: "Número do Pedido não pode ser vazio.",
        });
        return;
    }
    // Cria um pedido
    const pedido = {
        numero: req.body.numero,
        valorTotal: req.body.valorTotal,
        formaPagamentoId: req.body.formaPagamentoId,
        clienteId: req.body.clienteId,
        situacaoId: req.body.situacaoId,
        ativo: req.body.ativo,
        dataCadastro: utilitarios.dateTimeNow(),
    };
    // Salva o pedido no banco de dados
    Pedido.create(pedido)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Ocorreu algum erro enquanto cadastravamos o pedido",
            });
        });
};

// Retorna todos os tutoriais do banco de dados
exports.findAll = (req, res) => {
    Pedido.findAll({
            include: { all: true }, // Trás todas as relações, inclusive as dos filhos
            // include: { all: true, nested: true } // Trás todas as relações, inclusive as dos filhos
            order: [
                ['id', 'DESC'], // Ordena pelo nome descendente
            ],
        })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message ||
                    "Ocorreu algum erro enquanto tentavamos obter os pedidos",
            });
        });
};

// Retorna todos os pedidos inativos
exports.findAllInactive = (req, res) => {
    Pedido.findAll({ where: { ativo: false } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocorreu algum erro enquanto tentavamos obter os pedidos inativos."
            });
        });
};

// Retorna um pedido pelo id passado por parametro
exports.findOne = (req, res) => {
    const id = req.params.id;
    Pedido.findByPk(id, { include: { all: true, nested: true } })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: "Erro ao obter o pedido id=" + id,
            });
        });
};

// Atualiza um pedido pelo id passado por parametro
exports.update = (req, res) => {
    const id = req.params.id;

    Pedido.update(req.body, {
            where: { id: id },
        })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Pedido foi atualizado com sucesso.",
                });
            } else {
                res.send({
                    message: `Não foi possível atualizar o pedido id=${id}. Talvez ele não foi localizado ou o body da requisição está vazio`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Erro ao atualizado o pedido id=" + id,
            });
        });
};

// Deleta um pedido pelo id passado por parametro
exports.delete = (req, res) => {
    const idsExclusao = req.params.id;
    Pedido.destroy({
            where: { id: idsExclusao },
        })
        .then(() => {
            res.send({
                message: "Pedido excluido com sucesso!",
            });
        })
        .catch((err) => {
            res.status(500).send({
                message: `Não foi possível excluir o pedido id=${idsExclusao}. Erro: ${err}`
            });
        });
};

// Deleta todos os pedidos
exports.deleteAll = (req, res) => {
    const ids = req.body;
    Pedido.destroy({
            where: {
                id: ids
            },
            // truncate: false,
        })
        .then((nums) => {
            res.send({ message: `${nums} Pedidos foram deletados com sucesso!` });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message ||
                    "Algum erro ocorreu enquanto deletavamos todos os Pedidos.",
            });
        });
};

// Retorna todos os pedidos inativos
exports.findAllInactive = (req, res) => {
    Pedido.findAll({
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
                message: err.message || "Ocorreu algum erro enquanto tentavamos obter os pedidos inativos."
            });
        });
};

// Retorna todos os pedidos ativos
exports.findAllActive = (req, res) => {
    Pedido.findAll({
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
                message: err.message || "Ocorreu algum erro enquanto tentavamos obter os pedidos ativos."
            });
        });
};