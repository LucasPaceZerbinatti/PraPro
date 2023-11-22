const { PrismaClient } = require('@prisma/client');
const res = require('express/lib/response');
const prisma = new PrismaClient();

exports.getRaiz = ("/",(req,res) => {
    res.send('<h1>Node com SQLServer</h1>');
})

exports.getMedicos = ("/getMedicos", async(req, res) => {
    const result = await prisma.$queryRaw`SELECT * FROM V_Doctor`;
    res.json(result);
})

exports.getPacientes = ("/getPacientes", async(req, res) => {
    const result = await prisma.$queryRaw`SELECT * FROM Hospital.Patient`;
    res.json(result);
})

exports.getAtendentes = ("/getAtendentes", async(req, res) => {
    const result = await prisma.$queryRaw`SELECT * FROM V_Attendant`;
    res.json(result);
})

exports.getConsultas = ("/getConsultas", async(req, res) => {
    const result = await prisma.$queryRaw`SELECT * FROM V_QueryDatas`;
    res.json(result);
})

exports.getEspecializacao = ("/getEspecializacao", async(req, res) => {
    const result = await prisma.$queryRaw`SELECT * FROM V_DoctorSpec`;
    res.json(result);
})

exports.getMedicoPendente = ("/getMedicoPendente", async(req, res) => {
    const CRM = Number(req.query.CRM);
    const result = await prisma.$queryRaw`EXEC pMedExibirPen ${CRM}`;
    res.json(result)
})

exports.getMedicoConcluido = ("/getMedicoConcluido", async(req, res) => {
    const CRM = Number(req.query.CRM);
    const result = await prisma.$queryRaw`EXEC pMedExibirCon ${CRM}`;
    res.json(result);
})

exports.getPacientePendente = ("/getPacientePendente", async(req, res) => {
    const CPF = String(req.query.CPF);
    const result = await prisma.$queryRaw`EXEC pPacExibirPen ${CPF}`;
    res.json(result);
})

exports.getPacienteConcluido = ("/getPacienteConcluido", async(req, res) => {
    const CPF = String(req.query.CPF);
    const result = await prisma.$queryRaw`EXEC pPacExibirCon ${CPF}`;
    res.json(result);
})

exports.getPacienteCincoUltimas = ("/getPacienteCincoUltimas", async(req, res) => {
    const CPF = String(req.query.CPF);
    const result = await prisma.$queryRaw`EXEC pPac5Con ${CPF}`;
    res.json(result);
})

///////////////////////////////////////////////////////////// POST /////////////////////////////////////////////////////////////
exports.postEspecializacao = async (req, res) => {
    const nome = req.body.nome;
    try {
      const result = await prisma.$queryRaw`EXEC pInsertSpec ${nome}`;
      console.log('Inserção bem-sucedida!');
      res.status(200).json({ message: 'Inserção bem-sucedida!' });
    } 
    
    catch (error) {
      console.error('Erro ao inserir a especialização:', error);
      res.status(500).json({ error: 'Erro ao inserir a especialização.' });
    }
  };
  
///////////////////////// FOI /////////////////////////
exports.postMedico = async(req, res) => {
    const CRM       = req.body.CRM;
    const nome      = req.body.nome;
    const sobrenome = req.body.sobrenome;
    const telefone  = req.body.telefone;
    const email     = req.body.email;
    const senha     = req.body.senha;
    const espec     = req.body.espec;

    try{
        const result1 = await prisma.$queryRaw`EXEC POST_Espec @espec = ${espec}`;
        const result2 = await prisma.$queryRaw`EXEC POST_Medico ${CRM}, ${nome}, ${sobrenome}, ${email}, ${telefone}`;
        const result3 = await prisma.$queryRaw`EXEC POST_UserMed ${CRM}, ${senha}`;
        const result4 = await prisma.$queryRaw`EXEC POST_EspecMed ${CRM}, ${espec}`;
    }

    catch (error){
        console.error('Não foi possível inserir o(a) médico(a)!', error);
    }
};

///////////////////////// FOI /////////////////////////
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

///////////////////////// FOI /////////////////////////
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

///////////////////////// FOI /////////////////////////
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
exports.putMedicoSenha = ("/putMedicoSenha", async(req, res) => {
    const CRM   = req.body.CRM;
    const senha = req.body.senha;

    try{
        const result = await prisma.$queryRaw`EXEC UPDATE_MedSenha ${CRM}, ${senha}`;
    }

    catch (error){
        console.error('Não foi possível atualizar a senha do(a) médico(a)!', error);
    }
})

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

exports.putMedicoSalario = ("/putMedicoSalario", async(req, res) => {
    const CRM     = req.body.CRM;
    const salario = req.body.salario;

    try{
        const result = await prisma.$queryRaw`EXEC UPDATE_MedSal ${CRM}, ${salario}`;
    }

    catch (error){
        console.log('Não foi possível atualizar o salário do(a) médico(a)!', error);
    }
})

exports.putAtendenteSalario = ("/putAtendenteSalario", async(req, res) => {
    const CPF     = req.body.CPF;
    const salario = req.body.salario;

    try{
        const result = await prisma.$queryRaw`EXEC UPDATE_AteSal ${CPF}, ${salario}`;
    }

    catch (error){
        console.log('Não foi possível atualizar o salário do(a) atendente!', error);
    }
})


///////////////////////////////////////////////////////////// DELETE /////////////////////////////////////////////////////////////
exports.deleteMedicosDemitido = ("/deleteMedicosDemitido", async(req, res) => {
    const CRM = req.body.CRM;
    
    try{
         const result = await prisma.$queryRaw`EXEC DELETE_MedDemitido ${CRM}`;
    }

    catch (error){
        console.log('Não foi possível demitir o(a) médico(a)!');
    }
})

exports.deleteAtendenteDemitido = ("/deleteAtendenteDemitido", async(req, res) => {
    const CPF = req.body.CPF;
    
    try{
         const result = await prisma.$queryRaw`EXEC DELETE_AteDemitido ${CPF}`;
    }

    catch (error){
        console.log('Não foi possível demitir o(a) atendente!');
    }
})