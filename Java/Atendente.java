package Java;
public class Atendente extends Funcionario{

private int idAtendente;
private String CPF;

    public Atendente(int idAtendente, String nomeAtendente, String sobrenome, String email, String telefone, String senha, String CPF, double salario) {
        super(salario,nomeAtendente,sobrenome,email,telefone,senha);
        this.idAtendente = idAtendente;
        this.CPF = CPF;
    }


    public int getIdAtendente() {
        return this.idAtendente;
    }

    public void setIdAtendente(int idAtendente) {
        this.idAtendente = idAtendente;
    }

    public String getCPF() {
        return this.CPF;
    }

    public void setCPF(String CPF) {
        this.CPF = CPF;
    }


    @Override
    public String toString() {
        return "{" +
            " idAtendente='" + getIdAtendente() + "'" +
            ", CPF='" + getCPF() + "'" +
            " salario='" + this.salario + "'" +
            ", senha='" + this.senha + "'" +
            ", nome='" + super.getNome() + "'" +
            ", sobrenome='" + super.getSobrenome() + "'" +
            ", email='" + super.getEmail() + "'" +
            ", telefone='" + super.getTelefone() + "'" +
            "}";
    }


    }
                                                      
