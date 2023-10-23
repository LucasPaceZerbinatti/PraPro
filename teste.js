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
const app = express()
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

    net.createServer (function(sock) {    
            sock.on('data', function(data){
                console.log(data.toString())
                dados = data.toString()

                app.get('/', (req, res) => {
                  res.send(dados)
                })
            })
        } ) .listen(PORT, HOST)





/*app.get('/', (req, res) => {
  res.send(dados)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})*/