/**
 * 声明失败回调函数接口规范。
 *
 * @author    姚尧 <yaogaoyu@163.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Util/IFailureCallback.ts
 */

namespace Util {
    export interface IFailureCallback {
        (error: Error, status?: number): void;
    }
}
