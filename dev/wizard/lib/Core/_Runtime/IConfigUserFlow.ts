/**
 * 声明保存登录用户业务流接口规范。
 *
 * @author    姚尧 <yaogaoyu@qq.com>
 * @file      Core/_Runtime/IConfigUserFlow.ts
 */

/// <reference path="IStepFlow.ts" />
/// <reference path="../_View/IView.ts" />

namespace Core {
    export interface IConfigUserFlow extends IStepFlow {
        /**
         * 生成用户
         */
        genUser(): void;
    }
}
