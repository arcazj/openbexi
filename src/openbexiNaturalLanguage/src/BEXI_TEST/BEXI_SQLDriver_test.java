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
import OPENBEXI.BEXI_SQLDriver;
import OPENBEXI.BEXI_SqlContext;
import OPENBEXI.BEXI_results;
import junit.framework.TestCase;

public class BEXI_SQLDriver_test extends TestCase {
    public BEXI_SQLDriver_test(String test) {
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
        BEXI_SqlContext sqlContext = null;
        // Set a OPENBEXI context
        try {
            BEXI_ApplicationPath contextPath = new BEXI_ApplicationPath();
            contextPath.set_defaultLanguage("fr");
            //sqlContext = contextPath.get_SqlContextManager().getBEXI_SqlContext("jdbc:mysql:///bexi_fr");
            sqlContext = contextPath.get_SqlContextManager().getBEXI_SqlContext("jdbc:hsqldb:file:hsqldb/data/bexi_fr");
            contextPath.get_SqlContextManager().set_url_current(sqlContext.get_url());

        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

        // test OPENBEXI driver: select_classes
        BEXI_results bexi_result = null;
        BEXI_SQLDriver driver = new BEXI_SQLDriver();
        try {
            bexi_result = driver.select_classes(sqlContext.get_statement(), sqlContext.get_driver());
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

        // Look for class attributs
        BEXI_results result1 = null;
        for (int j = 0; j < bexi_result.get_list().getItemCount(); j++) {
            // test OPENBEXI driver: select_all_class_attributs
            try {
                result1 = driver.select_all_class_attributs(sqlContext.get_statement(), bexi_result.get_list().getItem(j));
            } catch (Exception e) {
                System.out.println(e.getMessage());
            }
            for (int i = 0; i < result1.get_list().getItemCount(); i++) {
                System.out.println(bexi_result.get_list().getItem(j) + ":" + result1.get_list().getItem(i));
            }
        }

        // Look for class link
        BEXI_results result2 = null;
        try {
            result2 = driver.select_class_link(sqlContext.get_statement(), sqlContext.get_driver());
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        for (int l = 0; l < result2.get_list().getItemCount(); l++) {
            System.out.println("LINK:" + result2.get_list().getItem(l));
        }
    }
}
