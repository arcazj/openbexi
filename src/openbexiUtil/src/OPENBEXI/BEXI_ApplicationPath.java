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


import org.w3c.dom.Document;
import com.sun.org.apache.xerces.internal.parsers.DOMParser;


/**
 * Set up a OPENBEXI default application environment.
 * Note: Don't forget to install JDBC connector under WEB_INF/lib.
 */

public final class BEXI_ApplicationPath {

    // Language
    private String _defaultLanguage = null;

    //Path set
    private String _homePath = null;
    private String _defaultPath = null;
    private String _defaultClassPath = null;
    private String _defaultImagesPath = null;
    private String _defaultWebPagesPath = null;
    private String _defaultImagesClientPath = null;
    private String _defaultWebPagesClientPath = null;
    private String _defaultMetaRulesPath = null;
    private String _defaultXMLFilePath = null;

    // Database set
    private BEXI_SqlContextManager _SqlContextManager;

    /**
     * OPENBEXI context constructor.
     */
    public BEXI_ApplicationPath(String nothing) {

    }

    /**
     * OPENBEXI context constructor
     */
    public BEXI_ApplicationPath() {
        if (_SqlContextManager == null) _SqlContextManager = new BEXI_SqlContextManager();
        //Set default paths
        final BEXI_XMLDriver xml = new BEXI_XMLDriver();
        Document docOut = null;
        DOMParser parser = null;
        boolean contextFound = true;


        _homePath = System.getProperty("user.dir");
        String bexi_home = System.getenv("BEXI_HOME");
        if (bexi_home == null) bexi_home = _homePath;
        try {
            parser = new DOMParser();
            parser.parse( bexi_home + System.getProperty("file.separator") + "bexicontext" + ".xml");
            System.out.println("read " + bexi_home + System.getProperty("file.separator") + "bexicontext" + ".xml");
        } catch (Exception e) {
            System.out.println("No current bexi context\nCannot read " + bexi_home + System.getProperty("file.separator") + "bexicontext" + ".xml" + "\nreason:" + e.getMessage());
            contextFound = false;
        }
        if (contextFound) {
            try {
                docOut = parser.getDocument();
                _defaultXMLFilePath = bexi_home;
                _defaultPath = xml.get_class_object_attribute_value(docOut, "bexicontext", "path", "home");
                _defaultClassPath = xml.get_class_object_attribute_value(docOut, "bexicontext", "path", "class");
                _defaultMetaRulesPath = xml.get_class_object_attribute_value(docOut, "bexicontext", "path", "metarules");
                _defaultImagesPath = xml.get_class_object_attribute_value(docOut, "bexicontext", "path", "images");
                _defaultWebPagesPath = xml.get_class_object_attribute_value(docOut, "bexicontext", "path", "webpages");
                _defaultImagesClientPath = xml.get_class_object_attribute_value(docOut, "bexicontext", "path", "imagesClient");
                _defaultWebPagesClientPath = xml.get_class_object_attribute_value(docOut, "bexicontext", "path", "webpagesClient");
                _defaultWebPagesClientPath = xml.get_class_object_attribute_value(docOut, "bexicontext", "path", "webpagesClient");
                //Language
                _defaultLanguage = xml.get_class_object_attribute_value(docOut, "bexicontext", "language", "name");
            } catch (Exception e) {
                System.err.println("Cannot set up BEXI_CONTEXT from " + System.getProperty("file.separator") + "bexicontext.xml");
            }
            //Databse set
            boolean findDatabase = true;
            int count = 0;
            String driverName = null;
            while (findDatabase) {
                try {
                    driverName = xml.get_class_object_attribute_value(docOut, "ob_database", "database_" + count, "name");
                    if (driverName != null) {
                        String defDriver = xml.get_class_object_attribute_value(docOut, "ob_database", "database_" + count, "driver");
                        String defURL = xml.get_class_object_attribute_value(docOut, "ob_database", "database_" + count, "url");
                        String defUser = xml.get_class_object_attribute_value(docOut, "ob_database", "database_" + count, "user");
                        String defPassword = xml.get_class_object_attribute_value(docOut, "ob_database", "database_" + count, "password");
                        if (defPassword == null) defPassword = "";
                        count++;
                        try {
                            BEXI_SqlContext SqlContext = new BEXI_SqlContext(driverName, defDriver, defURL, defUser, defPassword, null);
                            _SqlContextManager.addBEXI_SqlContext(SqlContext);
                        } catch (Exception e1) {
                            System.err.println("Cannot connect to database:" + defURL + "\nReason:" + e1);
                        }
                    } else {
                        findDatabase = false;
                    }
                } catch (Exception e3) {
                    System.err.println("Cannot set up BEXI_CONTEXT database from " + System.getProperty("file.separator") + "bexicontext.xml");
                }
            }
            try {
                driverName = xml.get_class_object_attribute_value(docOut, "ob_database", "databaseAdmin", "name");
            } catch (Exception e6) {
                System.err.println("Cannot set up BEXI_CONTEXT databaseadmin from " + System.getProperty("file.separator") + "bexicontext.xml");
            }
            if (driverName != null) {
                try {
                    String defDriver = xml.get_class_object_attribute_value(docOut, "ob_database", "databaseAdmin", "driver");
                    String defURL = xml.get_class_object_attribute_value(docOut, "ob_database", "databaseAdmin", "url");
                    String defUser = xml.get_class_object_attribute_value(docOut, "ob_database", "databaseAdmin", "user");
                    String defPassword = xml.get_class_object_attribute_value(docOut, "ob_database", "databaseAdmin", "password");
                    if (defPassword == null) defPassword = "";
                    try {
                        BEXI_SqlContext SqlContext = new BEXI_SqlContext(driverName, defDriver, defURL, defUser, defPassword, null);
                        _SqlContextManager.addBEXI_SqlContext(SqlContext);
                    } catch (Exception e2) {
                        System.err.println("Cannot connect to database:" + defURL + "\nReason:" + e2);
                    }
                } catch (Exception e4) {
                    System.err.println("Cannot set up BEXI_CONTEXT database from " + System.getProperty("file.separator") + "bexicontext.xml");
                }
            }
            try {
                // Get for the last one the real XML path
                _defaultXMLFilePath = xml.get_class_object_attribute_value(docOut, "bexicontext", "path", "xml");
            } catch (Exception e) {
                System.err.println("Cannot set up BEXI_CONTEXT:" + _defaultXMLFilePath + " from " + System.getProperty("file.separator") + "bexicontext.xml");
            }
        }
    }

