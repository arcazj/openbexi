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

import org.jsoup.nodes.Document;
import org.jsoup.Jsoup;

import javax.servlet.http.HttpServletResponse;
import javax.swing.text.AttributeSet;
import javax.swing.text.MutableAttributeSet;
import javax.swing.text.html.HTML;
import javax.swing.text.html.HTMLEditorKit;
import javax.swing.text.html.parser.ParserDelegator;
import java.awt.*;
import java.io.*;
import java.util.Enumeration;

public class OPENBEXI_Creative_parser extends HTMLEditorKit.ParserCallback {

    private String _page = null;
    private String _OPENBEXI_DATA_XML = null;
    private boolean _pageLoaded = false;
    private String _current_tag = null;
    private String _current_DIV_CLASSE = null;
    private String _current_DIV_ID = null;
    private List _result;
    private String _current_style = null;
    private String _current_att_without_style_and_id = null;
    private String _tab = "";
    private HttpServletResponse _response = null;

    /**
     * OPENBEXI Creative parser class.
     *
     * @param response;
     */
    public OPENBEXI_Creative_parser(HttpServletResponse response) {
        _page = "";
        _response = response;
        _current_DIV_ID = "";
        _current_DIV_CLASSE = "";
    }

    /**
     * @return _current_DIV_ID
     */
    public String get_current_DIV_ID() {
        return _current_DIV_ID;
    }

    /**
     * Set current style according CSS.
     *
     * @param attributes;
     */
    public void set_current_style(AttributeSet attributes) {
        Enumeration e = attributes.getAttributeNames();
        while (e.hasMoreElements()) {
            Object name = e.nextElement();
            Object value = attributes.getAttribute(name);
            if ((name.toString().equals("style") || name.toString().equals("STYLE"))) {
                _current_style = value.toString();
                return;
            }
        }
    }

    /**
     * Set current attribute (no CSS).
     *
     * @param attributes;
     */
    public void set_current_att_without_style_and_id(AttributeSet attributes) {
        _current_att_without_style_and_id = "";
        Enumeration e = attributes.getAttributeNames();
        while (e.hasMoreElements()) {
            Object name = e.nextElement();
            Object value = attributes.getAttribute(name);
            if (!(name.toString().equals("style") || name.toString().equals("STYLE")) && !(name.toString().equals("id") || name.toString().equals("ID"))) {
                if (name.toString().equals("classe")) {
                    _current_att_without_style_and_id += name.toString().toUpperCase() + "=\"" + value.toString().trim() + "\" ";
                } else {
                    _current_att_without_style_and_id += name.toString() + "=\"" + value.toString().trim() + "\" ";

                }
            }
        }
    }

    /**
     * Set current div according id and attributes.
     *
     * @param attributes;
     */
    public void set_current_DIV_ID(AttributeSet attributes) {
        Enumeration e = attributes.getAttributeNames();
        while (e.hasMoreElements()) {
            Object name = e.nextElement();
            Object value = attributes.getAttribute(name);
            if ((name.toString().equals("ID") || name.toString().equals("id"))) {
                _current_DIV_ID = value.toString().trim();
                return;
            }
        }
    }

    /**
     * Set current div according classe name and attributes.
     *
     * @param attributes;
     */
    public void set_current_DIV_CLASSE(AttributeSet attributes) {
        Enumeration e = attributes.getAttributeNames();
        while (e.hasMoreElements()) {
            Object name = e.nextElement();
            Object value = attributes.getAttribute(name);
            if ((name.toString().equals("CLASSE") || name.toString().equals("classe"))) {
                _current_DIV_CLASSE = value.toString().trim();
                return;
            }
        }
    }

    /**
     * @param attributes;
     * @return attributes.
     */
    private String listAttributes(AttributeSet attributes) {
        String att = "";
        Enumeration e = attributes.getAttributeNames();
        while (e.hasMoreElements()) {
            Object name = e.nextElement();
            Object value = attributes.getAttribute(name);
            if (name.toString().equals("classe")) {
                att += name.toString().toUpperCase() + "=\"" + value.toString().trim() + "\" ";
            } else {
                att += name.toString() + "=\"" + value.toString().trim() + "\" ";
            }
        }
        return att;
    }

