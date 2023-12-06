/* VIEW PARA A SELEÇÃO DOS LOGINS DE MÉDICOS E SEUS RESPECTIVOS DADOS */
CREATE OR ALTER VIEW V_Doctor as 
SELECT Hospital.UsernameDoctor.CRM, Hospital.UsernameDoctor.senha, 
	   Hospital.Doctor.nome + ' ' + Hospital.Doctor.sobrenome as nome, Hospital.Doctor.telefone, Hospital.Doctor.salario, Hospital.Doctor.email FROM 
	   Hospital.UsernameDoctor INNER JOIN  Hospital.Doctor on UsernameDoctor.CRM = Doctor.CRM;
