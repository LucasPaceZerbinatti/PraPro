
    var result = window.document.querySelector("#result");
    var resultCalendario = window.document.querySelector("#resultCalendario");
    var aparece = window.document.querySelector("#aparece");
    var listaMedicamentos = window.document.querySelector("#medicamentos")
    var vetorData
    var i
    var medLista
    var vetorConsulta
    var idConsulta
    var diaSelecionado
    const data = new Date()
    var data2
    const dia = data.getDate()
    const mesFixo = data.getMonth()
    let mes = data.getMonth()
    let ano = data.getFullYear()
    var mesEscrito
    var diasMes




    

function calendario() { 
    console.log("calendario")
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
    console.log("saiu")
    vetorConsulta = data2.split(";,")
    data2 = 'continue'
    console.log(vetorConsulta)
    dim2()

}
function dim(dia){
    diaSelecionado = dia
    fecharBox()
    window.document.querySelector(`#calendario${dia}`).removeAttribute("onclick")
    enviar({'metodo':'consultaCalendario','dados1':dia+";,"+mes,'dados2':ano})
    data2 = 'continue'
    console.log(dia)
    pegaConsultas()
}
function dim2(){
    var elemento = `<table id="tConsulta"><tr id="trConsulta"><th id="thConsulta">INICIO</th><th id="thConsulta">PACIENTE</th><th id="thConsulta">OBSERVAÇÕES</th><th id="thConsulta">MEDICAMENTOS</th><th id="thConsulta">CONCLUÍDO</th>`
    for (i = 0; i<vetorConsulta.length-1; i+=6){
        if (vetorConsulta[i+4] == 'finalizada'){
            var checkbox = "<input id='check"+vetorConsulta[i+5]+"' type='checkbox' onchange='estado("+vetorConsulta[i+5]+")' checked></input>"
        }
        else{
            var checkbox = "<input id='check"+vetorConsulta[i+5]+"' type='checkbox' onchange='estado("+vetorConsulta[i+5]+")' ></input>"
        }
        if (vetorConsulta[i+3] == 'null'){
            vetorConsulta[i+3] = " "
        }
        elemento += `<tr id="trConsulta"><td id="tdConsulta">${vetorConsulta[i]}</td><td id="tdConsulta">${vetorConsulta[i+1]}</td><td id="tdConsulta">${vetorConsulta[i+2]}</td><td id="tdConsulta" class="tdMed${vetorConsulta[i+5]}" ondblclick="medicamentos('${vetorConsulta[i+3]}', '${vetorConsulta[i+5]}')">${vetorConsulta[i+3]}</td><td id="tdConsulta">${checkbox}</td>`
    }
   // aparece.innerHTML = `<textarea id="areatexto" cols="50" rows="20" readonly></textarea>`
    aparece.innerHTML = elemento
    aparece.innerHTML += `<button id="bota" onclick="fecharBox()">X</button>`
}

function medicamentos(medicamento, id){
    idConsulta = id
    let num = 0
    console.log(medicamento)
    console.log(id)
    var listaMedicamentos = window.document.querySelector("#medicamentos")
    medLista = medicamento.split('|')
    var elemento = `<table id="tMed"><tr id="trMed"><th id="thMed">MEDICAMENTOS <button onclick="addMed()">+</button><button onclick='fecharMed()'>x</button></th></tr>`
    for (let index = 0; index < medLista.length; index++) {
        if (medLista[index] != " "){
            elemento += `<tr id="trMed"><th id="thMed"><input id="inp${num}" type='text' value='${medLista[num]}'</input><button onclick="subMed(${num})">-</button></th></tr>`
            
        }  
        else {
            num--
        }
        num++
}
    listaMedicamentos.innerHTML = elemento
}

function addMed(){
        var medicamento = [];
        var achou = false;
        console.log(medicamento)
        var da = true
        var elemento = `<table id="tMed"><tr id="trMed"><th id="thMed">MEDICAMENTOS <button onclick="addMed()">+</button><button onclick='fecharMed()'>x</button></th></tr>`
        var listaMedicamentos = window.document.querySelector("#medicamentos")
        for (let index = 0; index < medLista.length; index++) {
            try {
                medicamento.push(window.document.querySelector("#inp"+index).value)
            } catch (error) {
                da = false
                continue
                
            }
           
            if (medicamento[index] == '' || medicamento[index] == " "){
                achou = true
            }
            elemento += `<tr id="trMed"><th id="thMed"><input id="inp${index}" type='text' value='${medicamento[index]}'</input><button onclick="subMed(${index})">-</button></th></tr>`
    }
    if (achou == false){
        console.log(medLista)
        if (da == true){
            elemento += `<tr id="trMed"><th id="thMed"><input id="inp${medLista.length}" type='text'</input><button onclick="subMed(${medLista.length})">-</button></th></tr>`
            medLista.push('')   
        }
        else{
            elemento += `<tr id="trMed"><th id="thMed"><input id="inp${medLista.length-1}" type='text'</input><button onclick="subMed(${medLista.length-1})">-</button></th></tr>`
        }
        listaMedicamentos.innerHTML = elemento
        }

    }
 
function subMed(id){
    var medicamento = []
    console.log(id)
    var num = -1
    var listaMedicamentos = window.document.querySelector("#medicamentos")
    var elemento = `<table id="tMed"><tr id="trMed"><th id="thMed">MEDICAMENTOS <button onclick="addMed()">+</button><button onclick='fecharMed()'>x</button></th></tr>`
    for (let index = 0; index < medLista.length; index++) {
        medicamento.push(window.document.querySelector("#inp"+index).value)

}
    medicamento.splice(id, 1)
    for(let index = 0; index < medicamento.length; index++){
        elemento += `<tr id="trMed"><th id="thMed"><input id="inp${index}" type='text' value='${medicamento[index]}'</input><button onclick="subMed(${index})">-</button></th></tr>`
    }
    listaMedicamentos.innerHTML = elemento
    console.log(medicamento)
    medLista.splice(id, 1)
    console.log(medLista)
}

function fecharMed(){
    var totalMedicamentos = ""
    for (let index = 0; index < medLista.length; index++){
        var medicamento = window.document.querySelector("#inp"+index).value
        if (medicamento != ''){
            totalMedicamentos += medicamento+"|"
        }
        
    }
    totalMedicamentos = totalMedicamentos.substring(0,totalMedicamentos.length - 1)
    console.log(totalMedicamentos)
    var listaMedicamentos = window.document.querySelector("#medicamentos")
    if (totalMedicamentos != ""){
        enviar({"metodo":"addMedicamento","dados1":idConsulta, "dados2":totalMedicamentos})
    }
    else {
        enviar({"metodo":"addMedicamento","dados1":idConsulta, "dados2":' '})
    }
    
    listaMedicamentos.innerHTML = ""
    window.document.querySelector(".tdMed"+idConsulta).innerHTML = totalMedicamentos;
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
    resultCalendario.innerHTML = ""
    aparece.innerHTML = ``
    calendario2()
    enviar({'metodo':'nulo','dados1':'nulo','dados2':'nulo'})
}

function today(){
    var texto = ""
    numero = parseInt(vetorData[i])
    for (indice = 0; indice<numero; indice++){
        texto += "."
    }
    resultCalendario.innerHTML += `<div id="calendario${diasMes}" class="dias" style="color:blue;" onclick="dim(${diasMes})">${diasMes}<div><p>${texto}</p>`}




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

setTimeout(teste2,500)