const express = require('express');
const router = express.Router();

const controller = require('../controllers/controller');

// rotas
router.get('/', controller.getRaiz);
router.get('/getMedicos', controller.getMedicos);
router.get('/getPacientes', controller.getPacientes);
router.get('/getAtendentes', controller.getAtendentes);
router.get('/getConsultas', controller.getConsultas);
router.get('/getEspecializacao', controller.getEspecializacao);

router.get('/getMedicoPendente', controller.getMedicoPendente);
router.get('/getMedicoConcluido', controller.getMedicoConcluido);
router.get('/getPacientePendente', controller.getPacientePendente);
router.get('/getPacienteConcluido', controller.getPacienteConcluido);
router.get('/getPacienteCincoUltimas', controller.getPacienteCincoUltimas);

router.post('/postEspecializacao', controller.postEspecializacao);
router.post('/postMedico', controller.postMedico);       // médicos
router.post('/postAtendente', controller.postAtendente); // atendentes
router.post('/postPaciente', controller.postPaciente);   // pacientes
router.post('/postConsulta', controller.postConsulta);   // insere consultas

// o módulo do arquivo será exportado através da constante router
module.exports = router;