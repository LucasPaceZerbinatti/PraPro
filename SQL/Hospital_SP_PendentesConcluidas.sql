/* EXIBIÇÃO DE CONSULTAS PENDENTES(MÉDICOS) */
create or alter procedure pMedExibirPen
	@CRM int
as
BEGIN
	select * from Hospital.Query where Query.concluido = 0 and Query.CRM = @CRM;
END

/* EXIBIÇÃO DE CONSULTAS CONCLUÍDAS(MÉDICOS) */
create or alter procedure pMedExibirCon
	@CRM int
as
BEGIN
	select * from Hospital.Query where Query.concluido = 1 and Query.CRM = @CRM;
END

/* EXIBIÇÃO DE CONSULTAS PENDENTES(PACIENTES) */
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

/* EXIBIÇÃO DE CONSULTAS CONCLUÍDAS(PACIENTES) */
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


/* EXIBIÇÃO DAS 5 ÚLTIMAS CONSULTAS DO PACIENTE */
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