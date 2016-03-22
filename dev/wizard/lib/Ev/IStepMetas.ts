/**
 * 声明（运行时）画面事件接口规范。
 *
 * @author    姚尧 <yyao@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/IControlMetas.ts
 */

/// <reference path="../Core/_Ev/IEventMetas.ts" />
/// <reference path="../Core/_Runtime/IStageFlow.ts" />

namespace Ev {
    export interface IStepMetas extends Core.IEventMetas<Core.IStageFlow> {
        /**
         * 类型。
         */
        type: string;
        /**
         * 回调函数。
         */
        callback?: () => void;
    }
}
