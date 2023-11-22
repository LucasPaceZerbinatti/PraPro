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

create trigger T_Atendente on Hospital.Attendant FOR INSERT, UPDATE as
BEGIN
	DECLARE @idade int,
			@idInserido int,
			@dataNascimento datetime;

	select @dataNascimento = dataNascimento, @idInserido = idAtendente from inserted;
	set @idade = FLOOR(DATEDIFF(DAY, @DataNascimento, GETDATE()) / 365.25);

	if @idade < 0 OR @idade > 122
		BEGIN
			delete Hospital.Attendant where idAtendente = @idInserido;
			RAISERROR('Idade fora dos limites reais!', 15, 1);
		END
END

create trigger T_MedicosEspecs on Hospital.DoctorSpecialization FOR DELETE as
BEGIN
	DECLARE @idEspecExcluida int,
			@qtsMedEspec int;

	select @idEspecExcluida = idEspecializacao from deleted;

	DECLARE C_quantSpec cursor for select COUNT(idMedicoEspecializacao) from Hospital.DoctorSpecialization where idEspecializacao = @idEspecExcluida;
	OPEN C_quantSpec;
	FETCH C_quantSpec INTO @qtsMedEspec;

	if @qtsMedEspec = 0
		DELETE Hospital.Specialization where idEspecializacao = @idEspecExcluida;

	CLOSE C_quantSpec;
	DEALLOCATE C_quantSpec;
END