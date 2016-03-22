/**
 * 网站JS入口文件
 * 基于Jquery开发
 * @author    姚尧 <yaogaoyu@qq.com>
 */
var _page = $("html").attr("class");
var _scripts = {
    "_login" : require("./_login"),
    "_state" : require("./_state"),
    "_setting" : require("./_setting"),
    "_nodes" : require("./_nodes"),
    "_sideBar": require("./_sideBar")
};
var attributes = {};
_scripts["_sideBar"].perform();
if (_scripts[_page]) _scripts[_page].perform(attributes);