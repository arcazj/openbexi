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

import org.w3c.dom.Document;

import java.lang.reflect.Method;
import java.net.URL;
import java.net.MalformedURLException;
import java.io.File;
import java.io.IOException;
import java.util.*;
import java.util.jar.JarFile;

import OPENBEXI.BEXI_XMLDriver;
import OPENBEXI.BEXI_ApplicationPath;

import javax.servlet.http.HttpServletResponse;

public class OPENBEXI_JAVA {
    private HttpServletResponse _response;
    private BEXI_ApplicationPath _applicationPath;

    public OPENBEXI_JAVA(HttpServletResponse response, BEXI_ApplicationPath applicationPath) {
        _response = response;
        _applicationPath = applicationPath;

    }

    private Object[] get_class_paths(ClassLoader classLoader)
            throws ClassNotFoundException {
        Map<String, Set<Class>> classTable = new HashMap();
        Object[] classPaths;
        try {
            // get a list of all classpaths
            classPaths = ((java.net.URLClassLoader) classLoader).getURLs();

        } catch (ClassCastException cce) {
            // or cast failed; tokenize the system classpath
            classPaths = System.getProperty("java.class.path", "").split(File.pathSeparator);
        }


        return classPaths;
    } // end method

    public Document findClasses(ClassLoader classLoader,
                                Object[] classPaths,
                                String packageFilter,
                                String jarFilter,
                                String classFilter,
                                String methodFilter)
            throws ClassNotFoundException {
        Document docOut = null;
        int count_class = 0;
        if (classLoader == null) classLoader = Thread.currentThread().getContextClassLoader();
        for (int h = 0; h < classPaths.length; h++) {
            Enumeration files = null;
            JarFile module = null;
            // for each classpath ...
            File classPath = new File((URL.class).isInstance(classPaths[h]) ?
                    ((URL) classPaths[h]).getFile() : classPaths[h].toString());
            classPath = new File(classPath.getAbsolutePath().replaceAll("%20", " "));
            if (classPath.isDirectory() && jarFilter == null)
            {   // is our classpath a directory and jar filters are not active?
                List<String> dirListing = new ArrayList();
                // get a recursive listing of this classpath
                recursivelyListDir(dirListing, classPath, new StringBuffer());
                // an enumeration wrapping our list of files
                files = Collections.enumeration(dirListing);
            } else if (classPath.getName().endsWith(".jar")) {    // is our classpath a jar?
                // skip any jars not list in the filter
                if (jarFilter != null && !jarFilter.contains(classPath.getName())) {
                    continue;
                }
                try {
                    // if our resource is a jar, instantiate a jarfile using the full path to resource
                    module = new JarFile(classPath);
                } catch (MalformedURLException mue) {
                    throw new ClassNotFoundException("Bad classpath. Error: " + mue.getMessage());
                } catch (IOException io) {
                    throw new ClassNotFoundException("jar file '" + classPath.getName() + "' could not be instantiate from file path. Error: " + io.getMessage() + "\nclassPath:" + classPath);
                }
                // get an enumeration of the files in this jar
                if (module != null)
                    files = module.entries();
            }
            // for each file path in our directory or jar
            while (files != null && files.hasMoreElements()) {
                // get each fileName
                String fileName = files.nextElement().toString();
                // we only want the class files
                if (fileName.endsWith(".class")) {
                    // convert our full filename to a fully qualified class name
                    String className = fileName.replaceAll("/", ".").substring(0, fileName.length() - 6);
                    // debug class list
                    //System.out.println(className);
                    // skip any classes in packages not explicitly requested in our package filter
                    //if (packageFilter != null && !packageFilter.contains(className.substring(0, className.lastIndexOf("."))))
                    //{
                    //continue;
                    //}
                    // get the class for our class name
                    Class theClass;
                    try {
                        theClass = Class.forName(className, false, classLoader);
                    } catch (IllegalAccessError e) {
                        System.out.println("Skipping class '" + className + "' for reason " + e.getMessage());
                        continue;
                    } catch (NoClassDefFoundError e) {
                        System.out.println("Skipping class '" + className + "' for reason " + e.getMessage());
                        continue;
                    } catch (Exception e) {
                        System.out.println("Skipping class '" + className + "' for reason " + e.getMessage());
                        continue;
                    }
                    // skip interfaces
                    if (theClass.isInterface()) {
                        continue;
                    }

                    // for each interface in this class, look for methods and parameters
                    try {
                        String classe = theClass.getName();
                        String packageName = theClass.getPackage().getName();
                        if (packageFilter == null) {
                            if (theClass != null && classFilter == null) {
                                docOut = get_method_and_parameters(docOut, theClass, methodFilter, count_class);
                                count_class++;
                            } else
                            if (theClass != null && classFilter != null && theClass.getName().contains(classFilter)) {
                                docOut = get_method_and_parameters(docOut, theClass, methodFilter, count_class);
                                count_class++;
                            }
                        } else {
                            if (theClass.getPackage().getName().contains(packageFilter))
                                if (theClass != null && classFilter == null) {
                                    docOut = get_method_and_parameters(docOut, theClass, methodFilter, count_class);
                                    count_class++;
                                } else
                                if (theClass != null && classFilter != null && theClass.getName().contains(classFilter))
                                {
                                    docOut = get_method_and_parameters(docOut, theClass, methodFilter, count_class);
                                    count_class++;
                                }
                        }

                    } catch (ExceptionInInitializerError e) {
                        System.err.println(e.getMessage());
                    } catch (UnsatisfiedLinkError e) {
                        System.err.println(e.getMessage());
                    } catch (Exception e) {
                        System.err.println(e.getMessage());
                    }
                }
            }

            // close the jar if it was used
            if (module != null) {
                try {
                    module.close();
                } catch (IOException ioe) {
                    throw new ClassNotFoundException("The module jar file '" + classPath.getName() +
                            "' could not be closed. Error: " + ioe.getMessage());
                }
            }
        } // end for loop

        return docOut;
    } // end method

