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

package BEXI_DICTIONARY;

import OPENBEXI.BEXI_ApplicationPath;

import java.io.*;
import java.util.Enumeration;
import java.util.Iterator;
import java.util.Vector;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.zip.GZIPInputStream;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;

/**
 * first pass
 * read dictionary from http://www.translatum.gr/dictionaries/download-english.htm
 * (a public domain English word list dictionary, based on the public domain portion of "The Project Gutenberg Etext of Webster's Unabridged Dictionary" which is in turn based on the 1913 US Webster's Unabridged Dictionary)
 * use filter (eliminate sepcial char + word with low frequency)
 * <p/>
 * second pass
 * read and use only word from dictionary from http://www.comp.lancs.ac.uk/ucrel + definition
 * and synchronize type with the first dictionary (if needed)
 */
public class WiktionaryEnglish {

    private String[] _words;
    private Vector _wiktionaryWord;
    private WiktionaryPage[] _wiktionaryPages;
    private BEXI_ApplicationPath _contextPath;

    private boolean newPage = false;
    private boolean findNewTag = false;
    private boolean findLetter = false;
    private boolean findWord = false;
    private boolean findEnglish = false;
    private boolean findLanguage = false;
    private boolean findNoun = false;
    private boolean findAdjective = false;
    private boolean findNominal_adjective = false;
    private boolean findPlural = false;
    private boolean findComparative = false;
    private boolean findSuperlative = false;

    private boolean findVerb = false;
    private boolean findTransitive_Verb = false;
    private boolean findInTransitive_Verb = false;
    private boolean findForm_Verb = false;
    private boolean findCopularVerb = false;
    private boolean findVerbalNoun = false;
    private boolean findPhrasal_Verb = false;
    private boolean findVerb_phrase = false;

    private boolean findConjunction = false;
    private boolean findAdverb = false;
    private boolean findPreposition = false;
    private boolean findTranslation = false;
    private boolean findDerived_term = false;
    private boolean findSynonym = false;
    private boolean Derived_term = false;
    private boolean findAntonym = false;
    private boolean findHomophone = false;
    private boolean findRelated_phrase = false;
    private boolean findRelated_terms = false;
    private boolean findSee_also = false;
    private boolean findExternal_link = false;
    private boolean findEtymology = false;
    private boolean findPronunciation = false;
    private boolean findTranslations_to_be_categorized = false;
    private boolean findTranslations_to_be_checked = false;
    private boolean findIdioms = false;
    private boolean findUsage_Note = false;
    private boolean findIndefinite_article = false;
    private boolean findPersonal_pronoun = false;
    private boolean findPronoun = false;
    private boolean findInflection = false;
    private boolean findSymbol = false;
    private boolean findTranslingual = false;
    private boolean findQuotation = false;
    private boolean findProper_noun = false;
    private boolean findRelated_words = false;
    private boolean findCardinal_number = false;
    private boolean findInterjection = false;
    private boolean findNote = false;
    private boolean findExpressions = false;
    private boolean findAuxiliary = false;
    private boolean findIntensifier = false;
    private boolean findQuotations = false;


    public WiktionaryEnglish() throws Exception {
        _contextPath = new BEXI_ApplicationPath();
    }

    public WiktionaryEnglish(String[] words) throws Exception {
        _words = words;
        _contextPath = new BEXI_ApplicationPath();
        _wiktionaryPages = getWiktionaryPages(words);
        _wiktionaryWord = getDataWord();

        String wordMissing = "";
        for (int i = 0; i < _wiktionaryPages.length; i++) {
            if (_wiktionaryPages[i].lines.size() == 0) {
                wordMissing = wordMissing + " " + _words[i];
            }
        }
        if (!wordMissing.equals("")) {
            //throw new BEXI_ActionException(wordMissing + " no found.");
            System.err.println(wordMissing + " no found.");
        }
    }

    public Vector get_wiktionaryWord() {
        return _wiktionaryWord;
    }

    public void set_wiktionaryWord(Vector _wiktionaryWord) {
        this._wiktionaryWord = _wiktionaryWord;
    }

    public WiktionaryPage[] get_wiktionaryPages() {
        return _wiktionaryPages;
    }

    public void setWiktionaryPage(WiktionaryPage[] wiktionaryPage) {
        this._wiktionaryPages = wiktionaryPage;
    }

    private static void save(final String file, final String line, boolean append) throws Exception {

        final FileWriter writer;
        final BufferedWriter write;

        try {
            writer = new FileWriter(file, append);
            write = new BufferedWriter(writer);

            write.write(line);

        } catch (IOException e) {
            throw e;
        }

        write.close();
        writer.close();
    }

    /**
     * @param verb
     * @return english verb inflections (format word/tinflection/tclassword:others informations
     */
    private String[] lookForVerbInflection(String verb, String postposition, String otherInfos) {
        String[] inflections = null;
        int count = 0;

        String[] simple_present = get_simple_present(verb);
        count = count + simple_present.length;
        String[] simple_past = get_simple_past(verb);
        count = count + simple_past.length;
        String[] past_participle = get_past_participle(verb);
        count = count + past_participle.length;
        String[] present_participle = get_present_participle(verb);
        count = count + present_participle.length;

        inflections = new String[count];

        int countAgain = 0;
        for (int i = 0; i < simple_present.length; i++) {
            inflections[countAgain++] = simple_present[i] + postposition + "\t" + verb + postposition + "\t" + "verb:simple_present+" + otherInfos;
        }
        for (int i = 0; i < simple_past.length; i++) {
            inflections[countAgain++] = simple_past[i] + postposition + "\t" + verb + postposition + "\t" + "verb:simple_past+" + otherInfos;
        }
        for (int i = 0; i < past_participle.length; i++) {
            inflections[countAgain++] = past_participle[i] + postposition + "\t" + verb + postposition + "\t" + "verb:past_participle+" + otherInfos;
        }
        for (int i = 0; i < present_participle.length; i++) {
            inflections[countAgain++] = present_participle[i] + postposition + "\t" + verb + postposition + "\t" + "verb:present_participle+" + otherInfos;
        }
        return inflections;
    }

    private String[] get_irregular_inflection_verb(String verb) {
        String[] irregular_inflection = new String[5];
        boolean findIrregular = false;
        String simple_present = "";
        String simple_past_Item1 = "";
        String simple_past_Item2 = "";
        String past_participle_Item1 = "";
        String past_participle_Item2 = "";

        // First look for irregular verb
        for (int i = 0; i < WiktionaryEnglishWord._irregular_verb.length; i++) {
            String Items[] = WiktionaryEnglishWord._irregular_verb[i].split(" ");
            if (Items[0].equals(verb)) {
                if (Items.length == 3) {
                    findIrregular = true;
                    simple_present = Items[0];
                    String pastItems[] = Items[1].split("/");
                    if (pastItems.length == 1) {
                        simple_past_Item1 = pastItems[0];
                    }
                    if (pastItems.length == 2) {
                        simple_past_Item1 = pastItems[0];
                        simple_past_Item2 = pastItems[1];
                    }
                    String past_participle[] = Items[2].split("/");
                    if (past_participle.length == 1) {
                        past_participle_Item1 = past_participle[0];
                    }
                    if (past_participle.length == 2) {
                        past_participle_Item1 = past_participle[0];
                        past_participle_Item2 = past_participle[1];
                    }
                } else {
                    System.err.println("get_irregular_verbe: error for irregular verb " + verb);
                    return null;
                }
                break;
            }
        }

        //irregular found
        if (findIrregular) {
            irregular_inflection[0] = simple_present;
            irregular_inflection[1] = simple_past_Item1;
            irregular_inflection[2] = simple_past_Item2;
            irregular_inflection[3] = past_participle_Item1;
            irregular_inflection[4] = past_participle_Item2;
            return irregular_inflection;
        }
        return null;
    }

    private String[] get_irregular_plural_noun(String word) {
        String[] plurals = null;
        for (int i = 0; i < WiktionaryEnglishWord._irregular_plural_noun.length; i++) {
            String Items[] = WiktionaryEnglishWord._irregular_plural_noun[i].split(" ");
            if (Items[0].equals(word)) {
                if (Items.length == 2) {
                    String singular = Items[0];
                    String pluralItems[] = Items[1].split("/");
                    if (pluralItems.length == 1) {
                        plurals = new String[1];
                        plurals[0] = pluralItems[0];
                    }
                    if (pluralItems.length == 2) {
                        plurals = new String[2];
                        plurals[0] = pluralItems[0];
                        plurals[1] = pluralItems[1];
                    }
                }
            }
        }
        return plurals;
    }

    private String[] get_plural_noun(String word, String curentLine) {
        boolean findIrregular = false;
        String[] plurals = null;
        Pattern patternPlural1 = Pattern.compile(word + "s");
        Matcher matcherPlural1 = patternPlural1.matcher(curentLine);
        Pattern patternPlural2 = Pattern.compile(word + "es");
        Matcher matcherPlural2 = patternPlural2.matcher(curentLine);
        Pattern patternPlural3 = Pattern.compile(word + "en");
        Matcher matcherPlural3 = patternPlural3.matcher(curentLine);

        String noun_less_y = "";
        for (int i = 0; i < word.length(); i++) {
            if (i != word.length() - 1) {
                noun_less_y = noun_less_y + word.charAt(i);
            }
        }
        Pattern patternPlural4 = Pattern.compile(noun_less_y + "ies");
        Matcher matcherPlural4 = patternPlural4.matcher(curentLine);

        String[] irregular = null;
        if ((irregular = get_irregular_plural_noun(word)) != null) {
            return (irregular);
        }
        if (matcherPlural1.find()) {
            plurals = new String[1];
            plurals[0] = word + "s";
            return plurals;
        }
        if (matcherPlural2.find()) {
            plurals = new String[1];
            plurals[0] = word + "es";
            return plurals;
        }
        if (matcherPlural3.find()) {
            plurals = new String[1];
            plurals[0] = word + "en";
            return plurals;
        }
        if (matcherPlural4.find()) {
            plurals = new String[1];
            plurals[0] = noun_less_y + "ies";
            return plurals;
        }
        System.err.println("??? get_plural_noun: error for irregular plural " + word + " line=" + curentLine);
        return null;
    }

