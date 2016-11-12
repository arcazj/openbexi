package OPENBEXI_Timeline;


/**
 * Generated from IDL struct "driver".
 *
 * @author JacORB IDL compiler V 2.3.1, 27-May-2009
 * @version generated at Nov 25, 2012 5:27:08 PM
 */

public final class driverHelper
{
	private static org.omg.CORBA.TypeCode _type = null;
	public static org.omg.CORBA.TypeCode type ()
	{
		if (_type == null)
		{
			_type = org.omg.CORBA.ORB.init().create_struct_tc(OPENBEXI_Timeline.driverHelper.id(),"driver",new org.omg.CORBA.StructMember[]{new org.omg.CORBA.StructMember("id", org.omg.CORBA.ORB.init().create_string_tc(0), null),new org.omg.CORBA.StructMember("name", org.omg.CORBA.ORB.init().create_string_tc(0), null),new org.omg.CORBA.StructMember("type", org.omg.CORBA.ORB.init().create_string_tc(0), null),new org.omg.CORBA.StructMember("function_name", org.omg.CORBA.ORB.init().create_string_tc(0), null)});
		}
		return _type;
	}

	public static void insert (final org.omg.CORBA.Any any, final OPENBEXI_Timeline.driver s)
	{
		any.type(type());
		write( any.create_output_stream(),s);
	}

	public static OPENBEXI_Timeline.driver extract (final org.omg.CORBA.Any any)
	{
		return read(any.create_input_stream());
	}

	public static String id()
	{
		return "IDL:OPENBEXI_Timeline/driver:1.0";
	}
	public static OPENBEXI_Timeline.driver read (final org.omg.CORBA.portable.InputStream in)
	{
		OPENBEXI_Timeline.driver result = new OPENBEXI_Timeline.driver();
		result.id=in.read_string();
		result.name=in.read_string();
		result.type=in.read_string();
		result.function_name=in.read_string();
		return result;
	}
	public static void write (final org.omg.CORBA.portable.OutputStream out, final OPENBEXI_Timeline.driver s)
	{
		out.write_string(s.id);
		out.write_string(s.name);
		out.write_string(s.type);
		out.write_string(s.function_name);
	}
}
