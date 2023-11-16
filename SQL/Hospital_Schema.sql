create schema Hospital

/* TABELA DE ESPECIALIZAÇÕES */
create table Hospital.Specialization(
	idEspecializacao int identity not null,
	nome varchar(20) not null,

	primary key(idEspecializacao),
)

/* TABELA DE MÉDICOS */
create table Hospital.Doctor(
	CRM int not null,
	nome varchar(30) not null,
	sobrenome varchar(20) not null,
	email varchar(60) not null,
	telefone varchar(20) not null,
	salario float not null,

	primary key(CRM),

	CHECK (telefone like '[0-9][0-9][0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]'),
)

/* TABELA DE ATENDENTES */
create table Hospital.Attendant(
	idAtendente int identity not null,
	CPF varchar(20) not null,
	nome varchar(30) not null,
	sobrenome varchar(20) not null,
	email varchar(60) not null,
	telefone varchar(20) not null,
	salario float not null,

	primary key(idAtendente),
	CHECK (CPF like '[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]-[0-9][0-9]'),
	CHECK (telefone like '[0-9][0-9][0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]'),
)

/* TABELA DE PACIENTES */
create table Hospital.Patient(
	idPaciente int identity not null,
	CPF varchar(20) not null,
	nome varchar(30) not null,
	sobrenome varchar(20) not null,
	email varchar(60) not null,
	telefone varchar(20) not null,
	dataNascimento datetime,
	estado varchar(2) not null,

	primary key(idPaciente),
	CHECK (CPF like '[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]-[0-9][0-9]'),
	CHECK (telefone like '[0-9][0-9][0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]'),
)

/* TABLEA DE CONSULTAS */
create table Hospital.Query(
	idConsulta int identity not null,
	horaInicio datetime not null,
	horaFim datetime null,
	observacoes ntext null,
	medicamentos ntext null,
	concluido int not null,

	CRM int not null,
	idPaciente int not null,

	primary key(idConsulta),
	foreign key(CRM) references Hospital.Doctor(CRM),
	foreign key(idPaciente) references Hospital.Patient(idPaciente)
)

/* TABELA DE MÉDICOS + ESPECIALIZAÇÕES */
create table Hospital.DoctorSpecialization(
	idMedicoEspecializacao int identity not null,
	CRM int not null,
	idEspecializacao int not null,

	primary key(idMedicoEspecializacao),
	foreign key(CRM) references Hospital.Doctor(CRM),
	foreign key(idEspecializacao) references Hospital.Specialization(idEspecializacao),
)

/* TABELA DE CADASTROS DE USUÁRIOS M�DICOS */
create table Hospital.UsernameDoctor(
	idConta int identity not null,
	CRM int not null,
	senha varchar(30) not null,

	primary key(idConta),
	foreign key(CRM) references Hospital.Doctor(CRM)
)

/* TABE�A DE CADASTROS DE USUÁRIOS ATENDENTE */ 
create table Hospital.UsernameAttendant(
	idConta int identity not null,
	emailCadastrado varchar(60) not null,
	senha varchar(30) not null,
	idAtendente int not null,

	primary key(idConta),
	foreign key(idAtendente) references Hospital.Attendant(idAtendente)
)

insert into Hospital.Patient values('406513668-79', 'Musashi', 'Miyamoto', 'musashi@gmail.com', '99520-9278', CONVERT(datetime, '2008-04-12 07:47:32', 102), 'SP')
insert into Hospital.Patient values('692660174-41', 'Jos�', 'Henrique', 'jose@gmail.com', '99123-6408', CONVERT(datetime, '2007-12-11 19:23:16', 102), 'MG')

insert into Hospital.Doctor values(90450, 'Cl�udio', 'de Santos', 'medico1@gmail.com', '99231-6832', 1250.0)
insert into Hospital.Doctor values(4321150, 'Paulo', 'Mathias', 'medico2@gmail.com', '99762-2591', 5104.12)
insert into Hospital.Doctor values(297376, 'Renata', 'Cavalcante', 'medico3@gmail.com', '99671-6913', 124172.76)

insert into Hospital.Attendant values('798236637-17', 'Mariana', 'Oliveira', 'atendente1@gmail.com', '99469-6445', 1412.5)
insert into Hospital.Attendant values('386592376-67', 'Luiz', 'In�cio', 'atendente2@gmail.com', '99747-3871', 158143.64)

insert into Hospital.Specialization values('Odontologia')
insert into Hospital.Specialization values('Médico Geral')

insert into Hospital.DoctorSpecialization values(90450, '1')
insert into Hospital.DoctorSpecialization values(4321150, '2')
insert into Hospital.DoctorSpecialization values(297376, '1')

insert into Hospital.Query values(CONVERT(time, '2023-08-21 16:30:00', 102), CONVERT(datetime, '2023-08-21 17:30:00', 102), 'Gastrite intestinal', 'Dipirona', 1, 90450, 1)
insert into Hospital.Query values(CONVERT(time, '2024-01-01  09:15:00', 102), null, null, null, 0, 4321150, 2)
insert into Hospital.Query values(CONVERT(time, '2023-10-03 19:47:00', 102), CONVERT(datetime, '2023-10-03 21:12:00', 102), 'Autismo leve + COVID', 'Dipirona',1, 90450, 1)

insert into Hospital.UsernameDoctor values(90450, 'CookieClicker')
insert into Hospital.UsernameDoctor values(4321150, 'CookieRunner')
insert into Hospital.UsernameDoctor values(297376, 'JorgeOCurioso')

insert into Hospital.UsernameAttendant values('atendente2@gmail.com', 'asdasdsadasdasdasdas', 2)
insert into Hospital.UsernameAttendant values('atendente1@gmail.com', 'TwitterVirouUmX', 1)



-- ZERA O IDENTITY
DBCC CHECKIDENT('Hospital.Patient', RESEED,0)
DBCC CHECKIDENT('Hospital.Query', RESEED,0)
DBCC CHECKIDENT('Hospital.Attendant', RESEED,0)
DBCC CHECKIDENT('Hospital.Specialization', RESEED,0)
DBCC CHECKIDENT('Hospital.DoctorSpecialization', RESEED,0)
DBCC CHECKIDENT('Hospital.UsernameDoctor', RESEED,0)
DBCC CHECKIDENT('Hospital.UsernameAttendant', RESEED,0)

/* COMANDOS DE CONTROLE DAS TABELAS */
drop table Hospital.Patient
drop table Hospital.Query
drop table Hospital.Doctor
drop table Hospital.Specialization
drop table Hospital.Attendant
drop table Hospital.DoctorSpecialization
drop table Hospital.UsernameDoctor
drop table Hospital.UsernameAttendant

delete Hospital.Patient
delete Hospital.Query
delete Hospital.Doctor
delete Hospital.Attendant
delete Hospital.Specialization
delete Hospital.DoctorSpecialization
delete Hospital.UsernameDoctor
delete Hospital.UsernameAttendant

select * from Hospital.Patient
select * from Hospital.Query
select * from Hospital.Doctor
select * from Hospital.Attendant
select * from Hospital.Specialization
select * from Hospital.DoctorSpecialization
select * from Hospital.UsernameDoctor
select * from Hospital.UsernameAttendant