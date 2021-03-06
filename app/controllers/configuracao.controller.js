const db = require("../models");
const utilitarios = require("../utilitarios/DateTimeNow");

const Configuracao = db.configuracao;

// Cria e salva um novo tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body.nomeEmpresa) {
        res.status(400).send({
            message: "Nome da empresa não pode ser vazio.",
        });
        return;
    }

    // Cria um configuracao
    const configuracao = {
        nomeEmpresa: req.body.nomeEmpresa,
        enderecoEmpresa: req.body.enderecoEmpresa,
        numeroEmpresa: req.body.numeroEmpresa,
        bairroEmpresa: req.body.bairroEmpresa,
        cidadeEmpresa: req.body.cidadeEmpresa,
        ufEmpresa: req.body.ufEmpresa,
        cepEmpresa: req.body.cepEmpresa,
        telefoneFixoEmpresa: req.body.telefoneFixoEmpresa,
        telefoneCelEmpresa: req.body.telefoneCelEmpresa,
        horarioAtendimentoInicial: req.body.horarioAtendimentoInicial,
        horarioAtendimentoFinal: req.body.horarioAtendimentoFinal,
        sobreEmpresa: req.body.sobreEmpresa,
        ativo: req.body.ativo,
        dataCadastro: utilitarios.dateTimeNow()
    };
    // Salva o configuracao no banco de dados
    Configuracao.create(configuracao)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Ocorreu algum erro enquanto cadastravamos a configuração",
            });
        });
};

// Retorna todos os configuracaos do banco de dados
exports.findAll = (req, res) => {
    Configuracao.findAll({
            order: [
                ['id', 'DESC'], // Ordena pelo id
            ],
        })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message ||
                    "Ocorreu algum erro enquanto tentavamos obter a configuracão",
            });
        });
};

// // Retorna um configuracao pelo id passado por parametro
// exports.findOne = (req, res) => {
//     const id = req.params.id;
//     Configuracao.findByPk(id, { include: db.bairro })
//         .then((data) => {
//             res.send(data);
//         })
//         .catch((err) => {
//             res.status(500).send({
//                 message: "Erro ao obter o configuracao id=" + id,
//             });
//         });
// };

// Atualiza um configuracao pelo id passado por parametro
exports.update = (req, res) => {
    const id = req.params.id;
    Configuracao.update(req.body, {
            where: { id: id },
        })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Configuracao foi atualizado com sucesso.",
                });
            } else {
                res.send({
                    message: `Não foi possível atualizar o configuracao id=${id}. Talvez ele não foi localizado ou o body da requisição está vazio`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Erro ao atualizado o configuracao id=" + id,
            });
        });
};

exports.getSobre = (req, res) => {
    Configuracao.findAll({
            attributes: ['sobreEmpresa']
        })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message ||
                    "Ocorreu algum erro enquanto tentavamos obter os dados",
            });
        });
};