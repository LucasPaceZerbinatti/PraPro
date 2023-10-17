const { get } = require('http')
var net = require('net')
const { buffer } = require('stream/consumers')
var HOST = '127.0.0.1'
var PORT = '8000'
import { Buffer } from 'node:buffer'

net.createServer (function(sock) {
    console.log('CONNECTED: '+ sock.remoteAddress+':'+ sock.remotePort)
    sock.on('data', function(data){
    console.log(data.toString())
    sock.write(Buffer.from('givas'))
    })
    sock.on('close',function(data){
        console.log('closed:'+sock.remoteAddress+' '+ sock.remotePort)
    })
}) .listen(PORT, HOST)