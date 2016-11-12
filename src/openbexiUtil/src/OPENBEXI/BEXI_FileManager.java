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

import javax.swing.*;
import java.io.File;
import java.io.FilenameFilter;
import java.util.Vector;
import java.awt.*;

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

class customFilter implements FilenameFilter {
    private String extension;

    public customFilter(String ext) {
        this.extension = "." + ext;
    }

    public boolean accept(File dir, String file) {
        return file.endsWith(extension);
    }
}

public class BEXI_FileManager {

    String _classeName = null;
    Vector _objects = null;

    public BEXI_FileManager(Vector objects, String classeName) {
        _classeName = classeName;
        _objects = objects;
    }

    public BEXI_FileManager(Vector objects) {
        _objects = objects;
    }

    private void rotateRecent(String newRecent) {
        final JMenuItem[] fRecent = new JMenuItem[4];
        final String EMPTY = "<empty>";

        if (fRecent[2] != null && fRecent[2].getText() != null) {
            fRecent[3].setText(fRecent[2].getText());
        } else {
            fRecent[3] = new JMenuItem(EMPTY);
            fRecent[2] = new JMenuItem(EMPTY);
        }
        if (fRecent[1] != null && fRecent[1].getText() != null) {
            fRecent[2].setText(fRecent[1].getText());
        } else {
            fRecent[1] = new JMenuItem(EMPTY);
        }
        if (fRecent[0] != null && fRecent[0].getText() != null) {
            fRecent[1].setText(fRecent[0].getText());
        } else {
            fRecent[0] = new JMenuItem(newRecent);
        }
        for (int i = 0; i <= 3; i++) {
            if (fRecent[i].getText().equals(EMPTY))
                fRecent[i].setEnabled(false);
            else
                fRecent[i].setEnabled(true);
        }

    }

    public String saveFile(String fileName, String filter) {

        JFrame frame = new JFrame();

        FileDialog saveDialog = new FileDialog(new Frame(), "Save File", FileDialog.SAVE);

        if (fileName != null) {
            saveDialog.setFile(fileName);
        }
        if (filter != null) {
            saveDialog.setFilenameFilter(new customFilter(filter));
        }

        if (fileName == null) {
            saveDialog.show();
            fileName = saveDialog.getFile();
            if (fileName == null) {
                return null;
            }
            fileName = saveDialog.getDirectory() + saveDialog.getFile();
            rotateRecent(fileName);
        }

        try {
            BEXI_XMLDriver xmlDriver = new BEXI_XMLDriver();
            File file = new File(fileName);
            xmlDriver.save_BEXI_Objects(null, file.getParent(), file.getName().replaceAll(".xml", ""), _objects);
        } catch (Exception e) {
            if (BEXI_DEBUG.level > 0)
                JOptionPane.showMessageDialog(frame, e.getMessage());
        }
        return fileName;
    }

    public String saveFileAs(String fileName, String filter) {

        JFrame frame = new JFrame();
        FileDialog saveDialog = new FileDialog(new Frame(), "Save File", FileDialog.SAVE);

        if (fileName != null) {
            saveDialog.setFile(fileName);
        }
        if (filter != null) {
            saveDialog.setFilenameFilter(new customFilter(filter));
        }

        saveDialog.show();
        fileName = saveDialog.getFile();
        if (fileName == null) {
            return null;
        }
        fileName = saveDialog.getDirectory() + saveDialog.getFile();
        rotateRecent(fileName);

        try {
            BEXI_XMLDriver xmlDriver = new BEXI_XMLDriver();
            File file = new File(fileName);
            xmlDriver.save_BEXI_Objects(null, file.getParent(), file.getName().replaceAll(".xml", ""), _objects);
        } catch (Exception e) {
            if (BEXI_DEBUG.level > 0)
                JOptionPane.showMessageDialog(frame, e.getMessage());
        }
        return fileName;
    }

    public Vector loadfile(String filter) {

        JFrame frame = new JFrame();
        String fileName = null;

        FileDialog loadDialog = new FileDialog(new Frame(), "Load File", FileDialog.LOAD);
        loadDialog.show();

        if (filter != null) {
            loadDialog.setFilenameFilter(new customFilter(filter));
        }
        if (loadDialog.getFile() == null) {
            return null;
        } else {
            fileName = loadDialog.getDirectory() + loadDialog.getFile();
        }


        Vector objectsR = null;
        try {
            File file = new File(fileName);
            objectsR = BEXI_XMLDriver.read_BEXI_Objects(null, file.getParent(), file.getName().replaceAll(".xml", ""), null);
        } catch (Exception e) {
            JOptionPane.showMessageDialog(frame, e.getMessage());
        }

        rotateRecent(fileName);
        return objectsR;
    }

    public Vector loadfile(File file) {

        JFrame frame = new JFrame();
        String directory = null;
        directory = file.getParent();
        String fileName = file.getName().replaceAll(".xml", "");

        Vector objectsR = null;
        try {
            objectsR = BEXI_XMLDriver.read_BEXI_Objects(null, directory, fileName, null);
        } catch (Exception e) {
            JOptionPane.showMessageDialog(frame, e.getMessage());
        }

        return objectsR;
    }


}
