function mudarPagina(){
    let opcoesDeCadastro = document.querySelectorAll(".opcoes");
    let result = window.document.querySelector("#result");


    // Médico marcado
    if (opcoesDeCadastro[0].checked){        
        result.replaceChildren()
        const medicoCRM     = document.createElement("p");
        medicoCRM.innerHTML = "CRM:" + "<br>" + "<input type='Number' class='input'>" + "<br>";

        const medicoNome     = document.createElement("p");
        medicoNome.innerHTML = "Nome: " + "<br>" + "<input type='text' class='input'>" + "<br>";

        const medicoSobrenome     = document.createElement("p");
        medicoSobrenome.innerHTML = "Sobrenome:" + "<br>" + "<input type='text' class='input'>"   + "<br>";

        const medicoTelefone     = document.createElement("p");
        medicoTelefone.innerHTML = "Telefone:"  + "<br>" + "<input type='Number' class='input'>" + "<br>";

        const medicoEmail     = document.createElement("p");
        medicoEmail.innerHTML = "E-Mail: " + "<br>" + "<input type='text' class='input'>" + "<br>"
        
        const medicoSenha     = document.createElement("p");
        medicoSenha.innerHTML = "Senha:"     + "<br>" + "<input type='text' class='input'>";
        
        result.appendChild(medicoCRM);
        result.appendChild(medicoNome);
        result.appendChild(medicoSobrenome);
        result.appendChild(medicoTelefone);
        result.appendChild(medicoEmail);
        result.appendChild(medicoSenha);
    }
    // Paciente marcado
    else if (opcoesDeCadastro[1].checked){
        result.replaceChildren()
        const pacienteCPF     = document.createElement("p");
        pacienteCPF.innerHTML = "CPF:" + "<br>" + "<input type='Number' class='input'>" + "<br>";

        const pacienteNome     = document.createElement("p");
        pacienteNome.innerHTML = "Nome: " + "<br>" + "<input type='text' class='input'>" + "<br>";

        const pacienteSobrenome     = document.createElement("p");
        pacienteSobrenome.innerHTML = "Sobrenome:" + "<br>" + "<input type='text' class='input'>"   + "<br>";

        const pacienteDataNasc      = document.createElement("p");
        pacienteDataNasc.innerHTML = "Data de Nascimento:"     + "<br>" + "<input type='date' class='input'>" + "<br>";

        const pacienteTelefone     = document.createElement("p");
        pacienteTelefone.innerHTML = "Telefone:"  + "<br>" + "<input type='Number' class='input'>" + "<br>";

        const pacienteEmail     = document.createElement("p");
        pacienteEmail.innerHTML = "E-Mail: " + "<br>" + "<input type='text' class='input'>" + "<br>"

        const pacienteEstado     = document.createElement("p");
        pacienteEmail.innerHTML = "Estado: " + "<br>" + "<select class='input'>" + "<option>Selecione seu Estado</option>" + 
        "<option>AC</option>" + "<option>AL</option>" + "<option>AP</option>" + "<option>AM</option>" + "<option>BA</option>" + "<option>CE</option>"
        + "<option>ES</option>"  + "<option>GO</option>"  + "<option>MA</option>"  + "<option>MT</option>"  + "<option>MS</option>"  + "<option>MG</option>"
        + "<option>PA</option>"  + "<option>PB</option>"  + "<option>PR</option>"  + "<option>PE</option>"  + "<option>PI</option>"  + "<option>RJ</option>"
        + "<option>RN</option>" + "<option>RS</option>"  + "<option>RO</option>"  + "<option>RR</option>"  + "<option>SC</option>"  + "<option>SP</option>"
        + "<option>SE</option>"  + "<option>TO</option>"  + "<option>DF</option>"  + "</select>"  + "<br>";
        
        result.appendChild(pacienteCPF);
        result.appendChild(pacienteNome);
        result.appendChild(pacienteSobrenome);
        result.appendChild(pacienteDataNasc);
        result.appendChild(pacienteTelefone);
        result.appendChild(pacienteEmail);
        result.appendChild(pacienteEstado);
    }

    // Atendente marcado
    else if (opcoesDeCadastro[2].checked){
        result.replaceChildren()
        const atendenteNome     = document.createElement("p");
        atendenteNome.innerHTML = "Nome: " + "<br>" + "<input type='text' class='input'>" + "<br>";

        const atendenteSobrenome     = document.createElement("p");
        atendenteSobrenome.innerHTML = "Sobrenome:" + "<br>" + "<input type='text' class='input'>"   + "<br>";

        const atendenteTelefone     = document.createElement("p");
        atendenteTelefone.innerHTML = "Telefone:"  + "<br>" + "<input type='Number' class='input'>" + "<br>";

        const atendenteEmail     = document.createElement("p");
        atendenteEmail.innerHTML = "E-Mail: " + "<br>" + "<input type='text' class='input'>" + "<br>"
        
        const atendenteSenha     = document.createElement("p");
        atendenteSenha.innerHTML = "Senha:"     + "<br>" + "<input type='text' class='input'>";

        result.appendChild(atendenteNome);
        result.appendChild(atendenteSobrenome);
        result.appendChild(atendenteTelefone);
        result.appendChild(atendenteEmail);
        result.appendChild(atendenteSenha);
    }

    // Não foi marcado nenhuma opção
    else{
        ErrorEvent("É necessário marcar a opção de cadastro!!!")
    }
}
