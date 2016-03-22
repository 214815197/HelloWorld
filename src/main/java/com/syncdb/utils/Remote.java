package com.syncdb.utils;

import org.apache.commons.lang.StringUtils;
import org.apache.http.HttpEntity;
import org.apache.http.HttpHeaders;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpRequestBase;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Remote.
 *
 * @author yaoyao<yaogaoyu@qq.com>
 * @date 16/3/12
 */
public class Remote {
    public static final String GET = "get";
    public static final String POST = "post";

    /**
     * 发送http请求
     * @param method Remote.POST或Remote.GET
     * @param url 请求地址
     * @param param post请求的参数
     * @return String
     */
    private static String http (String method, String url, Map param){
        if (StringUtils.isBlank(url)) return "";
        // 创建默认的httpClient实例.
        CloseableHttpClient httpClient = HttpClients.createDefault();
        // 创建httppost
        HttpRequestBase request = new HttpGet(url);
        if (Remote.POST == method) {
            request = new HttpPost(url);
            List formData = new ArrayList();
            if (null != param && param.keySet().size() > 0) {
                Set keySet = param.keySet();
                Iterator it = keySet.iterator();
                while (it.hasNext()) {
                    String key = (String)it.next();
                    formData.add(new BasicNameValuePair(key, (String)param.get(key)));
                }
            }
            try {
                UrlEncodedFormEntity uefEntity = new UrlEncodedFormEntity(formData, "UTF-8");
                ((HttpPost) request).setEntity(uefEntity);
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
                return null;
            }
        }
        // 设置accept
        request.addHeader(HttpHeaders.ACCEPT, "application/json");
        // 设置content-type
        request.addHeader(HttpHeaders.CONTENT_TYPE, "application/json");
        request.addHeader(HttpHeaders.USER_AGENT, "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36");
        CloseableHttpResponse response = null;
        try {
            response = httpClient.execute(request);
            HttpEntity entity = response.getEntity();
            if (entity != null) {
                String respJson = EntityUtils.toString(entity, "UTF-8");
                Pattern pattern = Pattern.compile("\"statusCode\":");
                Matcher matcher = pattern.matcher(respJson);
                if (matcher.find()) {
                    return "";
                }
                return StringUtils.isBlank(respJson) ? "" : respJson;
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (null != response) response.close();
                if (null != httpClient) httpClient.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return "";
    }

    /**
     * 发送post请求
     * @param url 请求地址
     * @param param post请求的参数
     * @return String
     */
    public static String post (String url, Map param) {
        return Remote.http(Remote.POST, url, param);
    }

    /**
     * 发送get请求
     * @param url 请求地址
     * @return String
     */
    public static String get (String url) {
        return Remote.http(Remote.GET, url, null);
    }

    public static void main (String[] args) {
//        System.out.println(Remote.get("http://19.84.10.27:31415/api/engine/status"));
//        System.out.println(Remote.get("http://localhost:8080/dbtool/api/engine/status"));
//        Pattern pat = Pattern.compile("\"statusCode\":");
//        Matcher matcher = pat.matcher("{\"message\":\"111\",\"statusCode\":404}");
//        System.out.println(matcher.find());
//        System.out.println(matcher.matches());
    }

}
