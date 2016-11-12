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

import com.stevesoft.pat.Regex;

import java.sql.SQLException;
import java.util.Vector;
import java.util.regex.PatternSyntaxException;

/**
 * Menage and analyse OPENBEXI expression in natural language and netarule language.
 */


public class BEXI_Expression {

    String[] _wordTypeList = {"abréviation", "adjectif", "adverbe", "conjonction", "déterminant", "interjection", "nom", "préposition", "pronom", "verbe", "onomatopée", "any"};
    private String _expression;

    private int _nbWord;
    private BEXI_list _wordNumList;
    private BEXI_list _typeNumList;
    private BEXI_list _typeNumMaxList;
    private BEXI_list _racineList;
    private BEXI_list _genericRacines;
    private BEXI_list _flexions;
    private BEXI_list _variables;
    private BEXI_list _types;
    private BEXI_list _genericTypes;
    private BEXI_list _Genre_Mode_Temps_Nombre_PersonneList;
    private BEXI_list _abstractDataTypes;

    private String _genericMetarule;
    private BEXI_list _actions;
    private BEXI_list _genericActions;
    private BEXI_list _metaRules;
    private BEXI_list _racines;
    private int _nbRule;

    /**
     * @param nothing .
     */
    public BEXI_Expression(String nothing) {
    }

    /**
     * class BEXI_Expression
     */
    public BEXI_Expression() {

        _nbWord = 0;
        _expression = null;
        _wordNumList = new BEXI_list(_nbWord);
        _typeNumList = new BEXI_list(_nbWord);
        _typeNumMaxList = new BEXI_list(_nbWord);
        _racineList = new BEXI_list(_nbWord);
        _genericRacines = new BEXI_list(_nbWord);
        _flexions = new BEXI_list(_nbWord);
        _variables = new BEXI_list(_nbWord);
        _types = new BEXI_list(_nbWord);
        _genericTypes = new BEXI_list(_nbWord);
        _Genre_Mode_Temps_Nombre_PersonneList = new BEXI_list(_nbWord);
        _abstractDataTypes = new BEXI_list(_nbWord);

        _genericMetarule = null;
        _actions = new BEXI_list(_nbWord);
        _genericActions = new BEXI_list(_nbWord);
        _metaRules = new BEXI_list(_nbWord);
        _racines = new BEXI_list(_nbWord);
        _nbRule = 0;

    }

    /**
     * Clean up all metaRule parameters lists
     */
    private void removeLists() {
        _wordNumList.removeAll();
        _typeNumList.removeAll();
        _typeNumMaxList.removeAll();
        _racineList.removeAll();
        _genericRacines.removeAll();
        _flexions.removeAll();
        _variables.removeAll();
        _types.removeAll();
        _genericTypes.removeAll();
        _Genre_Mode_Temps_Nombre_PersonneList.removeAll();
        _abstractDataTypes.removeAll();
    }

    /**
     * Set genericMetarule .
     *
     * @param genericMetarule .
     * @throws BEXI_ExpressionException .
     */
    public void setGenericMetarule(String genericMetarule) throws BEXI_ExpressionException {
        _genericMetarule = genericMetarule;
    }

    /**
     * Set genericActions .
     *
     * @param genericAction .
     * @throws BEXI_ExpressionException .
     */
    public void setGenericActions(BEXI_list genericAction) throws BEXI_ExpressionException {
        _genericActions = genericAction;
    }

    /**
     * Set Abstract data type .
     *
     * @throws BEXI_ExpressionException .
     */
    public void setAbstractDataTypes() throws BEXI_ExpressionException {

        for (int j = 0; j < _racineList.getItemCount(); j++) {
            _abstractDataTypes.add(getAbstractDataTypes(_racineList.getItem(j)));
        }

    }

