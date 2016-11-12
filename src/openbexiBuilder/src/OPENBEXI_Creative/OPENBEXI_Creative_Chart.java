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
//package OPENBEXI_Creative;
package OPENBEXI_Creative;

import org.jfree.chart.*;
import org.jfree.chart.plot.*;
import org.jfree.chart.title.TextTitle;
import org.jfree.data.general.DefaultPieDataset;
import org.jfree.data.category.DefaultCategoryDataset;
import org.jfree.data.xy.XYSeriesCollection;
import org.jfree.data.xy.XYSeries;
import org.w3c.dom.Document;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.awt.*;
import java.lang.reflect.Field;

import OPENBEXI.BEXI_ApplicationPath;
import OPENBEXI.BEXI_XMLDriver;

class chartException extends Exception {
    public chartException(String msg) {
        super(msg);
    }
}

public class OPENBEXI_Creative_Chart extends HttpServlet {

    private Boolean _ob_debug = true;
    private HttpServletResponse _response;
    private BEXI_ApplicationPath _applicationPath;


    public OPENBEXI_Creative_Chart(HttpServletResponse response, BEXI_ApplicationPath applicationPath) {
        _response = response;
        _applicationPath = applicationPath;
    }

    private Color getColor(String colorName) {
        try {
            // Find the field and value of colorName
            Field field = Class.forName("java.awt.Color").getField(colorName);
            return (Color) field.get(null);
        } catch (Exception e) {
            return null;
        }
    }

    private char ob_getSeparator(String path) {
        char c = '/';
        if (path == null) return c;
        for (int i = path.length() - 1; i >= 0; i--) {
            if (path.charAt(i) == '/') {
                return '/';
            }
            if (path.charAt(i) == '\\') {
                return '\\';
            }
        }
        return c;
    }

    private void ob_error(Document doc, BEXI_XMLDriver xml, String message) {
        try {
            doc = xml.set_class_object_attribute_value(doc, "ob_explorer", "status", "text", message);
            if (_response != null) {
                _response.setContentType("text/xml");
                _response.setHeader("Cache-Control", "no-cache");
                _response.getWriter().write(xml.XMLSerializer(doc));
            }
        } catch (Exception e) {
            System.err.println("OPENBEXI_Creative_Chart.oberror:" + e.getMessage());
        }
    }

    public void saveXML(HttpServletRequest request, Document docOut) {

    }

    public void readXML(HttpServletRequest request, Document docOut, Boolean create_panel) {
        Document doc;
        String project;
        String pageName;
        String filename;
        String id;
        String type = "";
        final BEXI_XMLDriver xml = new BEXI_XMLDriver();
        try {
            project = xml.get_class_object_attribute_value(docOut, "ob_explorer", "dir", "project");
            pageName = xml.get_class_object_attribute_value(docOut, "ob_explorer", "dir", "page");
            filename = xml.get_class_object_attribute_value(docOut, "ob_request", "chart", "xmlFile");
            String data = xml.get_class_object_attribute_value(docOut, "ob_request", "chart", "xmlData");
            if (data == null) data = "false";
            String filepath = xml.get_class_object_attribute_value(docOut, "ob_request", "chart", "filepath");
            id = xml.get_class_object_attribute_value(docOut, "ob_request", "chart", "id");
            String previousType = xml.get_class_object_attribute_value(docOut, "ob_request", "chart", "type");
            String png = xml.get_class_object_attribute_value(docOut, "chart", previousType, "png");
            String pngOld = xml.get_class_object_attribute_value(docOut, "chart", previousType, "pngOld");

            String path_dir = "";
            if (data.equals("true")) {
                OPENBEXI_Creative_file creative_file = new OPENBEXI_Creative_file(null, _applicationPath);
                File file = new File(_applicationPath.getDefaultPath() + ob_getSeparator(_applicationPath.getDefaultPath()) + ob_getSeparator(_applicationPath.getDefaultWebPagesPath()) + "project" + ob_getSeparator(_applicationPath.getDefaultWebPagesPath()) + project + ob_getSeparator(_applicationPath.getDefaultWebPagesPath()) + "data" + ob_getSeparator(_applicationPath.getDefaultWebPagesPath()) + filename);
                creative_file.ob_saveDataFile(request, file);
                doc = BEXI_XMLDriver.openbexi_loadXMLFile(file.getCanonicalPath());
            } else {
                if (new File(filename).isFile())
                    doc = BEXI_XMLDriver.openbexi_loadXMLFile(filename);
                else {
                    File path;
                    if (_applicationPath != null)
                        path = new File(_applicationPath.getDefaultWebPagesPath());
                    else
                        path = new File("");
                    path_dir = path.getAbsolutePath() + ob_getSeparator(path.getAbsolutePath());
                    doc = BEXI_XMLDriver.openbexi_loadXMLFile(path_dir + filename);
                }
            }
            if (filename != null && id != null) {
                doc = xml.set_class_object_attribute_value(doc, "ob_explorer", "dir", "project", project);
                doc = xml.set_class_object_attribute_value(doc, "ob_request", "chart", "xmlFile", filename);
                doc = xml.set_class_object_attribute_value(doc, "ob_request", "chart", "id", id);
                String objects[] = xml.get_xml_classe_objectsName(doc, "chart");
                doc = xml.set_class_object_attribute_value(doc, "ob_request", "chart", "type", objects[0]);
                if (png != null)
                    doc = xml.set_class_object_attribute_value(doc, "chart", objects[0], "png", png);
                doc = xml.set_class_object_attribute_value(doc, "chart", objects[0], "filepath", filepath);
                if (pngOld != null)
                    doc = xml.set_class_object_attribute_value(doc, "chart", objects[0], "pngOld", pngOld);
            } else {
                String message = "Cannot load chart: " + path_dir + filename;
                ob_error(docOut, xml, message);
                return;
            }
        } catch (Exception e) {
            System.out.println("OPENBEXI_Creative_Chart.readXML:" + e.getMessage());
            String message = "Cannot load chart, " + type + " data not found ...";
            ob_error(docOut, xml, message);
            return;
        }

        try {
            this.create(doc, create_panel);
        } catch (Exception e) {
            System.err.println("OPENBEXI_Creative_Chart.readXML:" + e.getMessage());
            String message = "Cannot load chart, data not found ...";
            ob_error(docOut, xml, message);
        }
    }

