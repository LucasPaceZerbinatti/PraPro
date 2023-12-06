/* EXCLUI ESPECIALIZAÇÕES CASO NÃO HAJA MÉDICOS QUE SÃO ESPECIALIZADOS */
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
		RAISERROR('Erro na deleção dos dados!', 15, 1);
	END CATCH
END

/* NÃO PERMITE A INCLUSÃO DE PACIENTES COM IDADES ABSURDAS */
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

/* NÃO PERMITE A INSERÇÃO DE SALÁRIOS INDEVIDOS */
create trigger T_Atendente on Hospital.Attendant INSTEAD OF UPDATE as
BEGIN
	DECLARE @idInserido int,
			@salario money;

	select @salario = salario, @idInserido = idAtendente from inserted;

	if @salario <= 0 OR @salario >= 150000
		BEGIN
			RAISERROR('Salário inválido!', 15, 1);
		END

	else
		UPDATE Hospital.Attendant set salario = @salario where idAtendente = @idInserido;
END

/* NÃO PERMITE A ATUALIZAÇÃO DE SALÁRIOS INVÁLIDOS */
CREATE TRIGGER T_Medicos on Hospital.Doctor INSTEAD OF UPDATE as
BEGIN
	DECLARE @idInserido int,
			@salario money;

	select @salario = salario, @idInserido = CRM from inserted;

	if @salario <= 0 OR @salario >= 150000
		BEGIN
			RAISERROR('Salário inválido!', 1, 1);
		END

	else
		UPDATE Hospital.Doctor set salario = @salario where CRM = @idInserido;
END

/* NÃO PERMITE A INSERÇÃO DE MÉDICOS COM CRMs INVÁLIDAS */
CREATE TRIGGER T_MedicosCRM on Hospital.Doctor INSTEAD OF INSERT as
BEGIN
	DECLARE @CRM int,
			@nome varchar(30),
			@sobrenome varchar(20),
			@email varchar(60),
			@telefone varchar(20),
			@salario money;

	select @CRM = CRM, @nome = nome, @sobrenome = sobrenome, @email = email, @telefone = telefone, @salario = salario from inserted;

	if @CRM > 0 OR @salario <= 0 OR @salario >= 150000
		INSERT INTO Hospital.Doctor(CRM, nome, sobrenome, email, telefone, salario) values(@CRM, @nome, @sobrenome, @email, @telefone, 1300.0);

	else
		RAISERROR('Dados inválidos!', 1, 1);
END

CREATE TRIGGER T_ConsultaConc on Hospital.Query FOR UPDATE
as
BEGIN
	DECLARE @idConsulta int,
			@estado int;

	SELECT @idConsulta = idConsulta, @estado = concluido from inserted;

	if @estado = 1
		UPDATE Hospital.Query set horaFim = GETDATE() where idConsulta = @idConsulta;

	else
		UPDATE Hospital.Query set horaFim = null where idConsulta = @idConsulta;
END
