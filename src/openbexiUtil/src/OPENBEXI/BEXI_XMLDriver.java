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

import com.sun.org.apache.xerces.internal.parsers.DOMParser;
import com.sun.org.apache.xml.internal.serialize.OutputFormat;
import com.sun.org.apache.xml.internal.serialize.XMLSerializer;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.*;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import java.io.*;
import java.util.Vector;


/**
 * Manage XML data.
 */

public final class BEXI_XMLDriver extends Object {

    /**
     * Read a XML file, convert the XML elements to OPENBEXI objects and return the objects according the class and object name.
     * <li> If the object name parameter is null, return all the objects
     *
     * @param context
     * @param classe
     * @param object
     * @return
     * @throws Exception
     */
    public static Vector select_class_object(final BEXI_ApplicationPath context, final String classe, final String object) throws Exception {

        final Vector BEXIObjects = new Vector();
        final Document document;
        int count = 0;

        try {
            //Load and parse the XML document
            final DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            final DocumentBuilder docbuilder = factory.newDocumentBuilder();
            final String xmlFilePath = context.getDefaultXMLFilePath();
            document = docbuilder.parse(new File(xmlFilePath + System.getProperty("file.separator") + classe + ".xml"));
            // Look for class object attribut and values
            final NodeList objectXMLList = document.getElementsByTagName("object");
            for (int i = 0; i < objectXMLList.getLength(); i++) {

                final Node objectList = objectXMLList.item(i);
                final NodeList objectTmp = objectList.getChildNodes();

                // Look for each class object attribut (name and value)
                String objectName = null;
                final String[] attributs = new String[objectTmp.getLength()];
                final String[] values = new String[objectTmp.getLength()];

                for (int j = 0; j < objectTmp.getLength(); j++) {
                    final Node attributTmp = objectTmp.item(j);

                    //Set up object attribut name
                    attributs[j] = attributTmp.getNodeName();

                    //Set up object attribut value
                    final Node node = attributTmp.getFirstChild();
                    if (node != null) {
                        values[j] = node.getNodeValue();
                        // If Attribut name equal "NAME", we got the object name
                        if (attributs[j].equals("name")) {
                            objectName = values[j];
                        }
                    } else {
                        values[j] = "null";
                    }
                }
                // Look for a specific  object
                if (object != null && objectName != null) {
                    if (objectName.equals(object)) {
                        final BEXI_Object BEXIObject = new BEXI_Object(null, classe, objectName, attributs, values, null, null, false);
                        BEXIObject.set_lineSource("XML database");
                        BEXIObjects.add(count, BEXIObject);
                        count = count + 1;
                    }
                } else {
                    final BEXI_Object BEXIObject = new BEXI_Object(null, classe, objectName, attributs, values, null, null, false);
                    BEXIObject.set_lineSource("XML database");
                    BEXIObjects.add(count, BEXIObject);
                    count = count + 1;
                }
            }

        } catch (Exception e) {
            throw e;
        }
        return BEXIObjects;
    }

    /**
     * Read a XML file, convert the XML elements to OPENBEXI objects and return all objects of the class.
     * <li> If the object name parameter is null, return all the objects
     *
     * @param context
     * @param classe
     * @return
     * @throws Exception
     */
    public static Vector select_class_objects(final BEXI_ApplicationPath context, final String classe) throws Exception {

        final Vector BEXIObjects = new Vector();
        final Document document;
        int count = 0;

        try {
            //Load and parse the XML document
            final DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            final DocumentBuilder docbuilder = factory.newDocumentBuilder();
            final String xmlFilePath = context.getDefaultXMLFilePath();
            document = docbuilder.parse(new File(xmlFilePath + System.getProperty("file.separator") + classe + ".xml"));
            // Look for class object attribut and values
            final NodeList objectXMLList = document.getElementsByTagName("object");
            for (int i = 0; i < objectXMLList.getLength(); i++) {

                final Node objectList = objectXMLList.item(i);
                final NodeList objectTmp = objectList.getChildNodes();

                // Look for each class object attribut (name and value)
                String objectName = null;
                final String[] attributs = new String[objectTmp.getLength()];
                final String[] values = new String[objectTmp.getLength()];

                for (int j = 0; j < objectTmp.getLength(); j++) {
                    final Node attributTmp = objectTmp.item(j);

                    //Set up object attribut name
                    attributs[j] = attributTmp.getNodeName();

                    //Set up object attribut value
                    final Node node = attributTmp.getFirstChild();
                    if (node != null) {
                        values[j] = node.getNodeValue();
                        // If Attribut name equal "NAME", we got the object name
                        if (attributs[j].equals("name")) {
                            objectName = values[j];
                        }
                    } else {
                        values[j] = "null";
                    }
                }
            }

        } catch (Exception e) {
            throw e;
        }
        return BEXIObjects;
    }

    /**
     * @param xml
     * @return
     * @throws Exception
     */
    public static Document openbexi_loadXML(String xml) throws Exception {
        Document document = null;
        int count = 0;

        try {
            //Load and parse the XML document
            final DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            final DocumentBuilder docbuilder = factory.newDocumentBuilder();
            document = docbuilder.parse(new InputSource(new ByteArrayInputStream(xml.getBytes("utf-8"))));
        } catch (Exception e) {
            throw e;
        }
        return document;
    }

    /**
     * @param filename
     * @return
     * @throws Exception
     */
    public static Document openbexi_loadXMLFile(String filename) throws Exception {
        Document document = null;
        int count = 0;

        try {
            //Load and parse the XML document
            final DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            final DocumentBuilder docbuilder = factory.newDocumentBuilder();
            document = docbuilder.parse(new File(filename));
        } catch (Exception e) {
            throw e;
        }
        return document;
    }

