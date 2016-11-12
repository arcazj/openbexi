package OPENBEXI_Timeline;


/**
 * Generated from IDL struct "resource".
 *
 * @author JacORB IDL compiler V 2.3.1, 27-May-2009
 * @version generated at Nov 25, 2012 5:27:08 PM
 */

public final class resourceHelper
{
	private static org.omg.CORBA.TypeCode _type = null;
	public static org.omg.CORBA.TypeCode type ()
	{
		if (_type == null)
		{
			_type = org.omg.CORBA.ORB.init().create_struct_tc(OPENBEXI_Timeline.resourceHelper.id(),"resource",new org.omg.CORBA.StructMember[]{new org.omg.CORBA.StructMember("id", org.omg.CORBA.ORB.init().create_string_tc(0), null),new org.omg.CORBA.StructMember("name", org.omg.CORBA.ORB.init().create_string_tc(0), null),new org.omg.CORBA.StructMember("shared", org.omg.CORBA.ORB.init().get_primitive_tc(org.omg.CORBA.TCKind.from_int(8)), null),new org.omg.CORBA.StructMember("driver", org.omg.CORBA.ORB.init().create_string_tc(0), null)});
		}
		return _type;
	}

	public static void insert (final org.omg.CORBA.Any any, final OPENBEXI_Timeline.resource s)
	{
		any.type(type());
		write( any.create_output_stream(),s);
	}

	public static OPENBEXI_Timeline.resource extract (final org.omg.CORBA.Any any)
	{
		return read(any.create_input_stream());
	}

	public static String id()
	{
		return "IDL:OPENBEXI_Timeline/resource:1.0";
	}
	public static OPENBEXI_Timeline.resource read (final org.omg.CORBA.portable.InputStream in)
	{
		OPENBEXI_Timeline.resource result = new OPENBEXI_Timeline.resource();
		result.id=in.read_string();
		result.name=in.read_string();
		result.shared=in.read_boolean();
		result.driver=in.read_string();
		return result;
	}
	public static void write (final org.omg.CORBA.portable.OutputStream out, final OPENBEXI_Timeline.resource s)
	{
		out.write_string(s.id);
		out.write_string(s.name);
		out.write_boolean(s.shared);
		out.write_string(s.driver);
	}
}
