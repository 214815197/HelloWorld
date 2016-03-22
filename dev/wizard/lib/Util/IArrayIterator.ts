/**
 * 声明数组遍历函数接口规范。
 *
 * @author    姚尧 <yaogaoyu@163.com>
 * @license   GPL-3.0
 * @file      Util/IArrayIterator.ts
 */

namespace Util {
    export interface IArrayIterator<T, U> {
        (element: T, index?: number, array?: T[]): U;
    }
}
