/* VIEW PARA A SELEÇÃO DOS LOGINS DE ATENDENTES E SEUS RESPECTIVOS DADOS */
CREATE OR ALTER VIEW V_Attendant as
SELECT Hospital.UsernameAttendant.emailCadastrado, Hospital.UsernameAttendant.senha, 
	   Hospital.Attendant.CPF, Hospital.Attendant.nome + ' ' + Hospital.Attendant.sobrenome as nome, Hospital.Attendant.telefone, Hospital.Attendant.salario FROM 
	   Hospital.UsernameAttendant INNER JOIN Hospital.Attendant on UsernameAttendant.idAtendente = Attendant.idAtendente

SELECT * FROM V_Attendant
DROP VIEW V_Attendant