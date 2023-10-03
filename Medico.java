public class Medico {
private int CRM;
private String nomeMedico;
private String sobrenome;
private String email;
private String telefone;
private String senha;
private Especializacao[] espec;

    public Medico(int CRM, String nomeMedico, String sobrenome, String email, String telefone, String senha, Especializacao[] espec) {
        this.CRM = CRM;
        this.nomeMedico = nomeMedico;
        this.sobrenome = sobrenome;
        this.email = email;
        this.telefone = telefone;
        this.senha = senha;
        this.espec = espec;
    }
    }