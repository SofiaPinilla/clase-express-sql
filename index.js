const express = require("express");
const db = require("./config/database")
const app = express();
const PORT = 3001;

app.use(express.json());



//AQUI MI CÓDIGO
app.get("/createdb", (req, res) => {
  let sql = "CREATE DATABASE expressDB";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Database created...");
  });
});

app.get("/createpoststable", (req, res) => {
  let sql =
    "CREATE TABLE posts(id INT AUTO_INCREMENT,title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Posts table created...");
  });
});

//CRUD
app.use("/posts",require("./routes/posts"))//importación rutas
// app.use("/users")

//traerme todas las publicaciones




//DELETE POST BY ID
// DELETE FROM posts WHERE id = 6;
  

app.listen(PORT, () => console.log("Servidor levantado en el puerto " + PORT));
