/* This notice must be untouched at all times.

Copyright (c) 2005-2012 JC Arcaz. All rights reserved.
 OPEN OPENBEXI HTML Builder for generating dynanic HTML page and html code source from browsers.
updated: January 22 2012 version 4.0
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

 Note:
 OPEN OPENBEXI htmlbuilder uses dojo 1.0 (BSD License).
 OPEN OPENBEXI htmlbuilder uses the DHTML libraries from www.walterzorn.com for resizing and dragging pictures and layers (LGPL).
 */
package OPENBEXI_Timeline;

public class OPENBEXI_timeline_resource {

    //Status
    public enum status {
        ENABLE,
        DISABLED,
    }

    private String _text;
    private status _status = status.ENABLE;

    public OPENBEXI_timeline_resource(String name, String text, status status) {
        _name = name;
        _text = text;
        _status = status;
    }

    private String _name;

    public String get_name() {
        return _name;
    }

    public void set_name(String _name) {
        this._name = _name;
    }

    public String get_text() {
        return _text;
    }

    public void set_text(String _text) {
        this._text = _text;
    }

    public status get_status() {
        return _status;
    }

    public void set_status(status _status) {
        this._status = _status;
    }
}
