package OPENBEXI_Timeline;

/**
 * Generated from IDL alias "timelines".
 *
 * @author JacORB IDL compiler V 2.3.1, 27-May-2009
 * @version generated at Nov 25, 2012 5:27:08 PM
 */

public final class timelinesHolder
	implements org.omg.CORBA.portable.Streamable
{
	public OPENBEXI_Timeline.timeline[] value;

	public timelinesHolder ()
	{
	}
	public timelinesHolder (final OPENBEXI_Timeline.timeline[] initial)
	{
		value = initial;
	}
	public org.omg.CORBA.TypeCode _type ()
	{
		return timelinesHelper.type ();
	}
	public void _read (final org.omg.CORBA.portable.InputStream in)
	{
		value = timelinesHelper.read (in);
	}
	public void _write (final org.omg.CORBA.portable.OutputStream out)
	{
		timelinesHelper.write (out,value);
	}
}
