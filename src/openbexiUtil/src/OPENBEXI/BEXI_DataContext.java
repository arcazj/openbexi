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

import java.sql.SQLException;
import java.util.Dictionary;
import java.util.Hashtable;


public class BEXI_DataContext {

    static String ENGLISH = "en";
    static String FRENCH = "fr";
    static String SQL = "sql";
    static String MOT = "bexi_mot";
    static String WORD = "bexi_word";

    // Source set
    protected String[] _dataBase;
    protected String _URLsource;

    protected Dictionary<String, String> _parserValueMatch;
    protected String[] _parserAttributList;
    protected String[] _parserAttributListSeq;
    protected String[] _parserAttributListMandatory;
    protected String _parserRegex;
    BEXI_Object _object = null;

    /**
     * constructor
     *
     * @param contextPath .
     * @param object      .
     * @throws Exception .
     */

    public BEXI_DataContext(BEXI_ApplicationPath contextPath, BEXI_Object object) throws Exception {
        _dataBase = null;
        _URLsource = null;
        _parserValueMatch = null;
        _parserAttributList = null;
        _parserAttributListSeq = null;
        _parserAttributListMandatory = null;
        _parserRegex = null;
        _object = object;
        if (object.get_language().equals(FRENCH)) {
            setParserFrenchWord(contextPath);
        } else if (object.get_language().equals(ENGLISH)) {
            setParserEnglishWord(contextPath);
        } else {
            setParser(contextPath);
        }
    } // constructor


    /**
     * Database parser
     *
     * @param BEXI_ApplicationPath .
     * @throws Exception .
     */
    private void setParser(BEXI_ApplicationPath BEXI_ApplicationPath) throws Exception {

        // Built the main source database from where the object can be reached accoording the OPENBEXI context
        _dataBase = new String[1];
        _dataBase[0] = BEXI_ApplicationPath.getDefaultClassPath() +
                System.getProperty("file.separator") +
                _object.get_className() + _object.get_objectName().toUpperCase().charAt(0) + ".txt";

        _parserAttributList = _object.getAttributs();
        _parserAttributListSeq = _object.getAttributs();
        _parserAttributListMandatory = null;
        _parserRegex = "[;*]";
        _parserValueMatch = null;

    }

    /**
     * Return parser value match
     *
     * @return _parserValueMatch
     */
    public Dictionary<String, String> getParserValueMatch() {
        return _parserValueMatch;
    }

    public String[] getParserAttributList() {
        return _parserAttributList;
    }

    public String[] getParserAttributListSeq() {
        return _parserAttributListSeq;
    }

    public String[] getParserAttributListMandatory() {
        return _parserAttributListMandatory;
    }

    public String getParserRegex() {
        return _parserRegex;
    }

    /**
     * Return the file name
     *
     * @return _lineSource
     */
    public String[] getDatabase() {
        return _dataBase;
    }

