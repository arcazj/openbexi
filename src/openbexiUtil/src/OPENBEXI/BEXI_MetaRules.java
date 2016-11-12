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

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;

/**
 * Menage OPENBEXI rules
 */


public class BEXI_MetaRules {

    private String _metarule;
    private String _genericMetarule;
    private BEXI_list _genericRuleList;
    private BEXI_list _derivedRuleList;
    private BEXI_list _racineListForGenericAction;
    private BEXI_list _racineListForDerivedAction;
    private BEXI_list _ruleList;
    private BEXI_list _racineListForAction;

    private BEXI_list _genericMetarulesFound;
    private BEXI_list _metarulesFound;
    private BEXI_list _actionsFound;
    private BEXI_list _genericActionsFound;
    private BEXI_list _racineListFound;
    private int _nbActionsFound;

    private int _nbRule;
    private BEXI_Expression _expression;

    public BEXI_MetaRules() {
    }

    public BEXI_MetaRules(BEXI_Expression expression) {

        _metarule = null;
        _genericMetarule = null;
        _expression = expression;
        _genericRuleList = new BEXI_list();
        _derivedRuleList = new BEXI_list();
        _racineListForGenericAction = new BEXI_list();
        _racineListForDerivedAction = new BEXI_list();
        _racineListForAction = new BEXI_list();
        _ruleList = new BEXI_list();

        _genericMetarulesFound = new BEXI_list();
        _metarulesFound = new BEXI_list();
        _actionsFound = new BEXI_list();
        _genericActionsFound = new BEXI_list();
        _racineListFound = new BEXI_list();
        _nbActionsFound = 0;
        _nbRule = 0;

    }

    private String getMetarule() {
        return _metarule;
    }

    private void setMetarule(String metaRule) {
        _metarule = metaRule;
    }

    public BEXI_list getGenericMetarulesFound() {
        return _genericMetarulesFound;
    }

    public BEXI_list getMetarulesFound() {
        return _metarulesFound;
    }

    public BEXI_list getActionsFound() {
        return _actionsFound;
    }

    public BEXI_list getGenericActionsFound() {
        return _genericActionsFound;
    }

    public BEXI_list getRacineListFound() {
        return _racineListFound;
    }

    private String getGenericMetarule() {
        return _genericMetarule;
    }

    public BEXI_list get_All_NLExample(BEXI_ApplicationPath contextPath, BEXI_SqlContext context) throws BEXI_MetaRuleException {

        BEXI_list NLExample = new BEXI_list();

        String query = null;
        boolean actionFound = false;
        Statement sStatement = null;

        sStatement = context.get_statement();

        try {
            // For the current rule
            ResultSet result = null;

            //sStatement=context.get_sStatement();

            // Look for action
            query = "SELECT NLEXAMPLE FROM " + contextPath.getDefaultLanguage() + "_metaRules";
            //System.out.println(query);
            sStatement.execute(query);
            result = sStatement.getResultSet();
            final ResultSetMetaData metaDataKey = result.getMetaData();
            final int col = metaDataKey.getColumnCount();

            while (result.next()) {
                // checkIfObjectExist action
                for (int j = 1; j <= col; j++) {
                    NLExample.add(result.getString(j));
                    actionFound = true;
                }
            }
            if (result != null) {
                result.close();
            }
        } catch (SQLException e) {
            //e.printStackTrace();
            throw new BEXI_MetaRuleException(" No metaRule found for " + query);

        }

        if (!actionFound) {
            throw new BEXI_MetaRuleException(" No genericMetaRule found ");
        }

        return NLExample;
    }

