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

// Classe dérivée de HTMLDocument pour permettre de spécifier
// un reader différent dans la méthode getReader ()

import javax.swing.text.MutableAttributeSet;
import javax.swing.text.html.HTML;
import javax.swing.text.html.HTMLDocument;
import javax.swing.text.html.HTMLEditorKit;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;
import java.util.Vector;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class BEXI_LookForDATAInURL extends HTMLDocument {
    // Ensemble des ancres de ce fichier HTML
    private Vector anchors = new Vector();
    // Ensemble des liens URLs trouvés dans ce fichier
    private Vector urls = new Vector();
    // Ensemble des URLs mal écrites dans ce fichier
    private Vector malformedURLs = new Vector();

    // Constructeur
    public BEXI_LookForDATAInURL(URL file) {
        // Mémorisation de la base du fichier HTML
        setBase(file);
    }

    public final Vector getAnchors() {
        return anchors;
    }

    public final Vector getURLs() {
        return urls;
    }

    public final Vector getMalformedURLs() {
        return malformedURLs;
    }

    private void addAnchor(String anchor) {
        // Ajout de l'ancre à l'ensemble des ancres
        anchors.addElement(anchor);
    }

    private boolean ignoreURL(String urlString) {
        // Ajout uniquement des URLs relatives à ce fichier
        // (les fichiers sans protocole défini avec ':').
        // Eventuellement vous pouvez filtrer différemment les
        // URLs (pas de cgi par exemple,...)
        return urlString.indexOf(':') >= 0;
    }

    private void addURL(String urlString) {

        String urlTmp = "";
        try {

            Pattern pattern1 = Pattern.compile("www.*");
            Matcher matcher1 = pattern1.matcher(urlString);
            while (matcher1.find()) urlTmp = "http://" + matcher1.group();

            String s = urlTmp;
            Pattern pattern2 = Pattern.compile("%");
            Matcher matcher2 = pattern2.matcher(s);

            if (urlTmp != "" && !matcher2.find()) {
                urls.addElement(urlTmp);
                //System.out.println("URL found=" + urlTmp);
            }
        } finally {
        }
    }

    // Méthode outrepassée pour fournir un reader différent
    public HTMLEditorKit.ParserCallback getReader(int pos) {
        return new LinkReader();
    }

    // Les méthodes de cette classe sont rappelées par
    // le parser HTML suivant les différents tag HTML lus.
    // Ici, le but recherché est de garder une trace de tous
    // les tags qui font appels à des URLs (fichiers HTML, images,...).
    private class LinkReader extends HTMLEditorKit.ParserCallback {
        // Méthode appelée quand un tag de début est rencontré
        public void handleStartTag(HTML.Tag tag, MutableAttributeSet att, int pos) {

            String attribute;
            String attribute1;

            if (tag.equals(HTML.Tag.A))  // Tags <A NAME=...> ou <A HREF=...>
            {
                attribute = (String) att.getAttribute(HTML.Attribute.NAME);
                if (attribute != null) {
                    addAnchor(attribute);
                } else {
                    attribute = (String) att.getAttribute(HTML.Attribute.HREF);
                    if (attribute != null) {
                        addURL(attribute);
                        // System.out.println(tag);
                        //  System.out.println("att="+attribute);
                        // System.out.println("base="+getBase());
                        //System.out.println("AttributeNames="+att.getAttributeNames());
                    }
                }

            } else if (tag.equals(HTML.Tag.APPLET))  // Tag <APPLET CODE=...>
            {
                attribute = (String) att.getAttribute(HTML.Attribute.CODE);
                if (attribute != null) {
                    String archive = (String) att.getAttribute(HTML.Attribute.ARCHIVE);
                    if (archive != null)
                        // Branchement sur le fichier d'archive s'il existe
                        attribute = archive;
                    else if (!attribute.endsWith(".class"))
                        attribute += ".class";

                    // Recherche du répertoire éventuel relatif à l'applet
                    String codebase = (String) att.getAttribute(HTML.Attribute.CODEBASE);
                    if (codebase != null)
                        if (codebase.endsWith("/"))
                            attribute = codebase + attribute;
                        else
                            attribute = codebase + '/' + attribute;
                    addURL(attribute);
                }
            } else if (tag.equals(HTML.Tag.BODY)  // Tag <BODY BACKGROUND=...>
                    || tag.equals(HTML.Tag.TABLE) // Tag <TABLE BACKGROUND=...>
                    || tag.equals(HTML.Tag.TR)    // Tag <TR BACKGROUND=...>
                    || tag.equals(HTML.Tag.TD))   // Tag <TD BACKGROUND=...>
            {
                attribute = (String) att.getAttribute(HTML.Attribute.BACKGROUND);
                if (attribute != null)
                    addURL(attribute);
            }
        }

        // Méthode appelée quand un tag simple est lu
        public void handleSimpleTag(HTML.Tag tag, MutableAttributeSet att, int pos) {
            String attribute;

            if (tag.equals(HTML.Tag.FRAME) // Tag <FRAME SRC=...>
                    || tag.equals(HTML.Tag.IMG))  // Tag <IMG SRC=...>
            {
                attribute = (String) att.getAttribute(HTML.Attribute.SRC);
                if (attribute != null)
                    addURL(attribute);
            } else if (tag.equals(HTML.Tag.AREA)) // Tag <AREA HREF=...>
            {
                attribute = (String) att.getAttribute(HTML.Attribute.HREF);
                if (attribute != null)
                    addURL(attribute);
            }
        }

        // HTMLEditorKit.ParserCallback définit aussi d'autres méthodes
        // qu'il est inutile d'outrepasser ici (tag de fin, commentaires,
        // corps de texte,...)
    }

    public String readURL(String urlS) {
        // Configure proxy ...
        System.setProperty("http.proxySet", "true");
        System.setProperty("http.proxyHost", "xxx.xxx.xxx.xxx");
        System.setProperty("http.proxyPort", "80");
        System.setProperty("http.proxyType", "4");
        System.setProperty("http.agent", "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.0)");

        // Open URL ...
        URL url = null;
        try {
            url = new URL(urlS);
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }
        BufferedReader in = null;
        try {
            in = new BufferedReader(
                    new InputStreamReader(
                            url.openStream()
                    )
            );
        } catch (IOException e) {
            e.printStackTrace();
        }

        String text = "";
        // Read it ...
        String inputLine;
        try {
            while ((inputLine = in.readLine()) != null)
                //System.out.println(inputLine);
                text += inputLine + "\n";
        } catch (IOException e) {
            e.printStackTrace();
        }

        try {
            in.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return text;
    }

    public static void main(String[] args) {

        BEXI_URL page1 = new BEXI_URL();
        //String url = "http://news.google.fr/nwshp?hl=fr&edition=fr";
        //String url = "http://www.openbexi.com";
        //String url="http://www.google.com/";
        String url = "http://www.openbexi.com/table/employees.csv";
        boolean test1 = false;
        boolean test2 = true;
        if (test1) {
            List l = page1.getURLList(url);

            for (int i = 0; i < l.size(); i++) {
                System.out.println(l.get(i).toString());
            }
        }
        if (test2) {
            BEXI_LookForDATAInURL link = new BEXI_LookForDATAInURL(null);
            String text = link.readURL(url);
            System.out.println(text);
        }

    }
}
