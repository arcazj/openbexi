package OPENBEXI_Timeline;

/**
 * Generated from IDL struct "resource".
 *
 * @author JacORB IDL compiler V 2.3.1, 27-May-2009
 * @version generated at Nov 25, 2012 5:27:08 PM
 */

public final class resourceHolder
	implements org.omg.CORBA.portable.Streamable
{
	public OPENBEXI_Timeline.resource value;

	public resourceHolder ()
	{
	}
	public resourceHolder(final OPENBEXI_Timeline.resource initial)
	{
		value = initial;
	}
	public org.omg.CORBA.TypeCode _type ()
	{
		return OPENBEXI_Timeline.resourceHelper.type ();
	}
	public void _read(final org.omg.CORBA.portable.InputStream _in)
	{
		value = OPENBEXI_Timeline.resourceHelper.read(_in);
	}
	public void _write(final org.omg.CORBA.portable.OutputStream _out)
	{
		OPENBEXI_Timeline.resourceHelper.write(_out, value);
	}
}
