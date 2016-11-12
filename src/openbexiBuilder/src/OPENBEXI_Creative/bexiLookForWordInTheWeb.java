/* This notice must be untouched at all times.

Copyright (c) 2005-2013 JC Arcaz. All rights reserved.
OPEN OPENBEXI Creative: server side for generating dynanic HTML page and html code source from browsers.Works with OPEN OPENBEXI HTML Builder
updated: September 28 2013 version 5.0
The latest version is available at http://www.openbexi.com

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.

*/

package OPENBEXI_Creative;

import OPENBEXI.BEXI_URL;

import javax.servlet.ServletConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;


public class bexiLookForWordInTheWeb extends HttpServlet {


    String path;
    String bexi_path;

    /**
     * Initialize global variables
     *
     * @param config
     * @throws ServletException
     */
    public void init(ServletConfig config) throws ServletException {
        super.init(config);


        ServletContext con = config.getServletContext();
        //Get the full path for the src directory
        path = con.getRealPath("/");
        System.out.println("path=" + path);
        bexi_path = con.getInitParameter("BEXI_PATH");
        System.out.println("BEXI_PATH=" + bexi_path);

    }

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        out.println("<html>");
        out.println("<body>");
        out.println("<head>");
        out.println("<title>Request Parameters Example ... </title>");
        out.println("</head> ");
        out.println("<body bgcolor='white'> ");
        out.println("<h3>Request Parameters Example 3</h3>  ");
        out.println("Parameters in this request:<br>    ");
        out.println("No Parameters, Please enter some ... ");
        out.println("<P>");
        out.println("<form action='bexiLookForWordInTheWeb' method=Post>");
        out.println("First word 1:    ");
        out.println("<input type=text size=20 name=word1>");
        out.println("<br> ");
        out.println("Second word  2: ");
        out.println("<input type=text size=20 name=word2> ");
        out.println("<br>    ");
        out.println("reponse  : ");
        out.println("<input type=text size=80 name=reponse> ");
        out.println("<br>    ");
        out.println("<input type=submit>");
        out.println("</form>");
        out.println("</body>");
        out.println("</html>");

    }

    /**
     * @param request
     * @param response
     * @throws ServletException
     * @throws IOException
     */
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        // Set argument
        //String verb = args[0];
        //String prep = args[1];
        //int nbWord = Integer.parseInt(args[2]);
        //String outPutFile = verb + prep + "_parseOutFile.txt";
        //String url = args[3];

        response.setContentType("text/html");

        String word1 = request.getParameter("word1");
        String word2 = request.getParameter("word2");
        System.out.println("word1=" + word1);
        System.out.println("word2=" + word2);

        String res = "";
        int nbWord = Integer.parseInt("5");
        BEXI_URL page1 = new BEXI_URL();
        String url = "http://www.stop-smoking-easy.com/giving-up-smoking.html";
        res = page1.lookForWordsInTheWeb(word1, word2, nbWord, url);
        System.out.println("res=" + res);


        if (res.trim().equals("")) {
            res = "Sorry, there is no answer for this request ...";
        }

        PrintWriter out = response.getWriter();
        out.println("<html>");
        out.println("<body>");
        out.println("<head>");
        out.println("<title>Request Parameters Example </title>");
        out.println("</head> ");
        out.println("<body bgcolor='white'> ");
        out.println("<h3>Request Parameters Example 4</h3>  ");
        out.println("Parameters in this request:<br>    ");
        out.println("No Parameters, Please enter some ");
        out.println("<P>");
        out.println("<form action='bexiLookForWordInTheWeb' method=Post>");
        out.println("First word 1:    ");
        out.println("<input type=text size=20 name=word1>");
        out.println("<br> ");
        out.println("Second word  2: ");
        out.println("<input type=text size=20 name=word2> ");
        out.println("<br>    ");
        out.println("reponse  : ");
        out.println("<input type=text size=80 name=reponse VALUE=");
        out.println('"' + res + '"');
        out.println(" SIZE=3> ");
        out.println("<br>    ");
        out.println("<input type=submit>");
        out.println("</form>");
        out.println("</body>");
        out.println("</html>");

    }
}
