package com.syncdb.utils;


import org.apache.commons.lang.StringUtils;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.util.List;
import java.util.Map;

/**
 * JsonHelper.
 *
 * @author yaoyao<yaogaoyu@qq.com>
 * @date 16/3/12
 */
public class JsonHelper {

    /**
     * 将JSON字符串转换成Object
     *
     * @param jsonStr
     * @return Object JSONArray或JSONObject
     */
    public static Object toObject(String jsonStr) {
        try {
            if (StringUtils.isNotBlank(jsonStr)) {
                JSONParser parser = new JSONParser();
                return parser.parse(jsonStr);
            }
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * 将JSON字符串转换成Map
     *
     * @param jsonStr
     * @return JSONObject
     */
    public static Map toMap(String jsonStr) {
        try {
            if (StringUtils.isNotBlank(jsonStr)) {
                JSONParser parser = new JSONParser();
                JSONObject jsonObject = (JSONObject) parser.parse(jsonStr);
                return jsonObject;
            }
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * 将JSON字符串转换成List
     *
     * @param jsonStr json
     * @return JSONArray
     */
    public static List toArray(String jsonStr) {
        try {
            if (StringUtils.isNotBlank(jsonStr)) {
                JSONParser parser = new JSONParser();
                JSONArray jsonArray = (JSONArray) parser.parse(jsonStr);
                return jsonArray;
            }
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * 将map转成JSON字符串
     *
     * @param map JSONObject
     * @return String
     */
    public static String mapToJson(JSONObject map) {
        if (null == map || map.keySet().size() == 0) return "{}";
        return map.toJSONString();
    }

    /**
     * 将arr转成JSON字符串
     *
     * @param arr JSONArray
     * @return String
     */
    public static String arrToJson(JSONArray arr) {
        if (null == arr || arr.size() == 0) return "[]";
        return arr.toJSONString();
    }
}
