
SET CATALINA_HOME=apache-tomcat-embed
SET CATALINA_TMPDIR=apache-tomcat-embed\temp

"jre\jre\bin\java" -classpath "apache-tomcat-embed\webapps\OPENBEXI_Creative\WEB-INF\classes;apache-tomcat-embed\webapps\OPENBEXI_Creative\WEB-INF\lib\jsoup-1.7.3.jar;apache-tomcat-embed\webapps\OPENBEXI_Creative\WEB-INF\lib\csvjdbc.jar;apache-tomcat-embed\webapps\OPENBEXI_Creative\WEB-INF\lib\edtftpj.jar;apache-tomcat-embed\webapps\OPENBEXI_Creative\WEB-INF\lib\jfreechart-1.0.13.jar;apache-tomcat-embed\webapps\OPENBEXI_Creative\WEB-INF\lib\hsqldb.jar;apache-tomcat-embed\webapps\OPENBEXI_Creative\WEB-INF\lib\mysql-connector-java-5.0.4-bin.jar;apache-tomcat-embed\lib\ecj-3.7.jar;apache-tomcat-embed\lib\tomcat-dbcp.jar;apache-tomcat-embed\lib\tomcat-embed-core.jar;apache-tomcat-embed\lib\tomcat-embed-jasper.jar;apache-tomcat-embed\lib\tomcat-embed-logging-juli.jar;apache-tomcat-embed\lib\tomcat-embed-logging-log4j.jar;apache-tomcat-embed\lib\jWebSocketServer-Bundle-1.0.jar;" OPENBEXI_Creative.OPENBEXI_Creative_socket_retriever -p 7777



pause