    private String parse_past_participle(String verb) {
        String line;
        for (int j = 0; j < _wiktionaryPages.length; j++) {
            Vector lines = _wiktionaryPages[j].lines;
            for (int k = 0; k < lines.size(); k++) {
                line = (String) lines.get(k);

                Matcher matcherBegin2 = null;
                Pattern patternBegin2 = Pattern.compile(verb + "ed");
                matcherBegin2 = patternBegin2.matcher(line);
                if (matcherBegin2 != null && matcherBegin2.find()) {
                    return verb + "ed";
                }
            }
        }
        return null;
    }

    private String[] get_past_participle(String verb) {
        String[] past_participle = null;

        // Look for irregular verb
        String[] inflection_verb = get_irregular_inflection_verb(verb);
        if (inflection_verb != null) {
            if (!inflection_verb[4].equals("")) {
                past_participle = new String[2];
                past_participle[0] = inflection_verb[3];
                past_participle[1] = inflection_verb[4];
            } else {
                past_participle = new String[1];
                past_participle[0] = inflection_verb[3];
            }
        } else {
            char lastChar = verb.charAt(verb.length() - 1);
            char beforeLastChar = ' ';
            char beforebeforeLastChar = ' ';
            if (verb.length() >= 2) {
                beforeLastChar = verb.charAt(verb.length() - 2);
            }
            if (verb.length() >= 3) {
                beforebeforeLastChar = verb.charAt(verb.length() - 3);
            }
            // verbs that end ie add d
            if (beforeLastChar == 'i' && lastChar == 'e') {
                past_participle = new String[1];
                past_participle[0] = verb + "d";
                return past_participle;
                // verbs that end two vowel and a  consonants add ??? (my god!)
            } else if (checkVowel(beforebeforeLastChar) && checkVowel(beforeLastChar) && !checkVowel(lastChar)) {
                past_participle = new String[1];
                past_participle[0] = verb + "ed";
                return past_participle;
                // verbs that end two consonants add ed
            } else if (!checkVowel(beforeLastChar) && !checkVowel(lastChar)) {
                past_participle = new String[1];
                past_participle[0] = verb + "ed";
                return past_participle;
                // verbs that end a vowel and a  consonants add ??? (my god!)
            } else if (checkVowel(beforeLastChar) && !checkVowel(lastChar)) {
                past_participle = new String[1];
                past_participle[0] = parse_simple_past(verb);
                if (past_participle[0] == null) {
                    past_participle[0] = "???";
                    System.err.println("get_past_participle: cannot get past participate for " + verb);
                }
                return past_participle;
                // verbs that end a or e add d
            } else if (lastChar == 'e' || lastChar == 'a') {
                past_participle = new String[1];
                past_participle[0] = verb + "d";
                return past_participle;
                // verbs that end x or e add w
            } else if (lastChar == 'x' || lastChar == 'w') {
                past_participle = new String[1];
                past_participle[0] = verb + "d";
                return past_participle;
                // verbs that end y and preceded by consonant add ed
            } else if (checkVowel(beforeLastChar) && lastChar == 'y') {
                past_participle = new String[1];
                past_participle[0] = verb + "ed";
                return past_participle;
                // verbs that end y and preceded by vowel add ied
            } else if (!checkVowel(beforeLastChar) && lastChar == 'y') {
                String verb_less_y = "";
                for (int i = 0; i < verb.length(); i++) {
                    if (i != verb.length() - 1) {
                        verb_less_y = verb_less_y + verb.charAt(i);
                    }
                }
                past_participle = new String[1];
                past_participle[0] = verb_less_y + "ied";
                return past_participle;
            } else {
                past_participle = new String[1];
                past_participle[0] = verb + "ed";
            }
        }
        return past_participle;
    }

    private String[] get_simple_present(String verb) {
        String[] simple_present_be = new String[3];
        if (verb.equals("be")) {
            simple_present_be[0] = "am";
            simple_present_be[1] = "is";
            simple_present_be[2] = "are";
            return simple_present_be;
        }

        String[] simple_present = new String[2];
        char lastChar = verb.charAt(verb.length() - 1);
        char beforeLastChar = ' ';
        char beforebeforeLastChar = ' ';
        if (verb.length() >= 2) {
            beforeLastChar = verb.charAt(verb.length() - 2);
        }
        if (verb.length() >= 3) {
            beforebeforeLastChar = verb.charAt(verb.length() - 3);
        }
        simple_present[0] = verb;
        // verbs that end y and preceded by vowel add ied
        if (checkVowel(beforeLastChar) && lastChar == 'y') {
            simple_present[1] = verb + "s";
            return simple_present;
        } else if (lastChar == 'o') {
            simple_present[1] = verb + "es";
            return simple_present;
        } else if (lastChar == 'y') {
            String verb_less_y = "";
            for (int i = 0; i < verb.length(); i++) {
                if (i != verb.length() - 1) {
                    verb_less_y = verb_less_y + verb.charAt(i);
                }
            }
            simple_present[1] = verb_less_y + "ies";
            return simple_present;
        } else {
            simple_present[1] = verb + "s";
            return simple_present;
        }

    }

    private boolean checkVowel(char c) {
        if (c == 'a') return true;
        if (c == 'e') return true;
        if (c == 'i') return true;
        if (c == 'o') return true;
        if (c == 'u') return true;
        if (c == 'y') return true;
        return false;
    }

    private String parse_simple_past(String verb) {
        String line;
        for (int j = 0; j < _wiktionaryPages.length; j++) {
            Vector lines = _wiktionaryPages[j].lines;
            for (int k = 0; k < lines.size(); k++) {
                line = (String) lines.get(k);

                Matcher matcherBegin2 = null;
                Pattern patternBegin2 = Pattern.compile(verb + "ed");
                matcherBegin2 = patternBegin2.matcher(line);
                if (matcherBegin2 != null && matcherBegin2.find()) {
                    return verb + "ed";
                }
            }
        }
        return null;
    }

    private String[] get_simple_past(String verb) {
        String[] simple_past = null;

        // Look for irregular verb
        String[] inflection_verb = get_irregular_inflection_verb(verb);
        if (inflection_verb != null) {
            if (!inflection_verb[2].equals("")) {
                simple_past = new String[2];
                simple_past[0] = inflection_verb[1];
                simple_past[1] = inflection_verb[2];
            } else {
                simple_past = new String[1];
                simple_past[0] = inflection_verb[1];
            }
        } else {
            char lastChar = verb.charAt(verb.length() - 1);
            char beforeLastChar = ' ';
            char beforebeforeLastChar = ' ';
            if (verb.length() >= 2) {
                beforeLastChar = verb.charAt(verb.length() - 2);
            }
            if (verb.length() >= 3) {
                beforebeforeLastChar = verb.charAt(verb.length() - 3);
            }
            // verbs that end ie add d
            if (beforeLastChar == 'i' && lastChar == 'e') {
                simple_past = new String[1];
                simple_past[0] = verb + "d";
                return simple_past;
                // verbs that end two vowel and a  consonants add ??? (my god!)
            } else if (checkVowel(beforebeforeLastChar) && checkVowel(beforeLastChar) && !checkVowel(lastChar)) {
                simple_past = new String[1];
                simple_past[0] = verb + "ed";
                return simple_past;
                // verbs that end two consonants add ed
            } else if (!checkVowel(beforeLastChar) && !checkVowel(lastChar)) {
                simple_past = new String[1];
                simple_past[0] = verb + "ed";
                return simple_past;
                // verbs that end a vowel and a  consonants add ??? (my god!)
            } else if (checkVowel(beforeLastChar) && !checkVowel(lastChar)) {
                simple_past = new String[1];
                simple_past[0] = parse_simple_past(verb);
                if (simple_past[0] == null) {
                    simple_past[0] = "???";
                    System.err.println("get_simple_past: cannot get simple past for " + verb);
                }
                return simple_past;
                // verbs that end a or e add d
            } else if (lastChar == 'e' || lastChar == 'a') {
                simple_past = new String[1];
                simple_past[0] = verb + "d";
                return simple_past;
                // verbs that end x or e add w
            } else if (lastChar == 'x' || lastChar == 'w') {
                simple_past = new String[1];
                simple_past[0] = verb + "d";
                return simple_past;
                // verbs that end y and preceded by consonant add ed
            } else if (checkVowel(beforeLastChar) && lastChar == 'y') {
                simple_past = new String[1];
                simple_past[0] = verb + "ed";
                return simple_past;
                // verbs that end y and preceded by vowel add ied
            } else if (!checkVowel(beforeLastChar) && lastChar == 'y') {
                String verb_less_y = "";
                for (int i = 0; i < verb.length(); i++) {
                    if (i != verb.length() - 1) {
                        verb_less_y = verb_less_y + verb.charAt(i);
                    }
                }
                simple_past = new String[1];
                simple_past[0] = verb_less_y + "ied";
                return simple_past;
            } else {
                simple_past = new String[1];
                simple_past[0] = verb + "ed";
            }
        }
        return simple_past;
    }

