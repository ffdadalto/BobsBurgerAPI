const { DataTypes } = require("sequelize");
const db = require(".");

module.exports = (sequelize, Sequelize) => {
    const Item = sequelize.define(
        "item", {
            nome: { type: DataTypes.STRING, allowNull: false },
            valor: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
            ativo: { type: DataTypes.BOOLEAN },
            dataCadastro: { type: DataTypes.DATE },
        }, {
            freezeTableName: true, // Ativa/desativa a pluralização do nome da tabela no BD
            timestamps: false, // Não salva os momentos de criação/atualização dos dados da tabela
        }
    );

    return Item;
};