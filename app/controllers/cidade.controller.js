const db = require("../models");
const utilitarios = require("../utilitarios/DateTimeNow");

const Cidade = db.cidade;
// const Op = db.Sequelize.Op
const { Op } = require("sequelize");

// Cria e salva um novo tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body.nome) {
        res.status(400).send({
            message: "Nome do cidade não pode ser vazio.",
        });
        return;
    }

    // Cria um cidade
    const cidade = {
        nome: req.body.nome,
        ativo: req.body.ativo,
        dataCadastro: utilitarios.dateTimeNow()
    };
    // Salva o cidade no banco de dados
    Cidade.create(cidade)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Ocorreu algum erro enquanto cadastravamos o cidade",
            });
        });
};

// Retorna todos os cidades do banco de dados
exports.findAll = (req, res) => {
    const nome = req.query.nome;
    var condition = nome ? {
            nome: {
                [Op.like]: `%${nome}%`,
            },
        } :
        null;
    Cidade.findAll({ where: condition, include: { all: true } })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message ||
                    "Ocorreu algum erro enquanto tentavamos obter os cidades",
            });
        });
};

// Retorna um cidade pelo id passado por parametro
exports.findOne = (req, res) => {
    const id = req.params.id;
    Cidade.findByPk(id)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: "Erro ao obter o cidade id=" + id,
            });
        });
};

// Atualiza um cidade pelo id passado por parametro
exports.update = (req, res) => {
    const id = req.params.id;
    Cidade.update(req.body, {
            where: { id: id },
        })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Cidade foi atualizado com sucesso.",
                });
            } else {
                res.send({
                    message: `Não foi possível atualizar o cidade id=${id}. Talvez ele não foi localizado ou o body da requisição está vazio`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Erro ao atualizado o cidade id=" + id,
            });
        });
};

// Deleta um cidade pelo id passado por parametro
exports.delete = (req, res) => {
    const idsExclusao = req.params.id;
    Cidade.destroy({
            where: { id: idsExclusao },
        })
        .then(() => {
            res.send({
                message: "Cidade excluido com sucesso!",
            });
        })
        .catch((err) => {
            res.status(500).send({
                message: `Não foi possível excluir o cidade id=${idsExclusao}. Erro: ${err}`
            });
        });
};

// Deleta todos os cidades
exports.deleteAll = (req, res) => {
    const ids = req.body;



    // idsAux.forEach(e => {
    //     if (e != null && e != '' && typeof(e) === 'number')
    //         ids.push(e);
    // });
    // res.send(idsAux)

    Cidade.destroy({
            where: {
                id: ids
            },
            // truncate: false,
        })
        .then((nums) => {
            res.send({ message: `${nums} Cidades foram deletados com sucesso!` });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message ||
                    "Algum erro ocorreu enquanto deletavamos todos os cidades.",
            });
        });
};

// Retorna todos os cidades inativos
exports.findAllInactive = (req, res) => {
    Cidade.findAll({ where: { ativo: false } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocorreu algum erro enquanto tentavamos obter os cidades inativos."
            });
        });
};