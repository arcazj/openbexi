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

import java.awt.*;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Menage OPENBEXI action.
 */
public final class BEXI_Action {
    public static String SQL_QUERY = "execute_SQL_query";
    public static String DELETE_CLASS = "delete_class";
    public static String SELECT_CLASS = "select_class";
    public static String CREATE_CLASS = "create_class";
    public static String CREATE_CLASS_LINK = "create_class_link";
    public static String DELETE_CLASS_LINK = "delete_class_link";
    public static String CREATE_CLASS_ATTRIBUT = "create_class_attribut";
    public static String DELETE_CLASS_ATTRIBUT = "delete_class_attribut";
    public static String CREATE_CLASS_OBJECT = "create_class_object";
    public static String DELETE_CLASS_OBJECT = "delete_class_object";
    public static String CREATE_CLASS_OBJECT_ATTRIBUT = "create_class_object_attribut";
    public static String CREATE_CLASS_OBJECT_LINK = "create_class_object_link";
    public static String DELETE_CLASS_OBJECT_ATTRIBUT = "delete_classe_object_attribut";
    public static String SELECT_CLASSES = "select_classes";
    public static String SELECT_ONE_CLASS_ATTRIBUT = "select_one_class_attribut";
    public static String SELECT_RANDOM_CLASS_ATTRIBUTS = "select_random_class_attributs";
    public static String SELECT_CLASS_ATTRIBUT = "select_class_attributs";
    public static String SELECT_CLASS_OBJECT_ATTRIBUTS = "select_class_object_attributs";
    public static String SELECT_CLASS_OBJECT_LINK = "select_class_object_link";
    public static String DELETE_CLASS_OBJECT_LINK = "delete_class_object_link";


    private int _nbActions;
    private final BEXI_list _genericActions;
    private final BEXI_list _actions;
    private final BEXI_list _metarules;
    private final BEXI_list _racines;

    /**
     * BEXI_Action constructor.
     */
    public BEXI_Action() {
        _nbActions = 0;
        _genericActions = new BEXI_list();
        _actions = new BEXI_list();
        _metarules = new BEXI_list();
        _racines = new BEXI_list();
    }

    /**
     * BEXI_Action constructor.
     *
     * @param actions        .
     * @param genericActions .
     * @param metarules      .
     * @param racines        .
     */
    public BEXI_Action(final BEXI_list actions, final BEXI_list genericActions, final BEXI_list metarules, final BEXI_list racines) {
        _nbActions = actions.getItemCount();
        _actions = actions;
        _genericActions = genericActions;
        _metarules = metarules;
        _racines = racines;
    }

    /**
     * Return the genericAction list according the action list.
     *
     * @return _genericActions
     */
    public BEXI_list getGenericActions() {
        return _genericActions;
    }


    /**
     * Return the action list according the action list.
     *
     * @return _racines
     */
    public BEXI_list getActions() {
        return _actions;
    }

    /**
     * Return the metaRule list according the action list.
     *
     * @return _metarules
     */
    public BEXI_list getMetaRules() {
        return _metarules;
    }

    /**
     * Return the racine list according the action list.
     *
     * @return _racines
     */
    public BEXI_list getRacines() {
        return _racines;
    }


    /**
     * Print the action list.
     * <li> Result exemple:
     * <li> 2 actions have been found:
     * <li> Best action is    :delete_class_link la classer synonyme for metarule:if [verbe] détruire [nom] _X1 [verbe] _X2 [nom] _X3 racineList:détruire la classer synonyme
     * <li> other action found:delete_class synonyme for metarule:if [verbe] détruire [déterminant] _X1 [nom] classe [nom] _X3 racineList:détruire la classe synonyme
     */
    private void printList() {

        if (_nbActions == 0) {
            System.out.println(_nbActions + " action has been found:");
        } else {
            System.out.println(_nbActions + " actions have been found:");
        }
        for (int j = 0; j < _nbActions; j++) {
            if (j == 0) {
                System.out.println("Best action is    :" + _actions.getItem(j) + " for metarule:" + _metarules.getItem(j) + " --- racineList:" + _racines.getItem(j));
            } else {
                System.out.println("other action found:" + _actions.getItem(j) + " for metarule:" + _metarules.getItem(j) + " --- racineList:" + _racines.getItem(j));
            }
        }
    }