    /**
     * @param attributes;
     * @return true or false.
     */
    private boolean is_endTag(AttributeSet attributes) {
        String att = "";
        Enumeration e = attributes.getAttributeNames();
        while (e.hasMoreElements()) {
            Object name = e.nextElement();
            Object value = attributes.getAttribute(name);
            if (name.toString().equals("endtag") && value.toString().equals("true")) return true;
        }
        return false;
    }

    /**
     * @param data;
     * @param pos;
     */
    public void handleText(char[] data, int pos) {
        if (_OPENBEXI_DATA_XML != null) return;
        for (int i = 0; i < data.length; i++) {
            _page += data[i];
        }
        //System.out.println("---------------------------"+new String(data));
    }

    /**
     * @param err;
     * @param pos;
     */
    public void handleError(String err, int pos) {
        //System.out.println("error: " + err);
    }

    public void flush() {
    }

    public void handleComment(char[] text, int position) {
        if (_OPENBEXI_DATA_XML != null) return;
        //_page += "<!-- ";
        //_page += text;
        //_page += " -->" + System.getProperty("line.separator");
        //System.out.println("--------------------------"+text);
    }

    /**
     * @param t;
     * @param a;
     * @param pos;
     */
    public void handleStartTag(HTML.Tag t, MutableAttributeSet a, int pos) {
        if (_OPENBEXI_DATA_XML != null) return;
        _current_tag = t.toString().toUpperCase();
        set_current_style(a);
        set_current_att_without_style_and_id(a);
        if (t.equals(HTML.Tag.HTML)) {
            _page = "";
            _page += "<" + t.toString().toUpperCase() + " ";
            _page += listAttributes(a) + "> ";
        } else if (t.equals(HTML.Tag.SCRIPT)) {
            _page += System.getProperty("line.separator") + _tab + "<" + t.toString().toUpperCase() + " ";
            _page += listAttributes(a) + "> ";
            if (listAttributes(a).contains("OPENBEXI_DATA_XML")) {
                _OPENBEXI_DATA_XML = "found";
                _page += "\n" + _tab + "   var OPENBEXI_DATA_XML = \'<openbexiCreative><classe name=\"bexicontext\"><object name=\"path\"><attribute name=\"home\" home=\"webapps\\OPENBEXI_Creative\\\"/><attribute name=\"class\" class=\"webapps\\OPENBEXI_Creative\\\"/><attribute name=\"metarules\" metarules=\"webapps\\OPENBEXI_Creative\\data\\metaRules\\\"/><attribute name=\"xml\" xml=\"webapps\\OPENBEXI_Creative\\data\\XML\\\"/><attribute name=\"pictures\" pictures=\"webapps\\OPENBEXI_Creative\\data\\pictures\\\"/><attribute name=\"icons\" icons=\"webapps\\OPENBEXI_Creative\\data\\icons\\\"/></object><object name=\"browser\"><attribute name=\"\"/></object><object name=\"os\"><attribute name=\"\"/></object><object name=\"language\"><attribute name=\"English\"/></object><object name=\"connection\"><attribute name=\"url\" url=\"http://localhost:8080\"/><attribute name=\"port\" port=\"80\"/><attribute name=\"asynchron\" asynchron=\"true\"/><attribute name=\"synchron\" synchron=\"false\"/><attribute name=\"post\" post=\"true\"/><attribute name=\"get\" get=\"false\"/><attribute name=\"user\" user=\"root\"/><attribute name=\"passwd\" passwd=\"\" /></object><object name=\"database\"><attribute name=\"driver\" driver=\"com.mysql.jdbc.Driver\"/><attribute name=\"url\" url=\"jdbc:mysql:///bexi\"/><attribute name=\"user\" user=\"root\"/><attribute name=\"passwd\" passwd=\"\" /><attribute name=\"type\" type=\"sql\"/></object></classe></openbexiCreative>\';";
                return;
            }
            if (listAttributes(a).contains("walterzorn")) {
                _page += "SET_DHTML(RESIZABLE, CURSOR_MOVE, TRANSPARENT)";
                return;
            }
            if (listAttributes(a).contains("openbexi_requirement1")) {
                _page += "\n" + _tab + "  if (getBrowser() == \"ie7\" || getBrowser() == \"ie7_no_XMLHttpRequest\")my_PickFunc('BODY')";
                return;
            }
            if (listAttributes(a).contains("openbexi_requirement2")) {
                _page += "\n" + _tab + "  dojo.addOnLoad(load_openbexiBuilder);";
                _page += "\n" + _tab + "  dojo.require(\"dojo.widget.*\");";
                _page += "\n" + _tab + "  dojo.require(\"dojo.widget.ComboBox\");";
                _page += "\n" + _tab + "  dojo.require(\"dojo.widget.Checkbox\");";
                _page += "\n" + _tab + "  dojo.require(\"dojo.widget.Clock\");";
                _page += "\n" + _tab + "  dojo.require(\"dojo.widget.DatePicker\");";
            }
        } else {
            if (t.equals(HTML.Tag.DIV)) {
                set_current_DIV_ID(a);
                set_current_DIV_CLASSE(a);
            }
            _tab += "  ";
            _page += System.getProperty("line.separator") + _tab + "<" + t.toString().toUpperCase() + " ";
            _page += listAttributes(a) + "> ";
        }
    }

