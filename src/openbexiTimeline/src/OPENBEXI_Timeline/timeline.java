package OPENBEXI_Timeline;

/**
 * Generated from IDL struct "timeline".
 *
 * @author JacORB IDL compiler V 2.3.1, 27-May-2009
 * @version generated at Nov 25, 2012 5:27:08 PM
 */

public final class timeline
	implements org.omg.CORBA.portable.IDLEntity
{
	public timeline(){}
	public java.lang.String id = "";
	public java.lang.String name = "";
	public java.lang.String status = "";
	public java.lang.String host = "";
	public java.lang.String port = "";
	public OPENBEXI_Timeline.session[] sessions;
	public OPENBEXI_Timeline.resource[] resources;
	public OPENBEXI_Timeline.css properties;
	public timeline(java.lang.String id, java.lang.String name, java.lang.String status, java.lang.String host, java.lang.String port, OPENBEXI_Timeline.session[] sessions, OPENBEXI_Timeline.resource[] resources, OPENBEXI_Timeline.css properties)
	{
		this.id = id;
		this.name = name;
		this.status = status;
		this.host = host;
		this.port = port;
		this.sessions = sessions;
		this.resources = resources;
		this.properties = properties;
	}
}