    private void setParserFrenchWord(BEXI_ApplicationPath context) throws SQLException, InstantiationException, ClassNotFoundException, IllegalAccessException, BEXI_ApplicationPathException {

        _parserAttributList = new String[]{"flexion", "racine", "type", "mode", "genre", "nombre", "personne", "other"};

        // Built the main source database from where the object can be reached accoording the OPENBEXI context
        _dataBase = new String[1];
        String objWithoutAccent = BEXI_Expression.removeAccents(_object.get_objectName());
        _dataBase[0] = context.getDefaultPath()
                + System.getProperty("file.separator")
                + "data"
                + System.getProperty("file.separator")
                + "FrenchDictionary"
                + System.getProperty("file.separator")
                + "dico"
                + objWithoutAccent.toUpperCase().charAt(0) + ".txt";

        _parserRegex = "[\t:+*]";

        _parserAttributListSeq = new String[]{"flexion", "racine", "valueMatch", "valueMatch", "valueMatch", "valueMatch", "valueMatch",
                "valueMatch", "valueMatch", "valueMatch", "valueMatch", "valueMatch", "valueMatch", "valueMatch",
                "valueMatch", "valueMatch", "valueMatch", "valueMatch", "valueMatch", "valueMatch", "valueMatch",
                "valueMatch", "valueMatch", "valueMatch", "valueMatch", "valueMatch", "valueMatch", "valueMatch",
                "valueMatch", "valueMatch", "valueMatch", "valueMatch", "valueMatch", "valueMatch", "valueMatch",
                "valueMatch", "valueMatch", "valueMatch", "valueMatch", "valueMatch", "valueMatch", "valueMatch",
                "valueMatch", "valueMatch", "valueMatch", "valueMatch", "valueMatch", "valueMatch", "valueMatch",
                "valueMatch", "valueMatch", "valueMatch", "valueMatch", "valueMatch", "valueMatch", "valueMatch",
                "valueMatch", "valueMatch", "valueMatch", "valueMatch"};

        _parserAttributListMandatory = new String[]{"flexion", "racine", "type"};

        _parserValueMatch = new Hashtable<String, String>();
        try {

            _parserValueMatch.put("NOM", "type:nom");
            _parserValueMatch.put("Nom", "type:nom");
            _parserValueMatch.put("ADJ", "type:adjectif");
            _parserValueMatch.put("Adj", "type:adjectif");
            _parserValueMatch.put("PAT", "type:patronyme");
            _parserValueMatch.put("Pat", "type:patronyme");
            _parserValueMatch.put("VER", "type:verbe");
            _parserValueMatch.put("Ver", "type:verbe");
            _parserValueMatch.put("PRE", "type:préposition");
            _parserValueMatch.put("Pre", "type:préposition");
            _parserValueMatch.put("Adv", "type:adverbe");
            _parserValueMatch.put("ADV", "type:adverbe");
            _parserValueMatch.put("ONO", "type:onomatopée");
            _parserValueMatch.put("Ono", "type:onomatopée");
            _parserValueMatch.put("PRO", "type:pronom");
            _parserValueMatch.put("Pro", "type:pronom");
            _parserValueMatch.put("DET", "type:déterminant");
            _parserValueMatch.put("Det", "type:déterminant");
            _parserValueMatch.put("CON", "type:conjonction");
            _parserValueMatch.put("INT", "type:interjection");
            _parserValueMatch.put("Int", "type:interjection");
            _parserValueMatch.put("EXCL", "type:exclamation");
            _parserValueMatch.put("Excl", "type:exclamation");
            _parserValueMatch.put("ABR", "type:abréviation");
            _parserValueMatch.put("Abr", "type:abréviation");
            _parserValueMatch.put("CON", "type:conjonction");
            _parserValueMatch.put("Con", "type:conjonction");

            _parserValueMatch.put("INF", "mode:infinitif");
            _parserValueMatch.put("Inf", "mode:infinitif");
            _parserValueMatch.put("ImPre", "mode:impératif present");
            _parserValueMatch.put("IPre", "mode:indicatif present");
            _parserValueMatch.put("IPSim", "mode:indicatif passé simple");
            _parserValueMatch.put("SPre", "mode:subjonctif present");
            _parserValueMatch.put("SImp", "mode:subjonctif imparfait");
            _parserValueMatch.put("PPre", "mode:participe present");
            _parserValueMatch.put("GPre", "mode:gérondif present");
            _parserValueMatch.put("CPre", "mode:conditionnel present");
            _parserValueMatch.put("PPas", "mode:participe passé");
            _parserValueMatch.put("IFut", "mode:indicatif futur");
            _parserValueMatch.put("Imp", "mode:imparfait");
            _parserValueMatch.put("IImp", "mode:indicatif imparfait");

            _parserValueMatch.put("MAS", "genre:masculin");
            _parserValueMatch.put("FEM", "genre:féminin");
            _parserValueMatch.put("Mas", "genre:masculin");
            _parserValueMatch.put("Fem", "genre:féminin");
            _parserValueMatch.put("InvGen", "genre:invariable en genre");

            _parserValueMatch.put("P1", "personne:première personne");
            _parserValueMatch.put("P2", "personne:deuxième personne");
            _parserValueMatch.put("P3", "personne:troisième personne");

            _parserValueMatch.put("VS", "nombre:verbe singulier");
            _parserValueMatch.put("VP", "nombre:verbe pluriel");
            _parserValueMatch.put("SG", "nombre:singulier");
            _parserValueMatch.put("PL", "nombre:pluriel");
            _parserValueMatch.put("InvPL", "nombre:invariable pluriel");
            _parserValueMatch.put("InvGen", "nombre:invariable en genre");
            _parserValueMatch.put("InvPL", "nombre:invariable pluriel");

            _parserValueMatch.put("TRANS", "other:transitif");
            _parserValueMatch.put("XTRAN", "other:intransitif");


        } catch (NullPointerException e) {
            System.out.println(e.getMessage());
        }

    }

