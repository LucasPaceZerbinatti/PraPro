/* ANTI-INJECTION DA TABELA DE ESPECIALIZAÇÃO */
CREATE OR ALTER PROCEDURE POST_Espec
	@espec varchar(20)
as
BEGIN
	DECLARE @specTabela varchar(20);

	DECLARE C_Espec cursor for SELECT COUNT(idEspecializacao) from Hospital.Specialization where nomeEspec = @espec;
	OPEN C_Espec;
	FETCH C_Espec INTO @specTabela;
	
	CLOSE C_Espec;
	DEALLOCATE C_Espec;

	if @specTabela = 0
		BEGIN
			INSERT INTO Hospital.Specialization(nomeEspec) values(@espec);
		END
END


/* ANTI-INJECTION DA TABELA DE PACIENTES */
CREATE OR ALTER PROCEDURE POST_Paciente
	@CPF varchar(20),
	@nome varchar(30),
	@sobrenome varchar(20),
	@email varchar(60),
	@telefone varchar(20),
	@data varchar(15),
	@estado varchar(2)
as
BEGIN
	BEGIN TRY
		INSERT INTO Hospital.Patient(CPF, nome, sobrenome, email, telefone, dataNascimento, estado) values(@CPF, @nome, @sobrenome, @email, @telefone, CONVERT(datetime, @data, 102), @estado);
	END TRY

	BEGIN CATCH
		RAISERROR('Não foi possível cadastrar o(a) paciente!', 15, 1);
	END CATCH
END

/* ANTI-INJECTION DA TABELA DE MÉDICOS */
CREATE OR ALTER PROCEDURE POST_Medico
	@CRM int,
	@nome varchar(30),
	@sobrenome varchar(20),
	@email varchar(60),
	@telefone varchar(20)
as
BEGIN
	BEGIN TRY
		INSERT INTO Hospital.Doctor(CRM, nome, sobrenome, email, telefone, salario) values(@CRM, @nome, @sobrenome, @email, @telefone, 1300.0);
	END TRY

	BEGIN CATCH
		RAISERROR('Não foi possível cadastrar o(a) médico(a)!', 15, 1);
	END CATCH
END

/* ANTI-INJECTION DA TABELA DE ATENDENTES */
CREATE OR ALTER PROCEDURE POST_Atendente
	@CPF varchar(20),
	@nome varchar(30),
	@sobrenome varchar(20),
	@email varchar(60),
	@telefone varchar(20)
as
BEGIN
	BEGIN TRY
		INSERT INTO Hospital.Attendant(CPF, nome, sobrenome, email, telefone, salario) values(@CPF, @nome, @sobrenome, @email, @telefone, 1300.0);
	END TRY

	BEGIN CATCH
		RAISERROR('Não foi possível cadastrar o(a) atendente!', 15, 1);
	END CATCH
END

/* ANTI-INJECTION DA TABELA DE LOGIN DE MÉDICOS */
CREATE OR ALTER PROCEDURE POST_UserMed
	@CRM int,
	@senha varchar(30)
as
BEGIN
	BEGIN TRY
		INSERT INTO Hospital.UsernameDoctor(CRM, senha) values(@CRM, @senha);
	END TRY

	BEGIN CATCH
		RAISERROR('Não foi possível cadastrar os dados de login do(a) médico(a)!', 15, 1);
	END CATCH
END

/* ANTI-INJECTION DA TABELA DE LOGIN DE ATENDENTES */
CREATE OR ALTER PROCEDURE POST_UserAtendente 
	@email varchar(60),
	@senha varchar(30)
as
BEGIN
	BEGIN TRY
		INSERT INTO Hospital.UsernameAttendant(emailCadastrado, senha, idAtendente) values(@email, @senha, @@IDENTITY);
	END TRY

	BEGIN CATCH
		RAISERROR('Não foi possível cadastrar os dados de login do(a) atendente!', 15, 1);
	END CATCH
END

/* ANTI-INJECTION DA TABELA DE ESPECIALIZAÇÕES E MÉDICOS */
CREATE OR ALTER PROCEDURE POST_EspecMed
	@CRM int,
	@espec varchar(20)
as
BEGIN
	BEGIN TRY
		DECLARE @id int;

		DECLARE C_Espec cursor for SELECT Hospital.Specialization.idEspecializacao from Hospital.Specialization where  nomeEspec = @espec;
		OPEN C_Espec;
		FETCH C_Espec INTO @id;

		INSERT INTO Hospital.DoctorSpecialization(CRM, idEspecializacao) values(@CRM, @id);
	END TRY

	BEGIN CATCH
		RAISERROR('Não foi possível cadastrar as especializações do(a) médico(a)!', 15, 1);
	END CATCH
END

/* ANTI-INJECTION DA TABELA DE CONSULTAS */
CREATE OR ALTER PROCEDURE POST_Consulta
	@hrIni datetime,
	@CRM int,
	@CPF varchar(30)
as
BEGIN
	DECLARE @idPacienteEncontrado int;

	DECLARE C_Pac cursor for SELECT Hospital.Patient.idPaciente from Hospital.Patient where CPF = @CPF;
	OPEN C_Pac;
	FETCH C_Pac INTO @idPacienteEncontrado;

	BEGIN TRY
		INSERT INTO Hospital.Query(horaInicio, concluido, idPaciente, CRM) values(@hrIni, 0, @idPacienteEncontrado, @CRM);
	END TRY

	BEGIN CATCH
		RAISERROR('Não foi possível marcar a consulta!', 15, 1);
	END CATCH

	CLOSE C_Pac;
	DEALLOCATE C_Pac;
END