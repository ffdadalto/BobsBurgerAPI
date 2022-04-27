const { DataTypes } = require("sequelize");
const db = require("../models");

module.exports = (sequelize, Sequelize) => {
    const Bairro = sequelize.define(
        "bairro", {
            nome: { type: DataTypes.STRING, allowNull: false },
            ativo: { type: DataTypes.BOOLEAN },
            dataCadastro: { type: DataTypes.DATE },
        }, {
            freezeTableName: true, // Ativa/desativa a pluralização do nome da tabela no BD
            timestamps: false, // Não salva os momentos de criação/atualização dos dados da tabela
        }
    );

    return Bairro;
};