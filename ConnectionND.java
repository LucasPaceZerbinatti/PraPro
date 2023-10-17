import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.InetAddress;
import java.net.Socket;

class ConnectionND {
    
    private final Socket socket;
    private final PrintWriter out;
    private final BufferedReader in;

     public ConnectionND(Socket s) throws IOException{
        
            this.socket = s;
            this.in = new BufferedReader(new InputStreamReader(s.getInputStream()));
            this.out = new PrintWriter(s.getOutputStream());

    }

    public InetAddress getAddress(){
        return socket.getInetAddress();
    }

    public String getMessage(){
        try{
            return in.readLine();
        } catch (IOException e){
            return e.getMessage();
        }
    }
    public boolean sendMessage(String str){
        out.println(str);
        return !out.checkError();
    }

    public void close() throws IOException {
        in.close();
        out.close();
        socket.close();
    }


}