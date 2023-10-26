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

console.log("teste")

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  
})
app.use(cors())
app.options('*', cors())

app.post('/', function requestHandler(req, res) {
  res.json(req.body)
  console.log(req.body.metodo)
  enviarParaJava(req.body.metodo+","+req.body.dados1+","+req.body.dados2)
});


function enviarParaJava(mensagem){
  console.log('escrevendo')
    var teste = net.createServer (function(sock) {  
    sock.write(mensagem)
    console.log('escrito')
    sock.end()
    sock.on('data', function(data){
        console.log(data.toString())
        dados = data.toString()
        teste.close()
        app.get('/', (req, res) => {
        res.send(dados)
          })
        

      }

    )
} ) .listen(PORT, HOST)
  

} 

