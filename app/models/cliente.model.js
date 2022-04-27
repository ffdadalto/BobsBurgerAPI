const { DataTypes } = require("sequelize");
const db = require("../models");

module.exports = (sequelize, Sequelize) => {
    const Cliente = sequelize.define(
        "cliente", {
            nome: { type: DataTypes.STRING, allowNull: false },
            telefone: { type: DataTypes.STRING, allowNull: false },
            cep: { type: DataTypes.STRING },
            endereco: { type: DataTypes.STRING },
            numero: { type: DataTypes.STRING },
            complemento: { type: DataTypes.STRING },
            bairro: { type: DataTypes.STRING },
            cidade: { type: DataTypes.STRING },
            ativo: { type: DataTypes.BOOLEAN },
            dataCadastro: { type: DataTypes.DATE },
        }, {
            freezeTableName: true, // Ativa/desativa a pluralização do nome da tabela no BD
            timestamps: false, // Não salva os momentos de criação/atualização dos dados da tabela
        }
    );

    return Cliente;
};