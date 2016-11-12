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
package OPENBEXI_Creative;

import java.io.BufferedReader;
import java.io.InputStreamReader;

public class OPENBEXI_Firefox {
    public void launch(String url, boolean restart) {
        ProcessBuilder launcher = null;
        try {
            String OS = System.getProperty("os.name").toLowerCase();
            System.out.println(OS + " detected ...");
            if (OS.indexOf("windows 9") > -1) {
                System.out.println(OS + " LAUNCH " + System.getProperty("user.dir") + System.getProperty("file.separator") + "Mozilla" + System.getProperty("file.separator") + "firefox.exe" + url);
                launcher = new ProcessBuilder(System.getProperty("user.dir") + System.getProperty("file.separator") + "Mozilla" + System.getProperty("file.separator") + "firefox.exe ", url);
            } else if ((OS.indexOf("nt") > -1)
                    || (OS.indexOf("windows 2000") > -1)
                    || (OS.indexOf("windows xp") > -1)) {
                if (restart) {
                    System.out.println(OS + " LAUNCH " + System.getProperty("user.dir") + System.getProperty("file.separator") + "Mozilla" + System.getProperty("file.separator") + "firefox.exe " + url);
                    launcher = new ProcessBuilder(System.getProperty("user.dir") + System.getProperty("file.separator") + "Mozilla" + System.getProperty("file.separator") + "firefox.exe", url);
                } else {
                    //Start default browser
                    System.out.println(OS + " LAUNCH " + "C:\\Program Files\\Internet Explorer\\iexplore.exe " + url);
                    launcher = new ProcessBuilder("C:\\Program Files\\Internet Explorer\\iexplore.exe", url);
                }
            } else if ((OS.indexOf("windows vista") > -1)
                    || (OS.indexOf("windows NT (unknown)") > -1)) {
                if (restart) {
                    System.out.println(OS + " LAUNCH " + System.getProperty("user.dir") + System.getProperty("file.separator") + "Mozilla" + System.getProperty("file.separator") + "firefox.exe " + url);
                    launcher = new ProcessBuilder(System.getProperty("user.dir") + System.getProperty("file.separator") + "Mozilla" + System.getProperty("file.separator") + "firefox.exe", url);
                } else {
                    //Start default browser
                    System.out.println(OS + " LAUNCH " + "C:\\Program Files\\Internet Explorer\\iexplore.exe " + url);
                    launcher = new ProcessBuilder("C:\\Program Files\\Internet Explorer\\iexplore.exe", url);
                }
            } else {
                System.out.println(OS + " LAUNCH htmlview " + url);
                launcher = new ProcessBuilder("htmlview", url);
            }

            Process p = launcher.start();
            BufferedReader output = new BufferedReader(new InputStreamReader(p.getInputStream()));
            String line;
            while ((line = output.readLine()) != null)
                System.out.println(line);
            p.waitFor();
        } catch (Throwable e) {
            System.out.println("OPENBEXI_Firefox: failed to " + e.getMessage());
            OPENBEXI_Firefox firefox = new OPENBEXI_Firefox();
            if (restart)
                firefox.launch("http://localhost:8080/openbexi.do", false);
        }
    }

    public static void main(String args[]) {
        OPENBEXI_Firefox firefox = new OPENBEXI_Firefox();
        firefox.launch("http://www.openbexi.com", true);
    }
}

