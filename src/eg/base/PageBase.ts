module eg {
	export class PageBase extends eui.Component implements eg.IPage{
		public static INIT_COMPLETE:string = 'init_complete';

		private _upPageName:string;
		private _extraData:any;
		private _upPageExtraData:any;
		private _skinName:string;
		//是否释放
		private _isDispose:boolean = false;
		//资源组的名称
		private _resName:string[];
		public constructor() {
			super();
			this.height = eg.Config.STAGE_H;
			// this.width = eg.Config.STAGE_W;
		}

		public get pageType():string{
			return UILayer.LAYER_SCENCE;
		}

		public get pageId():number{
			return -1;
		}

		public get content():egret.DisplayObject{
			return this;
		}

		public initUI(pageData:any):void{
			eg.log(pageData);
			this.dispatchEventWith(PageBase.INIT_COMPLETE);
		}

		public async pageData(){
			return Promise.resolve({});
		}

		public async open(){
			eg.Loading.Instance.show();
			await this.loadRes(this.resName);	
			let data = await this.pageData();
			await this.setPageSkin();
			eg.Loading.Instance.hide();		
			this.initUI(data);
			this.enter();
			this.loadRes(this.preNextResName);
		}

		private async loadRes(groups:string[]){
			return new Promise((resolve,reject)=>{		
				let num:number = 0;
				let count:number = 0;		
				if( groups != null && groups.length > 0){
					count = groups.length;
					eg.QueueLoader.Instance.loadGroupArray(groups,eg.QueueLoader.MAX_PRIORITY,this,onComplete,onProgress);
				} else {
					// onComplete();
					resolve();
				}
				function onComplete():void{
					num++;
					if(num == count){
						resolve();
						eg.log("资源加载完成:" + groups);
					}
				}
				function onProgress(progress):void{
					// {itemsLoaded:evt.itemsLoaded,itemsTotal:evt.itemsTotal}
					eg.Loading.Instance.progress(progress.itemsLoaded,progress.itemsTotal);
				}
			})
		}

		public async close(){
			await this.exit();
			this.dispose();
		}

		public enter():void{

		}

		public async exit(){
			return Promise.resolve({});
		}

		public get resName():string[]{
			return this._resName;
		}

		public set resName(value:string[]){
			this._resName = value;
		}

		public get preNextResName():string[]{
			return null;
		}

		public dispose():void{
			this._isDispose = true;
			if(this.parent){
				this.parent.removeChild(this);
				eg.EventDispatcher.Instance.dispatchEventWith(egret.Event.CLOSE);
			}
			this._extraData = null;
			this._upPageExtraData = null;

			//删除所有的子对象
			while(this.numChildren > 0){
				let element = this.removeChildAt(0);				
				if(egret.is(element,"eg.IDispose")){
					element['dispose']();
				} 
			}
		}

		public get pageSkinName():string{
			return this._skinName;
		}

		public setPageSkin(){	
			let self = this;
			return new Promise((resolve,reject)=>{				
				self.once(eui.UIEvent.COMPLETE,(evt:eui.UIEvent)=>{					
					resolve(); //保证内部组件初始化完成
				},self);
				
				if(self.pageSkinName != "" && self.pageSkinName != null){	
					//先检查皮肤资源是否存在	
					if(egret.getDefinitionByName(self.pageSkinName)){
						// this.skinName = this.pageSkinName;
						egret.superSetter(eg.PageBase,self,'skinName',self.pageSkinName);
					} else {
						eg.log(self.pageSkinName + '皮肤资源未找到');
					}	
				} else {					
					resolve();
				}
			});

		}

		public get pageName():string{
			return this.name;
		}

		public get upPageName():string{
			return this._upPageName;
		}

		public set upPageName(value:string){
			this._upPageName = value;
		}

		public get curPageExtraData():any{
			return this._extraData;
		}

		public set curPageExtraData(extraData:any){
			this._extraData = extraData;
		}

		public get upPageExtraData():any{
			return this._upPageExtraData;
		}

		public set upPageExtraData(extraData:any){
			this._upPageExtraData = extraData;
		}	

		public set skinName(value:any) {
			this._skinName = value;
		}

		public get skinName():any{			
			// return egret.superGetter(eg.getDefinition(this),this,'skinName');
			return this.pageSkinName;
		}

		public get isDispose():boolean{
			return this._isDispose;
		}

	}
}