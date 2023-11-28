const { PrismaClient } = require('@prisma/client');
const res = require('express/lib/response');
const prisma = new PrismaClient();

exports.getRaiz = ("/",(req,res) => {
    res.send('<h1>Node com SQLServer</h1>');
})

///////////////////////////////////////////////////////////// GET /////////////////////////////////////////////////////////////
exports.getMedicos = ("/getMedicos", async(req, res) => {
    const result = await prisma.$queryRaw`SELECT * FROM V_Doctor`;
    res.json(result);
})

exports.getAtendentes = ("/getAtendentes", async(req, res) => {
    const result = await prisma.$queryRaw`SELECT * FROM V_Attendant`;
    res.json(result);
})

///////////////////////////////////////////////////////////// POST /////////////////////////////////////////////////////////////
/* INSERE UM MÉDICO NO BD */
exports.postMedico = ("/postMedico", async(req, res) => {
    const CRM       = parseInt(req.body.CRM);
    const nome      = String(req.body.nome);
    const sobrenome = String(req.body.sobrenome);
    const telefone  = String(req.body.telefone);
    const email     = String(req.body.email);
    const senha     = String(req.body.senha);
    const nomeEspec = String(req.body.espec);

    try{
        const result1 = await prisma.$queryRaw`EXEC POST_Espec ${nomeEspec}`;
        const result2 = await prisma.$queryRaw`EXEC POST_Medico ${CRM}, ${nome}, ${sobrenome}, ${email}, ${telefone}`;
        const result3 = await prisma.$queryRaw`EXEC POST_UserMed ${CRM}, ${senha}`;
        const result4 = await prisma.$queryRaw`EXEC POST_EspecMed ${CRM}, ${nomeEspec}`;
        const result5 = await prisma.$queryRaw`
        CLOSE C_Espec;
        DEALLOCATE C_Espec;`;
    }

    catch (error){
        console.error('Não foi possível inserir o(a) médico(a)!', error);
    }
});

/* INSERE UM ATENDENTE NO BD */
exports.postAtendente = ("/postAtendente", async(req, res) => {
    const CPF       = req.body.CPF;
    const nome      = req.body.nome;
    const sobrenome = req.body.sobrenome;
    const email     = req.body.email;
    const telefone  = req.body.telefone;
    const senha     = req.body.senha;

    try{
        const result1 = await prisma.$queryRaw`EXEC POST_Atendente ${CPF}, ${nome}, ${sobrenome}, ${email}, ${telefone}`;
        const result2 = await prisma.$queryRaw`EXEC POST_UserAtendente ${email}, ${senha}`;
    }

    catch (error){
        console.error('Não foi possível inserir o(a) atendente!', error);
    }
})

/* INSERE UM PACIENTE NO BD */
exports.postPaciente = ("/postPaciente", async(req, res) => {
    const CPF       = req.body.CPF;
    const nome      = req.body.nome;
    const sobrenome = req.body.sobrenome;
    const email     = req.body.email;
    const telefone  = req.body.telefone;
    const dataNasci = req.body.dataNasci;
    const estado    = req.body.estado;

    try{
        const result = await prisma.$queryRaw`EXEC POST_Paciente ${CPF}, ${nome}, ${sobrenome}, ${email}, ${telefone}, ${dataNasci}, ${estado}`;
    }

    catch (error){
        console.error('Não foi possível inserir o(a) paciente!', error);
    }
})

/* INSERE UMA CONSULTA NO BD */
exports.postConsulta = ("/postConsulta", async(req, res) => {
    const horaInicio = req.body.horaInicio;
    const CRM        = req.body.CRM;
    const CPF        = req.body.CPF;

    try{
        const result = await prisma.$queryRaw`EXEC POST_Consulta ${horaInicio}, ${CRM}, ${CPF}`;
    }

    catch (error){
        console.error('Não foi possível realizar a consulta!', error);
    }
})

///////////////////////////////////////////////////////////// PUT /////////////////////////////////////////////////////////////
/* ATUALIZA A SENHA DO MÉDICO */
exports.putMedicoSenha = ("/putMedicoSenha", async(req, res) => {
    const CRM   = Number(req.body.CRM);
    const senha = req.body.senha;

    try{
        const result = await prisma.$queryRaw`EXEC UPDATE_MedSenha ${CRM}, ${senha}`;
    }

    catch (error){
        console.error('Não foi possível atualizar a senha do(a) médico(a)!', error);
    }
})

/* ATUALIZA A SENHA DO ATENDENTE */
exports.putAtendenteSenha = ("/putAtendentesSenha", async(req, res) => {
    const email   = req.body.email;
    const senha = req.body.senha;

    try{
        const result = await prisma.$queryRaw`EXEC UPDATE_AteSenha ${email}, ${senha}`;
    }

    catch (error){
        console.log('Não foi possível alterar a senha do(a) atendente!', error);
    }
})

/* ATUALIZA O SALÁRIO DO MÉDICO */
exports.putMedicoSalario = ("/putMedicoSalario", async(req, res) => {
    const CRM     = Number(req.body.CRM);
    const salario = parseFloat(req.body.salario);

    try{
        const result = await prisma.$queryRaw`EXEC UPDATE_MedSal ${CRM}, ${salario}`;
    }

    catch (error){
        console.log('Não foi possível atualizar o salário do(a) médico(a)!', error);
    }
})

/* ATUALIZA O SALÁRIO DO ATENDENTE */
exports.putAtendenteSalario = ("/putAtendenteSalario", async(req, res) => {
    const CPF     = req.body.CPF;
    const salario = parseFloat(req.body.salario);

    try{
        const result = await prisma.$queryRaw`EXEC UPDATE_AteSal ${CPF}, ${salario}`;
    }

    catch (error){
        console.log('Não foi possível atualizar o salário do(a) atendente!', error);
    }
})


///////////////////////////////////////////////////////////// DELETE /////////////////////////////////////////////////////////////
/* DELETA UM MÉDICO E SEUS DADOS */
exports.deleteMedicosDemitido = ("/deleteMedicosDemitido", async (req, res) => {
    let CRM = parseInt(req.query.CRM);

    try {
        const result = await prisma.$queryRaw`EXEC DELETE_MedDemitido ${CRM}`;
        res.json(result);
    }
    
    catch (error) {
        console.error('Erro ao demitir o(a) médico(a):', error);
        res.status(500).json({ error: 'Erro interno ao demitir o(a) médico(a)' });
    }
});

/* DELETA UM ATENDENTE E SEUS DADOS */
exports.deleteAtendenteDemitido = ("/deleteAtendenteDemitido", async(req, res) => {
    const CPF = String(req.query.CPF);
    
    try{
         const result = await prisma.$queryRaw`EXEC DELETE_AteDemitido ${CPF}`;
         res.json(result);
    }

    catch (error){
        console.error('Erro ao demitir o(a) atendente:', error);
        res.status(500).json({ error: 'Erro interno ao demitir o(a) atendente' });
    }
})