    /**
     * @param filename
     * @param docOut
     * @throws Exception
     */
    public static void openbexi_saveXMLFile_obsolete(String filename, Document docOut) throws Exception {

        try {
            Transformer tf = TransformerFactory.newInstance().newTransformer();
            tf.setOutputProperty(OutputKeys.METHOD, "xml");
            //tf.setOutputProperty("{http://xml.apache.org/xslt}indent-amount", "2");
            tf.setOutputProperty(OutputKeys.INDENT, "yes");
            tf.setOutputProperty(OutputKeys.ENCODING, "ISO-8859-1");
            DOMSource source = new DOMSource(docOut);
            FileOutputStream file = new FileOutputStream(filename);
            StreamResult result = new StreamResult(file);
            tf.transform(source, result);
            // Close here because TransformerFactory bug.
            file.close();
            System.out.println("openbexi_saveXMLFile: Saving " + filename);

        } catch (Exception e) {
            System.err.println("openbexi_saveXMLFile:" + e.getMessage());
            throw e;
        }
    }

    /**
     * @param filename
     * @param docOut
     * @throws Exception
     */
    public static void openbexi_saveXMLFile(String filename, Document docOut) throws Exception {
        StringWriter stringOut = null;
        try {
            //Serialize DOM
            OutputFormat format = new OutputFormat(docOut);
            stringOut = new StringWriter();
            XMLSerializer serial = new XMLSerializer(stringOut, format);
            serial.serialize(docOut);

        } catch (IOException e) {
            System.err.println("openbexi_saveXMLFile:" + e.getMessage());
            throw e;

        }
        try {
            String str = stringOut.toString();
            FileOutputStream file = new FileOutputStream(filename);
            StreamResult result = new StreamResult(file);
            if (str.contains("xml version="))
                new PrintStream(file).println(str);
            else
                new PrintStream(file).println("<?xml version=\"1.0\" encoding=\"iso-8859-1\" ?>" + "\n" + str);
            file.close();
            System.out.println("openbexi_saveXMLFile: Saving " + filename);

        } catch (Exception e) {
            System.err.println("openbexi_saveXMLFile:" + e.getMessage());
            throw e;
        }
    }

    /**
     * Read a XML file, convert the XML elements to OPENBEXI objects and return the objects according the class and object name.
     * <li> If the object name parameter is null, return all the objects
     *
     * @param context
     * @param directory
     * @param classe
     * @param object
     * @return
     * @throws Exception
     */
    public static Vector read_BEXI_Objects(final BEXI_ApplicationPath context, String directory, String classe, final String object) throws Exception {

        final Vector BEXIObjects = new Vector();
        final Document document;
        int count = 0;

        try {
            //Load and parse the XML document
            final DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            final DocumentBuilder docbuilder = factory.newDocumentBuilder();
            if (context != null && directory == null) {
                final String xmlFilePath = context.getDefaultXMLFilePath();
                document = docbuilder.parse(new File(xmlFilePath + System.getProperty("file.separator") + classe + ".xml"));
            } else if (context == null && directory != null) {
                document = docbuilder.parse(new File(directory + System.getProperty("file.separator") + classe + ".xml"));
            } else {
                document = docbuilder.parse(new File(classe + ".xml"));
            }
            // Look for class object attribut and values
            final NodeList objectXMLList = document.getElementsByTagName("attribute");
            for (int i = 0; i < objectXMLList.getLength(); i++) {

                final Node objectList = objectXMLList.item(i);
                final NodeList objectTmp = objectList.getChildNodes();

                // Look for each class object attribut (name and value)
                String objectName = null;
                final String[] attributs = new String[objectTmp.getLength()];
                final String[] values = new String[objectTmp.getLength()];
                for (int j = 0; j < objectTmp.getLength(); j++) {
                    final Node attributTmp = objectTmp.item(j);

                    //Set up object attribut name
                    attributs[j] = attributTmp.getNodeName();

                    //Set up object attribut value
                    final Node node = attributTmp.getFirstChild();
                    if (node != null) {
                        values[j] = node.getNodeValue();
                        // If Attribut name equal "NAME", we got the object name
                        if (attributs[j].equals("name")) {
                            objectName = values[j];
                        }
                    } else {
                        values[j] = "null";
                    }
                }
                // Look for a specific  object
                if (object != null && objectName != null) {
                    if (objectName.equals(object)) {
                        final BEXI_Object BEXIObject = new BEXI_Object(null, classe, objectName, attributs, values, null, null, false);
                        BEXIObject.set_lineSource("XML database");
                        BEXIObjects.add(count, BEXIObject);
                        count = count + 1;
                    }
                } else {
                    final BEXI_Object BEXIObject = new BEXI_Object(null, classe, objectName, attributs, values, null, null, false);
                    BEXIObject.set_lineSource("XML database");
                    BEXIObjects.add(count, BEXIObject);
                    count = count + 1;
                }
            }

        } catch (Exception e) {
            throw e;
        }
        return BEXIObjects;
    }

