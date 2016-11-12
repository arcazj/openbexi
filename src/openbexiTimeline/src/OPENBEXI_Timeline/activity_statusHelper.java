package OPENBEXI_Timeline;
/**
 * Generated from IDL enum "activity_status".
 *
 * @author JacORB IDL compiler V 2.3.1, 27-May-2009
 * @version generated at Nov 25, 2012 5:27:08 PM
 */

public final class activity_statusHelper
{
	private static org.omg.CORBA.TypeCode _type = null;
	public static org.omg.CORBA.TypeCode type ()
	{
		if (_type == null)
		{
			_type = org.omg.CORBA.ORB.init().create_enum_tc(OPENBEXI_Timeline.activity_statusHelper.id(),"activity_status",new String[]{"A_SCHEDULED","A_STARTING","A_ABORTED","A_RUNNING","A_FINISHED","A_PAUSED","A_DELETED","A_ASKING"});
		}
		return _type;
	}

	public static void insert (final org.omg.CORBA.Any any, final OPENBEXI_Timeline.activity_status s)
	{
		any.type(type());
		write( any.create_output_stream(),s);
	}

	public static OPENBEXI_Timeline.activity_status extract (final org.omg.CORBA.Any any)
	{
		return read(any.create_input_stream());
	}

	public static String id()
	{
		return "IDL:OPENBEXI_Timeline/activity_status:1.0";
	}
	public static activity_status read (final org.omg.CORBA.portable.InputStream in)
	{
		return activity_status.from_int(in.read_long());
	}

	public static void write (final org.omg.CORBA.portable.OutputStream out, final activity_status s)
	{
		out.write_long(s.value());
	}
}
