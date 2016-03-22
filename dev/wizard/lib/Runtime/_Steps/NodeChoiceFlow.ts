/**
 * 节点类型选择实体。
 *
 * @author    姚尧 <yaogaoyu@qq.com>
 * @file      Runtime/NodeChoiceFlow.ts
 */
/// <reference path="../Flow.ts" />
/// <reference path="../../Core/_Runtime/INodeChoiceFlow.ts" />
namespace Runtime {
    declare var dialog: (conf: Util.IHashTable<any>) => any;

    export class NodeChoiceFlow extends Flow implements Core.INodeChoiceFlow {
        private config: Util.IHashTable<string>;
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
            this.config = config;
        }

        /**
         * 节点类型选择业务
         */
        public choiceType(type: string): void {
            this.config['type'] = type;
        }

        /**
         * 步骤验证
         */
        public validate(): boolean {
            if (!this.config['type']) {
                let alertDialog: any = dialog(this.alertConf);
                alertDialog.content("<span class='alert'><span class='icon icon-notification'></span><span class='title'>请选择一个节点类型。</span>");
                alertDialog.showModal();
                return false;
            }
            return true;
        }
    }
}
