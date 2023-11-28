-- ZERA O IDENTITY
DBCC CHECKIDENT('Hospital.Patient', RESEED,0)
DBCC CHECKIDENT('Hospital.Query', RESEED,0)
DBCC CHECKIDENT('Hospital.Attendant', RESEED,0)
DBCC CHECKIDENT('Hospital.Specialization', RESEED,0)
DBCC CHECKIDENT('Hospital.DoctorSpecialization', RESEED,0)
DBCC CHECKIDENT('Hospital.UsernameDoctor', RESEED,0)
DBCC CHECKIDENT('Hospital.UsernameAttendant', RESEED,0)

/* COMANDOS DE CONTROLE DAS TABELAS */
DROP TABLE Hospital.Patient
DROP TABLE Hospital.Query
DROP TABLE Hospital.Doctor
DROP TABLE Hospital.Specialization
DROP TABLE Hospital.Attendant
DROP TABLE Hospital.DoctorSpecialization
DROP TABLE Hospital.UsernameDoctor
DROP TABLE Hospital.UsernameAttendant

DELETE Hospital.Patient
DELETE Hospital.Query
DELETE Hospital.Doctor
DELETE Hospital.Attendant
DELETE Hospital.Specialization
DELETE Hospital.DoctorSpecialization
DELETE Hospital.UsernameDoctor
DELETE Hospital.UsernameAttendant

SELECT * FROM Hospital.Patient
SELECT * FROM Hospital.Specialization
SELECT * FROM Hospital.DoctorSpecialization
SELECT * FROM Hospital.Doctor
SELECT * FROM Hospital.UsernameDoctor
SELECT * FROM Hospital.Attendant
SELECT * FROM Hospital.UsernameAttendant
SELECT * FROM Hospital.Query

UPDATE Hospital.Query set horaInicio = '27/11/2023'