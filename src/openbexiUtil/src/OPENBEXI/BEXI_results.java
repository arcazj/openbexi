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

import java.sql.ResultSet;

/**
 * Menage OPENBEXI driver.
 */
public final class BEXI_results {

    ResultSet _resultSet = null;
    BEXI_list _list = null;

    public ResultSet get_resultSet() {
        return _resultSet;
    }

    public void set_resultSet(ResultSet _resultSet) {
        this._resultSet = _resultSet;
    }

    public BEXI_list get_list() {
        return _list;
    }

    public void set_list(BEXI_list _list) {
        this._list = _list;
    }

    public String[] get_SQL_query() {
        return _SQL_query;
    }

    public void set_SQL_query(String[] _SQL_query) {
        this._SQL_query = _SQL_query;
    }

    String[] _SQL_query = null;
}
