package OPENBEXI_Timeline;

/**
 * Generated from IDL struct "activity".
 *
 * @author JacORB IDL compiler V 2.3.1, 27-May-2009
 * @version generated at Nov 25, 2012 5:27:08 PM
 */

public final class activity
	implements org.omg.CORBA.portable.IDLEntity
{
	public activity(){}
	public java.lang.String id = "";
	public java.lang.String name = "";
	public java.lang.String type = "";
	public OPENBEXI_Timeline.activity_status status;
	public activity(java.lang.String id, java.lang.String name, java.lang.String type, OPENBEXI_Timeline.activity_status status)
	{
		this.id = id;
		this.name = name;
		this.type = type;
		this.status = status;
	}
}
