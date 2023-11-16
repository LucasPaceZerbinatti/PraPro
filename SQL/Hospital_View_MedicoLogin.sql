/* VIEW PARA A SELEÇÃO DOS LOGINS DE MÉDICOS E SEUS RESPECTIVOS DADOS */
create or alter view V_Doctor as 
select Hospital.UsernameDoctor.CRM, Hospital.UsernameDoctor.senha, 
	   Hospital.Doctor.nome + ' ' + Hospital.Doctor.sobrenome as nome, Hospital.Doctor.telefone, Hospital.Doctor.salario from 
	   Hospital.UsernameDoctor inner join  Hospital.Doctor on UsernameDoctor.CRM = Doctor.CRM;

select * from V_Doctor
drop view V_Doctor