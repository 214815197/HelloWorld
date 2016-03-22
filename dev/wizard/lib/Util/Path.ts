/**
 * 定义Path信息组件。
 *
 * @author    姚尧 <yaogaoyu@163.com>
 * @license   GPL-3.0
 * @file      Util/Path.ts
 */

namespace Util {
    export namespace Path {
        /**
         * 获取指定部署根目录。
         */
        export function gOrigin(): string {
            let origin: string = window.location.origin;
            let pathname: string = window.location.pathname;
            let root: string = pathname.match(/.*\//)[0];
            return origin + root ;
        }
    }
}
