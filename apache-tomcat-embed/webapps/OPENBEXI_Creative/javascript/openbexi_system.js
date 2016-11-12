/* This notice must be untouched at all times.

Copyright (c) 2005-2013 JC Arcaz. All rights reserved.
 OPEN OPENBEXI HTML Builder for generating dynanic HTML page and html code source from browsers.
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

 Note:
 OPEN OPENBEXI htmlbuilder uses dojo Toolkit (http://dojotoolkit.org/).
 OPEN OPENBEXI htmlbuilder uses query.min.js, jquery-ui.min.js, jQueryRotate.js, jquery.ui.touch-punch.min.js, jquery.jsPlumb-1.5.2-min.js, codemirror.js, fabrics.js
 */

var openbexi_system = function()
{

}
function openbexi_getServerSystemInfoCB(responseXML) {
    try {
        __openbexi_debugC("openbexi_getServerSystemInfoCB(" + responseXML + ")", "Info:");
        if (responseXML == null || responseXML == "") {
            if (openbexiNavigator) openbexiNavigator.status("openbexi_getServerSystemInfoCB bug ???");
            __openbexi_debugC("openbexi_getServerSystemInfoCB()", " Exception: No answer fron the server");
            openbexi_unloading2();
            return;
        }

        var ob_doc = openbexi_get_documentElement(responseXML, "text/xml");

        var status = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "status", "text");
        if (status != "" && status != "done") __openbexi_debugC("openbexi_getServerSystemInfoCB()", "Info: status=" + status);

        var appli_status = get_xml_classe_object_attribut_value(openbexi_getServerSystemInfoCB, "openbexi_creative", "application", "status");
        if (appli_status != "") __openbexi_debugC("openbexi_getServerSystemInfoCB()", "Info: appli_status=" + appli_status);

        var exception = get_xml_classe_object_attribut_value(ob_doc, "openbexi_creative", "application", "exception");
        if (exception != "") __openbexi_debugC("openbexi_getServerSystemInfoCB()", "Exception: " + exception);

        var hostname = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "serverInfo", "hostname");
        var ipAddr = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "serverInfo", "ipAddr");
        var java_version = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "serverInfo", "java.version");
        // Etc.. Check list of java key on www

    } catch (e) {
        __openbexi_debugC("openbexi_getServerSystemInfoCB()", "Exception:" + e.message);
    }
}
openbexi_system.prototype.getServerSystemInfo = function (ob_myCallBack) {
    try {
        __openbexi_debugC("openbexi_system.prototype.getServerSystemInfo()", "Info:");
        var doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "type", "openbexi_SystemInfoRequest");
        var ob_xml = openbexi_get_xmlString(doc);
        var mode_sync = openbexi_synchron();
        if (ob_callBack == null || ob_callBack == undefined)
            openbexi_connect_to_server(null, mode_sync, ob_xml, openbexi_getServerSystemInfoCB);
        else
            openbexi_connect_to_server(null, mode_sync, ob_xml, ob_myCallBack);
    } catch (e) {
        __openbexi_debugC("openbexi_system.prototype.getServerSystemInfo()", "Exception:" + e.message);
    }
}
// see reference: http://4umi.com/web/javascript/fileread.htm
openbexi_system.prototype.getfolder = function(s) {
    var fso = new ActiveXObject('Scripting.FileSystemObject'),
            e, f, i, r = [];
    if (fso.FolderExists(s)) {
        f = fso.GetFolder(s);
        e = new Enumerator(f.SubFolders);
        for (; !e.atEnd(); e.moveNext()) {
            if (( i = e.item() )) {
                r.push(' ' + i);
            }
        }
        e = new Enumerator(f.files);
        for (; !e.atEnd(); e.moveNext()) {
            if (( i = e.item() )) {
                r.push('' + i);
            }
        }
    }
    return r;
}
openbexi_system.prototype.getfile = function(fileName) {
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    fileObj = fso.GetFile(fileName);
    return fileObj;
}
openbexi_system.prototype.ShowAvailableDrives = function() {
    document.write(GetDriveList());
}
openbexi_system.prototype.GetDriveList = function() {
    var fso,  s,  n,  e,  x;
    fso = new ActiveXObject("Scripting.FileSystemObject");
    e = new Enumerator(fso.Drives);
    s = "";
    do
    {
        x = e.item();
        s = s + x.DriveLetter;
        s += ":-    ";
        if (x.DriveType == 3)     n = x.ShareName;
        else if (x.IsReady)     n = x.VolumeName;
        else                     n = "[Drive not ready]";
        s += n + "<br>";
        e.moveNext();
    } while (!e.atEnd());

    return(s);
}
openbexi_system.prototype.setCookie = function(name, value) {
    //If name is the empty string, it places a ; at the beginning
    //of document.cookie, causing clearCookies() to malfunction.
    if (name != '')
        document.cookie = name + '=' + value;
}
openbexi_system.prototype.getCookie = function(name) {
    //Without this, it will return the first value
    //in document.cookie when name is the empty string.
    if (name == '')
        return('');
    var name_index = document.cookie.indexOf(name + '=');
    if (name_index == -1)
        return('');

    var cookie_value = document.cookie.substr(name_index + name.length + 1,
            document.cookie.length);

    //All cookie name-value pairs end with a semi-colon, except the last one.
    var end_of_cookie = cookie_value.indexOf(';');
    if (end_of_cookie != -1)
        cookie_value = cookie_value.substr(0, end_of_cookie);

    //Restores all the blank spaces.
    var space = cookie_value.indexOf('+');
    while (space != -1)
    {
        cookie_value = cookie_value.substr(0, space) + ' ' +
                       cookie_value.substr(space + 1, cookie_value.length);

        space = cookie_value.indexOf('+');
    }

    return(cookie_value);
}
openbexi_system.prototype.clearCookie = function(name) {
    expires = new Date();
    expires.setYear(expires.getYear() - 1);
    document.cookie = name + '=null' + '; expires=' + expires;
}
openbexi_system.prototype.clearCookies = function() {
    Cookies = document.cookie;
    Cookie = Cookies;
    expires = new Date();
    expires.setYear(expires.getYear() - 1);

    while (Cookie.length > 0)
    {
        //All cookie name-value pairs end with a semi-colon, except the last one.
        Cookie = Cookies.substr(0, Cookies.indexOf(';'));
        Cookies = Cookies.substr(Cookies.indexOf(';') + 1, Cookies.length);

        if (Cookie != '')
            document.cookie = Cookie + '; expires=' + expires;
        else
            document.cookie = Cookies + '; expires=' + expires;
    }
}
openbexi_system.prototype.openbexi_stringReplaceAll = function(str, from, to) {
    if (from == "") return str;
    if (from == to) return str;
    try {
        var idx = str.indexOf(from);
        while (idx > -1) {
            str = str.replace(from, to);
            idx = str.indexOf(from);
        }
        return str;
    } catch(e) {
        //alert("\nopenbexi_system.prototype.openbexi_stringReplaceAll():" + e.name + ". Error message: " + e.message);
        return null;
    }
}
openbexi_system.prototype.openbexi_loadFileBrowser_noCopy = function() {
    try {
        if ((getBrowser() == "ie6" || getBrowser() == "ie7" || getBrowser() == "ie7_no_XMLHttpRequest")) {
            document.getElementById("ob_choosefile").click();
            var url = document.getElementById("ob_choosefile").value;
            url = openbexi_system.openbexi_stringReplaceAll(url, "\\", "/");
            url = openbexi_system.openbexi_stringReplaceAll(url, "%20", " ");
            return url;
        }
        else {
            url = prompt("Please, type the file name\nexample:\nhttp://www.openbexi.com/table/companies.xml or table/companies.xml\n\nNote: For security matter, you cannot type a full image path name like:\n" + "C:/Documents and Settings/My Documents/table/companies.xml", "");
            url = openbexi_system.openbexi_stringReplaceAll(url, "\\", "/");
            url = openbexi_system.openbexi_stringReplaceAll(url, "%20", " ");
            return url;
        }
    } catch(e) {
        alert("\nopenbexi_system.prototype.openbexi_loadFileBrowser_noCopy():" + e.name + ". Error message: " + e.message);
    }
    return null;
}
function openbexi_loadFileBrowser_CB(responseXML) {
    //alert("openbexi_loadFileBrowser_CB");
    window.resizeTo(screen.width, screen.height);
    window.moveTo(0, 0);
    var ob_doc = openbexi_get_documentElement(responseXML, "text/xml");
    var url = get_xml_classe_object_attribut_value(ob_doc, "media", "file", "name");
    if (url == null || url == "") {
        try {
            if (openbexiInspector) openbexiInspector.reset();
        } catch (e) {
        }
        return null;
    }
    var privatePath = openbexi_system.openbexi_stringReplaceAll(url, "\\", "/");
    //alert("openbexi_loadFileBrowser_CB\nurl=" + url + "\nprivatePath=" + privatePath);
    if (loadingElt == "IMG") add_HTMLImg(null, privatePath);
    if (loadingElt == "MEDIA") add_HTMLMedia(null, privatePath);
    try {
        if (openbexiInspector) openbexiInspector.reset();
    } catch (e) {
    }
    return 0;
}
openbexi_system.prototype.openbexi_loadFileBrowser_fromServer = function() {
    try {
        window.resizeTo(0, 0);
        var mode_sync = openbexi_synchron();
        var doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "type", "openbexi_loadFileBrowserRequest");
        var ob_xml = openbexi_get_xmlString(doc);
        return openbexi_connect_to_server(null, mode_sync, ob_xml, openbexi_loadFileBrowser_CB);
    } catch(e) {
        window.resizeTo(screen.width, screen.height);
        window.moveTo(0, 0);
        alert("\nCannot load the media\n\nError message: " + e.message);
        return null;
    }
}
openbexi_system.prototype.openbexi_loadFileBrowser = function(obj, force, background) {
    if (force == null || force == undefined) {
        if (background == undefined || background == null) background = false
        if (openbexiNavigator) openbexiNavigator.ob_background = background;
        if (openbexiNavigator) openbexiNavigator.mode = "getLocalData";
        if (openbexiNavigator) openbexiNavigator.display(null, 0);
    }
}
function openbexi_loadMedia() {
    var url = document.getElementById("ob_choosefile_creative").value;
    if (url == null || url == "") return null;
    // Get file name and private location
    var filename = openbexi_removePath(url, false);
    // copy image under private folder
    var privatePath = openbexi_get_home_directory(window.location.pathname) + "gifPlus/" + filename;
    privatePath = openbexi_system.openbexi_stringReplaceAll(privatePath, "\\", "/");
    privatePath = openbexi_system.openbexi_stringReplaceAll(privatePath, "%20", " ");
    url = openbexi_system.openbexi_stringReplaceAll(url, "\\", "/");
    url = openbexi_system.openbexi_stringReplaceAll(url, "%20", " ");
    privatePath = openbexi_CopyFile(url, privatePath);
    if (loadingElt == "IMG") add_HTMLImg(null, privatePath);
    if (loadingElt == "MEDIA") add_HTMLMedia(null, privatePath);
    openbexi_closeCreativeEditor("divLinkEditor");
    return 0;
}
function openbexi_fileBrowser() {
    var url = document.getElementById("ob_choosefile2").value;
    document.getElementById("ob_div_choosefile2").style.visibility = "hidden";
    document.getElementById("ob_div_choosefile3").style.visibility = "hidden";
    if (url == null || url == "") return null;
    // Get file name and private location
    var filename = openbexi_removePath(url, false);
    // copy image under private folder
    var privatePath = openbexi_get_home_directory(window.location.pathname) + "gifPlus/" + filename;
    privatePath = openbexi_system.openbexi_stringReplaceAll(privatePath, "\\", "/");
    privatePath = openbexi_system.openbexi_stringReplaceAll(privatePath, "%20", " ");
    url = openbexi_system.openbexi_stringReplaceAll(url, "\\", "/");
    url = openbexi_system.openbexi_stringReplaceAll(url, "%20", " ");
    privatePath = openbexi_CopyFile(url, privatePath);
    if (loadingElt == "IMG") add_HTMLImg(null, privatePath);
    if (loadingElt == "MEDIA") add_HTMLMedia(null, privatePath);
    return 0;
}
openbexi_system.prototype.openbexi_loadBrowser = function() {
    try {
        document.getElementById("ob_choosefile").click();
        url = document.getElementById("ob_choosefile").value;
        return url;
    } catch(e) {
        alert("\nopenbexi_system.prototype.openbexi_loadBrowser():" + e.name + ". Error message: " + e.message);
        return null;
    }
}

