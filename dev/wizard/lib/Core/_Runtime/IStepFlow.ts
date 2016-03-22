/**
 * 声明配置完成完成业务流接口规范。
 *
 * @author    姚尧 <yaogaoyu@qq.com>
 * @file      Core/_Runtime/IFinishFlow.ts
 */

/// <reference path="IFlow.ts" />
/// <reference path="../_View/IView.ts" />

namespace Core {
    export interface IStepFlow extends IFlow {
        /**
         * 验证步骤
         */
        validate(): boolean;
    }
}
