package fr.imt.ales.cepi.demo.lobby;

import fr.imt.ales.cepi.demo.Server;

import java.io.*;
import java.util.ArrayList;
import java.util.Arrays;

import javax.servlet.*;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;

@WebServlet("/info")

public class lobbyinfo extends HttpServlet{

    public void doGet(HttpServletRequest request,
                      HttpServletResponse response)
            throws ServletException, IOException {

        // Recupere la session
        HttpSession session = request.getSession();
        // Recupere les parametres du jeu
        session.setAttribute("langue",request.getParameter("language"));
        session.setAttribute("temps",request.getParameter("drawing_time"));
        session.setAttribute("manches",request.getParameter("rounds"));
        session.setAttribute("max",request.getParameter("max_players"));
        session.setAttribute("publique",request.getParameter("public"));
        session.setAttribute("mots",request.getParameter("custom_words"));
        session.setAttribute("proba",request.getParameter("custom_words_chance"));


        Server.getInstance().createLobby(1,request.getParameter("language"),
                Integer.parseInt(request.getParameter("drawing_time")),
                Integer.parseInt(request.getParameter("rounds")),
                Integer.parseInt(request.getParameter("max_players")),
                Boolean.parseBoolean(request.getParameter("public")),
                getListFromString(request.getParameter("custom_words")),
                Integer.parseInt(request.getParameter("custom_words_chance"))
                );

        request.getRequestDispatcher("jsp/paint.jsp").forward(request, response);

        System.out.println(Server.getInstance().lobbies.size());
    }

    private ArrayList<String> getListFromString(String s){
        return new ArrayList<String>(Arrays.asList(s.split(", ")));
    }
}








