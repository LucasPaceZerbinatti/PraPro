var irineu
function mudarPagina(){
    let opcoesDeCadastro = document.querySelectorAll(".opcoes");
    let result = window.document.querySelector("#result");

    // Médico marcado
    if (opcoesDeCadastro[0].checked){        
        result.replaceChildren()
        const medicoEmail     = document.createElement("p");
        medicoEmail.innerHTML = "E-Mail: " + "<br>" + "<input type='text' class='input' id='email'>" + "<br>"
        
        const medicoSenha     = document.createElement("p");
        medicoSenha.innerHTML = "Senha:"     + "<br>" + "<input type='text' class='input' id='senha'>";

        result.appendChild(medicoEmail);
        result.appendChild(medicoSenha);
    } 
    
    // Atendente marcado
    else if (opcoesDeCadastro[1].checked){
        result.replaceChildren()
        const atendenteEmail     = document.createElement("p");
        atendenteEmail.innerHTML = "E-Mail: " + "<br>" + "<input type='text' class='input' id='email'>" + "<br>"

        const atendenteSenha     = document.createElement("p");
        atendenteSenha.innerHTML = "Senha:"     + "<br>" + "<input type='text' class='input' id='senha'>";

        result.appendChild(atendenteEmail);
        result.appendChild(atendenteSenha);
    }

    // Não foi marcado nenhuma opção
    else{
        ErrorEvent("É necessário marcar a opção de Login!!!")
    }
}
function logar(param){
    if (param != " "){
        enviar({'metodo':'logar','dados1':window.document.querySelector('#email').value,'dados2':window.document.querySelector('#senha').value})
        
    }
       
    
}
logar(" ")

function getResultado(){
    pegar()
    console.log(irineu)
}

function pegar(){
    axios.get('http://localhost:8080')
    .then(res => {
        console.log(res)
        irineu = res.data
        return irineu
    })
    .catch(err => {
        console.error(err); 
        return err
    })
    }
    
    
    function enviar(mensagem){
        axios.post("http://localhost:8080", mensagem)
        
          .then((response) => {
            console.log(response);
          })
         
    }
    
    