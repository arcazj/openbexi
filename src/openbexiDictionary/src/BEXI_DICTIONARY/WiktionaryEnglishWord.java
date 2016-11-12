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

import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.Map;

public class WiktionaryEnglishWord {
    public static String PLURAL = "plural";
    public static String SINGULAR = "singular";


    public static String SIMPLE_PRESENT = "simple present";
    public static String PRESENT_CONTINUOUS = "present continuous";
    public static String SIMPLE_PAST = "simple past";
    public static String PRETERIT = "preterite";
    public static String SIMPLE_FUTURE = "simple future";
    public static String PRESENT_PERFECT = "present perfect";
    public static String PLUPERFECT = "pluperfect";
    public static String FUTURE_PERFECT = "future perfect";

    public static String LETTER = "letter";
    public static String ADJECTIVE = "adjective";
    public static String NOMINAL_ADJECTIVE = "nominal adjective";
    public static String NOUN = "noun";
    public static String PROPER_NOUN = "proper noun";
    public static String VERB = "verb";
    public static String VERBAL_NOUN = "verbal noun";
    public static String VERBAL_PHRASE = "verbal phrase";
    public static String ADVERBE = "adverbe";
    public static String PREPOSITION = "preposition";

    public static String CONJUNCTION = "conjonction";
    public static String INTERJECTION = "interjection";

    public static String PRONOUN = "pronoun";
    public static String PERSONAL_PRONOUN = "personal pronoun";
    public static String NOMINATIVE_PRONOUN = "nominative pronoun";
    public static String ACCUSATIVE_PRONOUN = "accusative pronoun";
    public static String REFLEXIVE_PRONOUN = "reflexive pronoun";
    public static String POSSESSIVE_PRONOUN = "possessive pronoun";
    public static String RELATIVE_PRONOUN = "relative pronoun";

    public static String DETERMINER = "determiner";
    public static String REFLEXIVE_DETERMINER = "reflexive determiner";
    public static String POSSESSIVE_DETERMINER = "possessive determiner";
    public static String INDEFINITE_ARTICLE = "indefinite article";
    public static String DEFINITE_ARTICLE = "definite article";
    public static String ARTICLE = "article";

    public static String SINGULAR_FIRST_PERSON = "singular first person";
    public static String SINGULAR_SECOND_PERSON = "singular second person";
    public static String SINGULAR_THIRD_PERSON = "singular third person";
    public static String PLURAL_FIRST_PERSON = "plural first person";
    public static String PLURAL_SECOND_PERSON = "plural second person";
    public static String PLURAL_THIRD_PERSON = "plural third person";

    private String _name;
    private String _classe;
    private String _subClasse;

    private String _superlative;
    private String _comparative;

    private LinkedHashSet inflectionsAndClass = new LinkedHashSet();
    private LinkedHashSet _definitions = new LinkedHashSet();
    private LinkedHashSet _examples = new LinkedHashSet();
    private LinkedHashSet _synonyms = new LinkedHashSet();
    private LinkedHashSet _antonyms = new LinkedHashSet();
    private Map _Translations = new HashMap();