    private String parse_present_participle(String verb) {
        String line;
        for (int j = 0; j < _wiktionaryPages.length; j++) {
            Vector lines = _wiktionaryPages[j].lines;
            for (int k = 0; k < lines.size(); k++) {
                line = (String) lines.get(k);

                Matcher matcherBegin2 = null;
                Pattern patternBegin2 = Pattern.compile(verb + "ing");
                matcherBegin2 = patternBegin2.matcher(line);
                if (matcherBegin2 != null && matcherBegin2.find()) {
                    return verb + "ing";
                }
            }
        }
        return null;
    }

    private String[] get_present_participle(String verb) {
        String[] present_participle = new String[1];

        if (verb.equals("be")) {
            present_participle[0] = "being";
            return present_participle;
        }

        char lastChar = verb.charAt(verb.length() - 1);
        char beforeLastChar = ' ';
        char beforebeforeLastChar = ' ';
        if (verb.length() >= 2) {
            beforeLastChar = verb.charAt(verb.length() - 2);
        }
        if (verb.length() >= 3) {
            beforebeforeLastChar = verb.charAt(verb.length() - 3);
        }
        // verbs that end ie add d
        if (beforeLastChar == 'i' && lastChar == 'e') {
            String verb_less_y = "";
            for (int i = 0; i < verb.length(); i++) {
                if (i != verb.length() - 1 && i != verb.length() - 2) {
                    verb_less_y = verb_less_y + verb.charAt(i);
                }
            }
            present_participle = new String[1];
            present_participle[0] = verb_less_y + "ying";
            return present_participle;
            // verbs that end two vowel and a  consonants add ??? (my god!)
        } else if (checkVowel(beforebeforeLastChar) && checkVowel(beforeLastChar) && !checkVowel(lastChar)) {
            present_participle[0] = verb + "ing";
            return present_participle;
            // verbs that end two consonants add ing
        } else if (!checkVowel(beforeLastChar) && !checkVowel(lastChar)) {
            present_participle[0] = verb + "ing";
            return present_participle;
            // verbs that end a vowel and a  consonants add ??? (my god!)
        } else if (checkVowel(beforeLastChar) && !checkVowel(lastChar)) {
            present_participle[0] = parse_present_participle(verb);
            if (present_participle[0] == null) {
                present_participle[0] = "???";
                System.err.println("get_present_participle: cannot get present participle for " + verb);
            }
            return present_participle;
            // verbs that end a or e add ing
        } else if (lastChar == 'e' || lastChar == 'a') {
            String verb_less_y = "";
            for (int i = 0; i < verb.length(); i++) {
                if (i != verb.length() - 1) {
                    verb_less_y = verb_less_y + verb.charAt(i);
                }
            }
            present_participle[0] = verb_less_y + "ing";
            return present_participle;
            // verbs that end x or e add w
        } else if (lastChar == 'x' || lastChar == 'w') {
            present_participle[0] = verb + "ing";
            return present_participle;
            // verbs that end y and preceded by consonant add ing
        } else if (checkVowel(beforeLastChar) && lastChar == 'y') {
            present_participle[0] = verb + "ing";
            return present_participle;
            // verbs that end y and preceded by vowel add ied
        } else if (!checkVowel(beforeLastChar) && lastChar == 'y') {
            present_participle[0] = verb + "ing";
            return present_participle;
        } else {
            present_participle[0] = verb + "ing";
            return present_participle;
        }
    }

    private void resetViktionaryFlag() {
        findLetter = false;
        findWord = false;
        findEnglish = false;
        findNoun = false;
        findAdjective = false;
        findNominal_adjective = false;
        findPlural = false;
        findComparative = false;
        findSuperlative = false;

        findVerb = false;
        findTransitive_Verb = false;
        findInTransitive_Verb = false;
        findForm_Verb = false;
        findCopularVerb = false;
        findVerbalNoun = false;
        findPhrasal_Verb = false;

        findConjunction = false;
        findAdverb = false;
        findPreposition = false;
        findTranslation = false;
        findDerived_term = false;
        findSynonym = false;
        Derived_term = false;
        findAntonym = false;
        findHomophone = false;
        findRelated_phrase = false;
        findRelated_terms = false;
        findSee_also = false;
        findExternal_link = false;
        findEtymology = false;
        findPronunciation = false;
        findTranslations_to_be_categorized = false;
        findTranslations_to_be_checked = false;
        findIdioms = false;
        findUsage_Note = false;
        findIndefinite_article = false;
        findPronoun = false;
        findPersonal_pronoun = false;
        findInflection = false;
        findSymbol = false;
        findTranslingual = false;
        findQuotation = false;
        findProper_noun = false;
        findRelated_words = false;
        findCardinal_number = false;
        findInterjection = false;
        findNote = false;
        findExpressions = false;
        findAuxiliary = false;
        findCopularVerb = false;
        findIntensifier = false;
        findQuotations = false;
        findVerb_phrase = false;
    }

    /**
     * @param word
     * @return true is char found in alphabet.
     */
    private boolean checkAlphabet(String word) {
        boolean findExtraChar = false;
        String alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZÀàÂâÇçÉéÈèÊêËëÎîÏïŒœÔôÖöÙùÛûÜüŸÿ-.";
        for (int j = 0; j < word.length(); j++) {
            findExtraChar = true;
            for (int i = 0; i < alphabet.length(); i++) {
                if (alphabet.charAt(i) == word.charAt(j)) {
                    findExtraChar = false;
                }
            }
            if (findExtraChar) {
                System.out.println("----found extra Char for:" + word);
                return false;
            }
        }
        return true;
    }

    /**
     * Split and create wiktionary dictionary according first word letter.
     */
    public void create() {

        BufferedReader reader = null;
        String readLine = null;
        String line = null;
        String filename = null;
        try {
            // Read original gz file from wiktionary
            filename = _contextPath.getDefaultPath() + "data\\wiktionary\\english\\pages_current.xml.gz";
            reader = new BufferedReader(new InputStreamReader(new GZIPInputStream(new FileInputStream(filename))));
        } catch (Exception e) {
            System.err.println(e.getMessage());
            return;
        }

        String bexiWord = null;

        try {

            int count = 0;
            int countLine = 0;
            while (reader.ready()) {

                try {
                    readLine = reader.readLine();
                    countLine++;
                    //System.out.println(readLine);
                    // Remove special charater from line
                    line = readLine.replaceAll("\\[|\\]|\\]|\\(|\\)|\\'", "");
                    Matcher matcherBegin1 = null;
                    Pattern patternBegin1 = Pattern.compile("<title>");
                    matcherBegin1 = patternBegin1.matcher(line);
                    if (matcherBegin1 != null && matcherBegin1.find()) {

                        resetViktionaryFlag();
                        newPage = true;
                        findLanguage = false;
                        try {
                            bexiWord = line.replaceAll("<title>|</title>", "").trim();
                        } catch (Exception e) {
                            System.err.println(e.getMessage() + " for " + bexiWord + " :" + readLine);
                        }
                        // Remove all word with numeric or special character
                        Pattern patternBadWord = Pattern.compile("wiktionary|Wiktionary");
                        Matcher matcherBadWord = patternBadWord.matcher(bexiWord);
                        if (matcherBadWord.find()) {
                            newPage = false;
                            System.out.println("line:" + countLine + "  " + "bad word " + bexiWord + " number=" + count++);
                        } else {
                            if ((bexiWord.charAt(0) >= 'a' && bexiWord.charAt(0) <= 'z') || (bexiWord.charAt(0) >= 'A' && bexiWord.charAt(0) <= 'Z')) {
                                if (checkAlphabet(bexiWord)) {
                                    newPage = true;
                                    System.out.println("line:" + countLine + "  " + "word " + bexiWord + " number=" + count++);
                                } else {
                                    newPage = false;
                                    System.out.println("line:" + countLine + "  " + "bad word " + bexiWord + " number=" + count++);
                                }
                            } else {
                                newPage = false;
                                System.out.println("line:" + countLine + "  " + "bad word " + bexiWord + " number=" + count++);
                            }
                        }
                    }
                    if (bexiWord != null && newPage) {
                        String filenameTmp = _contextPath.getDefaultPath() + "data\\wiktionary\\english\\" + bexiWord.charAt(0) + "_allWiktionary.txt";
                        save(filenameTmp.toLowerCase(), readLine + "\n", true);
                    }
                } catch (Exception e) {
                    System.err.println(e.getMessage() + " for " + readLine);
                    newPage = false;
                }
            }
            reader.close();
        } catch (Exception e) {
            System.err.println(e.getMessage() + " for " + readLine);
        }
    }

