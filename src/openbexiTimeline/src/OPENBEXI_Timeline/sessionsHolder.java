package OPENBEXI_Timeline;

/**
 * Generated from IDL alias "sessions".
 *
 * @author JacORB IDL compiler V 2.3.1, 27-May-2009
 * @version generated at Nov 25, 2012 5:27:08 PM
 */

public final class sessionsHolder
	implements org.omg.CORBA.portable.Streamable
{
	public OPENBEXI_Timeline.session[] value;

	public sessionsHolder ()
	{
	}
	public sessionsHolder (final OPENBEXI_Timeline.session[] initial)
	{
		value = initial;
	}
	public org.omg.CORBA.TypeCode _type ()
	{
		return sessionsHelper.type ();
	}
	public void _read (final org.omg.CORBA.portable.InputStream in)
	{
		value = sessionsHelper.read (in);
	}
	public void _write (final org.omg.CORBA.portable.OutputStream out)
	{
		sessionsHelper.write (out,value);
	}
}