    /**
     * Return abstract data type of the word
     * <li> data abstract type = class, object, class attribut, class oject attribut, class link, etc...
     *
     * @param word .
     * @return abstract data type of the word.
     * @throws BEXI_ExpressionException .
     */
    private String getAbstractDataTypes(String word) throws BEXI_ExpressionException {

        if (_actions == null) return null;

        String[] itemAction = _actions.getItem(0).split(" ");

        // Look for delete_class
        if (itemAction[0].equals(BEXI_Action.DELETE_CLASS)) {
            if (word.equals(itemAction[1])) {
                return "class";
            }

        }
        // Look for create_class
        else if (itemAction[0].equals(BEXI_Action.CREATE_CLASS)) {
            if (word.equals(itemAction[1])) {
                return "class";
            }
        }
        // Look for create_class
        else if (itemAction[0].equals(BEXI_Action.SELECT_CLASS)) {
            if (word.equals(itemAction[1])) {
                return "class";
            }
        }
        // Look for create_class_link
        else if (itemAction[0].equals(BEXI_Action.CREATE_CLASS_LINK)) {
            if (word.equals(itemAction[1])) {
                return "class1";
            }
            if (word.equals(itemAction[2])) {
                return "link";
            }
            if (word.equals(itemAction[3])) {
                return "class2";
            }
        }

        // Look for create_class_attribut
        else if (itemAction[0].equals(BEXI_Action.CREATE_CLASS_ATTRIBUT)) {
            if (word.equals(itemAction[1])) {
                return "class1";
            }
            if (word.equals(itemAction[2])) {
                return "attribut";
            }
        }
        // Look for create_class_object_attribut
        else if (itemAction[0].equals(BEXI_Action.CREATE_CLASS_OBJECT_ATTRIBUT)) {
            if (word.equals(itemAction[1])) {
                return "class1";
            }
            if (word.equals(itemAction[2])) {
                return "object1";
            }
            if (word.equals(itemAction[3])) {
                return "attribut1";
            }

        }
        // Look for create_class_attribut
        else if (itemAction[0].equals(BEXI_Action.DELETE_CLASS_ATTRIBUT)) {
            if (word.equals(itemAction[2])) {
                return "class1";
            }
            if (word.equals(itemAction[1])) {
                return "attribut";
            }
        }
        // Look for select_all_class_object_link
        else if (itemAction[0].equals(BEXI_Action.CREATE_CLASS_OBJECT)) {
            if (word.equals(itemAction[1])) {
                return "class1";
            }
            if (word.equals(itemAction[2])) {
                return "object1";
            }
        }
        // Look for delete_class_object_link
        else if (itemAction[0].equals(BEXI_Action.DELETE_CLASS_OBJECT)) {
            if (word.equals(itemAction[1])) {
                return "class1";
            }
            if (word.equals(itemAction[2])) {
                return "object1";
            }
        }
        // Look for select_all_class_object_link
        else if (itemAction[0].equals(BEXI_Action.CREATE_CLASS_OBJECT_LINK)) {
            if (word.equals(itemAction[1])) {
                return "class1";
            }
            if (word.equals(itemAction[2])) {
                return "object1";
            }
            if (word.equals(itemAction[3])) {
                return "link";
            }
            if (word.equals(itemAction[4])) {
                return "class2";
            }
            if (word.equals(itemAction[5])) {
                return "object2";
            }
        }
        // Look for select_all_class_attributs
        else if (itemAction[0].equals(BEXI_Action.SELECT_CLASSES)) {
            return "class";
        }
        // Look for select_all_class_attributs
        else if (itemAction[0].equals(BEXI_Action.SELECT_CLASS_ATTRIBUT)) {
            if (word.equals(itemAction[1])) {
                return "class1";
            }
        }
        // Look for select_all_class_object_attributs
        else if (itemAction[0].equals(BEXI_Action.SELECT_CLASS_OBJECT_ATTRIBUTS)) {
            if (word.equals(itemAction[1])) {
                return "class1";
            }
        }

        // Look for select_one_class_attribut
        else if (itemAction[0].equals(BEXI_Action.SELECT_ONE_CLASS_ATTRIBUT)) {
            if (word.equals(itemAction[1])) {
                return "class1";
            }
        }

        // Look for select_random_class_attributs
        else if (itemAction[0].equals(BEXI_Action.SELECT_RANDOM_CLASS_ATTRIBUTS)) {
            if (word.equals(itemAction[1])) {
                return "class1";
            }
        }

        // Look for select_all_class_object_link
        else if (itemAction[0].equals(BEXI_Action.SELECT_CLASS_OBJECT_LINK)) {
            if (word.equals(itemAction[1])) {
                return "class1";
            }
            if (word.equals(itemAction[2])) {
                return "object";
            }
            if (word.equals(itemAction[3])) {
                return "link";
            }
            if (word.equals(itemAction[4])) {
                return "class2";
            }
        }  // Look for delete_class_link
        else if (itemAction[0].equals(BEXI_Action.DELETE_CLASS_LINK)) {
            if (word.equals(itemAction[1])) {
                return "class1";
            }
            if (word.equals(itemAction[2])) {
                return "link";
            }
            if (word.equals(itemAction[3])) {
                return "class2";
            }
        } // Look for delete_class_object_link
        else if (itemAction[0].equals(BEXI_Action.DELETE_CLASS_OBJECT_LINK)) {
            if (word.equals(itemAction[1])) {
                return "class1";
            }
            if (word.equals(itemAction[2])) {
                return "object1";
            }
            if (word.equals(itemAction[3])) {
                return "link";
            }
            if (word.equals(itemAction[4])) {
                return "class2";
            }
            if (word.equals(itemAction[5])) {
                return "object2";
            }
        } else if (itemAction[0].equals(BEXI_Action.DELETE_CLASS_OBJECT_ATTRIBUT)) {
            if (word.equals(itemAction[1])) {
                return "class1";
            }
            if (word.equals(itemAction[2])) {
                return "object1";
            }
            if (word.equals(itemAction[3])) {
                return "attribut1";
            }
        } else {
            throw new BEXI_ExpressionException("Cannot analyse the expression because the application cannot support the abstract data type:" + itemAction[0]);
        }
        return "null";
    }

    /**
     * print the metaRule parameters lists
     *
     * @return metaRule list.
     */
    public BEXI_list printLists() {

        BEXI_list items = new BEXI_list();
        System.out.println("_nbWord=" + _nbWord);
        System.out.println("_expression=" + _expression);
        for (int j = 0; j < _racineList.getItemCount(); j++) {

            String item = null;

            if (_wordNumList.getItemCount() != 0) {
                if (_wordNumList.getItem(j) != null) {
                    System.out.print(_wordNumList.getItem(j) + " ");
                    item = _wordNumList.getItem(j) + " ";
                }
            }
            if (_typeNumList.getItemCount() != 0) {
                if (_typeNumList.getItem(j) != null) {
                    System.out.print(_typeNumList.getItem(j) + " ");
                    item = item + _typeNumList.getItem(j) + " ";
                }
            }
            if (_typeNumMaxList.getItemCount() != 0) {
                if (_typeNumMaxList.getItem(j) != null) {
                    System.out.print(_typeNumMaxList.getItem(j) + " ");
                    item = item + _typeNumMaxList.getItem(j) + " ";
                }
            }
            if (_flexions.getItemCount() != 0) {
                if (_flexions.getItem(j) != null) {
                    System.out.print(_flexions.getItem(j) + " ");
                    item = item + _flexions.getItem(j) + " ";
                }
            }
            if (_racineList.getItemCount() != 0) {
                if (_racineList.getItem(j) != null) {
                    System.out.print(_racineList.getItem(j) + " ");
                    item = item + _racineList.getItem(j) + " ";
                }
            }
            if (_genericRacines.getItemCount() != 0) {
                if (_genericRacines.getItem(j) != null) {
                    System.out.print(_genericRacines.getItem(j) + " ");
                    item = item + _genericRacines.getItem(j) + " ";
                }
            }
            if (_types.getItemCount() != 0) {
                if (_types.getItem(j) != null) {
                    System.out.print(_types.getItem(j) + " ");
                    item = item + _types.getItem(j) + " ";
                }
            }
            if (_genericTypes.getItemCount() != 0) {
                if (_genericTypes.getItem(j) != null) {
                    System.out.print(_genericTypes.getItem(j) + " ");
                    item = item + _genericTypes.getItem(j) + " ";
                }
            }
            if (_variables.getItemCount() != 0) {
                if (_variables.getItem(j) != null) {
                    System.out.print(_variables.getItem(j) + " ");
                    item = item + _variables.getItem(j) + " ";
                }
            }
            if (_Genre_Mode_Temps_Nombre_PersonneList.getItemCount() != 0) {
                if (_Genre_Mode_Temps_Nombre_PersonneList.getItem(j) != null) {
                    System.out.print(_Genre_Mode_Temps_Nombre_PersonneList.getItem(j) + " ");
                    item = item + _Genre_Mode_Temps_Nombre_PersonneList.getItem(j) + " ";
                }
            }
            if (_abstractDataTypes.getItemCount() != 0) {
                if (_abstractDataTypes.getItem(j) != null) {
                    System.out.print(_abstractDataTypes.getItem(j) + " ");
                    item = item + _abstractDataTypes.getItem(j) + " ";
                }
            }
            System.out.println("");
            items.add(item);
        }

        if (_actions != null) {
            if (_actions.getItemCount() != 0) {
                System.out.println("ACTION:" + _actions.getItem(0));
            }
        }
        if (_genericActions != null) {
            if (_genericActions.getItemCount() != 0) {
                System.out.println("GENERIC ACTION:" + _genericActions.getItem(0));
            }
        }
        if (_metaRules != null) {
            if (_metaRules.getItemCount() != 0) {
                System.out.println("METARULE:" + _metaRules.getItem(0));
            }
        }
        if (_genericMetarule != null) {
            System.out.println("GENERIC METARULE:" + _genericMetarule);
        }

        /*for (int j = 0; j < _actions.getItemCount(); j++) {
            System.out.println("ACTION:" + _actions.getItem(j));
        }
        for (int j = 0; j < _metaRules.getItemCount(); j++) {
            System.out.println("METARULE:" + _metaRules.getItem(j));
        }*/
        return items;
    }

