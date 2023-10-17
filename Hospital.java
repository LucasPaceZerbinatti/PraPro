import java.sql.*;
import javax.sql.*;
public class Hospital {
    public static Atendente[] atendentes = new Atendente[500];
    public static Medico[] medicos = new Medico[500];
    public static Connection con;
    public static void main(String[] args) {
        String url = "jdbc:sqlserver://;servername=regulus.cotuca.unicamp.br;encrypt=false;integratedSecurity=false;authenticationScheme=JavaKerberos";
        try {
            System.setProperty("java.net.preferIPv6Addresses", "true");
            Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
        } catch (Exception e) {
            // TODO: handle exception
        }
        
        try {
            con = DriverManager.getConnection(url, "BD23158", "BD23158");
            System.out.println("Conexao realizada");
        } catch (Exception ex) {
            throw new RuntimeException(ex.getMessage());
        }
        adiconaMedicos();
        adicionaAtendentes();
    }

    public static void adiconaMedicos(){
        try {
            PreparedStatement stmt = con.prepareStatement("Select * from Hospital.doctor");
            ResultSet resultado = stmt.executeQuery();
            int i = 0;
            while (resultado.next()){
                PreparedStatement stmtSenha = con.prepareStatement("Select * from Hospital.UsernameDoctor where CRM = "+resultado.getInt("CRM"));
                ResultSet resultadoSenha = stmtSenha.executeQuery();
                resultadoSenha.next();
                Medico medico = new Medico(resultado.getInt("CRM"), resultado.getString("nomeMedico"), resultado.getString("sobrenome"), resultado.getString("email"), resultado.getString("telefone"), resultado.getFloat("salario"), resultadoSenha.getString("senha"));
                PreparedStatement stmtEspec = con.prepareStatement("select s.nomeEspecializacao from "+
                "Hospital.DoctorSpecialization ds, "+
                "Hospital.Specialization s "+
                "where ds.CRM = "+resultado.getInt("CRM")+" and ds.idEspecializacao = s.idEspecializacao");
                ResultSet resultadoEspec = stmtEspec.executeQuery();

                while (resultadoEspec.next()) {
                    String espec = resultadoEspec.getString("nomeEspecializacao");
                    medico.addEspec(espec);
                }
                medicos[i] = medico;
                System.out.println(medicos[i].toString());
                i = i + 1;
            }
        } catch (Exception e) {
           System.out.println(e.getMessage());
        }
    }

    public static void adicionaAtendentes(){
        int i = 0;
        try {
            PreparedStatement stmt = con.prepareStatement("select * from Hospital.Attendant");
            ResultSet resultado = stmt.executeQuery();
            while (resultado.next()){
            PreparedStatement stmtSenha = con.prepareStatement("Select senha from Hospital.UsernameAttendant where idAtendente = "+resultado.getInt("idAtendente"));
            ResultSet resultadoSenha = stmtSenha.executeQuery();
            resultadoSenha.next();
            Atendente atendente = new Atendente(resultado.getInt("idAtendente"), resultado.getString("nomeAtendente"), resultado.getString("sobrenome"), resultado.getString("email"), resultado.getString("telefone"), resultadoSenha.getString("senha"), resultado.getString("CPF"), resultado.getDouble("salario"));
            atendentes[i] = atendente;
            System.out.println(atendentes[i].toString());
            i += 1;
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

}