    /**
     * Return one action among a list of actions according the following step:
     * <li> step 1: Find the number of racine word which match which the metarule.
     * <li> step 2: keep the action where the number of racine words found is the bigger.
     * <li> step 3: If the number is equal, the method cannot solve the issue and raise an exception.
     *
     * @return list of actions
     */
    public boolean solveAmbiguousAction() {
        boolean actionFound = false;

        final int[] counter = new int[_nbActions];
        for (int i = 0; i < _nbActions; i++) {
            counter[i] = -1;
        }

        if (_nbActions == 0) {
            return false;
        }
        //printList();
        // be sure that metarules in the list are not duplicated.
        // if not, clear the duplicated metarule
        for (int i = 0; i < _nbActions - 1; i++) {
            for (int j = 1; j < _nbActions; j++) {
                final String mi = _metarules.getItem(i);
                final String mj = _metarules.getItem(j);
                //Fixed bug JCA:  May 28 2007 (added i!=j)
                if (i != j && mi.equals(mj)) {
                    _metarules.replaceItem("", j);
                }
            }
        }
        //printList();
        // Find the number of racine words which match which the metarule.
        for (int i = 0; i < _nbActions; i++) {
            counter[i] = 0;
            if (!_metarules.getItem(i).equals("")) {
                final String[] racineList = _racines.getItem(i).split("[ *]");
                final String[] wordMetarule = _metarules.getItem(i).split("[ *]");
                int incr = 2;
                for (int j = 0; j < racineList.length; j++) {
                    if (racineList[j].equals(wordMetarule[incr])) {
                        counter[i] = counter[i] + 1;
                    }
                    incr = incr + 2;
                }
            }
        }

        // keep the action where the number of racine words found is the bigger.
        int indice = 0;
        int max = 0;
        for (int i = 0; i < _nbActions; i++) {
            if (counter[i] > max) {
                max = counter[i];
                indice = i;
            }
        }
        int count = 0;
        for (int i = 0; i < _nbActions; i++) {
            if (counter[i] == max) {
                count = count + 1;
            }
        }
        if (count == 1) {
            actionFound = true;
        }

        // If the number of matched words were equal for different metarules,
        // but if the actions are identical for all these metarules, just return this action
        // If there are different actions the method cannot solve the issue except,
        // and raise an exception.
        String actionTmp = null;
        if (count > 1) {
            for (int i = 0; i < _nbActions; i++) {
                if (counter[i] == max) {
                    if (actionTmp != null) {
                        if (actionTmp.equals(_actions.getItem(i))) {
                            actionFound = true;
                        } else {
                            actionFound = false;
                        }

                    }
                    actionTmp = _actions.getItem(i);
                }
            }
        }

        if (actionFound) {
            final String action = _actions.getItem(indice);
            final String genericAction = _genericActions.getItem(indice);
            final String metarule = _metarules.getItem(indice);
            final String racineList = _racines.getItem(indice);

            final String action1 = _actions.getItem(0);
            final String genericAction1 = _genericActions.getItem(0);
            final String metarule1 = _metarules.getItem(0);
            final String racineList1 = _racines.getItem(0);

            _actions.replaceItem(action, 0);
            _genericActions.replaceItem(genericAction, 0);
            _metarules.replaceItem(metarule, 0);
            _racines.replaceItem(racineList, 0);

            _actions.replaceItem(action1, indice);
            _genericActions.replaceItem(genericAction1, indice);
            _metarules.replaceItem(metarule1, indice);
            _racines.replaceItem(racineList1, indice);
            //printList();
            return true;

        } else {
            //printList();
            return false;

        }
    }

    public String built(final BEXI_list racineList, BEXI_list variables, final String action) {
        final String[] itemAction = action.split("[ *.,]");
        String newAction = itemAction[0];

        for (int i = 1; i < itemAction.length; i++) {
            for (int j = 0; j < variables.getItemCount(); j++) {
                if (itemAction[i].equals(variables.getItem(j))) {
                    newAction = newAction + " " + racineList.getItem(j);
                    break;
                }
            }
        }

        return new String(newAction);
    }

