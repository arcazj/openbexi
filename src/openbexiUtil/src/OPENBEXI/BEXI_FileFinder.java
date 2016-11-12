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


import com.sshtools.j2ssh.sftp.SftpFile;
import com.enterprisedt.net.ftp.FTPFile;

import java.io.File;
import java.sql.Statement;
import java.util.Vector;
import java.util.Arrays;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class BEXI_FileFinder {

    public static final int FILE = 0;
    public static final int DIRECTORY = 1;
    public static final int HIDDEN = 2;

    Vector<Object> _files = new Vector<Object>();
    String _absolutePath = null;

    public String getAbsolutePath() {
        return _absolutePath;
    }

    public void setAbsolutePath(String absolutePath) {
        this._absolutePath = absolutePath;
    }

    public BEXI_FileFinder() {

    }

    public Vector<Object> get_files(String filter) {
        if (filter != null) {
            Vector<Object> files = new Vector<Object>();
            for (int j = 0; j < _files.size(); j++) {
                File file = (File) _files.get(j);
                if (file.getName().contains(filter))
                    files.add(file);
            }
            return files;
        } else
            return _files;
    }

    public Vector<Object> get_files() {
        return _files;
    }

    public void set_files(Vector<Object> _files) {
        this._files = _files;
    }

    public void sort_files_per_date(Boolean reverse) {
        String[] files = new String[_files.size()];
        for (int j = 0; j < _files.size(); j++) {
            File file = (File) _files.get(j);
            files[j] = String.valueOf(file.lastModified() + "@" + file.getAbsoluteFile());
        }
        Arrays.sort(files);
        _files.clear();
        if (reverse) {
            int count = 0;
            for (int j = files.length - 1; j >= 0; j--) {
                String[] items = files[j].split("@");
                _files.add(count, new File(items[1]));
                count++;
            }
        } else {
            for (int j = 0; j < files.length; j++) {
                String[] items = files[j].split("@");
                _files.add(j, new File(items[1]));
            }
        }
    }


    public String[] getfileList(final String directory, final String filterString) {
        final File dir = new File(directory);

        String[] children = dir.list();
        if (children == null) {
            return null;
        }

        children = dir.list();

        final String[] absoluteFileList_withPath = new String[children.length];
        for (int l = 0; l < absoluteFileList_withPath.length; l++) {
            absoluteFileList_withPath[l] = directory + System.getProperty("file.separator") + children[l];
        }

        return absoluteFileList_withPath;
    }

    public String[] getShortfileList(final String directory, final String filterString) {
        final File dir = new File(directory);

        String[] children = dir.list();
        if (children == null) {
            return null;
        }

        children = dir.list();

        final String[] absoluteFileList = new String[children.length];
        for (int l = 0; l < absoluteFileList.length; l++) {
            absoluteFileList[l] = children[l];
        }

        return absoluteFileList;
    }

    public void find(File directory, String filter) {

        File[] files = directory.listFiles();
        if (files == null) return;

        for (int j = 0; j < directory.listFiles().length; j++) {

            Pattern pattern = Pattern.compile(filter);
            Matcher matcher = pattern.matcher(files[j].getPath());
            if (matcher.find()) {
                _files.add(files[j]);
                if (BEXI_DEBUG.level > 2) System.err.println("BEXI_FileFinder found: " + files[j]);

            }
            if (files[j].isDirectory()) {
                find(files[j], filter);
            }
        }
    }

    public void findDrives() {
        File[] files = null;
        try {
            files = File.listRoots();
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }
        if (files == null) return;
        int j = 0;
        while (j < files.length) {
            _files.add(files[j]);
            j++;
        }
    }

    public void findTablesAttribute(BEXI_ApplicationPath applicationPath, String table) {
        try {
            // select_classes
            BEXI_SQLDriver bexi_SQLDriver = new BEXI_SQLDriver();
            String url_current = applicationPath.get_SqlContextManager().get_url_current();
            Statement statement = applicationPath.get_SqlContextManager().getBEXI_SqlContext(url_current).get_statement();
            BEXI_results bexi_result = bexi_SQLDriver.select_class_attributs(statement, table);

            if (bexi_result == null) return;
            int j = 0;
            while (j < bexi_result.get_list().getItemCount()) {
                _files.add(bexi_result.get_list().getItem(j));
                j++;
            }
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }
    }

    public void findJavaPackageMethod(BEXI_ApplicationPath applicationPath, String packageName) {
        //TBD
    }

    public void findTables(BEXI_ApplicationPath applicationPath) {
        try {
            // select_classes
            BEXI_SQLDriver bexi_SQLDriver = new BEXI_SQLDriver();
            String url_current = applicationPath.get_SqlContextManager().get_url_current();
            Statement statement = applicationPath.get_SqlContextManager().getBEXI_SqlContext(url_current).get_statement();
            String driver = applicationPath.get_SqlContextManager().getBEXI_SqlContext(url_current).get_driver();
            BEXI_results bexi_result = bexi_SQLDriver.select_tables(statement, driver);

            if (bexi_result == null) return;
            int j = 0;
            while (j < bexi_result.get_list().getItemCount()) {
                _files.add(bexi_result.get_list().getItem(j));
                j++;
            }
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }
    }

    public void find(File directory, int typeFile, String filter, String fileFilter) {
        File[] files = directory.listFiles();
        if (files == null) return;
        for (int j = 0; j < directory.listFiles().length; j++) {
            if (files[j].isDirectory()) {
                _files.add(files[j]);
            }
        }
        filter = filter.trim();
        fileFilter = fileFilter.trim();
        Pattern patternFileFilter = Pattern.compile("(\\." + fileFilter.trim() + "$)");
        Pattern patternFilter = Pattern.compile("(" + filter + ")");
        for (int j = 0; j < directory.listFiles().length; j++) {
            if (typeFile == FILE) {
                if (files[j].isFile()) {
                    Matcher matcherFileFilter = patternFileFilter.matcher(files[j].getName().toLowerCase());
                    Matcher matcherFilter = patternFilter.matcher(files[j].getName().toLowerCase());
                    boolean b_fileFilter = matcherFileFilter.find();
                    boolean b_Filter = matcherFilter.find();
                    if (fileFilter.equals("") && filter.equals("")) {
                        _files.add(files[j]);
                    } else {
                        if (b_Filter && b_fileFilter) {
                            _files.add(files[j]);
                        } else {
                            if (filter.equals("") && b_fileFilter) {
                                _files.add(files[j]);
                            }
                            if (fileFilter.equals("") && b_Filter) {
                                _files.add(files[j]);
                            }
                        }
                    }
                }
            }
        }
    }

    public void find(File directory, int typeFile, String directoryName) {

        File[] files = directory.listFiles();
        if (files == null) return;

        for (int j = 0; j < directory.listFiles().length; j++) {
            if (typeFile == DIRECTORY) {
                if (files[j].isDirectory()) {
                    if (directoryName != null) {
                        Pattern pattern = Pattern.compile(directoryName);
                        Matcher matcher = pattern.matcher(files[j].getPath());
                        if (matcher.find()) {
                            _files.add(files[j]);
                            if (BEXI_DEBUG.level > 2) System.err.println("BEXI_FileFinder found: " + files[j]);
                        }
                        find(files[j], DIRECTORY, directoryName);
                    } else {
                        _files.add(files[j]);
                    }
                }
            }
        }
    }

    public void find(File directory, int typeFile, String filter, String extension, String date) {
        //*Date: not implemented
        File[] files = directory.listFiles();
        if (files == null) return;
        //Arrays.sort(files);
        for (int j = 0; j < directory.listFiles().length; j++) {
            if (typeFile == DIRECTORY) {
                if (files[j].isDirectory()) {
                    _files.add(files[j]);
                    if (BEXI_DEBUG.level > 2) System.err.println("BEXI_FileFinder found: " + files[j]);
                }
            }
            if (typeFile == FILE) {
                if (files[j].isFile()) {
                    Pattern pattern;
                    if (filter != null)
                        pattern = Pattern.compile(filter);
                    else
                        pattern = Pattern.compile("(\\" + extension + "$)");
                    Matcher matcher = pattern.matcher(files[j].getName().toLowerCase());
                    if (matcher.find()) {
                        _files.add(files[j]);
                        if (BEXI_DEBUG.level > 2) System.err.println("BEXI_FileFinder found: " + files[j]);
                    }
                }
            }
        }
    }

    public void findTemplate(File directory, int typeFile, String filter, String extension) {

        File[] files = directory.listFiles();
        if (files == null) return;

        for (int j = 0; j < directory.listFiles().length; j++) {
            if (files[j].isDirectory() && !files[j].getName().equals("gif")) {
               _files.add(files[j]);
            }
        }
        for (int j = 0; j < directory.listFiles().length; j++) {
            if (files[j].isFile()) {
                if (files[j].isFile()) {
                    Pattern pattern;
                    if (filter != null)
                        pattern = Pattern.compile(filter);
                    else
                        pattern = Pattern.compile("(\\" + extension + "$)");
                    Matcher matcher = pattern.matcher(files[j].getName().toLowerCase());
                    if (matcher.find()) {
                        String img = directory.getPath() + "/" + files[j].getName().replace(".css", ".jpg");
                        File file = new File(img);
                        if (file.exists()) {
                            _files.add(file);
                        } else {
                            _files.add(new File(directory.getPath() + "/" + "default.jpg"));
                        }
                    }
                }
            }
        }
    }


    public String findFileType(Object file) {

        String fileName;
        Boolean isfile = false;
        Boolean isdir = false;
        Boolean ishidden = false;
        Boolean isfifo = false;
        Boolean islink = false;
        Boolean issocket = false;
        if (file == null) return null;
        if (file instanceof File) {
            File obj = (File) file;
            fileName = obj.getName();
            if (obj.isFile()) isfile = true;
            if (obj.isDirectory()) isdir = true;
            if (obj.isHidden()) ishidden = true;
        } else if (file instanceof SftpFile) {
            SftpFile obj = (SftpFile) file;
            fileName = obj.getFilename();
            if (obj.isFile()) isfile = true;
            if (obj.isDirectory()) isdir = true;
            if (obj.isFifo()) isfifo = true;
            if (obj.isLink()) islink = true;
            if (obj.isSocket()) issocket = true;
        } else if (file instanceof FTPFile) {
            FTPFile obj = (FTPFile) file;
            fileName = obj.getName();
            if (obj.isDir()) isdir = true;
            else if (obj.isLink()) islink = true;
            else isfile = true;
        } else {
            return null;
        }

        if (isfile) {
            Pattern patternG = Pattern.compile("(\\.gif$)|(\\.jpeg$)|(\\.jpg$)|(\\.tif$)|(\\.png$)|(\\.tiff$)|(\\.riff$)|(\\.bgi$)|(\\.bmp$)|(\\.svg$)");
            Matcher matcher = patternG.matcher(fileName.toLowerCase());
            if (matcher.find()) {
                return "img";
            }
            Pattern patternV = Pattern.compile("(\\.avi$)|(\\.mov$)|(\\.mpg$)|(\\.mpeg$)|(\\.mp4$)|(\\.qt$)|(\\.rm$)|(\\.divx$)|(\\.m2p$)|(\\.mp1$)|(\\.mp2$)|(\\.mp3$)|(\\.wmv$)|(\\.wma$)|(\\.vob$)|(\\.omf$)|(\\.mp4$)|(\\.asf$)|(\\.wms$)|(\\.wmz$)|(\\.wmd$)");
            Matcher matcherV = patternV.matcher(fileName.toLowerCase());
            if (matcherV.find()) {
                return "video";
            }
            Pattern patternA = Pattern.compile("(\\.mid$)|(\\.ram$)|(\\.wav$)|(\\.ac3$)|(\\.aac$)|(\\.aif$)|(\\.aiff$)");
            Matcher matcherA = patternA.matcher(fileName.toLowerCase());
            if (matcherA.find()) {
                return "audio";
            }
            Pattern patternF = Pattern.compile("(\\.swf$)");
            Matcher matcherF = patternF.matcher(fileName.toLowerCase());
            if (matcherF.find()) {
                return "flash";
            }
            Pattern patternZ = Pattern.compile("(\\.zip$|\\.tar$|\\.gz$|\\.jar$)");
            Matcher matcherZ = patternZ.matcher(fileName.toLowerCase());
            if (matcherZ.find()) {
                return "zip";
            }
            Pattern patternJS = Pattern.compile("(\\.js$)");
            Matcher matcherJS = patternJS.matcher(fileName.toLowerCase());
            if (matcherJS.find()) {
                return "js";
            }
            Pattern patternP = Pattern.compile("(\\.pl$)");
            Matcher matcherP = patternP.matcher(fileName.toLowerCase());
            if (matcherP.find()) {
                return "perl";
            }
            Pattern patternSQL = Pattern.compile("(\\.sql$)");
            Matcher matcherSQL = patternSQL.matcher(fileName.toLowerCase());
            if (matcherSQL.find()) {
                return "sql";
            }
            Pattern patternmSQL = Pattern.compile("(\\.MYD$|\\.MYI$|\\.frm$)");
            Matcher matchermSQL = patternmSQL.matcher(fileName.toLowerCase());
            if (matchermSQL.find()) {
                return "mysql";
            }
            Pattern patternCSS = Pattern.compile("(\\.css$)");
            Matcher matcherCSS = patternCSS.matcher(fileName.toLowerCase());
            if (matcherCSS.find()) {
                return "css";
            }
            Pattern patternCC = Pattern.compile("(\\.c$|\\.cpp$|\\.cc$)");
            Matcher matcherCC = patternCC.matcher(fileName.toLowerCase());
            if (matcherCC.find()) {
                return "code";
            }
            Pattern patternWeb = Pattern.compile("(\\.htm$)|(\\.html$)");
            Matcher matcherWeb = patternWeb.matcher(fileName.toLowerCase());
            if (matcherWeb.find()) {
                return "web";
            }
            Pattern patternJ = Pattern.compile("(\\.java$)");
            Matcher matcherJ = patternJ.matcher(fileName.toLowerCase());
            if (matcherJ.find()) {
                return "java";
            }
            Pattern patternH = Pattern.compile("(\\.h$|\\.hpp$|\\.hh$)");
            Matcher matcherH = patternH.matcher(fileName.toLowerCase());
            if (matcherH.find()) {
                return "code";
            }
            Pattern patternJP = Pattern.compile("(\\.ppt$|\\.pptx$)");
            Matcher matcherJP = patternJP.matcher(fileName.toLowerCase());
            if (matcherJP.find()) {
                return "ppt";
            }
            Pattern patternX = Pattern.compile("(\\.xls$|\\.xlsx$)");
            Matcher matcherX = patternX.matcher(fileName.toLowerCase());
            if (matcherX.find()) {
                return "xls";
            }
            Pattern patternW = Pattern.compile("(\\.doc$|\\.docx$)");
            Matcher matcherW = patternW.matcher(fileName.toLowerCase());
            if (matcherW.find()) {
                return "word";
            }
            Pattern patternT = Pattern.compile("(\\.txt$)");
            Matcher matcherT = patternT.matcher(fileName.toLowerCase());
            if (matcherT.find()) {
                return "txt";
            }
            Pattern patternDB = Pattern.compile("(\\.db$)");
            Matcher matcherDB = patternDB.matcher(fileName.toLowerCase());
            if (matcherDB.find()) {
                return "thumbs";
            }
            Pattern patternEXE = Pattern.compile("(\\.exe$|\\.bat$)");
            Matcher matcherEXE = patternEXE.matcher(fileName.toLowerCase());
            if (matcherEXE.find()) {
                return "exe";
            }
            Pattern patternSH = Pattern.compile("(\\.sh$)");
            Matcher matcherSH = patternSH.matcher(fileName.toLowerCase());
            if (matcherSH.find()) {
                return "shell";
            }
            Pattern patternXml = Pattern.compile("(\\.xml$)");
            Matcher matcherXml = patternXml.matcher(fileName.toLowerCase());
            if (matcherXml.find()) {
                return "xml";
            }
            return "file";
        }
        if (isdir) {
            return "dir";
        }
        if (ishidden) {
            return "hidden";
        }
        if (isfifo) {
            return "fifo";
        }
        if (issocket) {
            return "socket";
        }
        if (islink) {
            return "link";
        }
        return null;
    }

    public static void main(String args[]) {
        BEXI_FileFinder finder = new BEXI_FileFinder();
        finder.find(new File("Tomcat 5.0\\webapps\\OPENBEXI_Creative\\gif"), BEXI_FileFinder.FILE, "emplate_l", "");

        System.out.println("\ndirectory gif:");
        for (int i = 0; i < finder.get_files().size(); i++) {
            if (finder.get_files().get(i) instanceof File) {
                File file = (File) finder.get_files().get(i);
                System.out.println(file.getName());
            }
        }

        finder.find(new File("gif"), BEXI_FileFinder.FILE, "", "");

        finder.findDrives();
        System.out.println("\ndrive test:");
        for (int i = 0; i < finder.get_files().size(); i++) {
            if (finder.get_files().get(i) instanceof File) {
                File file = (File) finder.get_files().get(i);
                System.out.println(file.getPath());
            }
        }
    }
}