    /**
     * Recursively lists a directory while generating relative paths. This is a helper functionInvoker for findClasses.
     * Note: Uses a StringBuffer to avoid the excessive overhead of multiple String concatentation
     *
     * @param dirListing   A list variable for storing the directory listing as a list of Strings
     * @param dir          A File for the directory to be listed
     * @param relativePath A StringBuffer used for building the relative paths
     */
    private static void recursivelyListDir(List<String> dirListing, File dir, StringBuffer relativePath) {
        int prevLen; // used to undo append operations to the StringBuffer
        // if the dir is really a directory
        if (dir.isDirectory()) {
            // get a list of the files in this directory
            File[] files = dir.listFiles();
            // for each file in the present dir
            for (int i = 0; i < files.length; i++) {
                // store our original relative path string length
                prevLen = relativePath.length();
                // call this functionInvoker recursively with file list from present
                // dir and relateveto appended with present dir
                recursivelyListDir(dirListing, files[i], relativePath.append(prevLen == 0 ? "" : "/").append(files[i].getName()));
                //  delete subdirectory previously appended to our relative path
                relativePath.delete(prevLen, relativePath.length());
            }
        } else {
            // this dir is a file; append it to the relativeto path and add it to the directory listing
            dirListing.add(relativePath.toString());
        }
    }

    public Document get_packages() {
        Document doc = null;
        Package pkgs[];
        pkgs = Package.getPackages();

        for (int i = 0; i < pkgs.length; i++) {
            System.out.println(
                    pkgs[i].getName() + " " +
                            pkgs[i].getImplementationTitle() + " " +
                            pkgs[i].getImplementationVendor() + " " +
                            pkgs[i].getImplementationVersion()
            );
        }
        return doc;
    }

