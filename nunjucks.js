const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

// Fica monitrando os arquivos
nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'njk') // Seta uma variavel global

const users = ['Guilherme Santos', 'Diego Fernandes', 'Cleiton Souza']

app.get('/', (req, res) => {
  return res.render('list', { users })
})

app.get('/new', (req, res) => {
  return res.render('new')
})

app.post('/create', (req, res) => {
  users.push(req.body.user)
  return res.redirect('/')
})

app.listen(3333)
