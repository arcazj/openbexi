package OPENBEXI_Timeline;
/**
 * Generated from IDL enum "type_session".
 *
 * @author JacORB IDL compiler V 2.3.1, 27-May-2009
 * @version generated at Nov 25, 2012 5:27:08 PM
 */

public final class type_sessionHelper
{
	private static org.omg.CORBA.TypeCode _type = null;
	public static org.omg.CORBA.TypeCode type ()
	{
		if (_type == null)
		{
			_type = org.omg.CORBA.ORB.init().create_enum_tc(OPENBEXI_Timeline.type_sessionHelper.id(),"type_session",new String[]{"T_EVENT","T_SESSION"});
		}
		return _type;
	}

	public static void insert (final org.omg.CORBA.Any any, final OPENBEXI_Timeline.type_session s)
	{
		any.type(type());
		write( any.create_output_stream(),s);
	}

	public static OPENBEXI_Timeline.type_session extract (final org.omg.CORBA.Any any)
	{
		return read(any.create_input_stream());
	}

	public static String id()
	{
		return "IDL:OPENBEXI_Timeline/type_session:1.0";
	}
	public static type_session read (final org.omg.CORBA.portable.InputStream in)
	{
		return type_session.from_int(in.read_long());
	}

	public static void write (final org.omg.CORBA.portable.OutputStream out, final type_session s)
	{
		out.write_long(s.value());
	}
}
