const express = require("express");
const mysql = require("mysql2");
const app = express();
const PORT = 3001;

app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "expressDB", //use expressDB
}); //creamos la configuración para conectarnos a la bd

db.connect(); // nos conectamos

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

app.post("/", (req, res) => {
  console.log(req.body);
  let sql = `INSERT INTO posts (title, body) values
          ('${req.body.title}', '${req.body.body}');`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Post added...");
  });
});

//traerme todas las publicaciones
app.get("/", (req, res) => {
  let sql = `SELECT * FROM posts`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    //   res.send(result);
    res.send({
      description: "Aqui tienes las publicaciones",
      posts: result,
    });
  });
});
app.get("/id/:id", (req, res) => {
  let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.put('/id/:id',(req,res)=>{
    let sql = `UPDATE posts SET title = '${req.body.title}' WHERE id = ${req.params.id}`;
    db.query(sql, (err,result)=> {
      if(err) throw err;
      res.send('Post updated...')
    })
  })

//DELETE POST BY ID
// DELETE FROM posts WHERE id = 6;
  
app.delete("/id/:id",(req,res)=>{
    let sql = `DELETE FROM posts WHERE id = ${req.params.id};`
    db.query(sql,(err,result)=>{
        if(err)throw err;
        res.send("Post deleted")
    })
})
app.listen(PORT, () => console.log("Servidor levantado en el puerto " + PORT));
