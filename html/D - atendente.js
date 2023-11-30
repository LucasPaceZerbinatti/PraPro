
let result = window.document.querySelector("#result");
let resultCalendario = window.document.querySelector("#resultCalendario");
let aparece = window.document.querySelector("#aparece");
var vetorEspec
const data = new Date()
var diaSelecionado
var vetorMed
const dia = data.getDate()
const mesFixo = data.getMonth()
let mes = data.getMonth()
let ano = data.getFullYear()
var mesEscrito
var vetorPaciente
diasMes = 1

function calendario() { 

switch (mes) {
    case 0:
        mesEscrito = "Janeiro"
        qntsMes = 31
        break;
    case 1:
        mesEscrito = "Feveiro"
        if (calcular_bissexto() == true) { qntsMes = 29 } 
        else {qntsMes = 28}
        break;
    case 2:
        mesEscrito = "Março"
        qntsMes = 31
        break;
    case 3:
        mesEscrito = "Abril"
        qntsMes = 30
        break;
    case 4:
        mesEscrito = "Maio"
        qntsMes = 31
        break;
    case 5:
        mesEscrito = "Junho"
        qntsMes = 30
        break;
    case 6:
        mesEscrito = "Julho"
        qntsMes = 31
        break;
    case 7:
        mesEscrito = "Agosto"
        qntsMes = 31
        break;
    case 8:
        mesEscrito = "Setembro"
        qntsMes = 30
        break;
    case 9:
        mesEscrito = "Outubro"
        qntsMes = 31
        break;
    case 10:
        mesEscrito = "Novembro"
        qntsMes = 30
        break;
    case 11:
        mesEscrito = "Dezembro"
        qntsMes = 31
        break;
}

result.innerHTML = `<h1>${ano} ${mesEscrito}</h1>`

resultCalendario.innerHTML = ``
enviar({'metodo':'pegarTodoCalendario','dados1':mes+1,'dados2':ano})
pegaCalendario()
}

const pegaCalendario = async() =>{
    while (data2 == 'continue'){
        const response2 = await axios.get('http://localhost:8080/calendario/')
        data2 = response2.data
    }
    console.log(data2)
    vetorData = data2.split(';,')
    data2 = 'continue'
    console.log(vetorData)
    calendario2()
}
function calendario2(){
    diasMes = 1
    i = 0
    while (diasMes <= qntsMes) {
        var texto = ""
        if(diasMes == dia && mesFixo == mes){
            today()
        }
        else{ // médicos receberão um select apenas de SUAS CONSULTAS
            numero = parseInt(vetorData[i])
            for (indice = 0; indice<numero; indice++){
                texto += "."
            }
            resultCalendario.innerHTML += `<div id="calendario${diasMes}" class="dias"  onclick="dim(${diasMes})">${diasMes}<div><p>${texto}</p></div></div>`
        }
        i += 1
        diasMes += 1
    }
}

function esquerda() {
if(mes != 0){
    mes -= 1
}
else{
    mes = 11
    ano -= 1
}
diasMes = 1
fecharBox()
calendario()
}


function direita() {
if(mes != 0){
    mes -= 1
}
else{
    mes = 11
    ano -= 1
}
diasMes = 1
fecharBox()
calendario()
}

function direita() {
if(mes != 11){
    mes += 1
}
else{
    mes = 0
    ano += 1
}
diasMes = 1
fecharBox()
calendario()
}

function calcular_bissexto() {
if ((ano % 4 == 0 && ano % 100 != 0) || ano % 400 == 0) {
    return true
} else{
    return false
}

}

function fecharBox(){
    resultCalendario.innerHTML = ""
    aparece.innerHTML = ``
    calendario2()
    enviar({'metodo':'nulo','dados1':'nulo','dados2':'nulo'})
}

let dim = async (dia) =>{
    fecharBox()
    diaSelecionado = dia
    window.document.querySelector(`#calendario${dia}`).removeAttribute("onclick")
    enviar({'metodo':'espec','dados1':'nulo','dados2':'nulo'})
    while (data2 == 'continue'){
        const response2 = await axios.get('http://localhost:8080/calendario/')
        data2 = response2.data
    }
    console.log(data2)
    vetorEspec = data2.split(";,")
    data2 = 'continue'
    var elemento = `<div id="selects"><button id="bota" onclick="fecharBox()">X</button><table id="tConsulta"><tr id="trConsulta"><th id="thConsulta">
    <select class="dropBox">
    <option value="Especializações">Especializações</option>`
    for (let i = 0; i<vetorEspec.length-1; i++){
        elemento += `<option id="option${vetorEspec[i]}" value="${vetorEspec[i]}">${vetorEspec[i]}</option> `
    }
    elemento += "</th>"
    
    enviar({'metodo':'pegaMed','dados1':'nulo','dados2':'nulo'})
    while (data2 == 'continue'){
        const response2 = await axios.get('http://localhost:8080/calendario/')
        data2 = response2.data
    }
    console.log(data2)
    vetorMed = data2.split(";,")
    data2 = 'continue'

    for (var i=0;i<vetorMed.length-1;i++){
        elemento += `<th id="thConsulta">${vetorMed[i]}</th>`
    }
    elemento += `</tr>`
    enviar({'metodo':'preencherCalendario','dados1':dia,'dados2':(mes+1)+";,"+ano})
    while (data2 == 'continue'){
        const response2 = await axios.get('http://localhost:8080/calendario/')
        data2 = response2.data
    }
    console.log(data2)
    vetorPaciente = data2.split(";,")
    data2 = 'continue'
    
    for(let vezes = 0; vezes <= 23; vezes++){
        elemento += `<tr id="trConsulta"><th id="thConsulta">${vezes}:00</th>`
        for (var i=0;i<vetorMed.length-1;i++){
            var achou = false
            for (var index = 0; index < vetorPaciente.length-1;index+=3){
                if (parseInt(vetorPaciente[index]) == vezes && vetorMed[i] == vetorPaciente[index+1]){
                    elemento += `<td id="tdConsulta">${vetorPaciente[index + 2]}</td>`
                    achou = true
                }
            }
            if (achou == false){
                elemento += `<td id="tdConsulta"></td>`
            }
            
        }
        elemento += `</tr>`
    }
    aparece.innerHTML += `${elemento}</table></div>`
}

function today(){
    resultCalendario.innerHTML += `<div id="calendario" class="dias" id="${diasMes}"  onclick="dim()" style="color:blue;">${diasMes}<div>`
}
const teste2 = async() =>{
    const response2 = await axios.get('http://localhost:8080/login/')
    data2 = response2.data
    console.log(data2)
    if (data2 == true){
        data2 = 'continue'
        result = window.document.querySelector("#result");
        resultCalendario = window.document.querySelector("#resultCalendario");
        aparece = window.document.querySelector("#aparece");
        calendario()
    }
    else{
        botao = window.document.querySelector(".botao")
        botao.innerHTML = 'senha incorreta'
    }
}

function enviar(mensagem){
    axios.post("http://localhost:8080", mensagem)
    
}

setTimeout(teste2,500)