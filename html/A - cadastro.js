function mudarPagina(){
    let opcoesDeCadastro = document.querySelectorAll(".opcoes");
    let result = window.document.querySelector("#result");


    // Médico marcado
    if (opcoesDeCadastro[0].checked){        
        result.replaceChildren()
        const medicoCRM     = document.createElement("p");
        medicoCRM.innerHTML = "CRM:" + "<br>" + "<input type='Number' class='input' min='1' id='CRM'>" + "<br>";

        const medicoNome     = document.createElement("p");
        medicoNome.innerHTML = "Nome: " + "<br>" + "<input type='text' class='input' id='nome'>" + "<br>";

        const medicoSobrenome     = document.createElement("p");
        medicoSobrenome.innerHTML = "Sobrenome:" + "<br>" + "<input type='text' class='input' id='sobrenome'>"   + "<br>";

        const medicoTelefone     = document.createElement("p");
        medicoTelefone.innerHTML = "Telefone:"  + "<br>" + "<input type='text' class='input' id='telefone'>" + "<br>";

        const medicoEmail     = document.createElement("p");
        medicoEmail.innerHTML = "E-Mail: " + "<br>" + "<input type='text' class='input' id='email'>" + "<br>"
        
        const medicoSenha     = document.createElement("p");
        medicoSenha.innerHTML = "Senha:"     + "<br>" + "<input type='text' class='input' id='senha'>";

        const medicoEspecializacao    = document.createElement("p");
        medicoEspecializacao.innerHTML = "Especialização: " + "<br>" + "<input type='text' class='input' id='espec'>" + "<br>"
        
        result.appendChild(medicoCRM);
        result.appendChild(medicoNome);
        result.appendChild(medicoSobrenome);
        result.appendChild(medicoTelefone);
        result.appendChild(medicoEmail);
        result.appendChild(medicoSenha);
        result.appendChild(medicoEspecializacao);
    }
    // Paciente marcado
    else if (opcoesDeCadastro[1].checked){
        result.replaceChildren()
        const pacienteCPF     = document.createElement("p");
        pacienteCPF.innerHTML = "CPF:" + "<br>" + "<input type='text' class='input' min='1' id='CPF'>" + "<br>";

        const pacienteNome     = document.createElement("p");
        pacienteNome.innerHTML = "Nome: " + "<br>" + "<input type='text' class='input' id='nome'>" + "<br>";

        const pacienteSobrenome     = document.createElement("p");
        pacienteSobrenome.innerHTML = "Sobrenome:" + "<br>" + "<input type='text' class='input' id='sobrenome'>"   + "<br>";

        const pacienteDataNasc      = document.createElement("p");
        pacienteDataNasc.innerHTML = "Data de Nascimento:"     + "<br>" + "<input type='date' class='input' id='dataNasci'>" + "<br>";

        const pacienteTelefone     = document.createElement("p");
        pacienteTelefone.innerHTML = "Telefone:"  + "<br>" + "<input type='text' class='input' id='telefone'>" + "<br>";

        const pacienteEmail     = document.createElement("p");
        pacienteEmail.innerHTML = "E-Mail: " + "<br>" + "<input type='text' class='input' id='email'>" + "<br>";

        const pacienteEstado     = document.createElement("p");
        pacienteEstado.innerHTML = "Estado: " + "<br>" + "<select class='input' id='estado'>" + "<option>Selecione seu Estado</option>" + 
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
        atendenteNome.innerHTML = "Nome: " + "<br>" + "<input type='text' class='input' id='nome'>" + "<br>";

        const atendenteSobrenome     = document.createElement("p");
        atendenteSobrenome.innerHTML = "Sobrenome:" + "<br>" + "<input type='text' class='input' id='sobrenome'>"   + "<br>";

        const atendenteCPF  = document.createElement("p");
        atendenteCPF.innerHTML = "CPF" + "<br>" + "<input type='text' class='input' id='CPF' min='1'>"   + "<br>";

        const atendenteTelefone     = document.createElement("p");
        atendenteTelefone.innerHTML = "Telefone:"  + "<br>" + "<input type='text' class='input' id='telefone'>" + "<br>";

        const atendenteEmail     = document.createElement("p");
        atendenteEmail.innerHTML = "E-Mail: " + "<br>" + "<input type='text' class='input' id='email'>" + "<br>"
        
        const atendenteSenha     = document.createElement("p");
        atendenteSenha.innerHTML = "Senha:"     + "<br>" + "<input type='text' class='input' id='senha'>";

        result.appendChild(atendenteCPF);
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

function cadastrar(){
    let opcoesDeCadastro = document.querySelectorAll(".opcoes");

    if(opcoesDeCadastro[0].checked){
      inserirMedico();
    }

    else if(opcoesDeCadastro[1].checked){
        inserirPaciente();
    }

    else if(opcoesDeCadastro[2].checked){
        inserirAtendente();
    }
}

function inserirMedico(){
    const CRM       = Number(document.getElementById('CRM').value);
    const nome      = document.getElementById('nome').value;
    const sobrenome = document.getElementById('sobrenome').value;
    const telefone  = document.getElementById('telefone').value;
    const email     = document.getElementById('email').value;
    const senha     = document.getElementById('senha').value;
    const espec     = document.getElementById('espec').value;
  
    if(nome.trim() !== '' | sobrenome.trim() !== '' | telefone.trim() !== '' | email.trim() !== '' | senha.trim() !== '' | espec.trim() !== ''){
      axios.post('http://localhost:3000/postMedico', {
        CRM: CRM,
        nome: nome,
        sobrenome: sobrenome,
        telefone: telefone,
        email: email,
        senha: senha,
        espec: espec
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
    }
  
    else{
      console.log('O campo de entrada está vazio.');
    }
  }
  
  function inserirAtendente(){
    const CPF       = document.getElementById('CPF').value;
    const nome      = document.getElementById('nome').value;
    const sobrenome = document.getElementById('sobrenome').value;
    const email     = document.getElementById('email').value;
    const telefone  = document.getElementById('telefone').value;
    const senha     = document.getElementById('senha').value;
  
    if(CPF.trim() !== '' | nome.trim() !== '' | sobrenome.trim() !== '' | telefone.trim() !== '' | email.trim() !== '' | senha.trim() !== ''){
      axios.post('http://localhost:3000/postAtendente', {
        CPF: CPF,
        nome: nome,
        sobrenome: sobrenome,
        email: email,
        telefone: telefone,
        senha: senha
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
    }
  
    else{
      console.log('O campo de entrada está vazio.');
    }
  }
  
  function inserirPaciente(){
    const CPF       = document.getElementById('CPF').value;
    const nome      = document.getElementById('nome').value;
    const sobrenome = document.getElementById('sobrenome').value;
    const dataNasci = document.getElementById('dataNasci').value;
    const telefone  = document.getElementById('telefone').value;
    const email     = document.getElementById('email').value;
    const estado    = document.getElementById('estado').value;
  
    if(CPF.trim() !== '' | nome.trim() !== '' | sobrenome.trim() !== '' | telefone.trim() !== '' | email.trim() !== '' | estado.trim() !== ''){
      axios.post('http://localhost:3000/postPaciente', {
        CPF: CPF,
        nome: nome,
        sobrenome: sobrenome,
        email: email,
        telefone: telefone,
        dataNasci: dataNasci,
        estado: estado
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
    }
  
    else{
      console.log('O campo de entrada está vazio.');
    }
  }