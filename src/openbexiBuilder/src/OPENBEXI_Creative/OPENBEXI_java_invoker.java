package OPENBEXI_Creative;

import org.w3c.dom.Document;

import java.lang.reflect.Method;


/**
 * Created by IntelliJ IDEA.
 * User: HP_Administrator
 * Date: Feb 22, 2009
 * Time: 7:24:01 AM
 * To change this template use File | Settings | File Templates.
 */
public class OPENBEXI_java_invoker {
    private Document function(String name, Object[] pars) {
        Document doc = null;
        try {
            Class c = Class.forName("http://www.openbexi.com/lib/OPENBEXI_package.class");
            String s = c.getName();
            Method[] m = c.getMethods();

            Method func = c.getMethod(name, new Class[]{String.class});
            Class type = func.getReturnType();
            Class typePars[] = func.getParameterTypes();
            Object strR = func.invoke(c.newInstance(), pars);
            System.out.println(strR);
        } catch (Exception e) {
            System.out.println(e);
        }
        return doc;
    }

    public static void main(final String[] args) {
        OPENBEXI_java_invoker invoker = new OPENBEXI_java_invoker();
        Object[] pars = {new String("OK")};
        Document doc = invoker.function("test1", pars);
    }
}
