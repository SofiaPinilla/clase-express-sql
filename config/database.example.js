const mysql = require("mysql2");

//explicar en el readme
const db = mysql.createConnection({
  host: "localhost",
  user: "tu usuario",
  password: "tu contraseña",
  database: "tu base de datos", //use expressDB
}); //creamos la configuración para conectarnos a la bd

db.connect(); // nos conectamos

module.exports = db;
