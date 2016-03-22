/**
 * 声明对象遍历函数接口规范。
 *
 * @author    姚尧 <yaogaoyu@163.com>
 * @license   GPL-3.0
 * @file      Util/IObjectIterator.ts
 */

/// <reference path="IHashTable.ts" />

namespace Util {
    export interface IObjectIterator<T, U> {
        (element: T, index?: string, object?: IHashTable<T>): U;
    }
}
