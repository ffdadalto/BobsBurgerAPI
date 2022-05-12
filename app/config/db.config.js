// Casa
module.exports = {
    HOST: "localhost", // Ip ou nome do host onde está o SQL Server
    PORT: "1433", // Porta utilizada no SQL Server        
    USER: "sa", // Usuario
    PASSWORD: "YKcj10bc**", // Senha
    DB: "BobsBurger", // Banco ao qual se deseja conectar
    dialect: "mssql", // Tipo de Servidor de Banco de dados (SQL Server, Postgres, mySQL)
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

// module.exports = {
//     HOST: "192.168.10.64", // Ip ou nome do host onde está o SQL Server
//     PORT: "1433", // Porta utilizada no SQL Server        
//     USER: "sa", // Usuario
//     PASSWORD: "S@devtr1lh@", // Senha
//     DB: "Dadalto", // Banco ao qual se deseja conectar
//     dialect: "mssql", // Tipo de Servidor de Banco de dados (SQL Server, Postgres, mySQL)
//     pool: {
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000
//     }
// };


// // Amazon
// module.exports = {
//     HOST: "54.233.225.47", // Ip ou nome do host onde está o SQL Server
//     PORT: "1433", // Porta utilizada no SQL Server        
//     USER: "sa", // Usuario
//     PASSWORD: "YKcj10bc**", // Senha
//     DB: "BobsBurger", // Banco ao qual se deseja conectar
//     dialect: "mssql", // Tipo de Servidor de Banco de dados (SQL Server, Postgres, mySQL)
//     pool: {
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000
//     }
// };