    public BEXI_list get_All_GenericMetarule(BEXI_ApplicationPath contextPath, BEXI_SqlContext context) throws BEXI_MetaRuleException {

        BEXI_list genericMetarules = new BEXI_list();

        String query = null;
        boolean actionFound = false;
        Statement sStatement = null;

        sStatement = context.get_statement();

        try {
            // For the current rule
            ResultSet result = null;

            //sStatement=context.get_sStatement();

            // Look for action
            query = "SELECT GENERICMETARULE FROM " + contextPath.getDefaultLanguage() + "_metaRules";
            //System.out.println(query);
            sStatement.execute(query);
            result = sStatement.getResultSet();
            final ResultSetMetaData metaDataKey = result.getMetaData();
            final int col = metaDataKey.getColumnCount();

            while (result.next()) {
                // checkIfObjectExist action
                for (int j = 1; j <= col; j++) {
                    genericMetarules.add(result.getString(j));
                    actionFound = true;
                }
            }
            if (result != null) {
                result.close();
            }
        } catch (SQLException e) {
            //e.printStackTrace();
            throw new BEXI_MetaRuleException(" No metaRule found for " + query);

        }

        if (!actionFound) {
            throw new BEXI_MetaRuleException(" No genericMetaRule found ");
        }

        return genericMetarules;
    }


    public String getGenericMetarule(BEXI_ApplicationPath contextPath, BEXI_SqlContext context, String metaRule) throws BEXI_MetaRuleException {

        String query = null;
        boolean actionFound = false;
        Statement sStatement = null;

        sStatement = context.get_statement();

        try {
            // For the current rule
            ResultSet result = null;

            //sStatement=context.get_sStatement();

            // Look for action
            query = "SELECT GENERICMETARULE FROM " + contextPath.getDefaultLanguage() + "_metaRules WHERE rule='" + metaRule + "'";
            //System.out.println(query);
            sStatement.execute(query);
            result = sStatement.getResultSet();
            final ResultSetMetaData metaDataKey = result.getMetaData();
            final int col = metaDataKey.getColumnCount();

            while (result.next()) {
                // checkIfObjectExist action
                for (int j = 1; j <= col; j++) {
                    _genericMetarule = result.getString(j);
                    actionFound = true;
                }
            }
            if (result != null) {
                result.close();
            }
        } catch (SQLException e) {
            //e.printStackTrace();
            throw new BEXI_MetaRuleException(" No metaRule found for " + query);

        }

        if (!actionFound) {
            throw new BEXI_MetaRuleException(" No genericMetaRule found for metaRule :" + metaRule);
        }

        return _genericMetarule;
    }

    private void setGenericMetarule(String genericMetarule) {
        _genericMetarule = genericMetarule;
    }

    private void printGenericRuleList() {
        System.out.println("nbGenericRule=" + _genericRuleList.getItemCount());
        for (int j = 0; j < _genericRuleList.getItemCount(); j++) {
            System.out.println("Generic--" + _genericRuleList.getItem(j));
        }
    }

    private void printDerivedRuleList() {
        System.out.println("nbDerivedRule=" + _derivedRuleList.getItemCount());
        for (int j = 0; j < _derivedRuleList.getItemCount(); j++) {
            System.out.println("Derived----" + _derivedRuleList.getItem(j));
        }
    }

    private void printRuleList() {
        System.out.println("nbRule=" + _ruleList.getItemCount());
        for (int j = 0; j < _ruleList.getItemCount(); j++) {
            System.out.println("Rule----" + _ruleList.getItem(j));
        }
    }

    // Example: expression "créer une classe homme"
    //
    // 1 1 1 créer créer [Ver] Inf
    // 2 1 3 une un _X1 [Adj] Fem+SG
    // 2 2 3 une un _X2 [Det] Fem+SG
    // 2 3 3 une une _X2 [Nom] Fem+SG
    // 3 1 1 classe classe _X3 [Nom] Fem+SG
    // 4 1 1 homme homme _X4 [Nom] Mas+SG

    // Build step by step the following matrix
    // to find all combination according the data above

    // 0 0 0 1
    // 0 0 1 0
    // 0 0 1 1
    // 0 1 0 0
    // 0 1 0 1
    // 0 1 1 0
    // 0 1 1 1
    // 1 0 0 0
    // 1 0 0 1
    // 1 0 1 0
    // 1 1 0 0
    // 1 1 0 1
    // 1 1 1 0
    // 1 1 1 1
    //

