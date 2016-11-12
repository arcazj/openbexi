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

import OPENBEXI.*;
import org.w3c.dom.Document;

import javax.servlet.http.HttpServletResponse;
import java.awt.*;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;

public class OPENBEXI_Creative_MetaData {

    private HttpServletResponse _response;
    BEXI_ApplicationPath _applicationPath;

    public OPENBEXI_Creative_MetaData(BEXI_ApplicationPath applicationPath, HttpServletResponse response) {
        _response = response;
        _applicationPath = applicationPath;
    }

    /**
     * Return XML meta models result.
     *
     * @param docOut : xml model data;
     * @throws Exception .
     */
    public void sendModels(Document docOut) throws Exception {
        final BEXI_XMLDriver xml = new BEXI_XMLDriver();
        final BEXI_XMLDriver xmlResponse = new BEXI_XMLDriver();
        String language = null;
        String nextPreviousStatus = null;
        String objectId = null;
        int maxItems = 0;
        int posCurrentItem = 0;

        try {
            objectId = xml.get_class_object_attribute_value(docOut, "ob_request", "object", "id");
            //System.out.println("listId=" + objectId);
            maxItems = Integer.parseInt(xml.get_class_object_attribute_value(docOut, objectId, "list", "maxItems"));
            posCurrentItem = Integer.parseInt(xml.get_class_object_attribute_value(docOut, objectId, "list", "posCurrentItem"));
            nextPreviousStatus = xml.get_class_object_attribute_value(docOut, objectId, "list", "nextPreviousStatus");
        } catch (Exception e) {
            nextPreviousStatus = "none";
            posCurrentItem = 0;
            maxItems = 10;
        }

        //==================================================================
        // Look for class (select_classes)
        //==================================================================
        try {
            // select_classes
            BEXI_SQLDriver bexi_SQLDriver = new BEXI_SQLDriver();
            String url_current = _applicationPath.get_SqlContextManager().get_url_current();
            if (_applicationPath.get_SqlContextManager().getBEXI_SqlContext(url_current) == null) {
                docOut = xmlResponse.set_class_object_attribute_value(docOut, objectId, "SQLDatabase", "status", "failed");
                _response.setContentType("text/xml");
                _response.setHeader("Cache-Control", "no-cache");
                _response.getWriter().write(xmlResponse.XMLSerializer(docOut));
                return;
            }
            Statement statement = _applicationPath.get_SqlContextManager().getBEXI_SqlContext(url_current).get_statement();
            String driver = _applicationPath.get_SqlContextManager().getBEXI_SqlContext(url_current).get_driver();
            BEXI_results bexi_result = bexi_SQLDriver.select_classes(statement, driver);
            docOut = xmlResponse.set_class_object_attribute_value(docOut, objectId, "class", "count", String.valueOf(bexi_result.get_list().getItemCount()));
            docOut = xmlResponse.set_class_object_attribute_value(docOut, objectId, "class", "status", "done");

            int newposCurrentItem = 0;
            int max = maxItems;
            if (nextPreviousStatus.equals("next")) {
                if (posCurrentItem == 0) {
                    posCurrentItem = maxItems;
                    max = posCurrentItem + maxItems;
                    newposCurrentItem = posCurrentItem;
                } else if ((bexi_result.get_list().getItemCount() - posCurrentItem) < maxItems) {
                    max = posCurrentItem + (bexi_result.get_list().getItemCount() - posCurrentItem);
                    newposCurrentItem = posCurrentItem;
                } else {
                    posCurrentItem = posCurrentItem + maxItems;
                    max = posCurrentItem + maxItems;
                    newposCurrentItem = posCurrentItem;
                }
            } else if (nextPreviousStatus.equals("previous")) {
                if (posCurrentItem == 0) {
                    max = maxItems;
                    newposCurrentItem = 0;
                } else {
                    posCurrentItem = posCurrentItem - maxItems;
                    max = posCurrentItem + maxItems;
                    newposCurrentItem = posCurrentItem;
                }
            } else {
                newposCurrentItem = 0;
            }
            if (bexi_result.get_list().getItemCount() < max) max = bexi_result.get_list().getItemCount();

            //System.out.println("posCurrentItem=" + posCurrentItem + "   max=" + max + " newposCurrentItem=" + newposCurrentItem + "   ---maxItems=" + maxItems + " class found=" + result.getItemCount());

            int count = 0;
            for (int j = posCurrentItem; j < max; j++) {
                docOut = xmlResponse.set_class_object_attribute_value(docOut, objectId, "class_" + count, "name", bexi_result.get_list().getItem(j));
                count++;
            }
            docOut = xmlResponse.set_class_object_attribute_value(docOut, objectId, "list", "posCurrentItem", String.valueOf(newposCurrentItem));
        } catch (SQLException e) {
            System.err.println(e.getMessage());
            docOut = xmlResponse.set_class_object_attribute_value(docOut, objectId, "SQLDatabase", "status", "failed");
        } catch (Exception e) {
            System.err.println(e.getMessage());
            docOut = xmlResponse.set_class_object_attribute_value(docOut, objectId, "message", "status", "failed");
        }
        docOut = xmlResponse.set_class_object_attribute_value(docOut, objectId, "SQLDatabase", "status", "OK");

        //==================================================================
        // Look for class attributs (select_all_class_attributs)
        //==================================================================
        /**List result1 = null;
         int max=posCurrentItem+maxItems;
         if (result.getItemCount()<max) max=result.getItemCount();
         for (int j = posCurrentItem; j < result.getItemCount(); j++) {
         try {
         result1 = BEXI_SQLDriver.select_all_class_attributs(_sqlContext.get_statement(), result.getItem(j));
         } catch (Exception e) {
         System.out.println(e.getMessage());
         }
         docOut = xmlResponse.set_class_object_attribute_value(docOut, result.getItem(j), "attribut_class", "count", String.valueOf(result1.getItemCount()));
         for (int i = posCurrentItem; i < result1.getItemCount(); i++) {
         docOut = xmlResponse.set_class_object_attribute_value(docOut, result.getItem(j), "attribut_class_" + i, "name", result1.getItem(i));
         }
         }*/

        //==================================================================
        // Look for class link  (select_class_link)
        //==================================================================
        /*List result2 = null;
        try {
            result2 = BEXI_SQLDriver.select_class_link(_sqlContext.get_statement(), _sqlContext.get_driver());
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        docOut = xmlResponse.set_class_object_attribute_value(docOut, objectId, "class_link", "count", String.valueOf(result2.getItemCount()));
        for (int i = 0; i < result2.getItemCount(); i++) {
            docOut = xmlResponse.set_class_object_attribute_value(docOut, objectId, "class_link_" + i, "name", result2.getItem(i));
        }*/

        _response.setContentType("text/xml");
        _response.setHeader("Cache-Control", "no-cache");
        _response.getWriter().write(xmlResponse.XMLSerializer(docOut));
    }

