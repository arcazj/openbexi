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

public final class BEXI_Context {

    private final Vector _context = new Vector();
    private int _currentContext;
    private int _nbMaxContext;
    private boolean _flag;

    /**
     * OPENBEXI context constructor.
     *
     * @param nbMaxContext
     */
    public BEXI_Context(final int nbMaxContext) {
        _currentContext = 0;
        _nbMaxContext = nbMaxContext;
        _flag = false;
    }

    /**
     * Return a list of context object.
     *
     * @return _context
     */
    public Vector getContext() {
        return _context;
    }

    /**
     * Return the current context index.
     *
     * @return _currentContext
     */
    public int getCurrentContext() {
        return _currentContext;
    }

    /**
     * Return the maximun number of context.
     *
     * @return _nbMaxContext
     */
    public int getNbMaxContext() {
        return _nbMaxContext;
    }

    /**
     * Add or replace a new context object in a circular list.
     *
     * @param context
     */
    public void add(final Object context) {
        if (_flag == false) {
            _context.add(_currentContext, context);
        } else {
            _context.setElementAt(context, _currentContext);
        }

        _currentContext = _currentContext + 1;

        if (_currentContext == _nbMaxContext) {
            _currentContext = 0;
            _flag = true;
        }
    }

    /**
     * Add or replace a new context object in a circular list.
     *
     * @param context
     */
    public void add(int index, final Object context) {
        if (_flag == false) {
            _context.add(index, context);
        } else {
            _context.setElementAt(context, index);
        }

        _currentContext = index + 1;

        if (_currentContext == _nbMaxContext) {
            _currentContext = 0;
            _flag = true;
        }
    }
}