function openbexi_removePath(fileNameT, curDir) {
    try {
        //Remove path only if the URI protocol is not http/https/mailto
        if (fileNameT.match(":") && fileNameT.length < 5)  return fileNameT;
        if (!fileNameT.match("localhost:|127.|0.0.0:") && fileNameT.match("http:|https:|mailto:|sftp:")) return  fileNameT;

        var fileName = fileNameT.replace(/file:\/\/\//, "");
        fileName = fileName.replace(/\//g, "\\");
        // (for use on Windows OS)
        fileName = fileName.replace(/%20/g, " ");
        var iLastBackslash = fileName.lastIndexOf("\\");
        var thisfilename = fileName.substring(iLastBackslash + 1, fileName.length);
        var curdir = fileName.substring(0, iLastBackslash);
        curdir = curdir.replace(/file:\/\/\//, "");
        curdir = curdir.replace(/\//g, "\\");
        curdir = curdir.replace(/%20/g, " ");
        iLastBackslash = curdir.lastIndexOf("\\");
        var thiscurdir = curdir.substring(iLastBackslash + 1, curdir.length);
        //alert( thiscurdir +"/"+thisfilename +"\n");
        if (curDir)
            return thiscurdir + "/" + thisfilename;
        else {
            return thisfilename;
        }
    } catch(e) {
        alert("\nopenbexi_removePath():" + e.name + ". Error message: " + e.message);
        return null;
    }
}
function openbexi_deleteFile(filename) {
    filename = openbexi_system.openbexi_stringReplaceAll(filename, "/", "\\");
    filename = openbexi_system.openbexi_stringReplaceAll(filename, "%20", " ")
    if ((getBrowser() == "ie6" || getBrowser() == "ie7" || getBrowser() == "ie7_no_XMLHttpRequest")) {
        try {
            var fso = new ActiveXObject("Scripting.FileSystemObject");
            file = fso.GetFile(filename);
            file.Delete();
        } catch(e) {
            alert("Cannot delete the file " + filename + "\nopenbexi_deleteFile():" + e.name + ". Error message: " + e.message);
        }
    } else {
        //alert("Sorry, you need IE to delete this file\nThis feature does\'nt work for " + getBrowser());
    }
}
function openbexi_CopyFile(filename, filenamedest) {
    filename = openbexi_system.openbexi_stringReplaceAll(filename, "/", "\\");
    filename = openbexi_system.openbexi_stringReplaceAll(filename, "%20", " ");
    if (filename == filenamedest)return null;
    if ((getBrowser() == "ie6" || getBrowser() == "ie7" || getBrowser() == "ie7_no_XMLHttpRequest")) {
        try {
            var fso = new ActiveXObject("Scripting.FileSystemObject");
            file = fso.GetFile(filename);
            file.copy(filenamedest, true);
            filename = openbexi_system.openbexi_stringReplaceAll(filename, "\\", "/");
            filename = openbexi_system.openbexi_stringReplaceAll(filename, "%20", " ");
            return filenamedest;
        } catch(e) {
            //alert("Cannot copy the file " + filename + " to " + filenamedest + "\nopenbexi_CopyFile():" + e.name + ". Error message: " + e.message);
        }
        filename = openbexi_system.openbexi_stringReplaceAll(filename, "\\", "/");
        filename = openbexi_system.openbexi_stringReplaceAll(filename, "%20", " ");
        return filename;
    } else if (getBrowser() == "NN6") {
        try {
            //var text = openbexi_readFileToString(filename);
            //openbexi_WriteToFile(filenamedest, text);
        } catch(e) {
            //alert("Cannot copy the file " + filename + " to " + filenamedest + "\nopenbexi_CopyFile():" + e.name + ". Error message: " + e.message);
        }
        filename = openbexi_system.openbexi_stringReplaceAll(filename, "\\", "/");
        filename = openbexi_system.openbexi_stringReplaceAll(filename, "%20", " ");
        return filename;
    } else {
        alert("Sorry, you need IE to copy this file\nThis feature does\'nt work for " + getBrowser());
    }
    filename = openbexi_system.openbexi_stringReplaceAll(filename, "\\", "/");
    filename = openbexi_system.openbexi_stringReplaceAll(filename, "%20", " ");
    return filename;
}
function openbexi_WriteToFile(filename, text) {
    filename = openbexi_system.openbexi_stringReplaceAll(filename, "/", "\\");
    filename = openbexi_system.openbexi_stringReplaceAll(filename, "%20", " ");
    if ((getBrowser() == "ie6" || getBrowser() == "ie7" || getBrowser() == "ie7_no_XMLHttpRequest")) {
        try {
            var fso = new ActiveXObject("Scripting.FileSystemObject");
            if (fso.FileExists(filename))
            {
                var a, ForWriting, file;
                ForWriting = 2;
                try {
                    file = fso.OpenTextFile(filename, ForWriting, false);
                } catch(e) {
                    return "Permission to open and write " + filename + " denied.";
                }
                try {
                    file.WriteLine(text);
                } catch(e) {
                    return "Permission to write " + filename + " denied.";
                }
            } else {
                file = fso.CreateTextFile(filename, true);
                file.WriteLine(text);
            }
            file.Close();
        } catch(e) {
            return  "Permission to write " + filename + " denied.";
        }
    } else if (getBrowser() == "NN6") {
        try
        {
            //netscape.security.PrivilegeManager.enablePrivilege("UniversalPreferencesWrite")
            netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');
            file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
            if (openbexi_get_OS() == "windows") {
                file.initWithPath(filename);
            } else {
                filename = openbexi_system.openbexi_stringReplaceAll(filename, "\\", "/");
                file.initWithPath("/" + filename);
            }
            if (!file.exists()) {
                file.create(0x00, 0644);
            }
            var outputStream = Components.classes["@mozilla.org/network/file-output-stream;1"].createInstance(Components.interfaces.nsIFileOutputStream);
            outputStream.init(file, 0x20 | 0x02, 00004, null);
            //outputStream.initCells(file, 0x04 | 0x08 | 0x20, 420, 0);
            outputStream.write(text, text.length);
            outputStream.flush();
            outputStream.close();
        }
        catch (e) {
            return "Permission to write " + filename + " denied.";
        }
    } else {
        return "Sorry, you need IE or NN6 to read this page\nThis feature does\'nt work for " + getBrowser();
    }
    return null;
}
function openbexi_readFileToString(filename) {
    if ((getBrowser() == "ie6" || getBrowser() == "ie7" || getBrowser() == "ie7_no_XMLHttpRequest")) {
        try {
            if (filename == null) {
                filename = openbexi_system.openbexi_loadBrowser();
            }
            var strContents;
            strContents = "";
            objFSO = new ActiveXObject("Scripting.FileSystemObject");
            var Object1 = new ActiveXObject('Scripting.FileSystemObject');
            if (objFSO.FileExists(filename)) {
                var LirTxt = Object1.GetFile(filename);
                var doc1 = LirTxt.OpenAsTextStream(1);
                var txt = doc1.ReadAll();
                doc1.Close();
            } else {
                alert("Sorry, cannot open " + filename)
            }
            return txt;
        } catch(e) {
            alert("Cannot read the file " + filename + "\nopenbexi_readFileToString():" + e.name + ". Error message: " + e.message);
            return null;
        }
    } else if (getBrowser() == "NN6") {
        try
        {
            //netscape.security.PrivilegeManager.enablePrivilege("UniversalPreferencesRead")
            netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
        }
        catch (e) {
            alert("Permission to read file denied.");
            return '';
        }
        var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
        file.initWithPath(filename);
        if (!file.exists()) {
            alert("File not found.");
            return '';
        }
        var is = Components.classes["@mozilla.org/network/file-input-stream;1"].createInstance(Components.interfaces.nsIFileInputStream);
        is.initCells(file, 0x01, 00004, null);
        var sis = Components.classes["@mozilla.org/scriptableinputstream;1"].createInstance(Components.interfaces.nsIScriptableInputStream);
        sis.initCells(is);
        var output = sis.read(sis.available());
        return output;
    } else {
        alert("Sorry, you need IE to read this page\nThis feature does\'nt work for " + getBrowser());
    }
    return '';
}
function openbexi_get_HTML_page_name() {
    try {
        var sPathTmp = window.location.pathname;
        var sPage = sPathTmp.substring(sPathTmp.lastIndexOf('/') + 1);
        return  sPage;
    } catch(e) {
        alert("openbexi_get_HTML_page_name():" + e.name + ". Error message: " + e.message);
        return null;
    }
}
function openbexi_get_home_directory(path) {
    try {
        var sPathTmp = path;
        sPathTmp = sPathTmp.replace("\/", "");
        sPathTmp = openbexi_system.openbexi_stringReplaceAll(sPathTmp, "\\", "/");
        var sPage = sPathTmp.substring(sPathTmp.lastIndexOf('\/') + 1);
        return sPathTmp.replace(sPage, "");
    } catch(e) {
        alert("openbexi_get_home_directory():" + e.name + ". Error message: " + e.message);
        return null;
    }
}
function openbexi_clearText(text) {
    if (text == null) return null;
    try {
        var re = /\$|,|@|#|~|`|\%2520|\%|\*|\^|\&|\(|\)|\+|\=|\[|\]|\[|\}|\{|\;|\:|\'|\"|\<|\>|\?|\||\\|\!|\$/g;
        return text.replace(re, "").trim();
    } catch(e) {
        alert("openbexi_clearText():" + e.name + ". Error message: " + e.message);
        return text;
    }
}
function openbexi_clearText2(text) {
    if (text == null) return null;
    try {
        var re = /\%2520|\,|\$/g;
        return text.replace(re, "");
    } catch(e) {
        alert("openbexi_clearText():" + e.name + ". Error message: " + e.message);
        return text;
    }
}
function openbexi_readFile() {
    var fileContent = '';
    var theLocation = '';

    if (document.ReadURL.finished == 0) {
        setTimeout("openbexi_readFile()", 100);
        return null;
    }
    fileContent = document.ReadURL.fileContent;
    return fileContent;
}


