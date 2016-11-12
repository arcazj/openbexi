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
import junit.framework.TestCase;

public class BEXI_CreateSQLdata_for_test extends TestCase {
    public BEXI_CreateSQLdata_for_test(String test) {
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

    public static void testSomething() throws Exception {

        BEXI_ApplicationPath contextPath = new BEXI_ApplicationPath();
        contextPath.set_defaultLanguage("en");
        //BEXI_SqlContext sqlContext = contextPath.get_SqlContextManager().getBEXI_SqlContext("jdbc:mysql:///test");
        BEXI_SqlContext sqlContext = contextPath.get_SqlContextManager().getBEXI_SqlContext("jdbc:hsqldb:file:hsqldb/data/test");

        contextPath.get_SqlContextManager().addBEXI_SqlContext(sqlContext);

        BEXI_SQLDriver sqldriver = new BEXI_SQLDriver();
        try {
            sqldriver.delete_class(sqlContext.get_statement(), "company");
            System.out.println(" deleted company");
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }
        try {
            sqldriver.create_class(sqlContext.get_statement(), "company");
            System.out.println(" created company");
        } catch (Exception e) {
        }
        try {
            sqldriver.create_class_attribut(sqlContext.get_statement(), "company", "ticker");
            System.out.println(" created company ticker");
        } catch (Exception e) {
            System.err.println(" Cannot create company ticker:" + e.getMessage());
        }
        try {
            //sqldriver.create_class_attribut(sqlContext.get_statement(), "company", "name");
            System.out.println(" created company name");
        } catch (Exception e) {
            System.err.println(" Cannot create company name:" + e.getMessage());
        }
        try {
            sqldriver.create_class_attribut(sqlContext.get_statement(), "company", "mktcap");
            System.out.println(" created company mktcap");
        } catch (Exception e) {
            System.err.println(" Cannot create company mktcap:" + e.getMessage());
        }
        try {
            sqldriver.create_class_attribut(sqlContext.get_statement(), "company", "sales");
            System.out.println(" created company sales");
        } catch (Exception e) {
            System.err.println(" Cannot create company sales:" + e.getMessage());
        }
        try {
            sqldriver.create_class_attribut(sqlContext.get_statement(), "company", "employees");
            System.out.println(" created company employees");
        } catch (Exception e) {
            System.err.println(" Cannot create company employees:" + e.getMessage());
        }

        try {
            String att[] = {"ticker", "mktcap", "sales", "employees"};
            String val0[] = {"MSFT", "314,571.156", "32,187.000", "55000"};
            sqldriver.create_class_object(sqlContext.get_statement(), "company", "Microsoft Corporation");
            sqldriver.create_class_object_attribut(sqlContext.get_statement(), "company", "Microsoft Corporation", att, val0);

            String val1[] = {"ORCL", "62,615.266", "9,519.000", "28961"};
            sqldriver.create_class_object(sqlContext.get_statement(), "company", "Oracle Corporation");
            sqldriver.create_class_object_attribut(sqlContext.get_statement(), "company", "Oracle Corporation", att, val1);

            String val2[] = {"SAP", "40,986.328", "8,296.420", "28961"};
            sqldriver.create_class_object(sqlContext.get_statement(), "company", "SAP AG (ADR)");
            sqldriver.create_class_object_attribut(sqlContext.get_statement(), "company", "SAP AG (ADR)", att, val2);

            String val3[] = {"CA", "15,606.335", "3,164.000", "16000"};
            sqldriver.create_class_object(sqlContext.get_statement(), "company", "Computer Associates Inter");
            sqldriver.create_class_object_attribut(sqlContext.get_statement(), "company", "Computer Associates Inter", att, val3);

            String val4[] = {"ERTS", "14,490.895", "2,503.727", "4000"};
            sqldriver.create_class_object(sqlContext.get_statement(), "company", "Electronic Arts Inc");
            sqldriver.create_class_object_attribut(sqlContext.get_statement(), "company", "Electronic Arts Inc", att, val4);

            String val5[] = {"SFTBF", "14,485.840", "000", "6865"};
            sqldriver.create_class_object(sqlContext.get_statement(), "company", "Softbank Corp. (ADR)");
            sqldriver.create_class_object_attribut(sqlContext.get_statement(), "company", "Softbank Corp. (ADR)", att, val5);

            String val6[] = {"VRTS", "14,444.272", "1,578.658", "5647"};
            sqldriver.create_class_object(sqlContext.get_statement(), "company", "Veritas Software Corp");
            sqldriver.create_class_object_attribut(sqlContext.get_statement(), "company", "Veritas Software Corp", att, val6);

            String val7[] = {"SYMC", "9,932.483", "1,482.029", "4300"};
            sqldriver.create_class_object(sqlContext.get_statement(), "company", "Symantec Corporation");
            sqldriver.create_class_object_attribut(sqlContext.get_statement(), "company", "Symantec Corporation", att, val7);

            String val8[] = {"INFY", "9,763.851", "830.748", "15400"};
            sqldriver.create_class_object(sqlContext.get_statement(), "company", "Infosys Technologies Ltd");
            sqldriver.create_class_object_attribut(sqlContext.get_statement(), "company", "Infosys Technologies Ltd", att, val8);

            String val9[] = {"INTU", "9,702.477", "1,650.743", "6700"};
            sqldriver.create_class_object(sqlContext.get_statement(), "company", "Intuit Inc");
            sqldriver.create_class_object_attribut(sqlContext.get_statement(), "company", "Intuit Inc", att, val9);

            String val10[] = {"ADBE", "9,533.050", "1,230.817", "3341"};
            sqldriver.create_class_object(sqlContext.get_statement(), "company", "Adobe Systems Incorporate");
            sqldriver.create_class_object_attribut(sqlContext.get_statement(), "company", "Adobe Systems Incorporate", att, val10);

            String val11[] = {"PSFT", "8,246.467", "1,941.167", "8180"};
            sqldriver.create_class_object(sqlContext.get_statement(), "company", "PeopleSoft, Inc");
            sqldriver.create_class_object_attribut(sqlContext.get_statement(), "company", "PeopleSoft, Inc", att, val11);

            String val12[] = {"SEBL", "5,434.649", "1,417.952", "5909"};
            sqldriver.create_class_object(sqlContext.get_statement(), "company", "Siebel Systems, Inc");
            sqldriver.create_class_object_attribut(sqlContext.get_statement(), "company", "Siebel Systems, Inc", att, val12);

            String val13[] = {"BEAS", "5,111.813", "965.694", "3063"};
            sqldriver.create_class_object(sqlContext.get_statement(), "company", "BEA Systems, Inc");
            sqldriver.create_class_object_attribut(sqlContext.get_statement(), "company", "BEA Systems, Inc", att, val13);

            String val14[] = {"SNPS", ",482.535", "1,169.786", "4254"};
            sqldriver.create_class_object(sqlContext.get_statement(), "company", "Synopsys, Inc");
            sqldriver.create_class_object_attribut(sqlContext.get_statement(), "company", "Synopsys, Inc", att, val14);

            String val15[] = {"CHKP", "4,396.853", "424.769", "1203"};
            sqldriver.create_class_object(sqlContext.get_statement(), "company", "Check Point Software Tech");
            sqldriver.create_class_object_attribut(sqlContext.get_statement(), "company", "Check Point Software Tech", att, val15);

            String val16[] = {"MERQ", "4,325.488", "444.063", "1822"};
            sqldriver.create_class_object(sqlContext.get_statement(), "company", "Mercury Interactive Corp");
            sqldriver.create_class_object_attribut(sqlContext.get_statement(), "company", "Mercury Interactive Corp", att, val16);

            String val17[] = {"DOX", "4,288.017", "1,427.088", "9400"};
            sqldriver.create_class_object(sqlContext.get_statement(), "company", "Amdocs Limited");
            sqldriver.create_class_object_attribut(sqlContext.get_statement(), "company", "Amdocs Limited", att, val17);

            String val18[] = {"CTXS", "3,946.485", "554.222", "1670"};
            sqldriver.create_class_object(sqlContext.get_statement(), "company", "Citrix Systems, Inc");
            sqldriver.create_class_object_attribut(sqlContext.get_statement(), "company", "Citrix Systems, Inc", att, val18);

            String val19[] = {"KNM", "3,710.784", "0000", "4313"};
            sqldriver.create_class_object(sqlContext.get_statement(), "company", "Konami Corporation (ADR)");
            sqldriver.create_class_object_attribut(sqlContext.get_statement(), "company", "Konami Corporation (ADR)", att, val19);

            String val120[] = {"test", "3,710.784", "0000", "4313"};
            sqldriver.create_class_object(sqlContext.get_statement(), "company", "Konami Corporation (ADR2)");
            sqldriver.create_class_object_attribut(sqlContext.get_statement(), "company", "Konami Corporation (ADR2)", att, val120);
            sqldriver.create_class_object_attribut(sqlContext.get_statement(), "company", "Konami Corporation (ADR3)", att, val120);

        } catch (Exception e) {
            System.err.println(" Cannot create company data:" + e.getMessage());
        }

        // ######################################################################
        sqlContext = contextPath.get_SqlContextManager().getBEXI_SqlContext("jdbc:hsqldb:file:hsqldb/data/test");

        contextPath.get_SqlContextManager().addBEXI_SqlContext(sqlContext);

        sqldriver = new BEXI_SQLDriver();
        try {
            sqldriver.delete_class(sqlContext.get_statement(), "painting");
            System.out.println(" deleted painting");
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }
        try {
            sqldriver.create_class(sqlContext.get_statement(), "painting");
            System.out.println(" created painting");
        } catch (Exception e) {
        }
        try {
            sqldriver.create_class_attribut(sqlContext.get_statement(), "painting", "date");
            System.out.println(" created painting date");
        } catch (Exception e) {
            System.err.println(" Cannot create painting date:" + e.getMessage());
        }
        try {
            sqldriver.create_class_attribut(sqlContext.get_statement(), "painting", "artist");
            System.out.println(" created painting artist");
        } catch (Exception e) {
            System.err.println(" Cannot create painting artist:" + e.getMessage());
        }
        try {
            sqldriver.create_class_attribut(sqlContext.get_statement(), "painting", "picture");
            System.out.println(" created painting picture");
        } catch (Exception e) {
            System.err.println(" Cannot create painting picture:" + e.getMessage());
        }
        try {
            sqldriver.create_class_attribut(sqlContext.get_statement(), "painting", "wikipedia");
            System.out.println(" created painting wikipedia");
        } catch (Exception e) {
            System.err.println(" Cannot create painting wikipedia:" + e.getMessage());
        }
        try {
            sqldriver.create_class_attribut(sqlContext.get_statement(), "painting", "checked");
            System.out.println(" created painting picture");
        } catch (Exception e) {
            System.err.println(" Cannot create painting picture:" + e.getMessage());
        }

        try {
            String att[] = {"date", "artist", "picture", "wikipedia", "checked"};
            String val0[] = {"1938", "Pablo Picasso", "gifPlus/picasso_1.jpg", "http://en.wikipedia.org/wiki/Picasso", "true"};
            sqldriver.create_class_object(sqlContext.get_statement(), "painting", "Woman in a hairnet");
            sqldriver.create_class_object_attribut(sqlContext.get_statement(), "painting", "Woman in a hairnet", att, val0);

            String val1[] = {"1932", "Pablo Picasso", "gifPlus/picasso_2.jpg", "http://en.wikipedia.org/wiki/Picasso", "false"};
            sqldriver.create_class_object(sqlContext.get_statement(), "painting", "The dream");
            sqldriver.create_class_object_attribut(sqlContext.get_statement(), "painting", "The dream", att, val1);

            String val2[] = {"1932", "Pablo Picasso", "gifPlus/picasso_3.jpg", "http://en.wikipedia.org/wiki/Picasso", "true"};
            sqldriver.create_class_object(sqlContext.get_statement(), "painting", "Seated Woman");
            sqldriver.create_class_object_attribut(sqlContext.get_statement(), "painting", "Seated Woman", att, val2);

            String val3[] = {"1931", "Pablo Picasso", "gifPlus/picasso_4.jpg", "http://en.wikipedia.org/wiki/Picasso", "true"};
            sqldriver.create_class_object(sqlContext.get_statement(), "painting", "Figures on a Beach");
            sqldriver.create_class_object_attribut(sqlContext.get_statement(), "painting", "Figures on a Beach", att, val3);

            String val4[] = {"1908", "Pablo Picasso", "gifPlus/picasso_5.jpg", "http://en.wikipedia.org/wiki/Picasso", "true"};
            sqldriver.create_class_object(sqlContext.get_statement(), "painting", "House in a Garden");
            sqldriver.create_class_object_attribut(sqlContext.get_statement(), "painting", "House in a Garden", att, val4);

            String val5[] = {"1932", "Pablo Picasso", "gifPlus/picasso_6.jpg", "http://en.wikipedia.org/wiki/Picasso", "true"};
            sqldriver.create_class_object(sqlContext.get_statement(), "painting", "Woman with a Flower");
            sqldriver.create_class_object_attribut(sqlContext.get_statement(), "painting", "Woman with a Flower", att, val5);

            String val6[] = {"1908", "Pablo Picasso", "gifPlus/picasso_7.jpg", "http://en.wikipedia.org/wiki/Picasso", "true"};
            sqldriver.create_class_object(sqlContext.get_statement(), "painting", "La Fermière");
            sqldriver.create_class_object_attribut(sqlContext.get_statement(), "painting", "La Fermière", att, val6);

            String val7[] = {"1903", "Pablo Picasso", "gifPlus/picasso_8.jpg", "http://en.wikipedia.org/wiki/Picasso", "true"};
            sqldriver.create_class_object(sqlContext.get_statement(), "painting", "L ascete");
            sqldriver.create_class_object_attribut(sqlContext.get_statement(), "painting", "L ascete", att, val7);

            String val8[] = {"1906", "Pablo Picasso", "gifPlus/picasso_9.jpg", "http://en.wikipedia.org/wiki/Picasso", "true"};
            sqldriver.create_class_object(sqlContext.get_statement(), "painting", "Self-Portrait with a Palette");
            sqldriver.create_class_object_attribut(sqlContext.get_statement(), "painting", "Self-Portrait with a Palette", att, val8);

            String val9[] = {"1908", "Pablo Picasso", "gifPlus/picasso_10.jpg", "http://en.wikipedia.org/wiki/Picasso", "true"};
            sqldriver.create_class_object(sqlContext.get_statement(), "painting", "Decanter and Tureens");
            sqldriver.create_class_object_attribut(sqlContext.get_statement(), "painting", "Decanter and Tureens", att, val9);

            String val10[] = {"1937", "Pablo Picasso", "gifPlus/picasso_11.jpg", "http://en.wikipedia.org/wiki/Picasso", "true"};
            sqldriver.create_class_object(sqlContext.get_statement(), "painting", "Nusche Eluard");
            sqldriver.create_class_object_attribut(sqlContext.get_statement(), "painting", "Nusche Eluard", att, val10);

            String val11[] = {"1901", "Pablo Picasso", "gifPlus/picasso_12.jpg", "http://en.wikipedia.org/wiki/Picasso", "true"};
            sqldriver.create_class_object(sqlContext.get_statement(), "painting", "The Absinthe Drinker");
            sqldriver.create_class_object_attribut(sqlContext.get_statement(), "painting", "The Absinthe Drinker", att, val11);

            String val12[] = {"1912", "Juan Gris", "gifPlus/juangris_13.jpg", "http://en.wikipedia.org/wiki/Juan_Gris", "true"};
            sqldriver.create_class_object(sqlContext.get_statement(), "painting", "Portrait of Picasso");
            sqldriver.create_class_object_attribut(sqlContext.get_statement(), "painting", "Portrait of Picasso", att, val12);

            String val13[] = {"1913", "Juan Gris", "gifPlus/juangris_14.jpg", "http://en.wikipedia.org/wiki/Juan_Gris", "true"};
            sqldriver.create_class_object(sqlContext.get_statement(), "painting", "Violin and Checkerboard");
            sqldriver.create_class_object_attribut(sqlContext.get_statement(), "painting", "Violin and Checkerboard", att, val13);

            String val14[] = {"1919", "Juan Gris", "gifPlus/juangris_15.jpg", "http://en.wikipedia.org/wiki/Juan_Gris", "true"};
            sqldriver.create_class_object(sqlContext.get_statement(), "painting", "Harlequin with Guitar");
            sqldriver.create_class_object_attribut(sqlContext.get_statement(), "painting", "Harlequin with Guitar", att, val14);

            String val15[] = {"1918", "Juan Gris", "gifPlus/juangris_20.jpg", "http://en.wikipedia.org/wiki/Juan_Gris", "true"};
            sqldriver.create_class_object(sqlContext.get_statement(), "painting", "The Guitar");
            sqldriver.create_class_object_attribut(sqlContext.get_statement(), "painting", "The Guitar", att, val15);

            String val16[] = {"1913", "Juan Gris", "gifPlus/juangris_21.jpg", "http://en.wikipedia.org/wiki/Juan_Gris", "true"};
            sqldriver.create_class_object(sqlContext.get_statement(), "painting", "Glass of Beer and Playing Cards");
            sqldriver.create_class_object_attribut(sqlContext.get_statement(), "painting", "Glass of Beer and Playing Cards", att, val16);

            String val17[] = {"1905", "Henri Matisse", "gifPlus/matisse_16.jpg", "http://en.wikipedia.org/wiki/Green_Stripe", "true"};
            sqldriver.create_class_object(sqlContext.get_statement(), "painting", "Portrait of Madame Matisse");
            sqldriver.create_class_object_attribut(sqlContext.get_statement(), "painting", "Portrait of Madame Matisse", att, val17);

            String val18[] = {"1953", "Henri Matisse", "gifPlus/matisse_17.jpg", "http://en.wikipedia.org/wiki/Matisse", "true"};
            sqldriver.create_class_object(sqlContext.get_statement(), "painting", "The Snail");
            sqldriver.create_class_object_attribut(sqlContext.get_statement(), "painting", "The Snail", att, val18);

            String val19[] = {"1942", "Henri Matisse", "gifPlus/matisse_18.jpg", "http://en.wikipedia.org/wiki/Matisse", "true"};
            sqldriver.create_class_object(sqlContext.get_statement(), "painting", "Jazz-Icare");
            sqldriver.create_class_object_attribut(sqlContext.get_statement(), "painting", "Jazz-Icare", att, val19);

            String val20[] = {"1910", "Henri Matisse", "gifPlus/matisse_19.jpg", "http://en.wikipedia.org/wiki/Still_Life_with_Geraniums", "true"};
            sqldriver.create_class_object(sqlContext.get_statement(), "painting", "Still Life with Geraniums");
            sqldriver.create_class_object_attribut(sqlContext.get_statement(), "painting", "Still Life with Geraniums", att, val20);

            String val21[] = {"1887", "Vincent van Gogh", "gifPlus/VanGogh_22.jpg", "http://en.wikipedia.org/wiki/Van_Gogh", "true"};
            sqldriver.create_class_object(sqlContext.get_statement(), "painting", "Self-portrait");
            sqldriver.create_class_object_attribut(sqlContext.get_statement(), "painting", "Self-portrait", att, val21);

            String val22[] = {"1888", "Vincent van Gogh", "gifPlus/VanGogh_23.jpg", "http://en.wikipedia.org/wiki/Van_Gogh", "true"};
            sqldriver.create_class_object(sqlContext.get_statement(), "painting", "The Old Mill");
            sqldriver.create_class_object_attribut(sqlContext.get_statement(), "painting", "The Old Mill", att, val22);
            System.out.println("created painting data...");

        } catch (Exception e) {
            System.err.println(" Cannot create painting data:" + e.getMessage());
        }
    }
}
