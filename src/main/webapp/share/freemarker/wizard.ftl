<#assign base=request.contextPath />
<!DOCTYPE html>
<html>
<head>
    <#include "/share/freemarker/common/meta.ftl"/>
    <title>同步工具</title>
    <meta name="keywords" content="同步工具"/>
    <meta name="description" content="同步工具">
    <link rel="stylesheet" type="text/css" href="${base}/s/wizard/0.1.0.min.css" />
    <link rel="stylesheet" type="text/css" href="${base}/s/css/font.css" />
    <link rel="stylesheet" type="text/css" href="${base}/s/artDialog/ui-dialog.css" />
    <script id="p" ref="${base}"></script>
</head>
<body>
    <div class="main">
        <div class="wizardContainer">
            <div class="wizard"></div>
        </div>
    </div>
    <script type="text/javascript" src="${base}/s/react/react.min.js"></script>
    <script type="text/javascript" src="${base}/s/jquery-1.8.2.min.js"></script>
    <script type="text/javascript" src="${base}/s/artDialog/dialog-min.js"></script>
    <script type="text/javascript" src="${base}/s/wizard/0.1.0.min.js"></script>
    <script type="text/javascript" language="javascript">
        new require('wizard')();
    </script>
</body>
</html>
