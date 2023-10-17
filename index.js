const express = require('express')

const app = express()

app.get('/',(req, res) => {
    res.send('Olá mundo2')
}
)

app.listen(8080, () => {
    let data = new Date()
    console.log(`Servidor Node iniciado em ${data}`)
})
