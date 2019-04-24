const express = require("express");
const nunjucks = require("nunjucks");

const app = express();

//Fica monitrando os arquivos
nunjucks.configure("views", {
  autoescape: true,
  express: app,
  watch: true
});

app.set("view engine", "njk"); //Seta uma variavel global, nessa caso sera como vamos chamar o nunjucks

app.get("/", (req, res) => {
  return res.render("list", { name: "Guilherme" });
});

app.listen(3000);
