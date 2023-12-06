package Java;

import java.io.IOException;
import java.sql.*;
import java.util.Arrays;

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
                        case "espec":
                            espec();
                            conexaohttp.post(mensagem);
                            break;
                        case "pegarTodoCalendario":
                            pegarTodoCalendario();
                            conexaohttp.post(mensagem);
                            break;
                        case "pegaMed":
                            pegaMed();
                            conexaohttp.post(mensagem);
                            break;
                        case "preencherCalendario":
                            preencherCalendario();
                            conexaohttp.post(mensagem);
                            break;
                        case "marcarConsulta":
                            marcarConsulta();
                            conexaohttp.post(mensagem);
                            break;
                        case "pegarMedEspec":
                            pegarMedEspec();
                            conexaohttp.post(mensagem);
                            break;
                        case "excluiConsulta":
                            excluiConsulta();
                            break;
                        case "confirmar":
                            conexaohttp.post("true");
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

    public static void excluiConsulta(){
        mensagem = "";
        try {
            PreparedStatement stmt = con.prepareStatement("exec DELETE_DeletarConsultaJAVA "+dados[1]+","+dados[2]+","+dados[3]+","+dados[4]+",'"+dados[5]+"'");
            stmt.executeQuery();
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    public static void pegarMedEspec() {
        mensagem = "";
        try {
            PreparedStatement stmt = con.prepareStatement("exec GET_MedEspecJAVA '" + dados[1] + "'");
            ResultSet result = stmt.executeQuery();
            while (result.next()) {
                mensagem += result.getString("nomeMedico") + ";,";
            }
            System.out.println(mensagem);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

    }

    public static void marcarConsulta() {
        String CPF = dados[1];
        String obs = dados[2];
        String nome = dados[3];
        String horario = dados[4];
        String dia = dados[5];
        String mes = dados[6];
        String ano = dados[7];
        try {
            PreparedStatement stmt = con.prepareStatement("exec POST_MarcarConsultaJAVA '" + CPF + "','" + obs + "','" + nome
                    + "'," + dia + "," + mes + "," + ano + "," + horario);
            ResultSet result = stmt.executeQuery();
            while (result.next()) {
                mensagem = result.getString("resultado");

            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
            mensagem = "erro";
        }

    }

    public static void preencherCalendario() {
        mensagem = "";
        System.out.println("entrou");
        try {
            PreparedStatement stmt = con.prepareStatement("exec buscaPorData " + Integer.parseInt(dados[1]) + ", "
                    + Integer.parseInt(dados[2]) + ", " + Integer.parseInt(dados[3]));
            ResultSet result = stmt.executeQuery();
            while (result.next()) {
                mensagem += result.getInt("horario") + ";," + result.getString("medico") + ";,"
                        + result.getString("paciente") + ";,";
                System.out.println(mensagem);
            }
            System.out.println(mensagem);

        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

    }

    public static void pegaMed() {
        mensagem = "";
        try {
            PreparedStatement stmt = con
                    .prepareStatement("select nome, sobrenome from Hospital.Doctor order by nome, sobrenome");
            ResultSet result = stmt.executeQuery();
            while (result.next()) {
                mensagem += result.getString("nome") + " " + result.getString("sobrenome") + ";,";
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        System.out.println(mensagem);
    }

    public static void espec() {
        mensagem = "";
        try {
            PreparedStatement stmtEspec = con.prepareStatement("select nomeEspec from Hospital.Specialization");
            ResultSet resultEspec = stmtEspec.executeQuery();
            while (resultEspec.next()) {
                mensagem += resultEspec.getString("nomeEspec") + ";,";
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        System.out.println(mensagem);
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

    public static void logarAtendente() {
        String email = dados[1];
        String senha = dados[2];
        System.out.println(email);
        try {
            PreparedStatement stmtLogar = con.prepareStatement(
                    "select senha from Hospital.UsernameAttendant where emailCadastrado = '" + email + "'");
            ResultSet resultLogar = stmtLogar.executeQuery();
            while (resultLogar.next()) {
                if (resultLogar.getString("senha").equals(senha)) {
                    mensagem = "true";
                } else {
                    mensagem = "false";
                }
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
            mensagem = "false";
        }
    }

    public static void logar() {
        try {
            CRM = Integer.parseInt(dados[1]);
        } catch (Exception e) {
            CRM = 0;
        }
        System.out.println(CRM);
        try {
            PreparedStatement stmtLogar = con.prepareStatement("select senha from Hospital.UsernameDoctor where CRM = " + CRM);
            ResultSet resultLogar = stmtLogar.executeQuery();
            while (resultLogar.next()) {
                if (resultLogar.getString("senha").equals(dados[2])) {
                    mensagem = "true";
                } else {
                    mensagem = "false";
                }
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
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

    public static void pegarTodoCalendario() {
        mensagem = "";
        try {
            int mes = Integer.parseInt(dados[1]);
            int ano = Integer.parseInt(dados[2]);
            for (int i = 1; i <= 31; i++) {
                PreparedStatement stmtData = con.prepareStatement(
                        "select count(Hospital.query.idConsulta) as quantos from Hospital.query where YEAR(horaInicio) = "
                                + ano + " and MONTH(horaInicio) = " + mes + " and DAY(horaInicio) = " + i);
                ResultSet resultadoData = stmtData.executeQuery();
                while (resultadoData.next()) {
                    System.out.println(resultadoData.getInt("quantos"));
                    mensagem += resultadoData.getInt("quantos") + ";,";
                }

            }
            System.out.println(mensagem);
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

}
