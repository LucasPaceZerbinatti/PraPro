package Java;
public class Medico extends Funcionario{

private int CRM;
private String[] espec = new String[0];

    public Medico(int CRM, String nomeMedico, String sobrenome, String email, String telefone, float salario, String senha) {
        super(salario,nomeMedico,sobrenome,email,telefone,senha);
        this.CRM = CRM;
    }

    @Override
    public String toString(){
        String texto = this.CRM + " "+super.getNome() + " "+super.getSobrenome()+ " "+super.getEmail()+" "+super.getTelefone()+" "+super.getSalario()+ " "+super.getSenha()+" ";
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

    public int getCRM() {
        return this.CRM;
    }

    public void setCRM(int CRM) {
        this.CRM = CRM;
    }

    public String[] getEspec() {
        return this.espec;
    }

    public void setEspec(String[] espec) {
        this.espec = espec;
    }

}
