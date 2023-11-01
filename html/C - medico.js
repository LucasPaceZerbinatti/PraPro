
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

    result.innerHTML = `<h1>${ano} ${mesEscrito}</h1>`

    resultCalendario.innerHTML = ``
    enviar({'metodo':'calendario','dados1':mes+1,'dados2':ano})
    setTimeout(pegaCalendario, 500)

}

function calendario2(){
    i = 0
    while (diasMes <= qntsMes) {
        if(diasMes == dia && mesFixo == mes){
            today()
        }

        else{ // médicos receberão um select apenas de SUAS CONSULTAS
            resultCalendario.innerHTML += `<div id="calendario" class="dias" id="${diasMes}"  onclick="dim()">${diasMes} - ${vetorData[i]}<div>`
        }
        i += 1
        diasMes += 1
    }
}
const pegaCalendario = async() =>{
    const response2 = await axios.get('http://localhost:8080/resultado/')
    data2 = response2.data
    console.log(data2)
    vetorData = data2.split(',')
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
    const response2 = await axios.get('http://localhost:8080/resultado/')
    data2 = response2.data
    vetorConsulta = data2.split(",")
    dim2()

}
function dim(){
    enviar({'metodo':'consultaCalendario','dados1':dia+","+mes,'dados2':ano})
    setTimeout(pegaConsultas,500)

}
function dim2(){
    aparece.innerHTML = `<textarea id="areatexto" cols="50" rows="20" readonly>${vetorConsulta[0]}</textarea>`
    aparece.innerHTML += `<button id="bota" onclick="fecharBox()">X</button>`
}
function fecharBox(){
    aparece.innerHTML = ``
}

function today(){
    resultCalendario.innerHTML += `<div id="calendario" class="dias" id="${diasMes}"  onclick="dim()" style="color:blue;">${diasMes} - ${vetorData[i]}<div>`
}

const teste = async() => {
    const response = await axios.get('http://localhost:8080')
    data1 = response.data
    console.log(data1.senha)
    enviar({'metodo':'logar','dados1':data1.email,'dados2':data1.senha})
    setTimeout(teste2,500)


}


function enviar(mensagem){
    axios.post("http://localhost:8080", mensagem)
    
}

const teste2 = async() =>{
    const response2 = await axios.get('http://localhost:8080/resultado/')
    data2 = response2.data
    console.log(data2)
    if (data2 == true){
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

teste()