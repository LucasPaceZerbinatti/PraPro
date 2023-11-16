/* INDEX PARA ORDENAR AS ESPECIALIZAÇÕES PELO NOME */
create index ixEsp
on Hospital.Specialization(nomeEspecializacao);

/* TABELA PARA ORDENAR AS ESPECIALIZAÇÕES DOS MÉDICOS POR ESPECIALIZAÇÃO */
create CLUSTERED index ixEspDoc
on Hospital.DoctorSpecialization(idEspecializacao)

/* INDEX PARA ORDENAR OS LOGINS DE MÉDICO PELO CRM */
create CLUSTERED index ixUserDoc
on Hospital.UsernameDoctor(CRM);

/* INDEX PARA ORDENAR OS LOGINS DE ATENDENTES PELO ID */
create CLUSTERED index ixUserAte
on Hospital.UsernameAttendant(idAtendente);

/* INDEX PARA ORDENAR AS CONSULTAS PELO ID DO PACIENTE */
create CLUSTERED index ixQuery
on Hospital.Query(idPaciente, CRM);

/* COMANDOS DE CONTROLE DE INDEX */
drop index ixEsp on Hospital.Specialization
drop index ixEspDoc on Hospital.DoctorSpecialization
drop index ixUserDoc on Hospital.UsernameDoctor
drop index ixUserAte on Hospital.UsernameAttendant
drop index ixUserDoc on Hospital.UsernameDoctor


-- alter table 'nomeDaTabela' drop constraint 'nomeDoIndexPK'