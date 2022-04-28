const db = require("../models");
const utilitarios = require("../utilitarios/DateTimeNow");

const Cliente = db.cliente;
// const Op = db.Sequelize.Op
const { Op } = require("sequelize");

// Cria e salva um novo tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body.nome) {
        res.status(400).send({
            message: "Nome do cliente não pode ser vazio.",
        });
        return;
    }

    // Cria um cliente
    const cliente = {
        nome: req.body.nome,
        telefone: req.body.telefone,
        cep: req.body.cep,
        endereco: req.body.endereco,
        numero: req.body.numero,
        complemento: req.body.complemento,
        bairroId: req.body.bairroId,
        ativo: req.body.ativo,
        dataCadastro: utilitarios.dateTimeNow()
    };
    // Salva o tutorial no banco de dados
    Cliente.create(cliente)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Ocorreu algum erro enquanto cadastravamos o cliente",
            });
        });
};

// Retorna todos os clientes do banco de dados
exports.findAll = (req, res) => {
    const nome = req.query.nome;
    var condition = nome ? {
            nome: {
                [Op.like]: `%${nome}%`,
            },
        } :
        null;
    Cliente.findAll({
            where: condition,
            include: { all: true, nested: true } // Trás todas as relações, inclusive as dos filhos
        })
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

// Retorna um cliente pelo id passado por parametro
exports.findOne = (req, res) => {
    const id = req.params.id;
    Cliente.findByPk(id, { include: db.pedido })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: "Erro ao obter o cliente id=" + id,
            });
        });
};

// Atualiza um cliente pelo id passado por parametro
exports.update = (req, res) => {
    const id = req.params.id;
    Cliente.update(req.body, {
            where: { id: id },
        })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Cliente foi atualizado com sucesso.",
                });
            } else {
                res.send({
                    message: `Não foi possível atualizar o cliente id=${id}. Talvez ele não foi localizado ou o body da requisição está vazio`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Erro ao atualizado o cliente id=" + id,
            });
        });
};

// Deleta um cliente pelo id passado por parametro
exports.delete = (req, res) => {
    const idsExclusao = req.params.id;
    Cliente.destroy({
            where: { id: idsExclusao },
        })
        .then(() => {
            res.send({
                message: "Cliente excluido com sucesso!",
            });
        })
        .catch((err) => {
            res.status(500).send({
                message: `Não foi possível excluir o cliente id=${idsExclusao}. Erro: ${err}`
            });
        });
};

// Deleta todos os clientes
exports.deleteAll = (req, res) => {
    const ids = req.body;



    // idsAux.forEach(e => {
    //     if (e != null && e != '' && typeof(e) === 'number')
    //         ids.push(e);
    // });
    // res.send(idsAux)

    Cliente.destroy({
            where: {
                id: ids
            },
            // truncate: false,
        })
        .then((nums) => {
            res.send({ message: `${nums} Clientes foram deletados com sucesso!` });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message ||
                    "Algum erro ocorreu enquanto deletavamos todos os clientes.",
            });
        });
};

// Retorna todos os clientes inativos
exports.findAllInactive = (req, res) => {
    Cliente.findAll({ where: { ativo: false } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocorreu algum erro enquanto tentavamos obter os clientes inativos."
            });
        });
};