    /**
     * Build the appropriate action from the generic action and according the expression.
     * <li> This method replaces all the variables inside the generic action with the racine word from the expression.
     * <li> exemple: "creer la classe mot"
     * <li> The generic action looks like : delete_class _X3
     * <li> The appropriate action will be: delete_class mot
     *
     * @param racineList .
     * @param action     .
     * @return action updated
     */
    public String built(final String racineList, final String action) {
        StringBuffer updatedAction = new StringBuffer(action);
        // System.out.println("genericAction=" + updatedAction);

        final String[] currentRacineList = racineList.split("[ *.,]");

        for (int i = 0; i < currentRacineList.length; i++) {
            // remove blanck on the both side of the word
            final String word = currentRacineList[i].trim();
            if (word.length() != 0) {

                final CharSequence inputStr = updatedAction;
                final String patternStr = "_X" + Integer.toString(i);

                // Compile regular expression
                final Pattern pattern = Pattern.compile(patternStr);
                final Matcher matcher = pattern.matcher(inputStr);

                // Replace all occurrences of pattern in input
                updatedAction = new StringBuffer();
                while (matcher.find()) {
                    // Get the match result
                    matcher.group();
                    // Insert replacement
                    matcher.appendReplacement(updatedAction, currentRacineList[i]);
                }
                matcher.appendTail(updatedAction);
            }
        }

        return new String(updatedAction).trim();
    }

    /**
     * return a list of actions:
     * <li> An action is made of driver action + parameters
     * <li> Parameter(s) = class, class attribut, class object, class link, etc ....
     * <li>
     * <li> Action exemple: delete_class synonyme
     * <li> where delete_class is the driver action,
     * <li> and synonyme is the class parameter of the driver action
     * <li>
     *
     * @param contextPath         .
     * @param racineListForAction .
     * @param ruleList            .
     * @return action list .
     * @throws BEXI_ActionException if no action found or ambiguous action .
     */

    public BEXI_list get(BEXI_ApplicationPath contextPath, final BEXI_list racineListForAction, final BEXI_list ruleList)
            throws BEXI_ActionException {

        String currentGenericAction;
        String racineList;
        String metaRule;
        String action;
        String query = null;
        boolean actionFound = false;

        try {
            // For the current rule
            ResultSet result = null;
            for (int i = 0; i < ruleList.getItemCount(); i++) {

                Statement sStatement = contextPath.get_SqlContextManager().get_sqlContext_admin().get_statement();
                // Look for action
                query = "SELECT ACTION FROM " + contextPath.getDefaultLanguage() + "_metaRules WHERE rule='" + ruleList.getItem(i) + "'";
                sStatement.execute(query);
                //System.out.println("-------------"+ruleList.getItem(i));
                result = sStatement.getResultSet();
                final ResultSetMetaData metaDataKey = result.getMetaData();
                final int col = metaDataKey.getColumnCount();

                while (result.next()) {
                    // checkIfObjectExist action
                    for (int j = 1; j <= col; j++) {
                        currentGenericAction = result.getString(j);
                        racineList = racineListForAction.getItem(i);
                        metaRule = ruleList.getItem(i);
                        action = built(racineList, currentGenericAction);
                        _genericActions.add(currentGenericAction, _nbActions);
                        _racines.add(racineList, _nbActions);
                        _metarules.add(metaRule, _nbActions);
                        _actions.add(action, _nbActions);
                        _nbActions = _nbActions + 1;
                        actionFound = true;
                    }
                }
                //if (actionFound == true) break;
            }
            if (result != null) {
                result.close();
            }
        } catch (SQLException e) {
            System.out.println(e.getMessage());
            throw new BEXI_ActionException(" No action found for " + query);

        }

        if (!actionFound) {
            throw new BEXI_ActionException(" No action found for " + query + " (" + racineListForAction.getItem(0) + ")");
        }

        // If action found
        /*if (_nbActions > 1) {
            //printList();
            if (solveAmbiguousAction()) {
                return _actions;
            } else {
                throw new BEXI_ActionException("Ambiguous actions found for [" + racineListForAction.getItem(0) + "]");
            }
        }*/

        return _actions;

    }

}
