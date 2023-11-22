/* EXIBI��O DE CONSULTAS PENDENTES(M�DICOS) */
CREATE OR ALTER PROCEDURE GET_MedPEN
	@CRM int
as
BEGIN
	BEGIN TRY
		SELECT * FROM Hospital.Query where Query.concluido = 0 AND Query.CRM = @CRM;
	END TRY

	BEGIN CATCH
		RAISERROR('N�o foi p�ss�vel exibir as consultas pendentes do(a) m�dico(a)!', 15, 1);
	END CATCH
END

/* EXIBI��O DE CONSULTAS CONCLU�DAS(M�DICOS) */
CREATE OR ALTER PROCEDURE GET_MedCon
	@CRM int
as
BEGIN
	BEGIN TRY
		SELECT * FROM Hospital.Query where Query.concluido = 1 AND Query.CRM = @CRM;
	END TRY

	BEGIN CATCH
		RAISERROR('N�o foi poss�vel exibir as consultas conclu�das pelo(a) m�dico(a)!', 15, 1);
	END CATCH
END

/* EXIBI��O DE CONSULTAS PENDENTES(PACIENTES) */
CREATE OR ALTER PROCEDURE GET_PacPen
	@CPF varchar(20)
as
BEGIN
	DECLARE @idPaciente int;

	DECLARE C_Paciente cursor for SELECT Patient.idPaciente FROM Hospital.Patient where Patient.CPF = @CPF;
	OPEN C_Paciente;

	BEGIN TRY
		FETCH C_Paciente INTO @idPaciente;
		SELECT * FROM Hospital.Query where Query.concluido = 0 AND Query.idPaciente = @idPaciente;
	END TRY

	BEGIN CATCH
		RAISERROR('N�o foi poss�vel exibir as consultas pendentes do(a) paciente!', 15, 1);
	END CATCH

	CLOSE C_Paciente;
	DEALLOCATE C_Paciente;
END

/* EXIBI��O DE CONSULTAS CONCLU�DAS(PACIENTES) */
CREATE OR ALTER PROCEDURE GET_PacCon
	@CPF varchar(20)
as
BEGIN
	DECLARE @idPaciente int;

	DECLARE C_Paciente cursor for SELECT Patient.idPaciente FROM Hospital.Patient where Patient.CPF = @CPF;
	OPEN C_Paciente;

	BEGIN TRY
		FETCH C_Paciente INTO @idPaciente;
		SELECT * FROM Hospital.Query where Query.concluido = 1 AND Query.idPaciente = @idPaciente;
	END TRY

	BEGIN CATCH
		RAISERROR('N�o foi poss�vel exibir as consultas conclu�das do(a) paciente!', 15, 1);
	END CATCH

	CLOSE C_Paciente;
	DEALLOCATE C_Paciente;
END


/* EXIBI��O DAS 5 �LTIMAS CONSULTAS DO PACIENTE */
CREATE OR ALTER PROCEDURE GET_Pac5
	@CPF varchar(20)
as
BEGIN
		DECLARE @idPaciente int;

	DECLARE C_Paciente cursor for SELECT Patient.idPaciente FROM Hospital.Patient where Patient.CPF = @CPF;
	OPEN C_Paciente;

	BEGIN TRY
		FETCH C_Paciente INTO @idPaciente;
		SELECT TOP 5 * FROM Hospital.Query where Query.concluido = 1 AND Query.idPaciente = @idPaciente;
	END TRY

	BEGIN CATCH
		RAISERROR('N�o foi poss�vel exibir as 5 �ltimas consultas do(a) paciente!', 15, 1);
	END CATCH

	CLOSE C_Paciente;
	DEALLOCATE C_Paciente;
END