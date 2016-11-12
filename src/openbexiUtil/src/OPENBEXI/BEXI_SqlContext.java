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

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;

public class BEXI_SqlContext {

    // Database set
    private String _driverName = null;
    private String _driver = null;
    private String _url = null;
    private String _user = null;
    private String _password = null;
    private Statement _statement = null;

    /**
     * OPENBEXI context constructor.
     */
    public BEXI_SqlContext(String nothing) {

    }

    /**
     * OPENBEXI context constructor.
     *
     * @throws Exception
     */
    public BEXI_SqlContext(String driverName, String defDriver, String defURL, String defUser, String defPassword, Statement statement) throws Exception {
        _driverName = driverName;
        _driver = defDriver;
        _url = defURL;
        _user = defUser;
        _password = defPassword;

        try {
            if (statement == null)
                _statement = getConnection();
            else
                _statement = statement;
        } catch (Exception e) {
            //System.err.println("BEXI_ApplicationContext: Cannot connect to SQL server:" + e.getMessage());
            System.err.println("BEXI_ApplicationContext: Cannot connect to SQL server:");
            throw e;
        }


    }

    /**
     * Get SQL connection according the context.
     *
     * @return the root path
     * @throws Exception
     */
    private Statement getConnection() throws Exception {

        //if (_statement == null ) {
        final Connection connection;
        try {
            Class.forName(_driver).newInstance();
            if (_user == null) _user = "";
            if (_user.equals("null")) _user = "";
            if (_password == null) _password = "";
            if (_password.equals("null")) _password = "";
            connection = DriverManager.getConnection(_url, _user, _password);
        } catch (Exception e) {
            throw e;
        }

        try {
            _statement = connection.createStatement();
        } catch (Exception e) {
            //e.getMessage();
            throw e;
        }
        //}
        return _statement;

    }

    public void set_driverName(String _driverName) {
        this._driverName = _driverName;
    }

    public void set_driver(String _driver) {
        this._driver = _driver;
    }

    public void set_url(String URL) {
        this._url = URL;
    }

    public void set_user(String _user) {
        this._user = _user;
    }

    public void set_password(String _password) {
        this._password = _password;
    }

    public void set_statement(Statement _statement) {
        this._statement = _statement;
    }

    public String get_driverName() {
        return _driverName;
    }

    public String get_driver() {
        return _driver;
    }

    public String get_url() {
        return _url;
    }

    public String get_user() {
        return _user;
    }

    public String get_password() {
        return _password;
    }

    public Statement get_statement() {
        return _statement;
    }

}