    static public String[] _determiner = {"a", "all", "an", "article", "demonstrative", "each", "every", "few", "her", "his", "many", "my", "no", "our", "some", "that", "the", "their", "these", "this", "those", "your"};
    static public String[] _indefinite_article = {"a", "an", "some"};
    static public String[] _definite_article = {"the"};
    static public String[] _article = {"a", "an", "the"};
    static public String[] _pronoun = {"I", "we", "you", "thou", "you guys", "y'all", "youse", "youse guys", "you-uns", "he", "she", "it", "they", "me", "us", "thee", "yous", "yis", "him", "her", "you", "them", "myself", "ourselves", "ourself", "yourself", "thyself", "yourselves ", "y'all's selves", "himself", "herself", "itself", "themselves", "mine", "ours", "yours", "thine", "y'all's", "yous's", "his", "hers", "its", "theirs", "my", "our", "your", "thy", "your", "their"};
    static public String[] _personal_pronoun = {"I", "we", "you", "thou", "you guys", "y'all", "youse", "youse guys", "you-uns", "he", "she", "it", "they", "me", "us", "thee", "yous", "yis", "him", "her", "you", "them", "myself", "ourselves", "ourself", "yourself", "thyself", "yourselves ", "y'all's selves", "himself", "herself", "itself", "themselves"};
    static public String[] _nominative_pronoun = {"I", "we", "you", "ye", "thou", "you guys", "y'all", "youse", "youse guys", "you-uns", "he", "she", "it", "they"};
    static public String[] _accusative_pronoun = {"me", "us", "you", "thee", "you guys", "y'all", "youse", "youse guys", "you-uns", "yous", "yis", "him", "it", "her", "you", "them"};
    static public String[] _reflexive_pronoun = {"myself", "ourselves", "ourself", "yourself", "thyself", "yourselves ", "y'all's selves", "himself", "herself", "itself", "themselves"};
    static public String[] _possessive_pronoun = {"mine", "ours", "yours", "thine", "y'all's", "yous's", "his", "hers", "its", "theirs"};
    static public String[] _possessive_determiner = {"my", "our", "your", "thy", "y'all's", "his", "her", "its", "their"};
    static public String[] _singular_first_person_pronoun = {"I", "me", "myself", "mine", "my"};
    static public String[] _plural_first_person_pronoun = {"we", "us", "ourselves", "ourself", "ours", "our"};
    static public String[] _singular_second_person_pronoun = {"you", "yourself", "yours", "your", "thou", "thee", "thyself", "thine", "thy"};
    static public String[] _plural_second_person_pronoun = {"you", "you", "yourselves", "yours", "your", "ye", "you", "yourselves", "yours", "your", "you guys", "y'all", "youse", "youse guys", "you-uns", "you guys", "y'all", "youse", "youse guys", "you-uns", "yous", "yis", "yourselves", "y'all's selves", "yours", "y'all's", "yous's", "your", "y'all's"};
    static public String[] _singular_third_person_pronoun = {"he", "him", "himself", "his", "she", "her", "herself", "hers", "it", "itself", "its"};
    static public String[] _plural_third_person_pronoun = {"they", "them", "themselves", "theirs", "their"};
    static public String[] _relative_pronouns = {"that", "which", "who", "whom", "whose"};

