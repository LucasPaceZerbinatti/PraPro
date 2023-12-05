/* VIEW PARA A SELEÇÃO DOS MÉDICOS E SUAS RESPECTIVAS ESPECIALIZAÇÕES */
CREATE OR ALTER VIEW V_DoctorSpec as
SELECT Hospital.Doctor.nome + ' ' + Hospital.Doctor.sobrenome as nomeMedico, Hospital.Specialization.nomeEspec FROM
	   Hospital.DoctorSpecialization INNER JOIN Hospital.Doctor on DoctorSpecialization.CRM = Doctor.CRM INNER JOIN 
	   Hospital.Specialization on DoctorSpecialization.idEspecializacao = Specialization.idEspecializacao

/* VIEW PARA A SELEÇÃO DOS LOGINS DE MÉDICOS E SEUS RESPECTIVOS DADOS */
CREATE OR ALTER VIEW V_Doctor as 
SELECT Hospital.UsernameDoctor.CRM, Hospital.UsernameDoctor.senha, 
	   Hospital.Doctor.nome + ' ' + Hospital.Doctor.sobrenome as nome, Hospital.Doctor.telefone, Hospital.Doctor.salario, Hospital.Doctor.email FROM 
	   Hospital.UsernameDoctor INNER JOIN  Hospital.Doctor on UsernameDoctor.CRM = Doctor.CRM;

/* VIEW PARA A SELEÇÃO DOS LOGINS DE ATENDENTES E SEUS RESPECTIVOS DADOS */
CREATE OR ALTER VIEW V_Attendant as
SELECT Hospital.UsernameAttendant.emailCadastrado, Hospital.UsernameAttendant.senha, 
	   Hospital.Attendant.CPF, Hospital.Attendant.nome + ' ' + Hospital.Attendant.sobrenome as nome, Hospital.Attendant.telefone, Hospital.Attendant.salario FROM 
	   Hospital.UsernameAttendant INNER JOIN Hospital.Attendant on UsernameAttendant.idAtendente = Attendant.idAtendente

SELECT * FROM V_DoctorSpec
DROP VIEW V_DoctorSpec

SELECT * FROM V_Doctor
DROP VIEW V_Doctor

SELECT * FROM V_Attendant
DROP VIEW V_Attendant