/* EXCLUI ESPECIALIZA��ES CASO N�O HAJA M�DICOS QUE S�O ESPECIALIZADOS */
CREATE TRIGGER T_MedicoEspec on Hospital.DoctorSpecialization FOR DELETE as
BEGIN
	BEGIN TRY
		DECLARE @especDeletada varchar(20),
				@nEspecs int;

		SELECT @especDeletada = idEspecializacao from deleted;

		DECLARE C_Medicos cursor for SELECT COUNT(CRM) from Hospital.DoctorSpecialization where idEspecializacao = @especDeletada;
		OPEN C_Medicos;
		FETCH C_Medicos INTO @nEspecs;

		if @nEspecs = 0
			BEGIN
				DELETE Hospital.Specialization where idEspecializacao = @especDeletada;
			END

		CLOSE C_Medicos;
		DEALLOCATE C_Medicos;
	END TRY

	BEGIN CATCH
		RAISERROR('Erro na dele��o dos dados!', 15, 1);
	END CATCH
END

/* N�O PERMITE A INCLUS�O DE PACIENTES COM IDADES ABSURDAS */
create trigger T_Paciente on Hospital.Patient FOR INSERT, UPDATE as
BEGIN
	DECLARE @idade int,
			@idInserido int,
			@dataNascimento datetime;

	select @dataNascimento = dataNascimento, @idInserido = idPaciente from inserted;
	set @idade = FLOOR(DATEDIFF(DAY, @DataNascimento, GETDATE()) / 365.25);

	if @idade < 0 OR @idade > 122
		BEGIN
			delete Hospital.Patient where idPaciente = @idInserido;
			RAISERROR('Idade fora dos limites reais!', 15, 1);
		END
END

/* N�O PERMITE A INSER��O DE SAL�RIOS INDEVIDOS */
create trigger T_Atendente on Hospital.Attendant INSTEAD OF UPDATE as
BEGIN
	DECLARE @idInserido int,
			@salario money;

	select @salario = salario, @idInserido = idAtendente from inserted;

	if @salario <= 0
		BEGIN
			RAISERROR('Sal�rio inv�lido!', 15, 1);
		END

	else
		UPDATE Hospital.Attendant set salario = @salario where idAtendente = @idInserido;
END

/* N�O PERMITE A ATUALIZA��O DE SAL�RIOS INV�LIDOS */
CREATE TRIGGER T_Medicos on Hospital.Doctor INSTEAD OF UPDATE as
BEGIN
	DECLARE @idInserido int,
			@salario money;

	select @salario = salario, @idInserido = CRM from inserted;

	if @salario <= 0
		BEGIN
			RAISERROR('Sal�rio inv�lido!', 1, 1);
		END

	else
		UPDATE Hospital.Doctor set salario = @salario where CRM = @idInserido;
END

/* N�O PERMITE A INSER��O DE M�DICOS COM CRMs INV�LIDAS */
CREATE TRIGGER T_MedicosCRM on Hospital.Doctor INSTEAD OF INSERT as
BEGIN
	DECLARE @CRM int,
			@nome varchar(30),
			@sobrenome varchar(20),
			@email varchar(60),
			@telefone varchar(20),
			@salario money;

	select @CRM = CRM, @nome = nome, @sobrenome = sobrenome, @email = email, @telefone = telefone, @salario = salario from inserted;

	if @CRM > 0
		INSERT INTO Hospital.Doctor(CRM, nome, sobrenome, email, telefone, salario) values(@CRM, @nome, @sobrenome, @email, @telefone, 1300.0);

	else
		RAISERROR('CRM inv�lida!', 1, 1);
END