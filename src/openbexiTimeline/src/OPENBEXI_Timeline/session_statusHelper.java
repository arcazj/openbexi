package OPENBEXI_Timeline;
/**
 * Generated from IDL enum "session_status".
 *
 * @author JacORB IDL compiler V 2.3.1, 27-May-2009
 * @version generated at Nov 25, 2012 5:27:08 PM
 */

public final class session_statusHelper
{
	private static org.omg.CORBA.TypeCode _type = null;
	public static org.omg.CORBA.TypeCode type ()
	{
		if (_type == null)
		{
			_type = org.omg.CORBA.ORB.init().create_enum_tc(OPENBEXI_Timeline.session_statusHelper.id(),"session_status",new String[]{"S_ABORTED","S_RUNNING","S_FINISHED","S_DELETED","S_NOT_AUTHORIZED","S_NEED_ACKNOWLEDGEMENT","S_ACKNOWLEDGED"});
		}
		return _type;
	}

	public static void insert (final org.omg.CORBA.Any any, final OPENBEXI_Timeline.session_status s)
	{
		any.type(type());
		write( any.create_output_stream(),s);
	}

	public static OPENBEXI_Timeline.session_status extract (final org.omg.CORBA.Any any)
	{
		return read(any.create_input_stream());
	}

	public static String id()
	{
		return "IDL:OPENBEXI_Timeline/session_status:1.0";
	}
	public static session_status read (final org.omg.CORBA.portable.InputStream in)
	{
		return session_status.from_int(in.read_long());
	}

	public static void write (final org.omg.CORBA.portable.OutputStream out, final session_status s)
	{
		out.write_long(s.value());
	}
}
