public class Medico {
private int CRM;
private String nomeMedico;
private String sobrenome;
private String email;
private String telefone;
private String senha;
private float salario;
private String[] espec = new String[0];

    public Medico(int CRM, String nomeMedico, String sobrenome, String email, String telefone, float salario, String senha) {
        this.CRM = CRM;
        this.nomeMedico = nomeMedico;
        this.sobrenome = sobrenome;
        this.email = email;
        this.telefone = telefone;
        this.salario = salario;
        this.senha = senha;
    }
    public String toString(){
        String texto = this.CRM + " "+this.nomeMedico + " "+this.sobrenome+ " "+this.email+" "+this.telefone+" "+this.salario+ " "+this.senha+" ";
        for (int i= 0; i< this.espec.length; i++){
            texto += this.espec[i] + " ";
        }
        return texto;
    }
    public void addEspec(String espec) {
        String[] newEspec = new String[this.espec.length + 1];
        for (int i = 0; i < this.espec.length; i++){
            newEspec[i] = this.espec[i];
        }
        newEspec[newEspec.length - 1] = espec;
        this.espec = newEspec;
    }
    public String[] getEspec(){
        return this.espec;
    }

    public int getCRM(){
        return this.CRM;
    }
    

}