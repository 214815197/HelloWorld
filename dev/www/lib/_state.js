/**
 * state页面功能脚本
 * @author    姚尧 <yaogaoyu@qq.com>
 */
var state = function () {
    var contextPath = $("#p").attr("ref");
    var prompt = dialog({
        content: "<span class='col loading'>请稍候，正在获取服务器状态。</span><img class='col loading' src='"+contextPath + "/s/images/loading.gif"+"'>",
        cancel: false
    });
    var attributes;
    /**
     * 初始化state页面方法
     */
    this.perform = function (attributesParam) {
        attributes = attributesParam;
        status();
    };

    /**
     * 获取服务器状态
     */
    var status = function () {
        var statusFields = ["nodeGroupId", "databaseType", "databaseVersion", "registered", "registrationUrl", "syncUrl"];
        new Promise(function (resolve, reject) {
            // 启动模态窗口
            prompt.showModal();
            // 获取服务器状态
            $.get(contextPath + "/api/engine/status", function(data){
                if (data["started"]) {
                    // 基本信息
                    $(".operaCol .btn").removeClass("off");
                    $(".operaCol .btn").addClass("on");
                    $(".operaCol .btn .icon").removeClass("icon-play2");
                    $(".operaCol .btn .icon").addClass("icon-stop");
                    $(".splitLeft .desc").html("点击停止数据同步服务");
                    $($(".info .infoRow .desc")[0]).html("运行中");
                    $($(".info .infoRow .desc")[1]).html(data["nodeGroupId"] == "master" ? "主库节点" : "从库节点");
                    if (data["nodeGroupId"] == "master") {
                        // 获取节点数量
                        $.get(contextPath + "/api/engine/children", function(nodeData){
                            $($(".info .infoRow .title")[2]).html("从库节点数量");
                            $($(".info .infoRow .desc")[2]).html(nodeData["nodes"] ? nodeData["nodes"].length : 0);
                        }, "json");
                    }
                    // 状态信息
                    var statusRows = $(".status .statusRow");
                    for (var i = 0 ; i < statusRows.length; i++) {
                        var row = $(statusRows[i]);
                        var value = data[statusFields[i]];
                        if (statusFields[i] == "nodeGroupId")  value = value== "master" ? "主库节点" : "从库节点";
                        else if (statusFields[i] == "registered")  value = value ? "已注册" : "未注册";
                        row.children(".desc").html(value);
                    }
                    // return data;
                }
                resolve(data);
            }, "json");
        }).then(function(data){
            // 显示状态信息
            // 添加按钮事件
            if (data["started"]) {
                $(".operaCol .on").click(function(){
                    stop();
                });
            } else {
                $(".operaCol .off").click(function(){
                    start();
                });
            }
            prompt.close();
        })["catch"](function(err){
        });
    };

    var start = function () {
        prompt.content("<span class='col loading'>请稍候，服务器启动中。</span><img class='col loading' src='"+contextPath + "/s/images/loading.gif"+"'>");
        prompt.showModal();
        $.post(contextPath + "/sym/start" , null, function(){
            var startInterval = setInterval(function(){
                $.get(contextPath + "/api/engine/status", function(data){
                    if (data["started"]) {
                        clearInterval(startInterval);
                        window.location.reload();
                    }
                }, "json");
            }, 1000);

        });
    };
    var stop = function () {
        prompt.content("<span class='col loading'>请稍候，服务器停止中。</span><img class='col loading' src='"+contextPath + "/s/images/loading.gif"+"'>");
        prompt.showModal();
        $.post(contextPath + "/sym/stop" , null, function(){
            var stopInterval = setInterval(function(){
                $.get(contextPath + "/api/engine/status", function(data){
                    if (!data["started"]) {
                        clearInterval(stopInterval);
                        window.location.reload();
                    }
                }, "json");
            }, 1000);
        });
    };
    var moniteStarted = function(){

    };
};
module.exports=new state();