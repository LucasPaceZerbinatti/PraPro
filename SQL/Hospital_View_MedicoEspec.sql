/* VIEW PARA A SELE��O DOS M�DICOS E SUAS RESPECTIVAS ESPECIALIZA��ES */
create or alter view V_DoctorSpec as
select Hospital.Doctor.CRM, Hospital.Doctor.nome + ' ' + Hospital.Doctor.sobrenome as nomeMedico, Hospital.Doctor.email, Hospital.Doctor.telefone, Hospital.Doctor.salario, 
	   Hospital.Specialization.nome from
	   Hospital.DoctorSpecialization inner join Hospital.Doctor on DoctorSpecialization.CRM = Doctor.CRM inner join 
	   Hospital.Specialization on DoctorSpecialization.idEspecializacao = Specialization.idEspecializacao

select * from V_DoctorSpec
drop view V_DoctorSpec