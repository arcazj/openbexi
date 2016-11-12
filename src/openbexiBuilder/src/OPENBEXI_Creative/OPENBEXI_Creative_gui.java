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

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class OPENBEXI_Creative_gui extends HttpServlet {

    private String _url;
    private HttpServletRequest _request;
    private HttpServletResponse _response;

    public OPENBEXI_Creative_gui(String url, HttpServletRequest request, HttpServletResponse response) {
        _url = url;
        _request = request;
        _response = response;
    }

    /**
     * Update and foward new jsp page.
     *
     * @param htmlPage
     * @throws IOException
     * @throws ServletException
     */
    public void update(String htmlPage) throws IOException, ServletException {
        if (htmlPage == null) {
            if (_url != null) {
                System.out.println("forward default url:" + _url);
                RequestDispatcher page = _request.getRequestDispatcher(_url);
                page.forward(_request, _response);
            } else {
                OPENBEXI_Creative_parser bexiHTML = new OPENBEXI_Creative_parser(_response);
                htmlPage = bexiHTML.ob_readFileAsString("index.jsp");
                bexiHTML.update(_response, htmlPage);
            }
        } else {
            OPENBEXI_Creative_parser bexiHTML = new OPENBEXI_Creative_parser(_response);
            bexiHTML.update(_response, htmlPage);
        }
    }
}
