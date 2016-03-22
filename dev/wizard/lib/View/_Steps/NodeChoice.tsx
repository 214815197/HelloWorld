/**
 * 配置向导-节点类型选择主视图。
 *
 * @author    姚尧 <yaogaoyu@qq.com>
 * @file      View/NodeChoice.ts
 */

/// <reference path="../View.ts" />
/// <reference path="../../Util/Path.ts" />
namespace View {
    export class NodeChoice extends View<Core.IProps, Core.IState> {
        private origin: string = Util.Path.gOrigin();
        constructor(props: Core.IProps) {
            super(props);
            this.props.flow.sView(this);
        }

        public render(): JSX.Element {
            return <div className='wrap'>
                <div className='title'>步骤一：节点类型选择</div>
                <div className='desc'>选择一个进行同步服务的节点类型</div>
                <div className='formWrap'>
                    <div className='nodeType'>
                        <span className='inline type'>
                            <span className={'ibtn typeBtn' + (this.props.config['type'] == 'master' ? ' selected' : '')} onClick={(evt: React.MouseEvent) => {this.choice(evt, 'master');}}><img src={this.origin + 's/images/node.png'}/></span>
                        </span>
                        <span className='inline type typeName'>Master</span>
                        <span className='inline type desc'>主库节点，每个注册到此主节点上的从库节点将使用主库节点提供的服务进行数据同步。</span>
                    </div>
                    <div className='nodeType'>
                        <span className='inline type'>
                            <span className={'ibtn typeBtn' + (this.props.config['type'] == 'slaver' ? ' selected' : '')} onClick={(evt: React.MouseEvent) => {this.choice(evt, 'slaver');}}><img src={this.origin + 's/images/node.png'}/></span>
                        </span>
                        <span className='inline type typeName'>Slaver</span>
                        <span className='inline type desc'>从库节点，连接主库节点，与所有注册在主库节点上的从库节点进行数据同步。</span>
                    </div>
                </div>
            </div>;
        }

        private choice(ev: React.MouseEvent, type: string): void {
            if (!type) return ;
            (this.props.flow as Core.INodeChoiceFlow).choiceType(type);
            this.forceUpdate();
            // 发送事件到stage进行下一个步骤
        }
    }
}
