package OPENBEXI_Timeline;
/**
 * Generated from IDL enum "timeline_status".
 *
 * @author JacORB IDL compiler V 2.3.1, 27-May-2009
 * @version generated at Nov 25, 2012 5:27:08 PM
 */

public final class timeline_status
	implements org.omg.CORBA.portable.IDLEntity
{
	private int value = -1;
	public static final int _T_OK = 0;
	public static final timeline_status T_OK = new timeline_status(_T_OK);
	public static final int _T_NOK = 1;
	public static final timeline_status T_NOK = new timeline_status(_T_NOK);
	public int value()
	{
		return value;
	}
	public static timeline_status from_int(int value)
	{
		switch (value) {
			case _T_OK: return T_OK;
			case _T_NOK: return T_NOK;
			default: throw new org.omg.CORBA.BAD_PARAM();
		}
	}
	public String toString()
	{
		switch (value) {
			case _T_OK: return "T_OK";
			case _T_NOK: return "T_NOK";
			default: throw new org.omg.CORBA.BAD_PARAM();
		}
	}
	protected timeline_status(int i)
	{
		value = i;
	}
	java.lang.Object readResolve()
	throws java.io.ObjectStreamException
	{
		return from_int(value());
	}
}
