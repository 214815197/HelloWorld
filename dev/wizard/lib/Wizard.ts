/**
 * 同步工具配置向导入口类。
 *
 * @author    姚尧 <yaogaoyu@163.com>
 * @file      Wizard.ts
 */
/// <reference path="Runtime/Runtime.ts" />
class Wizard {
    public static version: string = "${WIZARD_VERSION}";
    private runtime: Runtime.Runtime;

    /**
     * 构造函数。
     */
    constructor() {
        this.runtime = new Runtime.Runtime();
    }
}