    /**
     * Build a xml file from BEXI_object vector.
     * <li> save in the XML file according the following format:
     * <li> <openbexiCreative>
     * <li>     <classe name="classname">
     * <li>         <object name="objectname">
     * <li>             <attribute1 name="attribute1name"> attribute1name="value">
     * <li>             <attribute2 name="attribute2name"> attribute2name="value">
     * <li>             <attribute3 name="attribute3name"> attribute3name="value">
     * <li>         </object>
     * <li>     </classe>
     * <li> <openbexiCreative>
     *
     * @param context
     * @param directory
     * @param classe
     * @param BEXI_objects
     */
    public static void save_BEXI_Objects(final BEXI_ApplicationPath context, final String directory, final String classe, final Vector BEXI_objects) {

        if (BEXI_objects == null) {
            System.err.println("save_BEXI_Objects:OPENBEXI objects list is null");
            return;
        }

        DOMParser parser = new DOMParser();
        final BEXI_XMLDriver xml = new BEXI_XMLDriver();
        Document docOut = parser.getDocument();

        try {

            //Boucle sur le ResultSet et renvoie génériquement les données
            for (int j = 0; j < BEXI_objects.size(); j++) {
                BEXI_Object object = (BEXI_Object) BEXI_objects.get(j);

                String attributs[] = object.get_attributs();
                String values[] = object.get_values();

                //Pour chaque ligne, boucle sur chaque colonne
                //for (int i = 0; i < values.length; i++) {
                docOut = xml.set_class_object_attribute_value(docOut, classe, object.get_objectName(), attributs[1], values[1]);
                //}
            }

            //Sérialisation JAXP
            final TransformerFactory xformFactory = TransformerFactory.newInstance();
            final Transformer idTransform = xformFactory.newTransformer();
            final Source input = new DOMSource(docOut);
            Result output = null;
            if (context != null && directory == null) {
                String xmlFilePath = context.getDefaultXMLFilePath();
                output = new StreamResult(new File(xmlFilePath + System.getProperty("file.separator") + classe + ".xml"));
            } else if (context == null && directory != null) {
                output = new StreamResult(new File(directory + System.getProperty("file.separator") + classe + ".xml"));
            } else {
                output = new StreamResult(new File(classe + ".xml"));
            }
            idTransform.transform(input, output);

        } catch (Exception e) {
            System.out.println("save_BEXI_Objects Error: " + e.getMessage());
        } finally {

        }
    }

    /**
     * Read class object attribute value from XML file.
     *
     * @param document
     * @param classeName
     * @param objectName
     * @param attributeName
     * @return
     * @throws Exception
     */
    public String get_class_object_attribute_value(Document document, String classeName, final String objectName, final String attributeName) throws Exception {
        String value = null;
        try {
            if (document == null) return null;
            Element classe = null;
            NodeList classes = document.getElementsByTagName("classe");
            // Look for classe
            if (classes == null || classes.getLength() == 0) {
                return null;
            } else {
                for (int i = 0; i < classes.getLength(); i++) {
                    classe = (Element) classes.item(i);
                    if (classe.getAttribute("name").equals(classeName)) {
                        break;
                    }
                }
            }
            // Look for object
            Element object = null;
            boolean objectFound = false;
            NodeList objects = classe.getElementsByTagName("object");
            if (objects.getLength() == 0) {
                return null;
            } else {
                for (int i = 0; i < objects.getLength(); i++) {
                    object = (Element) objects.item(i);
                    if (object.getAttribute("name").equals(objectName)) {
                        objectFound = true;
                        break;
                    }
                }
                if (!objectFound) {
                    return null;
                }
            }
            // Look for attribute
            Element attribute;
            NodeList attributes = object.getElementsByTagName("attribute");
            if (attributes.getLength() == 0) {
                return null;
            } else {
                for (int i = 0; i < attributes.getLength(); i++) {
                    attribute = (Element) attributes.item(i);
                    if (attribute.getAttribute("name").equals(attributeName) || attributeName.equals("name")) {
                        return attribute.getAttribute(attributeName);
                    }
                }
            }
        } catch (Exception e) {
            System.out.println("get_class_object_attribute_value:Problem to get classe object attribute value : " + e.getMessage());
        }
        return value;
    }

    /**
     * Read classes name from Document.
     *
     * @param document
     * @return
     * @throws Exception
     */
    public String[] get_xml_classesName(Document document) throws Exception {
        String[] classes = null;
        try {
            if (document == null) return null;
            Element classe = null;
            NodeList classes_node = document.getElementsByTagName("classe");
            classes = new String[classes_node.getLength()];
            // Look for classe
            if (classes_node.getLength() == 0) {
                return null;
            } else {
                for (int i = 0; i < classes_node.getLength(); i++) {
                    classe = (Element) classes_node.item(i);
                    classes[i] = classe.getAttribute("name");
                }
            }
        } catch (Exception e) {
            System.out.println("get_xml_classesName:Problem to get classes : " + e.getMessage());
        }
        return classes;
    }

    /**
     * Read class objects name from Document.
     *
     * @param document
     * @param classeName
     * @return
     * @throws Exception
     */
    public String[] get_xml_classe_objectsName(Document document, String classeName) throws Exception {
        String[] objects = null;
        try {
            if (document == null) return null;
            Element classe = null;
            NodeList classes = document.getElementsByTagName("classe");
            // Look for classe
            if (classes == null || classes.getLength() == 0) {
                return null;
            } else {
                for (int i = 0; i < classes.getLength(); i++) {
                    classe = (Element) classes.item(i);
                    if (classe.getAttribute("name").equals(classeName)) {
                        break;
                    }
                }
            }
            if (classe == null) return null;

            // Look for object
            Element object;
            NodeList objects_node = classe.getElementsByTagName("object");
            objects = new String[objects_node.getLength()];
            if (objects_node.getLength() == 0) {
                return null;
            } else {
                for (int i = 0; i < objects_node.getLength(); i++) {
                    object = (Element) objects_node.item(i);
                    objects[i] = object.getAttribute("name");
                }
            }
        } catch (Exception e) {
            System.out.println("get_xml_classe_objectsName:Problem to get classe object attribute value : " + e.getMessage());
        }
        return objects;
    }

