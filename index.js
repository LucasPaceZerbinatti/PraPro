function Pegar(){
axios.get('http://localhost:8080')
.then(res => {
    
    console.log(res)
    let result = window.document.querySelector("#result")
    result.innerHTML = res.data
})
.catch(err => {
    console.error(err); 
})
}


function Enviar(mensagem){
    axios.post("http://localhost:8080", mensagem)

      .then((response) => {
        console.log(response);
      })
     
}