    /**
     * print the metaRule and action
     */
    public void print() {
        System.out.println("_expression=" + _expression);

        if (_actions != null) {
            if (_actions.getItemCount() != 0) {
                System.out.println("ACTION:" + _actions.getItem(0));
            }
        }
        if (_genericActions != null) {
            if (_genericActions.getItemCount() != 0) {
                System.out.println("GENERIC ACTION:" + _genericActions.getItem(0));
            }
        }
        if (_metaRules != null) {
            if (_metaRules.getItemCount() != 0) {
                System.out.println("METARULE:" + _metaRules.getItem(0));
            }
        }
        if (_genericMetarule != null) {
            System.out.println("GENERIC METARULE:" + _genericMetarule);
        }

    }

    /**
     * Return the current expression without apostrophe
     *
     * @param expression .
     * @return expression witout apostrophe.
     */
    static public String removeApostrophe(String expression) {
        if (expression != null)
            return expression.replaceAll("'", " ");
        return null;
    }

    /**
     * Remove all accent inside a expression
     *
     * @param expression .
     * @return expression without accent.
     */
    static public String removeAccents(String expression) {

        Regex r1 = new Regex("[éëèê]", "e");
        String expressionWitoutAccent = r1.replaceAll(expression);
        Regex r2 = new Regex("[ïî]", "i");
        expressionWitoutAccent = r2.replaceAll(expressionWitoutAccent);
        Regex r3 = new Regex("[àäâ]", "a");
        expressionWitoutAccent = r3.replaceAll(expressionWitoutAccent);
        Regex r4 = new Regex("[üûù]", "u");
        expressionWitoutAccent = r4.replaceAll(expressionWitoutAccent);
        Regex r5 = new Regex("[öô]", "o");
        expressionWitoutAccent = r5.replaceAll(expressionWitoutAccent);
        return expressionWitoutAccent;
    }

    /**
     * Return true if variable = null or contains "_X"
     *
     * @param variable .
     * @return true or false.
     */
    public boolean checkVariable(String variable) {

        if (variable == null) return true;
        for (int i = 0; i < variable.length(); i++) {
            if (i > 0) {
                if (variable.charAt(i) == 'X' && variable.charAt(i - 1) == '_') {
                    return true;
                }
            }
        }
        return false;
    }


    /**
     * buid and return a genericType according wordNumList.
     *
     * @param wordNumList .
     * @return genericType .
     */
    public String buildGenericType(String wordNumList) {

        if (wordNumList == null) return null;

        int count = 0;
        String genericType = null;
        BEXI_list item = new BEXI_list();

        for (int i = 0; i < _wordNumList.getItemCount(); i++) {
            if (_wordNumList.getItem(i).equals(wordNumList)) {

                // Remove bracket
                Regex r1 = new Regex("[\\[\\]]", "");
                String itemWithoutBracket = r1.replaceAll(_types.getItem(i));
                item.add(itemWithoutBracket, i);
            }
        }

        for (int i = 0; i < item.getItemCount(); i++) {
            for (int j = i + 1; j < item.getItemCount() - 1; j++) {
                if (item.getItem(i).equals(item.getItem(j))) {
                    item.remove(i);
                }
            }
        }

        for (int i = 0; i < item.getItemCount(); i++) {
            if (count == 0) {
                genericType = "[" + item.getItem(i);
            } else {
                genericType = genericType + ";" + item.getItem(i);
            }
            count++;
        }
        if (count > 0) {
            return genericType + "]";
        } else {
            return null;
        }
    }


    /**
     * Return the generic actions of the current expression
     *
     * @return _genericActions
     */
    public BEXI_list getGenericActions() {
        return _genericActions;
    }

    /**
     * Return the data abstract type according the variable
     *
     * @param variable .
     * @return dataAbstractType.
     */
    public String getDataAbstractTypeFromVariable(String variable) {

        String dataAbstractType = null;
        if (_wordNumList == null) return null;
        if (_abstractDataTypes == null) return null;
        if (_abstractDataTypes.getItemCount() == 0) return null;

        for (int i = 0; i < _wordNumList.getItemCount(); i++) {
            if (_variables.getItem(i).equals(variable)) {
                return _abstractDataTypes.getItem(i);
            }
        }
        return dataAbstractType;
    }

    /**
     * Return the world racine according the variable
     *
     * @param variable .
     * @return racine
     */
    public String getRacinefromVariable(String variable) {

        String racine = null;
        if (_wordNumList == null) return null;
        if (_variables == null) return null;
        if (_variables.getItemCount() == 0) return null;

        for (int i = 0; i < _wordNumList.getItemCount(); i++) {
            if (_variables.getItem(i).equals(variable)) {
                return _racineList.getItem(i);
            }
        }
        return racine;
    }

    /**
     * @param racine .
     * @return variable according the word racine .
     */
    public String getVariablefromRacine(String racine) {

        String variable = null;
        if (_wordNumList == null) return null;
        if (_racineList == null) return null;
        if (_racineList.getItemCount() == 0) return null;

        for (int i = 0; i < _wordNumList.getItemCount(); i++) {
            if (_racineList.getItem(i).equals(racine)) {
                return _variables.getItem(i);
            }
        }
        return variable;
    }

