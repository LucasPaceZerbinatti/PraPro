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
}
