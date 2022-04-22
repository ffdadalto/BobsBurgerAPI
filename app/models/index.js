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

db.cliente = require("./cliente.model.js")(sequelizeInstance, Sequelize);
db.pedido = require("./pedido.model.js")(sequelizeInstance, Sequelize);

// Relação 1 pra muitos(Cliente e Pedidos)
db.cliente.hasMany(db.pedido);
db.pedido.belongsTo(db.cliente);

module.exports = db;