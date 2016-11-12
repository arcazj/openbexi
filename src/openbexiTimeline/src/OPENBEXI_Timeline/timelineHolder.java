package OPENBEXI_Timeline;

/**
 * Generated from IDL struct "timeline".
 *
 * @author JacORB IDL compiler V 2.3.1, 27-May-2009
 * @version generated at Nov 25, 2012 5:27:08 PM
 */

public final class timelineHolder
	implements org.omg.CORBA.portable.Streamable
{
	public OPENBEXI_Timeline.timeline value;

	public timelineHolder ()
	{
	}
	public timelineHolder(final OPENBEXI_Timeline.timeline initial)
	{
		value = initial;
	}
	public org.omg.CORBA.TypeCode _type ()
	{
		return OPENBEXI_Timeline.timelineHelper.type ();
	}
	public void _read(final org.omg.CORBA.portable.InputStream _in)
	{
		value = OPENBEXI_Timeline.timelineHelper.read(_in);
	}
	public void _write(final org.omg.CORBA.portable.OutputStream _out)
	{
		OPENBEXI_Timeline.timelineHelper.write(_out, value);
	}
}
