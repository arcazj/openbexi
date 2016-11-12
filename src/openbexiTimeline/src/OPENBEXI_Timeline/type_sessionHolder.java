package OPENBEXI_Timeline;
/**
 * Generated from IDL enum "type_session".
 *
 * @author JacORB IDL compiler V 2.3.1, 27-May-2009
 * @version generated at Nov 25, 2012 5:27:08 PM
 */

public final class type_sessionHolder
	implements org.omg.CORBA.portable.Streamable
{
	public type_session value;

	public type_sessionHolder ()
	{
	}
	public type_sessionHolder (final type_session initial)
	{
		value = initial;
	}
	public org.omg.CORBA.TypeCode _type ()
	{
		return type_sessionHelper.type ();
	}
	public void _read (final org.omg.CORBA.portable.InputStream in)
	{
		value = type_sessionHelper.read (in);
	}
	public void _write (final org.omg.CORBA.portable.OutputStream out)
	{
		type_sessionHelper.write (out,value);
	}
}
