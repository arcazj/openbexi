package OPENBEXI_Timeline;

/**
 * Generated from IDL interface "OPENBEXI_timeline_orb".
 *
 * @author JacORB IDL compiler V 2.3.1, 27-May-2009
 * @version generated at Nov 25, 2012 5:27:08 PM
 */

public final class OPENBEXI_timeline_orbHolder	implements org.omg.CORBA.portable.Streamable{
	 public OPENBEXI_timeline_orb value;
	public OPENBEXI_timeline_orbHolder()
	{
	}
	public OPENBEXI_timeline_orbHolder (final OPENBEXI_timeline_orb initial)
	{
		value = initial;
	}
	public org.omg.CORBA.TypeCode _type()
	{
		return OPENBEXI_timeline_orbHelper.type();
	}
	public void _read (final org.omg.CORBA.portable.InputStream in)
	{
		value = OPENBEXI_timeline_orbHelper.read (in);
	}
	public void _write (final org.omg.CORBA.portable.OutputStream _out)
	{
		OPENBEXI_timeline_orbHelper.write (_out,value);
	}
}
