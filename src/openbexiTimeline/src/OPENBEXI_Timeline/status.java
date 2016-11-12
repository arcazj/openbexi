package OPENBEXI_Timeline;
/**
 * Generated from IDL enum "status".
 *
 * @author JacORB IDL compiler V 2.3.1, 27-May-2009
 * @version generated at Feb 20, 2012 4:48:21 PM
 */

public final class status
	implements org.omg.CORBA.portable.IDLEntity
{
	private int value = -1;
	public static final int _scheduled = 0;
	public static final status scheduled = new status(_scheduled);
	public static final int _aborted = 1;
	public static final status aborted = new status(_aborted);
	public static final int _running = 2;
	public static final status running = new status(_running);
	public static final int _finished = 3;
	public static final status finished = new status(_finished);
	public static final int _paused = 4;
	public static final status paused = new status(_paused);
	public static final int _deleted = 5;
	public static final status deleted = new status(_deleted);
	public static final int _asking = 6;
	public static final status asking = new status(_asking);
	public int value()
	{
		return value;
	}
	public static status from_int(int value)
	{
		switch (value) {
			case _scheduled: return scheduled;
			case _aborted: return aborted;
			case _running: return running;
			case _finished: return finished;
			case _paused: return paused;
			case _deleted: return deleted;
			case _asking: return asking;
			default: throw new org.omg.CORBA.BAD_PARAM();
		}
	}
	public String toString()
	{
		switch (value) {
			case _scheduled: return "scheduled";
			case _aborted: return "aborted";
			case _running: return "running";
			case _finished: return "finished";
			case _paused: return "paused";
			case _deleted: return "deleted";
			case _asking: return "asking";
			default: throw new org.omg.CORBA.BAD_PARAM();
		}
	}
	protected status(int i)
	{
		value = i;
	}
	java.lang.Object readResolve()
	throws java.io.ObjectStreamException
	{
		return from_int(value());
	}
}
