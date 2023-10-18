let dados = require("./teste")
console.log("iniciando")
setTimeout(function() {
    console.log(dados.dados); 
}, 3);
setTimeout(function() {
    console.log(dados.dados); 
}, 30);

setTimeout(function() {
    console.log(dados.dados); 
}, 300);

setTimeout(function() {
    console.log("apos 30");
    console.log(dados.dados); 
}, 30000);
