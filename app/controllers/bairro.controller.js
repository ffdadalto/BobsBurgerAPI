const db = require("../models");
const utilitarios = require("../utilitarios/DateTimeNow");

const Bairro = db.bairro;
// const Op = db.Sequelize.Op
const { Op } = require("sequelize");

// Cria e salva um novo tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body.nome) {
        res.status(400).send({
            message: "Nome do bairro não pode ser vazio.",
        });
        return;
    }

    // Cria um bairro
    const bairro = {
        nome: req.body.nome,
        ativo: req.body.ativo,
        dataCadastro: utilitarios.dateTimeNow(),
        cidadeId: req.body.cidadeId
    };
    // Salva o bairro no banco de dados
    Bairro.create(bairro)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Ocorreu algum erro enquanto cadastravamos o bairro",
            });
        });
};

// Retorna todos os bairros do banco de dados
exports.findAll = (req, res) => {
    const nome = req.query.nome;
    var condition = nome ? {
            nome: {
                [Op.like]: `%${nome}%`,
            },
        } :
        null;
    Bairro.findAll({ where: condition, include: [{ model: db.cidade }] })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message ||
                    "Ocorreu algum erro enquanto tentavamos obter os bairros",
            });
        });
};

// Retorna um bairro pelo id passado por parametro
exports.findOne = (req, res) => {
    const id = req.params.id;
    Bairro.findByPk(id, { include: { all: true, nested: true } })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: "Erro ao obter o bairro id=" + id,
            });
        });
};

// Atualiza um bairro pelo id passado por parametro
exports.update = (req, res) => {
    const id = req.params.id;

    Bairro.update(req.body, {
            where: { id: id },
        })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Bairro foi atualizado com sucesso.",
                });
            } else {
                res.send({
                    message: `Não foi possível atualizar o bairro id=${id}. Talvez ele não foi localizado ou o body da requisição está vazio`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Erro ao atualizado o bairro id=" + id,
            });
        });
};

// Deleta um bairro pelo id passado por parametro
exports.delete = (req, res) => {
    const idsExclusao = req.params.id;
    Bairro.destroy({
            where: { id: idsExclusao },
        })
        .then(() => {
            res.send({
                message: "Bairro excluido com sucesso!",
            });
        })
        .catch((err) => {
            res.status(500).send({
                message: `Não foi possível excluir o bairro id=${idsExclusao}. Erro: ${err}`
            });
        });
};

// Deleta todos os bairros
exports.deleteAll = (req, res) => {
    const ids = req.body;
    Bairro.destroy({
            where: {
                id: ids
            },
            // truncate: false,
        })
        .then((nums) => {
            res.send({ message: `${nums} Bairros foram deletados com sucesso!` });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message ||
                    "Algum erro ocorreu enquanto deletavamos todos os bairros.",
            });
        });
};

// Retorna todos os bairros inativos
exports.findAllInactive = (req, res) => {
    Bairro.findAll({ where: { ativo: false } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocorreu algum erro enquanto tentavamos obter os bairros inativos."
            });
        });
};

exports.getNames = (req, res) => {
    Bairro.findAll({
            attributes: ['nome'],
            order: [
                ['nome', 'ASC'], // Ordena pelo nome
            ],
        })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message ||
                    "Ocorreu algum erro enquanto tentavamos obter os nomes dos bairros",
            });
        });
};

// Retorna todos os bairros inativos
exports.findAllInactive = (req, res) => {
    Bairro.findAll({
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
                message: err.message || "Ocorreu algum erro enquanto tentavamos obter os bairros inativos."
            });
        });
};

// Retorna todos os bairros ativos
exports.findAllActive = (req, res) => {
    Bairro.findAll({
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
                message: err.message || "Ocorreu algum erro enquanto tentavamos obter os bairros ativos."
            });
        });
};