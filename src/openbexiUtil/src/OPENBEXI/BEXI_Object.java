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

import java.util.Arrays;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


/**
 * OPENBEXI object.
 * <li> The OPENBEXI object properties are:
 * <li> file: language.
 * <li> className: Object lass name.
 * <li> objectName: Object name.
 * <li> attributs: Attribut name list of an object.
 * <li> values: Attribut value list of an object.
 * <li> source: Data source with which the OPENBEXI object has been built.
 * <li>
 * <li> Example:
 * <li> ClassName = human
 * <li> objectName = Martin
 * <li> attributs = Name;firstname;age...
 * <li> values = Martin,john;48
 */
public class BEXI_Object {

    public static final String _ID_KEY = "_ID_";
    public static final String _ITEM = "_item";

    //properties
    private String _ID;
    private String _host;
    private String _language;
    private String _className;
    private String _objectName;
    private String _lineSource;
    private String[] _attributs;
    private String[] _values;
    private String[][] _range;

    /**
     * BEXI_Object constructor.
     *
     * @param language
     * @param className
     * @param objectName
     * @param attributs
     * @param values
     * @param lineSource
     */
    public BEXI_Object(final String language, final String className, final String objectName, final String[] attributs, final String[] values, final String[][] range, final String lineSource, boolean key) {
        // Check if there is a unique ID inside the OPENBEXI object attribut list, and take this one.
        _host = "localHost";
        _language = language;
        _className = className;
        _objectName = objectName;
        _values = values;
        _range = range;
        _lineSource = lineSource;

        add_attributs_and_values(attributs, values, key);

    } // constructor

