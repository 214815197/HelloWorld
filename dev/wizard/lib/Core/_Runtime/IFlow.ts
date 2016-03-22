/**
 * 声明（运行时）业务逻辑流接口规范。
 *
 * @author    姚尧 <yaogaoyu@qq.com>
 * @file      Core/_Runtime/IFlow.ts
 */

/// <reference path="../_View/IView.ts" />
/// <reference path="../_Ev/IEmittable.ts" />

namespace Core {
    export interface IFlow extends IEmittable {
        /**
         * 设置绑定视图。
         */
        sView(view: IView): IFlow;
        /**
         * 获取绑定视图。
         */
        gView(): IView;
    }
}
