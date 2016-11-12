/* This notice must be untouched at all times.

Copyright (c) 2006-2011 JC Arcaz. All rights reserved.
OPEN OPENBEXI htmlbuilder library for generating dynanic HTML page and html code source from browsers.
updated: Jan 03 2011 version 3.1
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
function createDecadeBands(currentTime, timezone, eventSource, theme) {
    var bandInfos;
    try {
        bandInfos = [
                Timeline.createBandInfo({
                    width:          "100%",
                    intervalUnit:   Timeline.DateTime.DECADE,
                    intervalPixels: 200,
                    eventSource:    eventSource,
                    date:           currentTime,
                    theme:          theme
                })
                ];
       
    } catch (e) {
        return null;
    }
    return bandInfos;
}
