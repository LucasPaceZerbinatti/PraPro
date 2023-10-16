import java.sql.*;
import javax.sql.*;
public class Hospital {
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
    }

    public static void adiconaMedicos(){
        try {
            PreparedStatement stmt = con.prepareStatement("Select * from Hospital.doctor");
            ResultSet resultado = stmt.executeQuery();
            int i = 0;
            while (resultado.next()){
                PreparedStatement stmtSenha = con.prepareStatement("select * from Hospital.UsernameDoctor where CRM = "+resultado.getInt("CRM"));
                ResultSet resultadoSenha = stmtSenha.executeQuery();
                Medico[] medicos = new Medico[500];
                String senha = resultadoSenha.getString("senha");
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
            // TODO: handle exception
        }
    }

}