    /**
     * @param document
     * @param classeName
     * @param objectName
     * @return
     * @throws Exception
     */
    public String[] get_xml_classe_object_attributesName(Document document, String classeName, String objectName) throws Exception {
        String[] attributes = null;
        try {
            if (document == null) return null;
            Element classe = null;
            NodeList classes = document.getElementsByTagName("classe");
            // Look for classe
            if (classes == null || classes.getLength() == 0) {
                return null;
            } else {
                for (int i = 0; i < classes.getLength(); i++) {
                    classe = (Element) classes.item(i);
                    if (classe.getAttribute("name").equals(classeName)) {
                        break;
                    }
                }
            }
            if (classe == null) return null;
            // Look for object
            Element object = null;
            boolean objectFound = false;
            NodeList objects = classe.getElementsByTagName("object");
            if (objects.getLength() == 0) {
                return null;
            } else {
                for (int i = 0; i < objects.getLength(); i++) {
                    object = (Element) objects.item(i);
                    if (object.getAttribute("name").equals(objectName)) {
                        objectFound = true;
                        break;
                    }
                }
                if (!objectFound) {
                    return null;
                }
            }
            if (object == null) return null;
            // Look for attribute
            Element attribute;
            NodeList attributes_node = object.getElementsByTagName("attribute");
            attributes = new String[attributes_node.getLength()];
            if (attributes_node.getLength() == 0) {
                return null;
            } else {
                for (int i = 0; i < attributes_node.getLength(); i++) {
                    attribute = (Element) attributes_node.item(i);
                    if (attribute != null)
                        attributes[i] = attribute.getAttribute("name");
                }
            }
        } catch (Exception e) {
            System.out.println("get_xml_classe_objectsName:Problem to get classe object attribute value : " + e.getMessage());
        }
        return attributes;
    }

    /**
     * @param document
     * @param classeName
     * @return
     * @throws Exception
     */
    public Document delete_xml_classe(Document document, String classeName) throws Exception {
        String[] attributes = null;
        boolean classeFound = false;
        try {
            if (document == null) return document;
            Element classe = null;
            NodeList classes = document.getElementsByTagName("classe");
            // Look for classe
            if (classes == null || classes.getLength() == 0) {
                return document;
            } else {
                for (int i = 0; i < classes.getLength(); i++) {
                    classe = (Element) classes.item(i);
                    if (classe.getAttribute("name").equals(classeName)) {
                        classe.getParentNode().removeChild(classe);
                        break;
                    }
                }
            }
        } catch (Exception e) {
            System.out.println("delete_xml_classe_objectsName:Problem to delete classe object attribute value : " + e.getMessage());
        }
        return document;
    }

    /**
     * @param document
     * @param classeName
     * @param objectName
     * @param attributeName
     * @return
     * @throws Exception
     */
    public Document delete_xml_classe_object_containing_attribute(Document document, String classeName, String objectName, String attributeName) throws Exception {
        String[] attributes = null;
        try {
            if (document == null) return document;
            Element classe = null;
            NodeList classes = document.getElementsByTagName("classe");
            // Look for classe
            if (classes == null || classes.getLength() == 0) {
                return document;
            } else {
                for (int i = 0; i < classes.getLength(); i++) {
                    classe = (Element) classes.item(i);
                    if (classe.getAttribute("name").equals(classeName)) {
                        break;
                    }
                }
            }
            if (classe == null) return document;

            // Look for object
            Element object = null;
            boolean objectFound = false;
            NodeList objects = classe.getElementsByTagName("object");
            if (objects.getLength() == 0) {
                return document;
            } else {
                for (int i = 0; i < objects.getLength(); i++) {
                    object = (Element) objects.item(i);
                    if (object.getAttribute("name").equals(objectName)) {
                        objectFound = true;
                        break;
                    }
                }
                if (!objectFound) {
                    return document;
                }
            }
            if (object == null) return document;

            // Look for attribute
            Element attribute;
            boolean attributeFound = false;
            NodeList attributes_node = object.getElementsByTagName("attribute");
            if (attributes_node.getLength() == 0) {
                return document;
            } else {
                for (int i = 0; i < attributes_node.getLength(); i++) {
                    attribute = (Element) attributes_node.item(i);
                    if (attribute.getAttribute("name").contains(attributeName)) {
                        attributeFound = true;
                        attribute.getParentNode().removeChild(attribute);
                        break;
                    }
                }
                if (!attributeFound) {
                    return document;
                }
            }

        } catch (Exception e) {
            System.out.println("delete_xml_classe_objectsName:Problem to delete classe object attribute value : " + e.getMessage());
        }
        return document;
    }

    /**
     * @param document
     * @param classeName
     * @param objectName
     * @return
     * @throws Exception
     */
    public Document delete_xml_classe_containing_object(Document document, String classeName, String objectName) throws Exception {
        String[] attributes = null;
        try {
            if (document == null) return document;
            Element classe = null;
            NodeList classes = document.getElementsByTagName("classe");
            // Look for classe
            if (classes == null || classes.getLength() == 0) {
                return document;
            } else {
                for (int i = 0; i < classes.getLength(); i++) {
                    classe = (Element) classes.item(i);
                    if (classe.getAttribute("name").equals(classeName)) {
                        break;
                    }
                }
            }
            if (classe == null) return document;
            // Look for object
            Element object = null;
            boolean objectFound = false;
            NodeList objects = classe.getElementsByTagName("object");
            if (objects.getLength() == 0) {
                return document;
            } else {
                for (int i = 0; i < objects.getLength(); i++) {
                    object = (Element) objects.item(i);
                    if (object.getAttribute("name").contains(objectName)) {
                        objectFound = true;
                        object.getParentNode().removeChild(object);
                        break;
                    }
                }
                if (!objectFound) {
                    return document;
                }
            }
            if (object == null) return document;

        } catch (Exception e) {
            System.out.println("delete_xml_classe_objectsName:Problem to delete classe object attribute value : " + e.getMessage());
        }
        return document;
    }

