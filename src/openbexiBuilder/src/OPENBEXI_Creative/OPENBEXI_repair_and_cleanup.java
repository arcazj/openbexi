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

import java.io.*;
import java.util.zip.CRC32;

public class OPENBEXI_repair_and_cleanup {
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

    public void replaceAll(String project, File source, String str, String newstr, boolean clean_archive) {
        try {
            if (clean_archive) {
                System.out.println(" Deleting in " + source.getName());
                source.delete();
                return;
            }
            BufferedReader in = new BufferedReader(new FileReader(source));
            File target = new File(source.getName() + ".tmp");
            PrintWriter out = new PrintWriter(target);

            String line; //a line in the file
            while ((line = in.readLine()) != null) {
                if (line.contains(str)) {
                    System.out.println(str + " found in " + source.getName());

                    //Populate backgrounds and images to the project directory
                    /*String[] items = line.split(str);
                    for (int i = 1; i < items.length; i++) {
                        int count = 0;
                        char c;
                        String image = "";

                        while ((c = items[i].charAt(count++)) != '\"') {
                            if (count >= items[i].length()) break;
                            image = image + c;
                        }
                        try {
                            if (!new File("apache-tomcat-5.5.27/webapps/OPENBEXI_Creative/project/" + project + "/gif/" + image).exists()) {
                                OPENBEXI_Creative_file.ob_copyFile(new File("apache-tomcat-5.5.27/webapps/OPENBEXI_Creative/gifPlus/" + image), new File("apache-tomcat-5.5.27/webapps/OPENBEXI_Creative/project/" + project + "/gif/" + image));
                                System.out.println("project:" + project + "   image: " + image + "   copied");
                                Thread.sleep(400);
                            }
                        } catch (Exception e) {
                            System.err.println("replaceAll:" + e.getMessage() + " --- " + source.getPath());
                        }
                    }*/
                    try {
                        String lineTmp = line.replaceAll(str, newstr);
                        out.println(lineTmp);
                    } catch (Exception e) {
                        System.err.println("replaceAll:" + e.getMessage() + " --- " + source.getPath());
                        out.println(line);
                    }
                } else {
                    out.println(line);
                }
            }
            in.close();
            out.flush();
            out.close();
            ob_copyFile(target, source);
            Thread.sleep(50);
            target.delete();
        } catch (Exception e) {
            System.err.println("replaceAll:" + e.getMessage() + " --- " + source.getPath());
        }
    }

    public void create() {
        try {
            int count_project = 0;
            String str[] = new String[4];
            String newstr[] = new String[4];

            str[0] = "template/project/alfred_nobel/gif//default.css";
            newstr[0] = "";

            str[1] = "";
            newstr[1] = "";

            str[2] = "";
            newstr[2] = "";

            str[3] = "";
            newstr[3] = "";

            boolean clean_archive = true;

            File[] project_list = null;
            File[] project_list_file;
            File[] project_list_draft;
            File[] project_list_archive;
            File[] project_list_data;

            File projects = new File("apache-tomcat-5.5.27/webapps/OPENBEXI_Creative/project");
            if (projects.exists()) {
                project_list = projects.listFiles();
                count_project = project_list.length;
            }
            for (int i = 0; i < count_project; i++) {
                if (project_list[i].isDirectory()) {
                    System.out.println("Checking project: " + project_list[i]);
                    newstr[0] = "project/" + project_list[i].getName().replace("apache-tomcat-5.5.27/webapps/OPENBEXI_Creative/project", "") + "/gif/";
                    newstr[1] = "img src=\"project/" + project_list[i].getName().replace("apache-tomcat-5.5.27/webapps/OPENBEXI_Creative/project", "") + "/gif/";
                    project_list_file = project_list[i].listFiles();
                    int count_project_list_file = project_list_file.length;
                    for (int l = 0; l < count_project_list_file; l++) {

                        if (project_list_file[l].exists() && project_list_file[l].isDirectory() && project_list_file[l].getName().contains("draft")) {
                            project_list_draft = project_list_file[l].listFiles();
                            int count_project_list_draft = project_list_draft.length;
                            for (int j = 0; j < count_project_list_draft; j++) {
                                if (project_list_draft[j].exists() && !project_list_draft[j].isDirectory() && project_list_draft[j].getName().contains(".html")) {
                                    System.out.println("--------Checking WEB page: " + project_list_draft[j].getName());
                                    for (int k = 0; k < str.length; k++)
                                        if (!str[k].equals(""))
                                            replaceAll(project_list[i].getName(), project_list_draft[j], str[k], newstr[k], false);
                                }
                            }
                        }
                        if (project_list_file[l].exists() && project_list_file[l].isDirectory() && project_list_file[l].getName().contains("archive")) {
                            project_list_archive = project_list_file[l].listFiles();
                            int count_project_list_archive = project_list_archive.length;
                            for (int j = 0; j < count_project_list_archive; j++) {
                                if (project_list_archive[j].exists() && !project_list_archive[j].isDirectory() && project_list_archive[j].getName().contains(".html")) {
                                    for (int k = 0; k < str.length; k++)
                                        if (!str[k].equals(""))
                                            replaceAll(project_list[i].getName(), project_list_archive[j], str[k], newstr[k], clean_archive);
                                }
                            }
                        } else if (project_list_file[l].exists() && project_list_file[l].isDirectory() && project_list_file[l].getName().contains("data")) {
                            project_list_data = project_list_file[l].listFiles();
                            int count_project_list_archive = project_list_data.length;
                            for (int j = 0; j < count_project_list_archive; j++) {
                                if (project_list_data[j].exists() && !project_list_data[j].isDirectory() && project_list_data[j].getName().contains(".xml")) {
                                    for (int k = 0; k < str.length; k++)
                                        if (!str[k].equals(""))
                                            replaceAll(project_list[i].getName(), project_list_data[j], str[k], newstr[k], false);
                                }
                            }
                        } else {
                            if (project_list_file[l].exists() && !project_list_file[l].isDirectory() && project_list_file[l].getName().contains(".html")) {
                                System.out.println("--------Checking WEB page: " + project_list_file[l].getName());
                                for (int k = 0; k < str.length; k++)
                                    if (!str[k].equals(""))
                                        replaceAll(project_list[i].getName(), project_list_file[l], str[k], newstr[k], false);
                            }
                        }
                    }
                }
            }
        } catch (Exception e) {
            System.err.println("OPENBEXI_repair_and_cleanup:" + e.getMessage());
        }

        System.out.println("OPENBEXI_repair_and_cleanup completed");
    }

    public static void main(final String[] args) {
        OPENBEXI_repair_and_cleanup ob_repair_and_cleanup = new OPENBEXI_repair_and_cleanup();
        try {
            ob_repair_and_cleanup.create();
        } catch (Exception e) {
            System.err.println(e);
        }
    }
}