    public Document get_method_and_parameters(Document docOut, Class className, String methodFilter, int count_class) {
        final BEXI_XMLDriver xmlResponse = new BEXI_XMLDriver();
        String classe = className.getName();
        String packageName = className.getPackage().getName();
        if (className == null || className.getName() == null || className.getName().equals("")) {
            return docOut;
        }
        try {
            if (classe.contains("VirtualFileSystem")) return null;
            //System.out.println("PACKAGE NAME: " + className.getPackage() + "   CLASS NAME: " + classe);
        } catch (Exception e) {
            System.out.println(e);
            return null;
        }
        try {
            // Check if the  package is already in the database
            boolean found_package = false;
            int p = 0;
            int index_package = 0;
            try {
                p = Integer.parseInt(xmlResponse.get_class_object_attribute_value(docOut, "ob_explorer", "java", "count_package"));
            } catch (NumberFormatException e) {
                p = 0;
                xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", "java", "count_package", "0");
                found_package = true;
                index_package = 0;
            }
            for (int i = 0; i < p; i++) {
                if (packageName.equals(xmlResponse.get_class_object_attribute_value(docOut, "ob_explorer", "java", "package_" + i)))
                {
                    found_package = true;
                    index_package = i;
                    break;
                }
            }
            if (!found_package) {
                index_package = p + 1;
                docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", "java", "count_package", Integer.toString(index_package));
            }

            boolean found_classe = false;
            int c = 0;
            int index_classe = 0;
            try {
                c = Integer.parseInt(xmlResponse.get_class_object_attribute_value(docOut, "ob_explorer", packageName, "count_class"));
            } catch (NumberFormatException e) {
                c = 0;
                xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", packageName, "count_class", "0");
                found_classe = true;
                index_classe = 0;
            }
            for (int i = 0; i < c; i++) {
                if (classe.equals(xmlResponse.get_class_object_attribute_value(docOut, packageName, "className_" + i, classe)))
                {
                    found_classe = true;
                    index_classe = i;
                    break;
                }
            }
            if (!found_classe) {
                index_classe = c + 1;
                xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", packageName, "count_class", Integer.toString(index_classe));
            }

            docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", "java", "package_" + index_package, packageName);
            docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", packageName, "count_class", Integer.toString(index_classe));
            docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", packageName, "className_" + index_classe, classe);
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }

        try {

            Method[] m = className.getMethods();
            int count_method = 0;
            for (int i = 0; i < m.length; i++) {
                if (methodFilter == null || methodFilter.equals("") || m[i].getName().contains(methodFilter)) {
                    //if (m[i].getDeclaredAnnotations().length > 0)
                    //System.out.print("          ANNOTATIONS: " + m[i].getDeclaredAnnotations()[0]);
                    //System.out.println("PACKAGE NAME: " + packageName + "   CLASS NAME: " + classe + "    METHOD: " + m[i].getName() + " (");
                    Class[] type = m[i].getParameterTypes();
                    docOut = xmlResponse.set_class_object_attribute_value(docOut, classe, "method_" + count_method, "signature", m[i].getName());
                    docOut = xmlResponse.set_class_object_attribute_value(docOut, classe, m[i].getName(), "count_type", Integer.toString(type.length));
                    for (int j = 0; j < type.length; j++) {
                        //System.out.print(type[j].getSimpleName() + ",");
                        docOut = xmlResponse.set_class_object_attribute_value(docOut, classe, m[i].getName(), "type_" + j, type[j].getSimpleName());
                    }
                    //System.out.print(")");
                    Class typeR = m[i].getReturnType();
                    //System.out.print("  Return:" + typeR.getSimpleName());
                    //System.out.print("   ---->" + typeR.getPackage() + "\n");
                    docOut = xmlResponse.set_class_object_attribute_value(docOut, classe, m[i].getName(), "return", typeR.getSimpleName());
                    count_method++;
                }
            }
            if (count_method > 0) count_method = count_method - 1;
            docOut = xmlResponse.set_class_object_attribute_value(docOut, classe, "method", "count", Integer.toString(count_method));
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }
        return docOut;
    }

    public Document functionInvoker(Document docOut, String className, String method, Object[] pars) {
        Document doc = null;
        try {
            final BEXI_XMLDriver xmlResponse = new BEXI_XMLDriver();
            Class c = Class.forName(className);
            Method func = c.getMethod(method, new Class[]{String.class});
            Object strR = func.invoke(c.newInstance(), pars);
            docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", "function", "return", (String) strR);
            //System.out.println(strR);
            try {
                if (_response != null) {
                    _response.setContentType("text/xml");
                    _response.setHeader("Cache-Control", "no-cache");
                    _response.getWriter().write(xmlResponse.XMLSerializer(docOut));
                }
            } catch (IOException e) {
                System.err.println(e.getMessage());
            }
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }
        return doc;
    }

