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

public class OPENBEXI_Browser {
    public void launch(String url) {
        ProcessBuilder launcher = null;
        Runtime runtime = Runtime.getRuntime();
        String OS = System.getProperty("os.name").toLowerCase();
        System.out.println(OS + " detected ...");
        if ((OS.startsWith("nt"))
                || (OS.startsWith("windows 7"))
                || (OS.startsWith("windows 8"))
                || (OS.startsWith("windows 9"))
                || (OS.startsWith("windows 2000"))
                || (OS.startsWith("windows xp"))) {

            String user = System.getProperty("user.name");
            String[] browsers_Windows = {"C:\\\\Users\\\\"+user+"\\\\AppData\\\\Local\\\\Google\\\\Chrome\\\\Application\\\\chrome.exe","C:\\\\Program Files (x86)\\\\Mozilla Firefox\\\\firefox.exe","C:\\\\Program Files\\\\Mozilla Firefox\\\\firefox.exe", System.getProperty("user.dir") + System.getProperty("file.separator") + "Mozilla" + System.getProperty("file.separator") + "firefox.exe",};
            String browser_Windows = null;
            for (int count = 0; count < browsers_Windows.length && browser_Windows == null; count++) {
                try {
                    //Start default browser
                    System.out.println(OS + " LAUNCH " + browsers_Windows[count] + " " + url);
                    String args[] = {browsers_Windows[count], url};
                    Process p = runtime.exec(args);
                    BufferedReader output = new BufferedReader(new InputStreamReader(p.getInputStream()));
                    String line;
                    while ((line = output.readLine()) != null)
                        System.out.println(line);
                    p.waitFor();
                    break;
                } catch (Throwable e) {
                    System.out.println("OPENBEXI_Browser: failed to " + e.getMessage());
                }
            }
        } else if ((OS.startsWith("windows vista"))
                || (OS.startsWith("windows nt (unknown)"))) {
            String[] browsers_Windows = {
                    System.getProperty("user.dir") + System.getProperty("file.separator") + "Mozilla" + System.getProperty("file.separator") + "firefox.exe", "C:\\\\Program Files\\\\Internet Explorer\\\\iexplore.exe",};
            String browser_Windows = null;
            for (int count = 0; count < browsers_Windows.length && browser_Windows == null; count++) {
                try {
                    //Start default browser
                    System.out.println(OS + " LAUNCH " + browsers_Windows[count] + " " + url);
                    String args[] = {browsers_Windows[count], url};
                    Process p = runtime.exec(args);
                    BufferedReader output = new BufferedReader(new InputStreamReader(p.getInputStream()));
                    String line;
                    while ((line = output.readLine()) != null)
                        System.out.println(line);
                    p.waitFor();
                    break;
                } catch (Throwable e) {
                    System.out.println("OPENBEXI_Browser: failed to " + e.getMessage());
                }
            }
        } else {
            String[] browsers_linux = {
                    "firefox", "usr/lib/firefox/firefox", "htmlview", "mozilla", "/usr/local/mozilla/mozilla", "netscape", "Mozilla/firefox.exe", "Mozilla/firefox",};
            String browser_linux = null;

            for (int count = 0; count < browsers_linux.length && browser_linux == null; count++) {
                try {
                    System.out.println("OS=" + OS + " LAUNCH " + browsers_linux[count] + " " + url);
                    String args[] = {browsers_linux[count], url};
                    Process p = runtime.exec(args);
                    BufferedReader output = new BufferedReader(new InputStreamReader(p.getInputStream()));
                    String line;
                    while ((line = output.readLine()) != null)
                        System.out.println(line);
                    p.waitFor();
                    break;
                } catch (Throwable e) {
                    System.out.println("OPENBEXI_Browser: failed to " + e.getMessage());
                }

            }
        }
    }

    public static void main(String args[]) {
        OPENBEXI_Browser browser = new OPENBEXI_Browser();
        browser.launch("http://www.openbexi.com");
    }
}