    private int[] getNextDerivedRule(int[] flagTableCurrent, int nbWord) {

        int[] newFlagTable = new int[nbWord];

        for (int i = 0; i < nbWord; i++) {
            newFlagTable[i] = flagTableCurrent[i];
        }

        int j = 0;
        for (int i = nbWord - 1; i >= 0; i--) {
            if (flagTableCurrent[i] < 1) {
                newFlagTable[i] = 1;
                j = i;
                break;
            }
        }
        for (int i = j + 1; i < nbWord; i++) {
            newFlagTable[i] = 0;
        }
        return newFlagTable;
    }

    /**
     * <li> Example: expression "créer une classe homme"
     * <li>
     * <li> 1 1 1 créer créer [Ver] Inf
     * <li> 2 1 3 une un _X1 [Adj] Fem+SG
     * <li> 2 2 3 une un _X2 [Det] Fem+SG
     * <li> 2 3 3 une une _X2 [Nom] Fem+SG
     * <li> 3 1 1 classe classe _X3 [Nom] Fem+SG
     * <li> 4 1 1 homme homme _X4 [Nom] Mas+SG
     * <li>
     * <li> Build step by step the following matrix
     * <li> of type word according the data above
     * <li> 1 1 1 1
     * <li> 1 2 1 1
     * <li> 1 3 1 1
     * <li> 1 1 1 1
     * <li>
     *
     * @param flagTypeTableCurrent .
     * @param nbWord               .
     * @return next generic rules
     */
    private int[] getNextGenericRule(int[] flagTypeTableCurrent, int nbWord) {

        // Set the new Flag table
        int[] newFlagTable = new int[nbWord];
        for (int i = 0; i < nbWord; i++) {
            newFlagTable[i] = flagTypeTableCurrent[i];
        }

        int j = 0;
        for (int i = nbWord - 1; i >= 0; i--) {
            if (flagTypeTableCurrent[i] < _expression.getNumMaxType(i + 1)) {
                newFlagTable[i] = _expression.getIndexWordType(i + 1, flagTypeTableCurrent[i] + 1);
                j = i;
                break;
            }
        }
        for (int i = j + 1; i < nbWord; i++) {
            newFlagTable[i] = 1;
        }

        return newFlagTable;
    }

    /**
     * Return number of rules according the word number inside a expression
     *
     * @param nbWord
     * @return Number of rules
     */
    private int getNbRules(int nbWord) {
        int nbRules = 1;
        for (int i = 0; i < nbWord; i++) {
            nbRules = nbRules * _expression.getNumMaxType(i + 1);
        }
        return nbRules;
    }

    private String getRacineList(int[] flagTypeTableCurrent, int nbWord) {
        int occur;
        String racines = "";

        for (int i = 0; i < nbWord; i++) {
            occur = _expression.getIndexWordNum(i + 1, flagTypeTableCurrent[i]);
            if (occur != -1) {
                racines = racines + _expression.getRacineList().getItem(occur) + " ";
            } else {
                racines = "";
            }
        }
        return racines.trim();
    }


    /**
     * @return _racineListForAction
     */

    public BEXI_list getRacineListForAction() {
        return _racineListForAction;
    }

    /**
     * Look for and build tge list of generic metarules
     * <li> A generic metarule is made of non-variable words like _X1, _X2, ...
     * <li>
     * <li> Example: Inside the expression "créer une classe homme"
     * <li> the generic metarule you  can checkIfObjectExist is:
     * <li> if [Ver] _X0 [Det] _X1 [Nom] _X2 [Nom] _X3
     * <li> _X0, _X1, _X2 and _X3 are variable
     * <li>
     * <li> List of all generic metarules you can checkIfObjectExist for the expression "créer une classe homme":
     * <li> if [Ver] _X0 [Det] _X1 [Nom] _X2 [Nom] _X3
     * <li> if [Ver] _X0 [Nom] _X1 [Nom] _X2 [Nom] _X3
     * <li> if [Ver] _X0 [Adj] _X1 [Nom] _X2 [Nom] _X3
     *
     * @param flagTypeTableCurrent
     * @param nbWord
     * @return a generic rule.
     */

