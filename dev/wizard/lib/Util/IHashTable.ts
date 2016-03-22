/**
 * 声明哈希表接口规范。
 *
 * @author    姚尧 <yaogaoyu@163.com>
 * @license   GPL-3.0
 * @file      Util/IHashTable.ts
 */

namespace Util {
    export interface IHashTable<T> {
        [index: string]: T;
    }
}
