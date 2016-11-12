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
import OPENBEXI.BEXI_FileFinder;
import OPENBEXI.BEXI_XMLDriver;
import com.sshtools.j2ssh.SftpClient;
import com.sshtools.j2ssh.SshClient;
import com.sshtools.j2ssh.authentication.AuthenticationProtocolState;
import com.sshtools.j2ssh.authentication.PasswordAuthenticationClient;
import com.sshtools.j2ssh.configuration.ConfigurationLoader;
import com.sshtools.j2ssh.configuration.SshConnectionProperties;
import com.sshtools.j2ssh.io.UnsignedInteger64;
import com.sshtools.j2ssh.sftp.SftpFile;
import com.sshtools.j2ssh.transport.IgnoreHostKeyVerification;
import com.enterprisedt.net.ftp.FileTransferClient;
import com.enterprisedt.net.ftp.FTPFile;
import com.enterprisedt.net.ftp.FTPException;
import org.w3c.dom.Document;

import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.regex.Pattern;
import java.util.regex.Matcher;
import java.util.logging.*;
import java.io.File;
import java.io.IOException;


public class OPENBEXI_Creative_ssh {

    private BEXI_ApplicationPath _applicationPath;
    private HttpServletResponse _response;

    private char ob_getSeparator(Object ftpObject, String path) {
        if (ftpObject instanceof FileTransferClient) {
            FileTransferClient ftp = (FileTransferClient) ftpObject;
            try {
                if (ftp.getSystemType().toLowerCase().matches("window"))
                    return '\\';
            } catch (Exception e) {
            }
            return '/';
        }
        if (ftpObject instanceof SftpClient) {
            SftpClient sftp = (SftpClient) ftpObject;
            try {
                path = sftp.pwd();
            } catch (Exception e) {
            }
        }

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

    static void ob_error(HttpServletResponse response, Document doc) {
        try {
            final BEXI_XMLDriver xml = new BEXI_XMLDriver();
            response.setContentType("text/xml");
            response.setHeader("Cache-Control", "no-cache");
            response.getWriter().write(xml.XMLSerializer(doc));
        } catch (Exception el) {
            System.err.println(el);
        }
    }

    /**
     * @param applicationPath path;
     */
    public OPENBEXI_Creative_ssh(BEXI_ApplicationPath applicationPath, HttpServletResponse response) {
        _applicationPath = applicationPath;
        _response = response;
    }

    public FileTransferClient connect(Document docOut, String protocole) throws Exception {

        final BEXI_XMLDriver xmlResponse = new BEXI_XMLDriver();
        String number = xmlResponse.get_class_object_attribute_value(docOut, "ob_ssh", "connection", "number");
        String host = xmlResponse.get_class_object_attribute_value(docOut, "ob_ssh", "connection_" + number, "host");
        String user = xmlResponse.get_class_object_attribute_value(docOut, "ob_ssh", "connection_" + number, "user");
        String passwd = xmlResponse.get_class_object_attribute_value(docOut, "ob_ssh", "connection_" + number, "passwd");

        FileTransferClient ftp = new FileTransferClient();
        ftp.setRemoteHost(host);
        ftp.setUserName(user);
        ftp.setPassword(passwd);
        ftp.connect();
        return ftp;
    }

    public SftpClient connect(Document docOut) throws Exception {

        final BEXI_XMLDriver xmlResponse = new BEXI_XMLDriver();
        String number = xmlResponse.get_class_object_attribute_value(docOut, "ob_ssh", "connection", "number");
        String host = xmlResponse.get_class_object_attribute_value(docOut, "ob_ssh", "connection_" + number, "host");
        String user = xmlResponse.get_class_object_attribute_value(docOut, "ob_ssh", "connection_" + number, "user");
        String passwd = xmlResponse.get_class_object_attribute_value(docOut, "ob_ssh", "connection_" + number, "passwd");
        String PublicKey = xmlResponse.get_class_object_attribute_value(docOut, "ob_ssh", "connection_" + number, "PublicKey");
        int SocketTimeout = Integer.parseInt(xmlResponse.get_class_object_attribute_value(docOut, "ob_ssh", "connection_" + number, "SocketTimeout"));

        ConfigurationLoader.initialize(false);
        SshClient ssh = new SshClient();
        ssh.setSocketTimeout(SocketTimeout);
        SshConnectionProperties properties = new SshConnectionProperties();
        properties.setHost(host);
        properties.setPrefPublicKey(PublicKey);
        ssh.connect(properties, new IgnoreHostKeyVerification());
        PasswordAuthenticationClient pwd = new PasswordAuthenticationClient();
        pwd.setUsername(user);
        pwd.setPassword(passwd);
        int result = ssh.authenticate(pwd);
        if (result == AuthenticationProtocolState.COMPLETE) {
            return ssh.openSftpClient();
        } else {
            return null;
        }
    }

    public void copyFolder(Object ftpObject, String host, String srcFolder, String destFolder) throws Exception {
        FileTransferClient ftp = null;
        if(srcFolder.contains("uncompressed.js"))return;
        if(srcFolder.contains("demos"))return;
        if (ftpObject instanceof FileTransferClient)
            ftp = (FileTransferClient) ftpObject;
        SftpClient sftp = null;
        if (ftpObject instanceof SftpClient)
            sftp = (SftpClient) ftpObject;

        File srcFolderTmp = new File(srcFolder);
        if (srcFolderTmp.isDirectory()) {
            if (ftpObject instanceof FileTransferClient) {
                try {
                    //if  (new File(srcFolder).lastModified()< ftp.getModifiedTime(destFolder).getTime())  {
                        //System.err.println("No need to copy " + srcFolderTmp.getCanonicalPath() + " to " + host + ":" + destFolder);
                        //return;
                    //}
                    ftp.createDirectory(destFolder);
                } catch (Exception e) {
                }
            } else {
                try {
                    /*if  (new File(srcFolder).lastModified()< sftp.stat(destFolder).getModifiedTime().longValue()) {
                        System.err.println("No need to copy " + srcFolderTmp.getCanonicalPath() + " to " + host + ":" + destFolder);
                        return;
                    }*/
                    sftp.mkdir(destFolder);
                } catch (Exception e) {
                }
            }

            String[] oChildren = srcFolderTmp.list();
            for (int i = 0; i < oChildren.length; i++)
                copyFolder(ftpObject, host, srcFolder + ob_getSeparator(ftpObject, _applicationPath.getHomePath()) + oChildren[i], destFolder + ob_getSeparator(ftpObject, _applicationPath.getHomePath()) + oChildren[i]);
        } else {
            if (ftpObject instanceof FileTransferClient) {
                if (new File(srcFolderTmp.getCanonicalPath()).length() != get_remoteFtpFileChecksum(ftp, destFolder)) {
                    ftp.uploadFile(srcFolderTmp.getCanonicalPath(), destFolder);
                    System.err.println("Copied successfully " + srcFolderTmp.getCanonicalPath() + " to " + host + ":" + destFolder);
                }
                //else
                    //System.err.println("No need to copy " + srcFolderTmp.getCanonicalPath() + " to " + host + ":" + destFolder);

            } else {
                if (new File(srcFolderTmp.getCanonicalPath()).length() != get_remoteSftpFileChecksum(sftp, destFolder)) {
                    sftp.put(srcFolderTmp.getCanonicalPath(), destFolder);
                    System.err.println("Copied successfully " + srcFolderTmp.getCanonicalPath() + " to " + host + ":" + destFolder);
                }
                //else
                    //System.err.println("No need to copy " + srcFolderTmp.getCanonicalPath() + " to " + host + ":" + destFolder);
            }
        }
    }

    private long get_remoteFtpFileChecksum(FileTransferClient ftp, String fileName) {
        try {
            return ftp.getSize(fileName);
        } catch (Exception e) {
        }
        return 0;
    }

    private long get_remoteSftpFileChecksum(SftpClient sftp, String fileName) {
        try {
            return sftp.get(fileName).getSize().longValue();
        } catch (Exception e) {
        }
        return 0;
    }

    public Document copy(FileTransferClient ftp, Document docOut, int page_count) throws Exception {
        final BEXI_XMLDriver xml = new BEXI_XMLDriver();
        //Get data
        boolean flag_file = true;
        boolean flag_dir;
        int count = 0;
        int count_issue = 0;
        String remotedir = xml.get_class_object_attribute_value(docOut, "ob_explorer", "remotedir", "path");
        String number = xml.get_class_object_attribute_value(docOut, "ob_ssh", "connection", "number");
        String host = xml.get_class_object_attribute_value(docOut, "ob_ssh", "connection_" + number, "host");
        String project = xml.get_class_object_attribute_value(docOut, "ob_explorer", "dir", "project");
        String webpage = xml.get_class_object_attribute_value(docOut, "ob_explorer", "dir", "filename");
        String templateCategory = xml.get_class_object_attribute_value(docOut, "ob_explorer", "dir", "templateCategory");

        docOut = xml.set_class_object_attribute_value(docOut, "openbexi_creative", "application", "status", "ok");
        boolean issue = false;
        String exception = null;

        if (ftp == null) {
            docOut = xml.set_class_object_attribute_value(docOut, "openbexi_creative", "application", "status", "Not ok");
            docOut = xml.set_class_object_attribute_value(docOut, "ob_ssh", "connection_" + number, "type_" + page_count, "error");
            docOut = xml.set_class_object_attribute_value(docOut, "ob_ssh", "connection_" + number, "status_" + page_count, "Not connected to " + host);
            docOut = xml.set_class_object_attribute_value(docOut, "ob_ssh", "connection_" + number, "status_" + page_count + "_" + count_issue, "The Web page " + webpage + " has not be successfully published");
            System.err.println(host + "not connected");
            ob_error(_response, docOut);
        } else {

            String build_dir = "";
            String[] itemsR = remotedir.split("/");


            if (remotedir != null && !remotedir.trim().equals("") && !remotedir.equals(".."))
                for (int j = 0; j < itemsR.length; j++) {
                    try {
                        if (!itemsR[j].equals("*")) {
                            build_dir += itemsR[j] + ob_getSeparator(ftp, remotedir);
                            if (j == 0)
                                ftp.createDirectory(itemsR[j]);
                            else
                                ftp.createDirectory(build_dir);
                        }
                    } catch (Exception e) {
                        if (!e.getMessage().contains("exist")) {
                            docOut = xml.set_class_object_attribute_value(docOut, "openbexi_creative", "application", "status", "Not ok");
                            docOut = xml.set_class_object_attribute_value(docOut, "ob_ssh", "connection_" + number, "type_" + page_count, "error");
                            docOut = xml.set_class_object_attribute_value(docOut, "ob_ssh", "connection_" + number, "status_" + page_count, "Cannot create directory " + itemsR[j]);
                            docOut = xml.set_class_object_attribute_value(docOut, "ob_ssh", "connection_" + number, "status_" + page_count + "_" + count_issue, "The Web page " + webpage + " has not be successfully published");
                            System.err.println("cannot create directory " + itemsR[j] + ": " + e.getMessage());
                            ob_error(_response, docOut);
                            return null;
                        }
                    }
                }

            while (flag_file) {
                String localfile = xml.get_class_object_attribute_value(docOut, "ob_explorer", "file_" + count, "name");
                String type = xml.get_class_object_attribute_value(docOut, "ob_explorer", "file_" + count, "type");
                count++;
                flag_dir = false;
                if (localfile != null && !localfile.equals("")) {
                    //Create dirs if nedded;
                    String[] itemsL = localfile.split("/");
                    build_dir = "";
                    for (int j = 0; j < itemsL.length - 1; j++) {
                        try {
                            if (!itemsL[j].equals("*")) {
                                if (itemsL[j] != null && !itemsL[j].equals("") && !itemsL[j].equals("..") && !itemsL[j].equals(".")) {
                                    build_dir += ob_getSeparator(ftp, remotedir) + itemsL[j];
                                    if (j == 0)
                                        build_dir = remotedir + ob_getSeparator(ftp, remotedir) + itemsL[j];
                                    ftp.createDirectory(build_dir);
                                }
                            } else {
                                build_dir += "/" + itemsL[j];
                                if (j > 0)
                                    ftp.createDirectory(build_dir);
                                else
                                    ftp.createDirectory(itemsL[j]);
                            }
                        } catch (Exception e) {
                            if (!e.getMessage().contains("exists")) {
                                docOut = xml.set_class_object_attribute_value(docOut, "openbexi_creative", "application", "status", "Not ok");
                                docOut = xml.set_class_object_attribute_value(docOut, "ob_ssh", "connection_" + number, "type_" + page_count, "error");
                                docOut = xml.set_class_object_attribute_value(docOut, "ob_ssh", "connection_" + number, "status_" + page_count, "Cannot create directory " + itemsL[j]);
                                docOut = xml.set_class_object_attribute_value(docOut, "ob_ssh", "connection_" + number, "status_" + page_count + "_" + count_issue, "Cannot publish " + webpage + " - " + e.toString());
                                System.err.println("cannot create directory " + itemsR[j] + ": " + e.getMessage());
                                ob_error(_response, docOut);
                                return null;
                            }
                        }
                    }
                    if (itemsL[itemsL.length - 1].equals("*")) {
                        flag_dir = true;
                    }
                    String localFile = _applicationPath.getHomePath() + ob_getSeparator(null, _applicationPath.getHomePath()) + _applicationPath.getDefaultWebPagesPath() + ob_getSeparator(null, _applicationPath.getHomePath()) + localfile;
                    String remoteFile = localfile;

                    try {
                        if (remotedir != null && !remotedir.equals("")) {
                            remoteFile = remotedir + ob_getSeparator(ftp, remotedir) + localfile;
                        }
                        if (type != null && type.equals("web")) {
                            if (!project.equals(""))
                                localfile = _applicationPath.getHomePath() + ob_getSeparator(null, _applicationPath.getHomePath()) + _applicationPath.getDefaultWebPagesPath() + ob_getSeparator(null, _applicationPath.getHomePath()) + "project" + ob_getSeparator(null, _applicationPath.getHomePath()) + project + ob_getSeparator(null, _applicationPath.getHomePath()) + localfile;
                            else
                                localfile = _applicationPath.getHomePath() + ob_getSeparator(null, _applicationPath.getHomePath()) + _applicationPath.getDefaultWebPagesPath() + ob_getSeparator(null, _applicationPath.getHomePath()) + "template" + ob_getSeparator(null, _applicationPath.getHomePath()) + templateCategory + ob_getSeparator(null, _applicationPath.getHomePath()) + localfile;
                        }
                        if (!flag_dir) {
                            try {
                                if (!new File(localFile).isDirectory()) {
                                    // Copy if checksum is not equal  and file exist
                                    if (new File(localFile).exists()) {
                                        if (new File(localFile).length() != get_remoteFtpFileChecksum(ftp, remoteFile)) {
                                            ftp.uploadFile(localFile, remoteFile);
                                            System.err.println("Copied successfully " + localFile + " to " + host + ":" + remoteFile);
                                        }
                                        // else
                                            //System.err.println("No need to copy " + localFile + " to " + host + ":" + remoteFile);
                                    }
                                }
                            } catch (Exception e) {
                                if (e.getMessage().contains("Permission denied")) {
                                    docOut = xml.set_class_object_attribute_value(docOut, "openbexi_creative", "application", "status", "Not ok");
                                    docOut = xml.set_class_object_attribute_value(docOut, "ob_ssh", "connection_" + number, "type_" + page_count, "error");
                                    docOut = xml.set_class_object_attribute_value(docOut, "ob_ssh", "connection_" + number, "status_" + page_count, "The Web page " + webpage + " has not be successfully published");
                                    docOut = xml.set_class_object_attribute_value(docOut, "ob_ssh", "connection_" + number, "status_" + page_count + "_" + count_issue, "Cannot copy file " + remoteFile + " - " + e.toString());
                                    System.err.println("cannot copy " + localFile + " to " + host + ":" + remoteFile + ": " + e.getMessage());
                                    ob_error(_response, docOut);
                                    return null;
                                } else if (e.getMessage().contains("socket write error")) {
                                    System.err.println("cannot copy " + localFile + " to " + host + ":" + remoteFile + ": " + e.getMessage());
                                } else {
                                    docOut = xml.set_class_object_attribute_value(docOut, "openbexi_creative", "application", "status", "Not ok");
                                    docOut = xml.set_class_object_attribute_value(docOut, "ob_ssh", "connection_" + number, "type_" + page_count, "warning");
                                    docOut = xml.set_class_object_attribute_value(docOut, "ob_ssh", "connection_" + number, "status_" + page_count, "The Web page " + webpage + " may be partially or not successfully published");
                                    docOut = xml.set_class_object_attribute_value(docOut, "ob_ssh", "connection_" + number, "status_" + page_count + "_" + count_issue, "Cannot copy " + remoteFile + " - " + e.toString());
                                    System.err.println("cannot copy " + localFile + " to " + host + ":" + remoteFile + ": " + e.getMessage());
                                    issue = true;
                                    count_issue++;
                                }
                            }
                        } else {
                            File file = new File(localFile.replace("/*", ""));
                            String[] list = file.list();
                            if (list != null) {
                                for (int i = 0; i < list.length; i++) {
                                    try {
                                        if (file.exists() && file.isFile()) {
                                            localFile = file.getAbsolutePath() + ob_getSeparator(null, _applicationPath.getHomePath()) + list[i];
                                            remoteFile = remoteFile.replace("/*", "") + ob_getSeparator(ftp, _applicationPath.getHomePath()) + list[i];
                                            if (new File(localFile).length() != get_remoteFtpFileChecksum(ftp, remoteFile)) {
                                                ftp.uploadFile(localFile, remoteFile);
                                                System.err.println("Copied successfully " + localFile + " to " + host + ":" + remoteFile);
                                            }
                                            //else
                                                //System.err.println("No need to copy " + localFile + " to " + host + ":" + remoteFile);

                                        }
                                        if (file.exists() && file.isDirectory() && i==0) {
                                            copyFolder(ftp, host, file.getAbsolutePath(), remoteFile.replace("/*", "") + ob_getSeparator(ftp, _applicationPath.getHomePath()));
                                        }
                                    } catch (Exception e) {
                                        docOut = xml.set_class_object_attribute_value(docOut, "openbexi_creative", "application", "status", "Not ok");
                                        docOut = xml.set_class_object_attribute_value(docOut, "ob_ssh", "connection_" + number, "type_" + page_count, "warning");
                                        docOut = xml.set_class_object_attribute_value(docOut, "ob_ssh", "connection_" + number, "status_" + page_count, "The Web page " + webpage + " may be partially or not successfully published");
                                        docOut = xml.set_class_object_attribute_value(docOut, "ob_ssh", "connection_" + number, "status_" + page_count + "_" + count_issue, "Cannot copy " + remoteFile + " - " + e.toString());
                                        System.err.println("cannot copy " + localFile + " to " + host + ":" + remoteFile + ": " + e.getMessage());
                                        issue = true;
                                        count_issue++;
                                    }
                                }
                            }
                        }
                    } catch (Exception e) {
                        docOut = xml.set_class_object_attribute_value(docOut, "openbexi_creative", "application", "status", "Not ok");
                        docOut = xml.set_class_object_attribute_value(docOut, "ob_ssh", "connection_" + number, "type_" + page_count, "warning");
                        docOut = xml.set_class_object_attribute_value(docOut, "ob_ssh", "connection_" + number, "status_" + page_count, "The Web page " + webpage + " may be partially or not successfully published");
                        docOut = xml.set_class_object_attribute_value(docOut, "ob_ssh", "connection_" + number, "status_" + page_count + "_" + count_issue, "Cannot copy " + remoteFile + " - " + e.toString());
                        System.err.println("cannot copy " + localFile + " to " + host + ":" + remoteFile + ": " + e.getMessage());
                        issue = true;
                        count_issue++;
                    }
                } else {
                    flag_file = false;
                }
            }
        }
        if (issue) {
            ob_error(_response, docOut);
            return null;
        } else
            return docOut;
    }

    public Document copy(SftpClient sftp, Document docOut, int page_count) throws Exception {
        final BEXI_XMLDriver xml = new BEXI_XMLDriver();
        boolean flag_file = true;
        int count = 0;
        int count_issue = 0;
        boolean flag_dir = false;
        String remotedir = xml.get_class_object_attribute_value(docOut, "ob_explorer", "remotedir", "path");
        String number = xml.get_class_object_attribute_value(docOut, "ob_ssh", "connection", "number");
        String host = xml.get_class_object_attribute_value(docOut, "ob_ssh", "connection_" + number, "host");
        String project = xml.get_class_object_attribute_value(docOut, "ob_explorer", "dir", "project");
        String webpage = xml.get_class_object_attribute_value(docOut, "ob_explorer", "dir", "filename");
        String templateCategory = xml.get_class_object_attribute_value(docOut, "ob_explorer", "dir", "templateCategory");

        docOut = xml.set_class_object_attribute_value(docOut, "openbexi_creative", "application", "status", "ok");
        docOut = xml.set_class_object_attribute_value(docOut, "ob_ssh", "connection_" + number, "type_" + page_count, "info");
        docOut = xml.set_class_object_attribute_value(docOut, "ob_ssh", "connection_" + number, "status_" + page_count, "The Web page " + webpage + " has been successfully published");
        boolean issue = false;
        String exception = null;

        if (sftp == null) {
            docOut = xml.set_class_object_attribute_value(docOut, "openbexi_creative", "application", "status", "Not ok");
            docOut = xml.set_class_object_attribute_value(docOut, "ob_ssh", "connection_" + number, "type_" + page_count, "error");
            docOut = xml.set_class_object_attribute_value(docOut, "ob_ssh", "connection_" + number, "status_" + page_count, "Not connected to " + host);
            docOut = xml.set_class_object_attribute_value(docOut, "ob_ssh", "connection_" + number, "status_" + page_count + "_" + count_issue, "The Web page " + webpage + " has not be successfully published");
            System.err.println(host + "not connected");
            ob_error(_response, docOut);
        } else {

            String build_dir = "";
            String[] itemsR = remotedir.split("/");

            if (remotedir != null && !remotedir.trim().equals("") && !remotedir.equals(".."))
                for (int j = 0; j < itemsR.length; j++) {
                    try {
                        if (!itemsR[j].equals("*")) {
                            build_dir += itemsR[j] + ob_getSeparator(sftp, remotedir);
                            if (j == 0)
                                sftp.mkdir(itemsR[j]);
                            else
                                sftp.mkdir(build_dir);
                        }
                    } catch (Exception e) {
                        if (!e.getMessage().contains("exists")) {
                            docOut = xml.set_class_object_attribute_value(docOut, "openbexi_creative", "application", "status", "Not ok");
                            docOut = xml.set_class_object_attribute_value(docOut, "ob_ssh", "connection_" + number, "type_" + page_count, "error");
                            docOut = xml.set_class_object_attribute_value(docOut, "ob_ssh", "connection_" + number, "status_" + page_count, "Cannot create directory " + itemsR[j]);
                            docOut = xml.set_class_object_attribute_value(docOut, "ob_ssh", "connection_" + number, "status_" + page_count + "_" + count_issue, "Cannot publish " + webpage + " - " + e.toString());
                            System.err.println("cannot create directory " + itemsR[j] + ": " + e.getMessage());
                            ob_error(_response, docOut);
                            return null;
                        }
                    }
                }

            xml.set_class_object_attribute_value(docOut, "ob_ssh", "connection_" + number, "status_" + page_count, host + " connected");
            while (flag_file) {
                String localfile = xml.get_class_object_attribute_value(docOut, "ob_explorer", "file_" + count, "name");
                String type = xml.get_class_object_attribute_value(docOut, "ob_explorer", "file_" + count, "type");
                count++;
                flag_dir = false;
                if (localfile != null && !localfile.equals("")) {

                    //Create dirs if nedded;
                    String[] itemsL = localfile.split("/");
                    build_dir = "";
                    for (int j = 0; j < itemsL.length - 1; j++) {
                        try {
                            if (!itemsL[j].equals("*")) {
                                if (itemsL[j] != null && !itemsL[j].equals("") && !itemsL[j].equals(".") && !itemsL[j].equals("..")) {
                                    build_dir += itemsL[j] + ob_getSeparator(sftp, remotedir);
                                    if (j > 0)
                                        try {
                                            sftp.mkdir(remotedir + ob_getSeparator(sftp, remotedir) + build_dir);
                                        } catch (Exception e) {
                                        }
                                    else
                                        try {
                                            sftp.mkdir(remotedir + ob_getSeparator(sftp, remotedir) + itemsL[j]);
                                        } catch (Exception e) {
                                        }
                                } else {
                                    build_dir += itemsL[j] + "/";
                                    if (j > 0)
                                        try {
                                            sftp.mkdir(build_dir);
                                        } catch (Exception e) {
                                        }
                                    else
                                        try {
                                            sftp.mkdir(itemsL[j]);
                                        } catch (Exception e) {
                                        }
                                }
                            }
                        } catch (Exception e) {
                            if (!e.getMessage().contains("exists")) {
                                docOut = xml.set_class_object_attribute_value(docOut, "openbexi_creative", "application", "status", "Not ok");
                                docOut = xml.set_class_object_attribute_value(docOut, "ob_ssh", "connection_" + number, "type_" + page_count, "error");
                                docOut = xml.set_class_object_attribute_value(docOut, "ob_ssh", "connection_" + number, "status_" + page_count, "Cannot create directory " + itemsL[j]);
                                docOut = xml.set_class_object_attribute_value(docOut, "ob_ssh", "connection_" + number, "status_" + page_count + "_" + count_issue, "Cannot publish " + webpage + " - " + e.toString());
                                System.err.println("cannot create directory " + itemsR[j] + ": " + e.getMessage());
                                ob_error(_response, docOut);
                                return null;
                            }
                        }
                    }
                    if (itemsL[itemsL.length - 1].equals("*")) {
                        flag_dir = true;
                    }
                    String remoteFile = "web page";
                    String localFile = _applicationPath.getHomePath() + ob_getSeparator(null, _applicationPath.getHomePath()) + _applicationPath.getDefaultWebPagesPath() + ob_getSeparator(null, _applicationPath.getHomePath()) + localfile;
                    try {
                        remoteFile = localfile;
                        if (remotedir != null && !remotedir.equals("") && !remotedir.equals("/")) {
                            remoteFile = remotedir + ob_getSeparator(null, remotedir) + localfile;
                        }
                        if (type != null && type.equals("web")) {
                            if (!project.equals(""))
                                localfile = _applicationPath.getHomePath() + ob_getSeparator(null, _applicationPath.getHomePath()) + _applicationPath.getDefaultWebPagesPath() + ob_getSeparator(null, _applicationPath.getHomePath()) + "project" + ob_getSeparator(null, _applicationPath.getHomePath()) + project + ob_getSeparator(null, _applicationPath.getHomePath()) + localfile;
                            else
                                localfile = _applicationPath.getHomePath() + ob_getSeparator(null, _applicationPath.getHomePath()) + _applicationPath.getDefaultWebPagesPath() + ob_getSeparator(null, _applicationPath.getHomePath()) + "template" + ob_getSeparator(null, _applicationPath.getHomePath()) + "ob_page" + ob_getSeparator(null, _applicationPath.getHomePath()) + templateCategory + ob_getSeparator(null, _applicationPath.getHomePath()) + localfile;
                        }

                        if (!flag_dir) {
                            try {
                                if (!new File(localFile).isDirectory()) {
                                    if (new File(localFile).length() != get_remoteSftpFileChecksum(sftp, remoteFile)) {
                                        sftp.put(localFile, remoteFile);
                                        System.err.println("Copied successfully " + localFile + " to " + host + ":" + remoteFile);
                                    }
                                    //else
                                        //System.err.println("No need to copy " + localFile + " to " + host + ":" + remoteFile);
                                }
                            } catch (Exception e) {
                                if (e.getMessage().contains("Permission denied")) {
                                    docOut = xml.set_class_object_attribute_value(docOut, "openbexi_creative", "application", "status", "Not ok");
                                    docOut = xml.set_class_object_attribute_value(docOut, "ob_ssh", "connection_" + number, "type_" + page_count, "error");
                                    docOut = xml.set_class_object_attribute_value(docOut, "ob_ssh", "connection_" + number, "status_" + page_count, "The Web page " + webpage + " has not be successfully published");
                                    docOut = xml.set_class_object_attribute_value(docOut, "ob_ssh", "connection_" + number, "status_" + page_count + "_" + count_issue, "Cannot copy file " + remoteFile + " - " + e.toString());
                                    System.err.println("cannot copy " + localFile + " to " + host + ":" + remoteFile + ": " + e.getMessage());
                                    ob_error(_response, docOut);
                                    return null;
                                } else if (e.getMessage().contains("socket write error")) {
                                    System.err.println("cannot copy " + localFile + " to " + host + ":" + remoteFile + ": " + e.getMessage());
                                } else {
                                    docOut = xml.set_class_object_attribute_value(docOut, "openbexi_creative", "application", "status", "Not ok");
                                    docOut = xml.set_class_object_attribute_value(docOut, "ob_ssh", "connection_" + number, "type_" + page_count, "warning");
                                    docOut = xml.set_class_object_attribute_value(docOut, "ob_ssh", "connection_" + number, "status_" + page_count, "The Web page " + webpage + " may be partially or not successfully published");
                                    docOut = xml.set_class_object_attribute_value(docOut, "ob_ssh", "connection_" + number, "status_" + page_count + "_" + count_issue, "Cannot copy " + remoteFile + " - " + e.toString());
                                    System.err.println("cannot copy " + localFile + " to " + host + ":" + remoteFile + ": " + e.getMessage());
                                    issue = true;
                                    count_issue++;
                                }
                            }
                        } else {
                            File file = new File(localFile.replace("/*", ""));
                            String[] list = file.list();
                            if (list != null) {
                                for (int i = 0; i < list.length; i++) {
                                    try {
                                        if (file.isFile()) {
                                            localFile = file.getAbsolutePath() + ob_getSeparator(null, _applicationPath.getHomePath()) + list[i];
                                            remoteFile = remoteFile.replace("/*", "") + ob_getSeparator(sftp, _applicationPath.getHomePath()) + list[i];
                                            if (new File(localFile).length() != get_remoteSftpFileChecksum(sftp, remoteFile)) {
                                                sftp.put(localFile, remoteFile);
                                                System.err.println("Copied successfully " + localFile + " to " + host + ":" + remoteFile);
                                            }
                                            //else
                                                //System.err.println("No need to copy " + localFile + " to " + host + ":" + remoteFile);
                                        }
                                        if (file.isDirectory()) {
                                            copyFolder(sftp, host, file.getAbsolutePath(), remoteFile.replace("/*", "") + ob_getSeparator(sftp, _applicationPath.getHomePath()));
                                        }
                                    } catch (Exception e) {
                                        docOut = xml.set_class_object_attribute_value(docOut, "openbexi_creative", "application", "status", "Not ok");
                                        docOut = xml.set_class_object_attribute_value(docOut, "ob_ssh", "connection_" + number, "type_" + page_count, "warning");
                                        docOut = xml.set_class_object_attribute_value(docOut, "ob_ssh", "connection_" + number, "status_" + page_count, "The Web page " + webpage + " may be partially or not successfully published");
                                        docOut = xml.set_class_object_attribute_value(docOut, "ob_ssh", "connection_" + number, "status_" + page_count + "_" + count_issue, "Cannot copy " + remoteFile + " - " + e.toString());
                                        System.err.println("cannot copy " + localFile + " to " + host + ":" + remoteFile + ": " + e.getMessage());
                                        issue = true;
                                        count_issue++;
                                    }
                                }
                            }
                        }
                    } catch (Exception e) {
                        docOut = xml.set_class_object_attribute_value(docOut, "openbexi_creative", "application", "status", "Not ok");
                        docOut = xml.set_class_object_attribute_value(docOut, "ob_ssh", "connection_" + number, "type_" + page_count, "warning");
                        docOut = xml.set_class_object_attribute_value(docOut, "ob_ssh", "connection_" + number, "status_" + page_count, "The Web page " + webpage + " may be partially or not successfully published");
                        docOut = xml.set_class_object_attribute_value(docOut, "ob_ssh", "connection_" + number, "status_" + page_count + "_" + count_issue, "Cannot copy " + remoteFile + " - " + e.toString());
                        System.err.println("cannot copy " + localFile + " to " + host + ":" + remoteFile + ": " + e.getMessage());
                        issue = true;
                        count_issue++;
                    }
                } else {
                    flag_file = false;
                }
            }
        }
        if (issue) {
            ob_error(_response, docOut);
            return null;
        } else
            return docOut;
    }

    public BEXI_FileFinder getObjects(Document docOut) throws Exception {
        BEXI_FileFinder filefinder = new BEXI_FileFinder();
        final BEXI_XMLDriver xml = new BEXI_XMLDriver();
        SftpClient sftp = null;
        FileTransferClient ftp = null;

        String filter = xml.get_class_object_attribute_value(docOut, "ob_explorer", "dir", "filter");
        if (filter.equals("none")) filter = "";
        String fileFilter = xml.get_class_object_attribute_value(docOut, "ob_explorer", "file", "filter");
        filter = filter.trim();
        fileFilter = fileFilter.trim();
        Pattern patternFileFilter = Pattern.compile("");
        if (!fileFilter.equals(""))
            patternFileFilter = Pattern.compile("(\\." + fileFilter.trim() + "$)");
        Pattern patternFilter = Pattern.compile("(" + filter + ")");

        String number = xml.get_class_object_attribute_value(docOut, "ob_ssh", "connection", "number");
        String website = xml.get_class_object_attribute_value(docOut, "ob_ssh", "connection_" + number, "website");
        String host = xml.get_class_object_attribute_value(docOut, "ob_ssh", "connection_" + number, "host");
        String PublicKey = xml.get_class_object_attribute_value(docOut, "ob_ssh", "connection_" + number, "PublicKey");
        String path = xml.get_class_object_attribute_value(docOut, "ob_ssh", "connection_" + number, "path");
        String project = xml.get_class_object_attribute_value(docOut, "ob_explorer", "dir", "project");
        try {
            // Note: if PublicKey = ftp or empty use ftp protocol via  FileTransferClient from LGPL edtFTPj lib
            if (PublicKey.equals("") || PublicKey.equals("FTP"))
                ftp = connect(docOut, PublicKey);
                //else use j2ssh: Java SSH2 GNU API.
            else
                sftp = connect(docOut);
        } catch (Exception e1) {
            docOut = xml.set_class_object_attribute_value(docOut, "ob_ssh", "connection_" + number, "type_0", "warning");
            docOut = xml.set_class_object_attribute_value(docOut, "ob_ssh", "connection_" + number, "status_0", "Cannot connect to " + website + " - " + e1.toString());
            return filefinder;
        }
        if (sftp != null) {
            try {
                docOut = xml.set_class_object_attribute_value(docOut, "ob_ssh", "connection_" + number, "type_0", "info");
                xml.set_class_object_attribute_value(docOut, "ob_ssh", "connection_" + number, "status_0", website + " connected");
                String cmd = xml.get_class_object_attribute_value(docOut, "system", "command", "text");
                System.out.println("Current path on " + website + ":" + sftp.pwd());
                if (cmd.contains("cd ")) {
                    if (!cmd.equals("cd .")) {
                        if (!path.equals("")) cmd = path + "/" + cmd;
                        sftp.cd(cmd.replaceFirst("cd ", ""));
                    }
                    List files = sftp.ls();
                    for (int i = 0; i < files.size(); i++) {
                        SftpFile file = (SftpFile) files.get(i);
                        Matcher matcherFileFilter = patternFileFilter.matcher(file.getFilename().toLowerCase());
                        Matcher matcherFilter = patternFilter.matcher(file.getFilename().toLowerCase());
                        if (matcherFileFilter.find() && matcherFilter.find())
                            filefinder.get_files().add(file);
                    }
                    filefinder.setAbsolutePath(sftp.pwd());
                }
                if (cmd.contains("mkdir ")) {
                    sftp.mkdir(cmd);
                    docOut = xml.set_class_object_attribute_value(docOut, "ob_explorer", "mkdir", "status", "done");
                }
                if (cmd.contains("pwd")) {
                    String pwd = sftp.lpwd();
                    docOut = xml.set_class_object_attribute_value(docOut, "ob_explorer", "pwd", "text", pwd);
                }
            } catch (IOException e) {
                docOut = xml.set_class_object_attribute_value(docOut, "ob_ssh", "connection_" + number, "type_0", "info");
                xml.set_class_object_attribute_value(docOut, "ob_ssh", "connection_" + number, "status_0", "Connected to " + website + "  but no Web page found (project:" + project + ")");
            } catch (Exception e) {
                docOut = xml.set_class_object_attribute_value(docOut, "ob_ssh", "connection_" + number, "type_0", "error");
                xml.set_class_object_attribute_value(docOut, "ob_ssh", "connection_" + number, "status_0", "request failed: " + e.getMessage());
            }
        } else if (ftp != null) {
            try {
                docOut = xml.set_class_object_attribute_value(docOut, "ob_ssh", "connection_" + number, "type_0", "info");
                xml.set_class_object_attribute_value(docOut, "ob_ssh", "connection_" + number, "status_0", host + " connected");
                String cmd = xml.get_class_object_attribute_value(docOut, "system", "command", "text");
                if (cmd.contains("cd ")) {
                    if (!cmd.equals("cd .")) {
                        if (!path.equals("")) cmd = path + "/" + cmd;
                        ftp.changeDirectory(cmd.replaceFirst("cd ", ""));
                    }
                    FTPFile[] files = ftp.directoryList();
                    for (int i = 0; i < files.length; i++) {
                        Matcher matcherFileFilter = patternFileFilter.matcher(files[i].getName().toLowerCase());
                        Matcher matcherFilter = patternFilter.matcher(files[i].getName().toLowerCase());
                        FTPFile file = files[i];
                        if (matcherFileFilter.find() && matcherFilter.find())
                            filefinder.get_files().add(file);
                    }
                    filefinder.setAbsolutePath(ftp.getRemoteDirectory());
                }
                if (cmd.contains("mkdir ")) {
                    ftp.createDirectory(cmd);
                    docOut = xml.set_class_object_attribute_value(docOut, "ob_explorer", "mkdir", "status", "done");
                }
                if (cmd.contains("pwd")) {
                    String pwd = ftp.getRemoteDirectory();
                    docOut = xml.set_class_object_attribute_value(docOut, "ob_explorer", "pwd", "text", pwd);
                }
            } catch (FTPException e) {
                docOut = xml.set_class_object_attribute_value(docOut, "ob_ssh", "connection_" + number, "type_0", "info");
                xml.set_class_object_attribute_value(docOut, "ob_ssh", "connection_" + number, "status_0", "Connected to " + website + "  but no Web page found (project:" + project + ")");
            } catch (IOException e) {
                docOut = xml.set_class_object_attribute_value(docOut, "ob_ssh", "connection_" + number, "type_0", "info");
                xml.set_class_object_attribute_value(docOut, "ob_ssh", "connection_" + number, "status_0", "Connected to " + website + "  but no Web page found (project:" + project + ")");
            } catch (Exception e) {
                docOut = xml.set_class_object_attribute_value(docOut, "ob_ssh", "connection_" + number, "type_0", "error");
                xml.set_class_object_attribute_value(docOut, "ob_ssh", "connection_" + number, "status_0)", "request failed: " + e.getMessage());
            }
        } else {
            try {
                docOut = xml.set_class_object_attribute_value(docOut, "ob_ssh", "connection_" + number, "type_0", "warning");
                docOut = xml.set_class_object_attribute_value(docOut, "ob_ssh", "connection_" + number, "status_0", "Cannot connect to the host, please check if your login or password is correct");
            } catch (Exception e1) {
                System.err.println(e1);
            }
        }
        return filefinder;
    }

    public static void main(String args[]) {
        try {
            // Setup a logfile
            Handler fh = new FileHandler("example.log");
            fh.setFormatter(new SimpleFormatter());
            Logger.getLogger("com.sshtools").setUseParentHandlers(false);
            Logger.getLogger("com.sshtools").addHandler(fh);
            Logger.getLogger("com.sshtools").setLevel(Level.OFF);
            // Configure J2SSH (This will attempt to install the bouncycastle provider
            // under jdk 1.3.1)
            ConfigurationLoader.initialize(false);

            // Make a client connection
            //SshClient ssh = new SshClient();
            // Connect to the host
            //ssh.connect("205.245.91.238");

            // Make a client connection
            SshClient ssh = new SshClient();
            ssh.setSocketTimeout(30000);
            SshConnectionProperties properties = new SshConnectionProperties();
            properties.setHost("205.245.91.238");
            properties.setPrefPublicKey("ssh-dss");
            // Connect to the host
            // ssh.connect(properties);
            ssh.connect(properties, new IgnoreHostKeyVerification());

            // Create a password authentication instance
            PasswordAuthenticationClient pwd = new PasswordAuthenticationClient();
            // Get the users name
            pwd.setUsername("bexiadmin");
            // Get the password
            pwd.setPassword("");
            // Try the authentication
            int result = ssh.authenticate(pwd);
            // Evaluate the result
            if (result == AuthenticationProtocolState.COMPLETE) {
                // The connection is authenticated we can now do some real work!
                SftpClient sftp = ssh.openSftpClient();
                // Make a directory
                //try {
                //sftp.mkdir("j2ssh");
                //}
                //catch (IOException ex) {
                //}
                // Change directory
                sftp.cd("../public_html");
                List files = sftp.ls();
                System.out.println(sftp.pwd());
                for (int i = 0; i < files.size(); i++) {
                    SftpFile file = (SftpFile) files.get(i);
                    System.out.println(file.getFilename());
                }
                // Change the mode
                //sftp.chmod(0777, "j2ssh");
                //sftp.lcd("c:/");
                // Upload a file
                //sftp.put("system.gif");
                // Change the local directory
                //sftp.lcd("localdir");
                // Download a file
                //sftp.get("somefile.txt", "anotherfile.txt");
                // Remove a directory or file
                //sftp.rm("j2ssh");
                // Quit
                sftp.quit();
                ssh.disconnect();
            } else {
                System.out.println("Connection failed");
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            System.exit(0);
        }
    }
}