    /**
     * @param flexion .
     * @param racine  .
     * @param type    .
     * @return genericRacines.
     */
    public String getGenericRacine(String flexion, String racine, String type) {

        String genericRacines = null;
        if (_wordNumList == null) return null;
        if (_flexions == null) return null;
        if (_flexions.getItemCount() == 0) return null;
        if (_racineList == null) return null;
        if (_racineList.getItemCount() == 0) return null;
        if (_types == null) return null;
        if (_types.getItemCount() == 0) return null;

        for (int i = 0; i < _wordNumList.getItemCount(); i++) {
            if (_flexions.getItem(i).equals(flexion)
                    && _racineList.getItem(i).equals(racine)
                    && _types.getItem(i).equals(type)
                    ) {
                return _genericRacines.getItem(i);
            }
        }
        return genericRacines;
    }

    /**
     * @param racine .
     * @param type   .
     * @return genericRacines.
     */
    public String getGenericRacine(String racine, String type) {

        String genericRacines = null;
        if (_wordNumList == null) return null;
        if (_racineList == null) return null;
        if (_racineList.getItemCount() == 0) return null;
        if (_types == null) return null;
        if (_types.getItemCount() == 0) return null;

        for (int i = 0; i < _wordNumList.getItemCount(); i++) {
            if (_racineList.getItem(i).equals(racine)
                    && _types.getItem(i).equals(type)
                    ) {
                return _genericRacines.getItem(i);
            }
        }
        return genericRacines;
    }

    /**
     * Return the generic type according flexion, racine and type
     *
     * @return the generic type according flexion, racine and type.
     */
    /**
     * @param flexion .
     * @param racine  .
     * @param type    .
     * @return the generic type according flexion, racine and type.
     */
    public String getGenericType(String flexion, String racine, String type) {

        String genericType = null;
        if (_wordNumList == null) return null;
        if (_flexions == null) return null;
        if (_flexions.getItemCount() == 0) return null;
        if (_racineList == null) return null;
        if (_racineList.getItemCount() == 0) return null;
        if (_types == null) return null;
        if (_types.getItemCount() == 0) return null;

        for (int i = 0; i < _wordNumList.getItemCount(); i++) {
            if (_flexions.getItem(i).equals(flexion)
                    && _racineList.getItem(i).equals(racine)
                    && _types.getItem(i).equals(type)
                    ) {
                return _genericTypes.getItem(i);
            }
        }
        return genericType;
    }

    /**
     * Return the generic type according  racine and type.
     *
     * @param racine .
     * @param type   .
     * @return genericType.
     */
    public String getGenericType(String racine, String type) {

        String genericType = null;
        if (_wordNumList == null) return null;
        if (_racineList == null) return null;
        if (_racineList.getItemCount() == 0) return null;
        if (_types == null) return null;
        if (_types.getItemCount() == 0) return null;

        for (int i = 0; i < _wordNumList.getItemCount(); i++) {
            if (_racineList.getItem(i).equals(racine)
                    && _types.getItem(i).equals(type)
                    ) {
                if (_genericTypes.getItemCount() != 0) {
                    return _genericTypes.getItem(i);
                }
            }
        }
        return genericType;
    }


    /**
     * Return the data abstract type  according genericRacine and genericType
     *
     * @param genericRacine .
     * @param genericType   .
     * @return abstractDataType.
     */
    public String getAbstractDataType(String genericRacine, String genericType) {

        String abstractDataType = null;
        if (_wordNumList == null) return null;
        if (_genericRacines == null) return null;
        if (_genericRacines.getItemCount() == 0) return null;
        if (_genericTypes == null) return null;
        if (_genericTypes.getItemCount() == 0) return null;

        for (int i = 0; i < _wordNumList.getItemCount(); i++) {
            if (_genericRacines.getItem(i).equals(genericRacine)
                    && _genericTypes.getItem(i).equals(genericType)
                    ) {
                return _abstractDataTypes.getItem(i);
            }
        }
        return abstractDataType;
    }

    /**
     * Return the actions of the current expression
     *
     * @return _actions
     */
    public BEXI_list getActions() {
        return _actions;
    }

    /**
     * Return the metarules of the current expression
     *
     * @return _metaRules
     */
    public BEXI_list getMetarules() {
        return _metaRules;
    }

    /**
     * Return the generic metarule of the current expression
     *
     * @return _genericMetaRules
     */
    public String getGenericMetarule() {
        return _genericMetarule;
    }

    /**
     * Return the racines of the current expression
     *
     * @return _racines
     */
    public BEXI_list getRacines() {
        return _racines;
    }

    /**
     * Return the abstract data type of the current expression
     *
     * @return _abstractDataTypes
     */
    public BEXI_list getAbstractDataType() {
        return _abstractDataTypes;
    }

    /**
     * Return the type list of the current expression
     *
     * @return _types
     */
    public BEXI_list getTypes() {
        return _types;
    }

    /**
     * Return the genericType list of the current expression
     *
     * @return _genericTypes
     */
    public BEXI_list getGenericTypes() {
        return _genericTypes;
    }

    /**
     * Return the variable list of the current expression
     *
     * @return _variables
     */
    public BEXI_list getVariables() {
        return _variables;
    }

    /**
     * Return the word flexion list of the current expression
     *
     * @return _flexions
     */
    public BEXI_list getFlexions() {
        return _flexions;
    }

    /**
     * Return the word racine list of the current expression
     *
     * @return _racineList
     */
    public BEXI_list getRacineList() {
        return _racineList;
    }

    /**
     * Return the generic word racine list of the current expression
     *
     * @return _genericRacines
     */
    public BEXI_list getGenericRacines() {
        return _genericRacines;
    }

    /**
     * Return the number max type list of the current expression
     *
     * @return _typeNumMaxList
     */
    public BEXI_list getTypeNumMaxList() {
        return _typeNumMaxList;
    }

    /**
     * Return the type number list of the current expression
     *
     * @return _typeNumList
     */
    public BEXI_list getTypeNumList() {
        return _typeNumList;
    }

    /**
     * Return the word position of the current expression
     *
     * @return _wordNumList
     */
    public BEXI_list getWordNumList() {
        return _wordNumList;
    }

    /**
     * Return the word number of the current expression
     *
     * @return _nbWord
     */
    public int getNbWord() {
        return _nbWord;
    }

