package OPENBEXI_Timeline;

/**
 * Generated from IDL struct "event".
 *
 * @author JacORB IDL compiler V 2.3.1, 27-May-2009
 * @version generated at Feb 20, 2012 5:12:27 PM
 */

public final class eventHolder
	implements org.omg.CORBA.portable.Streamable
{
	public OPENBEXI_Timeline.event value;

	public eventHolder ()
	{
	}
	public eventHolder(final OPENBEXI_Timeline.event initial)
	{
		value = initial;
	}
	public org.omg.CORBA.TypeCode _type ()
	{
		return OPENBEXI_Timeline.eventHelper.type ();
	}
	public void _read(final org.omg.CORBA.portable.InputStream _in)
	{
		value = OPENBEXI_Timeline.eventHelper.read(_in);
	}
	public void _write(final org.omg.CORBA.portable.OutputStream _out)
	{
		OPENBEXI_Timeline.eventHelper.write(_out, value);
	}
}
