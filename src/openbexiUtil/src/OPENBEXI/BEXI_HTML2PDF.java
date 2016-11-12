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
package OPENBEXI;

import org.allcolor.yahp.converter.CYaHPConverter;
import org.allcolor.yahp.converter.IHtmlToPdfTransformer;

import java.net.URL;
import java.net.MalformedURLException;
import java.util.ArrayList;
import java.util.List;
import java.util.HashMap;
import java.util.Map;
import java.io.*;
import java.lang.reflect.Field;


public class BEXI_HTML2PDF {
    private String _pdf_filename;
    private String _url;
    private String _html;

    /**
     * Class which convert html file name or html code or URL to pdf file name by calling the convert_to_pdf method.
     * @param outfile
     * @param url
     * @param html filename if file exist or html code
     */
    public BEXI_HTML2PDF(String outfile, String url, String html) {
        _pdf_filename = outfile;
        _url = url;
        _html = html;
    }

    /**
     * Convert html file name or html code or URL to pdf file name.
     */
    public void convert_to_pdf() {
        // new converter
        CYaHPConverter converter = new CYaHPConverter();
        // save pdf in outfile
        File fout = new File(_pdf_filename);
        FileOutputStream out = null;

        try {
            out = new FileOutputStream(fout);
        } catch (FileNotFoundException e) {
            System.err.println(e);
            return;
        }
        // contains configuration properties
        Map properties = new HashMap();
        // list containing header/footer
        List headerFooterList = new ArrayList();
        properties.put(IHtmlToPdfTransformer.PDF_RENDERER_CLASS,
                IHtmlToPdfTransformer.FLYINGSAUCER_PDF_RENDERER);
        //properties.put(IHtmlToPdfTransformer.FOP_TTF_FONT_PATH, fontPath);
        try {
            if (_html != null) {
                _html = this.read_html_file(_html);
                converter.convertToPdf(_html, IHtmlToPdfTransformer.A4P, headerFooterList, null, out, properties);
            }
            if (_url != null)
                converter.convertToPdf(new URL(_url), IHtmlToPdfTransformer.A4P, headerFooterList, out, properties);
        } catch (IllegalStateException e) {
            System.err.println(e);
        } catch (Exception e) {
            System.err.println(e);
        }
        try {
            out.flush();
            out.close();
        } catch (Exception e) {
            System.err.println(e);
        }
    }

    /**
     * Read html filename if it exists, if not return the contain of html_file which should be html code.
     * @param html_file or rss file
     * @return html code.
     */
    private String read_html_file(String html_file) {
        String html_code = "";
        try {
            if (new File(html_file).exists()) {
                System.out.println("Reading "+html_file);
                String str;
                FileInputStream fis = new FileInputStream(html_file);
                BufferedInputStream bis = new BufferedInputStream(fis);
                DataInputStream dis = new DataInputStream(bis);
                while (dis.available() != 0) {
                    str = dis.readLine().replaceAll("&lt;", "<").replaceAll("&gt;", ">");
                    if (!str.contains("xml version") && !str.contains("<rss version") && !str.contains("rss>") && !str.contains("channel>") && !str.contains("language>") && !str.contains("description>") && !str.contains("item>"))
                        html_code += str.replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("title>", "h1>");
                }
                fis.close();
                bis.close();
                dis.close();
            } else {
                html_code = html_file;
            }
        } catch (Exception e) {
            System.err.println(e);
        }
        return html_code;
    }

    public static void main(String args[]) throws Exception {
        String pdf_filename = null;
        String url = null;
        String html = "";

        /*test*/
        /*html = "<html><head></head><body>" +
                "<a href='http://www.openbexi.html'><b>sourceForge</b></a>" +
                "<h1>try</h1>" +
                "<p>try again ... </p>" +
                "<p>try again ... </p>" +
                "<p>try again ... </p>" +
                "</body></html>";*/

        String s = "Starting html2pdf tool" + "(";
        for (int i = 0; i < args.length; i++) {
            s += args[i] + ",";
        }

        System.out.println(s + ")");
        if (args.length < 4) {
            System.err.println("USAGE: BEXI_HTML2PDF -output <pdf file name> -html <html code|html file name>");
            System.err.println("USAGE: BEXI_HTML2PDF -output <pdf file name> -url <URL>");
            System.err.println("   EX: BEXI_HTML2PDF -output foo.pdf -url http://www.google.com");
            return;
        }

        for (int i = 0; i < args.length; i++) {
            if (args[i].equals("-output"))
                pdf_filename = args[i + 1];
            if (args[i].equals("-html"))
                html = args[i + 1];
            if (args[i].equals("-url"))
                url = args[i + 1];
        }
        BEXI_HTML2PDF html2pdf = new BEXI_HTML2PDF(pdf_filename, url, html);
        html2pdf.convert_to_pdf();

    }
}
