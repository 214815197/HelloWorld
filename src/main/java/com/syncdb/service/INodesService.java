package com.syncdb.service;

import org.jumpmind.symmetric.model.RegistrationRequest;

import java.util.List;
import java.util.Map;

/**
 * 节点注册信息业务逻辑.
 * 删除子节点功能调用rest api。
 *
 * @author yaoyao<yaogaoyu@qq.com>
 * @date 16/3/5
 */
public interface INodesService {
    /**
     * 获取所有已注册的节点信息
     * @return List\<Map\>
     */
    public List<Map> getAllNodes();

    /**
     * 获取所有请求注册的从库节点信息(服务端使用)
     * @return List\<RegistrationRequest\>
     */
    public List<RegistrationRequest> getUnregistrationRequests();

    /**
     * 允许注册请求(服务端使用)
     * @param nodeExternalIdList 请求注册的从库子节点ID集合
     * @return boolean 注册是否成功
     */
    public boolean allowRegistrationRequest(List<String> nodeExternalIdList);

    /**
     * 拒绝注册请求(服务端使用)
     * @param nodeExternalIdList 请求注册的从库子节点ID集合
     * @return boolean 是否成功拒绝注册
     */
    public boolean refuseRegistrationRequest (List<String> nodeExternalIdList);

    /**
     * 当前从库是否已注册
     * @param externalId 节点唯一ID
     * @param nodeGroupId 节点所在组ID
     * @return boolean
     */
    public boolean isRegisted(String nodeGroupId, String externalId);

    /**
     * 当前当前节点的节点名
     * @return String
     */
    public String getExternalId();


}