    static public String[] _irregular_plural_noun = {"calf calves",
            "elf elves",
            "half halves",
            "hoof hooves",
            "knife knives",
            "leaf leaves",
            "life lives",
            "loaf loaves",
            "scarf scarfs/scarves",
            "self selves",
            "sheaf sheaves",
            "shelf shelves",
            "thief thieves",
            "wife wives",
            "wolf wolves",

            "fireman firemen",
            "foot feet",
            "goose geese",
            "louse lice",
            "man men",
            "mouse mice",
            "tooth teeth",
            "woman women",

            "child children",
            "ox oxen",

            "auto autos",
            "echo echoes",
            "kangaroo kangaroos",
            "embargo embargoes",
            "kilo kilos",
            "hero heroes",
            "memo memos",
            "potato potatoes",
            "photo photos",
            "tomato tomatoes",
            "piano pianosv",
            "torpedo torpedoes",
            "pimento pimentos",
            "veto vetoes",
            "pro pros",
            "solo solos",
            "soprano sopranos",
            "studio studios",
            "tattoo tattoos",
            "video videos",
            "zoo zoo",

            "buffalo buffalos/buffaloes",
            "cargo cargos/cargoes",
            "halo halos/haloes",
            "mosquito mosquitos/mosquitoes",
            "motto mottos/mottoes",
            "no nos/noes",
            "tornado tornados/tornadoes",
            "volcano volcanos/volcanoes",
            "zero zeros/zeroes",

            "cod cod",
            "deer deer",
            "fish fish",
            "offspring offspring",
            "perch perch",
            "sheep sheep",
            "trout trout",

            "barracks barracks",
            "crossroads crossroads",
            "dice/die dice",
            "gallows gallows",
            "headquarters headquarters",
            "means means",
            "series series",
            "species species",

            "alga algae",
            "amoeba amoebae/amoebasv",
            "antenna antennae/antennas",
            "formula formulae/formulas",
            "larva larvae",
            "nebula nebulae/nebulas",
            "vertebra vertebrae",

            "corpus corpora",
            "genus genera",

            "alumnus alumni",
            "bacillus bacilli",
            "cactus cacti/cactuses",
            "focus foci",
            "fungus fungi/funguses",
            "nucleus/nuclei",
            "octopus octopi/octopuses",
            "radius radii",
            "stimulus stimuli",
            "syllabus syllabi/syllabuses",
            "terminus termini",

            "addendum addenda",
            "bacterium bacteria",
            "curriculum curricula/curriculums",
            "datum data",
            "erratum errata",
            "medium media",
            "memorandum memoranda/memorandums",
            "ovum ova",
            "stratum strata",
            "symposium symposia/symposiums",

            "apex apices/apexes",
            "appendix appendices/appendixes",
            "cervix cervices/cervixes",
            "index indices/indexes",
            "matrix matrices/matrixes",
            "vortex vortices",

            "analysis analyses",
            "axis axes",
            "basis bases",
            "crisis crises",
            "diagnosis diagnoses",
            "emphasis emphases",
            "hypothesis hypotheses",
            "neurosis neuroses",
            "oasis oases",
            "parenthesis parentheses",
            "synopsis synopses",
            "thesis theses",

            "criterion criteria",
            "phenomenon phenomena",
            "automaton automata",

            "Italian libretto/libretti",
            "tempo tempi",
            "virtuoso virtuosi",
            "Hebrew cherub/cherubim",
            "seraph seraphim",
            "aculeus aculei",
            "aborigine aborigine",
            "acicula aciculae",
            "animal animali/animale",
            "arma armi",
            "aircraft aircraft",
            "acephala acephala",
            "aqua aquae",
            "antelope antelope",
            "agendum agenda",
            "allowance allowance",
            "adiaphoron adiaphora",
            "arcanum arcana",
            "anak anak",
            "aei aaien",
            "aculeus aculei",
            "axman axmen",
            "axilla axillae",
            "apoapsis apoapsides",
            "apocalypse apocalypses",
            "abogado abogado/abogada",
            "acinus acini",
            "aphesis apheses",
            "atrium atria",
            "aporia aporiae",
            "apocatastasis apocatastases",
            "brother brothers/brethren",
            "batman batmen",
            "burglar burglars",
            "Greek schema/schemata"};


