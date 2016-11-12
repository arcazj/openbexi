package OPENBEXI_Timeline;
/**
 * Generated from IDL enum "session_status".
 *
 * @author JacORB IDL compiler V 2.3.1, 27-May-2009
 * @version generated at Nov 25, 2012 5:27:08 PM
 */

public final class session_status
	implements org.omg.CORBA.portable.IDLEntity
{
	private int value = -1;
	public static final int _S_ABORTED = 0;
	public static final session_status S_ABORTED = new session_status(_S_ABORTED);
	public static final int _S_RUNNING = 1;
	public static final session_status S_RUNNING = new session_status(_S_RUNNING);
	public static final int _S_FINISHED = 2;
	public static final session_status S_FINISHED = new session_status(_S_FINISHED);
	public static final int _S_DELETED = 3;
	public static final session_status S_DELETED = new session_status(_S_DELETED);
	public static final int _S_NOT_AUTHORIZED = 4;
	public static final session_status S_NOT_AUTHORIZED = new session_status(_S_NOT_AUTHORIZED);
	public static final int _S_NEED_ACKNOWLEDGEMENT = 5;
	public static final session_status S_NEED_ACKNOWLEDGEMENT = new session_status(_S_NEED_ACKNOWLEDGEMENT);
	public static final int _S_ACKNOWLEDGED = 6;
	public static final session_status S_ACKNOWLEDGED = new session_status(_S_ACKNOWLEDGED);
	public int value()
	{
		return value;
	}
	public static session_status from_int(int value)
	{
		switch (value) {
			case _S_ABORTED: return S_ABORTED;
			case _S_RUNNING: return S_RUNNING;
			case _S_FINISHED: return S_FINISHED;
			case _S_DELETED: return S_DELETED;
			case _S_NOT_AUTHORIZED: return S_NOT_AUTHORIZED;
			case _S_NEED_ACKNOWLEDGEMENT: return S_NEED_ACKNOWLEDGEMENT;
			case _S_ACKNOWLEDGED: return S_ACKNOWLEDGED;
			default: throw new org.omg.CORBA.BAD_PARAM();
		}
	}
	public String toString()
	{
		switch (value) {
			case _S_ABORTED: return "S_ABORTED";
			case _S_RUNNING: return "S_RUNNING";
			case _S_FINISHED: return "S_FINISHED";
			case _S_DELETED: return "S_DELETED";
			case _S_NOT_AUTHORIZED: return "S_NOT_AUTHORIZED";
			case _S_NEED_ACKNOWLEDGEMENT: return "S_NEED_ACKNOWLEDGEMENT";
			case _S_ACKNOWLEDGED: return "S_ACKNOWLEDGED";
			default: throw new org.omg.CORBA.BAD_PARAM();
		}
	}
	protected session_status(int i)
	{
		value = i;
	}
	java.lang.Object readResolve()
	throws java.io.ObjectStreamException
	{
		return from_int(value());
	}
}
