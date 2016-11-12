package OPENBEXI_Timeline;


/**
 * Generated from IDL interface "OPENBEXI_timeline_orb".
 *
 * @author JacORB IDL compiler V 2.3.1, 27-May-2009
 * @version generated at Nov 25, 2012 5:27:08 PM
 */

public interface OPENBEXI_timeline_orbOperations
{
	/* constants */
	/* operations  */
	OPENBEXI_Timeline.timeline[] get_Timelines();
	OPENBEXI_Timeline.timeline_alive contact_Timelines(java.lang.String id);
	OPENBEXI_Timeline.timeline_status add_Timeline_ressources(java.lang.String id, OPENBEXI_Timeline.resource[] res);
	OPENBEXI_Timeline.timeline_status delete_Timeline_ressources(java.lang.String id, OPENBEXI_Timeline.resource[] res);
	OPENBEXI_Timeline.timeline_status update_Timeline_ressources(java.lang.String id, OPENBEXI_Timeline.resource[] res);
	OPENBEXI_Timeline.resource[] get_Timeline_ressources(java.lang.String id);
	OPENBEXI_Timeline.timeline_status add_Timeline_sessions(java.lang.String id, OPENBEXI_Timeline.session[] res);
	OPENBEXI_Timeline.timeline_status delete_Timeline_sessions(java.lang.String id, OPENBEXI_Timeline.session[] res);
	OPENBEXI_Timeline.timeline_status update_Timeline_sessions(java.lang.String id, OPENBEXI_Timeline.session[] res);
	OPENBEXI_Timeline.session[] get_Timeline_sessions(java.lang.String id);
	OPENBEXI_Timeline.session get_Timeline_session(java.lang.String id, java.lang.String session_id);
	OPENBEXI_Timeline.timeline_status update_Timeline_css(java.lang.String id, OPENBEXI_Timeline.css properties);
	void print(OPENBEXI_Timeline.timeline[] timelines);
}
