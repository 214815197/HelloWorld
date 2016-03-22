/**
 * 配置向导-设置用户向导主视图。
 *
 * @author    姚尧 <yaogaoyu@qq.com>
 * @file      View/ConfigUser.ts
 */

/// <reference path="../View.ts" />
namespace View {
    export class ConfigUser extends View<Core.IProps, Core.IState> {
        constructor(props: Core.IProps) {
            super(props);
            this.props.flow.sView(this);
        }

        public render(): JSX.Element {
            return <div className='wrap'>
                <div className='title'>步骤四：注册登录用户</div>
                <div className='desc'>注册一个用户登录到本系统</div>
                <div className='formWrap'>
                    <div className='row'>
                        <div className='title'>用户名</div>
                        <div className='input'>
                            <input type='text' className='userName' />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='title'>密码</div>
                        <div className='input'>
                            <input type='password' className='userPsw' />
                        </div>
                    </div>
                </div>
            </div>;
        }
    }
}
