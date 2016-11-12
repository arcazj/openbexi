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
package BEXI_TEST;

import OPENBEXI.BEXI_ApplicationPath;
import OPENBEXI.BEXI_MetaRules;
import OPENBEXI.BEXI_SqlContext;
import junit.framework.TestCase;

public class BEXI_Metarules_test2 extends TestCase {
    public BEXI_Metarules_test2(String test) {
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

    public void testSomething() throws Exception {

        // Set a OPENBEXI context
        BEXI_ApplicationPath contextPath = new BEXI_ApplicationPath();
        contextPath.set_defaultLanguage("fr");
        //BEXI_SqlContext sqlContext = contextPath.get_SqlContextManager().getBEXI_SqlContext("jdbc:mysql:///bexi_fr");
        BEXI_SqlContext sqlContext = contextPath.get_SqlContextManager().getBEXI_SqlContext("jdbc:hsqldb:file:hsqldb/data/bexi_fr");
        contextPath.get_SqlContextManager().set_url_current(sqlContext.get_url());

        try {
            // Set a OPENBEXI context
            contextPath = new BEXI_ApplicationPath();

            BEXI_MetaRules metarules = new BEXI_MetaRules();
            String genericMetarule = metarules.getGenericMetarule(contextPath, sqlContext, "if [déterminant] _X0 [nom] _X1 [verbe] _X2 [déterminant] _X3 [nom] _X4");
            //System.out.println(genericMetarule);
            assertEquals("if [déterminant] _X0 [nom] _X1 [verbe] _X2 [déterminant] _X3 [nom] _X4", genericMetarule);
            System.out.println("BEXI_MetaRules_test2:test ok");
        } catch (Exception e) {
            System.out.println(e);
        }
    }
}
