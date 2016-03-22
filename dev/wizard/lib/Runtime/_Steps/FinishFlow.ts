/**
 * 配置完成实体。
 *
 * @author    姚尧 <yaogaoyu@qq.com>
 * @file      Runtime/FinishFlow.ts
 */
/// <reference path="../Flow.ts" />
/// <reference path="../../Core/_Runtime/IFinishFlow.ts" />
namespace Runtime {
    declare var dialog: (conf: Util.IHashTable<any>) => any;

    export class FinishFlow extends Flow implements Core.IFinishFlow {
        private wizConfig: Util.IHashTable<string>;

        /**
         * 项目上下文
         */
        private contextPath: string = (document.querySelector("#p") as HTMLElement).getAttribute("ref");

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
        /**
         * 构造函数。
         */
        constructor(config: Util.IHashTable<string>) {
            super();
            this.wizConfig = config;
        }

        /**
         * 处理配置完成业务
         */
        public finish(): void {
            // let alert: any = dialog(this.alertConf);
            let prompt: any = dialog(this.promptConf);
            prompt.content("<span class='col loading'>请稍候，正在生成同步工具系统设置。</span><img class='col loading' src='" + this.contextPath + "/s/images/loading.gif'>");
            prompt.showModal();
            Util.Remote.post(this.contextPath + "/wizard/save", this.wizConfig, (data: Util.IHashTable<any>) => {
                let isWizSuc: boolean = data['code'] != "0";
                prompt.close();
                if (isWizSuc) {
                    let alertDialog: any;
                    this.alertConf['ok'] = () => {
                        if (alertDialog) alertDialog.close();
                        (this.view.props.parentFlow as Core.IStageFlow).dispatchEvent(new Ev.Step({
                            target: this.view.props.parentFlow as Core.IStageFlow,
                            type: "finish"
                        }));
                    };
                    alertDialog = dialog(this.alertConf);
                    alertDialog.content("<span class='alert'><span class='icon icon-checkmark'></span><span class='title'>配置成功。</span>");
                    alertDialog.showModal();
                }
            }, null);
        }

        /**
         * 步骤验证
         */
        public validate(): boolean {
            return true;
        }
    }
}
