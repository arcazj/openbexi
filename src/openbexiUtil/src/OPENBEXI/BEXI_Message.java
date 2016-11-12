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


class BEXI_Message {

    private String _defaultLanguage = BEXI_DataContext.ENGLISH;
    private String _language = null;
    private String _message = null;


    public BEXI_Message(BEXI_ApplicationPath context) {
        _language = context.getDefaultLanguage();
        _message = null;
    }

    public BEXI_Message() {
        _language = _defaultLanguage;
        _message = null;
    }

    public String getDefaultLanguage() {
        return _defaultLanguage;
    }

    public String getLanguage() {
        return _language;
    }

    public String getMessage(String[] message) {
        _message = "";
        if (_language.equals(BEXI_DataContext.FRENCH)) {

            //////////////////////////////////////////
            if (message[1].equals(" not found for ")) {
                _message = "Pas d'information pour " + message[0] + " de " + message[2];
            }

        } else {
            for (int i = 0; i < message.length; i++) {
                _message = _message + message[i];
            }
        }
        return _message;
    }


}

