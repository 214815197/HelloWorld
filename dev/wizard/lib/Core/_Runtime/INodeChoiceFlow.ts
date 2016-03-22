/**
 * 声明节点类型选择业务流接口规范。
 *
 * @author    姚尧 <yaogaoyu@qq.com>
 * @file      Core/_Runtime/INodeChoiceFlow.ts
 */

/// <reference path="IStepFlow.ts" />
/// <reference path="../_View/IView.ts" />

namespace Core {
    export interface INodeChoiceFlow extends IStepFlow {
        /**
         * 节点类型选择业务
         */
        choiceType(type: string): void;
    }
}
