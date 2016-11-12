
SET CATALINA_HOME=apache-tomcat-embed
SET CATALINA_TMPDIR=apache-tomcat-embed\temp
SET JWEBSOCKET_HOME=apache-tomcat-embed

"jre\jre\bin\java" -classpath "apache-tomcat-embed\webapps\OPENBEXI_Creative\WEB-INF\classes;apache-tomcat-embed\webapps\OPENBEXI_Creative\WEB-INF\lib\commons-logging.jar;apache-tomcat-embed\webapps\OPENBEXI_Creative\WEB-INF\lib\pdf;apache-tomcat-embed\webapps\OPENBEXI_Creative\WEB-INF\lib\jsoup-1.7.3.jar;apache-tomcat-embed\webapps\OPENBEXI_Creative\WEB-INF\lib\csvjdbc.jar;apache-tomcat-embed\webapps\OPENBEXI_Creative\WEB-INF\lib\edtftpj.jar;apache-tomcat-embed\webapps\OPENBEXI_Creative\WEB-INF\lib\jcommon-1.0.16.jar;apache-tomcat-embed\webapps\OPENBEXI_Creative\WEB-INF\lib\jfreechart-1.0.13.jar;apache-tomcat-embed\webapps\OPENBEXI_Creative\WEB-INF\lib\hsqldb.jar;apache-tomcat-embed\webapps\OPENBEXI_Creative\WEB-INF\lib\mysql-connector-java-5.0.4-bin.jar;apache-tomcat-embed\lib\ecj-4.2.2.jar;apache-tomcat-embed\lib\tomcat-dbcp.jar;apache-tomcat-embed\lib\tomcat-embed-core.jar;apache-tomcat-embed\lib\tomcat-embed-jasper.jar;apache-tomcat-embed\lib\tomcat-embed-logging-juli.jar;apache-tomcat-embed\lib\tomcat-embed-logging-log4j.jar;" OPENBEXI_Creative.EmbeddedTomcat -p 8282 -mode display -tomcat_version 7



pause