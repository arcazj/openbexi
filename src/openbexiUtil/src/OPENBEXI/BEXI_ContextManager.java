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

public final class BEXI_ContextManager {

    public static String CIRCULAR_LIST = "CIRCULAR_LIST";
    public static String LINEAR_LIST = "LINEAR_LIST";

    private int _currentContext;
    private static int _index;
    private static int _count;
    private static int _nbMaxContext;
    private final BEXI_Context _context;

    /**
     * Context manager constructor.
     *
     * @param context
     */
    public BEXI_ContextManager(final BEXI_Context context) {
        _context = context;
        _currentContext = context.getCurrentContext();
        _index = _currentContext;
        _count = 0;
        _nbMaxContext = context.getNbMaxContext();
    }

    /**
     * Return the last context object.
     *
     * @param context
     * @return Context object
     */
    public Object getLastContext(Object context, String typeList) {

        //____________________________________________________________________
        // CIRCULAR_LIST
        //____________________________________________________________________
        if (typeList.equals(CIRCULAR_LIST)) {
            Vector c = _context.getContext();
            if (context instanceof BEXI_SqlContext) {
                for (int j = _currentContext - 1; j >= 0; j--) {
                    if (c.get(j) != null) {
                        if (c.get(j) instanceof BEXI_SqlContext) {
                            return c.get(j);
                        }
                    }
                }
                if (c.size() < _nbMaxContext) return null;
                for (int j = _nbMaxContext - 1; j > _currentContext; j--) {
                    if (c.get(j) != null) {
                        if (c.get(j) instanceof BEXI_SqlContext) {
                            return c.get(j);
                        }
                    }
                }
            }
            if (context instanceof BEXI_ApplicationPath) {
                for (int j = _currentContext - 1; j >= 0; j--) {
                    if (c.get(j) != null) {
                        if (c.get(j) instanceof BEXI_ApplicationPath) {
                            return c.get(j);
                        }
                    }
                }
                if (c.size() < _nbMaxContext) return null;
                for (int j = _nbMaxContext - 1; j > _currentContext; j--) {
                    if (c.get(j) != null) {
                        if (c.get(j) instanceof BEXI_ApplicationPath) {
                            return c.get(j);
                        }
                    }
                }
            }
            if (context instanceof BEXI_Expression) {
                for (int j = _currentContext - 1; j >= 0; j--) {
                    if (c.get(j) != null) {
                        if (c.get(j) instanceof BEXI_Expression) {
                            return c.get(j);
                        }
                    }
                }
                if (c.size() < _nbMaxContext) return null;
                for (int j = _nbMaxContext - 1; j > _currentContext; j--) {
                    if (c.get(j) != null) {
                        if (c.get(j) instanceof BEXI_Expression) {
                            return c.get(j);
                        }
                    }
                }
            }
            if (context instanceof BEXI_Object) {
                for (int j = _currentContext - 1; j >= 0; j--) {
                    if (c.get(j) != null) {
                        if (c.get(j) instanceof BEXI_Object) {
                            return c.get(j);
                        }
                    }
                }
                if (c.size() < _nbMaxContext) return null;
                for (int j = _nbMaxContext - 1; j > _currentContext; j--) {
                    if (c.get(j) != null) {
                        if (c.get(j) instanceof BEXI_Object) {
                            return c.get(j);
                        }
                    }
                }
            }
        }

        //____________________________________________________________________
        // LINEAR_LIST
        //____________________________________________________________________

        if (typeList.equals(LINEAR_LIST)) {
            Vector c = _context.getContext();
            if (context instanceof BEXI_SqlContext) {
                for (int j = _currentContext - 1; j >= 0; j--) {
                    if (c.get(j) != null) {
                        if (c.get(j) instanceof BEXI_SqlContext) {
                            return c.get(j);
                        }
                    }
                }
            }
            if (context instanceof BEXI_ApplicationPath) {
                for (int j = _currentContext - 1; j >= 0; j--) {
                    if (c.get(j) != null) {
                        if (c.get(j) instanceof BEXI_ApplicationPath) {
                            return c.get(j);
                        }
                    }
                }
            }
            if (context instanceof BEXI_Expression) {
                for (int j = _currentContext - 1; j >= 0; j--) {
                    if (c.get(j) != null) {
                        if (c.get(j) instanceof BEXI_Expression) {
                            return c.get(j);
                        }
                    }
                }
            }
            if (context instanceof BEXI_Object) {
                for (int j = _currentContext - 1; j >= 0; j--) {
                    if (c.get(j) != null) {
                        if (c.get(j) instanceof BEXI_Object) {
                            return c.get(j);
                        }
                    }
                }
            }
        }
        return null;

    }