    /**
     * @param t;
     * @param pos;
     */
    public void handleEndTag(HTML.Tag t, int pos) {
        if (_OPENBEXI_DATA_XML != null && !t.equals(HTML.Tag.SCRIPT)) {
            return;
        }
        _OPENBEXI_DATA_XML = null;
        // Add end tag
        _tab = _tab.replaceFirst(" ", "");
        _tab = _tab.replaceFirst(" ", "");
        _page += _tab + "</" + t.toString().toUpperCase() + "> " + System.getProperty("line.separator");
        if (t.equals(HTML.Tag.DIV)) {
            _current_DIV_ID = "";
        }
        // End tag: Display page
        if (t.equals(HTML.Tag.HTML) && !_pageLoaded) {
            _pageLoaded = true;
            System.out.println("\n\n============================Result=========================");
            System.out.println("Page After :" + System.getProperty("line.separator") + _page);
            PrintWriter out = null;
            try {
                if (_response != null) {
                    out = _response.getWriter();
                }
            } catch (IOException e) {
            }
        }

    }

    /**
     * @param t;
     * @param a   ;
     * @param pos ;
     */
    public void handleSimpleTag(HTML.Tag t, MutableAttributeSet a, int pos) {
        if (_OPENBEXI_DATA_XML != null) return;
        _current_tag = t.toString().toUpperCase();
        _tab += "  ";
        if (t.equals(HTML.Tag.LINK)) {
            _page += _tab + "<" + t.toString().toUpperCase() + " ";
            _page += listAttributes(a) + ">" + System.getProperty("line.separator");
        } else {
            if (is_endTag(a)) {
                _page += _tab + "</" + t.toString().toUpperCase() + ">" + System.getProperty("line.separator");

            } else {
                _page += _tab + "<" + t.toString().toUpperCase() + " ";
                _page += listAttributes(a) + ">";
            }
        }
        _tab = _tab.replaceFirst(" ", "");
        _tab = _tab.replaceFirst(" ", "");
        //System.err.println(t.toString().toUpperCase());
    }

    /**
     * @param response;
     * @param htmlPage  ;
     */
    public void update(HttpServletResponse response, String htmlPage) {
        try {
            StringReader myStringReader = new StringReader(htmlPage);
            ParserDelegator parser = new ParserDelegator();
            HTMLEditorKit.ParserCallback callback = new OPENBEXI_Creative_parser(response);
            parser.parse(myStringReader, callback, false);
        } catch (IOException e) {
            System.err.println(e.getMessage());
        }
    }

