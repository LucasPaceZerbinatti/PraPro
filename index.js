
axios.get('http://localhost:8080')
.then(res => {
    console.log(res)
    let result = window.document.querySelector("#result")
    result.innerHTML = res.data
})
.catch(err => {
    console.error(err); 
})
