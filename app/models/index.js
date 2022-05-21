const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelizeInstance = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    dialect: dbConfig.dialect,
    dialectOptions: {
        // Observe the need for this nested `options` field for MSSQL
        options: {
            // Your tedious options here
            useUTC: false,
            dateFirst: 1
        }
    },

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    },
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelizeInstance;

db.pedido = require("./pedido.model.js")(sequelizeInstance, Sequelize);
db.situacao = require("./situacao.model.js")(sequelizeInstance, Sequelize);
db.item = require("./item.model.js")(sequelizeInstance, Sequelize);
db.cliente = require("./cliente.model.js")(sequelizeInstance, Sequelize);
db.formaPagamento = require("./formaPagamento.model.js")(sequelizeInstance, Sequelize);
db.bairro = require("./bairro.model.js")(sequelizeInstance, Sequelize);
db.cidade = require("./cidade.model.js")(sequelizeInstance, Sequelize);
db.configuracao = require("./configuracao.model.js")(sequelizeInstance, Sequelize);
db.usuario = require("./usuario.model.js")(sequelizeInstance, Sequelize);

// Relação 1 pra muitos(Cliente e Pedidos)
db.cliente.hasMany(db.pedido);
db.pedido.belongsTo(db.cliente);

// Relação 1 pra muitos(Situação e Pedidos)
db.situacao.hasMany(db.pedido);
db.pedido.belongsTo(db.situacao);

// Relação 1 pra muitos(Forma de Pagamentos Pedidos)
db.formaPagamento.hasMany(db.pedido);
db.pedido.belongsTo(db.formaPagamento);

// Relação 1 pra muitos(Bairro e Cliente)
db.bairro.hasMany(db.cliente);
db.cliente.belongsTo(db.bairro);

// Relação 1 pra muitos(Cidade e Cliente)
db.cidade.hasMany(db.cliente);
db.cliente.belongsTo(db.cidade);

// Relação 1 pra muitos(Cidade e Bairros)
db.cidade.hasMany(db.bairro);
db.bairro.belongsTo(db.cidade);



module.exports = db;