package OPENBEXI_Timeline;

/**
 * Generated from IDL struct "driver".
 *
 * @author JacORB IDL compiler V 2.3.1, 27-May-2009
 * @version generated at Nov 25, 2012 5:27:08 PM
 */

public final class driverHolder
	implements org.omg.CORBA.portable.Streamable
{
	public OPENBEXI_Timeline.driver value;

	public driverHolder ()
	{
	}
	public driverHolder(final OPENBEXI_Timeline.driver initial)
	{
		value = initial;
	}
	public org.omg.CORBA.TypeCode _type ()
	{
		return OPENBEXI_Timeline.driverHelper.type ();
	}
	public void _read(final org.omg.CORBA.portable.InputStream _in)
	{
		value = OPENBEXI_Timeline.driverHelper.read(_in);
	}
	public void _write(final org.omg.CORBA.portable.OutputStream _out)
	{
		OPENBEXI_Timeline.driverHelper.write(_out, value);
	}
}