    public BEXI_Object() {

    }

    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof BEXI_Object)) return false;

        final BEXI_Object bexi_object = (BEXI_Object) o;

        if (_ID != null ? !_ID.equals(bexi_object._ID) : bexi_object._ID != null) return false;
        if (!Arrays.equals(_attributs, bexi_object._attributs)) return false;
        if (_className != null ? !_className.equals(bexi_object._className) : bexi_object._className != null)
            return false;
        if (_host != null ? !_host.equals(bexi_object._host) : bexi_object._host != null) return false;
        if (_language != null ? !_language.equals(bexi_object._language) : bexi_object._language != null) return false;
        if (_lineSource != null ? !_lineSource.equals(bexi_object._lineSource) : bexi_object._lineSource != null)
            return false;
        if (_objectName != null ? !_objectName.equals(bexi_object._objectName) : bexi_object._objectName != null)
            return false;
        if (!Arrays.equals(_values, bexi_object._values)) return false;

        return true;
    }

    public int hashCode() {
        int result;
        result = (_ID != null ? _ID.hashCode() : 0);
        result = 29 * result + (_host != null ? _host.hashCode() : 0);
        result = 29 * result + (_language != null ? _language.hashCode() : 0);
        result = 29 * result + (_className != null ? _className.hashCode() : 0);
        result = 29 * result + (_objectName != null ? _objectName.hashCode() : 0);
        result = 29 * result + (_lineSource != null ? _lineSource.hashCode() : 0);
        return result;
    }

    public String get_host() {
        return _host;
    }

    public void set_host(String _host) {
        this._host = _host;
    }

    public void set_language(String _language) {
        this._language = _language;
    }

    /**
     * Return language.
     *
     * @return _language
     */
    public String get_language() {
        return _language;
    }

    public void set_className(String _className) {
        this._className = _className;
    }

    /**
     * Return the class name.
     *
     * @return _className
     */
    public String get_className() {
        return _className;
    }

    public void set_objectName(String _objectName) {
        this._objectName = _objectName;
    }

    /**
     * Return the object name.
     *
     * @return _objectName
     */
    public String get_objectName() {
        return _objectName;
    }

    /**
     * Return the list of object attributs.
     *
     * @return _attributs
     */
    public String[] getAttributs() {
        return _attributs;
    }

    /**
     * Return the main source line with which the OPENBEXI object has been built.
     *
     * @return _lineSource
     */
    public String get_lineSource() {
        return _lineSource;
    }

    /**
     * Set the main source line with whitch the OPENBEXI object has been built.
     *
     * @param text
     */
    public void set_lineSource(final String text) {
        _lineSource = text;
    }

    public String[][] get_range() {
        return _range;
    }

    public void set_range(String[][] _range) {
        this._range = _range;
    }

    /**
     * Return the ID object (unique).
     */
    public String get_ID() {
        return _ID;
    }

    public void set_ID(String _ID) {
        this._ID = _ID;
    }

    /**
     * Look for and return the ID attribut (unique) from a attribut list. Return null if no found
     */
    private String get_ID(String[] attributs) {

        if (attributs == null) return null;

        Pattern pattern = Pattern.compile(_ID_KEY);
        for (int i = 0; i < attributs.length; i++) {
            Matcher matcher = pattern.matcher(attributs[i]);
            if (matcher.find()) {
                return this.get_values()[i];
            }
        }
        return null;
    }

    /**
     * add a ID attribut (unique)for the OPENBEXI object id necessary.
     *
     * @param attributs
     * @param values
     */
    private void add_attributs_and_values(String[] attributs, String[] values, boolean key) {
        if (attributs == null) return;

        if (key == true) {
            _ID = get_ID(attributs);
        } else {
            _ID = null;
        }
        if (_ID != null) {
            _ID = BEXI_Key.generateKey();
            int sizeList = attributs.length;

            _attributs = new String[sizeList + 1];
            _values = new String[sizeList + 1];

            _attributs[0] = _ID_KEY;
            _values[0] = _ID;
            for (int i = 0; i < attributs.length; i++) {
                _attributs[i + 1] = attributs[i];
                _values[i + 1] = values[i];
            }
        } else {
            _attributs = attributs;
            _values = values;

        }
    }

    /**
     * Look for and return the attribut index from OPENBEXI object
     *
     * @return index of object attribut GUI. Return -1 if no found
     */
    public int getIndexAttributObject(String attributName) {

        if (attributName == null) return -1;
        String[] attributs = getAttributs();
        for (int i = 0; i < attributs.length; i++) {
            if (attributs[i].equals(attributName)) {
                return i;
            }
        }
        return -1;
    }

    /**
     * Return the value of a object attribut.
     *
     * @param attribut
     * @return value
     */
    public String get_Values(final String attribut) {
        if (attribut == null) return null;
        if (_attributs == null) return null;

        for (int i = 0; i < _attributs.length; i++) {
            if (_attributs[i].equals(attribut)) {
                if (_values[i] != null) {
                    return _values[i].replace('\'', '#');
                } else {
                    return null;
                }
            }
        }
        return null;
    }

    /**
     * Return the values of a object attribut (list case).
     *
     * @param attribut
     * @return _values[i]
     */
    public String[] get_Values(final String attribut, String regex) {
        if (attribut == null) return null;

        Pattern pattern = Pattern.compile(attribut + regex);

        BEXI_list values = new BEXI_list();
        for (int i = 0; i < _attributs.length; i++) {

            Matcher matcher = pattern.matcher(_attributs[i]);
            if (matcher.find()) {
                values.add(_values[i]);
            }
        }
        String[] valueList = new String[values.getItemCount()];
        for (int i = 0; i < values.getItemCount(); i++) {
            valueList[i] = values.getItem(i);
        }
        return valueList;
    }

    /**
     * Set a object attribute value.
     *
     * @param attribut
     * @param value
     */
    public void set_values(final String attribut, final String value) {
        if (attribut == null) return;

        for (int i = 0; i < _attributs.length; i++) {
            if (_attributs[i].equals(attribut)) {
                _values[i] = value;
            }
        }
    }

    /**!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!A voir
     * Set the list of object values.
     * @param value
     */
    /* public void set_valuesAVOIR(final String[] value) {
         if (_values!=null){
         for (int i = 0; i < _values.length; i++) {
             _values[i] = value[i];
         }
         }
     }*/

    /**
     * Set the list of object values.
     *
     * @param value
     */
    public void set_values(final String[] value) {
        _values = value;
    }

    /**
     * Set the list of object attributs.
     *
     * @param attributs
     */
    public void set_attributs(final String[] attributs) {
        _attributs = attributs;
    }

    public String[] get_attributs() {
        return _attributs;
    }


    /**
     * Return all object attribut values.
     *
     * @return _values
     */
    public String[] get_values() {
        return _values;
    }


    /**
     * Return true if all object attribut values are set, return false if one of the values are null.
     *
     * @return true or false
     */
    public boolean getValueStatus() {
        for (int i = 0; i < _values.length; i++) {
            if (_values[i] == null) {
                return false;
            }
        }
        return true;
    }

    /**
     * Count object attributes, except the parameter one
     *
     * @param attribut
     */
    public int count_attributs(final String attribut, boolean containItem) {

        if (attribut == null) return 0;
        int count = 0;

        // attribut list cases
        if (containItem == true) {
            final Pattern itemPattern = Pattern.compile(attribut + _ITEM);
            for (int i = 0; i < _attributs.length; i++) {
                final Matcher itemMatcher = itemPattern.matcher(_attributs[i]);
                if (!itemMatcher.find()) {
                    count++;
                }
            }
        } else {
            for (int i = 0; i < _attributs.length; i++) {
                if (!_attributs[i].equals(attribut)) {
                    count++;
                }
            }
        }

        return count;
    }

    /**
     * Remove attribute list value from attributs.
     * First rule:
     * if the list contains att1;att2;att_ITEM0;att_ITEM1;att_ITEM2;att4;att5
     * and if attribut parameter =att_ITEM
     * then the result is att1;att2;att4;att5 , and the method return true.
     * <p/>
     * Second rule:
     * if the list contains att1;att2;att_ITEM0;att_ITEM1;att_ITEM2;att4;att5
     * and if attribut parameter =att_ITEM1
     * then the result is att1;att2;att_ITEM0;att_ITEM1;att4;att5
     * and the method return true.
     * Note: in this case previous ITEM1 is erased with its value and ITEM2 becomes ITEM1
     * <p/>
     * * Third rule:
     * if the list contains att1;att2;att4;att5
     * and if attribut parameter =att_ITEM or att_ITEM1
     * then the result is always att1;att2;att4;att5
     * and the method return false because mo attribute list has been found
     *
     * @param attribut
     */
    public boolean remove_attributList(final String attribut) {

        if (attribut == null) return false;

        boolean removedAttributs = false;
        int sizeList = count_attributs(attribut, true);
        String[] attributs = new String[sizeList];
        String[] values = new String[sizeList];

        // first rule: attribut list cases
        final Pattern itemPattern1 = Pattern.compile(attribut + _ITEM);
        int count1 = 0;
        for (int i = 0; i < _attributs.length; i++) {
            final Matcher itemMatcher1 = itemPattern1.matcher(_attributs[i]);
            if (!itemMatcher1.find()) {
                attributs[count1] = _attributs[i];
                values[count1] = _values[i];
                count1++;
            } else {
                removedAttributs = true;
            }
        }

        // Apply second rule
        if (removedAttributs == false) {

            sizeList = count_attributs(attribut, false);
            attributs = new String[sizeList];
            values = new String[sizeList];

            final Pattern itemPattern2 = Pattern.compile(_ITEM);
            final Matcher itemMatcher2 = itemPattern2.matcher(attribut);

            // If attribut contain _ITEM keyword
            if (itemMatcher2.find()) {

                // find attribut ITEM root
                String items[] = attribut.split(_ITEM);
                String attributRoot = items[0] + _ITEM;

                final Pattern itemPattern3 = Pattern.compile(attributRoot);
                int countItemsList = 0;
                int count3 = 0;
                for (int i = 0; i < _attributs.length; i++) {

                    final Matcher itemMatcher3 = itemPattern3.matcher(_attributs[i]);
                    // Remove attribut from _attribut list and switch the next one to the current one
                    if (itemMatcher3.find()) {
                        if (!attribut.equals(_attributs[i])) {
                            attributs[count3] = attributRoot + countItemsList;
                            values[count3] = _values[i];
                            count3++;
                            countItemsList++;
                        }
                        removedAttributs = true;
                    } else {
                        attributs[count3] = _attributs[i];
                        values[count3] = _values[i];
                        count3++;
                    }
                }
                //attribut doesn't contain _ITEM keyword
            } else {
                removedAttributs = false;
            }
        }

        _attributs = attributs;
        _values = values;

        return removedAttributs;
    }

    /**
     * Remove a object attribute value from attributs.
     *
     * @param attribut
     */
    public void remove_attribut(final String attribut) {

        if (attribut == null) return;

        // Remove attribute list case if any
        boolean removedAttributs = remove_attributList(attribut);
        // If find attributs to remove, means attribut belong to a list, and the job has been done, and it's not necessary to go on.
        if (removedAttributs) return;

        // Remove regular attribut that doesn't belong to a list
        int sizeList = count_attributs(attribut, false);
        String[] attributs = new String[sizeList];
        String[] values = new String[sizeList];

        int count = 0;
        for (int i = 0; i < _attributs.length; i++) {
            if (!_attributs[i].equals(attribut)) {
                attributs[count] = _attributs[i];
                values[count] = _values[i];
                count++;
            }
        }

        _attributs = attributs;
        _values = values;
    }

    /**
     * add a object attribute value into the attribut list if needed.
     *
     * @param attribut
     */
    public void add_attribut(String attribut, String value) {

        if (attribut == null) return;
        int sizeList = 0;
        if (_attributs != null) {
            sizeList = _attributs.length;
        }

        // attribut list cases
        final Pattern itemPattern = Pattern.compile(_ITEM);
        final Matcher itemMatcher = itemPattern.matcher(attribut);
        if (itemMatcher.find()) {
            // check if attribut fullname contains no ID item, add a new one
            String[] items = attribut.split(_ITEM);
            //if no ID
            if (items.length == 1) {
                int count = 0;
                for (int i = 0; i < sizeList; i++) {
                    if (_attributs[i].equals(attribut + count)) {
                        count++;
                        //System.out.println("!!!!!!!!!!!!!:"+ attribut+count+" ="+value);
                    }
                }
                attribut = attribut + count;
            }
        }

        // Look if attribute exists and update the value
        for (int i = 0; i < sizeList; i++) {
            if (_attributs[i].equals(attribut)) {
                _values[i] = value;
                return;
            }
        }

        // If the attribute doesn't exist, add the new one.
        int count = 0;
        String[] attributs = new String[sizeList + 1];
        String[] values = new String[sizeList + 1];

        for (int i = 0; i < sizeList; i++) {
            attributs[count] = _attributs[i];
            values[count] = _values[i];
            count++;
        }
        attributs[count] = attribut;
        values[count] = value;

        _attributs = attributs;
        _values = values;
    }

    /**
     * insert a object attribute value into the attribut list according index if needed.
     *
     * @param attribut
     */
    public void insert_attribut(String attribut, String value, int index) {

        if (attribut == null) return;
        int newSizeList = 0;
        if (_attributs != null) {
            newSizeList = _attributs.length + 1;
        }

        // If the attribute doesn't exist, add the new one.
        int count = 0;
        int countItem = 0;
        String[] items = null;
        String itemRoot = null;

        // Look for attribut item
        final Pattern attributPattern = Pattern.compile(_ITEM);
        final Matcher attributMatcher = attributPattern.matcher(attribut);
        if (attributMatcher.find()) {
            items = attribut.split(_ITEM);
            itemRoot = items[0];
        }

        String[] attributs = new String[newSizeList];
        String[] values = new String[newSizeList];

        // Look if attribute exists and update the value
        for (int i = 0; i < _attributs.length; i++) {

            final Pattern itemPattern = Pattern.compile(itemRoot + _ITEM);
            final Matcher itemMatcher = itemPattern.matcher(_attributs[i]);

            // If item attribute case
            if (itemMatcher.find()) {
                if (_attributs[i].equals(itemRoot + _ITEM + index)) {
                    attributs[count] = itemRoot + _ITEM + countItem;
                    values[count] = value;
                    countItem++;
                    count++;
                }
                attributs[count] = itemRoot + _ITEM + countItem;
                values[count] = _values[i];
                countItem++;
                count++;
            }
            // If regular attribut case (itemRoot==null)
            else {
                if (itemRoot == null && i == index) {
                    attributs[count] = attribut;
                    values[count] = value;
                    count++;
                }
                attributs[count] = _attributs[i];
                values[count] = _values[i];
                count++;
            }
        }

        // The new item  has nor been added yet, go ahead
        if (itemRoot != null && count == _attributs.length) {
            attributs[count] = itemRoot + _ITEM + countItem;
            values[count] = value;
        }

        _attributs = attributs;
        _values = values;

    }

    /**
     * Print a OPENBEXI object.
     */
    public void print() {

        if (_lineSource == null) {
            System.out.println("No source has been found for the object " + get_objectName());
        } else {
            System.out.println("Source=" + _lineSource);
        }
        if (_className == null) {
            System.out.println("No classe has been found for the object " + get_objectName());
        } else {
            System.out.println("classe :" + _className);
        }
        if (get_objectName() == null) {
            System.out.println("No object has been found for the object " + get_objectName());
        } else {
            System.out.println("object :" + _objectName);
        }
        if (_attributs == null || _values == null) {
            System.out.println("No attribut has been found for the object " + get_objectName());
        } else {
            for (int i = 0; i < _attributs.length; i++) {
                System.out.println("attribut :" + _attributs[i] + " value=" + _values[i]);
            }
        }
    }

    /**
     * Return true if all object attribut values are equals to the given values.
     *
     * @param values
     * @return true or false
     */
    public boolean checkIfSimilarValues(final String[] values) {
        for (int i = 0; i < _values.length; i++) {
            if (_values[i] != null || values[i] != null) {
                if (!_values[i].equals(values[i])) {
                    return false;
                }
            }
        }
        return true;
    }

    public boolean ifAttributExists(String attribut) {

        if (attribut == null) return false;

        for (int i = 0; i < _attributs.length; i++) {
            if (_attributs[i].equals(attribut)) {
                return true;
            }
        }
        return false;
    }

    public boolean ifAttributExists(String[] list, String attribut) {

        if (attribut == null) return false;

        for (int i = 0; i < list.length; i++) {
            if (list[i].equals(attribut)) {
                return true;
            }
        }
        return false;
    }

    public String unMarshalling() {
        String object = null;
        if (_host == null) {
            object = "_host:null" + ",";
        } else {
            object = "_host:" + _host + ",";
        }
        if (_language == null) {
            object = object + "_language:null" + ",";
        } else {
            object = object + "_language:" + _language + ",";
        }
        if (_className == null) {
            object = object + "_className:null" + ",";
        } else {
            object = object + "_className:" + _className + ",";
        }
        if (_objectName == null) {
            object = object + "_objectName:null" + ",";
        } else {
            object = object + "_objectName:" + _objectName + ",";
        }
        if (_lineSource == null) {
            object = object + "_lineSource:null" + ",";
        } else {
            object = object + "_lineSource:" + _lineSource + ",";
        }
        if (_attributs != null) {
            for (int i = 0; i < _attributs.length; i++) {
                if (_attributs[i] == null) {
                    object = object + "_attribut:null" + ",";
                } else {
                    object = object + "_attribut:" + _attributs[i] + ",";
                }
            }
        } else {
            object = object + "_attribut:null" + ",";
        }
        if (_values != null) {
            for (int i = 0; i < _values.length; i++) {
                if (_values[i] == null) {
                    object = object + "_value:null" + ",";
                } else {
                    object = object + "_value:" + _values[i] + ",";
                }
            }
        } else {
            object = object + "_value:null" + ",";
        }

        return object + ";";
    }

    public BEXI_Object Marshalling(String object) {


        String host = null;
        String language = null;
        String className = null;
        String objectName = null;
        String lineSource = null;
        BEXI_list attributs = new BEXI_list();
        BEXI_list values = new BEXI_list();
        int countAtt = 0;
        int countVal = 0;

        if (object == null) return null;
        String[] items = object.split("[:,;]");

        for (int j = 0; j < items.length; j++) {

            if (items[j].equals("_host")) {
                if (items[j++] == "null") {
                    host = null;
                } else {
                    host = items[j];
                }
            }
            if (items[j].equals("_language")) {
                if (items[j++] == "null") {
                    language = null;
                } else {
                    language = items[j];
                }
            }
            if (items[j].equals("_className")) {
                if (items[j++] == "null") {
                    className = null;
                } else {
                    className = items[j];
                }
            }
            if (items[j].equals("_objectName")) {
                if (items[j++] == "null") {
                    objectName = null;
                } else {
                    objectName = items[j];
                }
            }
            if (items[j].equals("_lineSource")) {
                if (items[j++] == "null") {
                    lineSource = null;
                } else {
                    lineSource = items[j];
                }
            }
            if (items[j].equals("_attribut")) {
                j++;
                attributs.add(items[j], countAtt);
                countAtt++;
            }
            if (items[j].equals("_value")) {
                j++;
                values.add(items[j], countVal);
                countVal++;
            }
        }

        String[] attributList = null;
        if (attributs != null) {
            if (attributs.getItemCount() != 0) {
                attributList = new String[attributs.getItemCount()];
                for (int i = 0; i < attributs.getItemCount(); i++) {
                    attributList[i] = attributs.getItem(i);
                }
            }
        }
        String[] valueList = null;
        if (values != null) {
            if (values.getItemCount() != 0) {
                valueList = new String[values.getItemCount()];
                for (int i = 0; i < values.getItemCount(); i++) {
                    valueList[i] = values.getItem(i);
                }
            }
        }

        BEXI_Object objectTmp = new BEXI_Object(host, className, objectName, attributList, valueList, null, lineSource, false);
        return objectTmp;
    }

    public static void main(String args[]) {

    }
}
