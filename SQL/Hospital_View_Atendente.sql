/* VIEW PARA A SELEÇÃO DOS LOGINS DE ATENDENTES E SEUS RESPECTIVOS DADOS */
create or alter view V_Attendant as
select Hospital.UsernameAttendant.emailCadastrado, Hospital.UsernameAttendant.senha, 
	   Hospital.Attendant.CPF, Hospital.Attendant.nome + ' ' + Hospital.Attendant.sobrenome as nome, Hospital.Attendant.telefone, Hospital.Attendant.salario from 
	   Hospital.UsernameAttendant inner join Hospital.Attendant on UsernameAttendant.idAtendente = Attendant.idAtendente

select * from V_Attendant
drop view V_Attendant