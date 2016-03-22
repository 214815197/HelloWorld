package com.syncdb.service;

import com.syncdb.bean.SyncdbApplication;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.jumpmind.symmetric.model.Node;
import org.jumpmind.symmetric.model.RegistrationRequest;
import org.jumpmind.symmetric.service.INodeService;
import org.jumpmind.symmetric.service.impl.NodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 从库/子库操作业务逻辑类.
 *
 * @author yaoyao<yaogaoyu@qq.com>
 * @date 16/3/15
 */
@Service
public class NodesService implements INodesService {
    @Autowired
    private SyncdbApplication syncdbApp;

    protected final Log logger = LogFactory.getLog(getClass());

    private List<RegistrationRequest> registrationRequestList;
    /**
     * 获取所有已注册的节点信息
     * @return List\<Map\>
     */
    public List<Map> getAllNodes() {
        syncdbApp.getEngine().clearCaches();
        INodeService jumpNodeService = syncdbApp.getEngine().getNodeService();
        ((NodeService)jumpNodeService).clearCache();
        Map heartbeatsMap = jumpNodeService.findLastHeartbeats();
        List<Node> nodeList = jumpNodeService.findAllNodes();
        List<Map> result = new ArrayList<Map>();
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        for(Node node: nodeList ){
            Map nodeInfo = new HashMap();
            nodeInfo.put("nodeId", node.getNodeId());
            nodeInfo.put("externalId", node.getExternalId());
            nodeInfo.put("group", node.getNodeGroupId());
            nodeInfo.put("isRegistration", isRegisted(node.getNodeGroupId(), node.getExternalId()));
            String heartbeats = "";
            if (null != heartbeatsMap.get(node.getNodeId())) {
                Timestamp ts = (Timestamp) (heartbeatsMap.get(node.getNodeId()));
                heartbeats = df.format(ts);
            }
            nodeInfo.put("lastHeartbeats", heartbeats);
            nodeInfo.put("syncUrl", node.getSyncUrl());
            nodeInfo.put("database", node.getDatabaseType());
            nodeInfo.put("dbVersion", node.getDatabaseVersion());
            result.add(nodeInfo);
        }
        return result;
    }

    /**
     * 获取所有未注册的节点信息(服务端使用)
     *
     * @return List\<RegistrationRequest\>
     */
    @Override
    public List<RegistrationRequest> getUnregistrationRequests() {
        registrationRequestList = syncdbApp.getEngine().getRegistrationService().getRegistrationRequests(true);
        return registrationRequestList;
    }

    /**
     * 允许注册请求(服务端使用)
     *
     * @param nodeExternalIdList 请求注册的从库子节点ID集合
     * @return boolean 注册是否成功
     */
    @Override
    public boolean allowRegistrationRequest(List<String> nodeExternalIdList) {
        for (String exId : nodeExternalIdList) {
            allowRegistrationRequest(exId);
        }
        return true;
    }

    /**
     * 拒绝注册请求(服务端使用)
     *
     * @param nodeExternalIdList 请求注册的从库子节点ID集合
     * @return boolean 是否成功拒绝注册
     */
    @Override
    public boolean refuseRegistrationRequest(List<String> nodeExternalIdList) {
        for (String exId : nodeExternalIdList) {
            refuseRegistrationRequest(exId);
        }
        return true;
    }

    /**
     * 当前从库是否已注册
     * @param nodeGroupId 节点所在组ID
     * @param externalId 节点唯一ID
     * @return boolean
     */
    @Override
    public boolean isRegisted(String nodeGroupId, String externalId) {
        return syncdbApp.getEngine().getNodeService().isExternalIdRegistered(nodeGroupId, externalId);
    }

    /**
     * 当前当前节点的节点名
     *
     * @return String
     */
    @Override
    public String getExternalId() {
        return syncdbApp.getEngine().getNodeService().findIdentityNodeId();
    }

    /**
     * 允许注册请求(服务端使用)
     *
     * @param externalId 请求的子库ID
     * @return boolean 注册是否成功
     */
    private boolean allowRegistrationRequest(String externalId) {
        String nodeGroupId = SyncdbApplication.ENGINE_CLIENT_GROUP;
        RegistrationRequest regReq = null;
        for (RegistrationRequest req : registrationRequestList) {
            if (req.getExternalId().equals(externalId)) {
                regReq = req;
                break;
            }
        }
        String nodeId = syncdbApp.getEngine().getRegistrationService().openRegistration(nodeGroupId, externalId, regReq.getHostName(), regReq.getIpAddress());
//            regReq.setStatus(RegistrationRequest.RegistrationStatus.OK);
//            syncdbApp.getEngine().getRegistrationService().saveRegistrationRequest(regReq);
//            Node foundNode = syncdbApp.getEngine().getNodeService().findNode(nodeId);
//            foundNode.setSyncEnabled(true);
//            syncdbApp.getEngine().getNodeService().save(foundNode);
        if(syncdbApp.getEngine().getParameterService().is("auto.reload")) {
            syncdbApp.getEngine().getNodeService().setInitialLoadEnabled(nodeId, true, false, -1L, "registration");
        }

        if(syncdbApp.getEngine().getParameterService().is("auto.reload.reverse")) {
            syncdbApp.getEngine().getNodeService().setReverseInitialLoadEnabled(nodeId, true, false, -1L, "registration");
        }

        logger.info("同意子节点注册请求成功。externalId=" + externalId + ", nodeGroupId=" + nodeGroupId);
        return true;
    }

    /**
     * 拒绝注册请求(服务端使用)
     *
     * @param externalId 请求的从库ID
     * @return boolean 是否成功拒绝注册
     */
    private void refuseRegistrationRequest(String externalId) {
        List<RegistrationRequest> unregistrationReq = getUnregistrationRequests();
        RegistrationRequest exReq = null;
        for (RegistrationRequest req : unregistrationReq) {
            if (req.getExternalId().equals(externalId)) {
                exReq = req;
                break;
            }
        }
        if (null == exReq) return ;
        syncdbApp.getEngine().getRegistrationService().deleteRegistrationRequest(exReq);
    }
}
