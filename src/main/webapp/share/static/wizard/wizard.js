var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 声明哈希表接口规范。
 *
 * @author    姚尧 <yaogaoyu@163.com>
 * @license   GPL-3.0
 * @file      Util/IHashTable.ts
 */
/**
 * 声明视图状态接口规范。
 *
 * @author    姚尧 <yaogaoyu@qq.com>
 * @file      Core/_View/IState.ts
 */
/// <reference path="../../Util/IHashTable.ts" />
/**
 * 声明视图属性接口规范。
 *
 * @author    姚尧 <yaogaoyu@qq.com>
 * @file      Core/_View/IProps.ts
 */
/// <reference path="../../Util/IHashTable.ts" />
/// <reference path="../_Runtime/IFlow.ts" />
/**
 * 声明视图规范。
 *
 * @author    姚尧 <yaogaoyu@qq.com>
 * @file      Core/_View/IView.ts
 */
/// <reference path="../../Util/IHashTable.ts" />
/// <reference path="../../../include/react/react-global.d.ts" />
/// <reference path="IState.ts" />
/// <reference path="IProps.ts" />
/// <reference path="../_Runtime/IFlow.ts" />
/**
 * 声明（运行时）事件元信息接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Core/_Ev/IEventMetas.ts
 */
/**
 * 声明（运行时）事件接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Core/_Ev/IEvent.ts
 */
/// <reference path="IEventMetas.ts" />
/**
 * 声明（运行时）事件监听函数接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Core/_Ev/IEventListener.ts
 */
/// <reference path="IEvent.ts" />
/**
 * 声明（运行时）事件宿主接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Core/_Ev/IEmittable.ts
 */
/// <reference path="IEventListener.ts" />
/**
 * 声明（运行时）业务逻辑流接口规范。
 *
 * @author    姚尧 <yaogaoyu@qq.com>
 * @file      Core/_Runtime/IFlow.ts
 */
/// <reference path="../_View/IView.ts" />
/// <reference path="../_Ev/IEmittable.ts" />
/**
 * 声明数组遍历函数接口规范。
 *
 * @author    姚尧 <yaogaoyu@163.com>
 * @license   GPL-3.0
 * @file      Util/IArrayIterator.ts
 */
/**
 * 声明对象遍历函数接口规范。
 *
 * @author    姚尧 <yaogaoyu@163.com>
 * @license   GPL-3.0
 * @file      Util/IObjectIterator.ts
 */
/// <reference path="IHashTable.ts" />
/**
 * 定义数组类工具方法。
 *
 * @author    姚尧 <yaogaoyu@163.com>
 * @license   GPL-3.0
 * @file      Util/_iterator.ts
 */
