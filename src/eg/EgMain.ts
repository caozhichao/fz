module eg {
	export class EgMain extends eui.UILayer{
		 //代码版本号
    	private version:string = "1.1.0";

		public constructor() {
			super();
		}

		protected createChildren(): void {
        	super.createChildren();
			egret.lifecycle.addLifecycleListener((context) => {
				// custom lifecycle plugin
			})

			egret.lifecycle.onPause = () => {
				egret.ticker.pause();
				eg.log('onPause');
			}

			egret.lifecycle.onResume = () => {
				egret.ticker.resume();
				eg.log('onResume');
			}		
			this.runGame().catch(e => {
            	eg.log('error:' + e.toString());				
        	})
		}
		

		/**
		 * 初始化之前
		 */
		protected initBefore(){
			//获取html页面数据可以放这里
			eg.log('initBefore');
			// this.log();			
		}

		/**
		 *1.初始化之前，参数获取
		 *2.初始化(exml 主题,UI config);
		 *3.加载(配置文件加载，第一次加载的资源)
		 *4 加载之后，场景创建之前，设置语言包 设置埋点数据(加载之后才能获得相关数据)
	 	 *5.场景创建
		 * 
		 */
		protected async runGame(){
			eg.log('------------------框架初始化开始-------------------------');
			//框架基础初始化
			// await this.initEg();
			Eg.getInstance().init(this);
			this.initBefore();			
			//注册版本控制器
			this.initVersionController();
			//加载资源配置文件
			await this.loadConfigs();						
			//preload资源加载
			await this.loadRes();	
			//eui皮肤(debug环境，加载exml文件，正式环境使用exmljs文件)	
			await this.initTheme();
			this.log();
			//资源加载完成(处理一些加载后的数据依赖)
			this.loadResAfter();	
			//设置配置数据，语言包，埋点数据			
			// this.configLanguageData();
			// this.configActLog();	
			eg.log('------------------框架初始化结束---------------------------');
			//创建场景			
			this.createGameScene();
		}

		/**
		 * 加载资源配置文件组 支持包内，包外 资源配置文件
		 */
		private loadConfigs(){	
			return new Promise(async (resolve,reject)=>{
				for(let i:number = 0;i < Config.resConfigs.length; i++){
					eg.log(Config.resConfigs[i].url + Config.resConfigs[i].resourceRoot);
					await RES.loadConfig(Config.resConfigs[i].url, Config.resConfigs[i].resourceRoot);
					eg.log('1111111');
				}
				eg.log('22222222');
				resolve();
			})					
		}

		/**
		 * 注册版本号控制器
		 */
		private initVersionController():void{
			if(Config.versionUrl){
				let versionController = new eg.VersionController();
				RES.registerVersionController(versionController);						
			}
		}

		/**
		 * 加载资源
		 */
		protected loadRes(){
			return new Promise(async (resolve,reject)=>{
				eg.Loading.Instance.show();
				//2.默认加载prload资源组
				eg.QueueLoader.Instance.loadGroup(this.preloadName,-1,this,onComplete,onProgress,onError);        
				let self = this;
				function onComplete():void{				
					eg.Loading.Instance.hide();			
					resolve();					
				}
				function onProgress(progress:any):void{
					eg.Loading.Instance.progress(progress.itemsLoaded, progress.itemsTotal);
				}

				function onError():void{
					eg.log("loadGroup preload onError" );
				}
			});
		}

		protected loadResAfter():void{
			eg.log('loadResAfter');
		}

		/**
		 * 首次加载资源的资源组名称 默认是 preload
		 * 可重写该方法
		 */
		protected get preloadName():string{
			return 'preload';
		}
	
		/**
		 * 主题设置
		 * egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
		 * egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
		 * load Theme;
		 */
		protected initTheme(){
			return new Promise((resolve,reject)=>{
				let assetAdapter = new AssetAdapter();
				egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
				egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
				let theme:eui.Theme = new eui.Theme("resource/default.thm.json",this.stage);
				theme.once(eui.UIEvent.COMPLETE, () => {
					resolve();
				}, this);
			});			
		}

		protected log():void{
			eg.log("框架代码版本号:" + this.version);
			eg.log("engineVersion:" + egret.Capabilities.engineVersion);
			eg.log("renderMode:" + egret.Capabilities.renderMode);
			eg.log("runtimeType:" + egret.Capabilities.runtimeType);
			eg.log("os:" + egret.Capabilities.os);
			eg.log("isMobile:" + egret.Capabilities.isMobile);
			eg.log("boundingClientWidth:" + egret.Capabilities.boundingClientWidth);
			eg.log("boundingClientHeight:" + egret.Capabilities.boundingClientHeight);
			eg.log("navigator.userAgent:" + window.navigator.userAgent);
			eg.log("window.screen width|height:" + window.screen.width + "|" + window.screen.height);
			// eg.log("STAGE_W|STAGE_H:" + eg.Config.STAGE_W + "|" + eg.Config.STAGE_H);
			eg.log("document.body.clientWidth|document.body.clientHeight" + document.body.clientWidth + "|" + document.body.clientHeight);
		}	

		/**
		 * 创建场景 重写该方法
		 */
		protected async createGameScene(){

		}


		/**
		 * 自定义exml资源加载器
		 * 
		 */
		// protected customEXMLProcessor():void{						
		// 	RES.processor.map('exml',new EXMLProcessor());
		// }
	}
}
//微信小游戏环境，必须手动绑定到window中，否则 通过 getDefinitionByName 无法获取到
// if(egret.Capabilities.runtimeType == 'wxgame'){
// window['eg'] = eg;// 后续考虑在发布脚本中绑定
// }