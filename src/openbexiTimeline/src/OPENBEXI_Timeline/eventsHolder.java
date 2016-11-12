package OPENBEXI_Timeline;

/**
 * Generated from IDL alias "events".
 *
 * @author JacORB IDL compiler V 2.3.1, 27-May-2009
 * @version generated at Feb 20, 2012 5:12:27 PM
 */

public final class eventsHolder
	implements org.omg.CORBA.portable.Streamable
{
	public OPENBEXI_Timeline.event[] value;

	public eventsHolder ()
	{
	}
	public eventsHolder (final OPENBEXI_Timeline.event[] initial)
	{
		value = initial;
	}
	public org.omg.CORBA.TypeCode _type ()
	{
		return eventsHelper.type ();
	}
	public void _read (final org.omg.CORBA.portable.InputStream in)
	{
		value = eventsHelper.read (in);
	}
	public void _write (final org.omg.CORBA.portable.OutputStream out)
	{
		eventsHelper.write (out,value);
	}
}
