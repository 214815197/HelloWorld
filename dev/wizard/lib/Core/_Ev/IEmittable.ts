/**
 * 声明（运行时）事件宿主接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Core/_Ev/IEmittable.ts
 */

/// <reference path="IEventListener.ts" />

namespace Core {
    export interface IEmittable {
        /**
         * 新增事件监听。
         */
        addEventListener<T>(type: string, listener: IEventListener<T>): IEmittable;

        /**
         * 取消事件监听。
         */
        removeEventListener<T>(type: string, listener: IEventListener<T>): IEmittable;

        /**
         * 发生事件。
         */
        dispatchEvent<T>(event: IEvent<T>): IEmittable;
    }
}