    /**
     * @param document
     * @param classeName
     * @param objectName
     * @return
     * @throws Exception
     */
    public Document delete_xml_classe_object(Document document, String classeName, String objectName) throws Exception {
        String[] attributes = null;
        try {
            if (document == null) return document;
            Element classe = null;
            NodeList classes = document.getElementsByTagName("classe");
            // Look for classe
            if (classes == null || classes.getLength() == 0) {
                return document;
            } else {
                for (int i = 0; i < classes.getLength(); i++) {
                    classe = (Element) classes.item(i);
                    if (classe.getAttribute("name").equals(classeName)) {
                        break;
                    }
                }
            }
            if (classe == null) return document;
            // Look for object
            Element object = null;
            boolean objectFound = false;
            NodeList objects = classe.getElementsByTagName("object");
            if (objects.getLength() == 0) {
                return document;
            } else {
                for (int i = 0; i < objects.getLength(); i++) {
                    object = (Element) objects.item(i);
                    if (object.getAttribute("name").equals(objectName)) {
                        objectFound = true;
                        object.getParentNode().removeChild(object);
                        break;
                    }
                }
                if (!objectFound) {
                    return document;
                }
            }
            if (object == null) return document;

        } catch (Exception e) {
            System.out.println("delete_xml_classe_objectsName:Problem to delete classe object attribute value : " + e.getMessage());
        }
        return document;
    }

    /**
     * Read class object attribute value from Document.
     *
     * @param document
     * @param classeName
     * @param objectName
     * @param attributeName
     * @param value
     * @return
     * @throws Exception
     */
    public Document set_class_object_attribute_value(Document document, String classeName, final String objectName, final String attributeName, final String value) throws Exception {
        Element root = null;
        Element classe = null;
        Element object = null;
        Element attribute = null;
        try {
            //Crée le document builder
            if (document == null) {
                final DocumentBuilderFactory dbfactory = DocumentBuilderFactory.newInstance();
                final DocumentBuilder docbuilder = dbfactory.newDocumentBuilder();
                document = docbuilder.newDocument();
                root = document.createElement("openbexiCreative");
                document.appendChild(root);
            }
            if (root == null) {
                NodeList roots = document.getElementsByTagName("openbexiCreative");
                if (roots.getLength() == 0) {
                    root = document.createElement("openbexiCreative");
                    document.appendChild(root);
                }
                root = (Element) roots.item(0);
            }
        } catch (Exception e) {
            System.out.println("set_class_object_attribute_value:Problem creating document: " + e.getMessage());
        }
        try {
            boolean classeFound = false;
            NodeList classes = root.getElementsByTagName("classe");
            // Create or update classe
            if (classes.getLength() == 0) {
                classe = document.createElement("classe");
                classe.setAttribute("name", classeName);
            } else {
                for (int i = 0; i < classes.getLength(); i++) {
                    classe = (Element) classes.item(i);
                    if (classe.getAttribute("name").equals(classeName)) {
                        classeFound = true;
                        break;
                    }
                }
                if (!classeFound) {
                    classe = document.createElement("classe");
                    classe.setAttribute("name", classeName);
                }
            }
        } catch (Exception e) {
            System.out.println("set_class_object_attribute_value:Problem creating or updating classe : " + e.getMessage());
        }

        // Create or update object
        try {
            boolean objectFound = false;
            NodeList objects = classe.getElementsByTagName("object");
            if (objects.getLength() == 0) {
                object = document.createElement("object");
                object.setAttribute("name", objectName);
            } else {
                for (int i = 0; i < objects.getLength(); i++) {
                    object = (Element) objects.item(i);
                    if (object.getAttribute("name").equals(objectName)) {
                        objectFound = true;
                        break;
                    }
                }
                if (!objectFound) {
                    object = document.createElement("object");
                    object.setAttribute("name", objectName);
                }
            }
        } catch (Exception e) {
            System.out.println("set_class_object_attribute_value:Problem creating or updating classe object : " + e.getMessage());
        }
        try {
            // Create or update attribute
            boolean attributeFound = false;
            NodeList attributes = object.getElementsByTagName("attribute");
            if (attributes.getLength() == 0) {
                attribute = document.createElement("attribute");
                attribute.setAttribute("name", attributeName);
                attribute.setAttribute(attributeName, value);
            } else {
                for (int i = 0; i < attributes.getLength(); i++) {
                    attribute = (Element) attributes.item(i);
                    if (attribute.getAttribute("name").equals(attributeName) || attributeName.equals("name")) {
                        attributeFound = true;
                        attribute.setAttribute(attributeName, value);
                    }
                }
                if (!attributeFound) {
                    attribute = document.createElement("attribute");
                    attribute.setAttribute("name", attributeName);
                    attribute.setAttribute(attributeName, value);
                }
            }

        } catch (Exception e) {
            System.err.println("set_class_object_attribute_value:Problem creating or updating classe object attribut : " + e.getMessage());
        }
        object.appendChild(attribute);
        classe.appendChild(object);
        root.appendChild(classe);
        return document;
    }

    public String XMLSerializer(Document doc) {
        StringWriter stringOut = null;
        try {
            //Serialize DOM
            OutputFormat format = new OutputFormat(doc);
            format.setOmitXMLDeclaration(true);
            stringOut = new StringWriter();
            XMLSerializer serial = new XMLSerializer(stringOut, format);
            serial.serialize(doc);
        } catch (IOException ie) {
            ie.printStackTrace();
        }
        return stringOut.toString();
    }

    public void XMLprint(Document doc1) {
        StringWriter stringOut = null;
        try {
            //Serialize DOM
            OutputFormat format = new OutputFormat(doc1);
            format.setOmitXMLDeclaration(true);
            format.setIndent(1);
            stringOut = new StringWriter();
            XMLSerializer serial = new XMLSerializer(stringOut, format);
            serial.serialize(doc1);
        } catch (IOException ie) {
            ie.printStackTrace();
        }
        System.out.println(stringOut.toString());
    }

