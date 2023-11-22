INSERT INTO Hospital.Patient(CPF, nome, sobrenome, email, telefone, dataNascimento, estado) values
('406513668-79', 'Musashi', 'Miyamoto', 'musashi@gmail.com', '99520-9278', CONVERT(datetime, '2008-04-12 07:47:32', 102), 'SP'),
('692660174-41', 'José', 'Henrique', 'jose@gmail.com', '99123-6408', CONVERT(datetime, '2007-12-11 19:23:16', 102), 'MG');

INSERT INTO Hospital.Doctor(CRM, nome, sobrenome, email, telefone, salario) values
(90450, 'Cláudio', 'de Santos', 'medico1@gmail.com', '99231-6832', 1250.0),
(4321150, 'Paulo', 'Mathias', 'medico2@gmail.com', '99762-2591', 5104.12),
(297376, 'Renata', 'Cavalcante', 'medico3@gmail.com', '99671-6913', 124172.76);

INSERT INTO Hospital.Attendant(CPF, nome, sobrenome, email, telefone, salario) values
('798236637-17', 'Mariana', 'Oliveira', 'atendente1@gmail.com', '99469-6445', 1412.5),
('386592376-67', 'Luiz', 'Início', 'atendente2@gmail.com', '99747-3871', 158143.64);

INSERT INTO Hospital.Specialization(nomeEspec) values
('Odontologia'),
('Médico Geral');

INSERT INTO Hospital.DoctorSpecialization(CRM, idEspecializacao) values
(90450, 1),
(4321150, 2),
(297376, 1);

INSERT INTO Hospital.Query(horaInicio, horaFim, observacoes, medicamentos, concluido, CRM, idPaciente) values
(CONVERT(time, '2023-08-21 16:30:00', 102), CONVERT(datetime, '2023-08-21 17:30:00', 102), 'Gastrite intestinal', 'Dipirona', 1, 90450, 1),
(CONVERT(time, '2024-01-01  09:15:00', 102), null, null, null, 0, 4321150, 2),
(CONVERT(time, '2023-10-03 19:47:00', 102), CONVERT(datetime, '2023-10-03 21:12:00', 102), 'Autismo leve + COVID', 'Dipirona',1, 90450, 1);

INSERT INTO Hospital.UsernameDoctor(CRM, senha) values
(90450, 'CookieClicker'),
(4321150, 'CookieRunner'),
(297376, 'JorgeOCurioso');

INSERT INTO Hospital.UsernameAttendant(emailCadastrado, senha, idAtendente) values
('atendente2@gmail.com', 'asdasdsadasdasdasdas', 2),
('atendente1@gmail.com', 'TwitterVirouUmX', 1);