    /**
     * Return the current expression
     *
     * @return _expression
     */
    public String getExpression() {
        return _expression;
    }

    private void setGenericType() {
        if (_genericMetarule != null) {
            String[] itemList = _genericMetarule.split("[ *.,]");
            for (int j = 0; j < _wordNumList.getItemCount(); j++) {
                int wordNum = Integer.parseInt(_wordNumList.getItem(j)) - 1;
                _genericTypes.add(itemList[1 + (wordNum * 2)], j);
            }
        }
    }

    private void setGenericRacines() {
        if (_genericMetarule != null) {
            String[] itemList = _genericMetarule.split("[ *.,]");
            for (int j = 0; j < _wordNumList.getItemCount(); j++) {
                int wordNum = Integer.parseInt(_wordNumList.getItem(j)) - 1;
                _genericRacines.add(itemList[2 + (wordNum * 2)], j);
            }
        }
    }

    /**
     * Check in the dictionary if all expression words exist.
     * <Li> Then split the  expression to set up the attributs of the OPENBEXI expression.
     * <li> Exemple: "créer une classe homme".
     * <li> Build the following lists:
     * <p/>
     * <li> The wordlist   ;
     * <li> [0] = "créer"  ;
     * <li> [1] = "une"    ;
     * <li> [2] = "classe" ;
     * <li> [3] = "homme"  ;
     * <p/>
     * <li> colunm 1 = wordNumList
     * <li> colunm 2 = typeNumList
     * <li> Colunm 3 = typeNumMaxList
     * <li> Colunm 4 = racineList
     * <li> Colunm 5 = flexionList
     * <li> Colunm 6 = variableList
     * <li> Colunm 7 = typeList
     * <li> Colunm 8 = Genre_Mode_Temps_Nombre_personneList
     * <li>
     * <li> Example: expression "créer une classe homme"
     * <li> col = 1 2 3      4      5   6     7
     * <li>
     * <li>       1 1 1 créer  créer  _X1 [Ver] Inf    (OPENBEXI)
     * <li>       2 1 3 une    un     _X2 [Adj] Fem+SG
     * <li>       2 2 3 une    un     _X2 [Det] Fem+SG
     * <li>       2 3 3 une    une    _X2 [Nom] Fem+SG
     * <li>       3 1 1 classe classe _X3 [Nom] Fem+SG (OPENBEXI)
     * <li>       4 1 1 homme  homme  _X4 [Nom] Mas+SG
     * <li>
     *
     * @param contextPath   .
     * @param expressionTmp .
     * @throws Exception                     .
     * @throws SQLException                  .
     * @throws InstantiationException        .
     * @throws ClassNotFoundException        .
     * @throws IllegalAccessException        .
     * @throws BEXI_ExpressionException      .
     * @throws BEXI_ApplicationPathException .
     */
    private void splitAndBuildListOfWordNL(BEXI_ApplicationPath contextPath, String expressionTmp)
            throws Exception, SQLException, InstantiationException, ClassNotFoundException, IllegalAccessException, BEXI_ExpressionException, BEXI_ApplicationPathException {

        int count = 0;
        String[] wordListTmp = null;
        String[] wordList = null;
        String[] driverASCII = {"ASCII"};
        String[] driverSQL = {"SQL"};
        String[] hosts = {"localHost"};

        // Remove apostrophe
        String expression = removeApostrophe(expressionTmp);

        try {
            // Split the expression and checkIfObjectExist a word list
            wordListTmp = expression.split("[ *.,]");
            wordList = expression.split("[ *.,]");
        } catch (PatternSyntaxException e) {
            System.out.println(e.getMessage());
        } catch (NullPointerException e) {
            System.out.println(e.getMessage());
        } finally {
        }

        // remove blank
        _nbWord = 0;
        for (int i = 0; i < wordListTmp.length; i++) {
            // remove blanck on the both side of the word
            String word = wordListTmp[i].trim();
            if (word.length() != 0) {
                wordList[_nbWord] = word;
                _nbWord = _nbWord + 1;
            }
        }

        // Look for every  word of the command (expression) in the dictionary.
        String previousWordType;
        int typeNumber;
        String wordType;
        BEXI_ObjectExplorer objectExplorer = new BEXI_ObjectExplorer();

        for (int i = 0; i < _nbWord; i++) {

            //Build a BEXI_DataContext.MOT or a BEXI_DataContext.WORD object
            //String language = context.
            BEXI_Object objectTmp = null;
            if (contextPath.getDefaultLanguage().equals(BEXI_DataContext.FRENCH)) {
                objectTmp = new BEXI_Object(BEXI_DataContext.FRENCH, BEXI_DataContext.MOT, wordList[i], null, null, null, null, false);
            } else {
                objectTmp = new BEXI_Object(BEXI_DataContext.ENGLISH, BEXI_DataContext.WORD, wordList[i], null, null, null, null, false);
            }
            BEXI_DataContext dataContext = new BEXI_DataContext(contextPath, objectTmp);
            try {

                // Look for the word in the dictionary
                BEXI_SqlContext contextSql = contextPath.get_SqlContextManager().get_sqlContext_admin();
                Vector objectList = objectExplorer.lookForObject(hosts, contextSql, dataContext, objectTmp, driverSQL);
                if (objectList == null) {
                    objectList = objectExplorer.lookForObject(hosts, contextSql, dataContext, objectTmp, driverASCII);
                    objectExplorer.addObject(hosts, contextSql, dataContext, objectTmp, objectList, driverSQL);
                }

                // Word has been found inthe dictionary
                if (objectList != null) {
                    typeNumber = 1;
                    previousWordType = "";
                    wordType = "";
                    for (int j = 0; j < objectList.size(); j++) {
                        BEXI_Object dictionary = (BEXI_Object) objectList.elementAt(j);
                        if (dictionary == null) {
                            throw new BEXI_ObjectExplorerException("word " + wordList[i] + " no found in the dictionary");
                        }

                        wordType = dictionary.get_Values("type");
                        // Check if the type is unique for the same word
                        if (!wordType.equals(previousWordType)) {
                            _types.add("[" + dictionary.get_Values("type") + "]", count);
                            _racineList.add(dictionary.get_Values("racine"), count);
                            _Genre_Mode_Temps_Nombre_PersonneList.add(dictionary.get_Values("genre"), count);
                            _wordNumList.add(Integer.toString(i + 1), count);
                            _typeNumList.add(Integer.toString(typeNumber), count);
                            _flexions.add(wordList[i], count);
                            _variables.add("_X" + Integer.toString(i), count);
                            typeNumber = typeNumber + 1;
                            count = count + 1;
                        }
                        previousWordType = wordType;
                    }
                } else {
                    // Word has not been found in the dictionary
                    _types.add("[" + "any" + "]", count);
                    _racineList.add(wordList[i], count);
                    _Genre_Mode_Temps_Nombre_PersonneList.add("null", count);
                    _wordNumList.add(Integer.toString(i + 1), count);
                    _typeNumList.add(Integer.toString(1, count));
                    _flexions.add(wordList[i], count);
                    _variables.add("_X" + Integer.toString(i), count);
                    count = count + 1;
                }
            } catch (BEXI_ObjectExplorerException e) {
                throw new BEXI_ExpressionException("Cannot analyse the expression because " + e.getMessage());
            } catch (Exception e) {
                throw new BEXI_ObjectExplorerException("Cannot analyse the expression because " + e.getMessage());
            }
        }

        // Get _typeNumMaxList from previous analyse
        int iPrec = 0;
        String tmpType[] = new String[count];

        for (int i = count - 1; i >= 0; i--) {
            if (i == count - 1) {
                iPrec = i;
                _nbRule = _nbRule + Integer.parseInt(_typeNumList.getItem(i));
            } else {

                if (Integer.parseInt(_typeNumList.getItem(i)) >=
                        Integer.parseInt(_typeNumList.getItem(i + 1))) {
                    iPrec = i;
                    _nbRule = _nbRule + Integer.parseInt(_typeNumList.getItem(i));
                }
            }
            tmpType[i] = _typeNumList.getItem(iPrec);
        }

        for (int i = 0; i < count; i++) {
            _typeNumMaxList.add(tmpType[i], i);
        }
    }

