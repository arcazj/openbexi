/* This notice must be untouched at all times.
 
Copyright (c) 2005-2011 JC Arcaz. All rights reserved.
 OPEN OPENBEXI HTML Builder for generating dynanic HTML page and html code source from browsers.
updated: Janvier 03  2011 version 3.1
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
function ob_generic_function( widget_id, jsFile, function ) {
    //Variable declaration and initialization
 
    //Body: Javascript code
    // ex: javascript/openbexi_builder.js about_us()
    try {
        var e = document.createElement("script");
        e.src = javascript;
        e.type = "text/javascript";
        document.getElementsByTagName("head")[0].appendChild(e);
    } catch(e) {
    }
    try {
        var go_ob_generic = setTimeout(function() {
            eval(functionName);
            clearTimeout(go_ob_generic);
        }, 500);
    } catch(e) {
 
    }
}
