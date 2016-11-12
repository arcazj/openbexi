package OPENBEXI_Timeline;
/**
 * Generated from IDL enum "event_status".
 *
 * @author JacORB IDL compiler V 2.3.1, 27-May-2009
 * @version generated at Nov 25, 2012 5:27:08 PM
 */

public final class event_statusHolder
	implements org.omg.CORBA.portable.Streamable
{
	public event_status value;

	public event_statusHolder ()
	{
	}
	public event_statusHolder (final event_status initial)
	{
		value = initial;
	}
	public org.omg.CORBA.TypeCode _type ()
	{
		return event_statusHelper.type ();
	}
	public void _read (final org.omg.CORBA.portable.InputStream in)
	{
		value = event_statusHelper.read (in);
	}
	public void _write (final org.omg.CORBA.portable.OutputStream out)
	{
		event_statusHelper.write (out,value);
	}
}
