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
import OPENBEXI.BEXI_XMLDriver;
import OPENBEXI.BEXI_list;
import OPENBEXI.BEXI_results;
import org.w3c.dom.Document;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.URL;
import java.sql.*;
import java.util.Properties;


public class OPENBEXI_Creative_csv extends HttpServlet {

    private HttpServletResponse _response;
    private BEXI_ApplicationPath _applicationPath;

    public OPENBEXI_Creative_csv(HttpServletResponse response, BEXI_ApplicationPath applicationPath) {
        _response = response;
        _applicationPath = applicationPath;
    }

    private char ob_getSeparator(String path) {
        char c = '/';
        if (path == null) return c;
        for (int i = path.length() - 1; i >= 0; i--) {
            if (path.charAt(i) == '/') {
                return '/';
            }
            if (path.charAt(i) == '\\') {
                return '\\';
            }
        }
        return c;
    }

    private void ob_error(Document doc, BEXI_XMLDriver xml, String message) {
        try {
            doc = xml.set_class_object_attribute_value(doc, "ob_explorer", "status", "text", message);
            if (_response != null) {
                _response.setContentType("text/xml");
                _response.setHeader("Cache-Control", "no-cache");
                _response.getWriter().write(xml.XMLSerializer(doc));
            }
        } catch (Exception e) {
            System.err.println("Exception:" + e.getMessage());
        }
    }

    public String ob_readCSV_header(Document docOut) {
        final BEXI_XMLDriver xml = new BEXI_XMLDriver();
        String filename = null;
        String extension = null;
        String header = null;
        try {
            File path_dir = new File(_applicationPath.getDefaultWebPagesPath());
            String path = xml.get_class_object_attribute_value(docOut, "file", "csv", "path");
            filename = xml.get_class_object_attribute_value(docOut, "file", "csv", "name");
            extension = xml.get_class_object_attribute_value(docOut, "file", "csv", "extension");
            filename = filename.replace(extension, "");
            FileInputStream fis = new FileInputStream(path_dir.getCanonicalPath() + ob_getSeparator(path_dir.getCanonicalPath()) + path + ob_getSeparator(path_dir.getCanonicalPath()) + filename + extension);
            BufferedInputStream bis = new BufferedInputStream(fis);
            DataInputStream dis = new DataInputStream(bis);
            while (dis.available() != 0) {
                header = dis.readLine();
                break;
            }
            dis.close();
            bis.close();
            fis.close();
        } catch (Exception e) {
            System.err.println("Exception:" + e.getMessage());
        }
        return header;
    }

    public void ob_writeCSVFile(Document docOut) {
        String model_data = null;
        try {
            final BEXI_XMLDriver xml = new BEXI_XMLDriver();
            File path_dir = new File(_applicationPath.getDefaultWebPagesPath());
            String path = xml.get_class_object_attribute_value(docOut, "file", "csv", "path");
            String filename = xml.get_class_object_attribute_value(docOut, "file", "csv", "name");
            String extension = xml.get_class_object_attribute_value(docOut, "file", "csv", "extension");
            String separator = xml.get_class_object_attribute_value(docOut, "file", "csv", "separator");
            filename = filename.replace(extension, "");
            String div_id = xml.get_class_object_attribute_value(docOut, "ob_request", "object", "id");
            String data_change = xml.get_class_object_attribute_value(docOut, "url", div_id, "data_change");
            String model = xml.get_class_object_attribute_value(docOut, "url", div_id, "model");
            model = model.trim();

            OutputStream out = new FileOutputStream(path_dir.getCanonicalPath() + ob_getSeparator(path_dir.getCanonicalPath()) + path + ob_getSeparator(path_dir.getCanonicalPath()) + filename + extension);
            if (model != null && !model.equals(""))
                new PrintStream(out).println(model.replaceAll(",", separator));
            int count = 0;
            String data = "";
            while (true) {
                data = xml.get_class_object_attribute_value(docOut, "url", div_id, "data_" + count++);
                if (data == null) break;
                if (!data.equals(""))
                    new PrintStream(out).println(data.replaceAll(",", separator));
            }
            out.close();
        } catch (Exception e) {
            System.err.println("Exception:" + e.getMessage());
        }
    }

