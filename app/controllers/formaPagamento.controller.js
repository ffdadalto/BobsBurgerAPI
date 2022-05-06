const db = require("../models");
const utilitarios = require("../utilitarios/DateTimeNow");

const FormaPagamento = db.formaPagamento;

// Cria e salva um novo tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body.nome) {
        res.status(400).send({
            message: "Nome da Forma de Pagamento não pode ser vazio.",
        });
        return;
    }

    // Cria um formaPagamento
    const formaPagamento = {
        nome: req.body.nome,
        taxa: req.body.taxa,
        ativo: req.body.ativo,
        dataCadastro: utilitarios.dateTimeNow()
    };
    // Salva o formaPagamento no banco de dados
    FormaPagamento.create(formaPagamento)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Ocorreu algum erro enquanto cadastravamos a Forma de Pagamento",
            });
        });
};

// Retorna todos os formaPagamentos do banco de dados
exports.findAll = (req, res) => {
    FormaPagamento.findAll()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message ||
                    "Ocorreu algum erro enquanto tentavamos obter as Formas de Pagamentos",
            });
        });
};

// Retorna um formaPagamento pelo id passado por parametro
exports.findOne = (req, res) => {
    const id = req.params.id;
    FormaPagamento.findByPk(id)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: "Erro ao obter a Forma de Pagamento id=" + id,
            });
        });
};

// Atualiza um formaPagamento pelo id passado por parametro
exports.update = (req, res) => {
    const id = req.params.id;
    FormaPagamento.update(req.body, {
            where: { id: id },
        })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Forma de Pagamento foi atualizado com sucesso.",
                });
            } else {
                res.send({
                    message: `Não foi possível atualizar o Forma d ePagamento id=${id}. Talvez ele não foi localizado ou o body da requisição está vazio`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Erro ao atualizar a Forma de Pagamento id=" + id,
            });
        });
};

// Deleta um formaPagamento pelo id passado por parametro
exports.delete = (req, res) => {
    const idsExclusao = req.params.id;
    FormaPagamento.destroy({
            where: { id: idsExclusao },
        })
        .then(() => {
            res.send({
                message: "Forma de Pagament excluido com sucesso!",
            });
        })
        .catch((err) => {
            res.status(500).send({
                message: `Não foi possível excluir a Forma de Pagament id=${idsExclusao}. Erro: ${err}`
            });
        });
};

// Deleta todos os formaPagamentos
exports.deleteAll = (req, res) => {
    const ids = req.body;
    FormaPagamento.destroy({
            where: {
                id: ids
            },
            // truncate: false,
        })
        .then((nums) => {
            res.send({ message: `${nums} Formas de Pagamentos foram deletados com sucesso!` });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message ||
                    "Algum erro ocorreu enquanto deletavamos todos as Formas de Pagamentos.",
            });
        });
};

// Retorna todos os formaPagamentos inativos
exports.findAllInactive = (req, res) => {
    FormaPagamento.findAll({
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
                message: err.message || "Ocorreu algum erro enquanto tentavamos obter as Formas de Pagamentos inativos."
            });
        });
};

// Retorna todos os formaPagamentos ativos
exports.findAllActive = (req, res) => {
    FormaPagamento.findAll({
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
                message: err.message || "Ocorreu algum erro enquanto tentavamos obter as Formas de Pagamentos ativos."
            });
        });
};