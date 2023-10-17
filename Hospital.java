import java.io.IOException;
import java.net.Socket;
import java.sql.*;
public class Hospital {
    public static Atendente[] atendentes = new Atendente[500];
    public static Medico[] medicos = new Medico[500];
    public static Paciente[] pacientes = new Paciente[500];
    public static Consulta[] consultas = new Consulta[500];
    public static int qtsMedicos = 0;
    public static int qtsPacientes = 0;
    public static Connection con;
    public static void main(String[] args) throws IOException{
        String url = "jdbc:sqlserver://;servername=regulus.cotuca.unicamp.br;encrypt=false;integratedSecurity=false;authenticationScheme=JavaKerberos";
        try {
            System.setProperty("java.net.preferIPv6Addresses", "true");
            Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        
        try {
            con = DriverManager.getConnection(url, "BD23158", "BD23158");
            System.out.println("Conexao realizada");
        } catch (Exception ex) {
            throw new RuntimeException(ex.getMessage());
        }
        adiconaMedicos();
        adicionaAtendentes();
        adicionaPacientes();
        adicionaConsultas();
            ConnectionND conexao  = new ConnectionND(new Socket("127.0.0.1",8000));

            System.out.print("Conectado a  " + conexao.getAddress());
            System.out.print("Mensagem a enviar: ");
            String mensagem = "givas gay";
            conexao.sendMessage(mensagem);
            System.out.println(conexao.getMessage());
            conexao.close();
            
            
    }
    public static void adiconaMedicos(){
        try {
            PreparedStatement stmt = con.prepareStatement("Select * from Hospital.doctor");
            ResultSet resultado = stmt.executeQuery();
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
                medicos[qtsMedicos] = medico;
                System.out.println(medicos[qtsMedicos].toString());
                qtsMedicos = qtsMedicos + 1;
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
    
    public static void adicionaPacientes() {
        try {
            PreparedStatement stmt = con.prepareStatement("select * from Hospital.Patient");
            ResultSet resultado = stmt.executeQuery();
            while (resultado.next()){
                Paciente paciente = new Paciente(resultado.getInt("idPaciente"), resultado.getString("nomePaciente"), resultado.getString("sobrenome"), resultado.getString("email"), resultado.getString("telefone"),resultado.getString("CPF"),resultado.getString("estado"), resultado.getDate("dataNascimento"));
                pacientes[qtsPacientes] = paciente;
                System.out.println(pacientes[qtsPacientes].toString());
                qtsPacientes += 1;
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    public static void adicionaConsultas() {
        int i = 0;
        try {
            PreparedStatement stmt = con.prepareStatement("select * from Hospital.Query");
            ResultSet resultado = stmt.executeQuery();
            while (resultado.next()){
                Consulta consulta = new Consulta(resultado.getInt("idConsulta"), resultado.getTimestamp("horaInicio"), resultado.getTimestamp("horaFim"), resultado.getString("observacoes"), Vetores.buscaMedico(resultado.getInt("CRM")), Vetores.buscaPaciente(resultado.getInt("idPaciente")), resultado.getBoolean("concluido"), resultado.getString("medicamentos"));
                consultas[i] = consulta;
                System.out.println(consultas[i].toString());
                i += 1;
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

}
