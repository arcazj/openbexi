package OPENBEXI_Timeline;

/**
 * Generated from IDL alias "resources".
 *
 * @author JacORB IDL compiler V 2.3.1, 27-May-2009
 * @version generated at Nov 25, 2012 5:27:08 PM
 */

public final class resourcesHolder
	implements org.omg.CORBA.portable.Streamable
{
	public OPENBEXI_Timeline.resource[] value;

	public resourcesHolder ()
	{
	}
	public resourcesHolder (final OPENBEXI_Timeline.resource[] initial)
	{
		value = initial;
	}
	public org.omg.CORBA.TypeCode _type ()
	{
		return resourcesHelper.type ();
	}
	public void _read (final org.omg.CORBA.portable.InputStream in)
	{
		value = resourcesHelper.read (in);
	}
	public void _write (final org.omg.CORBA.portable.OutputStream out)
	{
		resourcesHelper.write (out,value);
	}
}
