const express = require("express");

const app = express();

const logMiddleware = (req, res) => {
  console.log(
    `HOST: ${req.headers.host} |  URL: ${req.url} | METHOD: ${req.method}`
  );

  req.appName = "GoNode"; //Faz com que o resto das req que utilizem o middleware tenham acesso a essa informação

  return next(); //"Fala" para o Middleware que ele não deve bloquear o fluxo da requisição(faz o que tem que ser feito e continua)
};

app.use(logMiddleware); //.use para todos as requisições usarem o middleware

app.get("/", logMiddleware, (req, res) => {
  return res.send(`Bem-vindo ao ${req.appName}, ${req.query.name}`); //Browser = localhost:3000/?name=Gui
});

app.get("/nome/:name", (req, res) => {
  return res.send(`Bem-vindo,${req.params.name}`);
});

app.get("/nome/:name", (req, res) => {
  return res.json({
    message: `Bem-vindo ${req.params.name}`
  });
});

app.listen(3000);
