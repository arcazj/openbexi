package OPENBEXI_Timeline;

/**
 * Generated from IDL struct "activity".
 *
 * @author JacORB IDL compiler V 2.3.1, 27-May-2009
 * @version generated at Nov 25, 2012 5:27:08 PM
 */

public final class activityHolder
	implements org.omg.CORBA.portable.Streamable
{
	public OPENBEXI_Timeline.activity value;

	public activityHolder ()
	{
	}
	public activityHolder(final OPENBEXI_Timeline.activity initial)
	{
		value = initial;
	}
	public org.omg.CORBA.TypeCode _type ()
	{
		return OPENBEXI_Timeline.activityHelper.type ();
	}
	public void _read(final org.omg.CORBA.portable.InputStream _in)
	{
		value = OPENBEXI_Timeline.activityHelper.read(_in);
	}
	public void _write(final org.omg.CORBA.portable.OutputStream _out)
	{
		OPENBEXI_Timeline.activityHelper.write(_out, value);
	}
}
