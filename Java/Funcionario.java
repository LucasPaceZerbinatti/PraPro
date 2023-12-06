package Java;

public class Funcionario extends Pessoa{
    protected double salario;
    protected String senha;

    Funcionario(double salario, String nome, String sobrenome, String email, String telefone, String senha){
        super(nome,sobrenome,email,telefone);
        this.salario = salario;
        this.senha = senha;
    }


    public double getSalario() {
        return this.salario;
    }

    public void setSalario(double salario) {
        this.salario = salario;
    }

    public String getSenha() {
        return this.senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }


    @Override
    public String toString() {
        return "{" +
            " salario='" + this.salario + "'" +
            ", senha='" + this.senha + "'" +
            ", nome='" + super.getNome() + "'" +
            ", sobrenome='" + super.getSobrenome() + "'" +
            ", email='" + super.getEmail() + "'" +
            ", telefone='" + super.getTelefone() + "'" +
            "}";
    }
    
}
