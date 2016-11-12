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

import java.util.List;
import java.util.Vector;

public class BEXI_SqlContextManager {

    private String _url_current = null;
    private String _url_admin = null;
    private List<BEXI_SqlContext> _SqlContext = new Vector<BEXI_SqlContext>();

    public void set_url_admin(String _url_admin) {
        this._url_admin = _url_admin;
    }

    public List<BEXI_SqlContext> get_SqlContext() {
        return _SqlContext;
    }

    public void set_SqlContext(List<BEXI_SqlContext> _SqlContext) {
        this._SqlContext = _SqlContext;
    }

    public String get_url_current() {
        return _url_current;
    }

    public void set_url_current(String SqlContext_current) {
        _url_current = SqlContext_current;
    }

    public List<BEXI_SqlContext> getBEXI_SqlContext() {
        return _SqlContext;
    }

    /**
     * OPENBEXI context constructor.
     */
    public BEXI_SqlContextManager() {
    }

    /**
     * Return database administrator instance.
     *
     * @return BEXI_SqlContext administrator instance .
     */
    public BEXI_SqlContext get_sqlContext_admin() {
        if (_SqlContext == null) return null;
        int i = 0;
        while (i < _SqlContext.size()) {
            BEXI_SqlContext sqlContext = _SqlContext.get(i);
            if (sqlContext.get_url().contains("bexi_admin")) {
                _url_admin = sqlContext.get_url();
                return sqlContext;
            }
            i++;
        }
        return null;
    }

    /**
     * Return database user instance.
     *
     * @param databaseName .
     * @return BEXI_SqlContext user instance .
     */
    public BEXI_SqlContext getBEXI_SqlContext(String databaseName) {
        if (_SqlContext == null) return null;
        int i = 0;
        while (i < _SqlContext.size()) {
            BEXI_SqlContext sqlContext = _SqlContext.get(i);
            if (sqlContext.get_url().equals(databaseName)) {
                return sqlContext;
            }
            i++;
        }
        return null;
    }

    /**
     * Add BEXI_SqlContext context.
     *
     * @param sqlContext .
     */
    public void addBEXI_SqlContext(BEXI_SqlContext sqlContext) {
        if (getBEXI_SqlContext(sqlContext.get_url()) == null)
            _SqlContext.add(sqlContext);
    }
}
