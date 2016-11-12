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

/**
 * Menage OPENBEXI time.
 */

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;


public final class BEXI_TimeManager {

    public final String OB_defaultFormatDate = "MM/dd/yyyy HH:mm:ss";
    public final String OB_defaultFormatDateWithoutHours = "MM/dd/yyyy";
    public final String OB_defaultFormatDateWithoutMinutes = "MM/dd/yyyy HH";


    /**
     * Return OB_defaultFileFormatDate ("MM/dd/yyyy HH:mm:ss").
     *
     * @return OB_defaultFormatDate
     */
    public String getDefaultFormatDate() {
        return OB_defaultFormatDate;
    }

    public String getOBDefaultFormatDateWithoutHours() {
        return OB_defaultFormatDateWithoutHours;
    }

    public String getOBDefaultFormatDateWithoutMinutes() {
        return OB_defaultFormatDateWithoutMinutes;
    }

    /**
     * return date according dateLong and dateFormatIn.
     * example: if long=1070947694109 and dateFormatIn="MM/dd/yyyy HH:mm:ss".
     * return 12/08/2003 11:28:14.
     * If dateFormatIn null, use default date format= "MM/dd/yyyy HH:mm:ss".
     *
     * @param dateLong
     * @param dateFormatIn
     * @return String date
     */
    public String getDate(final long dateLong, final String dateFormatIn) {
        SimpleDateFormat bartDateFormat = null;
        if (dateFormatIn == null) {
            bartDateFormat = new SimpleDateFormat(OB_defaultFormatDate);
        } else {
            bartDateFormat = new SimpleDateFormat(dateFormatIn);
        }
        return bartDateFormat.format(new Date(dateLong));
    }

    /**
     * return date according dateS and dateFormatOut.
     * example: if dateS=12/08/2003 11:28:14  and dateFormatOut="MM/dd/yyyy HH:mm:ss".
     * return 1070947694109.
     * If dateFormatOut null, use default date format= "MM/dd/yyyy HH:mm:ss" .
     *
     * @param dateS
     * @param dateFormatOut
     * @return Long date
     * @throws ParseException
     */
    public long getDate(final String dateS, String dateFormatOut) throws ParseException {

        if (dateFormatOut == null) {
            dateFormatOut = OB_defaultFormatDate;
        }
        final SimpleDateFormat sdfInput;
        sdfInput = new SimpleDateFormat(dateFormatOut.trim());
        final Date date = sdfInput.parse(dateS.trim());
        return date.getTime();
    }


    /**
     * return date according dateS and dateFormatIn.
     * example: if dateS=12/08/2003 11:28:14  and dateFormatOut="MM/dd/yyyy HH:mm:ss".
     * return 1070947694109.
     * If dateFormatOut null, use default date format= "MM/dd/yyyy HH:mm:ss" .
     *
     * @param dateS
     * @param dateFormatIn
     * @return Long date
     * @throws ParseException
     */
    public String getDateString(final String dateS, String dateFormatIn) throws ParseException {

        final SimpleDateFormat sdfInput;
        if (dateFormatIn == null) {
            sdfInput = new SimpleDateFormat(OB_defaultFormatDate);
            dateFormatIn = OB_defaultFormatDate;
        } else {
            sdfInput = new SimpleDateFormat(dateFormatIn);
        }
        final Date date = sdfInput.parse(dateS);
        return this.getDate(date.getTime(), dateFormatIn);
    }

    /**
     * Return long current date
     *
     * @return Long date
     */
    public long getDate() {

        final Date date = new Date();
        return date.getTime();
    }

    /**
     * Return long current date
     *
     * @return Long date
     */
    public String getGMTDate(String dateFormatIn) {
        if (dateFormatIn == null) {
            dateFormatIn = OB_defaultFormatDate;
        }
        final SimpleDateFormat bartDateFormatStart = new SimpleDateFormat(dateFormatIn);
        bartDateFormatStart.setTimeZone(TimeZone.getTimeZone("GMT"));
        return bartDateFormatStart.format(new Date());
    }

    /**
     * Return the current time less hours.
     *
     * @param hours nb
     * @return Long date
     */
    public static long getDateHoursAgo(final int hours) {

        final Date date = new Date();
        return date.getTime() - (hours * 3600000);
    }

