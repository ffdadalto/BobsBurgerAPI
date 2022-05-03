const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Pedido = sequelize.define(
        "pedido", {
            numero: { type: DataTypes.STRING, allowNull: false },
            valorTotal: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
            ativo: { type: DataTypes.BOOLEAN },
            dataCadastro: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        }, {
            freezeTableName: true, // Ativa/desativa a pluralização do nome da tabela no BD
            timestamps: false, // Não salva os momentos de criação/atualização dos dados da tabela
        }
    );
    return Pedido;
};