    public void create(Document docOut, Boolean create_panel) {
        String type;
        String project;
        String pageName;
        String id;
        BEXI_XMLDriver xml = new BEXI_XMLDriver();
        try {
            project = xml.get_class_object_attribute_value(docOut, "ob_explorer", "dir", "project");
            pageName = xml.get_class_object_attribute_value(docOut, "ob_explorer", "dir", "page");
            id = xml.get_class_object_attribute_value(docOut, "ob_request", "chart", "id");
            type = xml.get_class_object_attribute_value(docOut, "ob_request", "chart", "type");
            if (type == null) type = "";
            docOut = xml.set_class_object_attribute_value(docOut, "ob_explorer", "status", "text", "OK");
        } catch (Exception e) {
            String message = "Cannot create chart. " + e.getMessage();
            ob_error(docOut, xml, message);
            return;
        }
        try {
            if (type.equals("pie")) {
                createPie(docOut, create_panel);
            } else if (type.equals("bar")) {
                createBar(docOut, create_panel);
            } else if (type.equals("line")) {
                createLineChart(docOut, create_panel);
            } else {
                System.err.println("OPENBEXI_Creative_Chart.createChart(): Unknown chart type");
                String message = "Unknown chart type";
                ob_error(docOut, xml, message);
                return;
            }
        } catch (chartException e) {
            System.err.println("OPENBEXI_Creative_Chart.create:" + e.getMessage());
            String message = e.getMessage();
            ob_error(docOut, xml, message);
            return;
        }
        try {
            BEXI_XMLDriver.openbexi_saveXMLFile(_applicationPath.getDefaultPath() + ob_getSeparator(_applicationPath.getDefaultWebPagesPath()) + "project" + ob_getSeparator(_applicationPath.getDefaultWebPagesPath()) + project + ob_getSeparator(_applicationPath.getDefaultWebPagesPath()) + "data" + ob_getSeparator(_applicationPath.getDefaultWebPagesPath()) + ob_getSeparator(_applicationPath.getDefaultWebPagesPath()) + pageName + "_" + id + ".xml", docOut);
        } catch (Exception e) {
            System.err.println("OPENBEXI_Creative_Chart.readXML:" + e.getMessage());
            String message = "Cannot save chart, data not found ...";
            ob_error(docOut, xml, message);
        }
        try {
            if (_response != null) {
                _response.setContentType("text/xml");
                _response.setHeader("Cache-Control", "no-cache");
                _response.getWriter().write(xml.XMLSerializer(docOut));
            }
        } catch (Exception e) {
            System.err.println("OPENBEXI_Creative_Chart.create:" + e.getMessage());
            String message = "Cannot create chart. " + e.getMessage();
            ob_error(docOut, xml, message);
        }
        // Remove the old chart file;
        try {
            String pngOld = xml.get_class_object_attribute_value(docOut, "chart", type, "pngOld");
            pngOld = _applicationPath.getDefaultPath() + ob_getSeparator(_applicationPath.getDefaultWebPagesPath()) + "project" + ob_getSeparator(_applicationPath.getDefaultWebPagesPath()) + project + ob_getSeparator(_applicationPath.getDefaultWebPagesPath()) + "gif" + ob_getSeparator(_applicationPath.getDefaultWebPagesPath()) + ob_getSeparator(_applicationPath.getDefaultWebPagesPath()) + pngOld;
            if (new File(pngOld).exists()) {
                boolean status = new File(pngOld).delete();
                if (!status)
                    System.err.println("OPENBEXI_Creative_Chart.create:Cannot delete old chart");
            }
        } catch (Exception e) {
            System.err.println("OPENBEXI_Creative_Chart.create:" + e.getMessage());
        }
    }

