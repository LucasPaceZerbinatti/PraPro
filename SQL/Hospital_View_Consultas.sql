/* VIEW PARA A SELEÇÃO DOS DADOS DAS CONSULTAS E OS DADOS DO MÉDICO QUE ATENDEU E OS DADOS DO PACIENTE*/
CREATE OR ALTER VIEW V_QueryDatas as
SELECT Hospital.Query.concluido, Hospital.Query.horaInicio, Hospital.Query.horaFim, Hospital.Query.observacoes, Hospital.Query.medicamentos, Hospital.Query.CRM, 
	   Hospital.Patient.CPF, Hospital.Patient.nome + ' ' + Hospital.Patient.sobrenome as nome, Hospital.Patient.email, Hospital.Patient.telefone FROM 
	   Hospital.Query INNER JOIN Hospital.Patient on Query.idPaciente = Patient.idPaciente

SELECT * FROM V_QueryDatas
DROP VIEW V_QueryDatas