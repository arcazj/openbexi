package OPENBEXI_Timeline;
/**
 * Generated from IDL enum "event_status".
 *
 * @author JacORB IDL compiler V 2.3.1, 27-May-2009
 * @version generated at Nov 25, 2012 5:27:08 PM
 */

public final class event_status
	implements org.omg.CORBA.portable.IDLEntity
{
	private int value = -1;
	public static final int _E_SCHEDULED = 0;
	public static final event_status E_SCHEDULED = new event_status(_E_SCHEDULED);
	public static final int _E_RUNNING = 1;
	public static final event_status E_RUNNING = new event_status(_E_RUNNING);
	public static final int _E_FINISHED = 2;
	public static final event_status E_FINISHED = new event_status(_E_FINISHED);
	public static final int _E_DELETED = 3;
	public static final event_status E_DELETED = new event_status(_E_DELETED);
	public int value()
	{
		return value;
	}
	public static event_status from_int(int value)
	{
		switch (value) {
			case _E_SCHEDULED: return E_SCHEDULED;
			case _E_RUNNING: return E_RUNNING;
			case _E_FINISHED: return E_FINISHED;
			case _E_DELETED: return E_DELETED;
			default: throw new org.omg.CORBA.BAD_PARAM();
		}
	}
	public String toString()
	{
		switch (value) {
			case _E_SCHEDULED: return "E_SCHEDULED";
			case _E_RUNNING: return "E_RUNNING";
			case _E_FINISHED: return "E_FINISHED";
			case _E_DELETED: return "E_DELETED";
			default: throw new org.omg.CORBA.BAD_PARAM();
		}
	}
	protected event_status(int i)
	{
		value = i;
	}
	java.lang.Object readResolve()
	throws java.io.ObjectStreamException
	{
		return from_int(value());
	}
}
