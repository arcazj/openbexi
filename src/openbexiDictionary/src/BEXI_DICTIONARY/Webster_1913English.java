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
import junit.framework.TestCase;

import java.io.*;
import java.util.Vector;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

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
public class Webster_1913English extends TestCase {

    public Webster_1913English(String test) {
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

    public void getAdverbe() {

    }

    public void read(BEXI_ApplicationPath contextPath) {
        FileReader reader = null;
        BufferedReader read = null;
        String line;
        String[] items;

        String word = null;
        String type = null;
        String flexionSave = null;
        String wordSave = null;
        String typeSave = null;
        String lineSave = null;
        Vector list = new Vector();

        String newString = null;
        String previousString = "";
        String previousString1 = "";
        String previousString2 = "";
        String previousString3 = "";
        String previousString4 = "";
        String previousString5 = "";
        int count = 0;
        boolean addLine = true;

        // first pass
        try {

            reader = new FileReader(contextPath.getDefaultPath() + "\\data\\EnglishDictionary\\1_1_all_fullalpha.txt");
            //reader = new FileReader(contextPath.getDefaultPath() + "\\data\\EnglishDictionary\\1_1_all_fullalpha.txt");
            read = new BufferedReader(reader);

            while ((line = read.readLine()) != null) {
                addLine = true;
                items = line.split("\t");
                //System.out.println("---------------------->"+count+++": " + line+ "   ("+items.length+")");
                if (items.length == 7) {

                    word = items[1];
                    type = items[2];


                    if (!word.equals("@") && !type.equals("@")) {
                        // Save current data
                        wordSave = word;
                        flexionSave = word;
                        String convertType = null;

                        // Convert type from CORPUS format to  ABU format
                        if (type.equals("Verb")) {
                            convertType = "Ver";
                        } else if (type.equals("VMod")) {
                            convertType = "Ver";
                        } else if (type.equals("NoC")) {
                            convertType = "Nom";
                        } else if (type.equals("Num")) {
                            convertType = "Nom";
                        } else if (type.equals("NoP")) {
                            addLine = false;
                        } else if (type.equals("NoP-")) {
                            addLine = false;
                        } else if (type.equals("Ord")) {
                            convertType = "Nom";
                        } else if (type.equals("Adj")) {
                            convertType = "Adj";
                        } else if (type.equals("Adv")) {
                            convertType = "Adv";
                        } else if (type.equals("Prep")) {
                            convertType = "Det";
                        } else if (type.equals("DetP")) {
                            convertType = "Det";
                        } else if (type.equals("Int")) {
                            convertType = "Int";
                        } else if (type.equals("Pron")) {
                            convertType = "Pro";
                        } else if (type.equals("Conj")) {
                            convertType = "CON";
                        } else {
                            addLine = false;
                            convertType = type;
                            //System.err.println("??????????????????  TYPE UNKNOWN:" + line);
                        }

                        typeSave = convertType;
                        newString = items[1] + "\t" + flexionSave + "\t" + typeSave + "\n";

                    }

                    if (word.equals("@") && type.equals("@") && !wordSave.equals(items[3])) {
                        newString = items[3] + "\t" + flexionSave + "\t" + typeSave + "\n";
                    }

                    // remove  word with low frequency
                    if (items[4].trim().equals("0") && items[5].trim().equals("1") && items[6].trim().equals("0.00")) {
                        addLine = false;
                    }
                    if ((items[3] == null || flexionSave == null || typeSave == null)) {
                        addLine = false;
                    }

                    // add in the list
                    if (addLine && !newString.equals(lineSave)) {

                        String itemWord = null;
                        String itemFlexionSave = null;
                        Pattern pattern2 = Pattern.compile("[\\/]");
                        Matcher matcher2 = pattern2.matcher(items[1]);
                        if (matcher2.find()) {
                            String item[] = items[1].split("\\/");
                            if (item != null && item[0].trim() != "") {
                                itemWord = item[0].trim();
                            }
                        }
                        Pattern pattern3 = Pattern.compile("[\\/]");
                        Matcher matcher3 = pattern2.matcher(flexionSave);
                        if (matcher3.find()) {
                            String item[] = items[1].split("\\/");
                            if (item != null && item[0].trim() != "") {
                                itemFlexionSave = item[0].trim();
                            }
                        }
                        if (itemWord != null && itemWord.trim() != "" && itemFlexionSave != null && itemFlexionSave.trim() != "") {
                            newString = itemWord + "\t" + itemFlexionSave + "\t" + typeSave + "\n";
                        } else {
                            addLine = false;
                        }

                        // Build file name according first letter
                        char firstChar = newString.toUpperCase().charAt(0);
                        String fileName = contextPath.getDefaultPath() + "\\data\\EnglishDictionary\\dico" + firstChar + ".txt";
                        // replace special char
                        String newString1 = newString.replaceAll("\\*", "");
                        String newString2 = newString1.replaceAll("\\~", "");
                        newString = newString2;

                        Pattern pattern = Pattern.compile("[\\.|\\-|\\'|\\&|-|_|1|2|3|4|5|6|7|8|9|0]");
                        Matcher matcher = pattern.matcher(newString);

                        if (!matcher.find() && previousString != newString && previousString1 != newString && previousString2 != newString && previousString3 != newString && previousString4 != newString && previousString5 != newString) {
                            save(fileName, newString2, true);
                        }
                        previousString5 = previousString4;
                        previousString4 = previousString3;
                        previousString3 = previousString2;
                        previousString2 = previousString1;
                        previousString1 = previousString;
                        previousString = newString;
                    }

                    //System.out.println(count++ + ": " + newString);
                } else {
                    //System.err.println("??????????????????  FORMAT UNKNOWN:" + line);
                }
            }


            if (read != null) read.close();
            if (reader != null) reader.close();

        } catch (Exception e) {
            System.err.println(e.getMessage());
        }

        /*String line2;
        String[] alphaList = {"a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"};

        // second pass

        try {
            for (int i = 0; i < alphaList.length; i++) {
                FileReader reader2 = new FileReader(contextPath.getDefaultPath() + "\\data\\EnglishDictionary\\wb1913_" + alphaList[i] + ".html");
                BufferedReader read2 = new BufferedReader(reader2);
                String bexiDictionary = contextPath.getDefaultPath() + "\\data\\EnglishDictionary\\dico" + alphaList[i].toUpperCase() + ".txt";
                final LinkedHashSet lines = new LinkedHashSet();
                String previousword2 = "";
                String previousType2 = "";
                while ((line2 = read2.readLine()) != null) {
                    // ex: <P><B>Abandon</B> (<I>v. t.</I>) To cast or drive out; to banish; to expel; to reject.</P>
                    String newString1 = line2.replaceFirst("<P><B>", "").replaceFirst("</B> \\(<I>", ";").replaceFirst("</I>\\)", ";").replaceFirst("</P>", ";");
                    String items2[] = newString1.split(";");
                    if (items2.length == 3) {
                        String word2 = items2[0].toLowerCase();
                        if (!previousword2.equals(word2)) {
                            previousword2 = word2;

                            // Parse first dictionary
                            FileReader reader3 = new FileReader(contextPath.getDefaultPath() + "\\data\\EnglishDictionary\\_dico" + alphaList[i].toUpperCase() + ".txt");
                            BufferedReader read3 = new BufferedReader(reader3);

                            String line3;
                            while ((line3 = read3.readLine()) != null) {
                                String items3[] = line3.split("\t");
                                String word3 = items3[0].toLowerCase();
                                String flexion3 = items3[1].toLowerCase();
                                String type3 = items3[2];
                                if (items3.length == 3 && (word3.equals(word2) || flexion3.equals(word2))) {
                                    lines.add(word3 + "\t" + flexion3 + "\t" + type3 + "\n");
                                }
                            }
                            if (read3 != null) read3.close();
                            if (reader3 != null) reader3.close();
                        }
                    }
                }
                if (read2 != null) read2.close();
                if (reader2 != null) reader2.close();

                // Build english bexi dictionary
                final Iterator it = lines.iterator();
                while (it.hasNext()) {
                    line = (String) it.next();
                    save(bexiDictionary, line, true);
                }
                if (i == 0) {
                    System.err.print("Completed " + alphaList[i]+" ");
                } else {
                    System.err.print(alphaList[i] + " ");
                }
            }


        } catch (Exception e) {
            System.err.println(e.getMessage());
        } */
    }


    public void testSomething() throws Exception {

        BEXI_ApplicationPath contextPath = new BEXI_ApplicationPath();
        read(contextPath);
    }
}