    private Vector getDataWord() throws Exception {
        String bexiWord = null;
        String bexiInflexion = null;
        String bexiClass = null;
        String line = null;
        Vector wiktionaryWords = new Vector();
        WiktionaryEnglishWord currentWord = null;

        for (int j = 0; j < _wiktionaryPages.length; j++) {
            Vector lines = _wiktionaryPages[j].lines;
            for (int k = 0; k < lines.size(); k++) {
                line = (String) lines.get(k);

                Matcher matcherBegin2 = null;
                Pattern patternBegin2 = Pattern.compile("<title>" + _words[j] + "</title>");
                matcherBegin2 = patternBegin2.matcher(line);
                if (matcherBegin2 != null && matcherBegin2.find()) {
                    resetViktionaryFlag();
                    newPage = true;
                    findLanguage = false;
                    bexiWord = _words[j].trim();
                    bexiInflexion = bexiWord;
                    //System.err.println(line);
                }
                Pattern patternTag = Pattern.compile("==");
                Matcher matcherTag = patternTag.matcher(line.replaceAll(" ", "").toLowerCase());

                Pattern patternEnglish = Pattern.compile("=english");
                Matcher matcherEnglish = patternEnglish.matcher(line.replaceAll(" ", "").toLowerCase());

                Pattern patternLetter = Pattern.compile("=letter");
                Matcher matcherLetter = patternLetter.matcher(line.replaceAll(" ", "").toLowerCase());

                Pattern patternNoun = Pattern.compile("=noun");
                Matcher matcherNoun = patternNoun.matcher(line.replaceAll(" ", "").toLowerCase());


                Pattern patternProper_noun = Pattern.compile("=propernoun|=propername");
                Matcher matcherProper_noun = patternProper_noun.matcher(line.replaceAll(" ", "").toLowerCase());

                Pattern patternPronoun = Pattern.compile("=pronoun");
                Matcher matcherPronoun = patternPronoun.matcher(line.replaceAll(" ", "").toLowerCase());

                Pattern patternPersonal_pronoun = Pattern.compile("=personalpronoun");
                Matcher matcherPersonal_pronoun = patternPersonal_pronoun.matcher(line.replaceAll(" ", "").toLowerCase());

                Pattern patternAdjective = Pattern.compile("=adjective");
                Matcher matcherAdjective = patternAdjective.matcher(line.replaceAll(" ", "").toLowerCase());

                Pattern patternNominal_adjective = Pattern.compile("=nominaladjective");
                Matcher matcherNominal_adjective = patternNominal_adjective.matcher(line.replaceAll(" ", "").toLowerCase());


                Pattern patternIndefinite_article = Pattern.compile("=indefinitearticle");
                Matcher matcherIndefinite_article = patternIndefinite_article.matcher(line.replaceAll(" ", "").toLowerCase());

                Pattern patternWord = Pattern.compile(bexiWord);
                Matcher matcherWord = patternWord.matcher(line);
                Pattern patternPlural = Pattern.compile("plural");
                Matcher matcherPlural = patternPlural.matcher(line);
                Pattern patternComparative = Pattern.compile("comparative");
                Matcher matcherComparative = patternComparative.matcher(line.replaceAll(" ", "").toLowerCase());
                Pattern patternSuperlative = Pattern.compile("superlative");
                Matcher matcherSuperlative = patternSuperlative.matcher(line.replaceAll(" ", "").toLowerCase());

                Pattern patternVerb = Pattern.compile("=verb");
                Matcher matcherVerb = patternVerb.matcher(line.replaceAll(" ", "").toLowerCase());
                Pattern patternVerbForm = Pattern.compile("=verbform");
                Matcher matcherVerbForm = patternVerbForm.matcher(line.replaceAll(" ", "").toLowerCase());
                Pattern patternGerondif1 = Pattern.compile(bexiWord + "ing");
                Matcher matcherGerondif1 = patternGerondif1.matcher(line);
                Pattern patternGerondif2 = Pattern.compile(bexiWord + bexiWord.charAt(bexiWord.length() - 1) + "ing");
                Matcher matcherGerondif2 = patternGerondif2.matcher(line);

                Pattern patternFormVerb = Pattern.compile("=verbform|=formverb");
                Matcher matcherFormVerb = patternFormVerb.matcher(line.replaceAll(" ", "").toLowerCase());

                Pattern patternVerbPhrase = Pattern.compile("=verbphrase");
                Matcher matcherVerbPhrase = patternVerbPhrase.matcher(line.replaceAll(" ", "").toLowerCase());

                Pattern patternPhrasalVerb = Pattern.compile("=phrasalverb");
                Matcher matcherPhrasalVerb = patternPhrasalVerb.matcher(line.replaceAll(" ", "").toLowerCase());

                Pattern patternTransitivePhrasalVerb = Pattern.compile("=transitivephrasalverb");
                Matcher matcherTransitivePhrasalVerb = patternTransitivePhrasalVerb.matcher(line.replaceAll(" ", "").toLowerCase());

                Pattern patternIntransitivePhrasalVerb = Pattern.compile("=intransitivephrasalverb");
                Matcher matcherIntransitivePhrasalVerb = patternIntransitivePhrasalVerb.matcher(line.replaceAll(" ", "").toLowerCase());

                Pattern patternTransitive_Verb = Pattern.compile("=transitiveverb|=transitive");
                Matcher matcherTransitive_Verb = patternTransitive_Verb.matcher(line.replaceAll(" ", "").toLowerCase());

                Pattern patternIntransitive_verb = Pattern.compile("=intransitiveverb|=intransitive");
                Matcher matcherIntransitive_verb = patternIntransitive_verb.matcher(line.replaceAll(" ", "").toLowerCase());

                Pattern patternAuxiliary = Pattern.compile("=auxiliary|=auxiliaryverb");
                Matcher matcherAuxiliary = patternAuxiliary.matcher(line.replaceAll(" ", "").toLowerCase());

                Pattern patternCopular_verb = Pattern.compile("=copularverb|copular");
                Matcher matcherCopular_verb = patternCopular_verb.matcher(line.replaceAll(" ", "").toLowerCase());

                Pattern patternPreposition = Pattern.compile("=preposition");
                Matcher matcherPreposition = patternPreposition.matcher(line.replaceAll(" ", "").toLowerCase());

                Pattern patternConjunction = Pattern.compile("=conjunction");
                Matcher matcherConjunction = patternConjunction.matcher(line.replaceAll(" ", "").toLowerCase());

                Pattern patternAdverb = Pattern.compile("=adverb");
                Matcher matcherAdverb = patternAdverb.matcher(line.replaceAll(" ", "").toLowerCase());

                Pattern patternVerbalNoun = Pattern.compile("=verbalnoun");
                Matcher matcherVerbalNoun = patternVerbalNoun.matcher(line.replaceAll(" ", "").toLowerCase());

                Pattern patternTranslation = Pattern.compile("=translation");
                Matcher matcherTranslation = patternTranslation.matcher(line.replaceAll(" ", "").toLowerCase());

                Pattern patternSynonyms = Pattern.compile("=synonym");
                Matcher matcherSynonyms = patternSynonyms.matcher(line.replaceAll(" ", "").toLowerCase());

                Pattern patternAntonyms = Pattern.compile("=antonym");
                Matcher matcherAntonyms = patternAntonyms.matcher(line.replaceAll(" ", "").toLowerCase());

                Pattern patternHomophones = Pattern.compile("=homophone");
                Matcher matcherHomophones = patternHomophones.matcher(line.replaceAll(" ", "").toLowerCase());

                Pattern patternIdiom = Pattern.compile("=idiom");
                Matcher matcherIdiom = patternIdiom.matcher(line.replaceAll(" ", "").toLowerCase());

                Pattern patternDerived_term = Pattern.compile("=derivedterm");
                Matcher matcherDerived_term = patternDerived_term.matcher(line.replaceAll(" ", "").toLowerCase());

                Pattern patternRelated_phrase = Pattern.compile("=relatedphrase");
                Matcher matcherRelated_phrase = patternRelated_phrase.matcher(line.replaceAll(" ", "").toLowerCase().toLowerCase());

                Pattern patternEtymology = Pattern.compile("=etymology");
                Matcher matcherEtymology = patternEtymology.matcher(line.replaceAll(" ", "").toLowerCase());

                Pattern patternInflection = Pattern.compile("=inflection");
                Matcher matcherInflection = patternInflection.matcher(line.replaceAll(" ", "").toLowerCase());

                Pattern patternSymbol = Pattern.compile("=symbol");
                Matcher matcherSymbol = patternSymbol.matcher(line.replaceAll(" ", "").toLowerCase());

                Pattern patternRelated_words = Pattern.compile("=relatedword");
                Matcher matcherRelated_words = patternRelated_words.matcher(line.replaceAll(" ", "").toLowerCase());

                Pattern patternRelated_terms = Pattern.compile("=relatedterm");
                Matcher matcherRelated_terms = patternRelated_terms.matcher(line.replaceAll(" ", "").toLowerCase());

                Pattern patternPronunciation = Pattern.compile("=pronunciation");
                Matcher matcherPronunciation = patternPronunciation.matcher(line.replaceAll(" ", "").toLowerCase());

                Pattern patternCardinal_number = Pattern.compile("=cardinalnumber");
                Matcher matcherCardinal_number = patternCardinal_number.matcher(line.replaceAll(" ", "").toLowerCase());

                Pattern patternSee_also = Pattern.compile("=seealso");
                Matcher matcherSee_also = patternSee_also.matcher(line.replaceAll(" ", "").toLowerCase());

                Pattern patternInterjection = Pattern.compile("=interjection");
                Matcher matcherInterjection = patternInterjection.matcher(line.replaceAll(" ", "").toLowerCase());

                Pattern patternNote = Pattern.compile("=note|=usagenote");
                Matcher matcherNote = patternNote.matcher(line.replaceAll(" ", "").toLowerCase());

                Pattern patternExpressions = Pattern.compile("=expression");
                Matcher matcherExpressions = patternExpressions.matcher(line.replaceAll(" ", "").toLowerCase());

                Pattern patternIntensifier = Pattern.compile("=intensifier");
                Matcher matcherIntensifier = patternIntensifier.matcher(line.replaceAll(" ", "").toLowerCase());

                Pattern patternQuotations = Pattern.compile("=quotations");
                Matcher matcherQuotations = patternQuotations.matcher(line.replaceAll(" ", "").toLowerCase());

                Pattern patternLanguage = Pattern.compile("==betawi|==balinese|==hawaiian|==maori|==anglosaxon|==bulgarian|==corsican|==danish|==deutsch|==german|==spanish|==estonian|==suomeksi|==finnish|==french|==galician|==hebrew|==hindi|==magyar|==hungarian|==italian|==japanese|==korean|==kurdish|==latin|==nederlands|==dutch|==norwegian|==polish|==portuguese|==russian|==sicilian|==slovenian|==swedish|==chinese|==turkish|=arabic|==bosnian|==catalan|==cesky|==czech|==greek|==esperanto|==gujarati|==croatian|==icelandic|==lowsaxon|==romanian|==serbian|==thai|==vietnamese|==ukrainian");
                Matcher matcherLanguage = patternLanguage.matcher(line.replaceAll(" ", "").toLowerCase());

                Pattern patternDefinitions = Pattern.compile("#");
                Matcher matcherDefinitions = patternDefinitions.matcher(line.replaceAll(" ", "").toLowerCase());
                Pattern patternDefinitionsEx = Pattern.compile("#:");
                Matcher matcherDefinitionsEx = patternDefinitionsEx.matcher(line.replaceAll(" ", "").toLowerCase());

                if (matcherTag.find()) {
                    resetViktionaryFlag();
                    findNewTag = true;
                }
                if (matcherEnglish.find()) {
                    resetViktionaryFlag();
                    findEnglish = true;
                } else if (matcherLetter.find() && !findLanguage) {
                    resetViktionaryFlag();
                    bexiClass = WiktionaryEnglishWord.LETTER;

                    currentWord = new WiktionaryEnglishWord();
                    currentWord.set_name(_words[j]);
                    currentWord.set_classe(bexiClass);
                    wiktionaryWords.add(currentWord);

                    findLetter = true;
                    bexiInflexion = bexiWord;
                    //System.out.println(bexiInflexion + "\t" + bexiWord + "\t" + bexiClass);
                    currentWord.getInflectionsAndClass().add(bexiInflexion + "\t" + bexiWord + "\t" + bexiClass);
                } else if (matcherNoun.find() && !findLanguage) {
                    resetViktionaryFlag();
                    bexiClass = WiktionaryEnglishWord.NOUN;

                    currentWord = new WiktionaryEnglishWord();
                    currentWord.set_name(_words[j]);
                    currentWord.set_classe(bexiClass);
                    wiktionaryWords.add(currentWord);

                    findNoun = true;
                    bexiInflexion = bexiWord;
                    //System.out.println(bexiInflexion + "\t" + bexiWord + "\t" + bexiClass);
                    currentWord.getInflectionsAndClass().add(bexiInflexion + "\t" + bexiWord + "\t" + bexiClass);
                } else if (matcherProper_noun.find() && !findLanguage) {
                    resetViktionaryFlag();
                    bexiClass = WiktionaryEnglishWord.PROPER_NOUN;

                    currentWord = new WiktionaryEnglishWord();
                    currentWord.set_name(_words[j]);
                    currentWord.set_classe(bexiClass);
                    wiktionaryWords.add(currentWord);

                    findProper_noun = true;
                    bexiInflexion = bexiWord;
                    //System.out.println(bexiInflexion + "\t" + bexiWord + "\t" + bexiClass);
                    currentWord.getInflectionsAndClass().add(bexiInflexion + "\t" + bexiWord + "\t" + bexiClass);
                } else if (matcherPronoun.find() && !findLanguage) {
                    resetViktionaryFlag();
                    bexiClass = WiktionaryEnglishWord.PRONOUN;
                    currentWord = new WiktionaryEnglishWord();
                    currentWord.set_name(_words[j]);
                    currentWord.set_classe(bexiClass);
                    wiktionaryWords.add(currentWord);
                    findPronoun = true;
                    bexiInflexion = bexiWord;
                    //System.out.println(bexiInflexion + "\t" + bexiWord + "\t" + bexiClass);
                    if (WiktionaryEnglishWord.get_nominative_pronoun(bexiWord)) {
                        currentWord.getInflectionsAndClass().add(bexiInflexion + "\t" + bexiWord + "\t" + WiktionaryEnglishWord.NOMINATIVE_PRONOUN);
                    }
                    if (WiktionaryEnglishWord.get_reflexive_pronoun(bexiWord)) {
                        currentWord.getInflectionsAndClass().add(bexiInflexion + "\t" + bexiWord + "\t" + WiktionaryEnglishWord.REFLEXIVE_PRONOUN);
                    }
                    if (WiktionaryEnglishWord.get_accusative_pronoun(bexiWord)) {
                        currentWord.getInflectionsAndClass().add(bexiInflexion + "\t" + bexiWord + "\t" + WiktionaryEnglishWord.ACCUSATIVE_PRONOUN);
                    }
                    if (WiktionaryEnglishWord.get_personal_pronoun(bexiWord)) {
                        currentWord.getInflectionsAndClass().add(bexiInflexion + "\t" + bexiWord + "\t" + WiktionaryEnglishWord.PERSONAL_PRONOUN);
                    }
                    if (WiktionaryEnglishWord.get_plural_first_person_pronoun(bexiWord)) {
                        currentWord.getInflectionsAndClass().add(bexiInflexion + "\t" + bexiWord + "\t" + WiktionaryEnglishWord.PERSONAL_PRONOUN + ":" + WiktionaryEnglishWord.PLURAL_FIRST_PERSON);
                    }
                    if (WiktionaryEnglishWord.get_plural_second_person_pronoun(bexiWord)) {
                        currentWord.getInflectionsAndClass().add(bexiInflexion + "\t" + bexiWord + "\t" + WiktionaryEnglishWord.PERSONAL_PRONOUN + ":" + WiktionaryEnglishWord.PLURAL_SECOND_PERSON);
                    }
                    if (WiktionaryEnglishWord.get_plural_third_person_pronoun(bexiWord)) {
                        currentWord.getInflectionsAndClass().add(bexiInflexion + "\t" + bexiWord + "\t" + WiktionaryEnglishWord.PERSONAL_PRONOUN + ":" + WiktionaryEnglishWord.PLURAL_THIRD_PERSON);
                    }
                    if (WiktionaryEnglishWord.get_singular_first_person_pronoun(bexiWord)) {
                        currentWord.getInflectionsAndClass().add(bexiInflexion + "\t" + bexiWord + "\t" + WiktionaryEnglishWord.PERSONAL_PRONOUN + ":" + WiktionaryEnglishWord.SINGULAR_FIRST_PERSON);
                    }
                    if (WiktionaryEnglishWord.get_singular_second_person_pronoun(bexiWord)) {
                        currentWord.getInflectionsAndClass().add(bexiInflexion + "\t" + bexiWord + "\t" + WiktionaryEnglishWord.PERSONAL_PRONOUN + ":" + WiktionaryEnglishWord.SINGULAR_SECOND_PERSON);
                    }
                    if (WiktionaryEnglishWord.get_singular_third_person_pronoun(bexiWord)) {
                        currentWord.getInflectionsAndClass().add(bexiInflexion + "\t" + bexiWord + "\t" + WiktionaryEnglishWord.PRONOUN + ":" + WiktionaryEnglishWord.SINGULAR_THIRD_PERSON);
                    }
                    if (WiktionaryEnglishWord.get_relative_pronouns(bexiWord)) {
                        currentWord.getInflectionsAndClass().add(bexiInflexion + "\t" + bexiWord + "\t" + WiktionaryEnglishWord.RELATIVE_PRONOUN);
                    }
                } else if (matcherPersonal_pronoun.find() && !findLanguage) {
                    resetViktionaryFlag();
                    bexiClass = WiktionaryEnglishWord.PERSONAL_PRONOUN;
                    currentWord = new WiktionaryEnglishWord();
                    currentWord.set_name(_words[j]);
                    currentWord.set_classe(bexiClass);
                    wiktionaryWords.add(currentWord);

                    findPersonal_pronoun = true;
                    bexiInflexion = bexiWord;
                    // System.out.println(bexiInflexion + "\t" + bexiWord + "\t" + bexiClass);
                    if (WiktionaryEnglishWord.get_nominative_pronoun(bexiWord)) {
                        currentWord.getInflectionsAndClass().add(bexiInflexion + "\t" + bexiWord + "\t" + WiktionaryEnglishWord.NOMINATIVE_PRONOUN);
                    }
                    if (WiktionaryEnglishWord.get_reflexive_pronoun(bexiWord)) {
                        currentWord.getInflectionsAndClass().add(bexiInflexion + "\t" + bexiWord + "\t" + WiktionaryEnglishWord.REFLEXIVE_PRONOUN);
                    }
                    if (WiktionaryEnglishWord.get_accusative_pronoun(bexiWord)) {
                        currentWord.getInflectionsAndClass().add(bexiInflexion + "\t" + bexiWord + "\t" + WiktionaryEnglishWord.ACCUSATIVE_PRONOUN);
                    }
                    if (WiktionaryEnglishWord.get_personal_pronoun(bexiWord)) {
                        currentWord.getInflectionsAndClass().add(bexiInflexion + "\t" + bexiWord + "\t" + WiktionaryEnglishWord.PERSONAL_PRONOUN);
                    }
                    if (WiktionaryEnglishWord.get_plural_first_person_pronoun(bexiWord)) {
                        currentWord.getInflectionsAndClass().add(bexiInflexion + "\t" + bexiWord + "\t" + WiktionaryEnglishWord.PERSONAL_PRONOUN + ":" + WiktionaryEnglishWord.PLURAL_FIRST_PERSON);
                    }
                    if (WiktionaryEnglishWord.get_plural_second_person_pronoun(bexiWord)) {
                        currentWord.getInflectionsAndClass().add(bexiInflexion + "\t" + bexiWord + "\t" + WiktionaryEnglishWord.PERSONAL_PRONOUN + ":" + WiktionaryEnglishWord.PLURAL_SECOND_PERSON);
                    }
                    if (WiktionaryEnglishWord.get_plural_third_person_pronoun(bexiWord)) {
                        currentWord.getInflectionsAndClass().add(bexiInflexion + "\t" + bexiWord + "\t" + WiktionaryEnglishWord.PERSONAL_PRONOUN + ":" + WiktionaryEnglishWord.PLURAL_THIRD_PERSON);
                    }
                    if (WiktionaryEnglishWord.get_singular_first_person_pronoun(bexiWord)) {
                        currentWord.getInflectionsAndClass().add(bexiInflexion + "\t" + bexiWord + "\t" + WiktionaryEnglishWord.PERSONAL_PRONOUN + ":" + WiktionaryEnglishWord.SINGULAR_FIRST_PERSON);
                    }
                    if (WiktionaryEnglishWord.get_singular_second_person_pronoun(bexiWord)) {
                        currentWord.getInflectionsAndClass().add(bexiInflexion + "\t" + bexiWord + "\t" + WiktionaryEnglishWord.PERSONAL_PRONOUN + ":" + WiktionaryEnglishWord.SINGULAR_SECOND_PERSON);
                    }
                    if (WiktionaryEnglishWord.get_singular_third_person_pronoun(bexiWord)) {
                        currentWord.getInflectionsAndClass().add(bexiInflexion + "\t" + bexiWord + "\t" + WiktionaryEnglishWord.PRONOUN + ":" + WiktionaryEnglishWord.SINGULAR_THIRD_PERSON);
                    }
                    if (WiktionaryEnglishWord.get_relative_pronouns(bexiWord)) {
                        currentWord.getInflectionsAndClass().add(bexiInflexion + "\t" + bexiWord + "\t" + WiktionaryEnglishWord.RELATIVE_PRONOUN);
                    }
                } else if (matcherAdjective.find() && !findLanguage) {
                    resetViktionaryFlag();
                    bexiClass = WiktionaryEnglishWord.ADJECTIVE;

                    currentWord = new WiktionaryEnglishWord();
                    currentWord.set_name(_words[j]);
                    currentWord.set_classe(bexiClass);
                    wiktionaryWords.add(currentWord);

                    findAdjective = true;
                    bexiInflexion = bexiWord;
                    //System.out.println(bexiInflexion + "\t" + bexiWord + "\t" + bexiClass);
                    currentWord.getInflectionsAndClass().add(bexiInflexion + "\t" + bexiWord + "\t" + bexiClass);
                } else if (matcherNominal_adjective.find() && !findLanguage) {
                    resetViktionaryFlag();
                    bexiClass = WiktionaryEnglishWord.NOMINAL_ADJECTIVE;

                    currentWord = new WiktionaryEnglishWord();
                    currentWord.set_name(_words[j]);
                    currentWord.set_classe(bexiClass);
                    wiktionaryWords.add(currentWord);

                    findNominal_adjective = true;
                    bexiInflexion = bexiWord;
                    //System.out.println(bexiInflexion + "\t" + bexiWord + "\t" + bexiClass);
                    currentWord.getInflectionsAndClass().add(bexiInflexion + "\t" + bexiWord + "\t" + bexiClass);
                } else if (matcherIndefinite_article.find() && !findLanguage) {
                    resetViktionaryFlag();
                    bexiClass = WiktionaryEnglishWord.ARTICLE;

                    currentWord = new WiktionaryEnglishWord();
                    currentWord.set_name(_words[j]);
                    currentWord.set_classe(bexiClass);
                    wiktionaryWords.add(currentWord);

                    findIndefinite_article = true;
                    // Exception  a an
                    if (bexiWord.equals("an")) {
                        //System.out.println(bexiWord + "\t" + "a" + "\t" + bexiClass);
                        currentWord.getInflectionsAndClass().add(bexiWord + "\t" + "a" + "\t" + bexiClass);
                    } else {
                        //System.out.println(bexiWord + "\t" + bexiWord + "\t" + bexiClass);
                        currentWord.getInflectionsAndClass().add(bexiWord + "\t" + bexiWord + "\t" + bexiClass);
                    }

                } else if (matcherPlural.find() && matcherWord.find() && !findLanguage) {
                    resetViktionaryFlag();
                    findPlural = true;
                    // find from bexi database
                    String[] plurals = null;
                    if ((plurals = get_plural_noun(bexiWord, line)) != null) {
                        for (int i = 0; i < plurals.length; i++) {
                            //System.out.println(plurals[0] + "\t" + bexiWord + "\t" + bexiClass + ":"+WiktionaryEnglishWord.PLURAL);
                            currentWord.getInflectionsAndClass().add(plurals[0] + "\t" + bexiWord + "\t" + bexiClass + ":" + WiktionaryEnglishWord.PLURAL);
                        }
                    }
                } else if (matcherVerbPhrase.find() && !findLanguage) {
                    resetViktionaryFlag();
                    bexiClass = WiktionaryEnglishWord.VERB;

                    currentWord = new WiktionaryEnglishWord();
                    currentWord.set_name(_words[j]);
                    currentWord.set_classe(bexiClass);
                    currentWord.set_subClasse("verb phrase");
                    wiktionaryWords.add(currentWord);

                    String verbTmp = bexiWord.replaceFirst(" ", ";");
                    String[] root = verbTmp.split(";");
                    String[] inflections;
                    if (root.length == 2) {
                        inflections = lookForVerbInflection(root[0], " " + root[1], "verb phrase");
                        for (int i = 0; i < inflections.length; i++) {
                            //System.out.println(inflections[i]);
                            currentWord.getInflectionsAndClass().add(inflections[i]);
                        }
                    }
                } else if (matcherIntransitivePhrasalVerb.find() && !findLanguage) {
                    resetViktionaryFlag();
                    bexiClass = WiktionaryEnglishWord.VERB;

                    currentWord = new WiktionaryEnglishWord();
                    currentWord.set_name(_words[j]);
                    currentWord.set_classe(bexiClass);
                    currentWord.set_subClasse("intransitive phrasal");
                    wiktionaryWords.add(currentWord);

                    findVerb = true;
                    String verbTmp = bexiWord.replaceFirst(" ", ";");
                    String[] root = verbTmp.split(";");
                    String[] inflections;
                    if (root.length == 2) {
                        inflections = lookForVerbInflection(root[0], " " + root[1], "intransitive phrasal");
                        for (int i = 0; i < inflections.length; i++) {
                            //System.out.println(inflections[i]);
                            currentWord.getInflectionsAndClass().add(inflections[i]);
                        }
                    }
                } else if (matcherTransitivePhrasalVerb.find() && !findLanguage) {
                    resetViktionaryFlag();
                    bexiClass = WiktionaryEnglishWord.VERB;

                    currentWord = new WiktionaryEnglishWord();
                    currentWord.set_name(_words[j]);
                    currentWord.set_classe(bexiClass);
                    currentWord.set_subClasse("transitive phrasal");
                    wiktionaryWords.add(currentWord);

                    findVerb = true;
                    String verbTmp = bexiWord.replaceFirst(" ", ";");
                    String[] root = verbTmp.split(";");
                    String[] inflections;
                    if (root.length == 2) {
                        inflections = lookForVerbInflection(root[0], " " + root[1], "transitive phrasal");
                        for (int i = 0; i < inflections.length; i++) {
                            //System.out.println(inflections[i]);
                            currentWord.getInflectionsAndClass().add(inflections[i]);
                        }
                    }
                } else if (matcherPhrasalVerb.find() && !findLanguage) {
                    resetViktionaryFlag();
                    bexiClass = WiktionaryEnglishWord.VERB;

                    currentWord = new WiktionaryEnglishWord();
                    currentWord.set_name(_words[j]);
                    currentWord.set_classe(bexiClass);
                    currentWord.set_subClasse("phrasal");
                    wiktionaryWords.add(currentWord);

                    findVerb = true;
                    String verbTmp = bexiWord.replaceFirst(" ", ";");
                    String[] root = verbTmp.split(";");
                    String[] inflections;
                    if (root.length == 2) {
                        inflections = lookForVerbInflection(root[0], " " + root[1], "phrasal");
                        for (int i = 0; i < inflections.length; i++) {
                            //System.out.println(inflections[i]);
                            currentWord.getInflectionsAndClass().add(inflections[i]);
                        }
                    }
                } else if (matcherCopular_verb.find() && !findLanguage) {
                    resetViktionaryFlag();
                    bexiClass = WiktionaryEnglishWord.VERB;

                    currentWord = new WiktionaryEnglishWord();
                    currentWord.set_name(_words[j]);
                    currentWord.set_classe(bexiClass);
                    currentWord.set_subClasse("copular");
                    wiktionaryWords.add(currentWord);

                    findVerb = true;
                    String[] inflections = lookForVerbInflection(bexiWord, "", "copular");
                    for (int i = 0; i < inflections.length; i++) {
                        //System.out.println(inflections[i]);
                        currentWord.getInflectionsAndClass().add(inflections[i]);
                    }
                } else if (matcherIntransitive_verb.find() && !findLanguage) {
                    resetViktionaryFlag();
                    bexiClass = WiktionaryEnglishWord.VERB;

                    currentWord = new WiktionaryEnglishWord();
                    currentWord.set_name(_words[j]);
                    currentWord.set_classe(bexiClass);
                    currentWord.set_subClasse("intransitive");
                    wiktionaryWords.add(currentWord);

                    String verbTmp = bexiWord.replaceFirst(" ", ";");
                    String[] root = verbTmp.split(";");
                    String[] inflections;
                    if (root.length == 2) {
                        inflections = lookForVerbInflection(root[0], " " + root[1], "intransitive");
                    } else {
                        inflections = lookForVerbInflection(root[0], "", "intransitive");
                    }
                    for (int i = 0; i < inflections.length; i++) {
                        //System.out.println(inflections[i]);
                        currentWord.getInflectionsAndClass().add(inflections[i]);
                    }
                } else if (matcherAuxiliary.find() && !findLanguage) {
                    resetViktionaryFlag();
                    bexiClass = WiktionaryEnglishWord.VERB;

                    currentWord = new WiktionaryEnglishWord();
                    currentWord.set_name(_words[j]);
                    currentWord.set_classe(bexiClass);
                    currentWord.set_subClasse("auxiliary");
                    wiktionaryWords.add(currentWord);

                    findVerb = true;
                    String[] inflections = lookForVerbInflection(bexiWord, "", "auxiliary");
                    for (int i = 0; i < inflections.length; i++) {
                        // System.out.println(inflections[i]);
                        currentWord.getInflectionsAndClass().add(inflections[i]);
                    }
                } else if (matcherVerbalNoun.find() && !findLanguage) {
                    resetViktionaryFlag();
                    bexiClass = WiktionaryEnglishWord.VERBAL_NOUN;

                    currentWord = new WiktionaryEnglishWord();
                    currentWord.set_name(_words[j]);
                    currentWord.set_classe(bexiClass);
                    wiktionaryWords.add(currentWord);

                    findVerbalNoun = true;
                    //System.out.println(bexiWord + "\t" + bexiInflexion + "\t" + bexiClass);
                    currentWord.getInflectionsAndClass().add(bexiWord + "\t" + bexiInflexion + "\t" + bexiClass);
                } else if (matcherTransitive_Verb.find() && !findLanguage) {
                    resetViktionaryFlag();
                    bexiClass = WiktionaryEnglishWord.VERB;

                    currentWord = new WiktionaryEnglishWord();
                    currentWord.set_name(_words[j]);
                    currentWord.set_classe(bexiClass);
                    currentWord.set_subClasse("transitive");
                    wiktionaryWords.add(currentWord);

                    findVerb = true;
                    String verbTmp = bexiWord.replaceFirst(" ", ";");
                    String[] root = verbTmp.split(";");
                    String[] inflections;
                    if (root.length == 2) {
                        inflections = lookForVerbInflection(root[0], " " + root[1], "transitive");
                    } else {
                        inflections = lookForVerbInflection(root[0], "", "transitive");
                    }
                    for (int i = 0; i < inflections.length; i++) {
                        //System.out.println(inflections[i]);
                        currentWord.getInflectionsAndClass().add(inflections[i]);
                    }
                } else if (matcherVerb.find() && !matcherVerbForm.find() && !findLanguage) {
                    resetViktionaryFlag();
                    bexiClass = WiktionaryEnglishWord.VERB;

                    currentWord = new WiktionaryEnglishWord();
                    currentWord.set_name(_words[j]);
                    currentWord.set_classe(bexiClass);
                    wiktionaryWords.add(currentWord);

                    findVerb = true;
                    String verbTmp = bexiWord.replaceFirst(" ", ";");
                    String[] root = verbTmp.split(";");
                    String[] inflections;
                    if (root.length == 2) {
                        inflections = lookForVerbInflection(root[0], " " + root[1], "");
                    } else {
                        inflections = lookForVerbInflection(root[0], "", "");
                    }
                    for (int i = 0; i < inflections.length; i++) {
                        //System.out.println(inflections[i]);
                        currentWord.getInflectionsAndClass().add(inflections[i]);
                    }
                } else if (matcherGerondif2.find() && findVerb && !findLanguage) {
                    bexiClass = WiktionaryEnglishWord.VERB;

                    //System.out.println(bexiWord + bexiWord.charAt(bexiWord.length() - 1) + "ing" + "\t" + bexiWord + "\t" + bexiClass + ":present_participle");
                    currentWord.getInflectionsAndClass().add(bexiWord + bexiWord.charAt(bexiWord.length() - 1) + "ing" + "\t" + bexiWord + "\t" + bexiClass + ":present_participle");
                } else if (matcherGerondif1.find() && findVerb && !findLanguage) {
                    bexiClass = WiktionaryEnglishWord.VERB;

                    //System.out.println(bexiWord + "ing" + "\t" + bexiWord + "\t" + bexiClass + ":present_participle");
                    currentWord.getInflectionsAndClass().add(bexiWord + "ing" + "\t" + bexiWord + "\t" + bexiClass + ":present_participle");
                } else if (matcherPreposition.find() && !findLanguage) {
                    resetViktionaryFlag();
                    bexiClass = WiktionaryEnglishWord.PREPOSITION;

                    currentWord = new WiktionaryEnglishWord();
                    currentWord.set_name(_words[j]);
                    currentWord.set_classe(bexiClass);
                    wiktionaryWords.add(currentWord);

                    findPreposition = true;
                    //System.out.println(bexiWord + "\t" + bexiWord + "\t" + bexiClass);
                    currentWord.getInflectionsAndClass().add(bexiWord + "\t" + bexiWord + "\t" + bexiClass);
                } else if (matcherConjunction.find() && !findLanguage) {
                    resetViktionaryFlag();
                    bexiClass = WiktionaryEnglishWord.CONJUNCTION;

                    currentWord = new WiktionaryEnglishWord();
                    currentWord.set_name(_words[j]);
                    currentWord.set_classe(bexiClass);
                    wiktionaryWords.add(currentWord);

                    findConjunction = true;
                    //System.out.println(bexiWord + "\t" + bexiWord + "\t" + bexiClass);
                    currentWord.getInflectionsAndClass().add(bexiWord + "\t" + bexiWord + "\t" + bexiClass);
                } else if (matcherAdverb.find() && !findLanguage) {
                    resetViktionaryFlag();
                    bexiClass = WiktionaryEnglishWord.ADVERBE;

                    currentWord = new WiktionaryEnglishWord();
                    currentWord.set_name(_words[j]);
                    currentWord.set_classe(bexiClass);
                    wiktionaryWords.add(currentWord);

                    findAdverb = true;
                    //System.out.println(bexiWord + "\t" + bexiWord + "\t" + bexiClass);
                    currentWord.getInflectionsAndClass().add(bexiWord + "\t" + bexiWord + "\t" + bexiClass);
                } else if (matcherInterjection.find()) {
                    resetViktionaryFlag();
                    bexiClass = WiktionaryEnglishWord.INTERJECTION;

                    currentWord = new WiktionaryEnglishWord();
                    currentWord.set_name(_words[j]);
                    currentWord.set_classe(bexiClass);
                    wiktionaryWords.add(currentWord);

                    findInterjection = true;
                    bexiInflexion = bexiWord;
                    //System.out.println(bexiInflexion + "\t" + bexiWord + "\t" + bexiClass);
                    currentWord.getInflectionsAndClass().add(bexiInflexion + "\t" + bexiWord + "\t" + bexiClass);
                } else if (matcherTranslation.find() && !findLanguage) {
                    resetViktionaryFlag();
                    findTranslation = true;
                } else if (matcherSynonyms.find() && !findLanguage) {
                    resetViktionaryFlag();
                    findSynonym = true;
                } else if (matcherAntonyms.find() && !findLanguage) {
                    resetViktionaryFlag();
                    findAntonym = true;
                } else if (matcherHomophones.find() && !findLanguage) {
                    resetViktionaryFlag();
                    findHomophone = true;
                } else if (matcherIdiom.find() && !findLanguage) {
                    resetViktionaryFlag();
                    findIdioms = true;
                } else if (matcherDerived_term.find() && !findLanguage) {
                    resetViktionaryFlag();
                    findDerived_term = true;
                } else if (matcherRelated_phrase.find() && !findLanguage) {
                    resetViktionaryFlag();
                    findRelated_phrase = true;
                } else if (matcherEtymology.find() && !findLanguage) {
                    resetViktionaryFlag();
                    findEtymology = true;
                } else if (matcherInflection.find() && !findLanguage) {
                    resetViktionaryFlag();
                    findInflection = true;
                } else if (matcherSymbol.find() && !findLanguage) {
                    resetViktionaryFlag();
                    findSymbol = true;
                } else if (matcherLanguage.find()) {
                    resetViktionaryFlag();
                    findLanguage = true;
                } else if (matcherRelated_words.find()) {
                    resetViktionaryFlag();
                    findRelated_words = true;
                } else if (matcherRelated_terms.find()) {
                    resetViktionaryFlag();
                    findRelated_terms = true;
                } else if (matcherPronunciation.find()) {
                    resetViktionaryFlag();
                    findPronunciation = true;
                } else if (matcherCardinal_number.find()) {
                    resetViktionaryFlag();
                    findCardinal_number = true;
                } else if (matcherSee_also.find()) {
                    resetViktionaryFlag();
                    findSee_also = true;
                } else if (matcherIntensifier.find()) {
                    resetViktionaryFlag();
                    findIntensifier = true;
                } else if (matcherQuotations.find()) {
                    resetViktionaryFlag();
                    findQuotations = true;
                } else if (matcherExpressions.find()) {
                    resetViktionaryFlag();
                    findExpressions = true;
                } else if (matcherNote.find()) {
                    resetViktionaryFlag();
                    findNote = true;
                } else
                if ((findVerb || findNoun || findAdjective || findAdverb || findInterjection) && matcherDefinitionsEx.find()) {
                    String definitionExample = line.replaceAll("\\*|#|:|\\[|\\]|\\]|\\(|\\)|\\'", "");
                    currentWord.set_examples(definitionExample);
                    //System.err.println("Def example=" + definitionExample);
                } else
                if ((findVerb || findNoun || findAdjective || findAdverb || findInterjection) && matcherDefinitions.find()) {
                    String definition = line.replaceAll("\\*|#|:|\\[|\\]|\\]|\\(|\\)|\\'", "");
                    currentWord.set_definitions(definition);
                    //System.err.println("Def=" + definition);
                } else if (findAdjective && matcherSuperlative.find() && matcherComparative.find()) {
                    resetViktionaryFlag();
                    setSuperlative(currentWord, line);
                    setComparative(currentWord, line);
                    //System.err.println("Superlative&Comparative=" + line);
                } else if (findSynonym) {
                    setSynonyms(currentWord, line);
                } else if (findAntonym) {
                    setAntonyms(currentWord, line);
                } else if (findTranslation) {
                    setTranslations(currentWord, line);
                } else {
                    if (!findLanguage && findNewTag) {
                        System.err.println(line);
                    }
                }
                findNewTag = false;
            }
        }
        return wiktionaryWords;
    }