    private void setParserEnglishWord(BEXI_ApplicationPath context) throws SQLException, InstantiationException, ClassNotFoundException, IllegalAccessException, BEXI_ApplicationPathException {

        _parserAttributList = new String[]{"flexion", "racine", "type", "mode", "genre", "nombre", "personne", "other"};

        // Built the main source database from where the object can be reached accoording the OPENBEXI context
        _dataBase = new String[1];
        String objWithoutAccent = BEXI_Expression.removeAccents(_object.get_objectName());
        _dataBase[0] = context.getDefaultPath()
                + System.getProperty("file.separator")
                + "data"
                + System.getProperty("file.separator")
                + "EnglishDictionary"
                + System.getProperty("file.separator")
                + "dico"
                + objWithoutAccent.toUpperCase().charAt(0) + ".txt";

        _parserRegex = "[\t:+*]";

        _parserAttributListSeq = new String[]{"inflexion", "root", "valueMatch", "valueMatch", "valueMatch", "valueMatch", "valueMatch",
                "valueMatch", "valueMatch", "valueMatch", "valueMatch", "valueMatch", "valueMatch", "valueMatch",
                "valueMatch", "valueMatch", "valueMatch", "valueMatch", "valueMatch", "valueMatch", "valueMatch",
                "valueMatch", "valueMatch", "valueMatch", "valueMatch", "valueMatch", "valueMatch", "valueMatch",
                "valueMatch", "valueMatch", "valueMatch", "valueMatch", "valueMatch", "valueMatch", "valueMatch",
                "valueMatch", "valueMatch", "valueMatch", "valueMatch", "valueMatch", "valueMatch", "valueMatch",
                "valueMatch", "valueMatch", "valueMatch", "valueMatch", "valueMatch", "valueMatch", "valueMatch",
                "valueMatch", "valueMatch", "valueMatch", "valueMatch", "valueMatch", "valueMatch", "valueMatch",
                "valueMatch", "valueMatch", "valueMatch", "valueMatch"};

        _parserAttributListMandatory = new String[]{"inflexion", "root", "category"};

        _parserValueMatch = new Hashtable<String, String>();
        try {
            _parserValueMatch.put("letter", "type:letter");
            _parserValueMatch.put("noun", "type:noun");
            _parserValueMatch.put("verb", "type:verb");
            _parserValueMatch.put("auxiliary", "type:verb");
            _parserValueMatch.put("propernoun", "type:noun");
            _parserValueMatch.put("propername", "type:noun");
            _parserValueMatch.put("pronoun", "type:pronom");
            _parserValueMatch.put("personalpronoun", "type:pronoun");
            _parserValueMatch.put("adjective", "type:adjective");
            _parserValueMatch.put("nominaladjective", "type:adjective");
            _parserValueMatch.put("indefinitearticle", "type:determiner");
            _parserValueMatch.put("definitearticle", "type:determiner");
            _parserValueMatch.put("determiner", "type:determiner");
            _parserValueMatch.put("article", "type:determiner");
            _parserValueMatch.put("interjection", "type:interjection");
            _parserValueMatch.put("letter", "type:letter");
            _parserValueMatch.put("proper noun", "type:noun");
            _parserValueMatch.put("preposition", "type:preposition");
            _parserValueMatch.put("adverbe", "type:adverbe");
            _parserValueMatch.put("conjonction", "type:conjonction");


            _parserValueMatch.put("simple_present", "mode:simple_present");
            _parserValueMatch.put("simple_past", "mode:simple_past");
            _parserValueMatch.put("past_participle", "mode:past_participle");
            _parserValueMatch.put("present_participle", "mode:present_participle");


            _parserValueMatch.put("plural", "nombre:plural");

            _parserValueMatch.put("transitive", "other:transitive");
            _parserValueMatch.put("intransitive", "other:intransitive");

        } catch (NullPointerException e) {
            System.out.println("setParserEnglishWord problem:" + e.getMessage());
        }

    }


}

