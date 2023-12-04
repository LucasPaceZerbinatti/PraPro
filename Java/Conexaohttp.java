package Java;
import java.net.URL;
import java.nio.charset.Charset;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.io.InputStreamReader;
import java.io.BufferedReader;
import java.io.PrintStream;
public class Conexaohttp {
    private HttpURLConnection con;
    private URL url;
    private String data;
public Conexaohttp() throws IOException{
    this.url = new URL("http://localhost:8000");
    con = (HttpURLConnection) url.openConnection();
}

public void get() throws IOException{
    int status = con.getResponseCode();
    BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream(), "UTF-8"));
    String inputLine;
    StringBuffer content = new StringBuffer();
    while ((inputLine = in.readLine()) != null) {
        Charset.forName("UTF-8").encode(inputLine);
    content.append(inputLine);
}
this.data = content.toString();
in.close();
con.disconnect();

}

public String getData(){
    return this.data;
}

public void post(String mensagem) throws IOException{
    HttpURLConnection connection = (HttpURLConnection) url.openConnection();
    try {
        connection.setRequestMethod("POST");
        connection.setRequestProperty("Accept", "utf-8"); //fala o que vai mandar

        connection.setDoOutput(true); //fala que voce vai enviar algo
    

        PrintStream printStream = new PrintStream(connection.getOutputStream(), false, "UTF-8");
        Charset.forName("utf-8").encode(mensagem);
        printStream.println("dados="+mensagem); //seta o que voce vai enviar
        connection.connect(); //envia para o servidor
    
        try(BufferedReader br = new BufferedReader(
        new InputStreamReader(connection.getInputStream(), "utf-8"))) {
        StringBuilder response = new StringBuilder();
        String responseLine = null;
        while ((responseLine = br.readLine()) != null) {
        response.append(responseLine.trim());
    } System.out.println(response);
}
    } catch (Exception e) {
        System.out.println(e.getMessage());
    }

}
}
