package Java;

import java.io.IOException;
import java.sql.*;
import java.util.Arrays;
import java.util.concurrent.ExecutionException;

public class Hospital {
    public static Atendente[] atendentes = new Atendente[500];
    public static Medico[] medicos = new Medico[500];
    public static Paciente[] pacientes = new Paciente[500];
    public static Consulta[] consultas = new Consulta[500];
    public static int qtsMedicos = 0;
    public static int qtsPacientes = 0;
    public static Connection con;
    public static ConnectionND conexao;
    public static String[] dados;
    public static String mensagem;
    public static int CRM;
    public static Conexaohttp conexaohttp;

    public static void main(String[] args) throws IOException {
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

        String[] aux = {};
        while (true) {
            try {
                conexaohttp = new Conexaohttp();
                conexaohttp.get();
                String dado = conexaohttp.getData();
                dados = dado.split(";,");
                if (Arrays.equals(aux, dados) == false) {
                    aux = dados;
                    System.out.println(Arrays.toString(dados));
                    switch (dados[0]) {
                        case "logar":
                            logar();
                            conexaohttp.post(mensagem);
                            break;
                        case "calendario":
                            calendario();
                            conexaohttp.post(mensagem);
                            break;
                        case "consultaCalendario":
                            consultaCalendario();
                            conexaohttp.post(mensagem);
                            break;
                        case "enviaEstado":
                            enviaEstado();
                            break;
                        case "addMedicamento":
                            addMedicamento();
                            break;
                        case "logarAtendente":
                            logarAtendente();
                            conexaohttp.post(mensagem);
                            break;
                        default:
                            break;
                    }

                }

            } catch (Exception e) {
                continue;
            }

        }

    }

    public static void consultaCalendario() {
        mensagem = "";
        int dia = Integer.parseInt(dados[1]);
        int mes = Integer.parseInt(dados[2]);
        int ano = Integer.parseInt(dados[3]);
        String texto;
        mes += 1;
        try {
            PreparedStatement stmtConsultas = con
                    .prepareStatement("Exec GET_ConsultasJAVA " + CRM + ", " + dia + ", " + mes + ", " + ano);
            ResultSet resultadoConsultas = stmtConsultas.executeQuery();
            while (resultadoConsultas.next()) {
                if (resultadoConsultas.getInt("concluido") == 1) {
                    texto = "finalizada";
                } else {
                    texto = "pendente";
                }
                mensagem += resultadoConsultas.getTime("horaInicio") + ";," + resultadoConsultas.getString("nome")
                        + ";,"
                        + resultadoConsultas.getString("observacoes") + ";,"
                        + resultadoConsultas.getString("medicamentos") + ";," + texto + ";,"
                        + resultadoConsultas.getInt("idConsulta") + ";,";
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

    }

    public static void logarAtendente(){
        String email = dados[1];
        String senha = dados[2];
        
    }

    public static void logar() {
        try {
            CRM = Integer.parseInt(dados[1]);
        } catch (Exception e) {
            CRM = 0;
        }
        System.out.println(CRM);
        Medico medico = Vetores.buscaMedico(CRM);
        String senha = dados[2];
        if (medico != null && senha.equals(medico.getSenha())) {
            mensagem = "true";
        }

        else {
            mensagem = "false";

        }

    }

    public static void calendario() {
        mensagem = "";
        try {
            int mes = Integer.parseInt(dados[1]);
            int ano = Integer.parseInt(dados[2]);
            for (int i = 1; i <= 31; i++) {
                PreparedStatement stmtData = con.prepareStatement(
                        "select count(Hospital.query.idConsulta) as quantos from Hospital.query where YEAR(horaInicio) = "
                                + ano + " and MONTH(horaInicio) = " + mes + " and DAY(horaInicio) = " + i
                                + " and CRM = " + CRM);
                ResultSet resultadoData = stmtData.executeQuery();
                while (resultadoData.next()) {
                    System.out.println(resultadoData.getInt("quantos"));
                    mensagem += resultadoData.getInt("quantos") + ";,";
                }
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

    }

    public static void enviaEstado() {
        try {
            PreparedStatement stmtEstado = con.prepareStatement(
                    "update Hospital.query set concluido = " + dados[2] + " where idConsulta = " + dados[1]);
            stmtEstado.executeQuery();
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

    }

    public static void addMedicamento() {
        System.out.println(dados[2]);
        try {
            PreparedStatement stmtMedicamento = con.prepareStatement(
                    "update Hospital.query set medicamentos = '" + dados[2] + "' where idConsulta = '" + dados[1]
                            + "'");
            stmtMedicamento.executeQuery();
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    public static void adiconaMedicos() {
        try {
            PreparedStatement stmt = con.prepareStatement("Select * from Hospital.doctor");
            ResultSet resultado = stmt.executeQuery();
            while (resultado.next()) {
                PreparedStatement stmtSenha = con.prepareStatement(
                        "Select * from Hospital.UsernameDoctor where CRM = " + resultado.getInt("CRM"));
                ResultSet resultadoSenha = stmtSenha.executeQuery();
                resultadoSenha.next();
                Medico medico = new Medico(resultado.getInt("CRM"), resultado.getString("nome"),
                        resultado.getString("sobrenome"), resultado.getString("email"), resultado.getString("telefone"),
                        resultado.getFloat("salario"), resultadoSenha.getString("senha"));
                PreparedStatement stmtEspec = con.prepareStatement("select s.nomeEspec from " +
                        "Hospital.DoctorSpecialization ds, " +
                        "Hospital.Specialization s " +
                        "where ds.CRM = " + resultado.getInt("CRM") + " and ds.idEspecializacao = s.idEspecializacao");
                ResultSet resultadoEspec = stmtEspec.executeQuery();

                while (resultadoEspec.next()) {
                    String espec = resultadoEspec.getString("nomeEspec");
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

    public static void adicionaAtendentes() {
        int i = 0;
        try {
            PreparedStatement stmt = con.prepareStatement("select * from Hospital.Attendant");
            ResultSet resultado = stmt.executeQuery();
            while (resultado.next()) {
                PreparedStatement stmtSenha = con
                        .prepareStatement("Select senha from Hospital.UsernameAttendant where idAtendente = "
                                + resultado.getInt("idAtendente"));
                ResultSet resultadoSenha = stmtSenha.executeQuery();
                resultadoSenha.next();
                Atendente atendente = new Atendente(resultado.getInt("idAtendente"), resultado.getString("nome"),
                        resultado.getString("sobrenome"), resultado.getString("email"), resultado.getString("telefone"),
                        resultadoSenha.getString("senha"), resultado.getString("CPF"), resultado.getDouble("salario"));
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
            while (resultado.next()) {
                Paciente paciente = new Paciente(resultado.getInt("idPaciente"), resultado.getString("nome"),
                        resultado.getString("sobrenome"), resultado.getString("email"), resultado.getString("telefone"),
                        resultado.getString("CPF"), resultado.getString("estado"), resultado.getDate("dataNascimento"));
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
            while (resultado.next()) {
                Consulta consulta = new Consulta(resultado.getInt("idConsulta"), resultado.getTimestamp("horaInicio"),
                        resultado.getTimestamp("horaFim"), resultado.getString("observacoes"),
                        Vetores.buscaMedico(resultado.getInt("CRM")),
                        Vetores.buscaPaciente(resultado.getInt("idPaciente")), resultado.getBoolean("concluido"),
                        resultado.getString("medicamentos"));
                consultas[i] = consulta;
                System.out.println(consultas[i].toString());
                i += 1;
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

}
