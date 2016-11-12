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

import OPENBEXI.BEXI_ApplicationPath;
import OPENBEXI.BEXI_URL;
import OPENBEXI.BEXI_XMLDriver;
import org.w3c.dom.Document;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


public class OPENBEXI_Creative_google extends HttpServlet {

    private HttpServletResponse _response;
    private BEXI_ApplicationPath _applicationPath;
    private int _countValiding;

    public int get_countValiding() {
        return _countValiding;
    }

    public void set_countValiding(int _countValiding) {
        this._countValiding = _countValiding;
    }

    /**
     * @param response .
     */
    public OPENBEXI_Creative_google(HttpServletResponse response, BEXI_ApplicationPath applicationPath) {
        _response = response;
        _applicationPath = applicationPath;

    }

    private String dequote(String str) {
        str = str.replaceAll("&lt;", "<");
        str = str.replaceAll("&gt;", ">");
        str = str.replaceAll("&quot;", "\"");
        str = str.replaceAll("&amp;", "&");

        return (str);
    }

    public Document readImageFromURL(Document ob_doc, String urlS) {
        // Configure proxy ...
        System.setProperty("http.proxySet", "true");
        //System.setProperty("http.proxyHost", "xxx.xxx.xxx.xxx");
        System.setProperty("http.proxyPort", "80");
        System.setProperty("http.proxyType", "4");
        System.setProperty("http.agent", "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.0)");

        final BEXI_XMLDriver xml = new BEXI_XMLDriver();

        // Open URL ...
        URL url = null;
        try {
            url = new URL(urlS);
        } catch (MalformedURLException e) {
            //System.err.println(e.getMessage());
        }
        BufferedReader in = null;
        try {
            in = new BufferedReader(
                    new InputStreamReader(
                            url.openStream()
                    )
            );
        } catch (IOException e) {
            //System.err.println(e);
        }
        String text = "";
        // Read it ...
        String inputLine;
        if (in != null) {
            try {
                Pattern patternG = Pattern.compile("(\\.gif)|(\\.jpeg)|(\\.jpg)|(\\.tif)|(\\.png)|(\\.tiff)|(\\.riff)|(\\.bgi)|(\\.bmp)|(\\.svg)");
                while ((inputLine = in.readLine()) != null) {
                    //System.err.println("lengh=" + inputLine.length() + " " + inputLine);
                    Matcher matcher = patternG.matcher(inputLine.toLowerCase());
                    if (matcher.find()) {
                        text += inputLine + "\n";
                        String[] items = inputLine.split(",\"http://www.");
                        //System.out.println("---------------------------------");
                        Boolean foundImg;
                        int count = 0;
                        if (ob_doc == null) {
                            _countValiding = 0;
                        } else {
                            try {
                                _countValiding = 0;
                                //_countValiding = Integer.parseInt(xml.get_class_object_attribute_value(ob_doc, "ob_explorer", "file", "objectCount"));
                            } catch (Exception e) {
                                //System.err.println(e.getMessage());
                                _countValiding = 0;
                            }
                        }
                        String site = "";
                        String type = "";
                        for (int i = 0; i < items.length; i++) {
                            String[] subItems = items[i].split(",\"");
                            //System.out.println("---------->lengh=" + items[i].length() + " " + items[i]);
                            foundImg = true;
                            count = 0;
                            for (int j = 0; j < subItems.length; j++) {
                                if (foundImg) {
                                    if (j == 1 || j == 2) {
                                        try {
                                            int size = Integer.valueOf(subItems[j].replace("\"", ""));
                                            count++;
                                        } catch (Exception ex) {
                                            //System.err.println(ex.getMessage());
                                            foundImg = false;
                                        }
                                    }
                                    if (foundImg && j == 7) {
                                        type = subItems[7];
                                    }
                                    Pattern patternW = Pattern.compile("(www.)");
                                    Matcher matcherW = patternW.matcher(subItems[j]);
                                    if (foundImg && j == 8 && matcherW.find()) {
                                        count = j;
                                        site = dequote(subItems[j]).replaceAll("\"", "");
                                    }
                                }
                            }
                            if (foundImg && count >= 2) {
                                String image = "http://www." + dequote(subItems[0]).replaceAll("\"", "");
                                //System.out.println("image = "+image);
                                //System.out.println("size H= " + subItems[1].replace("\"", ""));
                                //System.out.println("size W= " + subItems[2].replace("\"", ""));
                                //System.out.println("type  = " + type);
                                //System.out.println("site  = " + site);
                                try {
                                    ob_doc = xml.set_class_object_attribute_value(ob_doc, "ob_explorer", "file_" + _countValiding, "filename", image);
                                    ob_doc = xml.set_class_object_attribute_value(ob_doc, "ob_explorer", "file_" + _countValiding, "type", "img");
                                    ob_doc = xml.set_class_object_attribute_value(ob_doc, "ob_explorer", "file_" + _countValiding, "website", site);
                                    ob_doc = xml.set_class_object_attribute_value(ob_doc, "ob_explorer", "file_" + _countValiding, "height", subItems[1].replace("\"", ""));
                                    ob_doc = xml.set_class_object_attribute_value(ob_doc, "ob_explorer", "file_" + _countValiding, "width", subItems[2].replace("\"", ""));
                                    _countValiding++;
                                } catch (Exception ex) {
                                    //System.err.println(ex.getMessage());
                                }
                            }
                        }
                        try {
                            ob_doc = xml.set_class_object_attribute_value(ob_doc, "ob_explorer", "file", "objectCount", String.valueOf(_countValiding));
                            ob_doc = xml.set_class_object_attribute_value(ob_doc, "ob_explorer", "file", "objectCountMax", String.valueOf(_countValiding));
                        } catch (Exception ex) {
                            //System.err.println(ex.getMessage());
                        }
                        //System.out.println("-------------------------------");
                        //System.out.println(inputLine);
                    }
                }
            } catch (IOException ex) {
                //System.err.println(ex.getMessage());
            }
        } else {
            try {
                ob_doc = xml.set_class_object_attribute_value(ob_doc, "ob_explorer", "file", "objectCount", "0");
                ob_doc = xml.set_class_object_attribute_value(ob_doc, "ob_explorer", "file", "objectCountMax", "0");
            } catch (Exception e) {
                //System.err.println(e.getMessage());
            }

        }

        try {
            if (in != null) in.close();
        } catch (IOException e) {
            //System.err.println(e.getMessage());
        }
        return ob_doc;
    }

