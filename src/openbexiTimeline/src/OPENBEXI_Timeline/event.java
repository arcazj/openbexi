package OPENBEXI_Timeline;

/**
 * Generated from IDL struct "event".
 *
 * @author JacORB IDL compiler V 2.3.1, 27-May-2009
 * @version generated at Feb 20, 2012 5:12:27 PM
 */

public final class event
	implements org.omg.CORBA.portable.IDLEntity
{
	public event(){}
	public java.lang.String id = "";
	public java.lang.String title = "";
	public java.lang.String start = "";
	public int startL;
	public java.lang.String end = "";
	public int endL;
	public java.lang.String isDuration = "";
	public java.lang.String latestStart = "";
	public java.lang.String earliestEnd = "";
	public OPENBEXI_Timeline.event_status status;
	public OPENBEXI_Timeline.css properties;
	public event(java.lang.String id, java.lang.String title, java.lang.String start, int startL, java.lang.String end, int endL, java.lang.String isDuration, java.lang.String latestStart, java.lang.String earliestEnd, OPENBEXI_Timeline.event_status status, OPENBEXI_Timeline.css properties)
	{
		this.id = id;
		this.title = title;
		this.start = start;
		this.startL = startL;
		this.end = end;
		this.endL = endL;
		this.isDuration = isDuration;
		this.latestStart = latestStart;
		this.earliestEnd = earliestEnd;
		this.status = status;
		this.properties = properties;
	}
}
