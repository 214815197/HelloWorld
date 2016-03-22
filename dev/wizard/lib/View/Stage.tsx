/**
 * 配置向导引导主视图。
 *
 * @author    姚尧 <yaogaoyu@qq.com>
 * @file      View/Stage.ts
 */

/// <reference path="View.ts" />
/// <reference path="_Steps/NodeChoice.tsx" />
/// <reference path="_Steps/ConfigDB.tsx" />
/// <reference path="_Steps/RegisteInfo.tsx" />
/// <reference path="_Steps/ConfigUser.tsx" />
/// <reference path="_Steps/Finish.tsx" />
namespace View {
    declare var dialog: (conf: Util.IHashTable<any>) => any;

    export class Stage extends View<Core.IProps, Core.IState> {
        private stepViews: JSX.Element[];

        /**
         * 弹出框配置
         */
        private alertConf: Util.IHashTable<any> = {
            cancel: false,
            title: '提示',
            okValue: '确定',
            ok: (): any => {
                //
            }
        };

        /**
         * 提示框配置
         */
        private promptConf: Util.IHashTable<any> = {
            cancel: false
        };

        constructor(props: Core.IProps) {
            super(props);
            this.props.flow.sView(this);
            let flow: Core.IStageFlow = this.props.flow as Core.IStageFlow;
            this.stepViews = [
                <NodeChoice flow={flow.make('nodeChoice')} config={flow.gConfig()}/>,
                <ConfigDB flow={flow.make('configDB')} parentFlow={flow} config={flow.gConfig()}/>,
                <RegisteInfo flow={flow.make('registeInfo')} config={flow.gConfig()}/>,
                // <ConfigUser flow={flow.make('configUser')} config={flow.gConfig()}/>,
                <Finish flow={flow.make('finish')} parentFlow={flow} config={flow.gConfig()}/>
            ];
        }

        public render(): JSX.Element {
            let flow: Core.IStageFlow = this.props.flow as Core.IStageFlow;
            let previousStyle: string = 'btn stageBtn' + (flow.gStepIndex() <= 0 ? ' disabled' : '');
            return <div className='stage'>
                <div className='phase top'>
                    <span className='title'>同步工具配置向导</span>
                </div>
                <div className='phase stageWrap'>
                    {this.stepViews[flow.gStepIndex()]}
                </div>
                <div className='phase bottom'>
                    {
                        flow.gStepIndex() == 1 ?
                        <span className='left btnWrap'>
                            <span className='btn stageBtn' onClick={() => {this.testConn();}}><p>测试连接</p></span>
                        </span> :
                        ''
                    }
                    <span className='right btnWrap'>
                        <span className={previousStyle} onClick={(ev: React.MouseEvent) => {flow.previous(ev);}}><p>上一步</p></span>
                        {
                            flow.gStepIndex() >= this.stepViews.length - 1 ?
                            <span className='btn stageBtn' onClick={(ev: React.MouseEvent) => {(flow.make("finish") as Core.IFinishFlow).finish();}}><p>完成</p></span> :
                            <span className='btn stageBtn' onClick={(ev: React.MouseEvent) => {flow.next(ev);}}><p>下一步</p></span>
                        }
                    </span>
                </div>
            </div>;
        }

        /**
         * 测试数据库连接
         */
        private testConn(): void {
            let alertDialog: any = dialog(this.alertConf);
            let dbType: string = (this.props.flow as Core.IStageFlow).gConfig()['db.type'];
            let dbDriver: string = (this.props.flow as Core.IStageFlow).gConfig()['db.driver'];
            let dbUrl: string = (this.props.flow as Core.IStageFlow).gConfig()['db.url'];
            let dbUser: string = (this.props.flow as Core.IStageFlow).gConfig()['db.user'];
            let dbPsw: string = (this.props.flow as Core.IStageFlow).gConfig()['db.psw'];
            if (!dbType || !dbDriver || !dbUrl || !dbUser || !dbPsw) {
                alertDialog.content("<span class='alert'><span class='icon icon-notification'></span><span class='title'>请完成数据库配置</span>");
                alertDialog.showModal();
                return ;
            }
            let prompt: any = dialog(this.promptConf);
            prompt.content("正在测试数据库连接，请稍候。");
            prompt.showModal();
            (this.props.flow as Core.IStageFlow).connTest().then((isSuc: boolean) => {
                prompt.close();
                if (!isSuc) {
                    alertDialog.content("<span class='alert'><span class='icon icon-notification'></span><span class='title'>连接失败</span>");
                } else {
                    alertDialog.content("<span class='alert'><span class='icon icon-notification'></span><span class='title'>连接成功</span>");
                }
                alertDialog.showModal();
            });
        }
    }
}
