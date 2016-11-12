/* This notice must be untouched at all times.

Copyright (c) 2005-2013 JC Arcaz. All rights reserved.
OPEN OPENBEXI HTML Builder for generating dynanic HTML page and html code source from browsers.
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

Note:
 OPEN OPENBEXI htmlbuilder uses dojo Toolkit (http://dojotoolkit.org/).
OPEN OPENBEXI htmlbuilder uses the DHTML libraries from www.walterzorn.com for resizing and dragging pictures and layers (LGPL).
*/

function setSelectedText(comboBox, text) {
    //if (getBrowser()!= "ie") return;
    if (comboBox == null) return;
    for (var i = 0; i < comboBox.options.length; i++) {
        if (text == comboBox.options[i].text) {
            comboBox.selectedIndex = i;
            return;
        }
    }
    comboBox.selectedIndex = 0;
}
function createOptions(comboBox, items) {
    if (comboBox == null) return;
    for (var i = 0; i < items.length; i++) {
        var newOpt = document.createElement("OPTION")
        newOpt.text = items[i];
        comboBox.options.add(newOpt);
    }
}
function deleteAllOptions(comboBox) {
    if (comboBox == null) return;
    for (i = comboBox.options.length - 1; i >= 0; i--) {
        comboBox.remove(i);
    }
}
