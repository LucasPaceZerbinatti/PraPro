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