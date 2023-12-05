/* VIEW PARA A SELE��O DOS M�DICOS E SUAS RESPECTIVAS ESPECIALIZA��ES */
CREATE OR ALTER VIEW V_DoctorSpec as
SELECT Hospital.Doctor.nome + ' ' + Hospital.Doctor.sobrenome as nomeMedico, Hospital.Specialization.nomeEspec FROM
	   Hospital.DoctorSpecialization INNER JOIN Hospital.Doctor on DoctorSpecialization.CRM = Doctor.CRM INNER JOIN 
	   Hospital.Specialization on DoctorSpecialization.idEspecializacao = Specialization.idEspecializacao

SELECT * FROM V_DoctorSpec
DROP VIEW V_DoctorSpec