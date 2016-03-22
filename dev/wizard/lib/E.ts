/**
 * 定义编辑器异常。
 *
 * @author    姚尧 <yaogaoyu@qq.com>
 * @file      E.ts
 */

class E extends Error {
    public static UTIL_REMOTE_TIMEOUT: string = '远端请求超时';

    /**
     * 构造函数。
     */
    constructor(message: string) {
        super();
        if ('captureStackTrace' in Error)
            Error['captureStackTrace'](this, E);
        this.name = 'Error';
        this.message = message;
    }
}
