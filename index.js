axios.get('localhost:8000',params)
.then(res => {
    console.log(res)
})
.catch(err => {
    console.error(err); 
})