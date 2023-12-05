var net = require('net')
var HOST = '127.0.0.1'
var PORT = '8000'
var port = '8080'
var dados = null
const express = require('express')
var cors = require('cors')
const app = express()
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
var dados1
var dados2
var metodo
var quantos = 0
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

  res.send(metodo+";,"+dados1+";,"+dados2)
})
appJava.post('/', function requestHandler(request, response) {
  request.setEncoding('utf-8')
  console.log(request.body.dados)
  dados = request.body.dados
  response.send(dados)

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

  app.get('/calendarioAtendente', (req, res) => {
    if (dados == null){
      res.send('continue')
    } else{
      if (quantos <= 0){
        quantos+=1
        console.log("calendarioAtendente"+dados)
        res.send(dados)
        dados = null
      }

    }
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

setInterval(verifica, 1000)

function verifica(){
  console.log("verificando")
quantos = 0
}