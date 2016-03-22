/**
 * 节点注册信息实体。
 *
 * @author    姚尧 <yaogaoyu@qq.com>
 * @file      Runtime/RegisteInfoFlow.ts
 */
/// <reference path="../Flow.ts" />
/// <reference path="../../Core/_Runtime/IRegisteInfoFlow.ts" />
/// <reference path="../StageFlow.tsx" />
namespace Runtime {
    declare var dialog: (conf: Util.IHashTable<any>) => any;

    export class RegisteInfoFlow extends Flow implements Core.IRegisteInfoFlow {

        /**
         * 绑定的配置数据
         */
        private wizConfig: Util.IHashTable<string>;

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
         * 构造函数。
         */
        constructor(config: Util.IHashTable<string>) {
            super();
            this.wizConfig = config;
        }

        /**
         * 保存从库设置的同步接口URL
         */
        public save(url: string): void {
            this.wizConfig['registration.url'] = url;
        }

        /**
         * 生成主端的同步接口URL
         */
        public genSyncURL(): string {
            let contextPath: string = (document.querySelector("#p") as HTMLElement).getAttribute("ref");
            let local: typeof window.location = window.location;
            return local.protocol + "://" + local.host + contextPath + "/sync/" + StageFlow.ENGINE_NAME;
        }

        /**
         * 步骤验证
         */
        public validate(): boolean {
            if (this.wizConfig['type'] == 'master') return true;
            if (!this.wizConfig['registration.url'] || /(^\s+)|(\s+$)/ig.test(this.wizConfig['registration.url']) ) {
                let alert: any = dialog(this.alertConf);
                // <span class='alert'><span class='icon icon-notification'></span><span class='title'>连接失败</span>
                alert.content("<span class='alert'><span class='icon icon-notification'></span><span class='title'>主库节点URL填写不正确，请检查所填写的内容。</span>");
                alert.showModal();
                return false;
            } else {
                return true;
            }
        }
    }
}
