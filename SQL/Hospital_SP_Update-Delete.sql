/* ALTERA A SENHA DE LOGIN DO(A) MÉDICO(A) */
CREATE OR ALTER PROCEDURE UPDATE_MedSenha 
	@CRM int,
	@senha varchar(20)
as
BEGIN
	BEGIN TRY
		UPDATE Hospital.UsernameDoctor set senha = @senha where CRM = @CRM;
	END TRY

	BEGIN CATCH
		RAISERROR('Não foi possível atualizar a senha!', 15, 1)
	END CATCH
END

/* ALTERA A SENHA DO(A) ATENDENTE */
CREATE OR ALTER PROCEDURE UPDATE_AteSenha
	@email varchar(60),
	@senha varchar(20)
as
BEGIN
	BEGIN TRY
		UPDATE Hospital.UsernameAttendant set senha = @senha where @email = emailCadastrado;
	END TRY

	BEGIN CATCH
		RAISERROR('Não foi possível atualizar a sua senha!', 15, 1);
	END CATCH
END

/* ALTERA O SALÁRIO DO(A) MÉDICO(A) */
CREATE OR ALTER PROCEDURE UPDATE_MedSal
	@CRM int,
	@salario float
as
BEGIN
	BEGIN TRY
		UPDATE Hospital.Doctor set salario = @salario where CRM = @CRM;
	END TRY

	BEGIN CATCH
	RAISERROR('Não foi possível alterar o salário!', 15, 1);
	END CATCH
END

/* ALTERA O SALÁRIO DO(A) ATENDENTE */
CREATE OR ALTER PROCEDURE UPDATE_AteSal
	@CPF varchar(20),
	@salario float
as
BEGIN
	BEGIN TRY
		UPDATE Hospital.Attendant set salario = @salario where CPF = @CPF;
	END TRY

	BEGIN CATCH
		RAISERROR('Não foi possível alterar o salário!', 15, 1);
	END CATCH
END

/* DELETA OS REGISTROS RELACIONADOS AOS(ÀS) MÉDICOS(AS) DEMITIDOS(AS) */
CREATE OR ALTER PROCEDURE DELETE_MedDemitido
	@CRM int
as
BEGIN
	BEGIN TRY
		DELETE Hospital.Query where CRM = @CRM;
		DELETE Hospital.DoctorSpecialization where CRM = @CRM;
		DELETE Hospital.UsernameDoctor where CRM = @CRM;
		DELETE Hospital.Doctor where CRM = @CRM;
	END TRY

	BEGIN CATCH
		RAISERROR('Não foi demitir você! Perdão...', 15, 1)
	END CATCH
END

/* DELETA OS DADOS RELACIONADOS AO(À) ATENDENTE */
CREATE OR ALTER PROCEDURE DELETE_AteDemitido
	@email varchar(60)
as
BEGIN
	BEGIN TRY
		DELETE Hospital.UsernameAttendant where emailCadastrado = @email;
		DELETE Hospital.Attendant where email = @email;
	END TRY

	BEGIN CATCH
		RAISERROR('Não foi possível te demitir! Perdão...', 15, 1);
	END CATCH
END