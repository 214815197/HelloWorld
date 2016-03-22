/**
 * 声明视图规范。
 *
 * @author    姚尧 <yaogaoyu@qq.com>
 * @file      Core/_View/IView.ts
 */

/// <reference path="../../Util/IHashTable.ts" />
/// <reference path="../../../include/react/react-global.d.ts" />
/// <reference path="IState.ts" />
/// <reference path="IProps.ts" />
/// <reference path="../_Runtime/IFlow.ts" />

namespace Core {
    export interface IView extends React.Component<IProps, IState> {
    }
}
