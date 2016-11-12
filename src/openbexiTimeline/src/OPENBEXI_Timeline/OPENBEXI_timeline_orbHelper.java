package OPENBEXI_Timeline;


/**
 * Generated from IDL interface "OPENBEXI_timeline_orb".
 *
 * @author JacORB IDL compiler V 2.3.1, 27-May-2009
 * @version generated at Nov 25, 2012 5:27:08 PM
 */

public final class OPENBEXI_timeline_orbHelper
{
	public static void insert (final org.omg.CORBA.Any any, final OPENBEXI_Timeline.OPENBEXI_timeline_orb s)
	{
			any.insert_Object(s);
	}
	public static OPENBEXI_Timeline.OPENBEXI_timeline_orb extract(final org.omg.CORBA.Any any)
	{
		return narrow(any.extract_Object()) ;
	}
	public static org.omg.CORBA.TypeCode type()
	{
		return org.omg.CORBA.ORB.init().create_interface_tc("IDL:OPENBEXI_Timeline/OPENBEXI_timeline_orb:1.0", "OPENBEXI_timeline_orb");
	}
	public static String id()
	{
		return "IDL:OPENBEXI_Timeline/OPENBEXI_timeline_orb:1.0";
	}
	public static OPENBEXI_timeline_orb read(final org.omg.CORBA.portable.InputStream in)
	{
		return narrow(in.read_Object(OPENBEXI_Timeline._OPENBEXI_timeline_orbStub.class));
	}
	public static void write(final org.omg.CORBA.portable.OutputStream _out, final OPENBEXI_Timeline.OPENBEXI_timeline_orb s)
	{
		_out.write_Object(s);
	}
	public static OPENBEXI_Timeline.OPENBEXI_timeline_orb narrow(final org.omg.CORBA.Object obj)
	{
		if (obj == null)
		{
			return null;
		}
		else if (obj instanceof OPENBEXI_Timeline.OPENBEXI_timeline_orb)
		{
			return (OPENBEXI_Timeline.OPENBEXI_timeline_orb)obj;
		}
		else if (obj._is_a("IDL:OPENBEXI_Timeline/OPENBEXI_timeline_orb:1.0"))
		{
			OPENBEXI_Timeline._OPENBEXI_timeline_orbStub stub;
			stub = new OPENBEXI_Timeline._OPENBEXI_timeline_orbStub();
			stub._set_delegate(((org.omg.CORBA.portable.ObjectImpl)obj)._get_delegate());
			return stub;
		}
		else
		{
			throw new org.omg.CORBA.BAD_PARAM("Narrow failed");
		}
	}
	public static OPENBEXI_Timeline.OPENBEXI_timeline_orb unchecked_narrow(final org.omg.CORBA.Object obj)
	{
		if (obj == null)
		{
			return null;
		}
		else if (obj instanceof OPENBEXI_Timeline.OPENBEXI_timeline_orb)
		{
			return (OPENBEXI_Timeline.OPENBEXI_timeline_orb)obj;
		}
		else
		{
			OPENBEXI_Timeline._OPENBEXI_timeline_orbStub stub;
			stub = new OPENBEXI_Timeline._OPENBEXI_timeline_orbStub();
			stub._set_delegate(((org.omg.CORBA.portable.ObjectImpl)obj)._get_delegate());
			return stub;
		}
	}
}
