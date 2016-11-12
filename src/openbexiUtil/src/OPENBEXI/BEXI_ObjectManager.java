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

import java.util.Vector;

public class BEXI_ObjectManager {

    private Object _current_Object = null;
    private String _current_Attribut = null;
    private int _BEXI_objectIndex = 0;
    private int _BEXI_objectIndexMax = 0;
    private Vector _objects = new Vector();
    public static int _key = 0;

    /**
     * BEXI_ObjectManager constructor.
     */
    public BEXI_ObjectManager() {
    }

    public static int get_key() {
        return _key;
    }

    public static void set_key(int _key) {
        BEXI_ObjectManager._key = _key;
    }

    public BEXI_ObjectManager(Vector objects) {
        _objects = objects;
    }

    public Object get_current_Object() {
        return _current_Object;
    }

    public void set_current_Object(Object _current_Object) {
        this._current_Object = _current_Object;
    }

    public BEXI_Object get_current_BEXI_Object() {
        return (BEXI_Object) _current_Object;
    }

    public String get_current_Attribut() {
        return _current_Attribut;
    }

    public void set_current_Attribut(String _current_Attribut) {
        this._current_Attribut = _current_Attribut;
    }

    public int get_BEXI_objectIndex() {
        return _BEXI_objectIndex;
    }

    public void set_BEXI_objectIndex(int _BEXI_objectIndex) {
        this._BEXI_objectIndex = _BEXI_objectIndex;
    }

    public int get_BEXI_objectIndexMax() {
        return _BEXI_objectIndexMax;
    }

    public void set_BEXI_objectIndexMax(int _BEXI_objectIndexMax) {
        this._BEXI_objectIndexMax = _BEXI_objectIndexMax;
    }

    public Vector get_objects() {
        return _objects;
    }

    /**
     * Set OPENBEXI objects into the OPENBEXI object database.
     *
     * @param objects
     */
    public void set_objects(Vector objects) {
        _objects = objects;
        if (_objects != null) {
            _BEXI_objectIndexMax = _objects.size();
            first();
        } else {
            _BEXI_objectIndexMax = 0;
        }
    }

    /**
     * Add OPENBEXI objects into the OPENBEXI object database.
     *
     * @param objects
     */
    public void add_objects(Vector objects) {
        for (int i = 0; i < objects.size(); i++) {
            this.add_Object(objects.get(i), null);
        }
    }

    /**
     * Get BEXI_Object according object name.
     *
     * @param objectName
     * @return BEXI_Object
     */
    public BEXI_Object getObject(String objectName) {

        if (objectName == null) return null;
        if (_objects == null) return null;

        for (int i = 0; i < _objects.size(); i++) {
            BEXI_Object currentObj = (BEXI_Object) _objects.get(i);
            if (currentObj.get_objectName().equals(objectName)) {
                return currentObj;
            }
        }
        return null;
    }

    /**
     * Look for and return a new unique key from object GUI database
     *
     * @param type
     * @return String
     */
    public String getNewKeyObjectGui(String type) {
        _key = _key + 1;
        while (check(String.valueOf(type + _key))) {
            _key = _key + 1;

            while (this.checkObjectName(String.valueOf(_key))) {
                _key = _key + 1;
            }
        }

        return String.valueOf(_key);
    }

    /**
     * Look for and return a new unique key from object GUI database
     *
     * @return String
     */
    public String getNewKeyObjectGui() {
        _key = _key + 1;
        while (check(String.valueOf(_key))) {
            _key = _key + 1;
        }
        return String.valueOf(_key);
    }


