package OPENBEXI_Timeline;

/**
 * Generated from IDL struct "resource".
 *
 * @author JacORB IDL compiler V 2.3.1, 27-May-2009
 * @version generated at Nov 25, 2012 5:27:08 PM
 */

public final class resource
	implements org.omg.CORBA.portable.IDLEntity
{
	public resource(){}
	public java.lang.String id = "";
	public java.lang.String name = "";
	public boolean shared;
	public java.lang.String driver = "";
	public resource(java.lang.String id, java.lang.String name, boolean shared, java.lang.String driver)
	{
		this.id = id;
		this.name = name;
		this.shared = shared;
		this.driver = driver;
	}
}
