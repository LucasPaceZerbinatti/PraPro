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

console.log("teste")

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  
})
app.use(cors())
app.options('*', cors())

app.post('/', function requestHandler(req, res) {
  res.json(req.body)
  dados1 = req.body.dados1
  dados2 = req.body.dados2
  console.log(req.body.metodo)
  console.log(req.body.dados1)
  if (req.body.metodo != 'passar'){
    enviarParaJava(req.body.metodo+","+req.body.dados1+","+req.body.dados2)
  }
  else{
    console.log('passando')
    }
  }
)



function enviarParaJava(mensagem){
  console.log('escrevendo')
    var teste = net.createServer (function(sock) {  
    sock.write(mensagem)
    console.log('escrito')
    sock.end()
    sock.on('data', function(data){
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

