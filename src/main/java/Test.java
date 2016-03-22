import java.net.InetAddress;
import java.util.Iterator;
import java.util.Properties;
import java.util.Set;

/**
 * Test.
 *
 * @author yaoyao<yaogaoyu@qq.com>
 * @date 16/3/12
 */
public class Test {
    public static void main (String[] srgs) {
        InetAddress addr = null;
        String address = "";
        try {
            addr = InetAddress.getLocalHost();//新建一个InetAddress类
            address = addr.getHostName().toString();// 获得本机名称
        } catch (Exception e) {
            e.printStackTrace();
        }
        System.out.println(address);
    }
}
