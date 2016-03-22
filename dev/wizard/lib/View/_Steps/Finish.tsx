/**
 * 配置向导-完成向导主视图。
 *
 * @author    姚尧 <yaogaoyu@qq.com>
 * @file      View/Finish.ts
 */

/// <reference path="../View.ts" />
namespace View {
    export class Finish extends View<Core.IProps, Core.IState> {
        constructor(props: Core.IProps) {
            super(props);
            this.props.flow.sView(this);
        }

        public render(): JSX.Element {
            return <div className='wrap'>
                <div className='title'>步骤五：完成</div>
                <div className='desc finishDesc'>恭喜您，配置完成，请点击完成按钮跳转到同步工具首页。</div>
            </div>;
        }
    }
}
