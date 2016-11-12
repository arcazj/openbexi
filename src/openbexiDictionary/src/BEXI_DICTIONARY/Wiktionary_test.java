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

import java.util.Iterator;
import java.util.Vector;


public class Wiktionary_test extends TestCase {
    public Wiktionary_test(String test) {
        super(test);
    }

    protected void setUp() throws Exception {
    }

    protected void tearDown() throws Exception {
    }

    public void testSomething() {
        BEXI_ApplicationPath contextPath = null;
        WiktionaryEnglish dictionary = null;
        try {
            String[] words = new String[1];
            words[0] = "abandon";
            //words[1] = "my";
            dictionary = new WiktionaryEnglish(words);

            System.out.println("--InflexionsAndClasses WORD-------------------------------------");
            String inflections[] = dictionary.getInflexionsAndClasses();
            for (int i = 0; i < inflections.length; i++) {
                System.out.println(inflections[i]);
            }
            System.out.println("----------------------------------------------------------");
            Vector wordItems = dictionary.get_wiktionaryWord();
            for (int i = 0; i < wordItems.size(); i++) {
                WiktionaryEnglishWord word = (WiktionaryEnglishWord) wordItems.get(i);
                if (word.get_subClasse() != null) {
                    System.out.println(word.get_name() + " " + word.get_subClasse() + " " + word.get_classe());
                } else {
                    System.out.println(word.get_name() + " " + word.get_classe());
                }
                // Get definitions and examples
                final Iterator it = word.get_definitions().iterator();
                int count = 0;
                while (it.hasNext()) {
                    System.out.println("definition " + count++ + ":" + it.next());
                }
                count = 0;
                final Iterator it1 = word.get_examples().iterator();
                while (it1.hasNext()) {
                    System.out.println("example " + count++ + ":" + it1.next());
                }
                // Get synonyms
                count = 0;
                final Iterator it2 = word.get_synonyms().iterator();
                while (it2.hasNext()) {
                    System.out.println("synonym " + count++ + ":" + it2.next());
                }
                // Get antonyms
                count = 0;
                final Iterator it3 = word.get_antonyms().iterator();
                while (it3.hasNext()) {
                    System.out.println("antonym " + count++ + ":" + it3.next());
                }
                // Get Translations
                if (word.get_Translations().get("French") != null) {
                    System.out.println("French translation :" + word.get_Translations().get("French"));
                }
                if (word.get_Translations().get("Spanish") != null) {
                    System.out.println("Spanish translation :" + word.get_Translations().get("Spanish"));
                }

                // Get comparative and superlartive if adjective
                if (word.get_classe().equals(WiktionaryEnglishWord.ADJECTIVE)) {
                    System.out.println("superlative form :" + word.get_superlative());
                    System.out.println("comparative form :" + word.get_comparative());
                }

            }
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }
    }
}
