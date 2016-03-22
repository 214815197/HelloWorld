package com.syncdb.utils;

/**
 * ajax消息对象.
 *
 * @author yaoyao<yaogaoyu@163.com>
 * @date 16/3/5
 */
public class AjaxMsgBean {
    /**
     * 0 为失败，非0为成功
     */
    private String code;

    /**
     * 返回的信息
     */
    private String msg;

    /**
     * 返回的数据
     */
    private Object data;

    /**
     * 构造函数
     */
    public AjaxMsgBean() {
        this("");
    }

    /**
     * 构造函数
     *
     * @param code 0 为失败，非0为成功
     */
    public AjaxMsgBean(String code) {
        this(code, "");
    }

    /**
     * 构造函数
     *
     * @param code 0 为失败，非0为成功
     * @param msg  返回的信息
     */
    public AjaxMsgBean(String code, String msg) {
        this(code, msg, null);
    }

    /**
     * 构造函数
     *
     * @param code 0 为失败，非0为成功
     * @param msg  返回的信息
     * @param data 返回的数据
     */
    public AjaxMsgBean(String code, String msg, Object data) {
        this.code = code;
        this.msg = msg;
        this.data = data;
    }

    /**
     * 返回信息码
     *
     * @return String "0" 为错误，非"0"为正确
     */
    public String getCode() {
        return code;
    }

    /**
     * 设置返回码
     *
     * @param code "0" 为错误，非"0"为正确
     */
    public void setCode(String code) {
        this.code = code;
    }

    /**
     * 返回消息
     *
     * @return String
     */
    public String getMsg() {
        return msg;
    }

    /**
     * 设置消息
     *
     * @param msg
     */
    public void setMsg(String msg) {
        this.msg = msg;
    }

    /**
     * 返回数据
     *
     * @return Object
     */
    public Object getData() {
        return data;
    }

    /**
     * 设置数据
     *
     * @param Object
     */
    public void setData(Object data) {
        this.data = data;
    }
}