    public Document XMLmerge(Document doc1, Document doc2, String filter) {
        BEXI_XMLDriver xml = new BEXI_XMLDriver();
        Document new_doc = doc1;

        try {
            if (doc1 == null) return doc2;
            if (doc2 == null) return doc1;

            Element classe = null;
            NodeList classes = doc1.getElementsByTagName("classe");
            // Look for classe
            if (classes == null || classes.getLength() == 0)
                return doc2;
            classes = doc2.getElementsByTagName("classe");
            // Look for classe
            if (classes == null || classes.getLength() == 0)
                return doc1;

            String[] classe_doc1 = xml.get_xml_classesName(doc1);
            String[] classe_doc2 = xml.get_xml_classesName(doc2);
            for (int i = 0; i < classe_doc2.length; i++) {
                String[] classe_obj_doc2 = xml.get_xml_classe_objectsName(doc2, classe_doc2[i]);
                if (classe_obj_doc2 != null) {
                    //if (xml.get_xml_classe_objectsName(doc1, classe_doc2[i]) == null)
                    //System.out.println(i + " ----- Adding new class  to page ----- : " + classe_doc2[i]);
                    for (int k = 0; k < classe_obj_doc2.length; k++) {
                        String[] classe_obj_att_doc2 = xml.get_xml_classe_object_attributesName(doc2, classe_doc2[i], classe_obj_doc2[k]);
                        if (classe_obj_att_doc2 != null) {
                            if (xml.get_xml_classe_object_attributesName(doc1, classe_doc2[i], classe_obj_doc2[k]) == null)
                                //System.out.println(k + " ----- Adding new object  to page ----- : " + classe_doc2[i] + ":" + classe_obj_doc2[k]);
                                for (int l = 0; l < classe_obj_att_doc2.length; l++) {
                                    String classe_obj_att_value_doc2 = xml.get_class_object_attribute_value(doc2, classe_doc2[i], classe_obj_doc2[k], classe_obj_att_doc2[l]);
                                    if (get_class_object_attribute_value(doc1, classe_doc2[i], classe_obj_doc2[k], classe_obj_att_doc2[l]) == null) {
                                        //System.out.println(l + " Adding to page: " + classe_doc2[i] + " - " + classe_obj_doc2[k] + " - " + classe_obj_att_doc2[l] + " - value=" + classe_obj_att_value_doc2);
                                        new_doc = set_class_object_attribute_value(new_doc, classe_doc2[i], classe_obj_doc2[k], classe_obj_att_doc2[l], classe_obj_att_value_doc2);
                                    } else if (!get_class_object_attribute_value(doc1, classe_doc2[i], classe_obj_doc2[k], classe_obj_att_doc2[l]).equals(get_class_object_attribute_value(doc2, classe_doc2[i], classe_obj_doc2[k], classe_obj_att_doc2[l]))) {
                                        if (classe_obj_att_doc2[l].matches(filter)) {
                                            System.out.println(l + " Did not update " + classe_obj_att_doc2[l] + " for " + classe_obj_doc2[k] + " value=" + classe_obj_att_value_doc2 + " (Keeping page value=" + get_class_object_attribute_value(doc1, classe_doc2[i], classe_obj_doc2[k], classe_obj_att_doc2[l]) + ")");
                                        } else if (classe_obj_att_doc2[l].equals("count")) {
                                            if (!classe_doc2[i].equals("chartflow")) {
                                                //System.out.println(l + " Updating count: " + classe_doc2[i] + " - " + classe_obj_doc2[k] + " - value=" + classe_obj_att_doc2.length + " (old value=" + get_class_object_attribute_value(doc1, classe_doc2[i], classe_obj_doc2[k], classe_obj_att_doc2[l]) + ")");
                                                new_doc = set_class_object_attribute_value(new_doc, classe_doc2[i], classe_obj_doc2[k], classe_obj_att_doc2[l], Integer.toString(classe_obj_att_doc2.length));
                                            }
                                        } else {
                                            //System.out.println(l + " Updating page: " + classe_doc2[i] + " - " + classe_obj_doc2[k] + " - new value coming from template=" + classe_obj_att_value_doc2 + " (old value=" + get_class_object_attribute_value(doc1, classe_doc2[i], classe_obj_doc2[k], classe_obj_att_doc2[l]) + ")");
                                            new_doc = set_class_object_attribute_value(new_doc, classe_doc2[i], classe_obj_doc2[k], classe_obj_att_doc2[l], classe_obj_att_value_doc2);
                                        }
                                    } else {
                                        new_doc = set_class_object_attribute_value(new_doc, classe_doc2[i], classe_obj_doc2[k], classe_obj_att_doc2[l], classe_obj_att_value_doc2);
                                        //if (classe_obj_att_doc2[l].matches(filter))
                                        //System.out.println(l + " Keeping " + classe_obj_att_doc2[l] + " for " + classe_obj_doc2[k] + " value=" + classe_obj_att_value_doc2 + " (Keeping page value=" + get_class_object_attribute_value(doc1, classe_doc2[i], classe_obj_doc2[k], classe_obj_att_doc2[l]) + ")");

                                    }

                                }
                        }
                    }
                }

            }
        } catch (Exception ie) {
            ie.printStackTrace();
        }
        //this.XMLprint(doc1);
        //this.XMLprint(doc2);
        //this.XMLprint(new_doc);
        return new_doc;
    }

