<div class="sideBar full">
    <div class="indent">
        <span class="icon icon-indent-decrease"></span>
    </div>
    <div class="modules ${(isEngineStarted == "true") ? string("started", "stopped")}">
        <ul class="moduleUl">
            <li class="row module" dt-module="_state">
                <span class="icon icon-home col"></span><span class="title col">服务器状态</span>
            </li>
            <li class="row module disable" dt-module="_nodes">
                <span class="icon icon-tree col"></span><span class="title col">节点管理</span>
            </li>
            <li class="row module disable" dt-module="_setting">
                <span class="icon icon-loop col"></span><span class="title col">同步表设置</span>
            </li>
        </ul>
    </div>
</div>