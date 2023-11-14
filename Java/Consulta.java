package Java;
import java.sql.Timestamp;

public class Consulta {
    private int idConsulta;
    private Timestamp horaInicio;
    private Timestamp horaFim;
    private String observacoes;
    private Medico medico;
    private Paciente paciente;
    private boolean concluido;
    private String medicamento;
    
    public Consulta(int idConsulta, Timestamp horaInicio, Timestamp horaFim, String observacoes, Medico medico, Paciente paciente, boolean concluido, String medicamento) {
        this.idConsulta = idConsulta;
        this.horaFim = horaFim;
        this.horaInicio = horaInicio;
        this.observacoes = observacoes;
        this.medico = medico;
        this.paciente = paciente;
        this.concluido = concluido;
        this.medicamento = medicamento;
    }

    public String toString() {
        return this.idConsulta+" "+this.horaFim+" "+this.horaInicio+" "+this.observacoes+" "+this.medico+" "+this.paciente+" "+this.concluido+" "+this.medicamento;
    }


    public int getIdConsulta() {
        return this.idConsulta;
    }

    public void setIdConsulta(int idConsulta) {
        this.idConsulta = idConsulta;
    }

    public Timestamp getHoraInicio() {
        return this.horaInicio;
    }

    public void setHoraInicio(Timestamp horaInicio) {
        this.horaInicio = horaInicio;
    }

    public Timestamp getHoraFim() {
        return this.horaFim;
    }

    public void setHoraFim(Timestamp horaFim) {
        this.horaFim = horaFim;
    }

    public String getObservacoes() {
        return this.observacoes;
    }

    public void setObservacoes(String observacoes) {
        this.observacoes = observacoes;
    }

    public Medico getMedico() {
        return this.medico;
    }

    public void setMedico(Medico medico) {
        this.medico = medico;
    }

    public Paciente getPaciente() {
        return this.paciente;
    }

    public void setPaciente(Paciente paciente) {
        this.paciente = paciente;
    }

    public boolean isConcluido() {
        return this.concluido;
    }

    public boolean getConcluido() {
        return this.concluido;
    }

    public void setConcluido(boolean concluido) {
        this.concluido = concluido;
    }

    public String getMedicamento() {
        return this.medicamento;
    }

    public void setMedicamento(String medicamento) {
        this.medicamento = medicamento;
    }

}
