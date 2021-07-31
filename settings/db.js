const mysql = require("mysql");
const config = require("../config")

const connConfig = process.env.JAWSDB_URL || {
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.password,
    database: config.database,
};

const connection = mysql.createConnection(connConfig);

connection.connect((err) => {
    if (err) {
        return console.log("Ошибка подключения к базе данных!");
    } else {
        return console.log("Подключение успешно!");
    }
});

module.exports = connection