    public void ob_readCSVFile(Document docOut) {
        final BEXI_XMLDriver xml = new BEXI_XMLDriver();
        Connection conn = null;
        String filename = null;
        final BEXI_XMLDriver xmlResponse = new BEXI_XMLDriver();
        try {
            String mode = xml.get_class_object_attribute_value(docOut, "file", "csv", "mode");
            filename = xml.get_class_object_attribute_value(docOut, "file", "csv", "name");
            String path = xml.get_class_object_attribute_value(docOut, "file", "csv", "path");
            BEXI_ApplicationPath applicationPath = new BEXI_ApplicationPath();
            File filetmp = new File(applicationPath.getDefaultPath());
            String separator = xml.get_class_object_attribute_value(docOut, "file", "csv", "separator");
            if (separator == null) separator = ",";
            String extension = xml.get_class_object_attribute_value(docOut, "file", "csv", "extension");
            if (extension == null) extension = ".csv";
            String div_id = xml.get_class_object_attribute_value(docOut, "ob_request", "object", "id");
            String change_model = xml.get_class_object_attribute_value(docOut, "page", div_id, "change_model");
            String data_change = xml.get_class_object_attribute_value(docOut, "url", div_id, "data_change");

            File path_dir = new File(_applicationPath.getDefaultWebPagesPath());
            String path_dir_canonical = path_dir.getCanonicalPath() + ob_getSeparator(path_dir.getCanonicalPath()) + path;
            if (!new File(path_dir_canonical).exists()) {
                System.err.println("Error: Directory not found: " + path_dir_canonical);
                String message = "Cannot found " + path_dir_canonical;
                ob_error(docOut, xml, message);
                return;
            }

            if (data_change.equals("dropped")) {
                if (new File(path_dir_canonical + ob_getSeparator(path_dir_canonical) + filename + extension).exists()) {
                    new File(path_dir_canonical + ob_getSeparator(path_dir_canonical) + filename + extension).delete();
                    new File(path_dir_canonical + ob_getSeparator(path_dir_canonical) + filename + extension).createNewFile();
                } else {
                    new File(path_dir_canonical + ob_getSeparator(path_dir_canonical) + filename + extension).createNewFile();
                }
            }

            if (!new File(path_dir_canonical + ob_getSeparator(path_dir_canonical) + filename + extension).exists()) {
                System.err.println("Error: CSV file not found: " + path_dir_canonical + ob_getSeparator(path_dir_canonical) + filename + extension);
                String message = "Cannot found " + path_dir_canonical + ob_getSeparator(path_dir_canonical) + filename + extension;
                ob_error(docOut, xml, message);
                return;
            }

            // Update the cvs file if change has been done
            if (data_change.equals("true") || data_change.equals("dropped"))
                this.ob_writeCSVFile(docOut);

            Class.forName("org.relique.jdbc.csv.CsvDriver");
            Properties props = new java.util.Properties();
            props.put("separator", separator);
            props.put("fileExtension", extension);
            conn = DriverManager.getConnection("jdbc:relique:csv:" + path_dir_canonical, props);
            Statement stmt = conn.createStatement();
            String header = ob_readCSV_header(docOut);
            String[] query = new String[1];
            query[0] = "SELECT " + header + " FROM " + filename.replace(extension, "");
            System.out.println(query[0]);
            ResultSet results = stmt.executeQuery(query[0]);

            OPENBEXI_Creative_MetaData data = new OPENBEXI_Creative_MetaData(_applicationPath, _response);
            BEXI_list requestLN = new BEXI_list();
            requestLN.add("requestCSVdata");
            BEXI_list status = new BEXI_list();
            status.add("OK");

            BEXI_results bexi_result = new BEXI_results();
            bexi_result.set_SQL_query(query);
            bexi_result.set_resultSet(results);
            Object result[] = new Object[1];
            result[0] = bexi_result;
            data.sendResults(docOut, requestLN, result, status);
            conn.close();

        } catch (Exception e) {
            if (conn != null) try {
                conn.close();
            } catch (SQLException e1) {
            }
            System.err.println("Exception:" + e.getMessage());
            String message = "Cannot read " + filename + "  " + e.getMessage();
            ob_error(docOut, xml, message);
        }

    }

    public static void main(String args[]) {
        try {
            int c;
            InputStream is = null;
            String path_dir;
            String filename;
            Boolean test_http_url = false;
            if (test_http_url) {
                filename = "employees.csv";
                path_dir = "http://www.openbexi.com/table/";
                URL csv = new URL(path_dir + filename);
                BufferedReader in = new BufferedReader(new InputStreamReader(csv.openStream()));
                String inputLine;
                while ((inputLine = in.readLine()) != null)
                    System.out.println(inputLine);

                in.close();
            } else {
                filename = "movies";
                BEXI_ApplicationPath applicationPath = new BEXI_ApplicationPath();
                File file = new File(applicationPath.getDefaultPath());
                path_dir = file.getCanonicalPath() + "/table";
            }
            Class.forName("org.relique.jdbc.csv.CsvDriver");

            Properties props = new java.util.Properties();

            //props.put("separator","|");                // separator is a bar
            //props.put("suppressHeaders","true");       // first line contains data
            //props.put("fileExtension",".txt");         // file extension is .txt
            //props.put("charset","ISO-8859-2");         // file encoding is "ISO-8859-2"
            //props.put("maxFileSize",10000);            // max size of files in bytes.
            //props.put("create","true");                // driver will create directory(s)
            //props.put("lineBreakEscape","ELB");        // all line breaks will be replaces with ELB
            //props.put("carriageReturnEscape","ECR");   // all carriage return will be replaces with ECR
            //props.put("useQuotes","true");             // all values in output file will be wrapped with double quotes ( " )

            Connection conn = DriverManager.getConnection("jdbc:relique:csv:" + path_dir, props);
            Statement stmt = conn.createStatement();
            ResultSet results = stmt.executeQuery("SELECT Title, Year, Producer, picture, check, link FROM " + filename);
            while (results.next()) {
                System.out.println("Title= " + results.getString("Title") + "   Year= " + results.getString("Year") + "   picture= " + results.getString("picture"));
            }

            // clean up
            results.close();
            stmt.close();
            conn.close();


        }
        catch (Exception e) {
            e.printStackTrace();
        }
        finally {
            System.exit(0);
        }
    }
}


