const express = require('express');
const app = express();
const cors = require('cors'); // Importe o pacote cors

const route = require('./routes/route');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Configure o middleware cors antes de definir rotas ou outros middlewares
app.use(cors()); // Isso permite solicitações de qualquer origem

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', route);

app.listen(3000, () => {
    console.log("TI220 Iniciado com Sucesso");
})
