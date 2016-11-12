/* This notice must be untouched at all times.

Copyright (c) 2005-2012 JC Arcaz. All rights reserved.
 OPEN OPENBEXI HTML Builder for generating dynanic HTML page and html code source from browsers.
 updated: September 26 2013 version 5.0
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

 Note:
 OPEN OPENBEXI htmlbuilder uses dojo 1.0 (BSD License).
 OPEN OPENBEXI htmlbuilder uses the DHTML libraries from www.walterzorn.com for resizing and dragging pictures and layers (LGPL).
 */

package OPENBEXI_Creative;

import java.io.*;
import java.util.regex.Pattern;
import java.util.zip.CRC32;

class Filter implements FilenameFilter {

    public boolean accept(File dir, String name) {
        return Pattern.matches(".*\\.(java|js|xml|gif|jpeg|jpg|png|html|class|jar|css|jsp)", name);
        //  if only one extension to check :  "\\.jpg"
    }
}

public class OPENBEXI_package {
    private static boolean verify = false;
    private static int bufferSize = 1000 * 1024;

    public static Long ob_copyFile(File srcFile, File destFile) throws IOException {
        InputStream in = new FileInputStream(srcFile);
        OutputStream out = new FileOutputStream(destFile);

        CRC32 checksum = null;
        if (verify) {
            checksum = new CRC32();
            checksum.reset();
        }
        byte[] buffer = new byte[bufferSize];
        int bytesRead;
        while ((bytesRead = in.read(buffer)) >= 0) {
            if (verify) {
                assert checksum != null;
                checksum.update(buffer, 0, bytesRead);
            }
            out.write(buffer, 0, bytesRead);
        }
        out.close();
        in.close();
        if (verify) {
            assert checksum != null;
            return checksum.getValue();
        } else {
            return null;
        }
    }

