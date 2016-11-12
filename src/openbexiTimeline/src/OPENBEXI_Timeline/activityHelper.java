package OPENBEXI_Timeline;


/**
 * Generated from IDL struct "activity".
 *
 * @author JacORB IDL compiler V 2.3.1, 27-May-2009
 * @version generated at Nov 25, 2012 5:27:08 PM
 */

public final class activityHelper
{
	private static org.omg.CORBA.TypeCode _type = null;
	public static org.omg.CORBA.TypeCode type ()
	{
		if (_type == null)
		{
			_type = org.omg.CORBA.ORB.init().create_struct_tc(OPENBEXI_Timeline.activityHelper.id(),"activity",new org.omg.CORBA.StructMember[]{new org.omg.CORBA.StructMember("id", org.omg.CORBA.ORB.init().create_string_tc(0), null),new org.omg.CORBA.StructMember("name", org.omg.CORBA.ORB.init().create_string_tc(0), null),new org.omg.CORBA.StructMember("type", org.omg.CORBA.ORB.init().create_string_tc(0), null),new org.omg.CORBA.StructMember("status", OPENBEXI_Timeline.activity_statusHelper.type(), null)});
		}
		return _type;
	}

	public static void insert (final org.omg.CORBA.Any any, final OPENBEXI_Timeline.activity s)
	{
		any.type(type());
		write( any.create_output_stream(),s);
	}

	public static OPENBEXI_Timeline.activity extract (final org.omg.CORBA.Any any)
	{
		return read(any.create_input_stream());
	}

	public static String id()
	{
		return "IDL:OPENBEXI_Timeline/activity:1.0";
	}
	public static OPENBEXI_Timeline.activity read (final org.omg.CORBA.portable.InputStream in)
	{
		OPENBEXI_Timeline.activity result = new OPENBEXI_Timeline.activity();
		result.id=in.read_string();
		result.name=in.read_string();
		result.type=in.read_string();
		result.status=OPENBEXI_Timeline.activity_statusHelper.read(in);
		return result;
	}
	public static void write (final org.omg.CORBA.portable.OutputStream out, final OPENBEXI_Timeline.activity s)
	{
		out.write_string(s.id);
		out.write_string(s.name);
		out.write_string(s.type);
		OPENBEXI_Timeline.activity_statusHelper.write(out,s.status);
	}
}
