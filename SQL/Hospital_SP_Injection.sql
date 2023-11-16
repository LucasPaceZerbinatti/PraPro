/* ANTI-INJECTION DA TABELA DE PACIENTES */
create or alter procedure pInsertPatient
	@CPF varchar(20),
	@nome varchar(30),
	@sobrenome varchar(20),
	@email varchar(60),
	@telefone varchar(20),
	@data datetime,
	@estado varchar(2)
as
BEGIN
	BEGIN TRY
		insert into Hospital.Patient(CPF, nome, sobrenome, email, telefone, dataNascimento, estado) values(@CPF, @nome, @sobrenome, @email, @telefone, @data, @estado);
	END TRY

	BEGIN CATCH
		RAISERROR('Houve um erro com o cadastro do(a) paciente, verifique se os dados estão de acordo com as normas ou se o cadastro já foi feito', 15, 1);
	END CATCH
END

/* ANTI-INJECTION DA TABELA DE MÉDICOS */
create or alter procedure pInsertDoctor
	@CRM int,
	@nome varchar(30),
	@sobrenome varchar(20),
	@email varchar(60),
	@telefone varchar(20)
as
BEGIN
	BEGIN TRY
		insert into Hospital.Doctor(CRM, nome, sobrenome, email, telefone) values(@CRM, @nome, @sobrenome, @email, @telefone);
	END TRY

	BEGIN CATCH
		RAISERROR('Houve um erro com o cadastro do(a) paciente, verifique se os dados estão de acordo com as normas ou se o cadastro já foi feito', 15, 1);
	END CATCH
END

/* ANTI-INJECTION DA TABELA DE ATENDENTES */
create or alter procedure pInsertAttendant
	@CPF varchar(20),
	@nome varchar(30),
	@sobrenome varchar(20),
	@email varchar(60),
	@telefone varchar(20)
as
BEGIN
	BEGIN TRY
		insert into Hospital.Attendant(CPF, nome, sobrenome, email, telefone) values(@CPF, @nome, @sobrenome, @email, @telefone);
	END TRY

	BEGIN CATCH
		RAISERROR('Houve um erro com o cadastro do(a) atendente, verifique se os dados estão de acordo com as normas ou se o cadastro já foi feito', 15, 1);
	END CATCH
END

/* ANTI-INJECTION DA TABELA DE LOGIN DE MÉDICOS */
create or alter procedure pInsertUsersDoctors
	@CRM int,
	@senha varchar(30)
as
BEGIN
	BEGIN TRY
		insert into Hospital.UsernameDoctor(CRM, senha) values(@CRM, @senha);
	END TRY

	BEGIN CATCH
		RAISERROR('Houve um erro com o cadastro do login do(a) médico(a), verifique se os dados estão de acordo com as normas ou se o login já foi feito', 15, 1);
	END CATCH
END

/* ANTI-INJECTION DA TABELA DE LOGIN DE ATENDENTES */
create or alter procedure pInsertUsersAttendant
	@emailCadastrado varchar(60),
	@senha varchar(30),
	@idAtendente int
as
BEGIN
	BEGIN TRY
		insert into Hospital.UsernameAttendant(emailCadastrado, senha, idAtendente) values(@emailCadastrado, @senha, @idAtendente);
	END TRY

	BEGIN CATCH
		RAISERROR('Houve um erro com o cadastro do login do(a) médico(a), verifique se os dados estão de acordo com as normas ou se o login já foi feito', 15, 1);
	END CATCH
END