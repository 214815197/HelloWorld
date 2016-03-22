/**
 * 定义（运行时）画面出现选择信息事件组件。
 *
 * @author    姚尧 <yyao@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/Choice.ts
 */

/// <reference path="Event.ts" />
/// <reference path="IStepMetas.ts" />

namespace Ev {
    export class Step extends Event<Core.IStageFlow> {
        /**
         * 事件类型
         */
        public type: string;
        /**
         * 回调函数
         */
        public callback: () => void;

        /**
         * 构造函数。
         */
        constructor(metas: IStepMetas) {
            super(metas);
            this.type = metas.type;
            this.callback = metas.callback;
        }

        /**
         * 获取类型。
         */
        public gType(): string {
            return 'step';
        }
    }
}
