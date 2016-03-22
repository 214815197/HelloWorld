/**
 * 节点管理页面功能脚本
 * @author    姚尧 <yaogaoyu@qq.com>
 */
var _nodes = function() {
    var contextPath = $("#p").attr("ref");
    var alertDialog = {
        title: '提示',
        okValue: '确定',
        ok: function() {}
    };
    var confirmDialog = {
        title: '请确定',
        okValue: '确定',
        cancelValue: '取消',
        cancel: function() {}
    };

    var prompt = dialog({
        content: "<span class='col loading'>请稍候，正在等待处理结果。</span><img class='col loading' src='"+contextPath + "/s/images/loading.gif"+"'>",
        cancel: false
    });
    /**
     * 初始化节点管理页面方法
     */
    this.perform = function () {
        nodeGroup = $(".nodePanel").attr("class").match(/\s\S+/)[0].replace(/^\s+/, "");
        if (nodeGroup == "master") {
            performMaster();
        } else {
            performSlaver();
        }
    };

    // 清除服务端和客户端的公共事件
    var clearCommonEvents = function() {
        $(".selectBtn").unbind("click");
        $(".nodeRow:not(.serverNode)").unbind("click");
    };

     // 清除服务端和客户端的公共事件
    var addCommonEvents = function() {
        // 全选按钮添加点击事件
        $(".selectBtn").click(function (ev) {
            ev.preventDefault();
            // ev.stopPropagation();
            toggleSelectAll();
        });
        // 表格中的行点击事件
        $(".nodeRow:not(.serverNode .hide)").click(function(ev) {
            ev.preventDefault();
            // ev.stopPropagation();
            toggleSelectRow($(this));
        });
    };

    /**
     * 主库节点管理页面初始化方法
     */
    var performMaster = function() {
        addCommonEvents();
        // 展开按钮
        $(".operationBtn").click(function(ev) {
            ev.preventDefault();
            ev.stopPropagation();
            toggleOperaBtns();
        });
        // 空白处关闭
        $(document).click(function(ev) {
            ev.preventDefault();
            ev.stopPropagation();
            $(".operationFuncs").addClass("hide");
        });

        // 注册通过按钮点击事件
        $(".passBtn").click(function(ev) {
            ev.stopPropagation();
            ev.preventDefault();
            passRegistration();
        });

        // 注册拒绝通过按钮点击事件
        $(".refuseBtn").click(function(ev) {
            ev.stopPropagation();
            ev.preventDefault();
            refuseRegistration();
        });

        // 删除子节点按钮
        $(".delNodeBtn").click(function(ev) {
            ev.stopPropagation();
            ev.preventDefault();
            delChildrenNodes();
        });

        // 实时监控注册请求
        moniteRegistedRequest();
        var monite = setInterval(function(){
            moniteRegistedRequest();
        }, 1000 * 30);

        // 实时监控注册请求
        var autoRefresh = setInterval(function(){
            refreshNodes();
        }, 1000 * 30);
    };

    /**
     * 从库节点管理页面初始化方法
     */
    var performSlaver = function() {

    };

    /**
     * 选中全部/取消选中按钮功能
     */
    var toggleSelectAll = function() {
        var checkbox = $($(".selectBtn").children(".icon")[0]);
        var text = $($(".selectBtn").children(".btnName")[0]);
        var isChecked = checkbox.attr("class").match(/icon-checkbox-checked/) != null && checkbox.attr("class").match(/icon-checkbox-checked/).length > 0;
        checkbox.removeClass(isChecked ? "icon-checkbox-checked" : "icon-checkbox-unchecked");
        checkbox.addClass(isChecked ? "icon-checkbox-unchecked" : "icon-checkbox-checked");
        text.html(isChecked ? "选择全部" : "取消选择");
        isChecked = !isChecked;
        if (isChecked) {
            $(".nodeRow:not(.serverNode, .hide)").addClass("selected");
        } else {
            $(".nodeRow:not(.serverNode, .hide)").removeClass("selected");
        }
    };

     /**
     * 选中/取消选中行功能
     */
    var toggleSelectRow = function(row) {
        var isSelected = row.attr("class").match(/selected/) != null && row.attr("class").match(/selected/).length > 0;
        row.removeClass(isSelected ? "selected" : "");
        row.addClass(isSelected ? "" : "selected");
    };

    /**
     * 显示/隐藏操作按钮
     */
    var toggleOperaBtns = function() {
        var isShow = !$(".operationFuncs").attr("class").match(/hide/);
        $(".operationFuncs").removeClass(isShow ? "" : "hide");
        $(".operationFuncs").addClass(isShow ? "hide" : "");
    };

    /**
     * 注册通过按钮点击事件
     */
    var passRegistration = function() {
        var selectedUnregisted = getSelectedUnregistedExid();
        if (selectedUnregisted.length == 0) {
            var popup = dialog(alertDialog);
            popup.content("<span class='alert'><span class='icon icon-notification'></span><span class='title'>请至少选择一个未注册的从库节点。</span>");
            popup.showModal();
            return;
        }

        // 取得被选中的从库节点数据
        new Promise(function (resolve, reject) {
            // 弹出窗口确定
            confirmDialog.ok = function () {
                confirm.close();
                prompt.showModal();
                resolve();
            }
            confirmDialog.cancel = function () {
                confirm.close();
                reject();
            }
            var confirm = dialog(confirmDialog);
            confirm.content("<span class='confirm'><span class='icon icon-question'></span><span class='title'>您选中了"+selectedUnregisted.length+"个未注册的从库节点，确定将这些从库节点通过注册吗？</span>");
            confirm.showModal();
        }).then(function(resolve, reject){
            $.post(contextPath + "/nodes/allow", {"nodes": selectedUnregisted}, function(respData) {
                if (respData["code"] == "1") {
                    prompt.close();
                    window.location.reload();
                } else {
                    prompt.content("<span class='col loading'>"+respData['msg']+"</span><img class='col loading' src='"+contextPath + "/s/images/loading.gif'>");
                    setTimeout(function(){
                        prompt.close();
                    }, 2000);
                }
            }, "json");
        })["catch"](function(){});

        toggleOperaBtns();
    };

    /**
     * 注册拒绝通过按钮点击事件
     */
    var refuseRegistration = function() {
        var selectedUnregisted = getSelectedUnregistedExid();
        if (selectedUnregisted.length == 0) {
            var popup = dialog(alertDialog);
            popup.content("<span class='alert'><span class='icon icon-notification'></span><span class='title'>请至少选择一个未注册的从库节点。</span>");
            popup.showModal();
            return;
        }

        // 取得被选中的从库节点数据
        new Promise(function (resolve, reject) {
            // 弹出窗口确定
            confirmDialog.ok = function () {
                confirm.close();
                prompt.showModal();
                resolve();
            }
            confirmDialog.cancel = function () {
                confirm.close();
                reject();
            }
            var confirm = dialog(confirmDialog);
            confirm.content("<span class='confirm'><span class='icon icon-question'></span><span class='title'>您选中了"+selectedUnregisted.length+"个未注册的从库节点，确定拒绝这些从库节点的注册请求吗？</span>");
            confirm.showModal();
        }).then(function(resolve, reject){
            $.post(contextPath + "/nodes/refuse", {"nodes": selectedUnregisted}, function(respData) {
                if (respData["code"] == "1") {
                    prompt.close();
                    window.location.reload();
                } else {
                    prompt.content("<span class='col loading'>"+respData['msg']+"</span><img class='col loading' src='"+contextPath + "/s/images/loading.gif'>");
                    setTimeout(function(){
                        prompt.close();
                    }, 2000);
                }
            }, "json");
        })["catch"](function(){});

        toggleOperaBtns();
    };

    /**
     * 删除从库节点按钮
     */
    var delChildrenNodes = function() {
        // 取得被选中的从库节点数据
        var selectedRegisted = getSelectedRegistedExid();
        if (selectedRegisted.length != 1) {
            var popup = dialog(alertDialog);
            popup.content("<span class='alert'><span class='icon icon-notification'></span><span class='title'>只能选择一个已注册的从库节点进行移除。</span>");
            popup.showModal();
            return;
        }

        new Promise(function (resolve, reject) {
            // 弹出窗口确定
            confirmDialog.ok = function () {
                confirm.close();
                prompt.showModal();
                resolve();
            }
            confirmDialog.cancel = function () {
                confirm.close();
                reject();
            }
            var confirm = dialog(confirmDialog);
            confirm.content("<span class='confirm'><span class='icon icon-question'></span><span class='title'>确定彻底移除选中的从库节点吗？</span>");
            confirm.showModal();
        }).then(function(resolve, reject){
            var ex = selectedRegisted[0];
            $.post(contextPath + "/api/engine/removenode", {"nodeId": ex}, function(respData) {
                prompt.close();
                window.location.reload();
            }, "json");
        })["catch"](function(){
            prompt.close();
        });

        toggleOperaBtns();
    };

    /**
     * 是否有选中数据
     */
    var validate = function() {
        return $(".selected").length > 0;
    };

    /**
     * 获取所有被选中未注册的从库节点ID
     */
    var getSelectedUnregistedExid = function() {
        var selectedRows = $(".selected .ex");
        var exidArr = [];
        for (var j = 0 ; j < selectedRows.length ; j++) {
            var nodeInfo = $(selectedRows[j]).html();
            var exid = nodeInfo.split(",")[0];
            var isRegisted = nodeInfo.split(",")[1] == "true";
            if (!isRegisted) exidArr.push(exid);
        }
        return exidArr;
    };

    /**
     * 获取所有被选中已注册的从库节点ID
     */
    var getSelectedRegistedExid = function() {
        var selectedRows = $(".selected .ex");
        var exidArr = [];
        for (var j = 0 ; j < selectedRows.length ; j++) {
            var nodeInfo = $(selectedRows[j]).html();
            var exid = nodeInfo.split(",")[0];
            var isRegisted = nodeInfo.split(",")[1] == "true";
            if (isRegisted) exidArr.push(exid);
        }
        return exidArr;
    };

    /**
     * 获取所有未注册的从库节点ID
     */
    var getAlldUnregistedExid = function() {
        var childExids = $(".childNode:not(.hide) .ex");
        var exidArr = [];
        for (var j = 0 ; j < childExids.length ; j++) {
            var nodeInfo = $(childExids[j]).html();
            var exid = nodeInfo.split(",")[0];
            var isRegisted = nodeInfo.split(",")[1] == "true";
            if (!isRegisted) exidArr.push(exid);
        }
        return exidArr;
    };

    /**
     * 刷新节点列表
     */
    var refreshNodes = function() {
        $.post(contextPath + "/nodes/refresh", null, function(data){
            var list = data["data"];
            var template = $(".nodeRow.childNode.hide");
            if (list.length > 0 ) {
                $(".childNode:not(.hide):not(.reqReg)").detach();
            }
            for (var x = 0 ; x < list.length ; x++) {
                var rowData = list[x];
                if (rowData["group"] == "master") continue;
                var row = template.clone();
                var col = row.children("span");
                $(col[0]).html(rowData["externalId"]+","+rowData["isRegistration"]);
                $($(col[1]).children("span")[1]).html(rowData["externalId"]);
                $(col[2]).html(rowData["group"] == "master" ? "主库" : "从库");
                $(col[3]).html(rowData["isRegistration"] ? "已注册" : "未注册");
                $(col[4]).html(rowData["lastHeartbeats"]);
                $(col[5]).html(rowData["syncUrl"]);
                $(col[6]).html(rowData["database"]);
                $(col[7]).html(rowData["dbVersion"]);
                row.removeClass("hide");
                template.before(row);
            }
            clearCommonEvents();
            addCommonEvents();
        }, "json");
    };

    /**
     * 监视注册请求
     */
    var moniteRegistedRequest = function() {
        var unregistedExid = getAlldUnregistedExid();
        $.post(contextPath + "/nodes/unregistration", null, function(data){
            var list = data["data"];
            var template = $(".nodeRow.childNode.hide");
            for (var x = 0 ; x < list.length ; x++) {
                var rowData = list[x];
                if (unregistedExid.indexOf(rowData["externalId"]) > -1) continue;
                var row = template.clone();
                var col = row.children("span");
                $(col[0]).html(rowData["externalId"]+",false");
                $($(col[1]).children("span")[1]).html(rowData["externalId"]);
                $(col[2]).html(rowData["nodeGroupId"] == "master" ? "主库" : "从库");
                $(col[3]).html("未注册");
                $(col[4]).html("?");
                $(col[5]).html("?");
                $(col[6]).html("?");
                $(col[7]).html("?");
                row.addClass("reqReg");
                row.removeClass("hide");
                $(".listHeader").after(row);
            }
            clearCommonEvents();
            addCommonEvents();
        }, "json");
    };
}

module.exports = new _nodes();