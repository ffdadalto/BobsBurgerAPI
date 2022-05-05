const { DataTypes } = require("sequelize");
const db = require("../models");

module.exports = (sequelize, Sequelize) => {
    const Configuracao = sequelize.define(
        "configuracao", {
            nomeEmpresa: { type: DataTypes.STRING, allowNull: false },
            enderecoEmpresa: { type: DataTypes.STRING, allowNull: false },
            numeroEmpresa: { type: DataTypes.STRING, allowNull: false },
            bairroEmpresa: { type: DataTypes.STRING, allowNull: false },
            cidadeEmpresa: { type: DataTypes.STRING, allowNull: false },
            ufEmpresa: { type: DataTypes.STRING, allowNull: false },
            cepEmpresa: { type: DataTypes.STRING },
            telefoneFixoEmpresa: { type: DataTypes.STRING },
            telefoneCelEmpresa: { type: DataTypes.STRING },
            horarioAtendimentoInicial: { type: DataTypes.STRING },
            horarioAtendimentoFinal: { type: DataTypes.STRING },
            sobreEmpresa: { type: DataTypes.STRING },

            ativo: { type: DataTypes.BOOLEAN },
            dataCadastro: { type: DataTypes.DATE }

        }, {
            freezeTableName: true, // Ativa/desativa a pluralização do nome da tabela no BD
            timestamps: false, // Não salva os momentos de criação/atualização dos dados da tabela
        }
    );

    return Configuracao;
};