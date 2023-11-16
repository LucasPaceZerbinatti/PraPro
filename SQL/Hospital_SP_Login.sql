/* LOGIN DE MÉDICOS */
create or alter procedure pMedLogin
	@CRM int,
	@senha varchar(30),
	@result char(1) output
as
BEGIN
	DECLARE @loginCRM int,
			@loginSenha varchar(30);

	DECLARE C_MedicoCRM cursor for SELECT Hospital.UsernameDoctor.CRM FROM Hospital.UsernameDoctor;
	DECLARE C_MedicoSenha cursor for SELECT Hospital.UsernameDoctor.senha FROM Hospital.UsernameDoctor;

	OPEN C_MedicoCRM;
	OPEN C_MedicoSenha;

	BEGIN TRY
		FETCH C_MedicoCRM INTO @loginCRM;
		FETCH C_MedicoSenha INTO @loginSenha;


	END TRY

	BEGIN CATCH
		a
	END CATCH
	
	CLOSE C_MedicoCRM;
	CLOSE C_MedicoSenha;
	DEALLOCATE C_MedicoCRM;
	DEALLOCATE C_MedicoSenha;
END

/* LOGIN DE ATENDENTES */
create or alter procedure pAteLogin
	@email varchar(60),
	@senha varchar(30)

as

BEGIN
	RETURN select a.CPF, a.nomeAtendente, a.sobrenome, a.telefone from 
	Hospital.Attendant a,
	Hospital.UsernameAttendant ua
	where
	ua.emailCadastrado = @email and ua.emailCadastrado = a.email and ua.senha = @senha and ua.idAtendente = a.idAtendente
END