CREATE SCHEMA Hospital

/* TABELA DE ESPECIALIZAÇÕES */
CREATE TABLE Hospital.Specialization(
	idEspecializacao int IDENTITY not null,
	nomeEspec varchar(20) not null,

	PRIMARY KEY(idEspecializacao),
)

/* TABELA DE MÉDICOS */
CREATE TABLE Hospital.Doctor(
	CRM int not null,
	nome varchar(30) not null,
	sobrenome varchar(20) not null,
	email varchar(60) not null,
	telefone varchar(20) not null,
	salario float not null,

	PRIMARY KEY(CRM),

	CHECK (telefone like '[0-9][0-9][0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]')
)

alter table Hospital.Doctor
alter column salario money not null

/* TABELA DE ATENDENTES */
CREATE TABLE Hospital.Attendant(
	idAtendente int IDENTITY not null,
	CPF varchar(20) not null,
	nome varchar(30) not null,
	sobrenome varchar(20) not null,
	email varchar(60) not null,
	telefone varchar(20) not null,
	salario float not null,

	PRIMARY KEY(idAtendente),
	CHECK (CPF like '[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]-[0-9][0-9]'),
	CHECK (telefone like '[0-9][0-9][0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]'),
)

alter table Hospital.Attendant
alter column salario money not null

ALTER TABLE Hospital.Attendant
ADD UNIQUE(CPF)

/* TABELA DE PACIENTES */
CREATE TABLE Hospital.Patient(
	idPaciente int IDENTITY not null,
	CPF varchar(20) not null,
	nome varchar(30) not null,
	sobrenome varchar(20) not null,
	email varchar(60) not null,
	telefone varchar(20) not null,
	dataNascimento datetime,
	estado varchar(2) not null,

	PRIMARY KEY(idPaciente),
	CHECK (CPF like '[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]-[0-9][0-9]'),
	CHECK (telefone like '[0-9][0-9][0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]'),
)

ALTER TABLE Hospital.Patient
ADD UNIQUE(CPF)

/* TABELA DE CONSULTAS */
CREATE TABLE Hospital.Query(
	idConsulta int IDENTITY not null,
	horaInicio datetime not null,
	horaFim datetime null,
	observacoes ntext null,
	medicamentos ntext null,
	concluido int not null,

	CRM int not null,
	idPaciente int not null,

	PRIMARY KEY(idConsulta),
	FOREIGN KEY(CRM) REFERENCES Hospital.Doctor(CRM),
	FOREIGN KEY(idPaciente) REFERENCES Hospital.Patient(idPaciente)
)

/* TABELA DE MÉDICOS + ESPECIALIZAÇÕES */
CREATE TABLE Hospital.DoctorSpecialization(
	idMedicoEspecializacao int IDENTITY not null,
	CRM int not null,
	idEspecializacao int not null,

	PRIMARY KEY(idMedicoEspecializacao),
	FOREIGN KEY(CRM) REFERENCES Hospital.Doctor(CRM),
	FOREIGN KEY(idEspecializacao) REFERENCES Hospital.Specialization(idEspecializacao),
)

/* TABELA DE CADASTROS DE USUÁRIOS MÉDICOS */
CREATE TABLE Hospital.UsernameDoctor(
	idConta int IDENTITY not null,
	CRM int not null,
	senha varchar(30) not null,

	PRIMARY KEY(idConta),
	FOREIGN KEY(CRM) REFERENCES Hospital.Doctor(CRM)
)

/* TABELA DE CADASTROS DE USUÁRIOS ATENDENTE */ 
CREATE TABLE Hospital.UsernameAttendant(
	idConta int IDENTITY not null,
	emailCadastrado varchar(60) not null,
	senha varchar(30) not null,
	idAtendente int not null,

	PRIMARY KEY(idConta),
	FOREIGN KEY(idAtendente) REFERENCES Hospital.Attendant(idAtendente)
)