    /**
     * Look for and return a new unique key from object GUI database
     * There is two key format :
     * First format :  String:int  (exemple 234)
     * Second format : String:long+int (exemple  1089990592032+1)
     * Apply the good key format according the previous object instance
     *
     * @return new key of object GUI
     */
    public String getNewKeyObjectGui_deprecated() {
        int index = 0;
        if (_objects.size() == 0) return BEXI_Key.generateKey();

        try {
            for (int i = 0; i < _objects.size(); i++) {
                Object object = _objects.get(i);

                if (object instanceof BEXI_Object) {
                    BEXI_Object BEXI_object = (BEXI_Object) _objects.get(i);
                    int previousIndex = index;
                    index = Integer.parseInt(BEXI_object.get_Values(BEXI_Object._ID_KEY));
                    if (index < previousIndex) {
                        index = previousIndex;
                    }
                }
            }
        } catch (Exception e) {
            return BEXI_Key.generateKey();
        }

        return String.valueOf(index + 1);
    }

    /**
     * Look for and return the unique key from selected object GUI database according instance of the OPENBEXI object.
     *
     * @param object
     * @return int
     */
    public int getIndexObject(Object object) {


        if (_objects == null) return -1;

        if (object instanceof BEXI_Object) {
            BEXI_Object curentBEXI_GuiObject = (BEXI_Object) object;
            for (int i = 0; i < _objects.size(); i++) {
                BEXI_Object BEXI_GuiObject = (BEXI_Object) _objects.get(i);
                if (BEXI_GuiObject.get_ID().equals(curentBEXI_GuiObject.get_ID())) {
                    return i;
                }
            }
        }
        return -1;
    }

    /**
     * add OPENBEXI object in object list.
     *
     * @param newObject
     */
    public void add_Object(Object newObject, String key) {

        if (key == null) {
            key = getNewKeyObjectGui();
        }
        if (newObject == null) {

            BEXI_Object currentObject = (BEXI_Object) _current_Object;
            // Set up attribut/values
            String[] attributs = new String[currentObject.getAttributs().length];
            String[] values = new String[currentObject.get_values().length];
            for (int i = 0; i < attributs.length; i++) {
                if (currentObject.getAttributs()[i].equals(BEXI_Object._ID_KEY)) {
                    attributs[i] = currentObject.getAttributs()[i];
                    values[i] = key;
                } else {
                    attributs[i] = currentObject.getAttributs()[i];
                    values[i] = "";
                }
            }
            BEXI_Object object = new BEXI_Object(null, currentObject.get_className(), "", attributs, values, null, null, true);
            newObject = object;
        }

        _current_Object = newObject;
        _objects.add(newObject);
        _BEXI_objectIndexMax = _objects.size();
        _BEXI_objectIndex = _BEXI_objectIndexMax - 1;
    }

    /**
     * remove OPENBEXI object from object list.
     *
     * @param object
     */
    public void remove_Object(final Object object) {

        if (_BEXI_objectIndexMax == 0) return;

        String key = null;
        String currentKey = null;

        BEXI_Object objectTmp = (BEXI_Object) object;
        key = objectTmp.get_Values(BEXI_Object._ID_KEY);

        for (int i = 0; i < _objects.size(); i++) {
            Object currentObject = _objects.get(i);

            objectTmp = (BEXI_Object) currentObject;
            currentKey = objectTmp.get_Values(BEXI_Object._ID_KEY);

            if (currentKey.equals(key)) {
                _objects.remove(i);
                _BEXI_objectIndexMax = _objects.size();
                _BEXI_objectIndex--;

                if (_BEXI_objectIndex < 0) {
                    _BEXI_objectIndex = _BEXI_objectIndexMax - 1;
                }
                if (_BEXI_objectIndexMax != 0) {
                    _current_Object = _objects.get(_BEXI_objectIndex);
                }
                return;
            }
        }
    }


    /**
     * remove OPENBEXI object from object list.
     */
    public void remove_Object() {

        if (_BEXI_objectIndexMax == 0) return;

        _objects.removeElementAt(_BEXI_objectIndex);
        _BEXI_objectIndexMax = _objects.size();
        _BEXI_objectIndex--;

        if (_BEXI_objectIndex < 0) {
            _BEXI_objectIndex = _BEXI_objectIndexMax - 1;
        }
        if (_BEXI_objectIndexMax != 0) {
            _current_Object = _objects.get(_BEXI_objectIndex);
        }
    }

