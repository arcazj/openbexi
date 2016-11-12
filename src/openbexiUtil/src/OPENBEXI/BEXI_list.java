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

import java.util.List;
import java.util.ArrayList;

public class BEXI_list {
    List _list;
    int _rows=0;

    public BEXI_list() {
        _list =new ArrayList();
    }

    BEXI_list(int rows) {
        _rows = rows;
        _list =new ArrayList(rows);
    }

    public void add(String item) {
        _list.add(item);
    }

    public void add(String item, int index) {
        _list.add(index, item);
    }

    public int getItemCount() {
        return _list.size();
    }

    public String getItem(int index) {
        return (String) _list.get(index);
    }

    public void replaceItem(String newValue, int index) {
        _list.set(index, newValue);
    }

    public void remove( int index) {
        _list.remove(index);
    }
    public void removeAll() {
        _list =new ArrayList(_rows);  
    }
}
