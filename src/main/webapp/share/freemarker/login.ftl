<#assign base=request.contextPath />
<!DOCTYPE html>
<html>
<head>
<#include "/share/freemarker/common/meta.ftl"/>
    <title>同步工具 - 登录</title>
    <meta name="keywords" content="同步工具"/>
    <meta name="description" content="同步工具">
<#include "/share/freemarker/common/resources.ftl"/>
</head>
<body>
<div class="main">
    <div class="loginContainer">
        <div class="wrap panel login">
            <div class="title panelTitle">
                <span>登录</span>
            </div>
            <div class="middle">
                <div class="row">
                    <div class="title">用户名</div>
                    <div class="input">
                        <input type="text" class="uName" />
                    </div>
                </div>
                <div class="row">
                    <div class="title">密码</div>
                    <div class="input">
                        <input type="password" class="uPsw" />
                    </div>
                </div>
            </div>
            <div class="bottom">
                <div class="row">
                    <div class="btn" onClick="window.location.href='${base}/index?s=true'"><p>登录</p></div>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>