    public void print(Document docOut) {
        final BEXI_XMLDriver xmlResponse = new BEXI_XMLDriver();
        try {
            int count_package = 0;
            int count_class = 0;
            try {
                count_package = Integer.parseInt(xmlResponse.get_class_object_attribute_value(docOut, "ob_explorer", "java", "count_package"));
            } catch (NumberFormatException e) {
                count_package = 0;
            }
            for (int p = 0; p <= count_package; p++) {
                String packageName = xmlResponse.get_class_object_attribute_value(docOut, "ob_explorer", "java", "package_" + p);
                try {
                    count_class = Integer.parseInt(xmlResponse.get_class_object_attribute_value(docOut, "ob_explorer", packageName, "count_class"));
                } catch (NumberFormatException e) {
                    count_class = 0;
                }
                if (packageName == null) return;
                System.out.println("Package class number=" + count_class);
                for (int c = 0; c <= count_class; c++) {
                    String className = xmlResponse.get_class_object_attribute_value(docOut, "ob_explorer", packageName, "className_" + c);
                    int method_count = Integer.parseInt((xmlResponse.get_class_object_attribute_value(docOut, className, "method", "count")));
                    for (int i = 0; i <= method_count; i++) {
                        System.out.print(packageName);
                        System.out.print("  ");
                        System.out.print(className);
                        System.out.print("  ");
                        String method = xmlResponse.get_class_object_attribute_value(docOut, className, "method_" + i, "signature");
                        String returnType = xmlResponse.get_class_object_attribute_value(docOut, className, method, "return");
                        System.out.print(returnType + " = ");
                        System.out.print(method);
                        System.out.print("(");
                        int count = 0;
                        try {
                            count = Integer.parseInt((xmlResponse.get_class_object_attribute_value(docOut, className, method, "count_type")));
                        } catch (Exception e) {
                            count = 0;
                        }
                        for (int j = 0; j < count; j++) {
                            if (j != count)
                                System.out.print(xmlResponse.get_class_object_attribute_value(docOut, className, method, "type_" + j) + ",");
                            System.out.print(xmlResponse.get_class_object_attribute_value(docOut, className, method, "type_" + j));
                        }
                        System.out.println(")");
                    }
                }
            }
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }
    }

    public static void main(final String[] args) {
        OPENBEXI_JAVA java = new OPENBEXI_JAVA(null, null);
        Object[] packagesPath = null;
        Document docOut = null;

        System.out.println("TESTING:functionInvoker invoker ........... ");
        Object[] pars = {"OK"};
        Document docF = java.functionInvoker(null, "OPENBEXI_Creative.OPENBEXI_package", "test1", pars);

        System.out.println("\n\nTESTING:get_method_and_parameters ........... ");
        Class theClass = null;
        try {
            theClass = Class.forName("OPENBEXI_Creative.OPENBEXI_package", false, Thread.currentThread().getContextClassLoader());
            docOut = java.get_method_and_parameters(docOut, theClass, "", 0);
            java.print(docOut);
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }

        System.out.println("\n\nTESTING:findClasses ........... ");
        Object[] packages = new Object[1];
        try {
            packagesPath = java.get_class_paths(Thread.currentThread().getContextClassLoader());
            packages[0] = packagesPath[11];
            docOut = java.findClasses(Thread.currentThread().getContextClassLoader(), packages, "OPENBEXI_Creative", null, "OPENBEXI_JAVA", null);
            java.print(docOut);
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }

        System.out.println("\n\nTESTING:findClasses ........... ");
        packages = new Object[1];
        try {
            packagesPath = java.get_class_paths(Thread.currentThread().getContextClassLoader());
            packages[0] = packagesPath[11];
            docOut = java.findClasses(Thread.currentThread().getContextClassLoader(), packages, null, null, "OPENBEXI_Creative_file", null);
            java.print(docOut);
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }


        System.out.println("\n\nTESTING:all findClasses ........... ");
        try {
            for (int i = 0; i < packagesPath.length; i++) {
                packages[0] = packagesPath[i];
                if (!packagesPath[i].toString().contains("junit")
                        && !packagesPath[i].toString().contains("/idea")
                        && !packagesPath[i].toString().contains("/xmlParserAPIs")
                        && !packagesPath[i].toString().contains("/j2ssh")
                        && !packagesPath[i].toString().contains("/hsqldb")
                        && !packagesPath[i].toString().contains("/edtftpj")
                        && !packagesPath[i].toString().contains("/jre/")
                        && !packagesPath[i].toString().contains("/phpsrvlt")
                        && !packagesPath[i].toString().contains("/common/lib")) {
                    System.out.println("\n\nTESTING:null, null, \"BEXI_BDD\", null ........... ");
                    docOut = java.findClasses(Thread.currentThread().getContextClassLoader(), packages, null, null, "BEXI_BDD", null);
                    java.print(docOut);

                    System.out.println("\n\nTESTING:\"OPENBEXI_Creative\", null, \"OPENBEXI_package\", \"test\" ........... ");
                    docOut = java.findClasses(Thread.currentThread().getContextClassLoader(), packages, "OPENBEXI_Creative", null, "OPENBEXI_package", "test");
                    java.print(docOut);

                    System.out.println("\n\nTESTING:test1 ........... ");
                    docOut = java.findClasses(Thread.currentThread().getContextClassLoader(), packages, null, null, null, "test1");
                    java.print(docOut);
                }
            }
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }
    }
}
