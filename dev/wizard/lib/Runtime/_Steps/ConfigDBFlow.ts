/**
 * 数据库配置实体。
 *
 * @author    姚尧 <yaogaoyu@qq.com>
 * @file      Runtime/ConfigDBFlow.ts
 */
/// <reference path="../Flow.ts" />
/// <reference path="../../Core/_Runtime/IConfigDBFlow.ts" />
/// <reference path="../../Ev/Step.ts" />
namespace Runtime {
    declare var dialog: (conf: Util.IHashTable<any>) => any;

    export class ConfigDBFlow extends Flow implements Core.IConfigDBFlow {
        private databases: Util.IHashTable<any> = {
            'Oracle': { 'driver': 'oracle.jdbc.driver.OracleDriver', 'url': 'jdbc:oracle:thin:@127.0.0.1:1521:databasename' },
            'SQL Server': { 'driver': 'net.sourceforge.jtds.jdbc.Driver', 'url': 'jdbc:jtds:sqlserver://hostname/databasename;useCursors=true;bufferMaxMemory=10240;lobBuffer=5242880;socketTimeout=300;appName=syncdb' },
            'DB2': { 'driver': 'com.ibm.db2.jcc.DB2Driver', 'url': 'jdbc:db2://hostname:50000/databasename' },
            'Mysql': { 'driver': 'com.mysql.jdbc.Driver', 'url': 'jdbc:mysql://hostname/databasename?tinyInt1isBit=false&zeroDateTimeBehavior=convertToNull' }
        };

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

        private wizConfig: Util.IHashTable<any>;

        /**
         * 构造函数。
         */
        constructor(config: Util.IHashTable<string>) {
            super();
            this.wizConfig = config;
        }

        /**
         * 步骤验证
         */
        public validate(): boolean {
            this.testConn((isTestSuc: boolean): void => {
                if (isTestSuc) {
                    (this.view.props.parentFlow as Core.IStageFlow).dispatchEvent(new Ev.Step({
                        target: this.view.props.parentFlow as Core.IStageFlow,
                        type: "db.next"
                    }));
                }
            });
            return false;
        }

        public getDatabases(): Util.IHashTable<any> {
            return this.databases;
        }

        /**
         * 测试数据库连接
         */
        private testConn(cb: (isTestSuc: boolean) => void): void {
            let alertDialog: any = dialog(this.alertConf);
            let dbType: string = this.wizConfig['db.type'];
            let dbDriver: string = this.wizConfig['db.driver'];
            let dbUrl: string = this.wizConfig['db.url'];
            let dbUser: string = this.wizConfig['db.user'];
            let dbPsw: string = this.wizConfig['db.psw'];
            if (!dbType || !dbDriver || !dbUrl || !dbUser || !dbPsw) {
                alertDialog.content("<span class='alert'><span class='icon icon-notification'></span><span class='title'>请完成数据库配置</span>");
                alertDialog.showModal();
                cb(false);
            }
            let prompt: any = dialog(this.promptConf);
            prompt.content("正在测试数据库连接，请稍候。");
            prompt.showModal();
            (this.view.props.parentFlow as Core.IStageFlow).connTest().then((isSuc: boolean) => {
                prompt.close();
                if (!isSuc) {
                    alertDialog.content("<span class='alert'><span class='icon icon-notification'></span><span class='title'>连接失败</span>");
                    alertDialog.showModal();
                }
                cb(isSuc);
            });
        }
    }
}