    static public String[] _irregular_verb = {"arise;arose;arisen",
            "awake awoke/awakened awoke",
            "be was/were been",
            "bear bore born/borne",
            "beat beat beaten/beat",
            "become became become",
            "befall befell befallen",
            "begin began begun",
            "behold beheld beheld",
            "bend bent bent",
            "beset beset beset",
            "bet bet/betted bet/betted",
            "bid bid bid",
            "bid bade/bid bidden/bid",
            "bind bound bound",
            "bite bit bitten",
            "bleed bled bled",
            "blow blew blown",
            "break broke broken",
            "breed bred bred",
            "bring brought brought",
            "broadcast broadcast broadcast",
            "browbeat browbeat browbeat",
            "build built built",
            "burn burnt/burned burnt/burned",
            "burst burst burst",
            "bust busted/bust busted/bust",
            "buy bought bought",
            "cast cast cast",
            "catch caught caught",
            "choose chose chosen",
            "cling clung clung",
            "come came come",
            "cost cost cost",
            "cost costed costed",
            "creep crept crept",
            "cut cut cut",
            "deal dealt dealt",
            "dig dug dug",
            "dive dived dived",
            "dive dived/dove dived",
            "do did done",
            "draw drew drawn",
            "dream dreamt/dreamed dreamt/dreamed",
            "drink drank drunk",
            "drive drove driven",
            "dwell dwelt/dwelled dwelt/dwelled",
            "eat ate eaten",
            "fall fell fallen",
            "feed fed fed",
            "feel felt felt",
            "fight fought fought",
            "find found found",
            "fit fit fit",
            "fit fit/fitted fit/fitted",
            "flee fled fled",
            "fling flung flung",
            "fly flew flown",
            "forbid forbade/forbad forbidden",
            "forecast forecast forecast",
            "forego forewent foregone",
            "foresee foresaw foreseen",
            "foretell foretold foretold",
            "forget forgot forgotten",
            "forgive forgave forgiven",
            "forsake forsook forsaken",
            "freeze froze frozen",
            "get got got/gotten",
            "give gave given",
            "go went gone",
            "grind ground ground",
            "grow grew grown",
            "hang hung hung",
            "hang hanged hanged",
            "have had had",
            "hear heard heard",
            "hide hid hidden",
            "hit hit hit",
            "hold held held",
            "hurt hurt hurt",
            "input input input",
            "inset inset inset",
            "interbreed interbred interbred",
            "interweave interwove interwoven",
            "keep kept kept",
            "kneel knelt/kneeled knelt/kneeled",
            "knit knit/knitted knit/knitted",
            "know knew known",
            "lay laid laid",
            "lead led led",
            "lean leaned/leant leaned/leant",
            "leap leapt/leaped leapt/leaped",
            "learn learned/learnt learned/learnt",
            "leave left left",
            "lend lent lent",
            "let let let",
            "lie lay/lied lain/lied",
            "light lit/lighted lit/lighted",
            "lose lost lost",
            "make made made",
            "mean meant meant",
            "meet met met",
            "mishear misheard misheard",
            "mislay mislaid mislaid",
            "mislead misled misled",
            "misread misread misread",
            "misspell misspelled/misspelt misspelled/misspelt",
            "mistake mistook mistaken",
            "misunderstand misunderstood misunderstood",
            "mow mowed mown/mowed",
            "outbid outbid outbid",
            "outdo outdid outdone",
            "outgrow outgrew outgrown",
            "outrun outran outrun",
            "outsell outsold outsold",
            "overcast overcast overcast",
            "overcome overcame overcome",
            "overdo overdid overdone",
            "overdraw overdrew overdrawn",
            "overeat overate overeaten",
            "overhang overhung overhung",
            "overhear overheard overheard",
            "overlay overlaid overlaid",
            "overlie overlay overlain",
            "overpay overpaid overpaid",
            "override overrode overridden",
            "overrun overran overrun",
            "oversee oversaw overseen",
            "oversell oversold oversold",
            "overshoot overshot overshot",
            "oversleep overslept overslept",
            "overtake overtook overtaken",
            "overthrow overthrew overthrown",
            "partake partook partaken",
            "pay paid paid",
            "pen penned penned",
            "pen penned/pent penned/pent",
            "plead pled/pleaded pled/pleaded",
            "pre-set pre-set pre-set",
            "proofread proofread proofread",
            "prove proved proven/proved",
            "put put put",
            "quit quit/quitted quit/quitted",
            "read read read",
            "rebind rebound rebound",
            "rebuild rebuilt rebuilt",
            "recast recast recast",
            "redo redid redone",
            "re-lay  re-laid re-laid",
            "remake remade remade",
            "repay repaid repaid",
            "rerun reran rerun",
            "resell resold resold",
            "reset reset reset",
            "rethink rethought rethought",
            "rewind rewound rewound",
            "rewrite rewrote rewritten",
            "rid rid rid",
            "ride rode ridden",
            "ring rang rung",
            "rise rose risen",
            "run ran run",
            "saw sawed sawed/sawn",
            "say said said",
            "see saw seen",
            "seek sought sought",
            "sell sold sold",
            "send sent sent",
            "set set set",
            "sew sewed sewn/sewed",
            "shake shook shaken",
            "shall should should",
            "shave shaved shaved/shaven",
            "shear sheared shorn/sheared",
            "shed shed shed",
            "shine shone/shined shone/shined",
            "shit shit/shat shit/shat",
            "shoe shoed shoed/shod",
            "shoot shot shot",
            "show showed shown/showed",
            "shrink shrank/shrunk shrunk/shrunken",
            "shut shut shut",
            "sing sang sung",
            "sink sank sunk",
            "sit sat sat",
            "slay slew slain",
            "sleep slept slept",
            "slide slid slid",
            "sling slung slung",
            "slit slit slit",
            "smell smelled/smelt smelled/smelt",
            "smite smote smitten",
            "sow sowed sowed/sown",
            "speak spoke spoken",
            "speed sped/speeded sped/speeded",
            "spell spelled/spelt spelled/spelt",
            "spend spent spent",
            "spin spun spun",
            "spit spat/spit spat/spit",
            "split split split",
            "spoil spoiled/spoilt spoiled/spoilt",
            "spoon-feed spoon-fed spoon-fed",
            "spread spread spread",
            "spring sprang/sprung sprung",
            "stand stood stood",
            "steal stole stolen",
            "stick stuck stuck",
            "sting stung stung",
            "stink stank/stunk stunk",
            "strew strewed strewn/strewed",
            "stride strode stridden",
            "strike struck stricken",
            "strike struck struck/stricken",
            "string strung strung",
            "strive strove/strived striven/strived",
            "swear swore sworn",
            "sweep swept swept",
            "swell swelled swollen/swelled",
            "swim swam swum",
            "swing swung swung",
            "take took taken",
            "teach taught taught",
            "tear tore torn",
            "tell told told",
            "think thought thought",
            "throw threw thrown",
            "thrust thrust thrust",
            "tread trod trodden, trod",
            "unbind unbound unbound",
            "underlie underlay underlain",
            "understand understood understood",
            "undertake undertook undertaken",
            "underwrite underwrote underwritten",
            "undo undid undone",
            "unwind unwound unwound",
            "uphold upheld upheld",
            "upset upset upset",
            "wake woke/waked woken/waked",
            "waylay waylaid waylaid",
            "wear wore worn",
            "weave wove woven",
            "wed wed/wedded wed/wedded",
            "weep wept wept",
            "wet wet/wetted wet/wetted",
            "win won won",
            "wind wound wound",
            "withdraw withdrew withdrawn",
            "withhold withheld withheld",
            "withstand withstood withstood",
            "work wrought wrought",
            "wring wrung wrung",
            "write wrote written"};