/// <reference path="IArrayIterator.ts" />
/// <reference path="IObjectIterator.ts" />
var Util;
(function (Util) {
    function each(obj, cb, $this) {
        $this = $this || {};
        var ii;
        if (obj instanceof Array) {
            if (obj.forEach)
                return obj.forEach(cb, $this);
            for (ii = 0; ii < obj.length; ii++)
                cb.call($this, obj[ii], ii, obj);
            return;
        }
        for (ii in obj)
            if (obj.hasOwnProperty(ii))
                cb.call($this, obj[ii], ii, obj);
    }
    Util.each = each;
    function every(obj, cb, $this) {
        $this = $this || {};
        var ii;
        if (obj instanceof Array) {
            if (obj.every)
                return obj.every(cb, $this);
            for (ii = 0; ii < obj.length; ii++)
                if (!cb.call($this, obj[ii], ii, obj))
                    return false;
        }
        else
            for (ii in obj)
                if (obj.hasOwnProperty(ii) && !cb.call($this, obj[ii], ii, obj))
                    return false;
        return true;
    }
    Util.every = every;
    function some(obj, cb, $this) {
        $this = $this || {};
        var ii;
        if (obj instanceof Array) {
            if (obj.some)
                return obj.some(cb, $this);
            for (ii = 0; ii < obj.length; ii++)
                if (cb.call($this, obj[ii], ii, obj))
                    return true;
        }
        else
            for (ii in obj)
                if (obj.hasOwnProperty(ii) && cb.call($this, obj[ii], ii, obj))
                    return true;
        return false;
    }
    Util.some = some;
    function indexOf(obj, item, offset) {
        if (offset === void 0) { offset = 0; }
        var ii;
        if (obj instanceof Array) {
            if (obj.indexOf)
                return obj.indexOf(item, offset);
            for (ii = offset; ii < obj.length; ii++)
                if (obj[ii] == item)
                    return ii;
        }
        else
            for (ii in obj)
                if (obj.hasOwnProperty(ii) && obj[ii] == item)
                    return ii;
        return -1;
    }
    Util.indexOf = indexOf;
    function clone(orig) {
        if ('object' != typeof orig)
            return orig;
        if (orig instanceof Array)
            return orig.slice(0);
        var dolly = {};
        Util.each(orig, function (value, key) {
            dolly[key] = value;
        });
        return dolly;
    }
    Util.clone = clone;
})(Util || (Util = {}));
/**
 * 定义（运行时）业务逻辑流组件。
 *
 * @author    姚尧 <yaogaoyu@qq.com>
 * @file      Runtime/Flow.ts
 */
/// <reference path="../Core/_Runtime/IFlow.ts" />
/// <reference path="../Util/_iterator.ts" />
var Runtime;
(function (Runtime) {
    var Flow = (function () {
        /**
         * 构造函数。
         */
        function Flow() {
            this.listeners = {};
        }
        /**
         * 获取绑定视图。
         */
        Flow.prototype.gView = function () {
            return this.view;
        };
        /**
         * 设置绑定视图。
         */
        Flow.prototype.sView = function (view) {
            this.view = view;
            return this;
        };
        /**
         * 新增事件监听。
         */
        Flow.prototype.addEventListener = function (type, listener) {
            this.listeners[type] = this.listeners[type] || [];
            var pos = Util.indexOf(this.listeners[type], listener);
            if (-1 == pos)
                this.listeners[type].push(listener);
            return this;
        };
        /**
         * 取消事件监听。
         */
        Flow.prototype.removeEventListener = function (type, listener) {
            this.listeners[type] = this.listeners[type] || [];
            var pos = Util.indexOf(this.listeners[type], listener);
            if (-1 != pos)
                this.listeners[type].splice(pos, 1);
            return this;
        };
        /**
         * 发生事件。
         */
        Flow.prototype.dispatchEvent = function (event) {
            Util.each(this.listeners[event.gType()] || [], function (listener) {
                listener(event);
            });
            return this;
        };
        return Flow;
    }());
    Runtime.Flow = Flow;
})(Runtime || (Runtime = {}));
/**
 * 定义视图抽象组件。
 *
 * @author    姚尧 <yaogaoyu@qq.com>
 * @file      View/View.ts
 */
/// <reference path="../../include/tsd.d.ts" />
/// <reference path="../Core/_View/IView.ts" />
var View;
(function (View_1) {
    var View = (function (_super) {
        __extends(View, _super);
        function View() {
            _super.apply(this, arguments);
        }
        return View;
    }(React.Component));
    View_1.View = View;
})(View || (View = {}));
/**
 * 定义Path信息组件。
 *
 * @author    姚尧 <yaogaoyu@163.com>
 * @license   GPL-3.0
 * @file      Util/Path.ts
 */
