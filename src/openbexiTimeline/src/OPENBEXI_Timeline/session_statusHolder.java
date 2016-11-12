package OPENBEXI_Timeline;
/**
 * Generated from IDL enum "session_status".
 *
 * @author JacORB IDL compiler V 2.3.1, 27-May-2009
 * @version generated at Nov 25, 2012 5:27:08 PM
 */

public final class session_statusHolder
	implements org.omg.CORBA.portable.Streamable
{
	public session_status value;

	public session_statusHolder ()
	{
	}
	public session_statusHolder (final session_status initial)
	{
		value = initial;
	}
	public org.omg.CORBA.TypeCode _type ()
	{
		return session_statusHelper.type ();
	}
	public void _read (final org.omg.CORBA.portable.InputStream in)
	{
		value = session_statusHelper.read (in);
	}
	public void _write (final org.omg.CORBA.portable.OutputStream out)
	{
		session_statusHelper.write (out,value);
	}
}