    /**
     * update OPENBEXI object attribute name from a provided attribute list for a given object.
     */
    public void update_ObjectAttributName(Object object, String oldAttibut, String newAttribut) {

        //Update all same class object

        BEXI_Object obj = (BEXI_Object) object;
        if (!obj.ifAttributExists(newAttribut)) {
            add_ObjectAttribut(obj, newAttribut);
        }
        if (obj.ifAttributExists(oldAttibut)) {
            remove_ObjectAttribut(obj, oldAttibut);
        }
    }

    /**
     * add OPENBEXI object attribute.
     */
    public void add_ObjectAttribut(Object object, String AttributName) {

        //Update all same class object
        if (object instanceof BEXI_Object) {
            BEXI_Object obj = (BEXI_Object) object;
            for (int i = 0; i < _objects.size(); i++) {
                Object currentObj = _objects.get(i);
                if (currentObj instanceof BEXI_Object) {
                    BEXI_Object currentObjTmp = (BEXI_Object) currentObj;
                    if (currentObjTmp.get_className().equals(obj.get_className())) {
                        currentObjTmp.add_attribut(AttributName, "none");
                    }
                }
            }
        }
    }

    /**
     * remove OPENBEXI object attribute.
     */
    public void remove_ObjectAttribut(Object object, String AttributName) {

        //Update all same class object
        if (object instanceof BEXI_Object) {
            BEXI_Object obj = (BEXI_Object) object;
            for (int i = 0; i < _objects.size(); i++) {
                Object currentObj = _objects.get(i);
                if (currentObj instanceof BEXI_Object) {
                    BEXI_Object currentObjTmp = (BEXI_Object) currentObj;
                    if (currentObjTmp.get_className().equals(obj.get_className())) {
                        currentObjTmp.remove_attribut(AttributName);
                        this.set_current_Attribut(null);
                    }
                }
            }
        }
    }


    /**
     * set current OPENBEXI object from object list.
     *
     * @param currentObject
     */
    public void current(final Object currentObject) {

        if (currentObject == null) return;
        _BEXI_objectIndex = this.getIndexObject(currentObject);
        _current_Object = currentObject;
    }

    /**
     * set current OPENBEXI object from object list.
     */
    public void first() {

        _BEXI_objectIndex = 0;
        _current_Object = _objects.get(0);

    }

    /**
     * set current OPENBEXI object from object list.
     */
    public void last() {

        _BEXI_objectIndex = _BEXI_objectIndexMax - 1;
        _current_Object = get_objects().get(_BEXI_objectIndexMax - 1);

    }

    /**
     * set next OPENBEXI object from object list.
     */
    public void next() {
        _BEXI_objectIndex++;
        if (_BEXI_objectIndex > _BEXI_objectIndexMax - 1) {
            _BEXI_objectIndex = 0;
        }
        if (_BEXI_objectIndexMax != 0) {
            _current_Object = _objects.get(_BEXI_objectIndex);
        }
    }

    /**
     * set previous OPENBEXI object from object list.
     */
    public void previous() {
        _BEXI_objectIndex--;
        if (_BEXI_objectIndex < 0) {
            _BEXI_objectIndex = _BEXI_objectIndexMax - 1;
        }
        if (_BEXI_objectIndexMax != 0) {
            _current_Object = _objects.get(_BEXI_objectIndex);
        }
    }

    /**
     * return true if object exist
     *
     * @param id
     * @return boolean
     */
    public boolean check(String id) {

        for (int i = 0; i < _objects.size(); i++) {
            BEXI_Object currentObject = (BEXI_Object) _objects.get(i);
            if (currentObject.get_Values(BEXI_Object._ID_KEY).equals(id)) {
                return true;
            }
        }
        return false;
    }

    /**
     * return true if object name exist
     *
     * @param objectName
     * @return boolean
     */
    public boolean checkObjectName(String objectName) {

        for (int i = 0; i < _objects.size(); i++) {
            BEXI_Object currentObject = (BEXI_Object) _objects.get(i);
            if (currentObject.get_Values(BEXI_Object._ID_KEY).equals(objectName)) {
                return true;
            }
        }
        return false;
    }

}
