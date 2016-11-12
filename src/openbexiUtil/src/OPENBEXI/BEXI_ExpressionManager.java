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

public class BEXI_ExpressionManager {

    private BEXI_Context _context;

    public BEXI_ExpressionManager(BEXI_Context context) {

        _context = context;
    }

    public BEXI_Expression getPreviousEqualExpression(BEXI_Expression expression) {

        BEXI_ContextManager contextManager = new BEXI_ContextManager(_context);
        BEXI_Expression previousEqualExpression;

        // get equal expression
        while ((previousEqualExpression = (BEXI_Expression) contextManager.getPreviousContext(new BEXI_Expression(null), BEXI_ContextManager.CIRCULAR_LIST)) != null) {
            if (previousEqualExpression.getExpression().equals(expression.getExpression())) {
                return previousEqualExpression;
            }
        }
        return null;
    }

    public BEXI_Expression getPreviousSimilarExpression(BEXI_Expression expression) {

        BEXI_ContextManager contextManager = new BEXI_ContextManager(_context);
        BEXI_Expression previousSimilarExpression;
        boolean foundSimilarWord = false;

        // get equal expression
        int nbExpressionWord = expression.getNbWord();

        while ((previousSimilarExpression = (BEXI_Expression) contextManager.getPreviousContext(new BEXI_Expression(null), BEXI_ContextManager.CIRCULAR_LIST)) != null) {

            // Check if the number of expression word is equal to the similar expression
            // If it is, start analyzing
            int nbSimilarExpressionWord = previousSimilarExpression.getNbWord();
            if (nbSimilarExpressionWord == nbExpressionWord) {

                foundSimilarWord = false;

                // Check word by word the both expression
                for (int i = 0; i < expression.getWordNumList().getItemCount(); i++) {

                    foundSimilarWord = false;
                    String[] subGenericRacinesFromSimilarExpression = previousSimilarExpression.getGenericRacines().getItem(i).split("[ *;]");
                    String racineFromSimilarExpression = previousSimilarExpression.getRacineList().getItem(i);
                    String racineFromCurrentExpression = expression.getRacineList().getItem(i);

                    // Check if same word or similar
                    if (racineFromSimilarExpression.equals(racineFromCurrentExpression)) {
                        foundSimilarWord = true;
                    }

                    if (foundSimilarWord != true) {
                        // Check if same word or similar from sub generic racine
                        for (int j = 0; j < subGenericRacinesFromSimilarExpression.length; j++) {
                            if (subGenericRacinesFromSimilarExpression[j].equals(racineFromCurrentExpression)) {
                                foundSimilarWord = true;
                                break;
                            }
                        }
                    }

                    if (foundSimilarWord != true) {
                        String abstractTypeFromSimilarExpression = previousSimilarExpression.getAbstractDataType().getItem(i);
                        String typeFromSimilarExpression = previousSimilarExpression.getTypes().getItem(i);
                        String typeFromCurrentExpression = expression.getTypes().getItem(i);

                        if (!abstractTypeFromSimilarExpression.equals("null") &&
                                typeFromSimilarExpression.equals(typeFromCurrentExpression) || typeFromSimilarExpression.equals("any")) {
                            foundSimilarWord = true;
                        } else {
                            break;
                        }
                    }
                }
                if (foundSimilarWord == true) {
                    return previousSimilarExpression;
                }
            }
        }
        return null;

    }

