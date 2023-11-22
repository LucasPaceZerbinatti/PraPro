/* EXIBIÇÃO DE CONSULTAS PENDENTES(MÉDICOS) */
CREATE OR ALTER PROCEDURE GET_MedPEN
	@CRM int
as
BEGIN
	BEGIN TRY
		SELECT * FROM Hospital.Query where Query.concluido = 0 AND Query.CRM = @CRM;
	END TRY

	BEGIN CATCH
		RAISERROR('Não foi póssível exibir as consultas pendentes do(a) médico(a)!', 15, 1);
	END CATCH
END

/* EXIBIÇÃO DE CONSULTAS CONCLUÍDAS(MÉDICOS) */
CREATE OR ALTER PROCEDURE GET_MedCon
	@CRM int
as
BEGIN
	BEGIN TRY
		SELECT * FROM Hospital.Query where Query.concluido = 1 AND Query.CRM = @CRM;
	END TRY

	BEGIN CATCH
		RAISERROR('Não foi possível exibir as consultas concluídas pelo(a) médico(a)!', 15, 1);
	END CATCH
END

/* EXIBIÇÃO DE CONSULTAS PENDENTES(PACIENTES) */
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
		RAISERROR('Não foi possível exibir as consultas pendentes do(a) paciente!', 15, 1);
	END CATCH

	CLOSE C_Paciente;
	DEALLOCATE C_Paciente;
END

/* EXIBIÇÃO DE CONSULTAS CONCLUÍDAS(PACIENTES) */
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
		RAISERROR('Não foi possível exibir as consultas concluídas do(a) paciente!', 15, 1);
	END CATCH

	CLOSE C_Paciente;
	DEALLOCATE C_Paciente;
END


/* EXIBIÇÃO DAS 5 ÚLTIMAS CONSULTAS DO PACIENTE */
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
		RAISERROR('Não foi possível exibir as 5 últimas consultas do(a) paciente!', 15, 1);
	END CATCH

	CLOSE C_Paciente;
	DEALLOCATE C_Paciente;
END