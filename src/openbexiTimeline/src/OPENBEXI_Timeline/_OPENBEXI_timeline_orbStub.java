package OPENBEXI_Timeline;


/**
 * Generated from IDL interface "OPENBEXI_timeline_orb".
 *
 * @author JacORB IDL compiler V 2.3.1, 27-May-2009
 * @version generated at Nov 25, 2012 5:27:08 PM
 */

public class _OPENBEXI_timeline_orbStub
	extends org.omg.CORBA.portable.ObjectImpl
	implements OPENBEXI_Timeline.OPENBEXI_timeline_orb
{
	private String[] ids = {"IDL:OPENBEXI_Timeline/OPENBEXI_timeline_orb:1.0"};
	public String[] _ids()
	{
		return ids;
	}

	public final static java.lang.Class _opsClass = OPENBEXI_Timeline.OPENBEXI_timeline_orbOperations.class;
	public OPENBEXI_Timeline.session[] get_Timeline_sessions(java.lang.String id)
	{
		while(true)
		{
		if(! this._is_local())
		{
			org.omg.CORBA.portable.InputStream _is = null;
			org.omg.CORBA.portable.OutputStream _os = null;
			try
			{
				_os = _request( "get_Timeline_sessions", true);
				_os.write_wstring(id);
				_is = _invoke(_os);
				OPENBEXI_Timeline.session[] _result = OPENBEXI_Timeline.sessionsHelper.read(_is);
				return _result;
			}
			catch( org.omg.CORBA.portable.RemarshalException _rx ){}
			catch( org.omg.CORBA.portable.ApplicationException _ax )
			{
				String _id = _ax.getId();
					try
					{
							_ax.getInputStream().close();
					}
					catch (java.io.IOException e)
					{
					throw new RuntimeException("Unexpected exception " + e.toString() );
					}
				throw new RuntimeException("Unexpected exception " + _id );
			}
			finally
			{
				if (_os != null)
				{
					try
					{
						_os.close();
					}
					catch (java.io.IOException e)
					{
					throw new RuntimeException("Unexpected exception " + e.toString() );
					}
				}
				this._releaseReply(_is);
			}
		}
		else
		{
			org.omg.CORBA.portable.ServantObject _so = _servant_preinvoke( "get_Timeline_sessions", _opsClass );
			if( _so == null )
				throw new org.omg.CORBA.UNKNOWN("local invocations not supported!");
			OPENBEXI_timeline_orbOperations _localServant = (OPENBEXI_timeline_orbOperations)_so.servant;
			OPENBEXI_Timeline.session[] _result;
			try
			{
				_result = _localServant.get_Timeline_sessions(id);
			}
			finally
			{
				_servant_postinvoke(_so);
			}
			return _result;
		}

		}

	}

	public OPENBEXI_Timeline.timeline_alive contact_Timelines(java.lang.String id)
	{
		while(true)
		{
		if(! this._is_local())
		{
			org.omg.CORBA.portable.InputStream _is = null;
			org.omg.CORBA.portable.OutputStream _os = null;
			try
			{
				_os = _request( "contact_Timelines", true);
				_os.write_wstring(id);
				_is = _invoke(_os);
				OPENBEXI_Timeline.timeline_alive _result = OPENBEXI_Timeline.timeline_aliveHelper.read(_is);
				return _result;
			}
			catch( org.omg.CORBA.portable.RemarshalException _rx ){}
			catch( org.omg.CORBA.portable.ApplicationException _ax )
			{
				String _id = _ax.getId();
					try
					{
							_ax.getInputStream().close();
					}
					catch (java.io.IOException e)
					{
					throw new RuntimeException("Unexpected exception " + e.toString() );
					}
				throw new RuntimeException("Unexpected exception " + _id );
			}
			finally
			{
				if (_os != null)
				{
					try
					{
						_os.close();
					}
					catch (java.io.IOException e)
					{
					throw new RuntimeException("Unexpected exception " + e.toString() );
					}
				}
				this._releaseReply(_is);
			}
		}
		else
		{
			org.omg.CORBA.portable.ServantObject _so = _servant_preinvoke( "contact_Timelines", _opsClass );
			if( _so == null )
				throw new org.omg.CORBA.UNKNOWN("local invocations not supported!");
			OPENBEXI_timeline_orbOperations _localServant = (OPENBEXI_timeline_orbOperations)_so.servant;
			OPENBEXI_Timeline.timeline_alive _result;
			try
			{
				_result = _localServant.contact_Timelines(id);
			}
			finally
			{
				_servant_postinvoke(_so);
			}
			return _result;
		}

		}

	}

	public OPENBEXI_Timeline.session get_Timeline_session(java.lang.String id, java.lang.String session_id)
	{
		while(true)
		{
		if(! this._is_local())
		{
			org.omg.CORBA.portable.InputStream _is = null;
			org.omg.CORBA.portable.OutputStream _os = null;
			try
			{
				_os = _request( "get_Timeline_session", true);
				_os.write_wstring(id);
				_os.write_wstring(session_id);
				_is = _invoke(_os);
				OPENBEXI_Timeline.session _result = OPENBEXI_Timeline.sessionHelper.read(_is);
				return _result;
			}
			catch( org.omg.CORBA.portable.RemarshalException _rx ){}
			catch( org.omg.CORBA.portable.ApplicationException _ax )
			{
				String _id = _ax.getId();
					try
					{
							_ax.getInputStream().close();
					}
					catch (java.io.IOException e)
					{
					throw new RuntimeException("Unexpected exception " + e.toString() );
					}
				throw new RuntimeException("Unexpected exception " + _id );
			}
			finally
			{
				if (_os != null)
				{
					try
					{
						_os.close();
					}
					catch (java.io.IOException e)
					{
					throw new RuntimeException("Unexpected exception " + e.toString() );
					}
				}
				this._releaseReply(_is);
			}
		}
		else
		{
			org.omg.CORBA.portable.ServantObject _so = _servant_preinvoke( "get_Timeline_session", _opsClass );
			if( _so == null )
				throw new org.omg.CORBA.UNKNOWN("local invocations not supported!");
			OPENBEXI_timeline_orbOperations _localServant = (OPENBEXI_timeline_orbOperations)_so.servant;
			OPENBEXI_Timeline.session _result;
			try
			{
				_result = _localServant.get_Timeline_session(id,session_id);
			}
			finally
			{
				_servant_postinvoke(_so);
			}
			return _result;
		}

		}

	}

	public OPENBEXI_Timeline.timeline_status add_Timeline_sessions(java.lang.String id, OPENBEXI_Timeline.session[] res)
	{
		while(true)
		{
		if(! this._is_local())
		{
			org.omg.CORBA.portable.InputStream _is = null;
			org.omg.CORBA.portable.OutputStream _os = null;
			try
			{
				_os = _request( "add_Timeline_sessions", true);
				_os.write_wstring(id);
				OPENBEXI_Timeline.sessionsHelper.write(_os,res);
				_is = _invoke(_os);
				OPENBEXI_Timeline.timeline_status _result = OPENBEXI_Timeline.timeline_statusHelper.read(_is);
				return _result;
			}
			catch( org.omg.CORBA.portable.RemarshalException _rx ){}
			catch( org.omg.CORBA.portable.ApplicationException _ax )
			{
				String _id = _ax.getId();
					try
					{
							_ax.getInputStream().close();
					}
					catch (java.io.IOException e)
					{
					throw new RuntimeException("Unexpected exception " + e.toString() );
					}
				throw new RuntimeException("Unexpected exception " + _id );
			}
			finally
			{
				if (_os != null)
				{
					try
					{
						_os.close();
					}
					catch (java.io.IOException e)
					{
					throw new RuntimeException("Unexpected exception " + e.toString() );
					}
				}
				this._releaseReply(_is);
			}
		}
		else
		{
			org.omg.CORBA.portable.ServantObject _so = _servant_preinvoke( "add_Timeline_sessions", _opsClass );
			if( _so == null )
				throw new org.omg.CORBA.UNKNOWN("local invocations not supported!");
			OPENBEXI_timeline_orbOperations _localServant = (OPENBEXI_timeline_orbOperations)_so.servant;
			OPENBEXI_Timeline.timeline_status _result;
			try
			{
				_result = _localServant.add_Timeline_sessions(id,res);
			}
			finally
			{
				_servant_postinvoke(_so);
			}
			return _result;
		}

		}

	}

	public OPENBEXI_Timeline.timeline_status add_Timeline_ressources(java.lang.String id, OPENBEXI_Timeline.resource[] res)
	{
		while(true)
		{
		if(! this._is_local())
		{
			org.omg.CORBA.portable.InputStream _is = null;
			org.omg.CORBA.portable.OutputStream _os = null;
			try
			{
				_os = _request( "add_Timeline_ressources", true);
				_os.write_wstring(id);
				OPENBEXI_Timeline.resourcesHelper.write(_os,res);
				_is = _invoke(_os);
				OPENBEXI_Timeline.timeline_status _result = OPENBEXI_Timeline.timeline_statusHelper.read(_is);
				return _result;
			}
			catch( org.omg.CORBA.portable.RemarshalException _rx ){}
			catch( org.omg.CORBA.portable.ApplicationException _ax )
			{
				String _id = _ax.getId();
					try
					{
							_ax.getInputStream().close();
					}
					catch (java.io.IOException e)
					{
					throw new RuntimeException("Unexpected exception " + e.toString() );
					}
				throw new RuntimeException("Unexpected exception " + _id );
			}
			finally
			{
				if (_os != null)
				{
					try
					{
						_os.close();
					}
					catch (java.io.IOException e)
					{
					throw new RuntimeException("Unexpected exception " + e.toString() );
					}
				}
				this._releaseReply(_is);
			}
		}
		else
		{
			org.omg.CORBA.portable.ServantObject _so = _servant_preinvoke( "add_Timeline_ressources", _opsClass );
			if( _so == null )
				throw new org.omg.CORBA.UNKNOWN("local invocations not supported!");
			OPENBEXI_timeline_orbOperations _localServant = (OPENBEXI_timeline_orbOperations)_so.servant;
			OPENBEXI_Timeline.timeline_status _result;
			try
			{
				_result = _localServant.add_Timeline_ressources(id,res);
			}
			finally
			{
				_servant_postinvoke(_so);
			}
			return _result;
		}

		}

	}

	public OPENBEXI_Timeline.timeline_status delete_Timeline_ressources(java.lang.String id, OPENBEXI_Timeline.resource[] res)
	{
		while(true)
		{
		if(! this._is_local())
		{
			org.omg.CORBA.portable.InputStream _is = null;
			org.omg.CORBA.portable.OutputStream _os = null;
			try
			{
				_os = _request( "delete_Timeline_ressources", true);
				_os.write_wstring(id);
				OPENBEXI_Timeline.resourcesHelper.write(_os,res);
				_is = _invoke(_os);
				OPENBEXI_Timeline.timeline_status _result = OPENBEXI_Timeline.timeline_statusHelper.read(_is);
				return _result;
			}
			catch( org.omg.CORBA.portable.RemarshalException _rx ){}
			catch( org.omg.CORBA.portable.ApplicationException _ax )
			{
				String _id = _ax.getId();
					try
					{
							_ax.getInputStream().close();
					}
					catch (java.io.IOException e)
					{
					throw new RuntimeException("Unexpected exception " + e.toString() );
					}
				throw new RuntimeException("Unexpected exception " + _id );
			}
			finally
			{
				if (_os != null)
				{
					try
					{
						_os.close();
					}
					catch (java.io.IOException e)
					{
					throw new RuntimeException("Unexpected exception " + e.toString() );
					}
				}
				this._releaseReply(_is);
			}
		}
		else
		{
			org.omg.CORBA.portable.ServantObject _so = _servant_preinvoke( "delete_Timeline_ressources", _opsClass );
			if( _so == null )
				throw new org.omg.CORBA.UNKNOWN("local invocations not supported!");
			OPENBEXI_timeline_orbOperations _localServant = (OPENBEXI_timeline_orbOperations)_so.servant;
			OPENBEXI_Timeline.timeline_status _result;
			try
			{
				_result = _localServant.delete_Timeline_ressources(id,res);
			}
			finally
			{
				_servant_postinvoke(_so);
			}
			return _result;
		}

		}

	}

	public OPENBEXI_Timeline.timeline[] get_Timelines()
	{
		while(true)
		{
		if(! this._is_local())
		{
			org.omg.CORBA.portable.InputStream _is = null;
			org.omg.CORBA.portable.OutputStream _os = null;
			try
			{
				_os = _request( "get_Timelines", true);
				_is = _invoke(_os);
				OPENBEXI_Timeline.timeline[] _result = OPENBEXI_Timeline.timelinesHelper.read(_is);
				return _result;
			}
			catch( org.omg.CORBA.portable.RemarshalException _rx ){}
			catch( org.omg.CORBA.portable.ApplicationException _ax )
			{
				String _id = _ax.getId();
					try
					{
							_ax.getInputStream().close();
					}
					catch (java.io.IOException e)
					{
					throw new RuntimeException("Unexpected exception " + e.toString() );
					}
				throw new RuntimeException("Unexpected exception " + _id );
			}
			finally
			{
				if (_os != null)
				{
					try
					{
						_os.close();
					}
					catch (java.io.IOException e)
					{
					throw new RuntimeException("Unexpected exception " + e.toString() );
					}
				}
				this._releaseReply(_is);
			}
		}
		else
		{
			org.omg.CORBA.portable.ServantObject _so = _servant_preinvoke( "get_Timelines", _opsClass );
			if( _so == null )
				throw new org.omg.CORBA.UNKNOWN("local invocations not supported!");
			OPENBEXI_timeline_orbOperations _localServant = (OPENBEXI_timeline_orbOperations)_so.servant;
			OPENBEXI_Timeline.timeline[] _result;
			try
			{
				_result = _localServant.get_Timelines();
			}
			finally
			{
				_servant_postinvoke(_so);
			}
			return _result;
		}

		}

	}

	public OPENBEXI_Timeline.timeline_status update_Timeline_sessions(java.lang.String id, OPENBEXI_Timeline.session[] res)
	{
		while(true)
		{
		if(! this._is_local())
		{
			org.omg.CORBA.portable.InputStream _is = null;
			org.omg.CORBA.portable.OutputStream _os = null;
			try
			{
				_os = _request( "update_Timeline_sessions", true);
				_os.write_wstring(id);
				OPENBEXI_Timeline.sessionsHelper.write(_os,res);
				_is = _invoke(_os);
				OPENBEXI_Timeline.timeline_status _result = OPENBEXI_Timeline.timeline_statusHelper.read(_is);
				return _result;
			}
			catch( org.omg.CORBA.portable.RemarshalException _rx ){}
			catch( org.omg.CORBA.portable.ApplicationException _ax )
			{
				String _id = _ax.getId();
					try
					{
							_ax.getInputStream().close();
					}
					catch (java.io.IOException e)
					{
					throw new RuntimeException("Unexpected exception " + e.toString() );
					}
				throw new RuntimeException("Unexpected exception " + _id );
			}
			finally
			{
				if (_os != null)
				{
					try
					{
						_os.close();
					}
					catch (java.io.IOException e)
					{
					throw new RuntimeException("Unexpected exception " + e.toString() );
					}
				}
				this._releaseReply(_is);
			}
		}
		else
		{
			org.omg.CORBA.portable.ServantObject _so = _servant_preinvoke( "update_Timeline_sessions", _opsClass );
			if( _so == null )
				throw new org.omg.CORBA.UNKNOWN("local invocations not supported!");
			OPENBEXI_timeline_orbOperations _localServant = (OPENBEXI_timeline_orbOperations)_so.servant;
			OPENBEXI_Timeline.timeline_status _result;
			try
			{
				_result = _localServant.update_Timeline_sessions(id,res);
			}
			finally
			{
				_servant_postinvoke(_so);
			}
			return _result;
		}

		}

	}

	public OPENBEXI_Timeline.timeline_status update_Timeline_ressources(java.lang.String id, OPENBEXI_Timeline.resource[] res)
	{
		while(true)
		{
		if(! this._is_local())
		{
			org.omg.CORBA.portable.InputStream _is = null;
			org.omg.CORBA.portable.OutputStream _os = null;
			try
			{
				_os = _request( "update_Timeline_ressources", true);
				_os.write_wstring(id);
				OPENBEXI_Timeline.resourcesHelper.write(_os,res);
				_is = _invoke(_os);
				OPENBEXI_Timeline.timeline_status _result = OPENBEXI_Timeline.timeline_statusHelper.read(_is);
				return _result;
			}
			catch( org.omg.CORBA.portable.RemarshalException _rx ){}
			catch( org.omg.CORBA.portable.ApplicationException _ax )
			{
				String _id = _ax.getId();
					try
					{
							_ax.getInputStream().close();
					}
					catch (java.io.IOException e)
					{
					throw new RuntimeException("Unexpected exception " + e.toString() );
					}
				throw new RuntimeException("Unexpected exception " + _id );
			}
			finally
			{
				if (_os != null)
				{
					try
					{
						_os.close();
					}
					catch (java.io.IOException e)
					{
					throw new RuntimeException("Unexpected exception " + e.toString() );
					}
				}
				this._releaseReply(_is);
			}
		}
		else
		{
			org.omg.CORBA.portable.ServantObject _so = _servant_preinvoke( "update_Timeline_ressources", _opsClass );
			if( _so == null )
				throw new org.omg.CORBA.UNKNOWN("local invocations not supported!");
			OPENBEXI_timeline_orbOperations _localServant = (OPENBEXI_timeline_orbOperations)_so.servant;
			OPENBEXI_Timeline.timeline_status _result;
			try
			{
				_result = _localServant.update_Timeline_ressources(id,res);
			}
			finally
			{
				_servant_postinvoke(_so);
			}
			return _result;
		}

		}

	}

	public OPENBEXI_Timeline.timeline_status delete_Timeline_sessions(java.lang.String id, OPENBEXI_Timeline.session[] res)
	{
		while(true)
		{
		if(! this._is_local())
		{
			org.omg.CORBA.portable.InputStream _is = null;
			org.omg.CORBA.portable.OutputStream _os = null;
			try
			{
				_os = _request( "delete_Timeline_sessions", true);
				_os.write_wstring(id);
				OPENBEXI_Timeline.sessionsHelper.write(_os,res);
				_is = _invoke(_os);
				OPENBEXI_Timeline.timeline_status _result = OPENBEXI_Timeline.timeline_statusHelper.read(_is);
				return _result;
			}
			catch( org.omg.CORBA.portable.RemarshalException _rx ){}
			catch( org.omg.CORBA.portable.ApplicationException _ax )
			{
				String _id = _ax.getId();
					try
					{
							_ax.getInputStream().close();
					}
					catch (java.io.IOException e)
					{
					throw new RuntimeException("Unexpected exception " + e.toString() );
					}
				throw new RuntimeException("Unexpected exception " + _id );
			}
			finally
			{
				if (_os != null)
				{
					try
					{
						_os.close();
					}
					catch (java.io.IOException e)
					{
					throw new RuntimeException("Unexpected exception " + e.toString() );
					}
				}
				this._releaseReply(_is);
			}
		}
		else
		{
			org.omg.CORBA.portable.ServantObject _so = _servant_preinvoke( "delete_Timeline_sessions", _opsClass );
			if( _so == null )
				throw new org.omg.CORBA.UNKNOWN("local invocations not supported!");
			OPENBEXI_timeline_orbOperations _localServant = (OPENBEXI_timeline_orbOperations)_so.servant;
			OPENBEXI_Timeline.timeline_status _result;
			try
			{
				_result = _localServant.delete_Timeline_sessions(id,res);
			}
			finally
			{
				_servant_postinvoke(_so);
			}
			return _result;
		}

		}

	}

	public OPENBEXI_Timeline.resource[] get_Timeline_ressources(java.lang.String id)
	{
		while(true)
		{
		if(! this._is_local())
		{
			org.omg.CORBA.portable.InputStream _is = null;
			org.omg.CORBA.portable.OutputStream _os = null;
			try
			{
				_os = _request( "get_Timeline_ressources", true);
				_os.write_wstring(id);
				_is = _invoke(_os);
				OPENBEXI_Timeline.resource[] _result = OPENBEXI_Timeline.resourcesHelper.read(_is);
				return _result;
			}
			catch( org.omg.CORBA.portable.RemarshalException _rx ){}
			catch( org.omg.CORBA.portable.ApplicationException _ax )
			{
				String _id = _ax.getId();
					try
					{
							_ax.getInputStream().close();
					}
					catch (java.io.IOException e)
					{
					throw new RuntimeException("Unexpected exception " + e.toString() );
					}
				throw new RuntimeException("Unexpected exception " + _id );
			}
			finally
			{
				if (_os != null)
				{
					try
					{
						_os.close();
					}
					catch (java.io.IOException e)
					{
					throw new RuntimeException("Unexpected exception " + e.toString() );
					}
				}
				this._releaseReply(_is);
			}
		}
		else
		{
			org.omg.CORBA.portable.ServantObject _so = _servant_preinvoke( "get_Timeline_ressources", _opsClass );
			if( _so == null )
				throw new org.omg.CORBA.UNKNOWN("local invocations not supported!");
			OPENBEXI_timeline_orbOperations _localServant = (OPENBEXI_timeline_orbOperations)_so.servant;
			OPENBEXI_Timeline.resource[] _result;
			try
			{
				_result = _localServant.get_Timeline_ressources(id);
			}
			finally
			{
				_servant_postinvoke(_so);
			}
			return _result;
		}

		}

	}

	public OPENBEXI_Timeline.timeline_status update_Timeline_css(java.lang.String id, OPENBEXI_Timeline.css properties)
	{
		while(true)
		{
		if(! this._is_local())
		{
			org.omg.CORBA.portable.InputStream _is = null;
			org.omg.CORBA.portable.OutputStream _os = null;
			try
			{
				_os = _request( "update_Timeline_css", true);
				_os.write_wstring(id);
				OPENBEXI_Timeline.cssHelper.write(_os,properties);
				_is = _invoke(_os);
				OPENBEXI_Timeline.timeline_status _result = OPENBEXI_Timeline.timeline_statusHelper.read(_is);
				return _result;
			}
			catch( org.omg.CORBA.portable.RemarshalException _rx ){}
			catch( org.omg.CORBA.portable.ApplicationException _ax )
			{
				String _id = _ax.getId();
					try
					{
							_ax.getInputStream().close();
					}
					catch (java.io.IOException e)
					{
					throw new RuntimeException("Unexpected exception " + e.toString() );
					}
				throw new RuntimeException("Unexpected exception " + _id );
			}
			finally
			{
				if (_os != null)
				{
					try
					{
						_os.close();
					}
					catch (java.io.IOException e)
					{
					throw new RuntimeException("Unexpected exception " + e.toString() );
					}
				}
				this._releaseReply(_is);
			}
		}
		else
		{
			org.omg.CORBA.portable.ServantObject _so = _servant_preinvoke( "update_Timeline_css", _opsClass );
			if( _so == null )
				throw new org.omg.CORBA.UNKNOWN("local invocations not supported!");
			OPENBEXI_timeline_orbOperations _localServant = (OPENBEXI_timeline_orbOperations)_so.servant;
			OPENBEXI_Timeline.timeline_status _result;
			try
			{
				_result = _localServant.update_Timeline_css(id,properties);
			}
			finally
			{
				_servant_postinvoke(_so);
			}
			return _result;
		}

		}

	}

	public void print(OPENBEXI_Timeline.timeline[] timelines)
	{
		while(true)
		{
		if(! this._is_local())
		{
			org.omg.CORBA.portable.InputStream _is = null;
			org.omg.CORBA.portable.OutputStream _os = null;
			try
			{
				_os = _request( "print", true);
				OPENBEXI_Timeline.timelinesHelper.write(_os,timelines);
				_is = _invoke(_os);
				return;
			}
			catch( org.omg.CORBA.portable.RemarshalException _rx ){}
			catch( org.omg.CORBA.portable.ApplicationException _ax )
			{
				String _id = _ax.getId();
					try
					{
							_ax.getInputStream().close();
					}
					catch (java.io.IOException e)
					{
					throw new RuntimeException("Unexpected exception " + e.toString() );
					}
				throw new RuntimeException("Unexpected exception " + _id );
			}
			finally
			{
				if (_os != null)
				{
					try
					{
						_os.close();
					}
					catch (java.io.IOException e)
					{
					throw new RuntimeException("Unexpected exception " + e.toString() );
					}
				}
				this._releaseReply(_is);
			}
		}
		else
		{
			org.omg.CORBA.portable.ServantObject _so = _servant_preinvoke( "print", _opsClass );
			if( _so == null )
				throw new org.omg.CORBA.UNKNOWN("local invocations not supported!");
			OPENBEXI_timeline_orbOperations _localServant = (OPENBEXI_timeline_orbOperations)_so.servant;
			try
			{
				_localServant.print(timelines);
			}
			finally
			{
				_servant_postinvoke(_so);
			}
			return;
		}

		}

	}

}
