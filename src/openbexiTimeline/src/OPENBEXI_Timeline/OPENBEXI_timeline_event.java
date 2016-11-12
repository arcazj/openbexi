/* This notice must be untouched at all times.

Copyright (c) 2005-2011 JC Arcaz. All rights reserved.
OPEN OPENBEXI Creative: server side for generating dynanic HTML page and html code source from browsers.Works with OPEN OPENBEXI HTML Builder
updated: Janvier 22  2011 version 3.1
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
package OPENBEXI_Timeline;

import java.util.Vector;

/**
 * Created by IntelliJ IDEA.
 * User: arcaz-jca
 * Date: Oct 29, 2011
 * Time: 3:18:44 PM
 * To change this template use File | Settings | File Templates.
 */
public class OPENBEXI_timeline_event {


    //Status
    public enum status {
        CONFLICT,
        NOT_AUTHORIZED,
        NEED_ACKNOWLEDGEMENT,
        ACKNOWLEDGED,
        ACTIVATED,
        NEVER_ACTIVATED,
        RUNNING,
        PAUSED,
        ABORTED,
        FINISHED,
        DELETED
    }

    private String _id;
    private String _title;
    private String _start;
    private long _startL;
    private String _end;
    private long _endL;
    private String _isDuration;
    private String _latestStart;
    private String _earliestEnd;
    private String _priority;
    private String _tolerance;
    private Vector _precedence;
    private OPENBEXI_timeline_resource _ressource;
    private status _status;

    //CSS
    private String _textColor;
    private String _tapeImage;
    private String _tapeRepeat;
    private String _caption;
    private String _link;
    private String _icon;
    private String _image;
    private String _color;
    private String _text;

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String get_start() {
        return _start;
    }

    public long get_startL() {
        return _startL;
    }

    public void set_startL(long _startL) {
        this._startL = _startL;
    }

    public void set_start(String _start) {
        this._start = _start;
    }

    public String get_end() {
        return _end;
    }

    public void set_end(String _end) {
        this._end = _end;
    }

    public long get_endL() {
        return _endL;
    }

    public void set_endL(long _endL) {
        this._endL = _endL;
    }

    public String get_title() {
        return _title;
    }

    public void set_title(String _title) {
        this._title = _title;
    }

    public String get_latestStart() {
        return _latestStart;
    }

    public void set_latestStart(String _latestStart) {
        this._latestStart = _latestStart;
    }

    public String get_earliestEnd() {
        return _earliestEnd;
    }

    public void set_earliestEnd(String _earliestEnd) {
        this._earliestEnd = _earliestEnd;
    }

    public String get_priority() {
        return _priority;
    }

    public void set_priority(String _priority) {
        this._priority = _priority;
    }

    public String get_tolerance() {
        return _tolerance;
    }

    public void set_tolerance(String _tolerance) {
        this._tolerance = _tolerance;
    }

    public Vector get_precedence() {
        return _precedence;
    }

    public void set_precedence(Vector _precedence) {
        this._precedence = _precedence;
    }

    public status get_status() {
        return _status;
    }

    public void set_status(status _status) {
        this._status = _status;
    }

    public OPENBEXI_timeline_resource get_ressource() {
        return _ressource;
    }

    public void set_ressource(OPENBEXI_timeline_resource _ressource) {
        this._ressource = _ressource;
    }

    public String get_textColor() {
        return _textColor;
    }

    public void set_textColor(String _textColor) {
        this._textColor = _textColor;
    }

    public String get_tapeImage() {
        return _tapeImage;
    }

    public void set_tapeImage(String _tapeImage) {
        this._tapeImage = _tapeImage;
    }

    public String get_tapeRepeat() {
        return _tapeRepeat;
    }

    public void set_tapeRepeat(String tapeRepeat) {
        this._tapeRepeat = tapeRepeat;
    }

    public String get_caption() {
        return _caption;
    }

    public void set_caption(String _caption) {
        this._caption = _caption;
    }

    public String get_link() {
        return _link;
    }

    public void set_link(String _link) {
        this._link = _link;
    }

    public String get_icon() {
        return _icon;
    }

    public void set_icon(String _icon) {
        this._icon = _icon;
    }

    public String get_image() {
        return _image;
    }

    public void set_image(String _image) {
        this._image = _image;
    }

    public String get_isDuration() {
        return _isDuration;
    }

    public void set_isDuration(String _isDuration) {
        this._isDuration = _isDuration;
    }

    public String get_color() {
        return _color;
    }

    public void set_color(String _color) {
        this._color = _color;
    }

    public String get_text() {
        return _text;
    }

    public void set_text(String _text) {
        this._text = _text;
    }


    public OPENBEXI_timeline_event() {
    }
}
