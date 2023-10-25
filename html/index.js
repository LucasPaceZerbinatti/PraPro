
function pegar(){
axios.get('http://localhost:8080')
.then(res => {
    console.log(res)
    return res.data
})
.catch(err => {
    console.error(err); 
})
}


function enviar(mensagem){
    axios.post("http://localhost:8080", mensagem)

      .then((response) => {
        console.log(response);
      })
     
}

