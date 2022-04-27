const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Pedido = sequelize.define(
        "pedido", {
            nome: { type: DataTypes.STRING, allowNull: false },
            dataCadastro: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        }, {
            freezeTableName: true, // Ativa/desativa a pluralização do nome da tabela no BD
            timestamps: false, // Não salva os momentos de criação/atualização dos dados da tabela
        }
    );
    return Pedido;
};