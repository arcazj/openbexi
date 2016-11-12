package OPENBEXI_Timeline;

/**
 * Generated from IDL struct "session".
 *
 * @author JacORB IDL compiler V 2.3.1, 27-May-2009
 * @version generated at Nov 25, 2012 5:27:08 PM
 */

public final class session
	implements org.omg.CORBA.portable.IDLEntity
{
	public session(){}
	public java.lang.String id = "";
	public java.lang.String name = "";
	public OPENBEXI_Timeline.type_session type;
	public java.lang.String subtype = "";
	public java.lang.String title = "";
	public java.lang.String start = "";
	public int startL;
	public java.lang.String end = "";
	public int endL;
	public java.lang.String isDuration = "";
	public java.lang.String latestStart = "";
	public java.lang.String earliestEnd = "";
	public java.lang.String priority = "";
	public java.lang.String tolerance = "";
	public OPENBEXI_Timeline.session_status status;
	public java.lang.String[] precedences;
	public OPENBEXI_Timeline.resource[] resources;
	public OPENBEXI_Timeline.activity[] activities;
	public OPENBEXI_Timeline.css properties;
	public session(java.lang.String id, java.lang.String name, OPENBEXI_Timeline.type_session type, java.lang.String subtype, java.lang.String title, java.lang.String start, int startL, java.lang.String end, int endL, java.lang.String isDuration, java.lang.String latestStart, java.lang.String earliestEnd, java.lang.String priority, java.lang.String tolerance, OPENBEXI_Timeline.session_status status, java.lang.String[] precedences, OPENBEXI_Timeline.resource[] resources, OPENBEXI_Timeline.activity[] activities, OPENBEXI_Timeline.css properties)
	{
		this.id = id;
		this.name = name;
		this.type = type;
		this.subtype = subtype;
		this.title = title;
		this.start = start;
		this.startL = startL;
		this.end = end;
		this.endL = endL;
		this.isDuration = isDuration;
		this.latestStart = latestStart;
		this.earliestEnd = earliestEnd;
		this.priority = priority;
		this.tolerance = tolerance;
		this.status = status;
		this.precedences = precedences;
		this.resources = resources;
		this.activities = activities;
		this.properties = properties;
	}
}