    private String buildGenericRules(int[] flagTypeTableCurrent, int nbWord) {
        int occur;
        String rule;
        rule = "if ";

        for (int i = 0; i < nbWord; i++) {
            occur = _expression.getIndexWordNum(i + 1, flagTypeTableCurrent[i]);
            if (occur != -1) {
                rule = rule + _expression.getTypes().getItem(occur) + " " + "_X" + i + " ";
            } else {
                rule = "";
            }
        }
        return rule.trim();
    }

    private String buildDerivedRules(int[] flagTableCurrent,
                                     int[] flagTypeTableCurrent, int nbWord) {
        int occur;
        String rule = "if ";

        for (int i = 0; i < nbWord; i++) {
            occur = _expression.getIndexWordNum(i + 1, flagTypeTableCurrent[i]);
            if (occur != -1) {
                if (flagTableCurrent[i] == 0) {
                    rule = rule + _expression.getTypes().getItem(occur) + " " + _expression.getRacineList().getItem(occur) +
                            " ";
                } else {
                    rule = rule + _expression.getTypes().getItem(occur) + " " + "_X" + i + " ";
                }
            } else {
                rule = "";
            }
        }
        return rule.trim();
    }

    private String buildDerivedMetaRules(int[] flagTableCurrent,
                                         int[] flagTypeTableCurrent, int nbWord) {
        int occur;
        String rule = "if ";

        for (int i = 0; i < nbWord; i++) {
            occur = _expression.getIndexWordNum(i + 1, flagTypeTableCurrent[i]);
            if (occur != -1) {
                if (flagTableCurrent[i] == 0) {
                    rule = rule + _expression.getTypes().getItem(occur) + " " + _expression.getRacineList().getItem(occur) +
                            " ";
                } else {
                    rule = "";
                    break;
                }
            } else {
                rule = "";
            }
        }
        return rule.trim();
    }


