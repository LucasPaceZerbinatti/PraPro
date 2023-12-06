create or alter procedure GET_ConsultasJAVA 
	@CRM int,
	@dia int,
	@mes int,
	@ano int
as
BEGIN
	SELECT q.horaInicio, q.horaFim, p.nome, q.observacoes, q.medicamentos, q.concluido, q.idConsulta from
	Hospital.Query q,
	Hospital.Patient p
	where p.idPaciente = q.idPaciente AND q.CRM = @CRM AND day(q.horaInicio) = @dia AND month(q.horaInicio) = @mes AND year(q.horaInicio) = @ano
END

create or alter procedure GET_MedEspecJAVA
	@nomeEspec varchar(20)
as
BEGIN
		SELECT * FROM V_DoctorSpec where nomeEspec = @nomeEspec ORDER BY nomeMedico;
END

CREATE OR ALTER procedure POST_MarcarConsultaJAVA
	@CPF varchar(20),
	@obs ntext,
	@nome varchar(50),
	@dia int,
	@mes int,
	@ano int,
	@horario int
as 
BEGIN
	DECLARE @quantos int,
			@idPaciente int, 
			@CRM int;

	SELECT @quantos = count(*) from Hospital.Patient where CPF = @CPF;
	SELECT @idPaciente = idPaciente from Hospital.Patient where CPF = @CPF;
	SELECT @CRM = CRM from Hospital.Doctor where nome+' '+sobrenome = @nome;

	if @quantos = 0
		RAISERROR('não há registro desse paciente',15,1)

	else
		BEGIN
			DECLARE @data varchar(50);

			set @data = format(cast(cast(@dia as varchar)+'/'+cast(@mes as varchar)+'/'+cast(@ano as varchar) as date), 'dd-MM-yyyy')+' '+cast(@horario as varchar)+':00:00.000';
			set @data = cast(@data as datetime);

			INSERT INTO Hospital.Query values(@data, null, @obs, null, 0, @CRM, @idPaciente);
			select 'inserido' as resultado;
		END
END

CREATE OR ALTER procedure DELETE_DeletarConsultaJAVA
	@dia int,
	@mes int,
	@ano int,
	@horario int,
	@nomeCompleto varchar(50)
as
BEGIN
	DECLARE @CRM int;

	SELECT @CRM = CRM FROM Hospital.Doctor where nome+' '+sobrenome = @nomeCompleto;
	DELETE FROM Hospital.Query where day(horaInicio) = @dia and MONTH(horaInicio) = @mes and year(horaInicio) = @ano and CRM = @CRM and DATEPART(hour,horaInicio) = @horario;
END
