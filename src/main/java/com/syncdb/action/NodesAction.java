package com.syncdb.action;

import com.syncdb.bean.SyncdbApplication;
import com.syncdb.service.INodesService;
import com.syncdb.utils.AjaxMsgBean;
import org.jumpmind.symmetric.model.Node;
import org.jumpmind.symmetric.model.RegistrationRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

/**
 * 同步节点配置控制器.
 * 节点查看
 * 新注册节点通知
 *
 * @author yaoyao<yaogaoyu@qq.com>
 * @date 16/3/5
 */
@Controller
public class NodesAction {
    @Autowired
    private INodesService nodesService;

    @Autowired
    private SyncdbApplication syncdbApp;

    /**
     * 刷新子节点列表
     */
    @ResponseBody
    @RequestMapping(value = "/nodes/refresh", method = RequestMethod.POST)
    public AjaxMsgBean refresh() {
        // 节点ID
        List<Map> nodesList = nodesService.getAllNodes();
        AjaxMsgBean ajaxMsgBean = new AjaxMsgBean("1");
        ajaxMsgBean.setData(nodesList);
        return ajaxMsgBean;
    }

    /**
     * 节点操作页面
     */
    @RequestMapping(value = "/nodes", method = RequestMethod.GET)
    public String nodes(HttpServletRequest request) {
        // 节点类型
        String nodeType = (String)request.getSession().getServletContext().getAttribute("group.id");
        // 节点ID
        String externalId = nodesService.getExternalId();//(String)request.getSession().getServletContext().getAttribute("external.id");
        // 节点ID
        List<Map> nodesList = nodesService.getAllNodes();
        request.setAttribute("nodeType", nodeType);
        request.setAttribute("externalId", externalId);
        request.setAttribute("nodesList", nodesList);
        request.setAttribute("isEngineStarted", syncdbApp.isEngStarted() + "");

        return "share/freemarker/nodes.ftl";
    }

    /**
     * 通过注册
     */
    @ResponseBody
    @RequestMapping(value = "/nodes/allow", method = RequestMethod.POST)
    public AjaxMsgBean allow(@RequestParam(value = "nodes[]") List<String> nodes) {
        // 节点列表
        boolean isSuc = nodesService.allowRegistrationRequest(nodes);
        AjaxMsgBean respMsg = new AjaxMsgBean(isSuc ? "1" : "0");
        respMsg.setMsg(isSuc ? "注册从库节点成功" : "注册从库节点失败");
        return respMsg;
    }

    /**
     * 拒绝注册
     */
    @ResponseBody
    @RequestMapping(value = "/nodes/refuse", method = RequestMethod.POST)
    public AjaxMsgBean refuse(@RequestParam(value = "nodes[]") List<String> nodes) {
        // 节点列表
        boolean isSuc = nodesService.refuseRegistrationRequest(nodes);
        AjaxMsgBean respMsg = new AjaxMsgBean(isSuc ? "1" : "0");
        respMsg.setMsg("拒绝注册请求不成功");
        return respMsg;
    }

    /**
     * 删除节点
     */
    @ResponseBody
    @RequestMapping(value = "/nodes/del", method = RequestMethod.POST)
    public AjaxMsgBean delNode(@RequestParam(value = "nodes[]") List<String> nodes) {
        // 节点列表
        boolean isSuc = nodesService.refuseRegistrationRequest(nodes);
        AjaxMsgBean respMsg = new AjaxMsgBean(isSuc ? "1" : "0");
        respMsg.setMsg("拒绝注册请求不成功");
        return respMsg;
    }

    /**
     * 删除节点
     */
    @ResponseBody
    @RequestMapping(value = "/nodes/unregistration", method = RequestMethod.POST)
    public AjaxMsgBean getUnregistrationRequests() {
        // 节点列表
        List<RegistrationRequest> unregistrationList= nodesService.getUnregistrationRequests();
        AjaxMsgBean respMsg = new AjaxMsgBean("1");
        respMsg.setData(unregistrationList);
        return respMsg;
    }
}