    public void createBar(Document docOut, Boolean create_panel) throws chartException {

        String type = "BarChart";
        String filepath;
        String png;
        String width;
        String height;
        String title;
        String subtitle;
        Boolean legendeB = true;
        Boolean tooltipsB = true;
        Boolean URLsB = true;
        String labelX;
        String labelY;
        String orientation;
        String foregroundAlpha;
        String background;
        String panelFont;
        String subTitleFont;
        DefaultCategoryDataset dataBar = new DefaultCategoryDataset();
        BEXI_XMLDriver xml = new BEXI_XMLDriver();
        try {
            String project = xml.get_class_object_attribute_value(docOut, "ob_explorer", "dir", "project");
            type = xml.get_class_object_attribute_value(docOut, "chart", "bar", "subtype");
            title = xml.get_class_object_attribute_value(docOut, "chart", "bar", "title");
            subtitle = xml.get_class_object_attribute_value(docOut, "chart", "bar", "subtitle");
            if (subtitle == null) subtitle = "";
            String legende = xml.get_class_object_attribute_value(docOut, "chart", "bar", "legende");
            if (legende != null && legende.equals("false")) legendeB = false;
            String tooltips = xml.get_class_object_attribute_value(docOut, "chart", "bar", "tooltips");
            if (tooltips != null && tooltips.equals("false")) tooltipsB = false;
            String URLs = xml.get_class_object_attribute_value(docOut, "chart", "bar", "URLs");
            if (URLs != null && URLs.equals("false")) URLsB = false;
            labelX = xml.get_class_object_attribute_value(docOut, "chart", "bar", "labelX");
            labelY = xml.get_class_object_attribute_value(docOut, "chart", "bar", "labelY");
            orientation = xml.get_class_object_attribute_value(docOut, "chart", "bar", "orientation");
            background = xml.get_class_object_attribute_value(docOut, "chart", "bar", "background");
            panelFont = xml.get_class_object_attribute_value(docOut, "chart", "bar", "panelFont");
            subTitleFont = xml.get_class_object_attribute_value(docOut, "chart", "bar", "subTitleFont");
            foregroundAlpha = xml.get_class_object_attribute_value(docOut, "chart", "bar", "foregroundAlpha");
            width = xml.get_class_object_attribute_value(docOut, "chart", "bar", "width");
            height = xml.get_class_object_attribute_value(docOut, "chart", "bar", "height");
            png = xml.get_class_object_attribute_value(docOut, "chart", "bar", "png");
            filepath = xml.get_class_object_attribute_value(docOut, "chart", "bar", "filepath");
            if (filepath == null || filepath.equals(""))
                png = _applicationPath.getDefaultPath() + ob_getSeparator(_applicationPath.getDefaultWebPagesPath()) + "project" + ob_getSeparator(_applicationPath.getDefaultWebPagesPath()) + project + ob_getSeparator(_applicationPath.getDefaultWebPagesPath()) + "gif" + ob_getSeparator(_applicationPath.getDefaultWebPagesPath()) + ob_getSeparator(_applicationPath.getDefaultWebPagesPath()) + png;
            else if (filepath.equals("absolute"))
                png = xml.get_class_object_attribute_value(docOut, "chart", "bar", "png");
            else
                png = filepath + ob_getSeparator(_applicationPath.getDefaultWebPagesPath()) + png;

            String data;
            int i = 0;
            while (xml.get_class_object_attribute_value(docOut, "chart", "bar", "data_" + Integer.toString(i)) != null) {
                data = xml.get_class_object_attribute_value(docOut, "chart", "bar", "data_" + Integer.toString(i));
                String[] items;
                if (data != null) {
                    items = data.split(";");
                    if (items.length == 3) dataBar.addValue(Double.parseDouble(items[0]), items[1], items[2]);
                }
                i++;
            }

        } catch (Exception e1) {
            throw new chartException("Cannot create " + type + " chart because wrong or missing data");
        }

        try {
            PlotOrientation orientationP = PlotOrientation.VERTICAL;
            if (orientation.equals("HORIZONTAL")) orientationP = PlotOrientation.HORIZONTAL;
            JFreeChart chart;
            if (type.equals("StackedBarChart3D")) {
                chart = ChartFactory.createStackedBarChart3D(
                        title,  // chart title
                        labelX,
                        labelY,
                        dataBar,             // data
                        orientationP,
                        legendeB,               // include legend
                        tooltipsB,
                        URLsB
                );
            } else if (type.equals("StackedBarChart")) {
                chart = ChartFactory.createStackedBarChart(
                        title,  // chart title
                        labelX,
                        labelY,
                        dataBar,             // data
                        orientationP,
                        legendeB,               // include legend
                        tooltipsB,
                        URLsB
                );
            } else if (type.equals("BarChart3D")) {
                chart = ChartFactory.createBarChart3D(
                        title,  // chart title
                        labelX,
                        labelY,
                        dataBar,             // data
                        orientationP,
                        legendeB,               // include legend
                        tooltipsB,
                        URLsB
                );
            } else {
                chart = ChartFactory.createBarChart(
                        title,  // chart title
                        labelX,
                        labelY,
                        dataBar,             // data
                        orientationP,
                        legendeB,               // include legend
                        tooltipsB,
                        URLsB
                );
            }

            // Create and display panel
            ChartPanel panel = new ChartPanel(chart, false);
            try {
                panel.setFont(Font.decode(panelFont));
            } catch (Exception e) {
                System.err.println("OPENBEXI_Creative_Chart.createBar:" + e.getMessage());
            }
            TextTitle sub_title = new TextTitle(subtitle);
            chart.addSubtitle(sub_title);
            try {
                sub_title.setFont(Font.decode(subTitleFont));
            } catch (Exception e) {
                System.err.println("OPENBEXI_Creative_Chart.createBar:" + e.getMessage());
            }

            CategoryPlot plot = chart.getCategoryPlot();
            //plot.getLegendItems().get(0).setLabelFont();
            //plot.setStartAngle(360);
            plot.setForegroundAlpha(Float.valueOf(foregroundAlpha));
            plot.setBackgroundPaint(this.getColor(background));
            plot.setNoDataMessage("No Data available");
            try {
                String seriesPaint = xml.get_class_object_attribute_value(docOut, "chart", "bar", "seriesPaint");
                String seriesPaintItems[] = seriesPaint.split(";");
                for (int i = 0; i < (seriesPaintItems.length); i += 2) {
                    plot.getRenderer().setSeriesPaint(Integer.parseInt(seriesPaintItems[i]), Color.decode(seriesPaintItems[i + 1]));
                    //i++;
                }
            } catch (Exception e) {
                System.err.println("OPENBEXI_Creative_Chart.createBar:" + e.getMessage());
            }

            if (_ob_debug) System.out.println("OPENBEXI_Creative_Chart.createBar:saveChartAsPNG " + png);
            ChartUtilities.saveChartAsPNG(new File(png), chart, Integer.parseInt(width), Integer.parseInt(height));

        } catch (Exception e) {
            System.err.println("OPENBEXI_Creative_Chart.createBar:" + e.getMessage());
        }
    }

