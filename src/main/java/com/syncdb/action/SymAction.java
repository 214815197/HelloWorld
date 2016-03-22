package com.syncdb.action;

import com.syncdb.service.ISymService;
import com.syncdb.utils.AjaxMsgBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

/**
 * symmtrics服务处理控制器
 * 启动同步服务
 * 关闭同步服务
 * 查看状态服务
 * @Author 姚尧<yaogaoyu@qq.com>
 */
@Controller
public class SymAction {
    @Autowired
    private ISymService symService;
    /**
     * 启动数据同步服务
     */
    @ResponseBody
    @RequestMapping(value = "/sym/start", method = RequestMethod.POST)
    public AjaxMsgBean start(HttpServletRequest request) {
        symService.start(request.getSession().getServletContext());
        return new AjaxMsgBean("1");
    }

    /**
     * 停止数据同步服务
     */
    @ResponseBody
    @RequestMapping(value = "/sym/stop", method = RequestMethod.POST)
    public AjaxMsgBean stop(HttpServletRequest request) {
        symService.stop();
        return new AjaxMsgBean("1");
    }
}
