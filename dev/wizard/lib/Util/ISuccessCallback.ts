/**
 * 声明成功回调函数接口规范。
 *
 * @author    姚尧 <yaogaoyu@163.com>
 * @license   GPL-3.0
 * @file      Util/ISuccessCallback.ts
 */

/// <reference path="IHashTable.ts" />

namespace Util {
    export interface ISuccessCallback<T> {
        (data: IHashTable<T>): void;
    }
}