var Util;
(function (Util) {
    var Path;
    (function (Path) {
        /**
         * 获取指定部署根目录。
         */
        function gOrigin() {
            var origin = window.location.origin;
            var pathname = window.location.pathname;
            var root = pathname.match(/.*\//)[0];
            return origin + root;
        }
        Path.gOrigin = gOrigin;
    })(Path = Util.Path || (Util.Path = {}));
})(Util || (Util = {}));
/**
 * 配置向导-节点类型选择主视图。
 *
 * @author    姚尧 <yaogaoyu@qq.com>
 * @file      View/NodeChoice.ts
 */
/// <reference path="../View.ts" />
/// <reference path="../../Util/Path.ts" />
var View;
(function (View) {
    var NodeChoice = (function (_super) {
        __extends(NodeChoice, _super);
        function NodeChoice(props) {
            _super.call(this, props);
            this.origin = Util.Path.gOrigin();
            this.props.flow.sView(this);
        }
        NodeChoice.prototype.render = function () {
            var _this = this;
            return React.createElement("div", {className: 'wrap'}, React.createElement("div", {className: 'title'}, "步骤一：节点类型选择"), React.createElement("div", {className: 'desc'}, "选择一个进行同步服务的节点类型"), React.createElement("div", {className: 'formWrap'}, React.createElement("div", {className: 'nodeType'}, React.createElement("span", {className: 'inline type'}, React.createElement("span", {className: 'ibtn typeBtn' + (this.props.config['type'] == 'master' ? ' selected' : ''), onClick: function (evt) { _this.choice(evt, 'master'); }}, React.createElement("img", {src: this.origin + 's/images/node.png'}))), React.createElement("span", {className: 'inline type typeName'}, "Master"), React.createElement("span", {className: 'inline type desc'}, "主库节点，每个注册到此主节点上的从库节点将使用主库节点提供的服务进行数据同步。")), React.createElement("div", {className: 'nodeType'}, React.createElement("span", {className: 'inline type'}, React.createElement("span", {className: 'ibtn typeBtn' + (this.props.config['type'] == 'slaver' ? ' selected' : ''), onClick: function (evt) { _this.choice(evt, 'slaver'); }}, React.createElement("img", {src: this.origin + 's/images/node.png'}))), React.createElement("span", {className: 'inline type typeName'}, "Slaver"), React.createElement("span", {className: 'inline type desc'}, "从库节点，连接主库节点，与所有注册在主库节点上的从库节点进行数据同步。"))));
        };
        NodeChoice.prototype.choice = function (ev, type) {
            if (!type)
                return;
            this.props.flow.choiceType(type);
            this.forceUpdate();
            // 发送事件到stage进行下一个步骤
        };
        return NodeChoice;
    }(View.View));
    View.NodeChoice = NodeChoice;
})(View || (View = {}));
/**
 * 配置向导-数据库配置主视图。
 *
 * @author    姚尧 <yaogaoyu@qq.com>
 * @file      View/ConfigDB.ts
 */
/// <reference path="../View.ts" />
var View;
(function (View) {
    var ConfigDB = (function (_super) {
        __extends(ConfigDB, _super);
        function ConfigDB(props) {
            var _this = this;
            _super.call(this, props);
            this.databases = {
                'Oracle': { 'driver': '', 'url': 'jdbc:oracle:thin:@127.0.0.1:1521:databasename' },
                'SQL Server': { 'driver': '', 'url': 'jdbc:jtds:sqlserver://hostname/databasename;useCursors=true;bufferMaxMemory=10240;lobBuffer=5242880;socketTimeout=300;appName=syncdb' },
                'DB2': { 'driver': '', 'url': 'jdbc:db2://hostname:50000/databasename' },
                'Mysql': { 'driver': '', 'url': 'jdbc:mysql://hostname/databasename?tinyInt1isBit=false&zeroDateTimeBehavior=convertToNull' },
                'Infomix': { 'driver': '', 'url': 'jdbc:informix-sqli://hostname:9088/databasename:INFORMIXSERVER=ol_ids_1150_1' }
            };
            this.dbOptions = [];
            this.props.flow.sView(this);
            Util.each(this.databases, function (info, dbName) {
                _this.dbOptions.push(React.createElement("option", {value: dbName}, dbName));
            });
        }
        ConfigDB.prototype.render = function () {
            return React.createElement("div", {className: 'wrap'}, React.createElement("div", {className: 'title'}, "步骤二：数据库连接配置"), React.createElement("div", {className: 'desc'}, "数据库配置完成后请先测试连接，测试成功才能进行下一步。"), React.createElement("div", {className: 'formWrap'}, React.createElement("div", {className: 'row'}, React.createElement("div", {className: 'title'}, "数据库"), React.createElement("div", {className: 'input'}, React.createElement("select", {className: 'sel dbType'}, React.createElement("option", {value: "-1"}, "请选择数据库"), this.dbOptions))), React.createElement("div", {className: 'row'}, React.createElement("div", {className: 'title'}, "数据库连接"), React.createElement("div", {className: 'input'}, React.createElement("input", {type: 'text', className: 'text dbInput'}))), React.createElement("div", {className: 'row'}, React.createElement("div", {className: 'title'}, "用户名"), React.createElement("div", {className: 'input'}, React.createElement("input", {type: 'text', className: 'text dbUser'}))), React.createElement("div", {className: 'row'}, React.createElement("div", {className: 'title'}, "密码"), React.createElement("div", {className: 'input'}, React.createElement("input", {type: 'password', className: 'text dbPsw'})))));
        };
        return ConfigDB;
    }(View.View));
    View.ConfigDB = ConfigDB;
})(View || (View = {}));
/**
 * 配置向导-节点注册主视图。
 *
 * @author    姚尧 <yaogaoyu@qq.com>
 * @file      View/RegisteInfo.ts
 */
/// <reference path="../View.ts" />
var View;
(function (View) {
    var RegisteInfo = (function (_super) {
        __extends(RegisteInfo, _super);
        function RegisteInfo(props) {
            _super.call(this, props);
            this.props.flow.sView(this);
        }
        RegisteInfo.prototype.render = function () {
            return React.createElement("div", {className: 'wrap'}, React.createElement("div", {className: 'title'}, "步骤三：节点注册信息"), this.props['type'] == 'master' ?
                React.createElement("div", {className: 'desc'}, "连接到此主库节点的从库节点将使用此URL进行节点注册") :
                React.createElement("div", {className: 'desc'}, "请填写主库节点的注册URL"), React.createElement("div", {className: 'formWrap'}, this.props.config['type'] == 'master' ?
                React.createElement("div", {className: 'row'}, React.createElement("div", {className: 'title'}, "连接到此主库节点的从库节点将使用此URL进行节点注册")) :
                React.createElement("div", {className: 'row'}, React.createElement("div", {className: 'title'}, "注册主库的URL"), React.createElement("div", {className: 'input'}, React.createElement("input", {type: 'text', className: 'text url'})))));
        };
        return RegisteInfo;
    }(View.View));
    View.RegisteInfo = RegisteInfo;
})(View || (View = {}));
/**
 * 配置向导-设置用户向导主视图。
 *
 * @author    姚尧 <yaogaoyu@qq.com>
 * @file      View/ConfigUser.ts
 */
/// <reference path="../View.ts" />
var View;
(function (View) {
    var ConfigUser = (function (_super) {
        __extends(ConfigUser, _super);
        function ConfigUser(props) {
            _super.call(this, props);
            this.props.flow.sView(this);
        }
        ConfigUser.prototype.render = function () {
            return React.createElement("div", {className: 'wrap'}, React.createElement("div", {className: 'title'}, "步骤四：注册登录用户"), React.createElement("div", {className: 'desc'}, "注册一个用户登录到本系统"), React.createElement("div", {className: 'formWrap'}, React.createElement("div", {className: 'row'}, React.createElement("div", {className: 'title'}, "用户名"), React.createElement("div", {className: 'input'}, React.createElement("input", {type: 'text', className: 'userName'}))), React.createElement("div", {className: 'row'}, React.createElement("div", {className: 'title'}, "密码"), React.createElement("div", {className: 'input'}, React.createElement("input", {type: 'password', className: 'userPsw'})))));
        };
        return ConfigUser;
    }(View.View));
    View.ConfigUser = ConfigUser;
})(View || (View = {}));
/**
 * 配置向导-完成向导主视图。
 *
 * @author    姚尧 <yaogaoyu@qq.com>
 * @file      View/Finish.ts
 */
/// <reference path="../View.ts" />
var View;
(function (View) {
    var Finish = (function (_super) {
        __extends(Finish, _super);
        function Finish(props) {
            _super.call(this, props);
            this.props.flow.sView(this);
        }
        Finish.prototype.render = function () {
            return React.createElement("div", {className: 'wrap'}, React.createElement("div", {className: 'title'}, "步骤五：完成"), React.createElement("div", {className: 'desc'}, "请使用刚才设置的用户名和密码登录，点击完成跳转到登录页面。"));
        };
        return Finish;
    }(View.View));
    View.Finish = Finish;
})(View || (View = {}));
/**
 * 配置向导引导主视图。
 *
 * @author    姚尧 <yaogaoyu@qq.com>
 * @file      View/Stage.ts
 */
/// <reference path="View.ts" />
/// <reference path="_Steps/NodeChoice.tsx" />
/// <reference path="_Steps/ConfigDB.tsx" />
/// <reference path="_Steps/RegisteInfo.tsx" />
/// <reference path="_Steps/ConfigUser.tsx" />
/// <reference path="_Steps/Finish.tsx" />
var View;
(function (View) {
    var Stage = (function (_super) {
        __extends(Stage, _super);
        function Stage(props) {
            _super.call(this, props);
            this.props.flow.sView(this);
            var flow = this.props.flow;
            this.stepViews = [
                React.createElement(View.NodeChoice, {flow: flow.make('nodeChoice'), config: flow.gConfig()}),
                React.createElement(View.ConfigDB, {flow: flow.make('configDB'), config: flow.gConfig()}),
                React.createElement(View.RegisteInfo, {flow: flow.make('registeInfo'), config: flow.gConfig()}),
                React.createElement(View.ConfigUser, {flow: flow.make('configUser'), config: flow.gConfig()}),
                React.createElement(View.Finish, {flow: flow.make('finish'), config: flow.gConfig()})
            ];
        }
        Stage.prototype.render = function () {
            var flow = this.props.flow;
            var previousStyle = 'btn stageBtn' + (flow.gStepIndex() <= 0 ? ' disabled' : '');
            return React.createElement("div", {className: 'stage'}, React.createElement("div", {className: 'phase top'}, React.createElement("span", {className: 'title'}, "同步工具配置向导")), React.createElement("div", {className: 'phase stageWrap'}, this.stepViews[flow.gStepIndex()]), React.createElement("div", {className: 'phase bottom'}, flow.gStepIndex() == 1 ?
                React.createElement("span", {className: 'left btnWrap'}, React.createElement("span", {className: 'btn stageBtn'}, React.createElement("p", null, "测试连接"))) :
                '', React.createElement("span", {className: 'right btnWrap'}, React.createElement("span", {className: previousStyle, onClick: function (ev) { flow.previous(ev); }}, React.createElement("p", null, "上一步")), flow.gStepIndex() >= 4 ?
                React.createElement("span", {className: 'btn stageBtn', onClick: function (ev) { flow.finish(ev); }}, React.createElement("p", null, "完成")) :
                React.createElement("span", {className: 'btn stageBtn', onClick: function (ev) { flow.next(ev); }}, React.createElement("p", null, "下一步")))));
        };
        return Stage;
    }(View.View));
    View.Stage = Stage;
})(View || (View = {}));
/**
 * 声明引导程序业务流接口规范。
 *
 * @author    姚尧 <yaogaoyu@qq.com>
 * @file      Core/_Runtime/IStageFlow.ts
 */
/// <reference path="IFlow.ts" />
/// <reference path="../_View/IView.ts" />
/**
 * 声明配置完成完成业务流接口规范。
 *
 * @author    姚尧 <yaogaoyu@qq.com>
 * @file      Core/_Runtime/IFinishFlow.ts
 */
/// <reference path="IFlow.ts" />
/// <reference path="../_View/IView.ts" />
/**
 * 声明节点类型选择业务流接口规范。
 *
 * @author    姚尧 <yaogaoyu@qq.com>
 * @file      Core/_Runtime/INodeChoiceFlow.ts
 */
/// <reference path="IStepFlow.ts" />
/// <reference path="../_View/IView.ts" />
/**
 * 节点类型选择实体。
 *
 * @author    姚尧 <yaogaoyu@qq.com>
 * @file      Runtime/NodeChoiceFlow.ts
 */
/// <reference path="../Flow.ts" />
/// <reference path="../../Core/_Runtime/INodeChoiceFlow.ts" />
var Runtime;
(function (Runtime) {
    var NodeChoiceFlow = (function (_super) {
        __extends(NodeChoiceFlow, _super);
        /**
         * 构造函数。
         */
        function NodeChoiceFlow(config) {
            _super.call(this);
            this.config = config;
        }
        /**
         * 节点类型选择业务
         */
        NodeChoiceFlow.prototype.choiceType = function (type) {
            this.config['type'] = type;
        };
        /**
         * 步骤验证
         */
        NodeChoiceFlow.prototype.validate = function () {
            return true;
        };
        return NodeChoiceFlow;
    }(Runtime.Flow));
    Runtime.NodeChoiceFlow = NodeChoiceFlow;
})(Runtime || (Runtime = {}));
/**
 * 声明数据库配置业务流接口规范。
 *
 * @author    姚尧 <yaogaoyu@qq.com>
 * @file      Core/_Runtime/IConfigDBFlow.ts
 */
/// <reference path="IStepFlow.ts" />
/// <reference path="../_View/IView.ts" />
/**
 * 数据库配置实体。
 *
 * @author    姚尧 <yaogaoyu@qq.com>
 * @file      Runtime/ConfigDBFlow.ts
 */
/// <reference path="../Flow.ts" />
/// <reference path="../../Core/_Runtime/IConfigDBFlow.ts" />
var Runtime;
(function (Runtime) {
    var ConfigDBFlow = (function (_super) {
        __extends(ConfigDBFlow, _super);
        /**
         * 构造函数。
         */
        function ConfigDBFlow(config) {
            _super.call(this);
        }
        /**
         * 处理数据库配置业务
         */
        ConfigDBFlow.prototype.save = function (config) {
            //
        };
        /**
         * 步骤验证
         */
        ConfigDBFlow.prototype.validate = function () {
            return true;
        };
        return ConfigDBFlow;
    }(Runtime.Flow));
    Runtime.ConfigDBFlow = ConfigDBFlow;
})(Runtime || (Runtime = {}));
/**
 * 声明节点注册业务流接口规范。
 *
 * @author    姚尧 <yaogaoyu@qq.com>
 * @file      Core/_Runtime/IRegisteInfoFlow.ts
 */
/// <reference path="IStepFlow.ts" />
/// <reference path="../_View/IView.ts" />
/**
 * 节点注册信息实体。
 *
 * @author    姚尧 <yaogaoyu@qq.com>
 * @file      Runtime/RegisteInfoFlow.ts
 */
/// <reference path="../Flow.ts" />
/// <reference path="../../Core/_Runtime/IRegisteInfoFlow.ts" />
var Runtime;
(function (Runtime) {
    var RegisteInfoFlow = (function (_super) {
        __extends(RegisteInfoFlow, _super);
        /**
         * 构造函数。
         */
        function RegisteInfoFlow(config) {
            _super.call(this);
        }
        /**
         * 保存从端设置的同步接口URL
         */
        RegisteInfoFlow.prototype.save = function (type) {
            //
        };
        /**
         * 生成主端的同步接口URL
         */
        RegisteInfoFlow.prototype.genSyncURL = function (type) {
            //
        };
        /**
         * 步骤验证
         */
        RegisteInfoFlow.prototype.validate = function () {
            return true;
        };
        return RegisteInfoFlow;
    }(Runtime.Flow));
    Runtime.RegisteInfoFlow = RegisteInfoFlow;
})(Runtime || (Runtime = {}));
/**
 * 声明保存登录用户业务流接口规范。
 *
 * @author    姚尧 <yaogaoyu@qq.com>
 * @file      Core/_Runtime/IConfigUserFlow.ts
 */
/// <reference path="IStepFlow.ts" />
/// <reference path="../_View/IView.ts" />
/**
 * 生成用户业务流。
 *
 * @author    姚尧 <yaogaoyu@qq.com>
 * @file      Runtime/ConfigUserFlow.ts
 */
/// <reference path="../Flow.ts" />
/// <reference path="../../Core/_Runtime/IConfigUserFlow.ts" />
var Runtime;
(function (Runtime) {
    var ConfigUserFlow = (function (_super) {
        __extends(ConfigUserFlow, _super);
        /**
         * 构造函数。
         */
        function ConfigUserFlow(config) {
            _super.call(this);
        }
        /**
         * 生成用户
         */
        ConfigUserFlow.prototype.genUser = function () {
            //
        };
        /**
         * 步骤验证
         */
        ConfigUserFlow.prototype.validate = function () {
            return true;
        };
        return ConfigUserFlow;
    }(Runtime.Flow));
    Runtime.ConfigUserFlow = ConfigUserFlow;
})(Runtime || (Runtime = {}));
/**
 * 声明配置完成完成业务流接口规范。
 *
 * @author    姚尧 <yaogaoyu@qq.com>
 * @file      Core/_Runtime/IFinishFlow.ts
 */
/// <reference path="IStepFlow.ts" />
/// <reference path="../_View/IView.ts" />
/**
 * 配置完成实体。
 *
 * @author    姚尧 <yaogaoyu@qq.com>
 * @file      Runtime/FinishFlow.ts
 */
/// <reference path="../Flow.ts" />
/// <reference path="../../Core/_Runtime/IFinishFlow.ts" />
var Runtime;
(function (Runtime) {
    var FinishFlow = (function (_super) {
        __extends(FinishFlow, _super);
        /**
         * 构造函数。
         */
        function FinishFlow(config) {
            _super.call(this);
        }
        /**
         * 处理配置完成业务
         */
        FinishFlow.prototype.finish = function (config) {
            //
        };
        /**
         * 步骤验证
         */
        FinishFlow.prototype.validate = function () {
            return true;
        };
        return FinishFlow;
    }(Runtime.Flow));
    Runtime.FinishFlow = FinishFlow;
})(Runtime || (Runtime = {}));
/**
 * 向导业务流实体。
 *
 * @author    姚尧 <yaogaoyu@qq.com>
 * @file      Runtime/Stage.ts
 */
/// <reference path="Flow.ts" />
/// <reference path="../View/Stage.tsx" />
/// <reference path="../Core/_Runtime/IStageFlow.ts" />
/// <reference path="_Steps/NodeChoiceFlow.ts" />
/// <reference path="_Steps/ConfigDBFlow.ts" />
/// <reference path="_Steps/RegisteInfoFlow.ts" />
/// <reference path="_Steps/ConfigUserFlow.ts" />
/// <reference path="_Steps/FinishFlow.ts" />
var Runtime;
(function (Runtime) {
    var StageFlow = (function (_super) {
        __extends(StageFlow, _super);
        /**
         * 构造函数。
         */
        function StageFlow(container) {
            _super.call(this);
            // private curStep: number = 0;
            // private steps: View.View[] = [];
            this.configDatas = {};
            /**
             * 子视图对应业务流实体哈希表
             */
            this.subViewFlowHash = {};
            /**
             * 当前所在步骤的索引号
             */
            this.stepIndex = 0;
            this.view = React.render(React.createElement(View.Stage, {flow: this}), container);
        }
        /**
         * 取得配置数据。
         */
        StageFlow.prototype.gConfig = function () {
            return this.configDatas;
        };
        /**
         * 绑定子视图与Flow。
         */
        StageFlow.prototype.make = function (type) {
            if (this.subViewFlowHash && type in this.subViewFlowHash)
                return this.subViewFlowHash[type];
            var flow;
            switch (type) {
                case 'nodeChoice':
                    flow = new Runtime.NodeChoiceFlow(this.configDatas);
                    break;
                case 'configDB':
                    flow = new Runtime.ConfigDBFlow(this.configDatas);
                    break;
                case 'registeInfo':
                    flow = new Runtime.RegisteInfoFlow(this.configDatas);
                    break;
                case 'configUser':
                    flow = new Runtime.ConfigUserFlow(this.configDatas);
                    break;
                case 'finish':
                    flow = new Runtime.FinishFlow(this.configDatas);
                    break;
            }
            this.subViewFlowHash[type] = flow;
            return flow;
        };
        /**
         * 取得当前步骤索引号。
         * 索引号从0开始
         */
        StageFlow.prototype.gStepIndex = function () {
            return this.stepIndex;
        };
        /**
         * 设置当前步骤索引号。
         * 索引号从0开始
         */
        StageFlow.prototype.sStepIndex = function (index) {
            if (index < 0)
                this.stepIndex = 0;
        };
        /**
         * 上一步。
         */
        StageFlow.prototype.previous = function (ev) {
            if (this.stepIndex <= 0)
                return;
            this.stepIndex -= 1;
            this.view.forceUpdate();
        };
        /**
         * 下一步。
         */
        StageFlow.prototype.next = function (ev) {
            this.stepIndex += 1;
            this.view.forceUpdate();
        };
        /**
         * 完成。
         */
        StageFlow.prototype.finish = function (ev) {
            window.location.href = Util.Path.gOrigin() + 'login.htm';
        };
        /**
         * 测试。
         */
        StageFlow.prototype.connTest = function () {
            //
        };
        return StageFlow;
    }(Runtime.Flow));
    Runtime.StageFlow = StageFlow;
})(Runtime || (Runtime = {}));
/**
 * 向导运行时实体。
 *
 * @author    姚尧 <yaogaoyu@qq.com>
 * @file      Runtime/Runtime.ts
 */
/// <reference path="StageFlow.tsx" />
var Runtime;
(function (Runtime_1) {
    var Runtime = (function () {
        /**
         * 构造函数。
         */
        function Runtime() {
            var container = document.querySelector('.wizard');
            this.stage = new Runtime_1.StageFlow(container);
        }
        return Runtime;
    }());
    Runtime_1.Runtime = Runtime;
})(Runtime || (Runtime = {}));
/**
 * 同步工具配置向导入口类。
 *
 * @author    姚尧 <yaogaoyu@163.com>
 * @file      Wizard.ts
 */
/// <reference path="Runtime/Runtime.ts" />
var Wizard = (function () {
    /**
     * 构造函数。
     */
    function Wizard() {
        this.runtime = new Runtime.Runtime();
    }
    Wizard.version = "0.1.0";
    return Wizard;
}());
module.exports=Wizard;
//# sourceMappingURL=wizard.js.map
