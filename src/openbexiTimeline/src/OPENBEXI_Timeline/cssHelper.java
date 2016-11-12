package OPENBEXI_Timeline;


/**
 * Generated from IDL struct "css".
 *
 * @author JacORB IDL compiler V 2.3.1, 27-May-2009
 * @version generated at Nov 25, 2012 5:27:08 PM
 */

public final class cssHelper
{
	private static org.omg.CORBA.TypeCode _type = null;
	public static org.omg.CORBA.TypeCode type ()
	{
		if (_type == null)
		{
			_type = org.omg.CORBA.ORB.init().create_struct_tc(OPENBEXI_Timeline.cssHelper.id(),"css",new org.omg.CORBA.StructMember[]{new org.omg.CORBA.StructMember("id", org.omg.CORBA.ORB.init().create_string_tc(0), null),new org.omg.CORBA.StructMember("name", org.omg.CORBA.ORB.init().create_string_tc(0), null),new org.omg.CORBA.StructMember("textColor", org.omg.CORBA.ORB.init().create_string_tc(0), null),new org.omg.CORBA.StructMember("tapeImage", org.omg.CORBA.ORB.init().create_string_tc(0), null),new org.omg.CORBA.StructMember("tapeRepeat", org.omg.CORBA.ORB.init().create_string_tc(0), null),new org.omg.CORBA.StructMember("caption", org.omg.CORBA.ORB.init().create_string_tc(0), null),new org.omg.CORBA.StructMember("link", org.omg.CORBA.ORB.init().create_string_tc(0), null),new org.omg.CORBA.StructMember("icon", org.omg.CORBA.ORB.init().create_string_tc(0), null),new org.omg.CORBA.StructMember("image", org.omg.CORBA.ORB.init().create_string_tc(0), null),new org.omg.CORBA.StructMember("color", org.omg.CORBA.ORB.init().create_string_tc(0), null),new org.omg.CORBA.StructMember("text", org.omg.CORBA.ORB.init().create_string_tc(0), null),new org.omg.CORBA.StructMember("css_file", org.omg.CORBA.ORB.init().create_string_tc(0), null)});
		}
		return _type;
	}

	public static void insert (final org.omg.CORBA.Any any, final OPENBEXI_Timeline.css s)
	{
		any.type(type());
		write( any.create_output_stream(),s);
	}

	public static OPENBEXI_Timeline.css extract (final org.omg.CORBA.Any any)
	{
		return read(any.create_input_stream());
	}

	public static String id()
	{
		return "IDL:OPENBEXI_Timeline/css:1.0";
	}
	public static OPENBEXI_Timeline.css read (final org.omg.CORBA.portable.InputStream in)
	{
		OPENBEXI_Timeline.css result = new OPENBEXI_Timeline.css();
		result.id=in.read_string();
		result.name=in.read_string();
		result.textColor=in.read_string();
		result.tapeImage=in.read_string();
		result.tapeRepeat=in.read_string();
		result.caption=in.read_string();
		result.link=in.read_string();
		result.icon=in.read_string();
		result.image=in.read_string();
		result.color=in.read_string();
		result.text=in.read_string();
		result.css_file=in.read_string();
		return result;
	}
	public static void write (final org.omg.CORBA.portable.OutputStream out, final OPENBEXI_Timeline.css s)
	{
		out.write_string(s.id);
		out.write_string(s.name);
		out.write_string(s.textColor);
		out.write_string(s.tapeImage);
		out.write_string(s.tapeRepeat);
		out.write_string(s.caption);
		out.write_string(s.link);
		out.write_string(s.icon);
		out.write_string(s.image);
		out.write_string(s.color);
		out.write_string(s.text);
		out.write_string(s.css_file);
	}
}