    public void createPie(Document docOut, Boolean create_panel) throws chartException {

        String type = "PieChart";
        String title;
        String subtitle;
        Boolean legendeB = true;
        Boolean tooltipsB = true;
        Boolean URLsB = true;
        String data;
        String png;
        String filepath;
        String width;
        String height;
        String labelGap;
        String explode;
        String explodeNumber;
        String foregroundAlpha;
        String background;
        String panelFont;
        String subTitleFont;
        String plotFont;
        DefaultPieDataset dataPie = new DefaultPieDataset();
        final BEXI_XMLDriver xml = new BEXI_XMLDriver();
        try {

            String project = xml.get_class_object_attribute_value(docOut, "ob_explorer", "dir", "project");
            type = xml.get_class_object_attribute_value(docOut, "chart", "pie", "subtype");
            title = xml.get_class_object_attribute_value(docOut, "chart", "pie", "title");
            subtitle = xml.get_class_object_attribute_value(docOut, "chart", "pie", "subtitle");
            if (subtitle == null) subtitle = "";
            String legende = xml.get_class_object_attribute_value(docOut, "chart", "pie", "legende");
            if (legende != null && legende.equals("false")) legendeB = false;
            String tooltips = xml.get_class_object_attribute_value(docOut, "chart", "pie", "tooltips");
            if (tooltips != null && tooltips.equals("false")) tooltipsB = false;
            String URLs = xml.get_class_object_attribute_value(docOut, "chart", "pie", "URLs");
            if (URLs != null && URLs.equals("false")) URLsB = false;
            data = xml.get_class_object_attribute_value(docOut, "chart", "pie", "data_0");
            png = xml.get_class_object_attribute_value(docOut, "chart", "pie", "png");
            filepath = xml.get_class_object_attribute_value(docOut, "chart", "pie", "filepath");
            if (filepath == null || filepath.equals(""))
                png = _applicationPath.getDefaultPath() + ob_getSeparator(_applicationPath.getDefaultWebPagesPath()) + "project" + ob_getSeparator(_applicationPath.getDefaultWebPagesPath()) + project + ob_getSeparator(_applicationPath.getDefaultWebPagesPath()) + "gif" + ob_getSeparator(_applicationPath.getDefaultWebPagesPath()) + png;
            else if (filepath.equals("absolute"))
                png = xml.get_class_object_attribute_value(docOut, "chart", "pie", "png");
            else
                png = filepath + ob_getSeparator(_applicationPath.getDefaultWebPagesPath()) + png;
            width = xml.get_class_object_attribute_value(docOut, "chart", "pie", "width");
            height = xml.get_class_object_attribute_value(docOut, "chart", "pie", "height");
            explode = xml.get_class_object_attribute_value(docOut, "chart", "pie", "explode");
            explodeNumber = xml.get_class_object_attribute_value(docOut, "chart", "pie", "explodeNumber");
            labelGap = xml.get_class_object_attribute_value(docOut, "chart", "pie", "labelGap");
            foregroundAlpha = xml.get_class_object_attribute_value(docOut, "chart", "pie", "foregroundAlpha");
            background = xml.get_class_object_attribute_value(docOut, "chart", "pie", "background");
            panelFont = xml.get_class_object_attribute_value(docOut, "chart", "pie", "panelFont");
            subTitleFont = xml.get_class_object_attribute_value(docOut, "chart", "pie", "subTitleFont");
            plotFont = xml.get_class_object_attribute_value(docOut, "chart", "pie", "plotFont");

            if (data != null) {
                String[] items = data.split(";");
                for (int i = 0; i < items.length; i++) {
                    try {
                        dataPie.setValue(items[i], Double.valueOf(items[i + 1]));
                        i++;
                    } catch (Exception e) {
                        throw new chartException("Cannot create " + type + " chart because wrong or missing data\n" + e.getMessage());
                    }
                }
            }
        } catch (Exception e1) {
            throw new chartException("Cannot create " + type + " chart because wrong or missing data");
        }

        try {

            JFreeChart chart;
            if (type.equals("PieChart3D")) {
                chart = ChartFactory.createPieChart3D(
                        title,  // chart title
                        dataPie,             // data
                        legendeB,               // include legend
                        tooltipsB,
                        URLsB
                );
            } else if (type.equals("RingChart")) {
                chart = ChartFactory.createRingChart(
                        title,  // chart title
                        dataPie,             // data
                        legendeB,               // include legend
                        tooltipsB,
                        URLsB
                );
            } else {
                chart = ChartFactory.createPieChart(
                        title,  // chart title
                        dataPie,             // data
                        legendeB,               // include legend
                        tooltipsB,
                        URLsB
                );
            }

            // Create and display panel
            ChartPanel panel = new ChartPanel(chart, false);
            try {
                panel.setFont(Font.decode(panelFont));
            } catch (Exception e) {
                System.err.println("OPENBEXI_Creative_Chart.createPie:" + e.getMessage());
            }
            TextTitle sub_title = new TextTitle(subtitle);
            chart.addSubtitle(sub_title);
            try {
                sub_title.setFont(Font.decode(subTitleFont));
            } catch (Exception e) {
                System.err.println("OPENBEXI_Creative_Chart.createPie:" + e.getMessage());
            }

            PiePlot plot;
            if (type.equals("D3"))
                plot = (PiePlot3D) chart.getPlot();
            else
                plot = (PiePlot) chart.getPlot();

            //plot.setStartAngle(360);
            try {
                plot.setLabelFont(Font.decode(plotFont));
            } catch (Exception e) {
                System.err.println("OPENBEXI_Creative_Chart.createPie:" + e.getMessage());
            }
            plot.setForegroundAlpha(Float.valueOf(foregroundAlpha));
            plot.setBackgroundPaint(this.getColor(background));
            //plot.setDirection(Rotation.CLOCKWISE);
            plot.setNoDataMessage("No Data available");
            plot.setSectionOutlinesVisible(true);
            //plot.setSectionPaint(1,Color.RED);
            //plot.setCircular(true,true);
            plot.setLabelGap(Double.valueOf(labelGap));
            try {
                Comparable key = dataPie.getKey(Integer.valueOf(explodeNumber));
                plot.setExplodePercent(key, Double.valueOf(explode));
            } catch (Exception e) {
                System.err.println("OPENBEXI_Creative_Chart.createPie:" + e.getMessage());
            }
            try {
                String seriesPaint = xml.get_class_object_attribute_value(docOut, "chart", "pie", "seriesPaint");
                String seriesPaintItems[] = seriesPaint.split(";");
                for (int i = 0; i < (seriesPaintItems.length); i += 2) {
                    plot.setSectionPaint(Integer.parseInt(seriesPaintItems[i]), Color.decode(seriesPaintItems[i + 1]));
                }
            } catch (Exception e) {
                System.err.println("OPENBEXI_Creative_Chart.createPie:" + e.getMessage());
            }
            if (_ob_debug) System.out.println("OPENBEXI_Creative_Chart.createLine:saveChartAsPNG " + png);
            ChartUtilities.saveChartAsPNG(new File(png), chart, Integer.parseInt(width), Integer.parseInt(height));

        } catch (Exception e) {
            System.err.println("OPENBEXI_Creative_Chart.createPie:" + e.getMessage());
        }
    }

