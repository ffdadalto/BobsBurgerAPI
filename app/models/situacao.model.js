const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Situacao = sequelize.define(
        "situacao", {
            nome: { type: DataTypes.STRING, allowNull: false },
            cor: { type: DataTypes.STRING },
            ativo: { type: DataTypes.BOOLEAN },
            dataCadastro: { type: DataTypes.DATE }

        }, {
            freezeTableName: true, // Ativa/desativa a pluralização do nome da tabela no BD
            timestamps: false, // Não salva os momentos de criação/atualização dos dados da tabela
        }
    );

    return Situacao;
};