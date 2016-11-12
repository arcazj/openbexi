package OPENBEXI_Timeline;


/**
 * Generated from IDL struct "timeline".
 *
 * @author JacORB IDL compiler V 2.3.1, 27-May-2009
 * @version generated at Nov 25, 2012 5:27:08 PM
 */

public final class timelineHelper
{
	private static org.omg.CORBA.TypeCode _type = null;
	public static org.omg.CORBA.TypeCode type ()
	{
		if (_type == null)
		{
			_type = org.omg.CORBA.ORB.init().create_struct_tc(OPENBEXI_Timeline.timelineHelper.id(),"timeline",new org.omg.CORBA.StructMember[]{new org.omg.CORBA.StructMember("id", org.omg.CORBA.ORB.init().create_string_tc(0), null),new org.omg.CORBA.StructMember("name", org.omg.CORBA.ORB.init().create_string_tc(0), null),new org.omg.CORBA.StructMember("status", org.omg.CORBA.ORB.init().create_string_tc(0), null),new org.omg.CORBA.StructMember("host", org.omg.CORBA.ORB.init().create_string_tc(0), null),new org.omg.CORBA.StructMember("port", org.omg.CORBA.ORB.init().create_string_tc(0), null),new org.omg.CORBA.StructMember("sessions", org.omg.CORBA.ORB.init().create_sequence_tc(0, OPENBEXI_Timeline.sessionHelper.type()), null),new org.omg.CORBA.StructMember("resources", org.omg.CORBA.ORB.init().create_sequence_tc(0, OPENBEXI_Timeline.resourceHelper.type()), null),new org.omg.CORBA.StructMember("properties", OPENBEXI_Timeline.cssHelper.type(), null)});
		}
		return _type;
	}

	public static void insert (final org.omg.CORBA.Any any, final OPENBEXI_Timeline.timeline s)
	{
		any.type(type());
		write( any.create_output_stream(),s);
	}

	public static OPENBEXI_Timeline.timeline extract (final org.omg.CORBA.Any any)
	{
		return read(any.create_input_stream());
	}

	public static String id()
	{
		return "IDL:OPENBEXI_Timeline/timeline:1.0";
	}
	public static OPENBEXI_Timeline.timeline read (final org.omg.CORBA.portable.InputStream in)
	{
		OPENBEXI_Timeline.timeline result = new OPENBEXI_Timeline.timeline();
		result.id=in.read_string();
		result.name=in.read_string();
		result.status=in.read_string();
		result.host=in.read_string();
		result.port=in.read_string();
		int _lresult_sessions3 = in.read_long();
		try
		{
			 int x = in.available();
			 if ( x > 0 && _lresult_sessions3 > x )
				{
					throw new org.omg.CORBA.MARSHAL("Sequence length too large. Only " + x + " available and trying to assign " + _lresult_sessions3);
				}
		}
		catch (java.io.IOException e)
		{
		}
		result.sessions = new OPENBEXI_Timeline.session[_lresult_sessions3];
		for (int i=0;i<result.sessions.length;i++)
		{
			result.sessions[i]=OPENBEXI_Timeline.sessionHelper.read(in);
		}

		int _lresult_resources4 = in.read_long();
		try
		{
			 int x = in.available();
			 if ( x > 0 && _lresult_resources4 > x )
				{
					throw new org.omg.CORBA.MARSHAL("Sequence length too large. Only " + x + " available and trying to assign " + _lresult_resources4);
				}
		}
		catch (java.io.IOException e)
		{
		}
		result.resources = new OPENBEXI_Timeline.resource[_lresult_resources4];
		for (int i=0;i<result.resources.length;i++)
		{
			result.resources[i]=OPENBEXI_Timeline.resourceHelper.read(in);
		}

		result.properties=OPENBEXI_Timeline.cssHelper.read(in);
		return result;
	}
	public static void write (final org.omg.CORBA.portable.OutputStream out, final OPENBEXI_Timeline.timeline s)
	{
		out.write_string(s.id);
		out.write_string(s.name);
		out.write_string(s.status);
		out.write_string(s.host);
		out.write_string(s.port);
		
		out.write_long(s.sessions.length);
		for (int i=0; i<s.sessions.length;i++)
		{
			OPENBEXI_Timeline.sessionHelper.write(out,s.sessions[i]);
		}

		
		out.write_long(s.resources.length);
		for (int i=0; i<s.resources.length;i++)
		{
			OPENBEXI_Timeline.resourceHelper.write(out,s.resources[i]);
		}

		OPENBEXI_Timeline.cssHelper.write(out,s.properties);
	}
}
