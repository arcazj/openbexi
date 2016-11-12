package OPENBEXI_Timeline;
/**
 * Generated from IDL enum "timeline_status".
 *
 * @author JacORB IDL compiler V 2.3.1, 27-May-2009
 * @version generated at Nov 25, 2012 5:27:08 PM
 */

public final class timeline_statusHelper
{
	private static org.omg.CORBA.TypeCode _type = null;
	public static org.omg.CORBA.TypeCode type ()
	{
		if (_type == null)
		{
			_type = org.omg.CORBA.ORB.init().create_enum_tc(OPENBEXI_Timeline.timeline_statusHelper.id(),"timeline_status",new String[]{"T_OK","T_NOK"});
		}
		return _type;
	}

	public static void insert (final org.omg.CORBA.Any any, final OPENBEXI_Timeline.timeline_status s)
	{
		any.type(type());
		write( any.create_output_stream(),s);
	}

	public static OPENBEXI_Timeline.timeline_status extract (final org.omg.CORBA.Any any)
	{
		return read(any.create_input_stream());
	}

	public static String id()
	{
		return "IDL:OPENBEXI_Timeline/timeline_status:1.0";
	}
	public static timeline_status read (final org.omg.CORBA.portable.InputStream in)
	{
		return timeline_status.from_int(in.read_long());
	}

	public static void write (final org.omg.CORBA.portable.OutputStream out, final timeline_status s)
	{
		out.write_long(s.value());
	}
}
