/**
 * 声明引导程序业务流接口规范。
 *
 * @author    姚尧 <yaogaoyu@qq.com>
 * @file      Core/_Runtime/IStageFlow.ts
 */

/// <reference path="IFlow.ts" />
/// <reference path="../_View/IView.ts" />
/// <reference path="../../Util/Remote.ts" />

namespace Core {
    export interface IStageFlow extends IFlow {
        /**
         * 取得配置数据。
         */
        gConfig(): Util.IHashTable<string>;

        /**
         * 取得当前步骤索引号。
         * 索引号从0开始
         */
        gStepIndex(): number;

        /**
         * 设置当前步骤索引号。
         * 索引号从0开始
         */
        sStepIndex(index: number): void;

        /**
         * 绑定子视图与Flow。
         */
        make(type: string): Core.IFlow;

        /**
         * 上一步。
         */
        previous(ev: React.MouseEvent): void;

        /**
         * 下一步。
         */
        next(ev: React.MouseEvent): void;

        /**
         * 完成。
         */
        finish(): void;

        /**
         * 测试。
         */
        connTest(): Promise<boolean>;
    }
}