    public void createLineChart(Document docOut, Boolean create_panel) throws chartException {

        String type = "LineChart";
        String project;
        String filepath;
        String png;
        String width;
        String height;
        String title;
        String subtitle;
        Boolean legendeB = true;
        Boolean tooltipsB = true;
        Boolean URLsB = true;
        String labelX;
        String labelY;
        String orientation;
        String foregroundAlpha;
        String background;
        String panelFont;
        String subTitleFont;
        XYSeriesCollection dataLine = new XYSeriesCollection();
        final BEXI_XMLDriver xml = new BEXI_XMLDriver();
        try {
            project = xml.get_class_object_attribute_value(docOut, "ob_explorer", "dir", "project");
            type = xml.get_class_object_attribute_value(docOut, "chart", "line", "subtype");
            title = xml.get_class_object_attribute_value(docOut, "chart", "line", "title");
            subtitle = xml.get_class_object_attribute_value(docOut, "chart", "line", "subtitle");
            if (subtitle == null) subtitle = "";
            String legende = xml.get_class_object_attribute_value(docOut, "chart", "line", "legende");
            if (legende != null && legende.equals("false")) legendeB = false;
            String tooltips = xml.get_class_object_attribute_value(docOut, "chart", "line", "tooltips");
            if (tooltips != null && tooltips.equals("false")) tooltipsB = false;
            String URLs = xml.get_class_object_attribute_value(docOut, "chart", "line", "URLs");
            if (URLs != null && URLs.equals("false")) URLsB = false;
            labelX = xml.get_class_object_attribute_value(docOut, "chart", "line", "labelX");
            labelY = xml.get_class_object_attribute_value(docOut, "chart", "line", "labelY");
            orientation = xml.get_class_object_attribute_value(docOut, "chart", "line", "orientation");
            foregroundAlpha = xml.get_class_object_attribute_value(docOut, "chart", "line", "foregroundAlpha");
            background = xml.get_class_object_attribute_value(docOut, "chart", "line", "background");
            panelFont = xml.get_class_object_attribute_value(docOut, "chart", "line", "panelFont");
            subTitleFont = xml.get_class_object_attribute_value(docOut, "chart", "line", "subTitleFont");
            filepath = xml.get_class_object_attribute_value(docOut, "chart", "line", "filepath");
            png = xml.get_class_object_attribute_value(docOut, "chart", "line", "png");
            if (filepath == null || filepath.equals(""))
                png = _applicationPath.getDefaultPath() + ob_getSeparator(_applicationPath.getDefaultWebPagesPath()) + "project" + ob_getSeparator(_applicationPath.getDefaultWebPagesPath()) + project + ob_getSeparator(_applicationPath.getDefaultWebPagesPath()) + "gif" + ob_getSeparator(_applicationPath.getDefaultWebPagesPath()) + ob_getSeparator(_applicationPath.getDefaultWebPagesPath()) + png;
            else if (filepath.equals("absolute"))
                png = xml.get_class_object_attribute_value(docOut, "chart", "line", "png");
            else
                png = filepath + ob_getSeparator(_applicationPath.getDefaultWebPagesPath()) + png;
            width = xml.get_class_object_attribute_value(docOut, "chart", "line", "width");
            height = xml.get_class_object_attribute_value(docOut, "chart", "line", "height");

            String dataX;
            int i = 0;
            while (xml.get_class_object_attribute_value(docOut, "chart", "line", "data_" + Integer.toString(i)) != null) {
                dataX = xml.get_class_object_attribute_value(docOut, "chart", "line", "data_" + Integer.toString(i));
                            String dataY = xml.get_class_object_attribute_value(docOut, "chart", "line", "data_" + Integer.toString(i));
                String[] itemsX;
                 String[] itemsY;
                if (dataX != null) {
                    itemsX = dataX.split(";");
                    itemsY = dataY.split(";");
                    if (itemsX.length >= 3) {
                        XYSeries series = new XYSeries(itemsX[0]);
                        for (int j = 1; j < itemsX.length - 1; j++) {
                            series.add(Double.parseDouble(itemsY[j]), Double.parseDouble((itemsX[j + 1])));
                        }
                        dataLine.addSeries(series);
                    }
                }
                i++;
            }

        } catch (Exception e1) {
            throw new chartException("Cannot create " + type + " chart because wrong or missing data");
        }

        try {
            PlotOrientation orientationP = PlotOrientation.VERTICAL;
            if (orientation.equals("HORIZONTAL")) orientationP = PlotOrientation.HORIZONTAL;
            JFreeChart chart;
            if (type.equals("ScatterPlot")) {
                chart = ChartFactory.createScatterPlot(
                        title,  // chart title
                        labelX,
                        labelY,
                        dataLine,             // data
                        orientationP,
                        legendeB,               // include legend
                        tooltipsB,
                        URLsB
                );
            } else if (type.equals("TimeSeriesChart")) {
                chart = ChartFactory.createTimeSeriesChart(
                        title,  // chart title
                        labelX,
                        labelY,
                        dataLine,             // data
                        legendeB,               // include legend
                        tooltipsB,
                        URLsB
                );

            } else if (type.equals("AreaChart")) {
                chart = ChartFactory.createXYAreaChart(
                        title,  // chart title
                        labelX,
                        labelY,
                        dataLine,             // data
                        orientationP,
                        legendeB,               // include legend
                        tooltipsB,
                        URLsB
                );
            } else {
                chart = ChartFactory.createXYLineChart(
                        title,  // chart title
                        labelX,
                        labelY,
                        dataLine,             // data
                        orientationP,
                        legendeB,               // include legend
                        tooltipsB,
                        URLsB
                );
            }

            // Create and display panel
            ChartPanel panel = new ChartPanel(chart, false);
            try {
                panel.setFont(Font.decode(panelFont));
            } catch (Exception e) {
                System.err.println("OPENBEXI_Creative_Chart.createLineChart:" + e.getMessage());
            }
            TextTitle sub_title = new TextTitle(subtitle);
            chart.addSubtitle(sub_title);
            try {
                sub_title.setFont(Font.decode(subTitleFont));
            } catch (Exception e) {
                System.err.println("OPENBEXI_Creative_Chart.createLineChart:" + e.getMessage());
            }

            XYPlot plot = (XYPlot) chart.getPlot();
            plot.setForegroundAlpha(Float.valueOf(foregroundAlpha));
            plot.setBackgroundPaint(this.getColor(background));
            plot.setNoDataMessage("No Data available");

            try {
                String seriesPaint = xml.get_class_object_attribute_value(docOut, "chart", "line", "seriesPaint");
                String seriesPaintItems[] = seriesPaint.split(";");
                for (int i = 0; i < (seriesPaintItems.length); i += 2) {
                    plot.getRenderer().setSeriesPaint(Integer.parseInt(seriesPaintItems[i]), Color.decode(seriesPaintItems[i + 1]));
                }
            } catch (Exception e) {
                System.err.println("OPENBEXI_Creative_Chart.createLine:" + e.getMessage());
            }

            if (_ob_debug) System.out.println("OPENBEXI_Creative_Chart.createLine:saveChartAsPNG " + png);
            ChartUtilities.saveChartAsPNG(new File(png), chart, Integer.parseInt(width), Integer.parseInt(height));

        } catch (Exception e) {
            System.err.println("OPENBEXI_Creative_Chart.createLine:" + e.getMessage());
        }
    }

