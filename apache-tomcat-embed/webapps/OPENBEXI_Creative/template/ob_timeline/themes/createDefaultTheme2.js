/* This notice must be untouched at all times.

 Copyright (c) 2005-2009 JC Arcaz. All rights reserved.
 OPEN OPENBEXI htmlbuilder library for generating dynanic HTML page and html code source from browsers.
 updated: Feb  21  2009 version 2.2
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

function createDefaultTheme2() {
    var theme = null;
    try {
        theme = Timeline.ClassicTheme.create();
        Timeline.ThemeName = 'timeline-default';
        theme.event.bubble.width = 450;
        theme.event.bubble.height = 550;

        theme.event.track.height = 15;
        theme.event.track.gap = 10;

        theme.event.tape.height = 8;

        //theme.event.overviewTrack.offset = 20;
        //theme.event.overviewTrack.tickHeight = 6;
        //theme.event.overviewTrack.height = 2;
        //theme.event.overviewTrack.gap = 1;

        //theme.event.instant.iconWidth = 40;
        //theme.event.instant.iconHeight = 40;

        //theme.event.label.width = 250;
        //theme.ether.backgroundColors = [ "#D8CAA8","#284907","#363942" ];
    } catch (e) {
        return theme;
    }
    return theme;
}