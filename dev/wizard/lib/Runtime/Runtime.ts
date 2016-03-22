/**
 * 向导运行时实体。
 *
 * @author    姚尧 <yaogaoyu@qq.com>
 * @file      Runtime/Runtime.ts
 */

/// <reference path="StageFlow.tsx" />

namespace Runtime {
    export class Runtime {
        private stage: StageFlow;
        /**
         * 构造函数。
         */
        constructor() {
            let container: Element = document.querySelector('.wizard');
            this.stage = new StageFlow(container);
        }
    }
}