    public BEXI_Expression buildNewExpressionFromPreviousOne(BEXI_Context context, BEXI_ApplicationPath contextPath, BEXI_SqlContext SqlContext, String sourceExpression, String targetExpression) throws BEXI_ExpressionManagerException, BEXI_ExpressionException {

        BEXI_Expression source = new BEXI_Expression();
        BEXI_Expression target = new BEXI_Expression();

        // STEP 1: analyse the source expression
        try {
            source.analyze(context, sourceExpression);
            context.add(source);
        } catch (Exception e) {
            //System.out.println(e.getMessage());
        }
        //target.printLists();

        // STEP 2: analyse the target expression
        try {
            target.analyze(context, targetExpression);
        } catch (Exception e) {
            //System.out.println(e.getMessage());
        }
        //target.printLists();

        // STEP 3 :try to build a generic action for the target expression according the source.
        BEXI_list genericSourceActions = source.getGenericActions();

        if (genericSourceActions != null && genericSourceActions.getItemCount() != 0) {
            String[] genericTargetActionItem = genericSourceActions.getItem(0).split(" ");
            String genericTargetAction = genericTargetActionItem[0];

            for (int i = 1; i < genericTargetActionItem.length; i++) {

                String variable = genericTargetActionItem[i];
                String racineSource = source.getRacinefromVariable(variable);
                String variableTarget = target.getVariablefromRacine(racineSource);
                if (variableTarget == null) return null;
                genericTargetAction = genericTargetAction + " " + variableTarget;

            }

            // Set the new built generic action in the expression instance
            BEXI_list genericAction = new BEXI_list();
            genericAction.add(genericTargetAction, 0);
            target.setGenericActions(genericAction);

            //System.out.println("TARGET GENERIC ACTION=" + genericTargetAction);

        } else {
            //throw new BEXI_ExpressionManagerException("Cannot built the new expression [" + target + "] from the  expression: " + source + " because there is no generic action");
        }

        // STEP 4 :try to build a generic metarule for the target expression according the source.
        String genericSourceMetarule = source.getGenericMetarule();

        if (genericSourceMetarule == null) {
            //throw new BEXI_ExpressionManagerException("Cannot built the new expression [" + target + "] from the expression: " + source + " because there is no generic metarule");
        }

        String genericTargetMetarule = null;
        String previousWordNumList = "";
        int nbMetaruleItem = (target.getNbWord() * 2) + 1;
        String[] metaruleItemList = new String[nbMetaruleItem];
        metaruleItemList[0] = "if";
        int count = 0;
        boolean newWordFound = false;
        boolean setUpDone = true;

        // First step

        for (int i = 0; i < target.getWordNumList().getItemCount(); i++) {

            // If the word doesn't belong to a data abstract type and doesn't belong only to a noun, adjectif or verbe
            String targetFlexion = target.getFlexions().getItem(i);
            String targetRacine = target.getRacineList().getItem(i);
            String targetType = target.getTypes().getItem(i);
            String targetVariable = target.getVariables().getItem(i);
            String wordNumList = target.getWordNumList().getItem(i);


            if (!wordNumList.equals(previousWordNumList)) {
                count++;
                newWordFound = true;
                setUpDone = false;
                metaruleItemList[count] = null;
                metaruleItemList[count + 1] = null;
            }

            if (newWordFound && !setUpDone) {

                String sourceGenericType = source.getGenericType(targetRacine, targetType);
                if (sourceGenericType != null) {
                    metaruleItemList[count] = sourceGenericType;
                    setUpDone = true;
                } else {
                    metaruleItemList[count] = target.buildGenericType(wordNumList);
                }

                String sourceGenericRacine = source.getGenericRacine(targetRacine, targetType);
                // If variable doesn't contain "_X"
                if (!source.checkVariable(sourceGenericRacine) == true) {
                    if (sourceGenericRacine != null) {
                        metaruleItemList[count + 1] = sourceGenericRacine;
                        setUpDone = true;
                    }
                } else {
                    metaruleItemList[count + 1] = targetVariable;
                    setUpDone = true;
                }

                String sourceDataAbstractType = source.getAbstractDataType(sourceGenericRacine, sourceGenericType);
                count++;

            }
            newWordFound = false;
            previousWordNumList = wordNumList;
        }

        // Build the new generic metarule
        String genericMetarule = null;
        for (int i = 0; i < metaruleItemList.length; i++) {
            if (i == 0) {
                genericMetarule = metaruleItemList[i];
            } else {
                genericMetarule = genericMetarule + " " + metaruleItemList[i];
            }
        }

        // Set the new built generic metarule in the expression instance
        target.setGenericMetarule(genericMetarule);
        //target.printLists();
        context.add(target);
        return target;
    }
}
