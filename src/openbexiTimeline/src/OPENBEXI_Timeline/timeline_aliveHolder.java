package OPENBEXI_Timeline;
/**
 * Generated from IDL enum "timeline_alive".
 *
 * @author JacORB IDL compiler V 2.3.1, 27-May-2009
 * @version generated at Nov 25, 2012 5:27:08 PM
 */

public final class timeline_aliveHolder
	implements org.omg.CORBA.portable.Streamable
{
	public timeline_alive value;

	public timeline_aliveHolder ()
	{
	}
	public timeline_aliveHolder (final timeline_alive initial)
	{
		value = initial;
	}
	public org.omg.CORBA.TypeCode _type ()
	{
		return timeline_aliveHelper.type ();
	}
	public void _read (final org.omg.CORBA.portable.InputStream in)
	{
		value = timeline_aliveHelper.read (in);
	}
	public void _write (final org.omg.CORBA.portable.OutputStream out)
	{
		timeline_aliveHelper.write (out,value);
	}
}