    public BEXI_SqlContextManager get_SqlContextManager() {
        return _SqlContextManager;
    }

    public void set_SqlContextManager(BEXI_SqlContextManager _SqlContextManager) {
        this._SqlContextManager = _SqlContextManager;
    }

    public void set_homePath(String _homePath) {
        this._homePath = _homePath;
    }

    public void set_defaultPath(String _defaultPath) {
        this._defaultPath = _defaultPath;
    }

    public void set_defaultClassPath(String _defaultClassPath) {
        this._defaultClassPath = _defaultClassPath;
    }

    public void set_defaultMetaRulesPath(String _defaultMetaRulesPath) {
        this._defaultMetaRulesPath = _defaultMetaRulesPath;
    }

    public void set_defaultImagesPath(String _defaultImagesPath) {
        this._defaultImagesPath = _defaultImagesPath;
    }

    public void set_defaultWebPagesPath(String _defaultWebPagesPath) {
        this._defaultWebPagesPath = _defaultWebPagesPath;
    }

    public void set_defaultImagesClientPath(String _defaultImagesClientPath) {
        this._defaultImagesClientPath = _defaultImagesClientPath;
    }

    public void set_defaultWebPagesClientPath(String _defaultWebPagesClientPath) {
        this._defaultWebPagesClientPath = _defaultWebPagesClientPath;
    }

    public void set_defaultXMLFilePath(String _defaultXMLFilePath) {
        this._defaultXMLFilePath = _defaultXMLFilePath;
    }

    /**
     * Return the default language.
     *
     * @return driver.
     */
    public String getDefaultLanguage() {
        return _defaultLanguage;
    }

    /**
     * Set the default language.
     *
     * @param defaultLanguage .
     */
    public void set_defaultLanguage(String defaultLanguage) {
        _defaultLanguage = defaultLanguage;
    }

    /**
     * Return the root path.
     *
     * @return the root path.
     */

    public String getHomePath() {
        return _homePath;
    }

    public String getDefaultPath() {
        if (_defaultPath != null) {
            _defaultPath = _defaultPath.replaceAll("#", "\\" + System.getProperty("file.separator"));
        }
        return _defaultPath;
    }

    /**
     * default class path.
     *
     * @return _defaultClassPath
     */
    public String getDefaultClassPath() {
        if (_defaultClassPath != null) {
            _defaultClassPath = _defaultClassPath.replaceAll("#", "\\" + System.getProperty("file.separator"));
        }
        return _defaultClassPath;
    }

    /**
     * default class path.
     *
     * @return _defaultClassPath
     */
    public String getDefaultImagesPath() {
        if (_defaultImagesPath != null) {
            _defaultImagesPath = _defaultImagesPath.replaceAll("#", "\\" + System.getProperty("file.separator"));
        }
        return _defaultImagesPath;
    }

    /**
     * default class path.
     *
     * @return _defaultClassPath
     */
    public String getDefaultWebPagesPath() {
        if (_defaultWebPagesPath != null) {
            _defaultWebPagesPath = _defaultWebPagesPath.replaceAll("#", "\\" + System.getProperty("file.separator"));
        }
        return _defaultWebPagesPath;
    }

    /**
     * default class path.
     *
     * @return _defaultClassPath
     */
    public String getDefaultImagesClientPath() {
        if (_defaultImagesClientPath != null) {
            _defaultImagesClientPath = _defaultImagesClientPath.replaceAll("#", "\\" + System.getProperty("file.separator"));
        }
        return _defaultImagesClientPath;
    }

    /**
     * default class path.
     *
     * @return _defaultClassPath
     */
    public String getDefaultWebPagesClientPath() {
        if (_defaultWebPagesClientPath != null) {
            _defaultWebPagesClientPath = _defaultWebPagesClientPath.replaceAll("#", "\\" + System.getProperty("file.separator"));
        }
        return _defaultWebPagesClientPath;
    }

    /**
     * default class path.
     *
     * @return _defaultClassPath
     */
    public String getDefaultMetaRulesPath() {
        if (_defaultMetaRulesPath != null) {
            _defaultMetaRulesPath = _defaultMetaRulesPath.replaceAll("#", "\\" + System.getProperty("file.separator"));
        }
        return _defaultMetaRulesPath;
    }

    /**
     * default XML file path.
     *
     * @return _defaultXMLFilePath
     */
    public String getDefaultXMLFilePath() {
        if (_defaultXMLFilePath != null) {
            _defaultXMLFilePath = _defaultXMLFilePath.replaceAll("#", "\\" + System.getProperty("file.separator"));
        }
        return _defaultXMLFilePath;
    }

}