    /**
     * Return a previous context object according the index in the circular list.
     * Return null when all the list items have been parsed.
     *
     * @param context
     * @return Context object
     */

    public Object getPreviousContext(Object context, String typeList) {

        //____________________________________________________________________
        // CIRCULAR_LIST
        //____________________________________________________________________

        if (typeList.equals(CIRCULAR_LIST)) {
            final Vector c = _context.getContext();
            _index--;
            _count++;

            if (_count == _nbMaxContext + 1) {
                return null;
            }
            if (_index < 0) {
                _index = _nbMaxContext - 1;
            }
            if (context instanceof BEXI_SqlContext) {
                for (int j = _index; j >= 0; j--) {
                    if (c.get(j) != null) {
                        if (c.get(j) instanceof BEXI_SqlContext) {
                            return c.get(j);
                        }
                    }
                }

                if (c.size() < _nbMaxContext) return null;
                for (int j = _nbMaxContext - 1; j > _index; j--) {
                    if (c.get(j) != null) {
                        if (c.get(j) instanceof BEXI_SqlContext) {
                            return c.get(j);
                        }
                    }
                }
            }
            if (context instanceof BEXI_ApplicationPath) {
                for (int j = _index; j >= 0; j--) {
                    if (c.get(j) != null) {
                        if (c.get(j) instanceof BEXI_ApplicationPath) {
                            return c.get(j);
                        }
                    }
                }

                if (c.size() < _nbMaxContext) return null;
                for (int j = _nbMaxContext - 1; j > _index; j--) {
                    if (c.get(j) != null) {
                        if (c.get(j) instanceof BEXI_ApplicationPath) {
                            return c.get(j);
                        }
                    }
                }
            }
            if (context instanceof BEXI_Expression) {
                for (int j = _index; j >= 0; j--) {
                    if (c.get(j) != null) {
                        if (c.get(j) instanceof BEXI_Expression) {
                            return c.get(j);
                        }
                    }
                }

                if (c.size() < _nbMaxContext) return null;
                for (int j = _nbMaxContext - 1; j > _index; j--) {
                    if (c.get(j) != null) {
                        if (c.get(j) instanceof BEXI_Expression) {
                            return c.get(j);
                        }
                    }
                }
            }
            if (context instanceof BEXI_Object) {
                for (int j = _index; j >= 0; j--) {
                    if (c.get(j) != null) {
                        if (c.get(j) instanceof BEXI_Object) {
                            return c.get(j);
                        }
                    }
                }

                if (c.size() < _nbMaxContext) return null;
                for (int j = _nbMaxContext - 1; j > _index; j--) {
                    if (c.get(j) != null) {
                        if (c.get(j) instanceof BEXI_Object) {
                            return c.get(j);
                        }
                    }
                }
            }
        }

        //____________________________________________________________________
        // LINEAR_LIST
        //____________________________________________________________________
        if (typeList.equals(LINEAR_LIST)) {
            final Vector c = _context.getContext();

            if (_index > _nbMaxContext) {
                _index--;
                return null;
            }
            if (_index < 0) {
                _index++;
                return null;
            }
            if (context instanceof BEXI_SqlContext) {
                for (int j = _index; j >= 0; j--) {
                    if (c.get(j) != null) {
                        if (c.get(j) instanceof BEXI_SqlContext) {
                            _index--;
                            return c.get(j);
                        }
                    }
                }
            }
            if (context instanceof BEXI_ApplicationPath) {
                for (int j = _index; j >= 0; j--) {
                    if (c.get(j) != null) {
                        if (c.get(j) instanceof BEXI_ApplicationPath) {
                            _index--;
                            return c.get(j);
                        }
                    }
                }
            }
            if (context instanceof BEXI_Expression) {
                for (int j = _index; j >= 0; j--) {
                    if (c.get(j) != null) {
                        if (c.get(j) instanceof BEXI_Expression) {
                            _index--;
                            return c.get(j);
                        }
                    }
                }
            }
            if (context instanceof BEXI_Object) {
                for (int j = _index; j >= 0; j--) {
                    if (c.get(j) != null) {
                        if (c.get(j) instanceof BEXI_Object) {
                            _index--;
                            return c.get(j);
                        }
                    }
                }
            }
        }

        return null;
    }

    /**
     * Return a previous context object according the index in the circular list.
     * Return null when all the list items have been parsed.
     *
     * @param context
     * @return Context object
     */

