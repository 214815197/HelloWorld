/**
 * 侧边栏功能脚本
 * @author    姚尧 <yaogaoyu@qq.com>
 */
var sideBar = function () {
    var contextPath = $("#p").attr("ref");
    var cookie = require("./_cookie");
    var isOpen = cookie.gCookie("sideBar.open") ? cookie.gCookie("sideBar.open") == "true" ? true : false : true;
    // 按显示顺序设置模块, 按访问连接取名
    var modules = ["_state", "_nodes", "_setting"];
    var buddle = dialog({
        align: 'right'
    });
    /**
     * 初始化侧边栏方法
     */
    this.perform = function () {
        // 设置侧边栏默认打开状态
        if (!isOpen) {
            $(".sideBar").removeClass(isOpen ? "mini" : "full");
            $(".sideBar").addClass(isOpen ? "full" : "mini");
            $(".centerFrame").removeClass(isOpen ? "miniSideBar" : "fullSideBar");
            $(".centerFrame").addClass(isOpen ? "fullSideBar" : "miniSideBar");
            $(".indent .icon").removeClass(isOpen ? "icon-indent-increase" : "icon-indent-decrease");
            $(".indent .icon").addClass(isOpen ? "icon-indent-decrease" : "icon-indent-increase");
            miniModulehover();
        }
        // 设置默认选中模块
        setActived();
        // 添加侧边栏缩放事件
        $(".indent").click(function () {
            isOpen = !isOpen;
            $(".sideBar").removeClass(isOpen ? "mini" : "full");
            $(".sideBar").addClass(isOpen ? "full" : "mini");
            $(".centerFrame").removeClass(isOpen ? "miniSideBar" : "fullSideBar");
            $(".centerFrame").addClass(isOpen ? "fullSideBar" : "miniSideBar");
            $(".indent .icon").removeClass(isOpen ? "icon-indent-increase" : "icon-indent-decrease");
            $(".indent .icon").addClass(isOpen ? "icon-indent-decrease" : "icon-indent-increase");
            // 侧边栏状态写入cookie
            cookie.sCookie("sideBar.open", isOpen + "");
            // 添加侧边栏模块hover样式
            miniModulehover();
        });
        // 设置侧边栏是否启用
        var isEngineStarted = $(".modules").attr("class").match(/\sstarted$/);
        if (isEngineStarted) {
            enabled();
        }
        //添加模块点击事件
        $(".module").click(function(ev) {
            ev.preventDefault();
            var isDisabled = $(this).attr("class").match(/\sdisable$/);
            if (isDisabled) return;
            var currPage = $("html").attr("class");
            var module = $(this).attr("dt-module");
            if (currPage != module) {
                var href = contextPath + "/";
                var path = module.substr(1);
                if (module == modules[0]) {
                    path = "";
                }
                window.location.href = href + path;
            }
        });
    };

    /**
     * 启用侧边栏
     */
    var enabled = function(){
        $(".module[dt-module != '_state']").removeClass("disable");
    };

    /**
     * 禁用侧边栏
     */
    var disabled = function(){
        $(".module:not[dt-module != '_state']").addClass("disable");
    };

    /**
     * 当前访问页面设置侧边栏样式
     */
    var setActived = function () {
        var currPage = $("html").attr("class");
        var i = modules.indexOf(currPage);
        $($(".module")[i]).addClass("active");
    }
    /**
     * 当侧边栏状态为收缩时，小按钮添加hover事件
     */
    var miniModulehover = function () {
        if (isOpen) {
            $(".module").unbind("hover");
            return ;
        }
        $(".module").hover(function(ev) {
            var title = $($(this).children(".title")[0]).html();
            buddle.content(title);
            buddle.show(ev.target);
        }, function(){
            buddle.close();
        });
    };
};
module.exports=new sideBar();
