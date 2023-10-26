public class Vetores {
    public static Medico buscaMedico(int CRM){
        int inicio = 0;
        int fim = Hospital.qtsMedicos - 1;
        int ondeEsta;
        while (inicio <= fim) {
            ondeEsta = (fim + inicio) / 2;
            if (CRM == Hospital.medicos[ondeEsta].getCRM()) {
                return Hospital.medicos[ondeEsta];
            }
            else if (CRM < Hospital.medicos[ondeEsta].getCRM()) {
                fim = ondeEsta - 1;
            }
            else {
                inicio = ondeEsta + 1;
            }
        } return null;

    }
    public static Paciente buscaPaciente(int idPaciente){
        int inicio = 0;
        int fim = Hospital.qtsPacientes - 1;
        int ondeEsta;
        while (inicio <= fim) {
            ondeEsta = (fim + inicio) / 2;
            if (idPaciente == Hospital.pacientes[ondeEsta].getIdPaciente()) {
                return Hospital.pacientes[ondeEsta];
            }
            else if (idPaciente < Hospital.pacientes[ondeEsta].getIdPaciente()) {
                fim = ondeEsta - 1;
            }
            else {
                inicio = ondeEsta + 1;
            }
        } return null;
    }


        }