    /**
     * Return all generic and derived metarules according the natural language expressio
     * <p/>
     * <li> Example: expression "créer une classe homme"
     * <li>
     *
     * @param contextPath .
     * @return all generic and derived metarules according the natural language expression .
     * @throws BEXI_MetaRuleException .
     * @throws BEXI_ActionException   .
     * @throws SQLException           .
     * @throws InstantiationException .
     * @throws IllegalAccessException .
     * @throws ClassNotFoundException .
     */
    public BEXI_list getActionList(BEXI_ApplicationPath contextPath)
            throws BEXI_MetaRuleException, BEXI_ActionException, SQLException, InstantiationException, IllegalAccessException, ClassNotFoundException {

        int step = 0;
        int nbWord = _expression.getNbWord();
        int nbRules = getNbRules(nbWord);
        int[] newFlagTypeTable = new int[nbWord];
        int[] flagTypeTableCurrent = new int[nbWord];
        BEXI_Action action = new BEXI_Action();

        for (int i = 0; i < nbWord; i++) {
            newFlagTypeTable[i] = 1;
            flagTypeTableCurrent[i] = 1;
        }

        // checkIfObjectExist the list rules from the previous analyse
        while (step < nbRules) {
            BEXI_list actionsTmp = null;
            BEXI_list genericActionsTmp = null;
            BEXI_list metarulesTmp = null;
            BEXI_list racineListTmp = null;
            newFlagTypeTable = getNextGenericRule(flagTypeTableCurrent, nbWord);
            _genericRuleList.add(buildGenericRules(flagTypeTableCurrent, nbWord));
            _racineListForGenericAction.add(getRacineList(flagTypeTableCurrent, nbWord));
            step = step + 1;
            // Get on the fly the derived rules and action
            getDerivedRuleList(flagTypeTableCurrent, nbWord);
            flagTypeTableCurrent = newFlagTypeTable;

            try {
                BEXI_SqlContext SqlContext = contextPath.get_SqlContextManager().get_sqlContext_admin();
                actionsTmp = action.get(contextPath, _racineListForDerivedAction, _derivedRuleList);
                genericActionsTmp = action.getGenericActions();
                metarulesTmp = action.getMetaRules();
                racineListTmp = action.getRacines();
                for (int i = 0; i < actionsTmp.getItemCount(); i++) {
                    _actionsFound.add(actionsTmp.getItem(i), _nbActionsFound);
                    _genericActionsFound.add(genericActionsTmp.getItem(i), _nbActionsFound);
                    _metarulesFound.add(metarulesTmp.getItem(i), _nbActionsFound);
                    _racineListFound.add(racineListTmp.getItem(i), _nbActionsFound);
                    _nbActionsFound = _nbActionsFound + 1;
                }

            } catch (BEXI_ActionException e) {
                //throw e;
            }

            try {

                actionsTmp = action.get(contextPath, _racineListForGenericAction, _genericRuleList);
                genericActionsTmp = action.getGenericActions();
                metarulesTmp = action.getMetaRules();
                racineListTmp = action.getRacines();
                for (int i = 0; i < actionsTmp.getItemCount(); i++) {
                    _actionsFound.add(actionsTmp.getItem(i), _nbActionsFound);
                    _genericActionsFound.add(genericActionsTmp.getItem(i), _nbActionsFound);
                    _metarulesFound.add(metarulesTmp.getItem(i), _nbActionsFound);
                    _racineListFound.add(racineListTmp.getItem(i), _nbActionsFound);
                    _nbActionsFound = _nbActionsFound + 1;
                }
            } catch (BEXI_ActionException e) {
                //throw e;
            }

            //printDerivedRuleList();
            //printGenericRuleList();
            // Save genericMetarules
            for (int i = 0; i < _genericRuleList.getItemCount(); i++) {
                _genericMetarulesFound.add(_genericRuleList.getItem(i));
            }
            if (_genericRuleList != null) _genericRuleList.removeAll();
            if (_derivedRuleList != null) _derivedRuleList.removeAll();
            if (_racineListForGenericAction != null) _racineListForGenericAction.removeAll();
            if (_racineListForDerivedAction != null) _racineListForDerivedAction.removeAll();

        }

        // Check if there is a rule
        if (nbRules == 0) {
            throw new BEXI_MetaRuleException("No rule found for this expression");
        }
        if (_actionsFound == null) {
            throw new BEXI_MetaRuleException("No action found for this expression");
        } else {
            if (_actionsFound.getItemCount() == 0) {
                throw new BEXI_MetaRuleException("No action found for this expression");
            }
        }
        //printDerivedRuleList();
        //printGenericRuleList();
        return _actionsFound;
    }

    public BEXI_list getListMetaLanguage()
            throws BEXI_MetaRuleException {

        int step = 0;
        int nbWord = _expression.getNbWord();
        int nbRules = getNbRules(nbWord);
        int[] newFlagTypeTable = new int[nbWord];
        int[] flagTypeTableCurrent = new int[nbWord];
        for (int i = 0; i < nbWord; i++) {
            newFlagTypeTable[i] = 1;
            flagTypeTableCurrent[i] = 1;
        }
        // checkIfObjectExist the list rules from the previous analyse
        while (step < nbRules) {
            newFlagTypeTable = getNextGenericRule(flagTypeTableCurrent, nbWord);
            _genericRuleList.add(buildGenericRules(flagTypeTableCurrent, nbWord));
            _racineListForGenericAction.add(getRacineList(flagTypeTableCurrent, nbWord));
            step = step + 1;
            // Get on the fly the derived rules
            getDerivedMetaRuleList(flagTypeTableCurrent, nbWord);
            flagTypeTableCurrent = newFlagTypeTable;
        }

        // build the list rule Derived rules+ Generic rule
        _nbRule = _derivedRuleList.getItemCount() + _genericRuleList.getItemCount();
        for (int i = 0; i < _derivedRuleList.getItemCount(); i++) {
            if (_derivedRuleList.getItem(i) != "") {
                _ruleList.add(_derivedRuleList.getItem(i));
                _racineListForAction.add(_racineListForDerivedAction.getItem(i));
            }
        }
        for (int i = 0; i < _genericRuleList.getItemCount(); i++) {
            if (_genericRuleList.getItem(i) != "") {
                _ruleList.add(_genericRuleList.getItem(i));
                _racineListForAction.add(_racineListForGenericAction.getItem(i));
            }
        }

        // Check if if there is a rule
        if (_ruleList.getItemCount() == 0) {
            throw new BEXI_MetaRuleException("No rule found for this expression");
        }

        // printRuleList();
        return _derivedRuleList;
    }

