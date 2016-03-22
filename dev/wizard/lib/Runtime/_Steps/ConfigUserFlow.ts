/**
 * 生成用户业务流。
 *
 * @author    姚尧 <yaogaoyu@qq.com>
 * @file      Runtime/ConfigUserFlow.ts
 */
/// <reference path="../Flow.ts" />
/// <reference path="../../Core/_Runtime/IConfigUserFlow.ts" />
namespace Runtime {
    export class ConfigUserFlow extends Flow implements Core.IConfigUserFlow {
        /**
         * 构造函数。
         */
        constructor(config: Util.IHashTable<string>) {
            super();
        }

        /**
         * 生成用户
         */
        public genUser(): void {
            //
        }

        /**
         * 步骤验证
         */
        public validate(): boolean {
            return true;
        }
    }
}
