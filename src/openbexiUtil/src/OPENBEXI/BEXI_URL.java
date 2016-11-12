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

import javax.swing.text.BadLocationException;
import javax.swing.text.MutableAttributeSet;
import javax.swing.text.html.HTML;
import javax.swing.text.html.HTMLEditorKit;
import java.io.*;
import java.net.InetAddress;
import java.net.URL;
import java.util.*;
import java.util.regex.PatternSyntaxException;


/**
 * Class BEXI_URL: provide methods for parsing HTML from any URLs according rules
 */

public class BEXI_URL extends HTMLEditorKit.ParserCallback {

    private static Writer out;
    private static String s;
    private static String meta;
    private static String base_;
    private static Vector links;
    private static boolean useMeta;
    private static boolean useLink;
    private static boolean useText;


    public BEXI_URL() {
    }

    /**
     * @param out
     * @param verb
     * @param prep
     * @param nbWord
     */
    public BEXI_URL(Writer out, String verb, String prep, int nbWord) {
        _verb = verb;
        _prep = prep;
        _nbWord = nbWord;
        this.out = out;
    } // constructor

    protected String _verb;
    protected String _prep;
    protected int _nbWord;

    public String getVerb() {
        return _verb;
    }

    public String getPrep() {
        return _prep;
    }

    public int getNbWord() {
        return _nbWord;
    }

    public void handleSimpleTag(HTML.Tag tag,
                                MutableAttributeSet attributes, int position) {
        try {
            // System.err.println(attributes);
        } catch (Exception e) {
            System.err.println(e);
            e.printStackTrace();
        }
    }

    /**
     * @param tag
     * @param attributes
     * @param position
     */
    public void handleStartTag
            (HTML.Tag
                    tag, MutableAttributeSet
                    attributes, int position) {
        //System.err.println(tag);

    } // handleStartTag

    public void handleEndTag
            (HTML.Tag
                    tag, int position) {

    } // handleEndTag

    public void handleText
            (
                    char[] text,
                    int position) {

        String texttmp = new String(text);
        //System.out.println(texttmp);
        try {

            StringTokenizer st = new StringTokenizer(texttmp);
            boolean flag1 = false;
            boolean flag2 = false;

            int i = 0;

            // look for first word && second word && nb word in a text
            String s = "";
            while (st.hasMoreTokens()) {

                s = st.nextToken();
                i++;
                if (s.equals(getVerb())) {
                    flag1 = true;
                }
                if (s.equals(getPrep())) {
                    flag2 = true;
                }
            }

            // Look for ecah expression of the text
            // and look for first word && second word again
            String s1 = "";
            if (flag1 && flag2 && i > getNbWord()) {
                StringTokenizer st1 = new StringTokenizer(texttmp, ".");
                while (st1.hasMoreTokens()) {
                    s1 = st1.nextToken();
                    boolean flag3 = false;
                    boolean flag4 = false;

                    try {
                        // Split the expression and checkIfObjectExist a word list
                        String[] wordList = null;
                        wordList = s1.split(("[ *.,]"));
                        for (int j = 0; j < wordList.length; j++) {
                            if (wordList[j].equals(getVerb())) {
                                flag3 = true;
                            }
                            if (wordList[j].equals(getPrep())) {
                                flag4 = true;
                            }
                        }
                    } catch (PatternSyntaxException e) {
                        e.printStackTrace();
                    } catch (NullPointerException e) {
                        e.printStackTrace();
                    } finally {
                    }

                    if (flag3 && flag4) {
                        System.out.println(s1 + ".");
                        out.write(s1 + ".");
                        out.write("\n");
                        out.flush();
                    }
                }
            }

        } catch (IOException e) {
            System.err.println(e);
            e.printStackTrace();
        } // catch
    } // handleText


