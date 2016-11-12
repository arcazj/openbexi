package OPENBEXI_Timeline;
/**
 * Generated from IDL enum "activity_status".
 *
 * @author JacORB IDL compiler V 2.3.1, 27-May-2009
 * @version generated at Nov 25, 2012 5:27:08 PM
 */

public final class activity_statusHolder
	implements org.omg.CORBA.portable.Streamable
{
	public activity_status value;

	public activity_statusHolder ()
	{
	}
	public activity_statusHolder (final activity_status initial)
	{
		value = initial;
	}
	public org.omg.CORBA.TypeCode _type ()
	{
		return activity_statusHelper.type ();
	}
	public void _read (final org.omg.CORBA.portable.InputStream in)
	{
		value = activity_statusHelper.read (in);
	}
	public void _write (final org.omg.CORBA.portable.OutputStream out)
	{
		activity_statusHelper.write (out,value);
	}
}