    /**
     * Split a metarule like "if [Ver] créer;construire;établir; [Det] _X1 [Nom] classe [Nom;Adj] _X3"
     * and build the following lists:
     * <li> colunm 1 = wordNumList
     * <li> colunm 2 = typeNumList
     * <li> Colunm 3 = typeNumMaxList
     * <li> Colunm 4 = racineList
     * <li> Colunm 5 = flexionList
     * <li> Colunm 6 = variableList
     * <li> Colunm 7 = typeList
     * <li> Colunm 8 = Genre_Mode_Temps_Nombre_personneList
     * <li>
     * <li> 1 1 3 créer créer [Ver] ? ?
     * <li> 11 2 3 construire construire [Ver] ? ?
     * <li> 11 3 3 établir établir [Ver] ? ?
     * <li> 12 1 1 _X1 _X1 [Det] ? ?
     * <li> 13 1 1 classe classe [Nom] ? ?
     * <li> 14 1 2 _X3 _X3 [Nom] ? ?
     * <li> 14 2 2 _X3 _X3 [Adj] ? ?
     *
     * @param expressionTmp .
     * @throws BEXI_ExpressionException .
     */
    private void splitAndBuildListOfWordML(String expressionTmp) throws BEXI_ExpressionException {

        int CountWord = 0;
        int nbItems = 0;
        String[] wordListTmp = null;
        String[] wordList = null;

        // Remove apostrophe
        String expression = BEXI_Expression.removeApostrophe(expressionTmp);

        try {
            // Split the expression and checkIfObjectExist a word list
            wordListTmp = expression.split("[ *.,]");
            wordList = expression.split("[ *.,]");
        } catch (PatternSyntaxException e) {
            System.out.println(e.getMessage());
        } catch (NullPointerException e) {
            System.out.println(e.getMessage());
        } finally {
        }

        _nbWord = 0;
        for (int i = 0; i < wordListTmp.length; i++) {
            // remove blanck on the both side of the word
            String word = wordListTmp[i].trim();
            if (word.length() != 0) {
                wordList[_nbWord] = word;
                _nbWord = _nbWord + 1;
            }
        }

        for (int i = 1; i < _nbWord - 1; i++) {
            // remove blanck on the both side of the word
            String word = wordListTmp[i + 1].trim();

            String[] subWordListTmp = word.split("[ *;]");

            int nbMaxItems = subWordListTmp.length;
            if (nbMaxItems == 0) nbMaxItems = 1;
            for (int j = 0; j < nbMaxItems; j++) {
                if (subWordListTmp[j].length() != 0) {
                    if (wordListTmp[i].equals("[any]")) {
                        for (int l = 0; l < _wordTypeList.length; l++) {
                            _types.add("[" + _wordTypeList[l] + "]", nbItems);
                            _racineList.add(subWordListTmp[j].trim(), nbItems);
                            _flexions.add(subWordListTmp[j].trim(), nbItems);
                            _wordNumList.add(Integer.toString(CountWord + 1), nbItems);
                            _typeNumList.add(Integer.toString(l + 1), nbItems);
                            _typeNumMaxList.add(Integer.toString(_wordTypeList.length), nbItems);
                            _Genre_Mode_Temps_Nombre_PersonneList.add("?", nbItems);
                            _variables.add("?", nbItems);
                            nbItems = nbItems + 1;
                        }
                    } else {
                        // if find several sub-types inside a metaRule braket, we have others sub-metarules
                        // ex: [Name;Adj]
                        String[] subType;
                        Regex r = new Regex("\\[|\\]", "");
                        String type = r.replaceAll(wordListTmp[i]);
                        subType = type.split("[ *;]");


                        for (int m = 0; m < subType.length; m++) {
                            if (nbMaxItems == 1) {
                                _types.add("[" + subType[m].trim() + "]", nbItems);
                                _racineList.add(subWordListTmp[j].trim(), nbItems);
                                _flexions.add(subWordListTmp[j].trim(), nbItems);
                                _wordNumList.add(Integer.toString(CountWord + 1), nbItems);
                                _typeNumList.add(Integer.toString(j + m + 1), nbItems);
                                _typeNumMaxList.add(Integer.toString(subType.length), nbItems);
                                _Genre_Mode_Temps_Nombre_PersonneList.add("?", nbItems);
                                _variables.add("?", nbItems);
                                nbItems = nbItems + 1;
                            } else if (subType.length != 1 && nbMaxItems != 1) {
                                throw new BEXI_ExpressionException("Syntax not supported in the metarules: " + expressionTmp);

                            } else {
                                _types.add("[" + subType[m].trim() + "]", nbItems);
                                _racineList.add(subWordListTmp[j].trim(), nbItems);
                                _flexions.add(subWordListTmp[j].trim(), nbItems);
                                _wordNumList.add(Integer.toString(CountWord + 1), nbItems);
                                _typeNumList.add(Integer.toString(m + j + 1), nbItems);
                                _typeNumMaxList.add(Integer.toString(nbMaxItems), nbItems);
                                _Genre_Mode_Temps_Nombre_PersonneList.add("?", nbItems);
                                _variables.add("?", nbItems);
                                nbItems = nbItems + 1;
                            }
                        }
                    }
                }
            }
            CountWord = CountWord + 1;
            i++;
        }
        _nbWord = CountWord;
        //printLists();
    }

