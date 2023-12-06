const express = require('express');
const router = express.Router();

const controller = require('../controllers/controller');

// rotas
router.get('/', controller.getRaiz);
router.get('/getMedicos', controller.getMedicos);
router.get('/getAtendentes', controller.getAtendentes);

router.post('/postMedico', controller.postMedico);       // insere médicos
router.post('/postAtendente', controller.postAtendente); // insere atendentes
router.post('/postPaciente', controller.postPaciente);   // insere pacientes
router.post('/postConsulta', controller.postConsulta);   // insere insere consultas

router.put('/putMedicoSenha', controller.putMedicoSenha);           // altera senha de médicos
router.put('/putAtendenteSenha', controller.putAtendenteSenha);     // altera senha de atendentes
router.put('/putMedicoSalario', controller.putMedicoSalario);       // altera salário de médicos
router.put('/putAtendenteSalario', controller.putAtendenteSalario); // altera salário de atendentes

router.delete('/deleteMedicosDemitido', controller.deleteMedicosDemitido);      // deleta os registros de um médico
router.delete('/deleteAtendenteDemitido', controller.deleteAtendenteDemitido);  // deleta os registros de um funcionário

// o módulo do arquivo será exportado através da constante router
module.exports = router;