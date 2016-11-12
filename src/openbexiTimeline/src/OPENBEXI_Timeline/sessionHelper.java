package OPENBEXI_Timeline;


/**
 * Generated from IDL struct "session".
 *
 * @author JacORB IDL compiler V 2.3.1, 27-May-2009
 * @version generated at Nov 25, 2012 5:27:08 PM
 */

public final class sessionHelper
{
	private static org.omg.CORBA.TypeCode _type = null;
	public static org.omg.CORBA.TypeCode type ()
	{
		if (_type == null)
		{
			_type = org.omg.CORBA.ORB.init().create_struct_tc(OPENBEXI_Timeline.sessionHelper.id(),"session",new org.omg.CORBA.StructMember[]{new org.omg.CORBA.StructMember("id", org.omg.CORBA.ORB.init().create_string_tc(0), null),new org.omg.CORBA.StructMember("name", org.omg.CORBA.ORB.init().create_string_tc(0), null),new org.omg.CORBA.StructMember("type", OPENBEXI_Timeline.type_sessionHelper.type(), null),new org.omg.CORBA.StructMember("subtype", org.omg.CORBA.ORB.init().create_string_tc(0), null),new org.omg.CORBA.StructMember("title", org.omg.CORBA.ORB.init().create_string_tc(0), null),new org.omg.CORBA.StructMember("start", org.omg.CORBA.ORB.init().create_string_tc(0), null),new org.omg.CORBA.StructMember("startL", org.omg.CORBA.ORB.init().get_primitive_tc(org.omg.CORBA.TCKind.from_int(3)), null),new org.omg.CORBA.StructMember("end", org.omg.CORBA.ORB.init().create_string_tc(0), null),new org.omg.CORBA.StructMember("endL", org.omg.CORBA.ORB.init().get_primitive_tc(org.omg.CORBA.TCKind.from_int(3)), null),new org.omg.CORBA.StructMember("isDuration", org.omg.CORBA.ORB.init().create_string_tc(0), null),new org.omg.CORBA.StructMember("latestStart", org.omg.CORBA.ORB.init().create_string_tc(0), null),new org.omg.CORBA.StructMember("earliestEnd", org.omg.CORBA.ORB.init().create_string_tc(0), null),new org.omg.CORBA.StructMember("priority", org.omg.CORBA.ORB.init().create_string_tc(0), null),new org.omg.CORBA.StructMember("tolerance", org.omg.CORBA.ORB.init().create_string_tc(0), null),new org.omg.CORBA.StructMember("status", OPENBEXI_Timeline.session_statusHelper.type(), null),new org.omg.CORBA.StructMember("precedences", org.omg.CORBA.ORB.init().create_sequence_tc(0, org.omg.CORBA.ORB.init().create_string_tc(0)), null),new org.omg.CORBA.StructMember("resources", org.omg.CORBA.ORB.init().create_sequence_tc(0, OPENBEXI_Timeline.resourceHelper.type()), null),new org.omg.CORBA.StructMember("activities", org.omg.CORBA.ORB.init().create_sequence_tc(0, OPENBEXI_Timeline.activityHelper.type()), null),new org.omg.CORBA.StructMember("properties", OPENBEXI_Timeline.cssHelper.type(), null)});
		}
		return _type;
	}

	public static void insert (final org.omg.CORBA.Any any, final OPENBEXI_Timeline.session s)
	{
		any.type(type());
		write( any.create_output_stream(),s);
	}

	public static OPENBEXI_Timeline.session extract (final org.omg.CORBA.Any any)
	{
		return read(any.create_input_stream());
	}

	public static String id()
	{
		return "IDL:OPENBEXI_Timeline/session:1.0";
	}
	public static OPENBEXI_Timeline.session read (final org.omg.CORBA.portable.InputStream in)
	{
		OPENBEXI_Timeline.session result = new OPENBEXI_Timeline.session();
		result.id=in.read_string();
		result.name=in.read_string();
		result.type=OPENBEXI_Timeline.type_sessionHelper.read(in);
		result.subtype=in.read_string();
		result.title=in.read_string();
		result.start=in.read_string();
		result.startL=in.read_long();
		result.end=in.read_string();
		result.endL=in.read_long();
		result.isDuration=in.read_string();
		result.latestStart=in.read_string();
		result.earliestEnd=in.read_string();
		result.priority=in.read_string();
		result.tolerance=in.read_string();
		result.status=OPENBEXI_Timeline.session_statusHelper.read(in);
		int _lresult_precedences0 = in.read_long();
		try
		{
			 int x = in.available();
			 if ( x > 0 && _lresult_precedences0 > x )
				{
					throw new org.omg.CORBA.MARSHAL("Sequence length too large. Only " + x + " available and trying to assign " + _lresult_precedences0);
				}
		}
		catch (java.io.IOException e)
		{
		}
		result.precedences = new java.lang.String[_lresult_precedences0];
		for (int i=0;i<result.precedences.length;i++)
		{
			result.precedences[i]=in.read_string();
		}

		int _lresult_resources1 = in.read_long();
		try
		{
			 int x = in.available();
			 if ( x > 0 && _lresult_resources1 > x )
				{
					throw new org.omg.CORBA.MARSHAL("Sequence length too large. Only " + x + " available and trying to assign " + _lresult_resources1);
				}
		}
		catch (java.io.IOException e)
		{
		}
		result.resources = new OPENBEXI_Timeline.resource[_lresult_resources1];
		for (int i=0;i<result.resources.length;i++)
		{
			result.resources[i]=OPENBEXI_Timeline.resourceHelper.read(in);
		}

		int _lresult_activities2 = in.read_long();
		try
		{
			 int x = in.available();
			 if ( x > 0 && _lresult_activities2 > x )
				{
					throw new org.omg.CORBA.MARSHAL("Sequence length too large. Only " + x + " available and trying to assign " + _lresult_activities2);
				}
		}
		catch (java.io.IOException e)
		{
		}
		result.activities = new OPENBEXI_Timeline.activity[_lresult_activities2];
		for (int i=0;i<result.activities.length;i++)
		{
			result.activities[i]=OPENBEXI_Timeline.activityHelper.read(in);
		}

		result.properties=OPENBEXI_Timeline.cssHelper.read(in);
		return result;
	}
	public static void write (final org.omg.CORBA.portable.OutputStream out, final OPENBEXI_Timeline.session s)
	{
		out.write_string(s.id);
		out.write_string(s.name);
		OPENBEXI_Timeline.type_sessionHelper.write(out,s.type);
		out.write_string(s.subtype);
		out.write_string(s.title);
		out.write_string(s.start);
		out.write_long(s.startL);
		out.write_string(s.end);
		out.write_long(s.endL);
		out.write_string(s.isDuration);
		out.write_string(s.latestStart);
		out.write_string(s.earliestEnd);
		out.write_string(s.priority);
		out.write_string(s.tolerance);
		OPENBEXI_Timeline.session_statusHelper.write(out,s.status);
		
		out.write_long(s.precedences.length);
		for (int i=0; i<s.precedences.length;i++)
		{
			out.write_string(s.precedences[i]);
		}

		
		out.write_long(s.resources.length);
		for (int i=0; i<s.resources.length;i++)
		{
			OPENBEXI_Timeline.resourceHelper.write(out,s.resources[i]);
		}

		
		out.write_long(s.activities.length);
		for (int i=0; i<s.activities.length;i++)
		{
			OPENBEXI_Timeline.activityHelper.write(out,s.activities[i]);
		}

		OPENBEXI_Timeline.cssHelper.write(out,s.properties);
	}
}
