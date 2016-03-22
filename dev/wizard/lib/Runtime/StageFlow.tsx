/**
 * 向导业务流实体。
 *
 * @author    姚尧 <yaogaoyu@qq.com>
 * @file      Runtime/Stage.ts
 */
/// <reference path="Flow.ts" />
/// <reference path="../View/Stage.tsx" />
/// <reference path="../Core/_Runtime/IStageFlow.ts" />
/// <reference path="_Steps/NodeChoiceFlow.ts" />
/// <reference path="_Steps/ConfigDBFlow.ts" />
/// <reference path="_Steps/RegisteInfoFlow.ts" />
/// <reference path="_Steps/ConfigUserFlow.ts" />
/// <reference path="_Steps/FinishFlow.ts" />
/// <reference path="../Ev/Step.ts" />
namespace Runtime {

    export class StageFlow extends Flow implements Core.IStageFlow {
        /**
         * 引擎名
         */
        public static ENGINE_NAME: string = "dbtool";
        /**
         * type 节点类型
         * db.driver
         * db.url
         * db.user
         * db.psw
         * registration.url
         * sync.url
         * user
         * psw
         */
        private configDatas: Util.IHashTable<string> = {};
        /**
         * 子视图对应业务流实体哈希表
         */
        private subViewFlowHash: Util.IHashTable<Core.IFlow> = {};
        /**
         * 当前所在步骤的索引号
         */
        private stepIndex: number = 0;
        /**
         * 步骤顺序
         * "nodeChoice", "configDB", "registeInfo", "configUser", "finish"
         */
        private stepOrder: string[] = ["nodeChoice", "configDB", "registeInfo", "finish"];
        /**
         * 项目上下文
         */
        private contextPath: string = (document.querySelector("#p") as HTMLElement).getAttribute("ref");

        /**
         * 构造函数。
         */
        constructor(container: Element) {
            super();
            this.view = React.render<Core.IProps, Core.IState>(<View.Stage flow={this} />, container) as Core.IView;
            this.addEventListener("step", (ev: Ev.Step) => {
                if (ev.type == "db.next") {
                    this.configDBNext();
                }else if (ev.type == "finish") {
                    this.finish();
                }
            });
        }

        /**
         * 取得配置数据。
         */
        public gConfig(): Util.IHashTable<string> {
            return this.configDatas;
        }

        /**
         * 绑定子视图与Flow。
         */
        public make(type: string): Core.IFlow {
            if (this.subViewFlowHash && type in this.subViewFlowHash)
                return this.subViewFlowHash[type];
            let flow: Core.IFlow;
            switch (type) {
                case 'nodeChoice':
                    flow = new NodeChoiceFlow(this.configDatas);
                    break;
                case 'configDB':
                    flow = new ConfigDBFlow(this.configDatas);
                    break;
                case 'registeInfo':
                    flow = new RegisteInfoFlow(this.configDatas);
                    break;
                case 'configUser':
                    flow = new ConfigUserFlow(this.configDatas);
                    break;
                case 'finish':
                    flow = new FinishFlow(this.configDatas);
                    break;
            }
            this.subViewFlowHash[type] = flow;
            return flow;
        }

        /**
         * 取得当前步骤索引号。
         * 索引号从0开始
         */
        public gStepIndex(): number {
            return this.stepIndex;
        }

        /**
         * 设置当前步骤索引号。
         * 索引号从0开始
         */
        public sStepIndex(index: number): void {
            if (index < 0) this.stepIndex = 0;
        }

        /**
         * 上一步。
         */
        public previous(ev: React.MouseEvent): void {
            if (this.stepIndex <= 0) return;
            this.stepIndex -= 1;
            this.view.forceUpdate();
        }

        /**
         * 下一步。
         */
        public next(ev: React.MouseEvent): void {
            let stepFlow: Core.IStepFlow = this.make(this.stepOrder[this.stepIndex]) as Core.IStepFlow;
            if (this.stepIndex == 1) {
                stepFlow.validate();
                return ;
            }
            if (this.stepIndex < this.stepOrder.length - 1 && stepFlow.validate()) {
                this.stepIndex += 1;
            }
            this.view.forceUpdate();
        }

        /**
         * 完成。
         */
        public finish(): void {
            window.location.href = Util.Path.gOrigin();
        }

        /**
         * 测试数据库连接
         */
        public connTest(): Promise<boolean> {
            let dbType: string = this.configDatas['db.type'];
            let dbDriver: string = this.configDatas['db.driver'];
            let dbUrl: string = this.configDatas['db.url'];
            let dbUser: string = this.configDatas['db.user'];
            let dbPsw: string = this.configDatas['db.psw'];
            if (!dbType || !dbDriver || !dbUrl || !dbUser || !dbPsw) {
                return new Promise<boolean>((resolve: (isSuc: boolean) => void) => {
                    resolve(false);
                });
            }
            let testData: Util.IHashTable<string> = {
                type: dbType || '',
                driver: dbDriver || '',
                url: dbUrl || '',
                u: dbUser || '',
                p: dbPsw || '',
            };
            return new Promise<boolean> ((resolve: (isTextSuc: boolean) => void) => {
                Util.Remote.post(this.contextPath + "/wizard/testConn", testData, (data: Util.IHashTable<any>) => {
                    resolve(data["code"] == "1");
                }, null);
            });
        }

        /**
         * 数据库配置的下一步由数据库配置业务自己调用
         */
        private configDBNext(): void {
            this.stepIndex += 1;
            this.view.forceUpdate();
        }
    }
}
