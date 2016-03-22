/**
 * cookie操作类
 * @author    姚尧 <yaogaoyu@qq.com>
 */
var cookie = function () {
    /**
     * 获取指定cooike。
     */
    this.gCookie = function (n) {
        if (!n) return null;
        if (document.cookie.length > 0) {
            var start = document.cookie.indexOf(n + "=");
            if (start != -1) {
                start = start + n.length + 1 ;
                var end = document.cookie.indexOf(";", start);
                if (end == -1) end = document.cookie.length;
                return document.cookie.substring(start, end);
            }
        }
        return null;
    };

    /**
     * 写cooike。
     */
    this.sCookie = function (n, v, t) {
        if (!n || !v) return;
        var val = n + "=" + v + ";";
        //domain=.dahao.de;
        if (t) {
            val += "expires=" + t;
        }
        document.cookie = val + "path=/;";
    };
};

module.exports = new cookie();