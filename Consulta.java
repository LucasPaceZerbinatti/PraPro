import java.sql.Date;

public class Consulta {
    private int idConsulta;
    private Date horaInicio;
    private Date horaFim;
    private String observacoes;
    private Medico medico;
    private Paciente paciente;
    private boolean concluido;
    private String medicamento;
    
    public Consulta(int idConsulta, Date horaInicio, Date horaFim, String observacoes, Medico medico, Paciente paciente, boolean concluido, String medicamento) {
        this.idConsulta = idConsulta;
        this.horaFim = horaFim;
        this.horaInicio = horaInicio;
        this.observacoes = observacoes;
        this.medico = medico;
        this.paciente = paciente;
        this.concluido = concluido;
        this.medicamento = medicamento;
    }
    public Consulta(int idConsulta, Date horaInicio, String observacoes, Medico medico, Paciente paciente) {
        this.idConsulta = idConsulta;
        this.horaInicio = horaInicio;
        this.observacoes = observacoes;
        this.medico = medico;
        this.paciente = paciente;
    }
    public String toString() {
        return this.idConsulta+" "+this.horaFim+" "+this.horaInicio+" "+this.observacoes+" "+this.medico+" "+this.paciente+" "+this.concluido+" "+this.medicamento;
    }
}
