/* VIEW PARA A SELEÇÃO DOS DADOS DAS CONSULTAS E OS DADOS DO MÉDICO QUE ATENDEU E OS DADOS DO PACIENTE*/
create or alter view V_QueryDatas as
select Hospital.Query.concluido, Hospital.Query.horaInicio, Hospital.Query.horaFim, Hospital.Query.observacoes, Hospital.Query.medicamentos, Hospital.Query.CRM, 
	   Hospital.Patient.CPF, Hospital.Patient.nome + ' ' + Hospital.Patient.sobrenome as nome, Hospital.Patient.email, Hospital.Patient.telefone from 
	   Hospital.Query inner join Hospital.Patient on Query.idPaciente = Patient.idPaciente

select * from V_QueryDatas
drop view V_QueryDatas