
    let result = window.document.querySelector("#result");
    let resultCalendario = window.document.querySelector("#resultCalendario");
    let aparece = window.document.querySelector("#aparece");
    var vetorData
    var i
    var vetorConsulta

    const data = new Date()

    const dia = data.getDate()
    const mesFixo = data.getMonth()
    let mes = data.getMonth()
    let ano = data.getFullYear()
    var mesEscrito
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

    result.innerHTML = `<h1">${ano} ${mesEscrito}</h1>`

    resultCalendario.innerHTML = ``
    enviar({'metodo':'calendario','dados1':mes+1,'dados2':ano})
    pegaCalendario()

}

function calendario2(){
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
            resultCalendario.innerHTML += `<div id="calendario" class="dias" id="${diasMes}"  onclick="dim(${diasMes})">${diasMes}<div><p>${texto}</p>`
        }
        i += 1
        diasMes += 1
    }
}
const pegaCalendario = async() =>{
    while (data2 == 'continue'){
        const response2 = await axios.get('http://localhost:8080/calendario/')
        data2 = response2.data
    }
    console.log(data2)
    vetorData = data2.split(',')
    data2 = 'continue'
    console.log(vetorData)
    calendario2()
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

const pegaConsultas = async() =>{
    while (data2 == 'continue'){
        const response2 = await axios.get('http://localhost:8080/calendario/')
        data2 = response2.data
    }
    
    vetorConsulta = data2.split(",")
    data2 = 'continue'
    console.log(vetorConsulta)
    dim2()

}
function dim(dia){
    enviar({'metodo':'consultaCalendario','dados1':dia+","+mes,'dados2':ano})
    data2 = 'continue'
    console.log(dia)
    pegaConsultas()
}
function dim2(){
    var elemento = `<table><tr><th>INICIO</th><th>PACIENTE</th><th>OBSERVAÇÕES</th><th>MEDICAMENTOS</th><th>CONCLUÍDO</th>`
    for (i = 0; i<vetorConsulta.length-1; i+=6){
        if (vetorConsulta[i+4] == 'finalizada'){
            var checkbox = "<input id='check"+vetorConsulta[i+5]+"' type='checkbox' onchange='estado("+vetorConsulta[i+5]+")' checked></input>"
        }
        else{
            var checkbox = "<input id='check"+vetorConsulta[i+5]+"' type='checkbox' onchange='estado("+vetorConsulta[i+5]+")' ></input>"
        }
        elemento += `<tr><td>${vetorConsulta[i]}</td><td>${vetorConsulta[i+1]}</td><td>${vetorConsulta[i+2]}</td><td ondblclick="medicamentos('${vetorConsulta[i+3]}')">${vetorConsulta[i+3]}</td><td>${checkbox}</td>`
    }
   // aparece.innerHTML = `<textarea id="areatexto" cols="50" rows="20" readonly></textarea>`
    aparece.innerHTML = elemento
    aparece.innerHTML += `<button id="bota" onclick="fecharBox()">X</button>`
}

function medicamentos(medicamento){
    window.document.querySelector("#medicamentos").innerHTML = `<textarea cols="20" rows="30">${medicamento}</textarea>`
}

function estado(id){
    console.log(id)
    if (window.document.querySelector("#check"+id).checked == true){
        var num = 1
    } else{
        var num = 0
    }
    enviar({'metodo':'enviaEstado','dados1':id,'dados2':num})    
}
function fecharBox(){
    aparece.innerHTML = ``
    enviar({'metodo':'nulo','dados1':'nulo','dados2':'nulo'})
}

function today(){
    var texto = ""
    numero = parseInt(vetorData[i])
    for (indice = 0; indice<numero; indice++){
        texto += "."
    }
    resultCalendario.innerHTML += `<div id="calendario" class="dias" id="${diasMes}" style="color:blue;" onclick="dim(${diasMes})">${diasMes}<div><p>${texto}</p>`}




function enviar(mensagem){
    axios.post("http://localhost:8080", mensagem)
    
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

teste2()