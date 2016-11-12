package OPENBEXI_Timeline;
/**
 * Generated from IDL enum "timeline_alive".
 *
 * @author JacORB IDL compiler V 2.3.1, 27-May-2009
 * @version generated at Nov 25, 2012 5:27:08 PM
 */

public final class timeline_alive
	implements org.omg.CORBA.portable.IDLEntity
{
	private int value = -1;
	public static final int _T_ON = 0;
	public static final timeline_alive T_ON = new timeline_alive(_T_ON);
	public static final int _T_OFF = 1;
	public static final timeline_alive T_OFF = new timeline_alive(_T_OFF);
	public int value()
	{
		return value;
	}
	public static timeline_alive from_int(int value)
	{
		switch (value) {
			case _T_ON: return T_ON;
			case _T_OFF: return T_OFF;
			default: throw new org.omg.CORBA.BAD_PARAM();
		}
	}
	public String toString()
	{
		switch (value) {
			case _T_ON: return "T_ON";
			case _T_OFF: return "T_OFF";
			default: throw new org.omg.CORBA.BAD_PARAM();
		}
	}
	protected timeline_alive(int i)
	{
		value = i;
	}
	java.lang.Object readResolve()
	throws java.io.ObjectStreamException
	{
		return from_int(value());
	}
}