    /**
     * Get phrasal verb usage from a URL.
     *
     * @param verb
     * @param prep
     * @param nbWord :reject usage if the number of word is < nbWord
     * @param url
     * @return parsing result
     */
    public String lookForWordsInTheWeb(String verb, String prep, int nbWord, String url) {

        String outPutFile = verb + prep + "_parseOutFile.txt";

        String res = "";
        try {

            BEXI_ParserGetter kit = new BEXI_ParserGetter();
            HTMLEditorKit.Parser parser = kit.getParser();

            //System.setProperty("proxySet", "true");
            //System.setProperty("http.proxyHost", "xxx");
            //System.setProperty("http.proxyPort", "80");
            //System.setProperty("http.proxyUser", "");
            //System.setProperty("http.proxyPassword", "");

            // Build URL (example=http://www.alltheweb.com/search?cat=web&cs=utf-8&q=take+*+off&_sb_lang=en")
            if (url.equals("alltheweb")) {
                url = "http://www.alltheweb.com/search?cat=web&cs=utf-8&q=" + verb + "+*+" + prep + "&_sb_lang=en";
            }

            // ==================================================
            // Open input
            // Check if URL page or line not too big and reject
            // Create URL object
            URL uTmp = new URL(url);

            BufferedReader inTmp = new BufferedReader(
                    new InputStreamReader(
                            uTmp.openStream()));
            String inputLine;
            int j = 0;
            while ((inputLine = inTmp.readLine()) != null) {
                j = j + 1;
                if (inputLine.length() > 500) return res;
            }
            //System.out.println("Nb page line="+Integer.toString(j)) ;
            if (j > 5000) return res;
            inTmp.close();
            // ==================================================

            URL u = new URL(url);
            InputStream in = u.openStream();
            InputStreamReader r = new InputStreamReader(in);

            // Parse HTML
            File dumpOut = new File(outPutFile);
            FileWriter parseOut = new FileWriter(dumpOut);
            HTMLEditorKit.ParserCallback callback = new BEXI_URL(parseOut, verb, prep, nbWord);
            parser.parse(r, callback, true);
            parseOut.flush();
            parseOut.close();

            //Read parse result and remove all line without
            BufferedReader parseIn = new BufferedReader(new FileReader(dumpOut));
            String str = "-";
            String EndLine = System.getProperty("line.separator");
            while (str != null) {
                str = parseIn.readLine();
                if (str != null) {
                    StringTokenizer st = new StringTokenizer(str, ".");

                    while (st.hasMoreTokens()) res = res + st.nextToken() + "." + EndLine;
                }
            }
            in.close();

        } catch (IOException e) {
            System.err.println(e);
        }

        return (res);

    }


    public List getURLList(String verb, String prep, int nbWord, int num) {

        String url = "";
        List urlList = new Vector();

        // For nb max URL
        for (int i = 0; i < num; i++) {
            try {
                // Ouverture du fichier contenu dans l'argument 0
                url = "http://www.alltheweb.com/search?cat=web&cs=utf-8&q=" + verb + "+*+" + prep + "&o=" + Integer.toString(i * 10);
                URL fileURL = new URL(url);
                Reader urlReader = new BufferedReader(
                        new InputStreamReader(fileURL.openStream()));

                // Création d'une instance de parser
                BEXI_HTML doc = new BEXI_HTML(fileURL);

                // Parsing du fichier HTML avec Swing
                new HTMLEditorKit().read(urlReader, doc, 0);
                urlReader.close();

                // Listing des ancres et des URLs trouvées dans le fichier
                //System.out.println("Liste des ancres :");
                for (Enumeration e = doc.getAnchors().elements(); e.hasMoreElements();) {
                    Object anchors = e.nextElement();
                    System.out.println(anchors.toString());
                }
                //System.out.println("\nListe des URLs :");
                for (Enumeration e = doc.getURLs().elements(); e.hasMoreElements();) {
                    Object urls = e.nextElement();
                    System.out.println(urls.toString());
                    urlList.add(urls);
                }

            } catch (IOException e) {
                System.out.println("Probleme d'acces a l'URL : " + url);
            } catch (BadLocationException e) {
            }
        }

        return urlList;
    }

    public List getURLList(String url) {

        List urlList = new Vector();

        try {
            // Ouverture du fichier contenu dans l'argument 0

            InetAddress localHost = InetAddress.getLocalHost();
            System.out.println(localHost.getHostName());
            System.out.println(localHost.getHostAddress());


            Properties props = System.getProperties();
            System.getProperties().put("proxySet", "true");
            System.getProperties().put("proxyHost", "proxy2");
            System.getProperties().put("proxyPort", "80");
            //System.getProperties().put( "javax.net.debug", "true" );

            //System.setProperty( "proxySet", "true" );
            //System.setProperty( "http.proxyHost", "arcaz" );
            // System.setProperty( "http.proxyPort", "85" );
            //props.put("http.proxyHost", "141.156.232.100");
            //props.put("http.proxyPort", "8282");

            //props.setProperty("http.agent", "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.0)");

            URL fileURL = new URL(url);
            Reader urlReader = new BufferedReader(
                    new InputStreamReader(fileURL.openStream()));

            // Création d'une instance de parser
            BEXI_HTML doc = new BEXI_HTML(fileURL);

            // Parsing du fichier HTML avec Swing
            new HTMLEditorKit().read(urlReader, doc, 0);
            urlReader.close();

            // Listing des ancres et des URLs trouvées dans le fichier
            //System.out.println("Liste des ancres :");
            for (Enumeration e = doc.getAnchors().elements(); e.hasMoreElements();) {
                Object anchors = e.nextElement();
                System.out.println(anchors.toString());
            }
            //System.out.println("\nListe des URLs :");
            for (Enumeration e = doc.getURLs().elements(); e.hasMoreElements();) {
                Object urls = e.nextElement();
                System.out.println(urls.toString());
                urlList.add(urls);
            }

        } catch (IOException e) {
            System.out.println(e.getMessage() + ": " + url);
            //System.out.println("Probleme d'acces a l'URL : " + url);
        } catch (BadLocationException e) {
        }

        return urlList;
    }

}






