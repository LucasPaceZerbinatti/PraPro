package Java;
import java.sql.Date;

public class Paciente extends Pessoa{
private int idPaciente;
private Date dataNascimento;
private String cpf;
private String estado;

    public Paciente(int idPaciente, String nomePaciente, String sobrenome, String email, String telefone, String cpf, String estado, Date dataNascimento) {
        super(nomePaciente,sobrenome,email,telefone);
        this.idPaciente = idPaciente;
        this.cpf = cpf;
        this.dataNascimento = dataNascimento;
        this.estado = estado;
        
    }

    @Override
    public String toString() {
        return this.idPaciente+" "+super.getNome()+" "+super.getSobrenome()+" "+super.getEmail()+" "+super.getTelefone()+" "+this.cpf+" "+this.dataNascimento+" "+this.estado;
    }
    


    public int getIdPaciente() {
        return this.idPaciente;
    }

    public void setIdPaciente(int idPaciente) {
        this.idPaciente = idPaciente;
    }

    public Date getDataNascimento() {
        return this.dataNascimento;
    }

    public void setDataNascimento(Date dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public String getCpf() {
        return this.cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getEstado() {
        return this.estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }




    }

