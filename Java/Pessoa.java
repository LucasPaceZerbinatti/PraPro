package Java;
public class Pessoa {
    protected String nome;
    protected String sobrenome;
    protected String email;
    protected String telefone;


    public Pessoa(String nome, String sobrenome, String email, String telefone) {
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.email = email;
        this.telefone = telefone;
    }

    public String getNome() {
        return this.nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getSobrenome() {
        return this.sobrenome;
    }

    public void setSobrenome(String sobrenome) {
        this.sobrenome = sobrenome;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelefone() {
        return this.telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    @Override
    public String toString() {
        return "{" +
            " nome='" + this.nome + "'" +
            ", sobrenome='" + this.sobrenome + "'" +
            ", email='" + this.email + "'" +
            ", telefone='" + this.telefone + "'" +
            "}";
    }

    
    public boolean equals(Pessoa that){
        return this.nome.equals(that.getNome()) && this.sobrenome.equals(that.getSobrenome()) && this.email.equals(that.getEmail()) && this.telefone.equals(that.getTelefone());
    }
}
