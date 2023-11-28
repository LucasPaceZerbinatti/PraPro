const { response } = require("express");

function buscar(){
    let opcoesDeCadastro = document.querySelectorAll(".opcoes");
    let result = window.document.querySelector("#result");

    // médico
    if(opcoesDeCadastro[0].checked){
        result.replaceChildren()

        let contador = 1;
        const url = "http://localhost:3000/getMedicos";
        axios.get(url)
            .then((response) => {
                const data = response.data;

                const tabela = document.createElement("table");
                tabela.innerHTML = "<tr> <th>CRM</th> <th>Nome</th> <th>Telefone</th> <th>Email</th> <th>Salário</th> <th>Senha</th> <th>Demitir</th> </tr>";

                for(let medicos of data){
                    const linha = document.createElement("tr");

                    if(contador % 2 != 0){
                        linha.innerHTML = `
                        <td class="cellImpar">${medicos.CRM}</td>
                        <td class="cellImpar">${medicos.nome}</td>
                        <td class="cellImpar">${medicos.telefone}</td>
                        <td class="cellImpar">${medicos.email}</td>
                        <td class="cellImpar salario"> <input type="number" value="${medicos.salario}" onchange="modificarSalarioMed('${medicos.CRM}', this)"> </td>
                        <td class="cellImpar">${medicos.senha}</td>
                        <td class="cellImpar"> <button onclick="demitirMed('${medicos.CRM}')">X </td>`;
                    }

                    else{
                        linha.innerHTML = `
                        <td class="cellPar">${medicos.CRM}</td>
                        <td class="cellPar">${medicos.nome}</td>
                        <td class="cellPar">${medicos.telefone}</td>
                        <td class="cellPar">${medicos.email}</td>
                        <td class="cellPar salario"> <input type="number" value="${medicos.salario}" onchange="modificarSalarioMed('${medicos.CRM}', this)"> </td>
                        <td class="cellPar">${medicos.senha}</td>
                        <td class="cellPar"> <button onclick="demitirMed('${medicos.CRM}')">X </td>`;
                    }

                    contador += 1;
                    tabela.appendChild(linha);
                }

                result.appendChild(tabela);
            })
            
            .catch((err) => {
                console.log(err);
            });
    }

    // atendente
    else if(opcoesDeCadastro[1].checked){
        result.replaceChildren()

        let contador = 1;
        const url = "http://localhost:3000/getAtendentes";
        axios.get(url)
            .then((response) => {
                const data = response.data;

                const tabela = document.createElement("table");
                tabela.innerHTML = "<tr> <th>CPF</th> <th>Nome</th> <th>Email</th> <th>Telefone</th> <th>Salário</th> <th>Senha</th> <th>Demitir</th> </tr>";

                for(let atendentes of data){
                    const linha = document.createElement("tr");

                    if(contador % 2 != 0){
                        linha.innerHTML = `
                        <td class="cellImpar">${atendentes.CPF}</td>
                        <td class="cellImpar">${atendentes.nome}</td>
                        <td class="cellImpar">${atendentes.emailCadastrado}</td>
                        <td class="cellImpar">${atendentes.telefone}</td>
                        <td class="cellImpar salario"> <input type="number" value="${atendentes.salario}" onchange="modificarSalarioAte('${atendentes.CPF}', this)"> </td>
                        <td class="cellImpar">${atendentes.senha}</td>
                        <td class="cellImpar"> <button onclick="demitirAte('${atendentes.CPF}')">X </td>`;
                    }

                    else{
                        linha.innerHTML = `
                        <td class="cellPar">${atendentes.CPF}</td>
                        <td class="cellPar">${atendentes.nome}</td>
                        <td class="cellPar">${atendentes.emailCadastrado}</td>
                        <td class="cellPar">${atendentes.telefone}</td>
                        <td class="cellPar salario"> <input type="number" value="${atendentes.salario}" onchange="modificarSalarioAte('${atendentes.CPF}', this)"> </td>
                        <td class="cellPar">${atendentes.senha}</td>
                        <td class="cellPar"> <button onclick="demitirAte('${atendentes.CPF}')">X </td>`;
                    }

                    contador += 1;
                    tabela.appendChild(linha);
                }

                result.appendChild(tabela);
            })
            
            .catch((err) => {
                console.log(err);
            });
    }

    // não marcou nada
    else{
        alert("É preciso escolher uma opção para buscar");
    }
}

function demitirMed(CRM) {
    axios.delete(`http://localhost:3000/deleteMedicosDemitido?CRM=${parseInt(CRM)}`)


    .then(response => {
        if (response.status === 200) {
            console.log('Inserção bem-sucedida:', response.data.message);
            buscar()
          } 
          
          else {
            console.error('Erro na solicitação:', response.data.error);
          }
    })

    .catch(error => {
        console.error('Erro na solicitação:', error);
    })
}

function demitirAte(CPF){
    axios.delete(`http://localhost:3000/deleteAtendenteDemitido?CPF=${String(CPF)}`)

    .then(response => {
        if (response.status === 200) {
            console.log('Inserção bem-sucedida:', response.data.message);
            buscar()
          } 
          
          else {
            console.error('Erro na solicitação:', response.data.error);
          }
    })

    .catch(error => {
        console.error('Erro na solicitação:', error);
    })
}


function modificarSalarioMed(CRM, input){
    axios.put('http://localhost:3000/putMedicoSalario', {
        CRM: CRM,
        salario: input.value
    }, {
        headers: {
          'Content-Type': 'application/json'
        }
    })

    .then(response => {
        if (response.status === 200) {
            console.log('Inserção bem-sucedida:', response.data.message);
          } 
          
        else {
            console.error('Erro na solicitação:', response.data.error);
        }
    })

    .catch(error => {
        console.error('Erro na solicitação:', error);
    })

    buscar()
}

function modificarSalarioAte(CPF, input){
    axios.put('http://localhost:3000/putAtendenteSalario', {
        CPF: CPF,
        salario: input.value
    }, {
        headers: {
          'Content-Type': 'application/json'
        }
    })

    .then(response => {
        if (response.status === 200) {
            console.log('Inserção bem-sucedida:', response.data.message);
          } 
          
          else {
            console.error('Erro na solicitação:', response.data.error);
          }
    })

    .catch(error => {
        console.error('Erro na solicitação:', error);
    })

    buscar()
}