package OPENBEXI_Timeline;
/**
 * Generated from IDL enum "activity_status".
 *
 * @author JacORB IDL compiler V 2.3.1, 27-May-2009
 * @version generated at Nov 25, 2012 5:27:08 PM
 */

public final class activity_status
	implements org.omg.CORBA.portable.IDLEntity
{
	private int value = -1;
	public static final int _A_SCHEDULED = 0;
	public static final activity_status A_SCHEDULED = new activity_status(_A_SCHEDULED);
	public static final int _A_STARTING = 1;
	public static final activity_status A_STARTING = new activity_status(_A_STARTING);
	public static final int _A_ABORTED = 2;
	public static final activity_status A_ABORTED = new activity_status(_A_ABORTED);
	public static final int _A_RUNNING = 3;
	public static final activity_status A_RUNNING = new activity_status(_A_RUNNING);
	public static final int _A_FINISHED = 4;
	public static final activity_status A_FINISHED = new activity_status(_A_FINISHED);
	public static final int _A_PAUSED = 5;
	public static final activity_status A_PAUSED = new activity_status(_A_PAUSED);
	public static final int _A_DELETED = 6;
	public static final activity_status A_DELETED = new activity_status(_A_DELETED);
	public static final int _A_ASKING = 7;
	public static final activity_status A_ASKING = new activity_status(_A_ASKING);
	public int value()
	{
		return value;
	}
	public static activity_status from_int(int value)
	{
		switch (value) {
			case _A_SCHEDULED: return A_SCHEDULED;
			case _A_STARTING: return A_STARTING;
			case _A_ABORTED: return A_ABORTED;
			case _A_RUNNING: return A_RUNNING;
			case _A_FINISHED: return A_FINISHED;
			case _A_PAUSED: return A_PAUSED;
			case _A_DELETED: return A_DELETED;
			case _A_ASKING: return A_ASKING;
			default: throw new org.omg.CORBA.BAD_PARAM();
		}
	}
	public String toString()
	{
		switch (value) {
			case _A_SCHEDULED: return "A_SCHEDULED";
			case _A_STARTING: return "A_STARTING";
			case _A_ABORTED: return "A_ABORTED";
			case _A_RUNNING: return "A_RUNNING";
			case _A_FINISHED: return "A_FINISHED";
			case _A_PAUSED: return "A_PAUSED";
			case _A_DELETED: return "A_DELETED";
			case _A_ASKING: return "A_ASKING";
			default: throw new org.omg.CORBA.BAD_PARAM();
		}
	}
	protected activity_status(int i)
	{
		value = i;
	}
	java.lang.Object readResolve()
	throws java.io.ObjectStreamException
	{
		return from_int(value());
	}
}