    /**
     * Return range date every hour from a start date to a end date (long).
     *
     * @param startLDate
     * @param endLDate
     * @param dateFormatIn
     * @return rangeDates
     */
    public String[] getRangeDate(final long startLDate, final long endLDate, String dateFormatIn) {

        if (dateFormatIn == null) {
            dateFormatIn = OB_defaultFormatDate;
        }

        long currentDate = startLDate;
        int count = 0;

        final SimpleDateFormat bartDateFormat = new SimpleDateFormat(dateFormatIn);

        while (currentDate < endLDate) {
            count++;
            currentDate = currentDate + 3600000;
        }

        final String[] rangeDates = new String[count];
        count = 0;
        currentDate = startLDate;
        while (currentDate < endLDate) {
            rangeDates[count] = bartDateFormat.format(new Date(currentDate));
            count++;
            currentDate = currentDate + 3600000;
        }
        return rangeDates;
    }

    /**
     * Return range date every hour from a start date to a end date (string).
     *
     * @param startDate
     * @param endDate
     * @param dateFormatIn
     * @return rangeDates
     */
    public String[] getRangeDate(final String startDate, final String endDate, String dateFormatIn) throws ParseException {

        if (dateFormatIn == null) {
            dateFormatIn = OB_defaultFormatDate;
        }

        final long startLDate = this.getDate(startDate, null);
        final long endLDate = this.getDate(endDate, null);
        long currentDate = startLDate;
        int count = 0;

        final SimpleDateFormat bartDateFormat = new SimpleDateFormat(dateFormatIn);

        while (currentDate < endLDate) {
            count++;
            currentDate = currentDate + 3600000;
        }

        final String[] rangeDates = new String[count];
        count = 0;
        currentDate = startLDate;
        while (currentDate < endLDate) {
            rangeDates[count] = bartDateFormat.format(new Date(currentDate));
            count++;
            currentDate = currentDate + 3600000;
        }
        return rangeDates;
    }

    /**
     * Return range date every hour from  MM/dd/yyyy 00:00:00  to MM/dd/yyyy 23:59:59 a day ago according a time zone.
     *
     * @return rangeDate
     */
    public String[] getRangePreviousDailyDate(final String dateFormatIn, final String FileFormatDateWithoutMinutes, final String timeZone) {

        final String[] rangeDates = new String[2];
        final Date date = new Date();
        final long previousDate = date.getTime() - (24 * 3600000);

        SimpleDateFormat bartDateFormatStart = null;
        SimpleDateFormat bartDateFormatEnd = null;
        if (dateFormatIn == null) {
            bartDateFormatStart = new SimpleDateFormat(FileFormatDateWithoutMinutes + "_00");
            bartDateFormatEnd = new SimpleDateFormat(FileFormatDateWithoutMinutes + "_23");
        } else {

            bartDateFormatStart = new SimpleDateFormat(dateFormatIn + " 00:00:00");
            bartDateFormatEnd = new SimpleDateFormat(dateFormatIn + " 23:59:59");
        }

        rangeDates[0] = bartDateFormatStart.format(new Date(previousDate));
        if (timeZone != "LOCAL") {
            bartDateFormatStart.setTimeZone(TimeZone.getTimeZone(timeZone));
        }
        if (timeZone != "LOCAL") {
            bartDateFormatEnd.setTimeZone(TimeZone.getTimeZone(timeZone));
        }
        rangeDates[1] = bartDateFormatEnd.format(new Date(previousDate));
        return rangeDates;
    }

