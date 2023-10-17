import java.sql.Date;

public class Paciente {
private int idPaciente;
private String nomePaciente;
private String sobrenome;
private String email;
private String telefone;
private Date dataNascimento;
private String cpf;
private String estado;

    public Paciente(int idPaciente, String nomePaciente, String sobrenome, String email, String telefone, String cpf, String estado, Date dataNascimento) {
        this.idPaciente = idPaciente;
        this.nomePaciente = nomePaciente;
        this.sobrenome = sobrenome;
        this.email = email;
        this.telefone = telefone;
        this.cpf = cpf;
        this.dataNascimento = dataNascimento;
        this.estado = estado;
        
    }

    public String toString() {
        return this.idPaciente+" "+this.nomePaciente+" "+this.sobrenome+" "+this.email+" "+this.telefone+" "+this.cpf+" "+this.dataNascimento+" "+this.estado;
    }
    
    public int getIdPaciente(){
        return this.idPaciente;
    }
    }

