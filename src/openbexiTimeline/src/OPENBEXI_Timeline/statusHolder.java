package OPENBEXI_Timeline;
/**
 * Generated from IDL enum "status".
 *
 * @author JacORB IDL compiler V 2.3.1, 27-May-2009
 * @version generated at Feb 20, 2012 4:48:21 PM
 */

public final class statusHolder
	implements org.omg.CORBA.portable.Streamable
{
	public status value;

	public statusHolder ()
	{
	}
	public statusHolder (final status initial)
	{
		value = initial;
	}
	public org.omg.CORBA.TypeCode _type ()
	{
		return statusHelper.type ();
	}
	public void _read (final org.omg.CORBA.portable.InputStream in)
	{
		value = statusHelper.read (in);
	}
	public void _write (final org.omg.CORBA.portable.OutputStream out)
	{
		statusHelper.write (out,value);
	}
}
