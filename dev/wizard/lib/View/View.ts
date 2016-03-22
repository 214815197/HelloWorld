/**
 * 定义视图抽象组件。
 *
 * @author    姚尧 <yaogaoyu@qq.com>
 * @file      View/View.ts
 */

/// <reference path="../../include/tsd.d.ts" />
/// <reference path="../Core/_View/IView.ts" />

namespace View {
    export class View<P extends Core.IProps, S extends Core.IState> extends React.Component<P, S> implements Core.IView {
    }
}