    /**
     * Look for and build tge list of derived metarules
     * <li> A derived metarule is made of variable word like _X1, _X2, ...
     * <li> and non-variable word like "une", "homme", ...
     * <li>
     * <li> Example: Inside the expression "créer une classe homme"
     * <li> one of derived metarule you can checkIfObjectExist is:
     * <li> if [Ver] créer [Det] _X1 [Nom] _X2 [Nom] _X3
     * <Li>  "créer" is non-variable
     * <li> _X1, _X2 and _X3 are variable
     * <li>
     * <li> Example of all derived metarules from the expression and combination above:
     * <li>
     * <li> if [Ver] créer [Det] un [Nom] classe [Nom] homme
     * <li> if [Ver] créer [Det] un [Nom] classe [Nom] _X3
     * <li> if [Ver] créer [Det] un [Nom] _X2 [Nom] homme
     * <li> if [Ver] créer [Det] un [Nom] _X2 [Nom] _X3
     * <li> if [Ver] créer [Det] _X1 [Nom] classe [Nom] homme
     * <li> if [Ver] créer [Det] _X1 [Nom] classe [Nom] _X3
     * <li> if [Ver] créer [Det] _X1 [Nom] _X2 [Nom] homme
     * <li> if [Ver] créer [Det] _X1 [Nom] _X2 [Nom] _X3
     * <li> if [Ver] _X0 [Det] un [Nom] classe [Nom] homme
     * <li> if [Ver] _X0 [Det] un [Nom] classe [Nom] _X3
     * <li> if [Ver] _X0 [Det] un [Nom] _X2 [Nom] homme
     * <li> if [Ver] _X0 [Det] un [Nom] _X2 [Nom] _X3
     * <li> if [Ver] _X0 [Det] _X1 [Nom] classe [Nom] homme
     * <li> if [Ver] _X0 [Det] _X1 [Nom] classe [Nom] _X3
     * <li> if [Ver] _X0 [Det] _X1 [Nom] _X2 [Nom] homme
     * <li>
     * <li> if [Ver] créer [Nom] une [Nom] classe [Nom] homme
     * <li> if [Ver] créer [Nom] une [Nom] classe [Nom] _X3
     * <li> if [Ver] créer [Nom] une [Nom] _X2 [Nom] homme
     * <li> if [Ver] créer [Nom] une [Nom] _X2 [Nom] _X3
     * <li> if [Ver] créer [Nom] _X1 [Nom] classe [Nom] homme
     * <li> if [Ver] créer [Nom] _X1 [Nom] classe [Nom] _X3
     * <li> if [Ver] créer [Nom] _X1 [Nom] _X2 [Nom] homme
     * <li> if [Ver] créer [Nom] _X1 [Nom] _X2 [Nom] _X3
     * <li> if [Ver] _X0 [Nom] une [Nom] classe [Nom] homme
     * <li> if [Ver] _X0 [Nom] une [Nom] classe [Nom] _X3
     * <li> if [Ver] _X0 [Nom] une [Nom] _X2 [Nom] homme
     * <li> if [Ver] _X0 [Nom] une [Nom] _X2 [Nom] _X3
     * <li> if [Ver] _X0 [Nom] _X1 [Nom] classe [Nom] homme
     * <li> if [Ver] _X0 [Nom] _X1 [Nom] classe [Nom] _X3
     * <li> if [Ver] _X0 [Nom] _X1 [Nom] _X2 [Nom] homme
     * <li>
     * <li> if [Ver] créer [Adj] un [Nom] classe [Nom] homme
     * <li> if [Ver] créer [Adj] un [Nom] classe [Nom] _X3
     * <li> if [Ver] créer [Adj] un [Nom] _X2 [Nom] homme
     * <li> if [Ver] créer [Adj] un [Nom] _X2 [Nom] _X3
     * <li> if [Ver] créer [Adj] _X1 [Nom] classe [Nom] homme
     * <li> if [Ver] créer [Adj] _X1 [Nom] classe [Nom] _X3
     * <li> if [Ver] créer [Adj] _X1 [Nom] _X2 [Nom] homme
     * <li> if [Ver] créer [Adj] _X1 [Nom] _X2 [Nom] _X3
     * <li> if [Ver] _X0 [Adj] un [Nom] classe [Nom] homme
     * <li> if [Ver] _X0 [Adj] un [Nom] classe [Nom] _X3
     * <li> if [Ver] _X0 [Adj] un [Nom] _X2 [Nom] homme
     * <li> if [Ver] _X0 [Adj] un [Nom] _X2 [Nom] _X3
     * <li> if [Ver] _X0 [Adj] _X1 [Nom] classe [Nom] homme
     * <li> if [Ver] _X0 [Adj] _X1 [Nom] classe [Nom] _X3
     * <li> if [Ver] _X0 [Adj] _X1 [Nom] _X2 [Nom] homme
     *
     * @param flagTypeTableCurrent .
     * @param nbWord               .
     */


