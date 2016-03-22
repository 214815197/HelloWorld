/**
 * 声明配置完成完成业务流接口规范。
 *
 * @author    姚尧 <yaogaoyu@qq.com>
 * @file      Core/_Runtime/IFinishFlow.ts
 */

/// <reference path="IStepFlow.ts" />
/// <reference path="../_View/IView.ts" />

namespace Core {
    export interface IFinishFlow extends IStepFlow {
        /**
         * 处理配置完成业务
         */
        finish(): void;
    }
}
