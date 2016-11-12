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

/**
 * Test BEXI_ApplicationContext class.
 * <li> Unit test BEXI_ApplicationContext.createContext() method;
 * <li> Unit test BEXI_ApplicationContext.setDefaultPath() method;
 *
 */
package BEXI_TEST;

import OPENBEXI.BEXI_ApplicationPath;
import OPENBEXI.BEXI_SqlContext;
import junit.framework.TestCase;


public class BEXI_ApplicationContext_test extends TestCase {
    public BEXI_ApplicationContext_test(String test) {
        super(test);
    }

    /**
     * The fixture set up called before every test method.
     */
    protected void setUp() throws Exception {
    }

    /**
     * The fixture cleanAllCells up called after every test method.
     */
    protected void tearDown() throws Exception {
    }

    /**
     * <li> Unit test BEXI_ApplicationContext.createContext() method.
     * <li> Unit test BEXI_ApplicationContext.setDefaultPath() method.
     */
    public void testSomething() {


        try {
            // Set a OPENBEXI application contextApplication
            BEXI_ApplicationPath contextPath = new BEXI_ApplicationPath();
            contextPath.set_defaultLanguage("fr");
            //BEXI_SqlContext sqlContext = contextPath.get_SqlContextManager().getBEXI_SqlContext("jdbc:mysql:///bexi_fr");
            BEXI_SqlContext sqlContext = contextPath.get_SqlContextManager().getBEXI_SqlContext("jdbc:hsqldb:file:hsqldb/data/bexi_fr");
            contextPath.get_SqlContextManager().set_url_current(sqlContext.get_url());

            System.out.println("BEXI_LANGUAGE        =" + contextPath.getDefaultLanguage());
            System.out.println("");
            System.out.println("ClassPath            =" + contextPath.getDefaultClassPath());
            System.out.println("DefaultXMLFilePath   =" + contextPath.getDefaultXMLFilePath());
            System.out.println("HomePath             =" + contextPath.getHomePath());
            System.out.println("DefaultPath          =" + contextPath.getDefaultPath());
            System.out.println("DefaultMetaRulesPath =" + contextPath.getDefaultMetaRulesPath());
            System.out.println("DefaultWebPagesPath  =" + contextPath.getDefaultWebPagesPath());
            System.out.println("DefaultImagesPath    =" + contextPath.getDefaultImagesPath());
            System.out.println("DefaultWebPagesClientPath  =" + contextPath.getDefaultWebPagesClientPath());
            System.out.println("DefaultImagesClientPath    =" + contextPath.getDefaultImagesClientPath());
            System.out.println("");
            System.out.println("admin: DefaultDatabaseDriver=" + contextPath.get_SqlContextManager().get_sqlContext_admin().get_driverName());
            System.out.println("admin: defDriver            =" + contextPath.get_SqlContextManager().get_sqlContext_admin().get_driver());
            System.out.println("admin: defURL               =" + contextPath.get_SqlContextManager().get_sqlContext_admin().get_url());
            System.out.println("admin: defUser              =" + contextPath.get_SqlContextManager().get_sqlContext_admin().get_user());
            System.out.println("admin: defpasswd            =" + contextPath.get_SqlContextManager().get_sqlContext_admin().get_password());
            System.out.println("");
            System.out.println("DefaultDatabaseDriver=" + sqlContext.get_driverName());
            System.out.println("defDriver            =" + sqlContext.get_driver());
            System.out.println("defURL               =" + sqlContext.get_url());
            System.out.println("defUser              =" + sqlContext.get_user());
            System.out.println("defpasswd            =" + sqlContext.get_password());
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        // If the arguments are equal,the test passes.
        //assertEquals("C:/Documents and Settings/All Users.WINDOWS/Documents/bexi", path);
    }
}