    /**
     * Look for each word, the Wiktionary xml page from openbexi database
     * If openbexi database doesn't exit look for Wiktionary database pages_current.xml.zip
     *
     * @param words
     * @return WiktionaryPage[]
     */
    private WiktionaryPage[] getWiktionaryPages(String[] words) {

        WiktionaryPage[] wiktionaryPages = new WiktionaryPage[words.length];
        ZipFile zipFile = null;
        ZipEntry zipEntry = null;
        BufferedReader reader = null;
        String readLine = null;
        String line = null;
        String filename = null;
        boolean bexiZipNoFound = false;

        for (int k = 0; k < words.length; k++) {
            try {
                filename = _contextPath.getDefaultPath() + "data\\wiktionary\\english\\" + "bexi_wiktionary.zip";
                zipFile = new ZipFile(filename);
                for (Enumeration e = zipFile.entries(); e.hasMoreElements();) {
                    zipEntry = (ZipEntry) e.nextElement();
                    if (zipEntry.getName().charAt(0) == words[k].toLowerCase().trim().charAt(0)) {
                        reader = new BufferedReader(new InputStreamReader(zipFile.getInputStream(zipEntry)));
                        break;
                    }
                }
            } catch (Exception e) {
                System.err.println(e.getMessage() + " bexi_wiktionary.zip");
                bexiZipNoFound = true;
            }
            if (bexiZipNoFound) {
                try {
                    System.err.println("The system is using a not optimized file: pages_current.xml.zip");
                    filename = _contextPath.getDefaultPath() + "data\\wiktionary\\english\\" + "pages_current.xml.zip";
                    zipFile = new ZipFile(filename);
                    for (Enumeration e = zipFile.entries(); e.hasMoreElements();) {
                        zipEntry = (ZipEntry) e.nextElement();
                        reader = new BufferedReader(new InputStreamReader(zipFile.getInputStream(zipEntry)));
                    }
                } catch (Exception e) {
                    System.err.println(e.getMessage());
                    return null;
                }
            }

            try {
                newPage = false;
                wiktionaryPages[k] = new WiktionaryPage();
                while (reader.ready()) {
                    readLine = reader.readLine();
                    //System.out.println(readLine);
                    // Remove special charater from line
                    try {
                        line = readLine.replaceAll("\\[|\\]|\\]|\\(|\\)|\\'", "");
                    } catch (Exception e) {
                        System.err.println(e.getMessage() + " for :" + readLine);
                    }
                    Matcher matcherBegin2 = null;
                    Pattern patternBegin2 = Pattern.compile("<title>" + words[k] + "</title>");
                    matcherBegin2 = patternBegin2.matcher(line);
                    if (matcherBegin2 != null && matcherBegin2.find()) {
                        newPage = true;
                    }
                    if (newPage) {
                        wiktionaryPages[k].addines(readLine);
                    }
                    Pattern patternEnd = Pattern.compile("</page>");
                    Matcher matcherEnd = patternEnd.matcher(line);
                    if (matcherEnd.find() && newPage) {
                        reader.close();
                        break;
                    }
                }
                reader.close();
            } catch (Exception e) {
                System.err.println(e.getMessage() + " " + readLine);
            }
        }
        return wiktionaryPages;
    }