    /**
     * Parse HTML page.
     *
     * @param file
     * @return
     */
    public Document parseWebPage(File file) {
        Document docOut = null;
        try {
            File input = new File(file.getAbsoluteFile().toString());
            docOut = Jsoup.parse(input, "UTF-8", "http://example.com/");
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }
        return docOut;
    }

    /**
     * @param filePath;
     * @return file data
     * @throws java.io.IOException;
     */
    public String ob_readFileAsString(String filePath)
            throws java.io.IOException {
        StringBuffer fileData = new StringBuffer(1000);
        BufferedReader reader = new BufferedReader(
                new FileReader(filePath));
        char[] buf = new char[1024];
        int numRead = 0;
        while ((numRead = reader.read(buf)) != -1) {
            String readData = String.valueOf(buf, 0, numRead);
            fileData.append(readData);
            buf = new char[8024];
        }
        reader.close();
        return fileData.toString();
    }

    /**
     * @param argv;
     */
    public static void main(String argv[]) {
        String pageHtml = "";
        boolean testHtml = false;
        boolean testFile_via_HTMLEditorKit = false;
        boolean testFile_via_DOMParser = false;
        boolean test_index_jsp_File_via_HTMLEditorKit = false;
        boolean test_google_via_HTMLEditorKit = true;

        //===============HTML testing====================================================
        if (test_google_via_HTMLEditorKit) {

        }
        if (testHtml) {
            pageHtml = "<HTML >\n" +
                    "<HEAD >\n" +
                    "<TITLE >\n" +
                    "openbexi</TITLE>\n" +
                    "<LINK rel=\"stylesheet\" href=\"./openbexi.css\" type=\"text/css\" >\n" +
                    "</SCRIPT>\n" +
                    "</HEAD>\n" +
                    "<BODY onkeypress=\"return detectPaste(event);\" onload=\"load_openbexiBuilder();\" >\n" +
                    "<SCRIPT src=\"javascript/wz_dragdrop.js\" type=\"text/javascript\" >\n" +
                    "</SCRIPT>\n" +
                    "<IFRAME CLASSE=\"connected\" id=\"SaveFrame\" style=\"display:none\" ></IFRAME>\n" +
                    "<DIV CLASSE=\"DIV_LIST\" id=div2 style=\"backgroundRepeat:repeat; borderTopStyle:inset; backgroundPositionX:0%; borderLeftWidth:6px; borderLeftColor:pink; backgroundAttachment:scroll; borderRightStyle:inset; fontStyle:normal; background:url(gif/fadeCream2.jpg) #c3ffff; filter:Alpha(opacity=100); borderColor:pink pink blue; posWidth:100; left:108px; accelerator:false; borderBottomWidth:1px; borderBottomColor:blue; borderTopWidth:6px; borderTopColor:pink; borderBottomStyle:solid; cssText:BORDER-RIGHT: pink 6px inset; BORDER-TOP: pink 6px inset; FONT-WEIGHT: 200; FONT-SIZE: 150%; Z-INDEX: 53; BACKGROUND: url(gif/fadeCream2.jpg) #c3ffff; FILTER: Alpha(opacity=100); LEFT: 108px; BORDER-LEFT: pink 6px inset; WIDTH: 100px; CURSOR: move; BORDER-BOTTOM: blue 1px solid; FONT-STYLE: normal; FONT-FAMILY: Western; POSITION: absolute; TOP: 145px; HEIGHT: 148px; Margin: left; width:100px; cursor:move; fontSize:150%; backgroundPosition:0% 0%; fontFamily:Western; posHeight:148; borderRightColor:pink; backgroundColor:#c3ffff; posTop:145; zIndex:53; borderLeftStyle:inset; borderBottom:blue 1px solid; backgroundPositionY:0%; backgroundImage:url(gif/fadeCream2.jpg); borderWidth:6px 6px 1px; borderTop:pink 6px inset; fontWeight:200; posLeft:108; borderRightWidth:6px; borderStyle:inset inset solid; borderRight:pink 6px inset; position:absolute; top:145px; height:148px; borderLeft:pink 6px inset; Margin:left;\" >\n" +
                    "<UL CLASSE=\"LIST\" selected=\"false\" previousborderbottom=\"medium none\" style=\"WIDTH: 100%; BORDER-BOTTOM: medium none\" tag=\"ul\" id=\"list0\" >\n" +
                    "<LI id=div0_0 CLASSE=\"ITEM\" selected=\"false\" previousborderbottom=\"medium none\" tag=\"li\"  style=\"BORDER-BOTTOM: medium none\" onmouseover=alert(\"aaaa\") >jeter</LI>\n" +
                    "<LI id=div0_1 CLASSE=\"ITEM\" selected=\"false\" previousborderbottom=\"medium none\" tag=\"li\"  style=\"BORDER-BOTTOM: medium none\" onmouseover=alert(\"bbbb\") >couper</LI>\n" +
                    "<LI id=div0_2 CLASSE=\"ITEM\" selected=\"false\" previousborderbottom=\"medium none\" tag=\"li\"  style=\"BORDER-BOTTOM: medium none\">liquider</LI>\n" +
                    "<LI id=div0_3 CLASSE=\"ITEM\" selected=\"false\" previousborderbottom=\"medium none\" tag=\"li\"  style=\"BORDER-BOTTOM: medium none\">casser</LI>\n" +
                    "</UL>\n" +
                    "</DIV>\n" +
                    "<SCRIPT type=\"text/javascript\" subtype=\"walterzorn\" >\n" +
                    "    SET_DHTML(RESIZABLE, CURSOR_MOVE, TRANSPARENT)\n" +
                    "</SCRIPT>\n" +
                    "<SCRIPT src=\"javascript/openbexi_navigator_events.js\" language=\"javascript\" >\n" +
                    "</SCRIPT>\n" +
                    "</BODY>\n" +
                    "</HTML>";

            List list = new List();
            list.add("test1");
            list.add("test2");
            list.add("test3");
            list.add("test4");
            OPENBEXI_Creative_parser p = new OPENBEXI_Creative_parser(null);
            p.update(null, pageHtml);
            //===============HTML OPENBEXI FILE testing via DOM parser ====================================================
        }
        if (testFile_via_DOMParser) {
            OPENBEXI_Creative_parser p = new OPENBEXI_Creative_parser(null);
            p.parseWebPage(new File("C:\\Users\\arcaz-jca\\myProject\\openbexi\\apache-tomcat_7_0_22\\webapps\\OPENBEXI_Creative\\" + "no_name.html"));
        }
        //===============HTML FILE testing via HTMLEditorKit ====================================================
        if (testFile_via_HTMLEditorKit) {
            OPENBEXI_Creative_parser p = new OPENBEXI_Creative_parser(null);
            String file = System.getProperty("user.dir") + System.getProperty("file.separator") + "no_name.html";
            try {
                pageHtml = p.ob_readFileAsString(file);
            } catch (IOException e) {
                e.printStackTrace();
            }
            p.update(null, pageHtml);
        }
        //===============test_index_jsp_File_via_HTMLEditorKit ====================================================
        if (test_index_jsp_File_via_HTMLEditorKit) {
            OPENBEXI_Creative_parser p = new OPENBEXI_Creative_parser(null);
            String file = System.getProperty("user.dir") + System.getProperty("file.separator") + "openbexiBuilder" + System.getProperty("file.separator") + "html" + System.getProperty("file.separator") + "index.jsp";
            try {
                pageHtml = p.ob_readFileAsString(file);
            } catch (IOException e) {
                e.printStackTrace();
            }
            p.update(null, pageHtml);
        }
    }
}
