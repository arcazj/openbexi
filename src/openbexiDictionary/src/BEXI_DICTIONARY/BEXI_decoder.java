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

package BEXI_DICTIONARY;


import org.apache.mina.util.Base64;


/**
 * Created by arcaz-jca on 7/26/14.
 */
public class BEXI_decoder {
    public static void main(String args[])  {
           String orig = "OpenBEXI";

           //encoding  byte array into base 64
           byte[] encoded = Base64.encodeBase64(orig.getBytes());

           System.out.println("Original String: " + orig );
           System.out.println("Base64 Encoded String : " + new String(encoded));

           //decoding byte array into base64
           byte[] decoded = Base64.decodeBase64(encoded);
           System.out.println("Base 64 Decoded  String : " + new String(decoded));

       }

}

