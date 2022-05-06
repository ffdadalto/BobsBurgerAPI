const db = require("../models");
const utilitarios = require("../utilitarios/DateTimeNow");

const Situacao = db.situacao;
// const Op = db.Sequelize.Op
const { Op } = require("sequelize");

// Cria e salva uma nova Situacao
exports.create = (req, res) => {
    // Validate request
    if (!req.body.nome) {
        res.status(400).send({
            message: "Nome da Situacao não pode ser vazio.",
        });
        return;
    }
    // Cria um situacao
    const situacao = {
        nome: req.body.nome,
        ativo: req.body.ativo,
        dataCadastro: utilitarios.dateTimeNow(),
    };
    // Salva o situacao no banco de dados
    Situacao.create(situacao)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Ocorreu algum erro enquanto cadastravamos a Situacao",
            });
        });
};

// Retorna todos as Situações
exports.findAll = (req, res) => {
    Situacao.findAll()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message ||
                    "Ocorreu algum erro enquanto tentavamos obter as Situacões",
            });
        });
};

// Retorna todos as situacões inativas
exports.findAllInactive = (req, res) => {
    Situacao.findAll({ where: { ativo: false } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocorreu algum erro enquanto tentavamos obter as Situacões inativas."
            });
        });
};

// Retorna uma Situacao pelo id passado por parametro
exports.findOne = (req, res) => {
    const id = req.params.id;
    Situacao.findByPk(id)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: "Erro ao obter a Situacao id=" + id,
            });
        });
};

// Atualiza uma Situação pelo id passado por parametro
exports.update = (req, res) => {
    const id = req.params.id;

    Situacao.update(req.body, {
            where: { id: id },
        })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Situação foi atualizada com sucesso.",
                });
            } else {
                res.send({
                    message: `Não foi possível atualizar a Situação id=${id}. Talvez ele não foi localizado ou o body da requisição está vazio`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Erro ao atualizar a Situacao id=" + id,
            });
        });
};

// Deleta uam Situação pelo id passado por parametro
exports.delete = (req, res) => {
    const idsExclusao = req.params.id;
    Situacao.destroy({
            where: { id: idsExclusao },
        })
        .then(() => {
            res.send({
                message: "Situação excluida com sucesso!",
            });
        })
        .catch((err) => {
            res.status(500).send({
                message: `Não foi possível excluir a Situação id=${idsExclusao}. Erro: ${err}`
            });
        });
};

// Deleta todos os situacaos
exports.deleteAll = (req, res) => {
    const ids = req.body;
    Situacao.destroy({
            where: {
                id: ids
            },
            // truncate: false,
        })
        .then((nums) => {
            res.send({ message: `${nums} Situacões foram deletadas com sucesso!` });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message ||
                    "Algum erro ocorreu enquanto deletavamos todas as Situações.",
            });
        });
};

// Retorna todos os situacaos inativos
exports.findAllInactive = (req, res) => {
    Situacao.findAll({
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
                message: err.message || "Ocorreu algum erro enquanto tentavamos obter as Situacões inativas."
            });
        });
};

// Retorna todos os situacaos ativos
exports.findAllActive = (req, res) => {
    Situacao.findAll({
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
                message: err.message || "Ocorreu algum erro enquanto tentavamos obter os Situacões ativas."
            });
        });
};