    /**
     * Return XML result according user language natural request to OPENBEXI HTML builder client side.
     *
     * @param doc       .
     * @param requestLN .
     * @param result    .
     * @param status    .
     * @throws Exception .
     */
    public void sendResults(Document doc, BEXI_list requestLN, Object[] result, BEXI_list status) throws Exception {
        final BEXI_XMLDriver xml = new BEXI_XMLDriver();

        String objectId = xml.get_class_object_attribute_value(doc, "ob_request", "object", "id");
        String objType = xml.get_class_object_attribute_value(doc, "ob_request", "object", "type");
        String language = xml.get_class_object_attribute_value(doc, "bexicontext", "language", "name");
        String model = xml.get_class_object_attribute_value(doc, "url", objectId, "model");
        model=model.trim();
        String[] model_items = null;
        if (model != null && !model.equals(""))
            model_items = model.split(",");

        int maxItems = 0;
        int posCurrentItem = 0;
        int maxCountFiles = 0;
        int countMaxRows = 0;
        int max = 0;
        String pagerNumber = xml.get_class_object_attribute_value(doc, "ob_explorer", "pager", "number");
        maxItems = Integer.parseInt(xml.get_class_object_attribute_value(doc, "ob_explorer", "list", "maxItems"));
        posCurrentItem = Integer.parseInt(xml.get_class_object_attribute_value(doc, "ob_explorer", "list", "posCurrentItem"));
        String nextPreviousStatus = xml.get_class_object_attribute_value(doc, "ob_explorer", "list", "nextPreviousStatus");
        try {
            maxCountFiles = Integer.parseInt(xml.get_class_object_attribute_value(doc, "ob_explorer", "file", "objectMaxCount"));
        } catch (Exception e) {
            maxCountFiles = maxItems;
        }
        doc = xml.set_class_object_attribute_value(doc, "ob_explorer", "list", "nextFlag", "next");
        doc = xml.set_class_object_attribute_value(doc, "ob_explorer", "list", "previousFlag", "previous");
        int newposCurrentItem = 0;
        //max = maxItems;
        if (nextPreviousStatus.equals("next")) {
            if (posCurrentItem == 0) {
                posCurrentItem = maxItems;
                max = posCurrentItem + maxItems;
                newposCurrentItem = posCurrentItem;
                doc = xml.set_class_object_attribute_value(doc, "ob_explorer", "list", "nextFlag", "next");
                if ((maxCountFiles - posCurrentItem) < maxItems)
                    doc = xml.set_class_object_attribute_value(doc, "ob_explorer", "list", "nextFlag", "null");
                else
                    doc = xml.set_class_object_attribute_value(doc, "ob_explorer", "list", "nextFlag", "next");
            } else if ((maxCountFiles - posCurrentItem) <= maxItems) {
                max = posCurrentItem + (maxCountFiles - posCurrentItem);
                newposCurrentItem = posCurrentItem;
                //if(maxItems==1&&maxCountFiles!=0)newposCurrentItem++;
                doc = xml.set_class_object_attribute_value(doc, "ob_explorer", "list", "nextFlag", "null");
            } else {
                posCurrentItem = posCurrentItem + maxItems;
                max = posCurrentItem + maxItems;
                newposCurrentItem = posCurrentItem;
                doc = xml.set_class_object_attribute_value(doc, "ob_explorer", "list", "nextFlag", "next");
                doc = xml.set_class_object_attribute_value(doc, "ob_explorer", "list", "previousFlag", "previous");
                if ((maxCountFiles - posCurrentItem) < maxItems)
                    doc = xml.set_class_object_attribute_value(doc, "ob_explorer", "list", "nextFlag", "null");
                else
                    doc = xml.set_class_object_attribute_value(doc, "ob_explorer", "list", "nextFlag", "next");
            }
        } else if (nextPreviousStatus.equals("previous")) {
            if (posCurrentItem == 0) {
                max = maxItems;
                newposCurrentItem = 0;
                doc = xml.set_class_object_attribute_value(doc, "ob_explorer", "list", "previousFlag", "null");
            } else {
                posCurrentItem = posCurrentItem - maxItems;
                max = posCurrentItem + maxItems;
                newposCurrentItem = posCurrentItem;
                if (posCurrentItem < maxItems)
                    doc = xml.set_class_object_attribute_value(doc, "ob_explorer", "list", "previousFlag", "null");
            }
        } else {
            if (pagerNumber == null || pagerNumber.equals("") || pagerNumber.equals("none")) pagerNumber = "0";
            if (pagerNumber == null || pagerNumber.equals("previousBegin")) pagerNumber = "0";
            if (pagerNumber == null || pagerNumber.equals("nextEnd")) {
                pagerNumber = String.valueOf(maxCountFiles / maxItems);
                if ((maxCountFiles % maxItems) == 0) pagerNumber = String.valueOf(Integer.valueOf(pagerNumber) - 1);
            }
            newposCurrentItem = Integer.valueOf(pagerNumber) * maxItems;
            posCurrentItem = newposCurrentItem;
            max = posCurrentItem + maxItems;
            doc = xml.set_class_object_attribute_value(doc, "ob_explorer", "list", "previousFlag", "null");
            if ((maxCountFiles - posCurrentItem) <= maxItems) {
                doc = xml.set_class_object_attribute_value(doc, "ob_explorer", "list", "nextFlag", "null");
            }
        }

        // Send reponse
        int countCol;
        int countRow;

        if (result == null) {
            doc = xml.set_class_object_attribute_value(doc, objectId, "SQLDatabase", "status", "failed");
            _response.setContentType("text/xml");
            _response.setHeader("Cache-Control", "no-cache");
            _response.getWriter().write(xml.XMLSerializer(doc));
            return;
        }

        for (int i = 0; i < requestLN.getItemCount(); i++) {
            doc = xml.set_class_object_attribute_value(doc, objectId, "request" + i, "text", requestLN.getItem(i));
            doc = xml.set_class_object_attribute_value(doc, objectId, "request" + i, "status", status.getItem(i));
            doc = xml.set_class_object_attribute_value(doc, objectId, "col", "name" + i, "list");
            countCol = 0;
            countRow = 0;
            BEXI_list resultList = null;
            ResultSet resultSet = null;
            BEXI_results bexi_results = null;
            ResultSetMetaData metaDataKey = null;

            if (result[i] instanceof BEXI_results) {
                bexi_results = (BEXI_results) result[i];

                if (bexi_results.get_list() != null) {
                    countCol = 1;
                    resultList = bexi_results.get_list();
                    countRow = resultList.getItemCount();
                    for (int k = newposCurrentItem; k < max; k++) {
                        doc = xml.set_class_object_attribute_value(doc, objectId, "item" + i + "_0_" + k, "value", resultList.getItem(k));
                    }
                }
                if ((resultSet = bexi_results.get_resultSet()) != null) {
                    bexi_results = (BEXI_results) result[i];
                    metaDataKey = bexi_results.get_resultSet().getMetaData();
                    resultSet = bexi_results.get_resultSet();
                    int countColumn = metaDataKey.getColumnCount();
                    String metaData = "";
                    boolean flag = true;
                    while (resultSet.next()) {
                        if (countMaxRows >= newposCurrentItem && max > countMaxRows) {
                            countCol = 0;
                            if (model_items == null) {
                                for (int j = 0; j < countColumn; j++) {
                                    if (flag) {
                                        metaData += metaDataKey.getColumnName(j + 1) + ";";
                                        doc = xml.set_class_object_attribute_value(doc, objectId, "col", "name" + countCol, metaDataKey.getColumnName(j + 1));
                                    }
                                    doc = xml.set_class_object_attribute_value(doc, objectId, metaDataKey.getColumnName(j + 1), "index", String.valueOf(countCol));
                                    doc = xml.set_class_object_attribute_value(doc, objectId, "item" + i + "_" + countCol + "_" + countRow, "value", resultSet.getString(j + 1).replaceAll("\"|\'",""));
                                    countCol++;
                                }
                            } else {
                                for (int j = 0; j < model_items.length; j++) {
                                    if (flag) {
                                        doc = xml.set_class_object_attribute_value(doc, objectId, "col", "name" + countCol, model_items[j]);
                                    }
                                    doc = xml.set_class_object_attribute_value(doc, objectId, model_items[j], "index", String.valueOf(countCol));
                                    doc = xml.set_class_object_attribute_value(doc, objectId, "item" + i + "_" + countCol + "_" + countRow, "value", resultSet.getString(model_items[j]).replaceAll("\"|\'",""));
                                    countCol++;
                                }
                            }
                            flag = false;
                            countRow++;
                        }
                        countMaxRows++;
                    }
                    String table = xml.get_class_object_attribute_value(doc, "url", objectId, "table");
                    doc = xml.set_class_object_attribute_value(doc, "database", table, "metaData", metaData);
                }
                if (bexi_results.get_SQL_query() != null)
                    for (int j = 0; j < bexi_results.get_SQL_query().length; j++) {
                        doc = xml.set_class_object_attribute_value(doc, objectId, "sql", "query" + i + "_" + j, bexi_results.get_SQL_query()[j]);
                    }
            } else {
                System.err.println("ERROR:OPENBEXI_Creative_MetaData.sendResults results are not instance of BEXI_results");
            }

            doc = xml.set_class_object_attribute_value(doc, objectId, "message", "text", "done");
            doc = xml.set_class_object_attribute_value(doc, objectId, "row", "count" + i, String.valueOf(countMaxRows));
            doc = xml.set_class_object_attribute_value(doc, objectId, "list", "posCurrentItem", String.valueOf(newposCurrentItem));
            int ipagerNumber = newposCurrentItem / maxItems;
            int maxPagerNumber = countMaxRows / maxItems;
            doc = xml.set_class_object_attribute_value(doc, "ob_explorer", "pager", "number", String.valueOf(ipagerNumber));
            doc = xml.set_class_object_attribute_value(doc, "ob_explorer", "pager", "maxNumber", String.valueOf(maxPagerNumber));
            doc = xml.set_class_object_attribute_value(doc, "ob_explorer", "file", "objectCount", String.valueOf(countRow));
            doc = xml.set_class_object_attribute_value(doc, "ob_explorer", "file", "objectMaxCount", String.valueOf(countMaxRows));
            doc = xml.set_class_object_attribute_value(doc, "ob_explorer", "status", "text", "done");
            if (countMaxRows == 0) {
                doc = xml.set_class_object_attribute_value(doc, "ob_explorer", "status", "text", "none");
            }
            doc = xml.set_class_object_attribute_value(doc, "ob_explorer", "list", "posCurrentItem", String.valueOf(newposCurrentItem));

            System.out.println("Found " + countCol + " col(s), " + countMaxRows + " row(s), and display " + maxItems + " row(s) from " + newposCurrentItem + " to " + max);

            if (resultSet != null) resultSet.close();
            doc = xml.set_class_object_attribute_value(doc, objectId, "row", "count" + i, String.valueOf(countRow));
            doc = xml.set_class_object_attribute_value(doc, objectId, "column", "count" + i, String.valueOf(countCol));

            if (countMaxRows != 0) {
                if (language != null) {
                    if (language.equals("fr"))
                        doc = xml.set_class_object_attribute_value(doc, objectId, "message", "text" + i, "Désolé, je n'ai pas de réponse à votre recherche pour cette requete");
                    if (language.equals("en"))
                        doc = xml.set_class_object_attribute_value(doc, objectId, "message", "text" + i, "Sorry, no data found for this request");
                } else {
                    doc = xml.set_class_object_attribute_value(doc, objectId, "message", "text" + i, "Sorry, no data found for this request");
                }
            }

        }
        doc = xml.set_class_object_attribute_value(doc, objectId, "SQLDatabase", "status", "OK");
        _response.setContentType("text/xml");
        _response.setHeader("Cache-Control", "no-cache");
        _response.getWriter().write(xml.XMLSerializer(doc));
    }
}