    public WiktionaryEnglishWord() {
    }

    public String get_name() {
        return _name;
    }

    public void set_name(String _name) {
        this._name = _name;
    }

    public LinkedHashSet getInflectionsAndClass() {
        return inflectionsAndClass;
    }

    public void setInflectionsAndClass(LinkedHashSet inflectionsAndClass) {
        this.inflectionsAndClass = inflectionsAndClass;
    }

    public String get_classe() {
        return _classe;
    }

    public void set_classe(String _classe) {
        this._classe = _classe;
    }

    public LinkedHashSet get_definitions() {
        return _definitions;
    }

    public void set_definitions(LinkedHashSet _definitions) {
        this._definitions = _definitions;
    }

    public void set_definitions(String _definition) {
        this._definitions.add(_definition);
    }

    public LinkedHashSet get_examples() {
        return _examples;
    }

    public void set_examples(LinkedHashSet _examples) {
        this._examples = _examples;
    }

    public void set_examples(String example) {
        this._examples.add(example);
    }

    public LinkedHashSet get_synonyms() {
        return _synonyms;
    }

    public void set_synonyms(LinkedHashSet _synonyms) {
        this._synonyms = _synonyms;
    }

    public LinkedHashSet get_antonyms() {
        return _antonyms;
    }

    public void set_antonyms(LinkedHashSet _antonyms) {
        this._antonyms = _antonyms;
    }

