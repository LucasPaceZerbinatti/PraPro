/* INDEX PARA ORDENAR AS ESPECIALIZA��ES PELO NOME */
CREATE INDEX ixEsp
on Hospital.Specialization(nomeEspecializacao);

/* TABELA PARA ORDENAR AS ESPECIALIZA��ES DOS M�DICOS POR ESPECIALIZA��O */
CREATE CLUSTERED INDEX ixEspDoc
on Hospital.DoctorSpecialization(idEspecializacao)

/* INDEX PARA ORDENAR OS LOGINS DE M�DICO PELO CRM */
CREATE CLUSTERED INDEX ixUserDoc
on Hospital.UsernameDoctor(CRM);

/* INDEX PARA ORDENAR OS LOGINS DE ATENDENTES PELO ID */
CREATE CLUSTERED INDEX ixUserAte
on Hospital.UsernameAttendant(idAtendente);

/* INDEX PARA ORDENAR AS CONSULTAS PELO ID DO PACIENTE */
CREATE CLUSTERED INDEX ixQuery
on Hospital.Query(idPaciente, CRM);

/* COMANDOS DE CONTROLE DE INDEX */
DROP INDEX ixEsp on Hospital.Specialization
DROP INDEX ixEspDoc on Hospital.DoctorSpecialization
DROP INDEX ixUserDoc on Hospital.UsernameDoctor
DROP INDEX ixUserAte on Hospital.UsernameAttendant
DROP INDEX ixUserDoc on Hospital.UsernameDoctor

-- alter table 'nomeDaTabela' drop constraint 'nomeDoIndexPK'