    public Object getNextContext(Object context, String typeList) {

        //____________________________________________________________________
        // CIRCULAR_LIST
        //____________________________________________________________________
        if (typeList.equals(CIRCULAR_LIST)) {
            final Vector c = _context.getContext();
            _index++;
            _count++;

            if (_count == _nbMaxContext + 1) {
                return null;
            }
            if (_index < 0) {
                _index = _nbMaxContext - 1;
            }
            if (context instanceof BEXI_SqlContext) {
                for (int j = _index; j < _nbMaxContext; j++) {
                    if (c.get(j) != null) {
                        if (c.get(j) instanceof BEXI_SqlContext) {
                            return c.get(j);
                        }
                    }
                }

                if (c.size() < _nbMaxContext) return null;
                for (int j = 0; j < _index; j++) {
                    if (c.get(j) != null) {
                        if (c.get(j) instanceof BEXI_SqlContext) {
                            return c.get(j);
                        }
                    }
                }
            }
            if (context instanceof BEXI_ApplicationPath) {
                for (int j = _index; j < _nbMaxContext; j++) {
                    if (c.get(j) != null) {
                        if (c.get(j) instanceof BEXI_ApplicationPath) {
                            return c.get(j);
                        }
                    }
                }

                if (c.size() < _nbMaxContext) return null;
                for (int j = 0; j < _index; j++) {
                    if (c.get(j) != null) {
                        if (c.get(j) instanceof BEXI_ApplicationPath) {
                            return c.get(j);
                        }
                    }
                }
            }
            if (context instanceof BEXI_Expression) {
                for (int j = _index; j < _nbMaxContext; j++) {
                    if (c.get(j) != null) {
                        if (c.get(j) instanceof BEXI_Expression) {
                            return c.get(j);
                        }
                    }
                }

                if (c.size() < _nbMaxContext) return null;
                for (int j = 0; j < _index; j++) {
                    if (c.get(j) != null) {
                        if (c.get(j) instanceof BEXI_Expression) {
                            return c.get(j);
                        }
                    }
                }
            }
            if (context instanceof BEXI_Object) {
                for (int j = _index; j < _nbMaxContext; j++) {
                    if (c.get(j) != null) {
                        if (c.get(j) instanceof BEXI_Object) {
                            return c.get(j);
                        }
                    }
                }

                if (c.size() < _nbMaxContext) return null;
                for (int j = 0; j < _index; j++) {
                    if (c.get(j) != null) {
                        if (c.get(j) instanceof BEXI_Object) {
                            return c.get(j);
                        }
                    }
                }
            }
        }

        //____________________________________________________________________
        // LINEAR LIST
        //____________________________________________________________________
        if (typeList.equals(LINEAR_LIST)) {
            final Vector c = _context.getContext();

            if (_index > _nbMaxContext) {
                _index--;
                return null;
            }
            if (_index < 0) {
                _index++;
                return null;
            }
            if (context instanceof BEXI_SqlContext) {
                for (int j = _index; j < _nbMaxContext; j++) {
                    if (c.get(j) != null) {
                        if (c.get(j) instanceof BEXI_SqlContext) {
                            _index++;
                            return c.get(j);
                        }
                    }
                }
            }
            if (context instanceof BEXI_ApplicationPath) {
                for (int j = _index; j < _nbMaxContext; j++) {
                    if (c.get(j) != null) {
                        if (c.get(j) instanceof BEXI_ApplicationPath) {
                            _index++;
                            return c.get(j);
                        }
                    }
                }
            }
            if (context instanceof BEXI_Expression) {
                for (int j = _index; j < _nbMaxContext; j++) {
                    if (c.get(j) != null) {
                        if (c.get(j) instanceof BEXI_Expression) {
                            _index++;
                            return c.get(j);
                        }
                    }
                }
            }
            if (context instanceof BEXI_Object) {
                for (int j = _index; j < _nbMaxContext; j++) {
                    if (c.get(j) != null) {
                        if (c.get(j) instanceof BEXI_Object) {
                            _index++;
                            return c.get(j);
                        }
                    }
                }
            }
        }

        return null;
    }

    /**
     * Add a new object in the context
     *
     * @param newContext
     */
    public void addObject(Object newContext) {

        // Update index context
        _nbMaxContext = _context.getContext().size();
        _index = _nbMaxContext;
        _context.add(_index, newContext);

        // Clean up all object after index
        for (int j = _index + 1; j < _context.getContext().size(); j++) {
            _context.getContext().remove(j);
        }
    }

}