    /**
     * Return the number of occurence type for a word (col =3)
     * <li>
     * <li> Example: expression "créer une classe homme"
     * <li> colunm 1 = wordNumList
     * <li> colunm 2 = typeNumList
     * <li> Colunm 3 = typeNumMaxList
     * <li> Colunm 4 = racineList
     * <li> Colunm 5 = flexionList
     * <li> Colunm 6 = variableList
     * <li> Colunm 7 = typeList
     * <li> Colunm 8 = Genre_Mode_Temps_Nombre_personneList
     * <li> col = 1 2 3      4      5   6     7
     * <li>
     * <li>       1 1 1 créer  créer  _X1 [Ver] Inf    (OPENBEXI)
     * <li>       2 1 3 une    un     _X2 [Adj] Fem+SG
     * <li>       2 2 3 une    un     _X2 [Det] Fem+SG
     * <li>       2 3 3 une    une    _X2 [Nom] Fem+SG
     * <li>       3 1 1 classe classe _X3 [Nom] Fem+SG (OPENBEXI)
     * <li>       4 1 1 homme  homme  _X4 [Nom] Mas+SG
     * Example : The word "une" has 3 types (Adj, Det or Nom)
     * Example : The word "homme" has only one type (Nom)
     *
     * @param wordNumber .
     * @return _typeNumMaxList.
     */
    public int getNumMaxType(int wordNumber) {
        for (int i = 0; i < _wordNumList.getItemCount(); i++) {
            if (Integer.parseInt(_wordNumList.getItem(i)) ==
                    wordNumber) {
                return Integer.parseInt(_typeNumMaxList.getItem(i));
            }
        }
        return -1;
    }

    /**
     * Return  the current index of type for a word (col=2)
     * <li> Example: expression "créer une classe homme"
     * <li> colunm 1 = wordNumList
     * <li> colunm 2 = typeNumList
     * <li> Colunm 3 = typeNumMaxList
     * <li> Colunm 4 = racineList
     * <li> Colunm 5 = flexionList
     * <li> Colunm 6 = variableList
     * <li> Colunm 7 = typeList
     * <li> Colunm 8 = Genre_Mode_Temps_Nombre_personneList
     * <li> col = 1 2 3      4      5   6     7
     * <li>
     * <li>       1 1 1 créer  créer  _X1 [Ver] Inf    (OPENBEXI)
     * <li>       2 1 3 une    un     _X2 [Adj] Fem+SG
     * <li>       2 2 3 une    un     _X2 [Det] Fem+SG
     * <li>       2 3 3 une    une    _X2 [Nom] Fem+SG
     * <li>       3 1 1 classe classe _X3 [Nom] Fem+SG (OPENBEXI)
     * <li>       4 1 1 homme  homme  _X4 [Nom] Mas+SG
     *
     * @param wordNumber .
     * @param index      .
     * @return the current index of type for a word.
     */
    protected int getIndexWordType(int wordNumber, int index) {

        int indexCurrent = 0;

        for (int i = 0; i < _wordNumList.getItemCount(); i++) {
            if (Integer.parseInt(_wordNumList.getItem(i)) ==
                    wordNumber) {
                indexCurrent = indexCurrent + 1;
                if (indexCurrent == index) {
                    return Integer.parseInt(_typeNumList.getItem(i));
                }
                if (indexCurrent > index) {
                    return -1;
                }
            }
        }
        return -1;
    }

    /**
     * Return  the index number in the list for a current word
     * <li> Example: expression "créer une classe homme"
     * <li> colunm 1 = wordNumList
     * <li> colunm 2 = typeNumList
     * <li> Colunm 3 = typeNumMaxList
     * <li> Colunm 4 = racineList
     * <li> Colunm 5 = flexionList
     * <li> Colunm 6 = variableList
     * <li> Colunm 7 = typeList
     * <li> Colunm 8 = Genre_Mode_Temps_Nombre_personneList
     * <li> col = 1 2 3      4      5   6     7
     * <li>
     * <li>       1 1 1 créer  créer  _X1 [Ver] Inf    (OPENBEXI)
     * <li>       2 1 3 une    un     _X2 [Adj] Fem+SG
     * <li>       2 2 3 une    un     _X2 [Det] Fem+SG
     * <li>       2 3 3 une    une    _X2 [Nom] Fem+SG
     * <li>       3 1 1 classe classe _X3 [Nom] Fem+SG (OPENBEXI)
     * <li>       4 1 1 homme  homme  _X4 [Nom] Mas+SG
     *
     * @param wordNumber .
     * @param index      .
     * @return the index number in the list for a current word
     */
    protected int getIndexWordNum(int wordNumber, int index) {

        int indexCurrent = 0;

        for (int i = 0; i < _wordNumList.getItemCount(); i++) {
            if (Integer.parseInt(_wordNumList.getItem(i)) ==
                    wordNumber) {
                indexCurrent = indexCurrent + 1;
                if (indexCurrent == index) {
                    return i;
                }
                if (indexCurrent > index) {
                    return -1;
                }
            }
        }
        return -1;
    }

