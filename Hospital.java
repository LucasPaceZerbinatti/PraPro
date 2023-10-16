import java.sql.*;
import javax.sql.*;
import SQLServerDriver.*;
public class Hospital {
    public static void main(String[] args) {
        String stringConexao = "Server=regulus.cotuca.unicamp.br;Database=BD23158;";
        String usuario = "BD23158";
        String senha = "BD23158";
    
        try {
            
            Class.forName("com.microsoft.jdbc.sqlserver.SQLServerDriver");
        }
        catch (Exception ex){
            throw new RuntimeException(ex.getMessage());
        }
        try {
            Connection con = DriverManager.getConnection(stringConexao, usuario, senha);
        } catch (Exception ex) {
            throw new RuntimeException(ex.getMessage());
        }
    }

}
