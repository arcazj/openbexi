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
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;

public class buildBexiFlexionWiktionary {

    private static void save(final String file, final String[] lines, boolean append) throws Exception {

        final FileWriter writer;
        final BufferedWriter buffer;

        try {
            writer = new FileWriter(file, append);
            buffer = new BufferedWriter(writer);
            for (int i = 0; i < lines.length; i++) {
                buffer.write(lines[i] + "\n");
            }
        } catch (IOException e) {
            throw e;
        }

        buffer.close();
        writer.close();
    }

    /**
     * Create OPENBEXI dictionary according a g
     */
    public static void main(String args[]) {
        String readLine = null;
        BEXI_ApplicationPath contextPath = null;
        ZipFile zipFile = null;
        ZipEntry zipEntry = null;
        BufferedReader reader = null;
        String line = null;
        String filename = null;

        try {
            contextPath = new BEXI_ApplicationPath();
        } catch (Exception e) {
            System.err.println("createFlexion:" + e.getMessage());
            return;
        }

        String[] bexiWord = new String[1];
        String[] alphaList = {"a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"};

        for (int i = 0; i < alphaList.length; i++) {
            try {
                String bexiDictionary = contextPath.getDefaultPath() + "\\data\\EnglishDictionary\\" + "dico" + alphaList[i].toUpperCase() + ".txt";


                try {
                    filename = contextPath.getDefaultPath() + "data\\wiktionary\\english\\" + "bexi_wiktionary.zip";
                    zipFile = new ZipFile(filename);
                    for (Enumeration e = zipFile.entries(); e.hasMoreElements();) {
                        zipEntry = (ZipEntry) e.nextElement();
                        if (zipEntry.getName().charAt(0) == alphaList[i].charAt(0)) {
                            reader = new BufferedReader(new InputStreamReader(zipFile.getInputStream(zipEntry)));
                            break;
                        }
                    }
                } catch (Exception e) {
                    System.err.println(e.getMessage() + " bexi_wiktionary.zip");
                }
                int cout = 0;
                while (reader.ready()) {
                    try {
                        readLine = reader.readLine();
                        Matcher matcherBegin1 = null;
                        Pattern patternBegin1 = Pattern.compile("<title>");
                        matcherBegin1 = patternBegin1.matcher(readLine);
                        if (matcherBegin1 != null && matcherBegin1.find()) {
                            try {
                                bexiWord[0] = readLine.replaceAll("<title>|</title>", "").trim();
                                WiktionaryEnglish dictionary = new WiktionaryEnglish(bexiWord);
                                System.out.println(cout++ + " : " + bexiWord[0]);
                                String[] flexions = dictionary.getInflexionsAndClasses();

                                // save flexions
                                save(bexiDictionary, flexions, true);
                            } catch (Exception e) {
                                System.err.println(e.getMessage() + " for " + bexiWord[0] + " :" + readLine);
                            }
                        }
                    } catch (Exception e) {
                        System.err.println(e.getMessage() + " for " + readLine);
                    }
                }

                reader.close();
            } catch (Exception e) {
                System.err.println(e.getMessage() + " for " + readLine);
            }
        }
    }

}
