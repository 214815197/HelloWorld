/**
 * 声明节点注册业务流接口规范。
 *
 * @author    姚尧 <yaogaoyu@qq.com>
 * @file      Core/_Runtime/IRegisteInfoFlow.ts
 */

/// <reference path="IStepFlow.ts" />
/// <reference path="../_View/IView.ts" />

namespace Core {
    export interface IRegisteInfoFlow extends IStepFlow {
        /**
         * 保存从库类型节点设置的主库同步接口URL
         */
        save(url: string): void;

        /**
         * 生成主库的同步接口URL
         */
        genSyncURL(): string;
    }
}