    public static void main(String[] args) {
        Document doc = null;
        int step = 10;
        BEXI_URL page1 = new BEXI_URL();
        for (int i = 0; i < 1; i++) {
            String url = "http://images.google.com/images?q=icon&imgsz=icom&start=" + step;
            System.out.println(url);
            //String url = "http://images.google.com/images?q=icon&imgsz=icon&ndsp=21&svnum=100&um=1&hl=en&rls=com.microsoft:en-us:IE-SearchBox&rlz=1I7HPIA&start=0&sa=N";
            //String url = "http://images.google.com/images?q=icon&imgsz=icon&ndsp=21&svnum=100&um=1&hl=en&rls=com.microsoft:en-us:IE-SearchBox&rlz=1I7HPIA&start=" + step + "&sa=N";
            step = step + 20;
            //String url3 = "http://images.google.com/images?q=icon&imgsz=icon&ndsp=21&svnum=100&um=1&hl=en&rls=com.microsoft:en-us:IE-SearchBox&rlz=1I7HPIA&start=42&sa=N";
            //String   url4 ="http://images.google.com/images?q=icon&imgsz=icon&ndsp=21&svnum=100&um=1&hl=en&rls=com.microsoft:en-us:IE-SearchBox&rlz=1I7HPIA&start=63&sa=N";
            //String   url5 ="http://images.google.com/images?q=icon&imgsz=icon&ndsp=21&svnum=100&um=1&hl=en&rls=com.microsoft:en-us:IE-SearchBox&rlz=1I7HPIA&start=84&sa=N";
            //String   url6 ="http://images.google.com/images?q=icon&imgsz=icon&ndsp=21&svnum=100&um=1&hl=en&rls=com.microsoft:en-us:IE-SearchBox&rlz=1I7HPIA&start=105&sa=N";
            //String   url7 ="http://images.google.com/images?q=icon&imgsz=icon&ndsp=21&svnum=100&um=1&hl=en&rls=com.microsoft:en-us:IE-SearchBox&rlz=1I7HPIA&start=126&sa=N";

            OPENBEXI_Creative_google ob_google = new OPENBEXI_Creative_google(null, null);
            doc = ob_google.readImageFromURL(doc, url);
        }
        final BEXI_XMLDriver xml = new BEXI_XMLDriver();
        String s = xml.XMLSerializer(doc);
        System.out.println(s);

    }
}
