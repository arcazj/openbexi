package OPENBEXI_Timeline;

import org.omg.PortableServer.POA;

/**
 * Generated from IDL interface "OPENBEXI_timeline_orb".
 *
 * @author JacORB IDL compiler V 2.3.1, 27-May-2009
 * @version generated at Nov 25, 2012 5:27:08 PM
 */

public class OPENBEXI_timeline_orbPOATie
	extends OPENBEXI_timeline_orbPOA
{
	private OPENBEXI_timeline_orbOperations _delegate;

	private POA _poa;
	public OPENBEXI_timeline_orbPOATie(OPENBEXI_timeline_orbOperations delegate)
	{
		_delegate = delegate;
	}
	public OPENBEXI_timeline_orbPOATie(OPENBEXI_timeline_orbOperations delegate, POA poa)
	{
		_delegate = delegate;
		_poa = poa;
	}
	public OPENBEXI_Timeline.OPENBEXI_timeline_orb _this()
	{
		return OPENBEXI_Timeline.OPENBEXI_timeline_orbHelper.narrow(_this_object());
	}
	public OPENBEXI_Timeline.OPENBEXI_timeline_orb _this(org.omg.CORBA.ORB orb)
	{
		return OPENBEXI_Timeline.OPENBEXI_timeline_orbHelper.narrow(_this_object(orb));
	}
	public OPENBEXI_timeline_orbOperations _delegate()
	{
		return _delegate;
	}
	public void _delegate(OPENBEXI_timeline_orbOperations delegate)
	{
		_delegate = delegate;
	}
	public POA _default_POA()
	{
		if (_poa != null)
		{
			return _poa;
		}
		return super._default_POA();
	}
	public OPENBEXI_Timeline.session[] get_Timeline_sessions(java.lang.String id)
	{
		return _delegate.get_Timeline_sessions(id);
	}

	public OPENBEXI_Timeline.timeline_alive contact_Timelines(java.lang.String id)
	{
		return _delegate.contact_Timelines(id);
	}

	public OPENBEXI_Timeline.session get_Timeline_session(java.lang.String id, java.lang.String session_id)
	{
		return _delegate.get_Timeline_session(id,session_id);
	}

	public OPENBEXI_Timeline.timeline_status add_Timeline_sessions(java.lang.String id, OPENBEXI_Timeline.session[] res)
	{
		return _delegate.add_Timeline_sessions(id,res);
	}

	public OPENBEXI_Timeline.timeline_status add_Timeline_ressources(java.lang.String id, OPENBEXI_Timeline.resource[] res)
	{
		return _delegate.add_Timeline_ressources(id,res);
	}

	public OPENBEXI_Timeline.timeline_status delete_Timeline_ressources(java.lang.String id, OPENBEXI_Timeline.resource[] res)
	{
		return _delegate.delete_Timeline_ressources(id,res);
	}

	public OPENBEXI_Timeline.timeline[] get_Timelines()
	{
		return _delegate.get_Timelines();
	}

	public OPENBEXI_Timeline.timeline_status update_Timeline_sessions(java.lang.String id, OPENBEXI_Timeline.session[] res)
	{
		return _delegate.update_Timeline_sessions(id,res);
	}

	public OPENBEXI_Timeline.timeline_status update_Timeline_ressources(java.lang.String id, OPENBEXI_Timeline.resource[] res)
	{
		return _delegate.update_Timeline_ressources(id,res);
	}

	public OPENBEXI_Timeline.timeline_status delete_Timeline_sessions(java.lang.String id, OPENBEXI_Timeline.session[] res)
	{
		return _delegate.delete_Timeline_sessions(id,res);
	}

	public OPENBEXI_Timeline.resource[] get_Timeline_ressources(java.lang.String id)
	{
		return _delegate.get_Timeline_ressources(id);
	}

	public OPENBEXI_Timeline.timeline_status update_Timeline_css(java.lang.String id, OPENBEXI_Timeline.css properties)
	{
		return _delegate.update_Timeline_css(id,properties);
	}

	public void print(OPENBEXI_Timeline.timeline[] timelines)
	{
_delegate.print(timelines);
	}

}
