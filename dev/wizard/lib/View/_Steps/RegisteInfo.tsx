/**
 * 配置向导-节点注册主视图。
 *
 * @author    姚尧 <yaogaoyu@qq.com>
 * @file      View/RegisteInfo.ts
 */

/// <reference path="../View.ts" />
namespace View {

    export class RegisteInfo extends View<Core.IProps, Core.IState> {
        constructor(props: Core.IProps) {
            super(props);
            this.props.flow.sView(this);
        }

        public render(): JSX.Element {
            return <div className='wrap'>
                <div className='title'>步骤三：节点注册信息</div>
                {
                    this.props.config['type'] == 'master' ?
                    <div className='desc nodeDesc'>本节点设置为主库节点，连接到本节点的从库节点将使用此URL进行节点注册</div> :
                    <div className='desc nodeDesc'>本节点设置为从库节点，请填写主库节点的注册接口URL</div>
                }
                <div className='formWrap'>
                    {
                        this.props.config['type'] == 'master' ?
                        <div className='row'>
                            <div className='title'>下面的链接是注册接口URL，请设置到进行数据同步的从库节点中。</div>
                            <div className='title important'>{(this.props.flow as Core.IRegisteInfoFlow).genSyncURL()}</div>
                        </div> :
                        <div className='row'>
                            <div className='title'>请填写主库节点发布的注册接口URL</div>
                            <div className='input'>
                                <input type='text' className='text url' value={this.props.config["registration.url"]} onChange={(ev: React.FormEvent) => {this.saveURL((ev.target as HTMLInputElement).value);}}/>
                            </div>
                        </div>
                    }
                </div>
            </div>;
        }

        private saveURL(val: string): void {
            (this.props.flow as Core.IRegisteInfoFlow).save(val);
            this.forceUpdate();
        }
    }
}