    private void getDerivedRuleList(int[] flagTypeTableCurrent, int nbWord) {

        int step = 0;
        String rule = null;
        int[] newFlagTable = new int[nbWord];
        int[] flagTableCurrent = new int[nbWord];
        for (int i = 0; i < nbWord; i++) {
            flagTableCurrent[i] = 0;
        }

        rule = buildDerivedRules(flagTableCurrent, flagTypeTableCurrent, nbWord);
        if (!rule.equals("")) {
            _derivedRuleList.add(rule);
            _racineListForDerivedAction.add(getRacineList(flagTypeTableCurrent, nbWord));
        }

        // checkIfObjectExist the list rules from the previous analyse
        while (step != -1) {
            newFlagTable = getNextDerivedRule(flagTableCurrent, nbWord);
            flagTableCurrent = newFlagTable;
            // printFlagTableCurrent();
            step = step + 1;
            int flag = 0;
            for (int i = 0; i < nbWord; i++) {
                if (flagTableCurrent[i] == 0) {
                    flag = 1;
                }
            }
            if (flag == 0) {
                break;
            }
            rule = buildDerivedRules(flagTableCurrent, flagTypeTableCurrent, nbWord);
            if (!rule.equals("")) {
                _derivedRuleList.add(rule);
                _racineListForDerivedAction.add(getRacineList(flagTypeTableCurrent, nbWord));
            }
        }
        //printDerivedRuleList();
    }

    private void getDerivedMetaRuleList(int[] flagTypeTableCurrent, int nbWord) {

        int step = 0;
        String rule = null;
        int[] newFlagTable = new int[nbWord];
        int[] flagTableCurrent = new int[nbWord];
        for (int i = 0; i < nbWord; i++) {
            flagTableCurrent[i] = 0;
        }

        rule = buildDerivedMetaRules(flagTableCurrent, flagTypeTableCurrent, nbWord);
        if (!rule.equals("")) {
            _derivedRuleList.add(rule);
            _racineListForDerivedAction.add(getRacineList(flagTypeTableCurrent, nbWord));
        }

        // checkIfObjectExist the list rules from the previous analyse
        while (step != -1) {
            newFlagTable = getNextDerivedRule(flagTableCurrent, nbWord);
            flagTableCurrent = newFlagTable;
            // printFlagTableCurrent();
            step = step + 1;
            int flag = 0;
            for (int i = 0; i < nbWord; i++) {
                if (flagTableCurrent[i] == 0) {
                    flag = 1;
                }
            }
            if (flag == 0) {
                break;
            }
            rule = buildDerivedMetaRules(flagTableCurrent, flagTypeTableCurrent, nbWord);
            if (!rule.equals("")) {
                _derivedRuleList.add(rule);
                _racineListForDerivedAction.add(getRacineList(flagTypeTableCurrent, nbWord));
            }
        }

        //printDerivedRuleList();
    }
}