    private void setTranslations(WiktionaryEnglishWord word, String line) {
        String[] items = line.split("\\'|\\:|\\,|\\;|\\(|\\)");
        String language = "";
        String translation = "";
        for (int i = 0; i < items.length; i++) {
            Pattern patternLanguage = Pattern.compile("\\*");
            Matcher matcherLanguage = patternLanguage.matcher(items[i]);
            Pattern patternTranslation = Pattern.compile("\\[\\[|\\]\\]");
            Matcher matcherTranslation = patternTranslation.matcher(items[i]);
            if (matcherLanguage.find() && !items[i].trim().equals("")) {
                language = items[i].replaceAll("\\*", "");
            }
            if (matcherTranslation.find() && !items[i].trim().equals("")) {
                translation = items[i].replaceAll("\\[|\\]", "");
            }
            if (!language.trim().equals("") && !translation.trim().equals("")) {
                word.get_Translations().put(language, translation);
            }
        }
    }

    /**
     * Set superlative of an adjective by decoding Wiktionary lines according the following format
     * '''adjective''' (''[[comparative]]'' '''[[Comparative form]]''', ''[[superlative]]'' '''[[Superlative form]]''')
     *
     * @param word
     * @param line
     */
    private void setSuperlative(WiktionaryEnglishWord word, String line) {
        boolean findSuperlativeKey = false;
        String[] items = line.split("\\*|\\'|\\:|\\,|\\;|\\(|\\)");
        for (int i = 0; i < items.length; i++) {
            Pattern pattern = Pattern.compile("\\[\\[|\\]\\]");
            Matcher matcher = pattern.matcher(items[i]);
            if (findSuperlativeKey && !items[i].trim().equals("")) {
                word.set_superlative(items[i].replaceAll("\\[|\\]", ""));
                return;
            }
            if (matcher.find() && !items[i].trim().equals("")) {
                if (items[i].replaceAll("\\[|\\]", "").toLowerCase().equals("superlative")) {
                    findSuperlativeKey = true;
                }
            }
        }
    }

