package OPENBEXI_Timeline;
/**
 * Generated from IDL enum "status".
 *
 * @author JacORB IDL compiler V 2.3.1, 27-May-2009
 * @version generated at Feb 20, 2012 4:48:21 PM
 */

public final class statusHelper
{
	private static org.omg.CORBA.TypeCode _type = null;
	public static org.omg.CORBA.TypeCode type ()
	{
		if (_type == null)
		{
			_type = org.omg.CORBA.ORB.init().create_enum_tc(OPENBEXI_Timeline.statusHelper.id(),"status",new String[]{"scheduled","aborted","running","finished","paused","deleted","asking"});
		}
		return _type;
	}

	public static void insert (final org.omg.CORBA.Any any, final OPENBEXI_Timeline.status s)
	{
		any.type(type());
		write( any.create_output_stream(),s);
	}

	public static OPENBEXI_Timeline.status extract (final org.omg.CORBA.Any any)
	{
		return read(any.create_input_stream());
	}

	public static String id()
	{
		return "IDL:OPENBEXI_Timeline/status:1.0";
	}
	public static status read (final org.omg.CORBA.portable.InputStream in)
	{
		return status.from_int(in.read_long());
	}

	public static void write (final org.omg.CORBA.portable.OutputStream out, final status s)
	{
		out.write_long(s.value());
	}
}