    public String get_subClasse() {
        return _subClasse;
    }

    public void set_subClasse(String _subClasse) {
        this._subClasse = _subClasse;
    }

    public Map get_Translations() {
        return _Translations;
    }

    public void set_Translations(Map _Translations) {
        this._Translations = _Translations;
    }

    public String get_superlative() {
        return _superlative;
    }

    public void set_superlative(String _superlative) {
        this._superlative = _superlative;
    }

    public String get_comparative() {
        return _comparative;
    }

    public void set_comparative(String _comparative) {
        this._comparative = _comparative;
    }

    public static String[] get_irregular_verb() {
        return _irregular_verb;
    }

    public static String[] get_determiner() {
        return _determiner;
    }

    /**
     * @param word
     * @return true if word is a determiner.
     */
    public static boolean get_determiner(String word) {
        for (int i = 0; i < _determiner.length; i++) {
            if (_determiner[i].equals(word)) return true;
        }
        return false;
    }

    public static String[] get_indefinite_article() {
        return _indefinite_article;
    }

    /**
     * @param word
     * @return true if word is a indefinite article.
     */
    public static boolean get_indefinite_article(String word) {
        for (int i = 0; i < _indefinite_article.length; i++) {
            if (_indefinite_article[i].equals(word)) return true;
        }
        return false;
    }

    public static String[] get_definite_article() {
        return _definite_article;
    }

    /**
     * @param word
     * @return true if word is a definite article.
     */
    public static boolean get_definite_article(String word) {
        for (int i = 0; i < _definite_article.length; i++) {
            if (_definite_article[i].equals(word)) return true;
        }
        return false;
    }

    public static String[] get_article() {
        return _article;
    }

    /**
     * @param word
     * @return true if word is a article.
     */
    public static boolean get_article(String word) {
        for (int i = 0; i < _article.length; i++) {
            if (_article[i].equals(word)) return true;
        }
        return false;
    }

    public static String[] get_pronoun() {
        return _pronoun;
    }

    /**
     * @param word
     * @return true if word is a pronoun.
     */
    public static boolean get_pronoun(String word) {
        for (int i = 0; i < _pronoun.length; i++) {
            if (_pronoun[i].equals(word)) return true;
        }
        return false;
    }

    public static String[] get_personal_pronoun() {
        return _personal_pronoun;
    }

    /**
     * @param word
     * @return true if word is a personal pronoun.
     */
    public static boolean get_personal_pronoun(String word) {
        for (int i = 0; i < _personal_pronoun.length; i++) {
            if (_personal_pronoun[i].equals(word)) return true;
        }
        return false;
    }

    public static String[] get_nominative_pronoun() {
        return _nominative_pronoun;
    }

    /**
     * @param word
     * @return true if word is a nominative pronoun.
     */
    public static boolean get_nominative_pronoun(String word) {
        for (int i = 0; i < _nominative_pronoun.length; i++) {
            if (_nominative_pronoun[i].equals(word)) return true;
        }
        return false;
    }

    public static String[] get_accusative_pronoun() {
        return _accusative_pronoun;
    }

    /**
     * @param word
     * @return true if word is a accusative pronoun.
     */
    public static boolean get_accusative_pronoun(String word) {
        for (int i = 0; i < _accusative_pronoun.length; i++) {
            if (_accusative_pronoun[i].equals(word)) return true;
        }
        return false;
    }

    public static String[] get_reflexive_pronoun() {
        return _reflexive_pronoun;
    }

    /**
     * @param word
     * @return true if word is a reflexive pronoun.
     */
    public static boolean get_reflexive_pronoun(String word) {
        for (int i = 0; i < _reflexive_pronoun.length; i++) {
            if (_reflexive_pronoun[i].equals(word)) return true;
        }
        return false;
    }

    public static String[] get_possessive_pronoun() {
        return _possessive_pronoun;
    }

