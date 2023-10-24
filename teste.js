const { get } = require('http')
var net = require('net')
const { buffer } = require('stream/consumers')
var HOST = '127.0.0.1'
var PORT = '8000'
var port = '8080'
var receberDados
var mensagem = "conexao"
var dados = null
const express = require('express')
var cors = require('cors')
const app = express()
const appJava = express()
var bodyParser = require('body-parser');
const { stringify } = require('querystring')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
var dadosJS

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
app.use(cors())
app.options('*', cors())

app.post('/', function requestHandler(req, res) {
  res.json(req.body)
  console.log(stringify(req.body))
  dadosJS = stringify(req.body)
  enviarParaJava(dadosJS)
});


appJava.listen(PORT, () => {
  console.log("Ouvindo na porta do JAVA")
})

appJava.get('/', (req, res) => {
  res.send("givas muito gay")
  console.log("enviado")
})