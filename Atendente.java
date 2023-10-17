public class Atendente {

private int idAtendente;
private String nomeAtendente;
private String sobrenome;
private String email;
private String telefone;
private String senha;
private String CPF;
private double salario;

    public Atendente(int idAtendente, String nomeAtendente, String sobrenome, String email, String telefone, String senha, String CPF, double salario) {
        this.idAtendente = idAtendente;
        this.nomeAtendente = nomeAtendente;
        this.sobrenome = sobrenome;
        this.email = email;
        this.telefone = telefone;
        this.senha = senha;
        this.CPF = CPF;
        this.salario = salario;
    }
    public String toString(){
        return this.idAtendente+" "+this.nomeAtendente+" "+this.sobrenome+" "+this.email+" "+this.telefone+" "+this.senha+" "+this.CPF+" "+this.salario;
    }
    }
                                                      