    public static void main(String args[]) {

        if (args.length == 1) {
            Document docOut = null;
            final BEXI_XMLDriver xml = new BEXI_XMLDriver();
            OPENBEXI_Creative_Chart chart = new OPENBEXI_Creative_Chart(null, null);
            try {
                String[] xml_files = args[0].split(";");
                for (int i = 0; i < xml_files.length; i++) {
                    docOut = xml.set_class_object_attribute_value(docOut, "ob_request", "chart", "xmlFile", xml_files[i]);
                    docOut = xml.set_class_object_attribute_value(docOut, "ob_request", "chart", "filepath", "absolute");
                    docOut = xml.set_class_object_attribute_value(docOut, "ob_request", "chart", "type", "pie");
                    docOut = xml.set_class_object_attribute_value(docOut, "ob_request", "chart", "id", "0");
                    chart.readXML(null, docOut, false);
                }
            } catch (Exception e) {
                System.err.println("OPENBEXI_Creative_Chart.main:" + e.getMessage());
            }
        } else {

            final BEXI_XMLDriver xml = new BEXI_XMLDriver();
            Document docOut = null;
            BEXI_ApplicationPath applicationPath = null;
            try {
                applicationPath = new BEXI_ApplicationPath();
            } catch (Exception e) {
                System.err.println("OPENBEXI_Creative_Chart.main:" + e.getMessage());
            }
            //-----------------Pie from xml file -----------------------------------------------------------------------
            OPENBEXI_Creative_Chart pie_from_xml = new OPENBEXI_Creative_Chart(null, applicationPath);
            boolean xml_load = true;
            if (xml_load) {
                try {
                    docOut = xml.set_class_object_attribute_value(docOut, "ob_explorer", "dir", "project", "no_name");
                    docOut = xml.set_class_object_attribute_value(docOut, "ob_explorer", "dir", "page", "no_name");

                    docOut = xml.set_class_object_attribute_value(docOut, "ob_request", "chart", "xmlFile", "data/xml/chart_pie_test.xml");
                    docOut = xml.set_class_object_attribute_value(docOut, "ob_request", "chart", "type", "pie");
                    docOut = xml.set_class_object_attribute_value(docOut, "ob_request", "chart", "id", "0");
                    docOut = xml.set_class_object_attribute_value(docOut, "chart", "pie", "output", "png");
                    docOut = xml.set_class_object_attribute_value(docOut, "chart", "pie", "png", "pie_test.png");
                    pie_from_xml.readXML(null, docOut, true);

                    docOut = xml.set_class_object_attribute_value(docOut, "ob_request", "chart", "xmlFile", "data/xml/chart_bar_test.xml");
                    docOut = xml.set_class_object_attribute_value(docOut, "ob_request", "chart", "type", "bar");
                    docOut = xml.set_class_object_attribute_value(docOut, "ob_request", "chart", "id", "1");
                    docOut = xml.set_class_object_attribute_value(docOut, "chart", "bar", "output", "png");
                    docOut = xml.set_class_object_attribute_value(docOut, "chart", "bar", "png", "chart_test.png");
                    pie_from_xml.readXML(null, docOut, true);

                    docOut = xml.set_class_object_attribute_value(docOut, "ob_request", "chart", "xmlFile", "data/xml/chart_line_test.xml");
                    docOut = xml.set_class_object_attribute_value(docOut, "ob_request", "chart", "type", "line");
                    docOut = xml.set_class_object_attribute_value(docOut, "ob_request", "chart", "id", "2");
                    docOut = xml.set_class_object_attribute_value(docOut, "chart", "line", "output", "png");
                    docOut = xml.set_class_object_attribute_value(docOut, "chart", "line", "png", "line_test.png");
                    pie_from_xml.readXML(null, docOut, true);
                } catch (Exception e) {
                    System.err.println(e.getMessage());
                }
            } else {
                //-----------------Pie--------------------------------------------------------------------------------------
                String[] chart = {"PieChart3D", "PieChart", "RingChart"};
                for (int i = 0; i < chart.length; i++) {
                    try {
                        docOut = xml.set_class_object_attribute_value(docOut, "ob_request", "chart", "id", "0");
                        docOut = xml.set_class_object_attribute_value(docOut, "chart", "pie", "output", "png");
                        docOut = xml.set_class_object_attribute_value(docOut, "chart", "pie", "subtype", chart[i]);
                        docOut = xml.set_class_object_attribute_value(docOut, "chart", "pie", "title", chart[i]);
                        docOut = xml.set_class_object_attribute_value(docOut, "chart", "pie", "legende", "false");
                        docOut = xml.set_class_object_attribute_value(docOut, "chart", "pie", "png", chart[i] + ".png");
                        docOut = xml.set_class_object_attribute_value(docOut, "chart", "pie", "height", "300");
                        docOut = xml.set_class_object_attribute_value(docOut, "chart", "pie", "width", "400");
                        docOut = xml.set_class_object_attribute_value(docOut, "chart", "pie", "labelGap", "0.02");
                        docOut = xml.set_class_object_attribute_value(docOut, "chart", "pie", "foregroundAlpha", "0.6f");
                        docOut = xml.set_class_object_attribute_value(docOut, "chart", "pie", "background", "white");
                        docOut = xml.set_class_object_attribute_value(docOut, "chart", "pie", "explodeNumber", "1");
                        docOut = xml.set_class_object_attribute_value(docOut, "chart", "pie", "explode", "0.19");
                        docOut = xml.set_class_object_attribute_value(docOut, "chart", "pie", "seriesPaint", "0;#FFFF001;1;#0000FF;2;#04B404");
                        docOut = xml.set_class_object_attribute_value(docOut, "chart", "pie", "data_0", "One;33.3;Two;33.3;Three;33.3;");
                    } catch (Exception e) {
                        System.err.println(e.getMessage());
                    }

                    OPENBEXI_Creative_Chart pie = new OPENBEXI_Creative_Chart(null, applicationPath);
                    try {
                        pie.createPie(docOut, true);
                    } catch (chartException e) {
                        System.err.println(e.getMessage());
                    }
                }
                //-----------------Bar---------------------------------------------------------------------------------------
                String[] chart1 = {"StackedBarChart", "StackedBarChart3D", "BarChart", "BarChart3D"};
                for (int i = 0; i < chart1.length; i++) {
                    try {
                        docOut = null;
                        docOut = xml.set_class_object_attribute_value(docOut, "ob_explorer", "dir", "project", "no_name");
                        docOut = xml.set_class_object_attribute_value(docOut, "ob_explorer", "dir", "page", "no_name");
                        docOut = xml.set_class_object_attribute_value(docOut, "ob_request", "chart", "id", "1");
                        docOut = xml.set_class_object_attribute_value(docOut, "chart", "bar", "output", "png");
                        docOut = xml.set_class_object_attribute_value(docOut, "chart", "bar", "subtype", chart1[i]);
                        docOut = xml.set_class_object_attribute_value(docOut, "chart", "bar", "title", chart1[i]);
                        docOut = xml.set_class_object_attribute_value(docOut, "chart", "bar", "legende", "true");
                        docOut = xml.set_class_object_attribute_value(docOut, "chart", "bar", "foregroundAlpha", "0.8f");
                        docOut = xml.set_class_object_attribute_value(docOut, "chart", "bar", "background", "white");
                        docOut = xml.set_class_object_attribute_value(docOut, "chart", "bar", "png", chart1[i] + ".png");
                        docOut = xml.set_class_object_attribute_value(docOut, "chart", "bar", "height", "300");
                        docOut = xml.set_class_object_attribute_value(docOut, "chart", "bar", "width", "400");
                        docOut = xml.set_class_object_attribute_value(docOut, "chart", "bar", "tooltips", "true");
                        docOut = xml.set_class_object_attribute_value(docOut, "chart", "bar", "URLs", "false");

                        docOut = xml.set_class_object_attribute_value(docOut, "chart", "bar", "labelX", "labelX");
                        docOut = xml.set_class_object_attribute_value(docOut, "chart", "bar", "labelY", "labelY");
                        docOut = xml.set_class_object_attribute_value(docOut, "chart", "bar", "orientation", "VERTICAL");
                        docOut = xml.set_class_object_attribute_value(docOut, "chart", "bar", "seriesPaint", "0;#DF0101;1;#0000FF;2;#04B404;3;#FFFF00");

                        docOut = xml.set_class_object_attribute_value(docOut, "chart", "bar", "data_0", "10;first;category1");
                        docOut = xml.set_class_object_attribute_value(docOut, "chart", "bar", "data_1", "30;first;category2");
                        docOut = xml.set_class_object_attribute_value(docOut, "chart", "bar", "data_2", "50;first;category3");
                        docOut = xml.set_class_object_attribute_value(docOut, "chart", "bar", "data_3", "15;first;category4");

                        docOut = xml.set_class_object_attribute_value(docOut, "chart", "bar", "data_4", "10;second;category1");
                        docOut = xml.set_class_object_attribute_value(docOut, "chart", "bar", "data_5", "70;second;category2");
                        docOut = xml.set_class_object_attribute_value(docOut, "chart", "bar", "data_6", "50;second;category3");

                        docOut = xml.set_class_object_attribute_value(docOut, "chart", "bar", "data_7", "15;third;category1");
                        docOut = xml.set_class_object_attribute_value(docOut, "chart", "bar", "data_8", "25;third;category2");

                    } catch (Exception e) {
                        System.err.println(e.getMessage());
                    }

                    OPENBEXI_Creative_Chart bar = new OPENBEXI_Creative_Chart(null, applicationPath);
                    try {
                        bar.createBar(docOut, true);
                    } catch (Exception e) {
                        System.err.println(e.getMessage());
                    }
                }
                //------------Line chart--------------------------------------------------------------------------------
                String[] chart2 = {"LineChart", "ScatterPlot", "AreaChart", "TimeSeriesChart"};
                for (int i = 0; i < chart2.length; i++) {
                    try {
                        docOut = null;
                        docOut = xml.set_class_object_attribute_value(docOut, "ob_request", "chart", "id", "2");
                        docOut = xml.set_class_object_attribute_value(docOut, "chart", "line", "output", "png");
                        docOut = xml.set_class_object_attribute_value(docOut, "chart", "line", "subtype", chart2[i]);
                        docOut = xml.set_class_object_attribute_value(docOut, "chart", "line", "title", chart2[i]);
                        docOut = xml.set_class_object_attribute_value(docOut, "chart", "line", "legende", "true");
                        docOut = xml.set_class_object_attribute_value(docOut, "chart", "line", "png", chart2[i] + ".png");
                        docOut = xml.set_class_object_attribute_value(docOut, "chart", "line", "height", "300");
                        docOut = xml.set_class_object_attribute_value(docOut, "chart", "line", "width", "400");
                        docOut = xml.set_class_object_attribute_value(docOut, "chart", "line", "foregroundAlpha", "0.6f");
                        docOut = xml.set_class_object_attribute_value(docOut, "chart", "line", "background", "white");

                        docOut = xml.set_class_object_attribute_value(docOut, "chart", "line", "labelX", "labelX");
                        docOut = xml.set_class_object_attribute_value(docOut, "chart", "line", "labelY", "labelY");
                        docOut = xml.set_class_object_attribute_value(docOut, "chart", "line", "orientation", "VERTICAL");
                        docOut = xml.set_class_object_attribute_value(docOut, "chart", "line", "seriesPaint", "0;#FFFF00;1;#0000FF;2;#04B404;3;#DF0101");

                        docOut = xml.set_class_object_attribute_value(docOut, "chart", "line", "data_0", "first;10;11;33;44;22;45;44;21");
                        docOut = xml.set_class_object_attribute_value(docOut, "chart", "line", "data_1", "second;30;33;44;34;65;23");
                        docOut = xml.set_class_object_attribute_value(docOut, "chart", "line", "data_2", "third;50;22;34;67;54;28;22;3;44;33");


                    } catch (Exception e) {
                        System.err.println(e.getMessage());
                    }

                    OPENBEXI_Creative_Chart lineChart = new OPENBEXI_Creative_Chart(null, applicationPath);
                    try {
                        lineChart.createLineChart(docOut, true);
                    } catch (chartException e) {
                        System.err.println(e.getMessage());
                    }
                }
            }
        }
    }
}