    public static void main(String args[]) throws Exception {
        int countFile = 0;
        int test = 0;
        if (test == 0) {
            String homePath = System.getProperty("user.dir");
            Document document = BEXI_XMLDriver.openbexi_loadXMLFile(homePath + System.getProperty("file.separator") + "Tomcat 5.0" + System.getProperty("file.separator") + "webapps" + System.getProperty("file.separator") + "OPENBEXI_Creative" + System.getProperty("file.separator") + "js/javascripts_bexicontext.xml");
            final BEXI_XMLDriver xml = new BEXI_XMLDriver();
            while (true) {
                String icon = xml.get_class_object_attribute_value(document, "ob_explorer", "file_" + countFile, "icon");
                if (icon == null) break;
                System.out.println("icon=" + icon + "\n");
                String specification = xml.get_class_object_attribute_value(document, "ob_explorer", "file_" + countFile, "specification_en");
                System.out.println("specification=" + specification + "\n");
                String parameterCount = xml.get_class_object_attribute_value(document, "ob_explorer", "file_" + countFile, "parameterCount");
                System.out.println("parameterCount=" + parameterCount + "\n");
                String trigger = xml.get_class_object_attribute_value(document, "ob_explorer", "file_" + countFile, "event");
                System.out.println("trigger=" + trigger + "\n");
                for (int p = 0; p < Integer.valueOf(parameterCount); p++) {
                    String parameterName = xml.get_class_object_attribute_value(document, "ob_explorer", "file_" + countFile, "parameterName_" + p);
                    System.out.println("    parameterName=" + parameterName + "\n");
                    String parameterSpecification = xml.get_class_object_attribute_value(document, "ob_explorer", "file_" + countFile, "parameterSpecification_" + p + "_en");
                    System.out.println("    parameterSpecification=" + parameterSpecification + "\n");
                    String parameterType = xml.get_class_object_attribute_value(document, "ob_explorer", "file_" + countFile, "parameterType_" + p);
                    System.out.println("    parameterType=" + parameterType + "\n");
                }
                countFile++;
            }
            System.out.println("Object count =" + (countFile - 1) + "\n");
        }
        if (test == 1) {
            final BEXI_XMLDriver xml = new BEXI_XMLDriver();
            Document doc = null;
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_default", "path", "home", "webapps\\OPENBEXI_Creative\\");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_default", "path", "class", "webapps\\OPENBEXI_Creative\\");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_default", "path", "metarules", "webapps\\OPENBEXI_Creative\\data\\metaRules\\");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_default", "path", "xml", "webapps\\OPENBEXI_Creative\\data\\XML\\");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_default", "path", "pictures", "webapps\\OPENBEXI_Creative\\data\\pictures\\");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_default", "path", "icons", "webapps\\OPENBEXI_Creative\\data\\icons\\");

            doc = xml.set_class_object_attribute_value(doc, "bexicontext_default", "browser", "name", "");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_default", "os", "name", "");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_default", "language", "name", BEXI_DataContext.ENGLISH);

            doc = xml.set_class_object_attribute_value(doc, "bexicontext_default", "connection", "url", "http://localhost:8282");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_default", "connection", "port", "82");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_default", "connection", "asynchron", "true");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_default", "connection", "synchron", "false");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_default", "connection", "POST", "true");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_default", "connection", "GET", "false");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_default", "connection", "user", "root");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_default", "connection", "passwd", "");

            doc = xml.set_class_object_attribute_value(doc, "bexicontext_default", "database_0", "driver", "com.mysql.jdbc.Driver");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_default", "database_0", "url", "jdbc:mysql:///bexi_admin");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_default", "database_0", "user", "root");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_default", "database_0", "passwd", "");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_default", "database_0", "type", "sql");

            doc = xml.set_class_object_attribute_value(doc, "bexicontext_default", "database_1", "driver", "com.mysql.jdbc.Driver");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_default", "database_1", "url", "jdbc:mysql:///bexi_fr");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_default", "database_1", "user", "root");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_default", "database_1", "passwd", "");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_default", "database_1", "type", "sql");

            doc = xml.set_class_object_attribute_value(doc, "bexicontext_default", "database_2", "driver", "com.mysql.jdbc.Driver");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_default", "database_2", "url", "jdbc:mysql:///bexi_en");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_default", "database_2", "user", "root");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_default", "database_2", "passwd", "");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_default", "database_2", "type", "sql");
            // mysql bexi context
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_mysql", "path", "home", "webapps\\OPENBEXI_Creative\\");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_mysql", "path", "class", "webapps\\OPENBEXI_Creative\\");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_mysql", "path", "metarules", "webapps\\OPENBEXI_Creative\\data\\metaRules\\");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_mysql", "path", "xml", "webapps\\OPENBEXI_Creative\\data\\XML\\");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_mysql", "path", "pictures", "webapps\\OPENBEXI_Creative\\data\\pictures\\");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_mysql", "path", "icons", "webapps\\OPENBEXI_Creative\\data\\icons\\");

            doc = xml.set_class_object_attribute_value(doc, "bexicontext_mysql", "browser", "name", "");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_mysql", "os", "name", "");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_mysql", "language", "name", BEXI_DataContext.ENGLISH);

            doc = xml.set_class_object_attribute_value(doc, "bexicontext_mysql", "connection", "url", "http://localhost:8282");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_mysql", "connection", "port", "82");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_mysql", "connection", "asynchron", "true");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_mysql", "connection", "synchron", "false");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_mysql", "connection", "POST", "true");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_mysql", "connection", "GET", "false");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_mysql", "connection", "user", "root");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_mysql", "connection", "passwd", "");

            doc = xml.set_class_object_attribute_value(doc, "bexicontext_mysql", "database", "driver", "com.mysql.jdbc.Driver");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_mysql", "database", "url", "jdbc:mysql:///bexi");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_mysql", "database", "user", "root");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_mysql", "database", "passwd", "");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_mysql", "database", "type", "sql");

            // hsqldb_inMemory bexi context
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_hsqldb_inMemory", "path", "home", "webapps\\OPENBEXI_Creative\\");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_hsqldb_inMemory", "path", "class", "webapps\\OPENBEXI_Creative\\");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_hsqldb_inMemory", "path", "metarules", "webapps\\OPENBEXI_Creative\\data\\metaRules\\");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_hsqldb_inMemory", "path", "xml", "webapps\\OPENBEXI_Creative\\data\\XML\\");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_hsqldb_inMemory", "path", "pictures", "webapps\\OPENBEXI_Creative\\data\\pictures\\");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_hsqldb_inMemory", "path", "icons", "webapps\\OPENBEXI_Creative\\data\\icons\\");

            doc = xml.set_class_object_attribute_value(doc, "bexicontext_hsqldb_inMemory", "browser", "name", "");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_hsqldb_inMemory", "os", "name", "");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_hsqldb_inMemory", "language", "name", BEXI_DataContext.ENGLISH);

            doc = xml.set_class_object_attribute_value(doc, "bexicontext_hsqldb_inMemory", "connection", "url", "http://localhost:8282");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_hsqldb_inMemory", "connection", "port", "82");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_hsqldb_inMemory", "connection", "asynchron", "true");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_hsqldb_inMemory", "connection", "synchron", "false");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_hsqldb_inMemory", "connection", "POST", "true");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_hsqldb_inMemory", "connection", "GET", "false");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_hsqldb_inMemory", "connection", "user", "root");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_hsqldb_inMemory", "connection", "passwd", "");

            doc = xml.set_class_object_attribute_value(doc, "bexicontext_hsqldb_inMemory", "database", "driver", "hsqldb In-memory");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_hsqldb_inMemory", "database", "url", "jdbc:hsqldb:.");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_hsqldb_inMemory", "database", "user", "sa");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_hsqldb_inMemory", "database", "passwd", "");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_hsqldb_inMemory", "database", "type", "sql");

            // hsqldb_standalone bexi context
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_hsqldb_standalone", "path", "home", "webapps\\OPENBEXI_Creative\\");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_hsqldb_standalone", "path", "class", "webapps\\OPENBEXI_Creative\\");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_hsqldb_standalone", "path", "metarules", "webapps\\OPENBEXI_Creative\\data\\metaRules\\");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_hsqldb_standalone", "path", "xml", "webapps\\OPENBEXI_Creative\\data\\XML\\");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_hsqldb_standalone", "path", "pictures", "webapps\\OPENBEXI_Creative\\data\\pictures\\");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_hsqldb_standalone", "path", "icons", "webapps\\OPENBEXI_Creative\\data\\icons\\");

            doc = xml.set_class_object_attribute_value(doc, "bexicontext_hsqldb_standalone", "browser", "name", "");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_hsqldb_standalone", "os", "name", "");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_hsqldb_standalone", "language", "name", BEXI_DataContext.ENGLISH);

            doc = xml.set_class_object_attribute_value(doc, "bexicontext_hsqldb_standalone", "connection", "url", "http://localhost:8282");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_hsqldb_standalone", "connection", "port", "82");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_hsqldb_standalone", "connection", "asynchron", "true");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_hsqldb_standalone", "connection", "synchron", "false");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_hsqldb_standalone", "connection", "POST", "true");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_hsqldb_standalone", "connection", "GET", "false");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_hsqldb_standalone", "connection", "user", "root");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_hsqldb_standalone", "connection", "passwd", "");

            doc = xml.set_class_object_attribute_value(doc, "bexicontext_hsqldb_standalone", "database", "driver", "org.hsqldb.jdbcDriver");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_hsqldb_standalone", "database", "url", "hsqldb:bexi");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_hsqldb_standalone", "database", "user", "sa");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_hsqldb_standalone", "database", "passwd", "");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_hsqldb_standalone", "database", "type", "sql");

            // hsqldb_server bexi context
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_hsqldb_server", "path", "home", "webapps\\OPENBEXI_Creative\\");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_hsqldb_server", "path", "class", "webapps\\OPENBEXI_Creative\\");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_hsqldb_server", "path", "metarules", "webapps\\OPENBEXI_Creative\\data\\metaRules\\");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_hsqldb_server", "path", "xml", "webapps\\OPENBEXI_Creative\\data\\XML\\");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_hsqldb_server", "path", "pictures", "webapps\\OPENBEXI_Creative\\data\\pictures\\");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_hsqldb_server", "path", "icons", "webapps\\OPENBEXI_Creative\\data\\icons\\");

            doc = xml.set_class_object_attribute_value(doc, "bexicontext_hsqldb_server", "browser", "name", "");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_hsqldb_server", "os", "name", "");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_hsqldb_server", "language", "name", BEXI_DataContext.ENGLISH);

            doc = xml.set_class_object_attribute_value(doc, "bexicontext_hsqldb_server", "connection", "url", "http://localhost:8282");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_hsqldb_server", "connection", "port", "82");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_hsqldb_server", "connection", "asynchron", "true");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_hsqldb_server", "connection", "synchron", "false");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_hsqldb_server", "connection", "POST", "true");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_hsqldb_server", "connection", "GET", "false");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_hsqldb_server", "connection", "user", "root");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_hsqldb_server", "connection", "passwd", "");

            doc = xml.set_class_object_attribute_value(doc, "bexicontext_hsqldb_server", "database", "driver", "org.hsqldb.jdbcDriver");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_hsqldb_server", "database", "url", "hsqldb:http://localhost:8282");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_hsqldb_server", "database", "user", "sa");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_hsqldb_server", "database", "passwd", "");
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_hsqldb_server", "database", "type", "sql");

            String valueFound = xml.get_class_object_attribute_value(doc, "bexicontext_default", "language", "name");
            System.out.println("language=" + valueFound);
            String connection = xml.get_class_object_attribute_value(doc, "bexicontext_default", "connection", "user");
            System.out.println("user connection=" + connection);
            String path = xml.get_class_object_attribute_value(doc, "bexicontext_default", "path", "home");
            System.out.println("path=" + path);
            String fake = xml.get_class_object_attribute_value(doc, "bexicontext_default", "language", "fake");
            System.out.println("fake=" + fake);
            doc = xml.set_class_object_attribute_value(doc, "bexicontext_default", "language", "name", "anglais");
            valueFound = xml.get_class_object_attribute_value(doc, "bexicontext_default", "language", "name");
            System.out.println("new language for bexicontext_default=" + valueFound);
            valueFound = xml.get_class_object_attribute_value(doc, "bexicontext_hsqldb_server", "language", "name");
            System.out.println("language for bexicontext_hsqldb_server=" + valueFound);
            System.out.println("xmlString=" + xml.XMLSerializer(doc));
        }
    }
}
