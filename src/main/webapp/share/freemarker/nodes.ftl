<#assign base=request.contextPath />
<!DOCTYPE html>
<html class="_nodes">
<head>
<#include "/share/freemarker/common/meta.ftl"/>
    <title>同步工具-节点查看</title>
    <meta name="keywords" content="同步工具-节点查看"/>
    <meta name="description" content="同步工具-节点查看">
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
            <div class="wrap centerWrap"><div class="nodePanel ${nodeType}">
                    <#if nodeType=="master">
                        <#include "/share/freemarker/nodes/master.ftl"/>
                    <#else>
                        <#include "/share/freemarker/nodes/slaver.ftl"/>
                    </#if>
                </div>
            </div>
        </div>
    </div>
</div>
<#include "/share/freemarker/common/scripts.ftl"/>
</body>
</html>
