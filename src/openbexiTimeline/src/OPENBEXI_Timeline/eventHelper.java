package OPENBEXI_Timeline;


/**
 * Generated from IDL struct "event".
 *
 * @author JacORB IDL compiler V 2.3.1, 27-May-2009
 * @version generated at Feb 20, 2012 5:12:27 PM
 */

public final class eventHelper
{
	private static org.omg.CORBA.TypeCode _type = null;
	public static org.omg.CORBA.TypeCode type ()
	{
		if (_type == null)
		{
			_type = org.omg.CORBA.ORB.init().create_struct_tc(OPENBEXI_Timeline.eventHelper.id(),"event",new org.omg.CORBA.StructMember[]{new org.omg.CORBA.StructMember("id", org.omg.CORBA.ORB.init().create_string_tc(0), null),new org.omg.CORBA.StructMember("title", org.omg.CORBA.ORB.init().create_string_tc(0), null),new org.omg.CORBA.StructMember("start", org.omg.CORBA.ORB.init().create_string_tc(0), null),new org.omg.CORBA.StructMember("startL", org.omg.CORBA.ORB.init().get_primitive_tc(org.omg.CORBA.TCKind.from_int(3)), null),new org.omg.CORBA.StructMember("end", org.omg.CORBA.ORB.init().create_string_tc(0), null),new org.omg.CORBA.StructMember("endL", org.omg.CORBA.ORB.init().get_primitive_tc(org.omg.CORBA.TCKind.from_int(3)), null),new org.omg.CORBA.StructMember("isDuration", org.omg.CORBA.ORB.init().create_string_tc(0), null),new org.omg.CORBA.StructMember("latestStart", org.omg.CORBA.ORB.init().create_string_tc(0), null),new org.omg.CORBA.StructMember("earliestEnd", org.omg.CORBA.ORB.init().create_string_tc(0), null),new org.omg.CORBA.StructMember("status", OPENBEXI_Timeline.event_statusHelper.type(), null),new org.omg.CORBA.StructMember("properties", OPENBEXI_Timeline.cssHelper.type(), null)});
		}
		return _type;
	}

	public static void insert (final org.omg.CORBA.Any any, final OPENBEXI_Timeline.event s)
	{
		any.type(type());
		write( any.create_output_stream(),s);
	}

	public static OPENBEXI_Timeline.event extract (final org.omg.CORBA.Any any)
	{
		return read(any.create_input_stream());
	}

	public static String id()
	{
		return "IDL:OPENBEXI_Timeline/event:1.0";
	}
	public static OPENBEXI_Timeline.event read (final org.omg.CORBA.portable.InputStream in)
	{
		OPENBEXI_Timeline.event result = new OPENBEXI_Timeline.event();
		result.id=in.read_string();
		result.title=in.read_string();
		result.start=in.read_string();
		result.startL=in.read_long();
		result.end=in.read_string();
		result.endL=in.read_long();
		result.isDuration=in.read_string();
		result.latestStart=in.read_string();
		result.earliestEnd=in.read_string();
		result.status=OPENBEXI_Timeline.event_statusHelper.read(in);
		result.properties=OPENBEXI_Timeline.cssHelper.read(in);
		return result;
	}
	public static void write (final org.omg.CORBA.portable.OutputStream out, final OPENBEXI_Timeline.event s)
	{
		out.write_string(s.id);
		out.write_string(s.title);
		out.write_string(s.start);
		out.write_long(s.startL);
		out.write_string(s.end);
		out.write_long(s.endL);
		out.write_string(s.isDuration);
		out.write_string(s.latestStart);
		out.write_string(s.earliestEnd);
		OPENBEXI_Timeline.event_statusHelper.write(out,s.status);
		OPENBEXI_Timeline.cssHelper.write(out,s.properties);
	}
}
