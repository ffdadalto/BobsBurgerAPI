const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Cidade = sequelize.define(
        "cidade", {
            nome: { type: DataTypes.STRING, allowNull: false },
            qtdBairros: {
                type: DataTypes.VIRTUAL,
                get() {
                    return this.bairros ? this.bairros.length : 0;
                }
            },
            ativo: { type: DataTypes.BOOLEAN },
            dataCadastro: { type: DataTypes.DATE }

        }, {
            freezeTableName: true, // Ativa/desativa a pluralização do nome da tabela no BD
            timestamps: false, // Não salva os momentos de criação/atualização dos dados da tabela
        }
    );

    return Cidade;
};