var net = require('net')
var HOST = '127.0.0.1'
var PORT = '8000'
var port = '8080'
var dados = null
const express = require('express')
var cors = require('cors')
const app = express()
var bodyParser = require('body-parser');
const { stringify } = require('querystring')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
var dados1
var dados2
var metodo
const appJava = express()
appJava.use(bodyParser.urlencoded({extended: true}))
appJava.use(bodyParser.text())
appJava.use(bodyParser.raw())

console.log("teste")

appJava.listen(PORT, () => {
  console.log('server java rodando')
})

appJava.use(cors())
appJava.options('*', cors())

appJava.get('/',(req, res) => {
  res.send(metodo+","+dados1+","+dados2)
})
appJava.post('/', function requestHandler(request, response) {
  console.log(request.body.dados)
  dados = request.body.dados
  response.send("coisa boa")

 app.get('/calendario/', (req, res) => {
    if (dados == null){
      res.send('continue')
    } else{
      console.log("calendario"+dados)
      res.send(dados)
      dados = null
    }

    })
  app.get('/consultas/', (req, res) => {
    if (dados == null){
      res.send('continue')
    } else{
      console.log("calendario"+dados)
      res.send(dados)
      dados = null
    }
          })
  
  app.get('/login/', (req, res) => {
      console.log("login2: "+dados)
      res.send(dados)
      dados = null
          })
        })
  
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  
})
app.use(cors())
app.options('*', cors())

app.post('/', function requestHandler(req, res) {
  res.json(req.body.toString())
  metodo = req.body.metodo
  dados1 = req.body.dados1
  dados2 = req.body.dados2
  console.log(req.body.metodo)
  console.log(req.body.dados1)
}
)



function enviarParaJava(mensagem){
  console.log('escrevendo')
  try{
    var teste = net.createServer (function(sock) {  
      teste.on('error', function(){
        console.log('givas gay')
      })
      sock.write(mensagem)
      console.log('escrito')
      sock.end()
      sock.on('data', function(data){
          console.log(PORT)
          dados = data.toString()
          console.log(Buffer.from(data, 'utf-8').toString())
          teste.close()          
  app.get('/calendario/', (req, res) => {
      console.log("calendario"+dados)
      res.send(dados)
      })
  app.get('/consultas/', (req, res) => {
      console.log("consultas: "+dados)
      res.send(dados)
          })
  
  app.get('/login/', (request, response) => {
      console.log("login2: "+dados)
      response.send(dados)
          })
        }
  
      )
  } ) .listen(PORT, HOST) 
  }

  catch(error){
    teste.close()
  }

} 

