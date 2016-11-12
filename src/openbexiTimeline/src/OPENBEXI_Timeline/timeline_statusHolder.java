package OPENBEXI_Timeline;
/**
 * Generated from IDL enum "timeline_status".
 *
 * @author JacORB IDL compiler V 2.3.1, 27-May-2009
 * @version generated at Nov 25, 2012 5:27:08 PM
 */

public final class timeline_statusHolder
	implements org.omg.CORBA.portable.Streamable
{
	public timeline_status value;

	public timeline_statusHolder ()
	{
	}
	public timeline_statusHolder (final timeline_status initial)
	{
		value = initial;
	}
	public org.omg.CORBA.TypeCode _type ()
	{
		return timeline_statusHelper.type ();
	}
	public void _read (final org.omg.CORBA.portable.InputStream in)
	{
		value = timeline_statusHelper.read (in);
	}
	public void _write (final org.omg.CORBA.portable.OutputStream out)
	{
		timeline_statusHelper.write (out,value);
	}
}
