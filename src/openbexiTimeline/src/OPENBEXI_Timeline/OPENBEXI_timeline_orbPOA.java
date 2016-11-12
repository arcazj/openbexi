package OPENBEXI_Timeline;


/**
 * Generated from IDL interface "OPENBEXI_timeline_orb".
 *
 * @author JacORB IDL compiler V 2.3.1, 27-May-2009
 * @version generated at Nov 25, 2012 5:27:08 PM
 */

public abstract class OPENBEXI_timeline_orbPOA
	extends org.omg.PortableServer.Servant
	implements org.omg.CORBA.portable.InvokeHandler, OPENBEXI_Timeline.OPENBEXI_timeline_orbOperations
{
	static private final java.util.Hashtable m_opsHash = new java.util.Hashtable();
	static
	{
		m_opsHash.put ( "get_Timeline_sessions", new java.lang.Integer(0));
		m_opsHash.put ( "contact_Timelines", new java.lang.Integer(1));
		m_opsHash.put ( "get_Timeline_session", new java.lang.Integer(2));
		m_opsHash.put ( "add_Timeline_sessions", new java.lang.Integer(3));
		m_opsHash.put ( "add_Timeline_ressources", new java.lang.Integer(4));
		m_opsHash.put ( "delete_Timeline_ressources", new java.lang.Integer(5));
		m_opsHash.put ( "get_Timelines", new java.lang.Integer(6));
		m_opsHash.put ( "update_Timeline_sessions", new java.lang.Integer(7));
		m_opsHash.put ( "update_Timeline_ressources", new java.lang.Integer(8));
		m_opsHash.put ( "delete_Timeline_sessions", new java.lang.Integer(9));
		m_opsHash.put ( "get_Timeline_ressources", new java.lang.Integer(10));
		m_opsHash.put ( "update_Timeline_css", new java.lang.Integer(11));
		m_opsHash.put ( "print", new java.lang.Integer(12));
	}
	private String[] ids = {"IDL:OPENBEXI_Timeline/OPENBEXI_timeline_orb:1.0"};
	public OPENBEXI_Timeline.OPENBEXI_timeline_orb _this()
	{
		return OPENBEXI_Timeline.OPENBEXI_timeline_orbHelper.narrow(_this_object());
	}
	public OPENBEXI_Timeline.OPENBEXI_timeline_orb _this(org.omg.CORBA.ORB orb)
	{
		return OPENBEXI_Timeline.OPENBEXI_timeline_orbHelper.narrow(_this_object(orb));
	}
	public org.omg.CORBA.portable.OutputStream _invoke(String method, org.omg.CORBA.portable.InputStream _input, org.omg.CORBA.portable.ResponseHandler handler)
		throws org.omg.CORBA.SystemException
	{
		org.omg.CORBA.portable.OutputStream _out = null;
		// do something
		// quick lookup of operation
		java.lang.Integer opsIndex = (java.lang.Integer)m_opsHash.get ( method );
		if ( null == opsIndex )
			throw new org.omg.CORBA.BAD_OPERATION(method + " not found");
		switch ( opsIndex.intValue() )
		{
			case 0: // get_Timeline_sessions
			{
				java.lang.String _arg0=_input.read_wstring();
				_out = handler.createReply();
				OPENBEXI_Timeline.sessionsHelper.write(_out,get_Timeline_sessions(_arg0));
				break;
			}
			case 1: // contact_Timelines
			{
				java.lang.String _arg0=_input.read_wstring();
				_out = handler.createReply();
				OPENBEXI_Timeline.timeline_aliveHelper.write(_out,contact_Timelines(_arg0));
				break;
			}
			case 2: // get_Timeline_session
			{
				java.lang.String _arg0=_input.read_wstring();
				java.lang.String _arg1=_input.read_wstring();
				_out = handler.createReply();
				OPENBEXI_Timeline.sessionHelper.write(_out,get_Timeline_session(_arg0,_arg1));
				break;
			}
			case 3: // add_Timeline_sessions
			{
				java.lang.String _arg0=_input.read_wstring();
				OPENBEXI_Timeline.session[] _arg1=OPENBEXI_Timeline.sessionsHelper.read(_input);
				_out = handler.createReply();
				OPENBEXI_Timeline.timeline_statusHelper.write(_out,add_Timeline_sessions(_arg0,_arg1));
				break;
			}
			case 4: // add_Timeline_ressources
			{
				java.lang.String _arg0=_input.read_wstring();
				OPENBEXI_Timeline.resource[] _arg1=OPENBEXI_Timeline.resourcesHelper.read(_input);
				_out = handler.createReply();
				OPENBEXI_Timeline.timeline_statusHelper.write(_out,add_Timeline_ressources(_arg0,_arg1));
				break;
			}
			case 5: // delete_Timeline_ressources
			{
				java.lang.String _arg0=_input.read_wstring();
				OPENBEXI_Timeline.resource[] _arg1=OPENBEXI_Timeline.resourcesHelper.read(_input);
				_out = handler.createReply();
				OPENBEXI_Timeline.timeline_statusHelper.write(_out,delete_Timeline_ressources(_arg0,_arg1));
				break;
			}
			case 6: // get_Timelines
			{
				_out = handler.createReply();
				OPENBEXI_Timeline.timelinesHelper.write(_out,get_Timelines());
				break;
			}
			case 7: // update_Timeline_sessions
			{
				java.lang.String _arg0=_input.read_wstring();
				OPENBEXI_Timeline.session[] _arg1=OPENBEXI_Timeline.sessionsHelper.read(_input);
				_out = handler.createReply();
				OPENBEXI_Timeline.timeline_statusHelper.write(_out,update_Timeline_sessions(_arg0,_arg1));
				break;
			}
			case 8: // update_Timeline_ressources
			{
				java.lang.String _arg0=_input.read_wstring();
				OPENBEXI_Timeline.resource[] _arg1=OPENBEXI_Timeline.resourcesHelper.read(_input);
				_out = handler.createReply();
				OPENBEXI_Timeline.timeline_statusHelper.write(_out,update_Timeline_ressources(_arg0,_arg1));
				break;
			}
			case 9: // delete_Timeline_sessions
			{
				java.lang.String _arg0=_input.read_wstring();
				OPENBEXI_Timeline.session[] _arg1=OPENBEXI_Timeline.sessionsHelper.read(_input);
				_out = handler.createReply();
				OPENBEXI_Timeline.timeline_statusHelper.write(_out,delete_Timeline_sessions(_arg0,_arg1));
				break;
			}
			case 10: // get_Timeline_ressources
			{
				java.lang.String _arg0=_input.read_wstring();
				_out = handler.createReply();
				OPENBEXI_Timeline.resourcesHelper.write(_out,get_Timeline_ressources(_arg0));
				break;
			}
			case 11: // update_Timeline_css
			{
				java.lang.String _arg0=_input.read_wstring();
				OPENBEXI_Timeline.css _arg1=OPENBEXI_Timeline.cssHelper.read(_input);
				_out = handler.createReply();
				OPENBEXI_Timeline.timeline_statusHelper.write(_out,update_Timeline_css(_arg0,_arg1));
				break;
			}
			case 12: // print
			{
				OPENBEXI_Timeline.timeline[] _arg0=OPENBEXI_Timeline.timelinesHelper.read(_input);
				_out = handler.createReply();
				print(_arg0);
				break;
			}
		}
		return _out;
	}

	public String[] _all_interfaces(org.omg.PortableServer.POA poa, byte[] obj_id)
	{
		return ids;
	}
}
