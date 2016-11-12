package OPENBEXI_Timeline;
/**
 * Generated from IDL enum "type_session".
 *
 * @author JacORB IDL compiler V 2.3.1, 27-May-2009
 * @version generated at Nov 25, 2012 5:27:08 PM
 */

public final class type_session
	implements org.omg.CORBA.portable.IDLEntity
{
	private int value = -1;
	public static final int _T_EVENT = 0;
	public static final type_session T_EVENT = new type_session(_T_EVENT);
	public static final int _T_SESSION = 1;
	public static final type_session T_SESSION = new type_session(_T_SESSION);
	public int value()
	{
		return value;
	}
	public static type_session from_int(int value)
	{
		switch (value) {
			case _T_EVENT: return T_EVENT;
			case _T_SESSION: return T_SESSION;
			default: throw new org.omg.CORBA.BAD_PARAM();
		}
	}
	public String toString()
	{
		switch (value) {
			case _T_EVENT: return "T_EVENT";
			case _T_SESSION: return "T_SESSION";
			default: throw new org.omg.CORBA.BAD_PARAM();
		}
	}
	protected type_session(int i)
	{
		value = i;
	}
	java.lang.Object readResolve()
	throws java.io.ObjectStreamException
	{
		return from_int(value());
	}
}
