/* EXIBI��O DE CONSULTAS PENDENTES(M�DICOS) */
create or alter procedure pMedExibirPen
	@CRM int
as
BEGIN
	select * from Hospital.Query where Query.concluido = 0 and Query.CRM = @CRM;
END

/* EXIBI��O DE CONSULTAS CONCLU�DAS(M�DICOS) */
create or alter procedure pMedExibirCon
	@CRM int
as
BEGIN
	select * from Hospital.Query where Query.concluido = 1 and Query.CRM = @CRM;
END

/* EXIBI��O DE CONSULTAS PENDENTES(PACIENTES) */
create or alter procedure pPacExibirPen
	@CPF varchar(20)
as
BEGIN
	DECLARE @idPaciente int;

	DECLARE C_Paciente cursor for SELECT Patient.idPaciente from Hospital.Patient where Patient.CPF = @CPF;
	OPEN C_Paciente;

	BEGIN TRY
		FETCH C_Paciente INTO @idPaciente;
		select * from Hospital.Query where Query.concluido = 0 and Query.idPaciente = @idPaciente;
	END TRY

	BEGIN CATCH
		RAISERROR('Houve um erro ao tentar encontrar o registro do paciente no Banco de Dados', 15, 1);
	END CATCH

	CLOSE C_Paciente;
	DEALLOCATE C_Paciente;
END

/* EXIBI��O DE CONSULTAS CONCLU�DAS(PACIENTES) */
create or alter procedure pPacExibirCon
	@CPF varchar(20)
as
BEGIN
	DECLARE @idPaciente int;

	DECLARE C_Paciente cursor for SELECT Patient.idPaciente from Hospital.Patient where Patient.CPF = @CPF;
	OPEN C_Paciente;

	BEGIN TRY
		FETCH C_Paciente INTO @idPaciente;
		select * from Hospital.Query where Query.concluido = 1 and Query.idPaciente = @idPaciente;
	END TRY

	BEGIN CATCH
		RAISERROR('Houve um erro ao tentar encontrar o registro do paciente no Banco de Dados', 15, 1);
	END CATCH

	CLOSE C_Paciente;
	DEALLOCATE C_Paciente;
END


/* EXIBI��O DAS 5 �LTIMAS CONSULTAS DO PACIENTE */
create or alter procedure pPac5Con
	@CPF varchar(20)
as
BEGIN
		DECLARE @idPaciente int;

	DECLARE C_Paciente cursor for SELECT Patient.idPaciente from Hospital.Patient where Patient.CPF = @CPF;
	OPEN C_Paciente;

	BEGIN TRY
		FETCH C_Paciente INTO @idPaciente;
		select TOP 5 * from Hospital.Query where Query.concluido = 1 and Query.idPaciente = @idPaciente;
	END TRY

	BEGIN CATCH
		RAISERROR('Houve um erro ao tentar encontrar o registro do paciente no Banco de Dados', 15, 1);
	END CATCH

	CLOSE C_Paciente;
	DEALLOCATE C_Paciente;
END