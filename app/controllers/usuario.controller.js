const db = require("../models");
const utilitarios = require("../utilitarios/DateTimeNow");

const Usuario = db.usuario;

// Cria e salva uma nova Usuario
exports.create = (req, res) => {
    // Validate request
    if (!req.body.nome) {
        res.status(400).send({
            message: "Nome do Usuario não pode ser vazio.",
        });
        return;
    }
    // Cria um usuario
    const usuario = {
        nome: req.body.nome,
        login: req.body.login,
        senha: req.body.senha,
        email: req.body.email,
        ativo: req.body.ativo,
        dataCadastro: utilitarios.dateTimeNow(),
    };
    // Salva o usuario no banco de dados
    Usuario.create(usuario)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Ocorreu algum erro enquanto cadastravamos a Usuario",
            });
        });
};

// Retorna todos os usuaruis
exports.findAll = (req, res) => {
    Usuario.findAll()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message ||
                    "Ocorreu algum erro enquanto tentavamos obter os Usuários",
            });
        });
};

// Retorna todos as situacões inativas
exports.findAllInactive = (req, res) => {
    Usuario.findAll({ where: { ativo: false } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocorreu algum erro enquanto tentavamos obter os Usúarios inativos."
            });
        });
};

// Retorna um Usuario pelo id passado por parametro
exports.findOne = (req, res) => {
    const id = req.params.id;
    Usuario.findByPk(id)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: "Erro ao obter a Usuario id=" + id,
            });
        });
};

// Atualiza um Usuário pelo id passado por parametro
exports.update = (req, res) => {
    const id = req.params.id;

    Usuario.update(req.body, {
            where: { id: id },
        })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Usuário foi atualizado com sucesso.",
                });
            } else {
                res.send({
                    message: `Não foi possível atualizar o Usuário id=${id}. Talvez ele não foi localizado ou o body da requisição está vazio`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Erro ao atualizar a Usuario id=" + id,
            });
        });
};

// Deleta um Usúario pelo id passado por parametro
exports.delete = (req, res) => {
    const idsExclusao = req.params.id;
    Usuario.destroy({
            where: { id: idsExclusao },
        })
        .then(() => {
            res.send({
                message: "Usuário excluido com sucesso!",
            });
        })
        .catch((err) => {
            res.status(500).send({
                message: `Não foi possível excluir o Usuário id=${idsExclusao}. Erro: ${err}`
            });
        });
};

// Deleta todos os usuarios
exports.deleteAll = (req, res) => {
    const ids = req.body;
    Usuario.destroy({
            where: {
                id: ids
            },
            // truncate: false,
        })
        .then((nums) => {
            res.send({ message: `${nums} Usuários foram deletadas com sucesso!` });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message ||
                    "Algum erro ocorreu enquanto deletavamos todas os Usuários.",
            });
        });
};

// Retorna todos os usuarios inativos
exports.findAllInactive = (req, res) => {
    Usuario.findAll({
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
                message: err.message || "Ocorreu algum erro enquanto tentavamos obter os Usuários inativos."
            });
        });
};

// Retorna todos os usuarios ativos
exports.findAllActive = (req, res) => {
    Usuario.findAll({
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
                message: err.message || "Ocorreu algum erro enquanto tentavamos obter os Usuários ativos."
            });
        });
};