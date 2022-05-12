const express = require("express");
const cors = require("cors");
const app = express();

// var corsOptions = {
//     origin: "http://localhost:9090"
// };
// app.use(cors(corsOptions));
app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

require("./app/routes/pedido.routes")(app);
require("./app/routes/situacao.routes")(app);
require("./app/routes/item.routes")(app);
require("./app/routes/cliente.routes")(app);
require("./app/routes/formaPagamento.routes")(app);
require("./app/routes/bairro.routes")(app);
require("./app/routes/cidade.routes")(app);
require("./app/routes/configuracao.routes")(app);

// Sincroniza o DB com os models
const db = require("./app/models");
db.sequelize.sync({ alter: true });


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});