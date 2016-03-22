<#assign base=request.contextPath />
<!DOCTYPE html>
<html class="_state">
<head>
<#include "/share/freemarker/common/meta.ftl"/>
    <title>同步工具</title>
    <meta name="keywords" content="同步工具状态"/>
    <meta name="description" content="同步工具状态">
<#include "/share/freemarker/common/resources.ftl"/>
</head>
<body>
<div class="main">
    <div class="container">
        <div class="header">
            <div class="logo">DBTOOL数据同步工具</div>
        </div>
    <#include "/share/freemarker/common/sideBar.ftl"/>
        <div class="centerFrame fullSideBar">
            <div class="wrap centerWrap">
                <div class="operation">
                    <div class="operaCol col splitLeft">
                        <div class="row">
                            <span class="col btn off">
                                    <span class="icon icon-play2"></span>
                            </span>
                        </div>
                        <div class="desc">
                            点击启动数据同步服务
                        </div>
                    </div><div class="operaCol col">
                    <div class="info"><ul class="infoUl">
                        <li class="infoRow"><span class="title col">服务器状态</span><span class="desc col">关闭</span></li>
                        <li class="infoRow"><span class="title col">节点类型</span><span class="desc col"></span></li>
                        <li class="infoRow"><span class="title col"></span><span class="desc col"></span></li>
                    </ul>
                    </div>
                </div>
                </div>
                <div class="status">
                    <ul class="statusUl">
                        <li class="statusRow">
                            <span class="title row">节点类型</span><span class="desc row"></span>
                        </li>
                        <li class="statusRow">
                            <span class="title row">数据库类型</span><span class="desc row"></span>
                        </li>
                        <li class="statusRow">
                            <span class="title row">数据库版本</span><span class="desc row"></span>
                        </li>
                        <li class="statusRow">
                            <span class="title row">注册状态</span><span class="desc row"></span>
                        </li>
                        <li class="statusRow">
                            <span class="title row">节点注册接口URL</span><span class="desc row"></span>
                        </li>
                        <li class="statusRow">
                            <span class="title row">数据同步接口URL</span><span class="desc row"></span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
<#include "/share/freemarker/common/scripts.ftl"/>
</body>
</html>
