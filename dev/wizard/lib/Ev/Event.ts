/**
 * 定义（运行时）事件组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/Event.ts
 */

/// <reference path="../Core/_Ev/IEvent.ts" />
/// <reference path="../Core/_Runtime/IFlow.ts" />

namespace Ev {
    export class Event<T extends Core.IFlow> implements Core.IEvent<T> {
        /**
         * 事件触发对象。
         */
        public target: T;

        /**
         * 构造函数。
         */
        constructor(metas: Core.IEventMetas<T>) {
            this.target = metas.target;
        }

        /**
         * 获取类型。
         */
        public gType(): string {
            return '';
        }
    }
}