    /**
     * Set superlative of an adjective by decoding Wiktionary lines according the following format
     * '''adjective''' (''[[comparative]]'' '''[[Comparative form]]''', ''[[superlative]]'' '''[[Superlative form]]''')
     *
     * @param word
     * @param line
     */
    private void setComparative(WiktionaryEnglishWord word, String line) {
        boolean findCompativeKey = false;
        String[] items = line.split("\\*|\\'|\\:|\\,|\\;|\\(|\\)");
        for (int i = 0; i < items.length; i++) {
            Pattern pattern = Pattern.compile("\\[\\[|\\]\\]");
            Matcher matcher = pattern.matcher(items[i]);
            if (findCompativeKey && !items[i].trim().equals("")) {
                word.set_comparative(items[i].replaceAll("\\[|\\]", ""));
                return;
            }
            if (matcher.find() && !items[i].trim().equals("")) {
                if (items[i].replaceAll("\\[|\\]", "").toLowerCase().equals("comparative")) {
                    findCompativeKey = true;
                }
            }
        }
    }


    /**
     * Set synonyms by decoding Wiktionary lines according the following format
     * *(''text definition''): [[synonym1]], [[synonym2]], [[synonym3]], [[synonyms...]]
     *
     * @param word
     * @param line
     */
    private void setSynonyms(WiktionaryEnglishWord word, String line) {
        String[] items = line.split("\\*|\\'|\\:|\\,|\\;|\\(|\\)");
        for (int i = 0; i < items.length; i++) {
            Pattern pattern = Pattern.compile("\\[\\[|\\]\\]");
            Matcher matcher = pattern.matcher(items[i]);
            if (matcher.find() && !items[i].trim().equals("")) {
                word.get_synonyms().add(items[i].trim().replaceAll("\\[|\\]", ""));
            }
        }
    }