    /**
     * Return range GMT date every hour from  MM/dd/yyyy HH:00:00  to MM/dd/yyyy HH:59:59 a hour ago according a time zone.
     *
     * @param dateFormatIn
     * @param FileFormatDateWithoutMinutes
     * @param timeZone
     * @return rangeDate
     */
    public String[] getRangePreviousHourlyDate(final String dateFormatIn, final String FileFormatDateWithoutMinutes, final String timeZone) {

        final String[] rangeDates = new String[2];
        final Date date = new Date();
        final long previousDate = date.getTime() - 3600000;

        SimpleDateFormat bartDateFormatStart = null;
        SimpleDateFormat bartDateFormatEnd = null;
        if (dateFormatIn == null) {

            bartDateFormatStart = new SimpleDateFormat(FileFormatDateWithoutMinutes);
            bartDateFormatEnd = new SimpleDateFormat(FileFormatDateWithoutMinutes);
        } else {
            bartDateFormatStart = new SimpleDateFormat(dateFormatIn + ":00:00");
            bartDateFormatEnd = new SimpleDateFormat(dateFormatIn + ":59:59");
        }

        if (timeZone != "LOCAL") {
            bartDateFormatStart.setTimeZone(TimeZone.getTimeZone("GMT"));
        }
        rangeDates[0] = bartDateFormatStart.format(new Date(previousDate));
        if (timeZone != "LOCAL") {
            bartDateFormatEnd.setTimeZone(TimeZone.getTimeZone("GMT"));
        }
        rangeDates[1] = bartDateFormatEnd.format(new Date(previousDate));
        return rangeDates;
    }

    /**
     * Return range GMT date every hour from  MM/dd/yyyy HH:00:00  to MM/dd/yyyy HH:59:59 a hour ago according a time zone.
     *
     * @param dateFormatIn
     * @param FileFormatDateWithoutMinutes
     * @param timeZone
     * @return rangeDate
     */
    public static String[] getRangeCurrentHourlyDate(final String dateFormatIn, final String FileFormatDateWithoutMinutes, final String timeZone) {

        final String[] rangeDates = new String[2];
        final Date date = new Date();
        final long previousDate = date.getTime();

        SimpleDateFormat bartDateFormatStart = null;
        SimpleDateFormat bartDateFormatEnd = null;
        if (dateFormatIn == null) {

            bartDateFormatStart = new SimpleDateFormat(FileFormatDateWithoutMinutes);
            bartDateFormatEnd = new SimpleDateFormat(FileFormatDateWithoutMinutes);
        } else {
            bartDateFormatStart = new SimpleDateFormat(dateFormatIn + ":00:00");
            bartDateFormatEnd = new SimpleDateFormat(dateFormatIn + ":59:59");
        }

        if (timeZone != "LOCAL") {
            bartDateFormatStart.setTimeZone(TimeZone.getTimeZone("GMT"));
        }
        rangeDates[0] = bartDateFormatStart.format(new Date(previousDate));
        if (timeZone != "LOCAL") {
            bartDateFormatEnd.setTimeZone(TimeZone.getTimeZone("GMT"));
        }
        rangeDates[1] = bartDateFormatEnd.format(new Date(previousDate));
        return rangeDates;
    }


    public static void main(final String[] args) {

        final BEXI_TimeManager t = new BEXI_TimeManager();

        //Test OB_TimeManager class
        String[] rangeDate = new String[2];
        final BEXI_TimeManager m = new BEXI_TimeManager();
        rangeDate = m.getRangePreviousDailyDate(null, t.OB_defaultFormatDateWithoutHours, "LOCAL");
        System.out.println("RANGE day -1:" + rangeDate[0]);
        System.out.println("RANGE day -1:" + rangeDate[1]);

        rangeDate = m.getRangePreviousHourlyDate(null, t.OB_defaultFormatDateWithoutMinutes, "LOCAL");
        System.out.println("RANGE hour -1:" + rangeDate[0]);
        System.out.println("RANGE hour -1:" + rangeDate[1]);

        rangeDate = m.getRangePreviousDailyDate(null, t.OB_defaultFormatDateWithoutHours, "GMT");
        System.out.println("GMT RANGE day -1:" + rangeDate[0]);
        System.out.println("GMT RANGE day -1:" + rangeDate[1]);

        rangeDate = m.getRangePreviousHourlyDate(null, t.OB_defaultFormatDateWithoutMinutes, "GMT");
        System.out.println("GMT RANGE hour -1:" + rangeDate[0]);
        System.out.println("GMT RANGE hour -1:" + rangeDate[1]);

        rangeDate = m.getRangePreviousHourlyDate(null, "MM_dd_yy_HH", "GMT");
        System.out.println("GMT RANGE hour -1:" + rangeDate[0]);
        System.out.println("GMT RANGE hour -1:" + rangeDate[1]);

        try {
            m.getRangeDate("12/14/2003 01:00:00", "12/15/2003 04:59:59", "MM_dd_yy_HH");
        } catch (ParseException e) {
            e.printStackTrace();
        }
    }

}
