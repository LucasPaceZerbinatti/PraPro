var data
var irineu
var achou = false
var email
var senha
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
const logar = () => {
        enviar({'metodo':'logar','dados1':window.document.querySelector('#email').value,'dados2':window.document.querySelector('#senha').value})
    }
    
    function enviar(mensagem){
        axios.post("http://localhost:8080", mensagem)
        
    }
    
    