const { get } = require('http')
var net = require('net')
const { buffer } = require('stream/consumers')
var HOST = '127.0.0.1'
var PORT = '8000'
var receberDados
var mensagem = "conexao"
var dados = null

function comecar(){
    net.createServer (function(sock) {    
        function receberDados(){
            sock.on('data', function(data){
                console.log(data.toString())
                dados = data
            })
        }    
        function escreverDados(mensagem){
            sock.write(mensagem)
            sock.end()
        }
        receberDados()
        escreverDados(mensagem)
            
        }) .listen(PORT, HOST)
}
comecar()