    /**
     * Set antonyms by decoding Wiktionary lines according the following format
     * *(''text definition''): [[synonym1]], [[synonym2]], [[synonym3]], [[synonyms...]]
     *
     * @param word
     * @param line
     */
    private void setAntonyms(WiktionaryEnglishWord word, String line) {
        String[] items = line.split("\\*|\\'|\\:|\\,|\\;|\\(|\\)");
        for (int i = 0; i < items.length; i++) {
            Pattern pattern = Pattern.compile("\\[\\[|\\]\\]");
            Matcher matcher = pattern.matcher(items[i]);
            if (matcher.find() && !items[i].trim().equals("")) {
                word.get_antonyms().add(items[i].trim().replaceAll("\\[|\\]", ""));
            }
        }
    }

    public String[] getInflexionsAndClasses() throws Exception {
        int count = 0;
        for (int l = 0; l < _wiktionaryWord.size(); l++) {
            WiktionaryEnglishWord word = (WiktionaryEnglishWord) _wiktionaryWord.get(l);
            count = count + word.getInflectionsAndClass().size();
        }
        String inflexionsAndClasses[] = new String[count];

        int countAgain = 0;
        for (int i = 0; i < _wiktionaryWord.size(); i++) {
            WiktionaryEnglishWord word = (WiktionaryEnglishWord) _wiktionaryWord.get(i);
            final Iterator it = word.getInflectionsAndClass().iterator();
            while (it.hasNext()) {
                inflexionsAndClasses[countAgain++] = (String) it.next();
            }
        }
        return inflexionsAndClasses;
    }

    public String[] getClasses() {
        return null;
    }

    public String[] getInflexions() {
        return null;
    }

    public String[] getDefinitions() {
        return null;
    }

    public String[] getSynonyms() {
        return null;
    }

    public String[] antonym() {
        return null;
    }

    public String[] getVerbTense(String tense) {
        return null;
    }
}

