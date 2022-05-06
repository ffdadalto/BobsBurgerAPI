const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const FormaPagamento = sequelize.define(
        "formaPagamento", {
            nome: { type: DataTypes.STRING, allowNull: false },
            taxa: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
            ativo: { type: DataTypes.BOOLEAN },
            dataCadastro: { type: DataTypes.DATE }

        }, {
            freezeTableName: true, // Ativa/desativa a pluralização do nome da tabela no BD
            timestamps: false, // Não salva os momentos de criação/atualização dos dados da tabela
        }
    );

    return FormaPagamento;
};