    public void create() {
        Filter nf = new Filter();
        boolean FLAG_Versionning = true;
        try {
            File[] file_list_source = new File[36];
            file_list_source[0] = new File("source\\openbexiBuilder\\src\\OPENBEXI_Creative");
            file_list_source[1] = new File("source\\openbexiDictionary\\src\\BEXI_DICTIONARY");
            file_list_source[2] = new File("source\\openbexiNaturalLanguage\\src\\BEXI_TEST");
            file_list_source[3] = new File("source\\openbexiUtil\\src\\OPENBEXI");

            file_list_source[4] = new File("apache-tomcat_7\\webapps\\OPENBEXI_Creative\\javascript");

            file_list_source[5] = new File("apache-tomcat_7\\webapps\\OPENBEXI_Creative\\js");

            file_list_source[6] = new File("apache-tomcat_7\\webapps\\OPENBEXI_Creative\\images");

            file_list_source[7] = new File("apache-tomcat_7\\webapps\\OPENBEXI_Creative\\project\\openbexi_site");
            file_list_source[8] = new File("apache-tomcat_7\\webapps\\OPENBEXI_Creative\\project\\openbexi_site\\draft");

            file_list_source[9] = new File("apache-tomcat_7\\webapps\\OPENBEXI_Creative\\project\\ims_site");
            file_list_source[10] = new File("apache-tomcat_7\\webapps\\OPENBEXI_Creative\\project\\ims_site\\draft");

            file_list_source[11] = new File("apache-tomcat_7\\webapps\\OPENBEXI_Creative\\project\\tests");
            file_list_source[12] = new File("apache-tomcat_7\\webapps\\OPENBEXI_Creative\\project\\tests\\draft");

            file_list_source[13] = new File("apache-tomcat_7\\webapps\\OPENBEXI_Creative\\gif");
            file_list_source[14] = new File("apache-tomcat_7\\webapps\\OPENBEXI_Creative\\gifPlus");

            file_list_source[15] = new File("apache-tomcat_7\\webapps\\OPENBEXI_Creative\\WEB-INF\\classes\\BEXI_DICTIONARY");
            file_list_source[16] = new File("apache-tomcat_7\\webapps\\OPENBEXI_Creative\\WEB-INF\\classes\\OPENBEXI");
            file_list_source[17] = new File("apache-tomcat_7\\webapps\\OPENBEXI_Creative\\WEB-INF\\classes\\BEXI_TEST");
            file_list_source[18] = new File("apache-tomcat_7\\webapps\\OPENBEXI_Creative\\WEB-INF\\classes\\OPENBEXI_Creative");
            file_list_source[19] = new File("apache-tomcat_7\\webapps\\OPENBEXI_Creative\\WEB-INF\\lib");

            file_list_source[20] = new File("apache-tomcat_7\\webapps\\OPENBEXI_Creative\\css");

            file_list_source[21] = new File("apache-tomcat_7\\webapps\\OPENBEXI_Creative\\template\\ob_button");
            file_list_source[22] = new File("apache-tomcat_7\\webapps\\OPENBEXI_Creative\\template\\ob_calendar");
            file_list_source[23] = new File("apache-tomcat_7\\webapps\\OPENBEXI_Creative\\template\\ob_form");
            file_list_source[24] = new File("apache-tomcat_7\\webapps\\OPENBEXI_Creative\\template\\ob_list");
            file_list_source[25] = new File("apache-tomcat_7\\webapps\\OPENBEXI_Creative\\template\\ob_timeline\\bands");
            file_list_source[26] = new File("apache-tomcat_7\\webapps\\OPENBEXI_Creative\\template\\ob_timeline\\css");
            file_list_source[27] = new File("apache-tomcat_7\\webapps\\OPENBEXI_Creative\\template\\ob_timeline\\themes");
            file_list_source[28] = new File("apache-tomcat_7\\webapps\\OPENBEXI_Creative\\template\\ob_link");
            file_list_source[29] = new File("apache-tomcat_7\\webapps\\OPENBEXI_Creative\\template\\ob_dojo_editor");
            file_list_source[30] = new File("apache-tomcat_7\\webapps\\OPENBEXI_Creative\\template\\ob_page");
            file_list_source[31] = new File("apache-tomcat_7\\webapps\\OPENBEXI_Creative\\template\\ob_page\\small_business");
            file_list_source[32] = new File("apache-tomcat_7\\webapps\\OPENBEXI_Creative\\template\\ob_page\\small_business\\draft");
            file_list_source[33] = new File("apache-tomcat_7\\webapps\\OPENBEXI_Creative\\template\\ob_grid");

            file_list_source[34] = new File("apache-tomcat_7\\webapps\\OPENBEXI_Creative\\WEB-INF\\classes\\EmbeddedTomcat.class");
            file_list_source[35] = new File("apache-tomcat_7\\webapps\\OPENBEXI_Creative\\index.jsp");

            // Update version header
            if (FLAG_Versionning) {
                for (int i = 0; i < file_list_source.length; i++) {
                    try {
                        if (i < 6) {
                            String[] files = file_list_source[i].list(nf);
                            if (files == null) return;
                            for (int j = 0; j < files.length; j++) {
                                File source = new File(file_list_source[i].getPath() + "\\" + files[j]);
                                if (source.isFile() && (source.getName().contains(".js") || source.getName().contains(".java")) && !source.getName().equals("wz_jsgraphics.js") && !source.getName().equals("wz_dragdrop.js") && !source.getName().equals("OPENBEXI_package.java") && !source.getName().equals("unittest.js") && !source.getName().equals("builder.js") && !source.getName().equals("controls.js") && !source.getName().equals("effects.js") && !source.getName().equals("dragdrop.js") && !source.getName().equals("sound.js") && !source.getName().equals("slider.js") && !source.getName().equals("scriptaculous.js")) {
                                    try {
                                        BufferedReader in = new BufferedReader(new FileReader(source));
                                        File target = new File(source.getName() + ".tmp");
                                        PrintWriter out = new PrintWriter(target);

                                        String line; //a line in the file
                                        while ((line = in.readLine()) != null) {
                                            if (line.contains("Copyright (c)") && line.contains("Arcaz")) {
                                                out.println("Copyright (c) 2005-2013 JC Arcaz. All rights reserved."); //output the new line
                                                System.out.println("file versioning:" + source.getPath() + " --- " + line);
                                            } else if (line.contains("updated: November 17 2012 version 4.2")) {
                                                out.println("updated: September 28 2013 version 5.0"); //output the new line
                                                System.out.println(" --- " + line);
                                            } else if (line.contains("OPEN OPENBEXI htmlbuilder uses dojo Toolkit")) {
                                                out.println(" OPEN OPENBEXI htmlbuilder uses dojo Toolkit (http://dojotoolkit.org/).");
                                                System.out.println(" --- " + line);
                                            } else if (line.contains("OPEN OPENBEXI HTML Builder 2.0")) {
                                                out.println("OPEN OPENBEXI Creative: server side for generating dynanic HTML page and html code source from browsers.Works with OPEN OPENBEXI HTML Builder"); //output the new line
                                                System.out.println(" --- " + line);
                                            } else if (line.contains(" OPEN OPENBEXI htmlbuilder uses the DHTML libraries")) {
                                                out.println(" OPEN OPENBEXI htmlbuilder uses query.min.js, jquery-ui.min.js, jQueryRotate.js, jquery.ui.touch-punch.min.js, jquery.jsPlumb-1.5.2-min.js, codemirror.js, fabrics.js"); //output the new line

                                            } else {
                                                out.println(line); //if it's not the line, just output it as-is
                                            }
                                        }
                                        in.close();
                                        out.flush();
                                        out.close();
                                        ob_copyFile(target, source);
                                        target.delete();
                                    } catch (Exception e) {
                                        System.err.println("-OPENBEXI_versioning:" + e.getMessage() + " --- " + source.getPath());
                                    }
                                }
                            }
                        }
                    } catch (Exception e) {
                        System.err.println("OPENBEXI_versioning:" + e.getMessage());
                    }
                }
            }


            //*******************************************************************************************************
            // Delivery
            //*******************************************************************************************************
            File[] file_list_target = new File[36];
            file_list_target[0] = new File("..\\ob-htmlbuilder5.0\\source\\openbexiBuilder\\src\\OPENBEXI_Creative");
            file_list_target[1] = new File("..\\ob-htmlbuilder5.0\\source\\openbexiDictionary\\src\\BEXI_DICTIONARY");
            file_list_target[2] = new File("..\\ob-htmlbuilder5.0\\source\\openbexiNaturalLanguage\\src\\BEXI_TEST");
            file_list_target[3] = new File("..\\ob-htmlbuilder5.0\\source\\openbexiUtil\\src\\OPENBEXI");

            file_list_target[4] = new File("..\\ob-htmlbuilder5.0\\apache-tomcat-embed\\webapps\\OPENBEXI_Creative\\javascript");

            file_list_target[5] = new File("..\\ob-htmlbuilder5.0\\apache-tomcat-embed\\webapps\\OPENBEXI_Creative\\js");

            file_list_target[6] = new File("..\\ob-htmlbuilder5.0\\apache-tomcat-embed\\webapps\\OPENBEXI_Creative\\images");

            file_list_target[7] = null;
            file_list_target[8] = null;

            file_list_target[9] = null;
            file_list_target[10] = null;

            file_list_target[11] = new File("..\\ob-htmlbuilder5.0\\apache-tomcat-embed\\webapps\\OPENBEXI_Creative\\project\\tests");
            file_list_target[12] = new File("..\\ob-htmlbuilder5.0\\apache-tomcat-embed\\webapps\\OPENBEXI_Creative\\project\\tests\\draft");

            file_list_target[13] = new File("..\\ob-htmlbuilder5.0\\apache-tomcat-embed\\webapps\\OPENBEXI_Creative\\gif");
            file_list_target[14] = null;

            file_list_target[15] = new File("..\\ob-htmlbuilder5.0\\apache-tomcat-embed\\webapps\\OPENBEXI_Creative\\WEB-INF\\classes\\BEXI_DICTIONARY");
            file_list_target[16] = new File("..\\ob-htmlbuilder5.0\\apache-tomcat-embed\\webapps\\OPENBEXI_Creative\\WEB-INF\\classes\\OPENBEXI");
            file_list_target[17] = new File("..\\ob-htmlbuilder5.0\\apache-tomcat-embed\\webapps\\OPENBEXI_Creative\\WEB-INF\\classes\\BEXI_TEST");
            file_list_target[18] = new File("..\\ob-htmlbuilder5.0\\apache-tomcat-embed\\webapps\\OPENBEXI_Creative\\WEB-INF\\classes\\OPENBEXI_Creative");
            file_list_target[19] = null;

            file_list_target[20] = new File("..\\ob-htmlbuilder5.0\\apache-tomcat-embed\\webapps\\OPENBEXI_Creative\\css");

            file_list_target[21] = new File("..\\ob-htmlbuilder5.0\\apache-tomcat-embed\\webapps\\OPENBEXI_Creative\\template\\ob_button");
            file_list_target[22] = new File("..\\ob-htmlbuilder5.0\\apache-tomcat-embed\\webapps\\OPENBEXI_Creative\\template\\ob_calendar");
            file_list_target[23] = new File("..\\ob-htmlbuilder5.0\\apache-tomcat-embed\\webapps\\OPENBEXI_Creative\\template\\ob_form");
            file_list_target[24] = new File("..\\ob-htmlbuilder5.0\\apache-tomcat-embed\\webapps\\OPENBEXI_Creative\\template\\ob_list");
            file_list_target[25] = new File("..\\ob-htmlbuilder5.0\\apache-tomcat-embed\\webapps\\OPENBEXI_Creative\\template\\ob_timeline\\bands");
            file_list_target[26] = new File("..\\ob-htmlbuilder5.0\\apache-tomcat-embed\\webapps\\OPENBEXI_Creative\\template\\ob_timeline\\css");
            file_list_target[27] = new File("..\\ob-htmlbuilder5.0\\apache-tomcat-embed\\webapps\\OPENBEXI_Creative\\template\\ob_timeline\\themes");
            file_list_target[28] = new File("..\\ob-htmlbuilder5.0\\apache-tomcat-embed\\webapps\\OPENBEXI_Creative\\template\\ob_link");
            file_list_target[29] = new File("..\\ob-htmlbuilder5.0\\apache-tomcat-embed\\webapps\\OPENBEXI_Creative\\template\\ob_dojo_editor");
            file_list_target[30] = new File("..\\ob-htmlbuilder5.0\\apache-tomcat-embed\\webapps\\OPENBEXI_Creative\\template\\ob_page");
            file_list_target[31] = new File("..\\ob-htmlbuilder5.0\\apache-tomcat-embed\\webapps\\OPENBEXI_Creative\\template\\ob_page\\small_business");
            file_list_target[32] = new File("..\\ob-htmlbuilder5.0\\apache-tomcat-embed\\webapps\\OPENBEXI_Creative\\template\\ob_page\\small_business\\draft");
            file_list_target[33] = new File("..\\ob-htmlbuilder5.0\\apache-tomcat-embed\\webapps\\OPENBEXI_Creative\\template\\ob_grid");

            file_list_target[34] = new File("..\\ob-htmlbuilder5.0\\EmbeddedTomcat.class");
            file_list_target[35] = new File("..\\ob-htmlbuilder5.0\\apache-tomcat-embed\\webapps\\OPENBEXI_Creative\\index.jsp");


            for (int i = 0; i < file_list_source.length; i++) {
                if (i == 34) {
                    //EmbeddedTomcat.class
                    try {
                        ob_copyFile(file_list_source[i], file_list_target[i]);
                        System.out.println("copy " + file_list_source[i].getName() + " to " + file_list_target[i].getAbsoluteFile());
                    } catch (Exception e) {
                        System.err.println("Delivery Source-->file_list_target failed:" + e.getMessage() + " --- " + file_list_source[i].getPath() + " to " + file_list_target[i].getAbsoluteFile());
                    }

                } else if (i == 11 || i == 12) {
                    //test project
                    try {
                        ob_copyFile(file_list_source[i], file_list_target[i]);
                        System.out.println("copy " + file_list_source[i].getName() + " to " + file_list_target[i].getAbsoluteFile());
                    } catch (Exception e) {
                        System.err.println("Delivery Source-->file_list_target failed:" + e.getMessage() + " --- " + file_list_source[i].getPath() + " to " + file_list_target[i].getAbsoluteFile());
                    }
                } else if (i == 35) {
                    //index.jsp
                    try {
                        ob_copyFile(file_list_source[i], file_list_target[i]);
                        System.out.println("copy " + file_list_source[i].getName() + " to " + file_list_target[i].getAbsoluteFile());
                    } catch (Exception e) {
                        System.err.println("Delivery source-->Target failed:" + e.getMessage() + " --- " + file_list_source[i].getPath() + " to " + file_list_target[i].getAbsoluteFile());
                    }
                } else {
                    try {
                        String[] files = file_list_source[i].list(nf);
                        if (files != null) {
                            for (int j = 0; j < files.length; j++) {
                                File source = new File(file_list_source[i].getPath() + "\\" + files[j]);
                                if (file_list_source[i] != null && source.isFile()) {
                                    if (file_list_target[i] != null) {
                                        try {
                                            File target = new File(file_list_target[i].getPath() + "\\" + files[j]);
                                            ob_copyFile(source, target);
                                            System.out.println(j + ":copy " + source.getName() + " to " + target.getAbsoluteFile());
                                        } catch (Exception e) {
                                            System.err.println("Delivery copy issue:" + e.getMessage() + " --- " + file_list_target[i].getPath());
                                        }
                                    }
                                }
                            }
                        } else {
                            System.err.println(file_list_source[i] + " null (WARNING!!!");
                        }
                        //String[] dirs = file_list_source[i].list();
                        //if (dirs == null) return;
                    } catch (Exception e) {
                        System.err.println("OPENBEXI_package:" + e.getMessage() + " --- " + file_list_target[i].getPath());
                    }
                }
            }
        } catch (Exception e) {
            System.err.println("OPENBEXI_package:" + e.getMessage());
        }
        try {
            File svnkit = new File("..\\ob-htmlbuilder5.0\\apache-tomcat-embed\\webapps\\OPENBEXI_Creative\\WEB-INF\\lib\\svnkit.jar");
            svnkit.delete();
        } catch (Exception e) {
            System.err.println("svnkit:" + e.getMessage());
        }
        try {
            //File work_source1 = new File("apache-tomcat_7\\work\\openbexiEngine\\openbexihost\\_\\org\\apache\\jsp\\index_jsp.java");
            //File work_target1 = new File("..\\ob-htmlbuilder5.0\\apache-tomcat-embed\\work\\openbexiEngine\\openbexihost\\_\\org\\apache\\jsp\\index_jsp.java");
            //File work_source2 = new File("apache-tomcat_7\\work\\openbexiEngine\\openbexihost\\_\\org\\apache\\jsp\\index_jsp.class");
            //File work_target2 = new File("..\\ob-htmlbuilder5.0\\apache-tomcat-embed\\work\\openbexiEngine\\openbexihost\\_\\org\\apache\\jsp\\index_jsp.class");
            //ob_copyFile(work_source1, work_target1);
            //ob_copyFile(work_source2, work_target2);
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }
        System.out.println("OPENBEXI_packaging completed\nplease execute OPENBEXI_creative.bat and save sftp database from the new delivery:\n A- DO NOT REBUILT the private bexi context!!!\n B- to built apache-tomcat-embed\\work\\openbexiEngine\\openbexihost\\_\\org\\apache\\jsp\\index_jsp.java and class\nRemoved SVN class under WEB=IF/lib\nC - add manually lib under WEB=IF/lib");
    }

    public String test1(String str) {
        System.out.println("param=" + str);
        return str;
    }

    public static void main(final String[] args) {
        OPENBEXI_package ob_package = new OPENBEXI_package();
        try {
            ob_package.create();
        } catch (Exception e) {
            System.err.println(e);
        }
    }
}