    /**
     * @param word
     * @return true if word is a possessive pronoun.
     */
    public static boolean get_possessive_pronoun(String word) {
        for (int i = 0; i < _possessive_pronoun.length; i++) {
            if (_possessive_pronoun[i].equals(word)) return true;
        }
        return false;
    }

    public static String[] get_possessive_determiner() {
        return _possessive_determiner;
    }

    /**
     * @param word
     * @return true if word is a possessive determiner.
     */
    public static boolean get_possessive_determiner(String word) {
        for (int i = 0; i < _possessive_determiner.length; i++) {
            if (_possessive_determiner[i].equals(word)) return true;
        }
        return false;
    }

    public static String[] get_irregular_plural_noun() {
        return _irregular_plural_noun;
    }

    /**
     * @param word
     * @return true if word is a irregular plural noun.
     */
    public static boolean get_irregular_plural_noun(String word) {
        for (int i = 0; i < _irregular_plural_noun.length; i++) {
            if (_irregular_plural_noun[i].equals(word)) return true;
        }
        return false;
    }

    public static String[] get_singular_first_person_pronoun() {
        return _singular_first_person_pronoun;
    }

    /**
     * @param word
     * @return true if word is a singular first person pronoun.
     */
    public static boolean get_singular_first_person_pronoun(String word) {
        for (int i = 0; i < _singular_first_person_pronoun.length; i++) {
            if (_singular_first_person_pronoun[i].equals(word)) return true;
        }
        return false;
    }

    public static String[] get_plural_first_person_pronoun() {
        return _plural_first_person_pronoun;
    }

    /**
     * @param word
     * @return true if word is a plural third person pronoun.
     */
    public static boolean get_plural_first_person_pronoun(String word) {
        for (int i = 0; i < _plural_first_person_pronoun.length; i++) {
            if (_plural_first_person_pronoun[i].equals(word)) return true;
        }
        return false;
    }

    public static String[] get_singular_second_person_pronoun() {
        return _singular_second_person_pronoun;
    }

    /**
     * @param word
     * @return true if word is a singular second person pronoun.
     */
    public static boolean get_singular_second_person_pronoun(String word) {
        for (int i = 0; i < _singular_second_person_pronoun.length; i++) {
            if (_singular_second_person_pronoun[i].equals(word)) return true;
        }
        return false;
    }

    public static String[] get_plural_second_person_pronoun() {
        return _plural_second_person_pronoun;
    }

    /**
     * @param word
     * @return true if word is a singular second person pronoun.
     */
    public static boolean get_plural_second_person_pronoun(String word) {
        for (int i = 0; i < _plural_second_person_pronoun.length; i++) {
            if (_plural_second_person_pronoun[i].equals(word)) return true;
        }
        return false;
    }

    /**
     * @return singular third person pronoun list.
     */
    public static String[] get_singular_third_person_pronoun() {
        return _singular_third_person_pronoun;
    }

    /**
     * @param word
     * @return true if word is a singular third person pronoun.
     */
    public static boolean get_singular_third_person_pronoun(String word) {
        for (int i = 0; i < _singular_third_person_pronoun.length; i++) {
            if (_singular_third_person_pronoun[i].equals(word)) return true;
        }
        return false;
    }

    /**
     * @return plural third person pronoun list.
     */
    public static String[] get_plural_third_person_pronoun() {
        return _plural_third_person_pronoun;
    }

    /**
     * @param word
     * @return true if word is a plural third person pronoun.
     */
    public static boolean get_plural_third_person_pronoun(String word) {
        for (int i = 0; i < _plural_third_person_pronoun.length; i++) {
            if (_plural_third_person_pronoun[i].equals(word)) return true;
        }
        return false;
    }

    /**
     * @return relative pronoun list.
     */
    public static String[] get_relative_pronouns() {
        return _relative_pronouns;
    }

    /**
     * @param word
     * @return true if word is a pronoun.
     */
    public static boolean get_relative_pronouns(String word) {
        for (int i = 0; i < _relative_pronouns.length; i++) {
            if (_relative_pronouns[i].equals(word)) return true;
        }
        return false;
    }

}
