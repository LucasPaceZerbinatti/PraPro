
    let result = window.document.querySelector("#result");
    let resultCalendario = window.document.querySelector("#resultCalendario");
    let aparece = window.document.querySelector("#aparece");

    const data = new Date()

    const dia = data.getDate()
    const mesFixo = data.getMonth()
    let mes = data.getMonth()
    let ano = data.getFullYear()
    var mesEscrito
    diasMes = 1

    calendario()

    

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
    while (diasMes <= qntsMes) {
        if(diasMes == dia && mesFixo == mes){
            today()
        }

        else{ // médicos receberão um select apenas de SUAS CONSULTAS
            resultCalendario.innerHTML += `<div id="calendario" class="dias" id="${diasMes}"  onclick="dim()">${diasMes}<div>`
        }
        diasMes += 1
    }
}

function esquerda() {
    if(mes != 1){
        mes -= 1
    }
    else{
        mes = 12
        ano -= 1
    }
    diasMes = 1
    calendario()
}

function direita() {
    if(mes != 12){
        mes += 1
    }
    else{
        mes = 1
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

function dim(){
    let mensagem = "Julio Pinto 16/04/2023 16:30\n";

    aparece.innerHTML = `<textarea id="areatexto" cols="50" rows="20" readonly>${mensagem}${mensagem}</textarea>`
    aparece.innerHTML += `<button id="bota" onclick="fecharBox()">X</button>`
}

function fecharBox(){
    aparece.innerHTML = ``
}

function today(){
    resultCalendario.innerHTML += `<div id="calendario" class="dias" id="${diasMes}"  onclick="dim()" style="color:blue;">${diasMes}<div>`
}