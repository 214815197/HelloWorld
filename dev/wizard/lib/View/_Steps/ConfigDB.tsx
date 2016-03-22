/**
 * 配置向导-数据库配置主视图。
 *
 * @author    姚尧 <yaogaoyu@qq.com>
 * @file      View/ConfigDB.ts
 */

/// <reference path="../View.ts" />
namespace View {
    export class ConfigDB extends View<Core.IProps, Core.IState> {
        private dbOptions: JSX.Element[] = [];
        constructor(props: Core.IProps) {
            super(props);
            this.props.flow.sView(this);
            Util.each((this.props.flow as Runtime.ConfigDBFlow).getDatabases(), (info: Util.IHashTable<string>, dbName: string) => {
                this.dbOptions.push(<option value={dbName}>{dbName}</option>);
            });
        }

        public render(): JSX.Element {
            return <div className='wrap'>
                <div className='title'>步骤二：数据库连接配置</div>
                <div className='desc'>数据库配置完成后请先测试连接，测试成功才能进行下一步。</div>
                <div className='formWrap'>
                    <div className='row'>
                        <div className='title'>数据库</div>
                        <div className='input'>
                            <select className='sel dbType' onChange={(ev: React.FormEvent) => {this.dbTypeChange(ev);}} value={this.props.config["db.type"]}>
                                <option value="-1">请选择数据库</option>
                                {this.dbOptions}
                            </select>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='title'>数据库连接</div>
                        <div className='input'>
                            <input type='text' className='text dbInput' value={this.props.config["db.url"]} onChange={(ev: React.FormEvent) => {this.props.config["db.url"] = (event.target as HTMLInputElement).value;this.forceUpdate();}}/>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='title'>用户名</div>
                        <div className='input'>
                            <input type='text' className='text dbUser' value={this.props.config["db.user"]} onChange={(ev: React.FormEvent) => {this.props.config["db.user"] = (event.target as HTMLInputElement).value;this.forceUpdate();}}/>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='title'>密码</div>
                        <div className='input'>
                            <input type='password' className='text dbPsw' value={this.props.config["db.psw"]} onChange={(ev: React.FormEvent) => {this.props.config["db.psw"] = (event.target as HTMLInputElement).value;this.forceUpdate();}}/>
                        </div>
                    </div>
                </div>
            </div>;
        }

        private dbTypeChange(ev: React.FormEvent): void {
            let dbType: string = (event.target as HTMLInputElement).value;
            if (dbType == "-1") {
                this.props.config["db.type"] = "";
                this.props.config["db.driver"] = "";
                this.props.config["db.url"] = "";
            } else {
                this.props.config["db.type"] = dbType;
                this.props.config["db.driver"] = (this.props.flow as Runtime.ConfigDBFlow).getDatabases()[dbType]["driver"];
                this.props.config["db.url"] = (this.props.flow as Runtime.ConfigDBFlow).getDatabases()[dbType]["url"];
            }
            this.props.config["db.user"] = "";
            this.props.config["db.psw"] = "";
            this.forceUpdate();
        }
    }
}
