const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Usuario = sequelize.define(
        "usuario", {
            nome: { type: DataTypes.STRING, allowNull: false },
            login: { type: DataTypes.STRING, allowNull: false },
            senha: { type: DataTypes.STRING, allowNull: false },
            email: { type: DataTypes.STRING, allowNull: false },
            ativo: { type: DataTypes.BOOLEAN },
            dataCadastro: { type: DataTypes.DATE }

        }, {
            freezeTableName: true, // Ativa/desativa a pluralização do nome da tabela no BD
            timestamps: false, // Não salva os momentos de criação/atualização dos dados da tabela
        }
    );

    return Usuario;
};