    /**
     * Analyze a natural language expression.
     * <li> Call splitAndBuildListOfWordNL() in order to to set up the attributs of the OPENBEXI expression.
     * <li> Call getActionList to find a appropriate action from metarules.
     * <li> Find and return a appropriate action after fixing ambiguous action if any.
     *
     * @param context    .
     * @param expression .
     * @return action
     * @throws BEXI_ApplicationPathException .
     * @throws BEXI_ExpressionException      .
     * @throws BEXI_MetaRuleException        .
     * @throws BEXI_ActionException          .
     * @throws SQLException                  .
     * @throws BEXI_ObjectExplorerException  .
     * @throws InstantiationException        .
     * @throws IllegalAccessException        .
     * @throws ClassNotFoundException        .
     */
    public BEXI_list analyze(BEXI_Context context, String expression) throws
            Exception, SQLException, BEXI_ObjectExplorerException, InstantiationException, IllegalAccessException, ClassNotFoundException {

        removeLists();
        _expression = expression;
        boolean foundAction = false;
        boolean AmbiguousFoundAction = false;

        // Look for the last application context
        BEXI_ContextManager managerContext = new BEXI_ContextManager(context);
        BEXI_ApplicationPath lastContextPath = (BEXI_ApplicationPath) managerContext.getLastContext(new BEXI_ApplicationPath(null), BEXI_ContextManager.CIRCULAR_LIST);
        BEXI_SqlContext lastSqlContextAdmin = lastContextPath.get_SqlContextManager().get_sqlContext_admin();
        if (lastSqlContextAdmin == null) {
            throw new BEXI_ExpressionException("Cannot analyze the expression " + expression + " because there is no application context");
        }

        // STEP 1
        // Split the expression and build all the list to set up the dialog recognition
        try {
            splitAndBuildListOfWordNL(lastContextPath, _expression);
        } catch (BEXI_ObjectExplorerException e) {
            throw e;
        } catch (BEXI_ApplicationPathException e) {
            throw e;
        }

        // STEP 2
        // Look for action according previous equal expression
        // If a similar expression has already been used, It's not necessary to continue to analyze this expression.
        // Just return the previous actions
        BEXI_ExpressionManager managerExpression = new BEXI_ExpressionManager(context);
        BEXI_Expression equalExpression = managerExpression.getPreviousEqualExpression(this);
        if (equalExpression != null) {
            // System.out.println("GREAT!!!!EQUAL EXPRESSION!!!!!!! actions used:" + equalExpression._actions.getItem(0) + " for " + expression);
            _actions.add(equalExpression._actions.getItem(0));
            _metaRules.add(equalExpression._metaRules.getItem(0));
            _genericActions.add(equalExpression._genericActions.getItem(0));
            foundAction = true;
        }

        // STEP 3
        // Look for action according previous similar expression only if step 2 doesn't work
        // If a similar expression but using different concept has already been used, It's not necessary to continue to analyze this expression.
        // Just return the previous actions + new concept
        if (!foundAction) {
            BEXI_Expression similarExpression = managerExpression.getPreviousSimilarExpression(this);

            if (similarExpression != null) {
                //System.out.println("GREAT!!!!SIMILAR EXPRESSION!!!!!!! actions used:" + similarExpression._actions.getItem(0) + " for " + expression);
                _actions.add(similarExpression._actions.getItem(0));
                _metaRules.add(similarExpression._metaRules.getItem(0));
                _genericActions.add(similarExpression._genericActions.getItem(0));

                //update the action
                BEXI_Action action = new BEXI_Action();
                String newAction = action.built(_racineList, _variables, _genericActions.getItem(0));
                _actions.replaceItem(newAction, 0);

                foundAction = true;
            }
        }

        // STEP 4
        // Look for actions  according metarules only if step 3 doesn't work
        if (!foundAction) {
            BEXI_MetaRules metaRules = new BEXI_MetaRules(this);
            try {
                _actions = metaRules.getActionList(lastContextPath);
                _genericActions = metaRules.getGenericActionsFound();
                _metaRules = metaRules.getMetarulesFound();
                _racines = metaRules.getRacineListFound();
                foundAction = true;

            } catch (BEXI_MetaRuleException e) {
                throw e;
            } catch (BEXI_ActionException e) {
                throw e;
            }

            // STEP 5
            // Try to fix ambiguous action and to get the good one
            // If actions found
            if (_actions.getItemCount() > 1) {
                //printList();
                BEXI_Action action = new BEXI_Action(_actions, _genericActions, _metaRules, _racines);
                if (action.solveAmbiguousAction()) {
                    _genericActions = metaRules.getGenericActionsFound();
                    _metaRules = metaRules.getMetarulesFound();
                    _actions = action.getActions();
                }
            }

        }

        // STEP 6
        // Set up expression instance
        BEXI_MetaRules metaRules = new BEXI_MetaRules(this);
        _genericMetarule = metaRules.getGenericMetarule(lastContextPath, lastSqlContextAdmin, getMetarules().getItem(0));
        setGenericType();
        setGenericRacines();
        setAbstractDataTypes();

        if (AmbiguousFoundAction) {
            throw new BEXI_ExpressionException("Ambiguous actions found for [" + _expression + "]");
        }
        return _actions;
    }


    /**
     * analyse the meta-langage expression  syntax and return rules
     *
     * @param expression .
     * @return list of rules.
     * @throws BEXI_ExpressionException .
     * @throws BEXI_MetaRuleException   .
     */
    public BEXI_list analyzeMetaLanguage(String expression) throws
            BEXI_ExpressionException, BEXI_MetaRuleException {

        removeLists();
        _expression = expression;
        // Split the expression and build all the list to set up the dialog recognition
        splitAndBuildListOfWordML(_expression);
        //printLists();

        BEXI_list rules = null;
        try {
            // Look for metaRules
            BEXI_MetaRules metaRules = new BEXI_MetaRules(this);
            rules = metaRules.getListMetaLanguage();
        } catch (BEXI_MetaRuleException e) {
            throw e;
        }

        return rules;
    }

    /**
     * Return a list of action for a natural language expression
     *
     * @param actionRes .
     * @param context   .
     * @return action result.
     * @throws Exception .
     */
    public Object result(BEXI_Context context, String actionRes) throws Exception {

        // Look for the last application context
        BEXI_ContextManager managerContext = new BEXI_ContextManager(context);
        BEXI_SqlContext applicationContext = (BEXI_SqlContext) managerContext.getLastContext(new BEXI_SqlContext(null), BEXI_ContextManager.CIRCULAR_LIST);
        if (applicationContext == null) {
            throw new BEXI_ExpressionException("No result because there is no application context");
        }

        Object result;

        try {
            BEXI_SQLDriver bexi_SQLDriver = new BEXI_SQLDriver();
            result = bexi_SQLDriver.selectListDriver(applicationContext, actionRes, "OPENBEXI");
        } catch (Exception e) {
            throw e;
        }
        return result;
    }

}
