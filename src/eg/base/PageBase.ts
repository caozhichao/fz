module eg {
	export class PageBase extends eui.Component implements eg.IPage{
		public static INIT_COMPLETE:string = 'init_complete';	
		private _extraData:any;		
		private _uiSkinName:string;
		//是否释放
		private _isDispose:boolean = false;
		//资源组的名称
		private _resName:string[];
		private _pageType:string;
		private _pageId:number;
		private _pageName:string;
		public constructor() {
			super();
			this.height = eg.Config.STAGE_H;
			// this.width = eg.Config.STAGE_W;
		}

		public set pageType(value:string){
			this._pageType = value;
		}
		public get pageType():string{
			return this._pageType || UILayer.LAYER_SCENCE;
		}

		public set pageId(value:number){
			this._pageId = value;
		}

		public get pageId():number{
			return this._pageId || -1;
		}

		public get content():egret.DisplayObject{
			return this;
		}

		public initComplete(pageData:any):void{
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
			this.initUISkin();			
			eg.Loading.Instance.hide();		
			this.initComplete(data);
			this.enter();			
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


		public dispose():void{
			this._isDispose = true;
			if(this.parent){
				this.parent.removeChild(this);
				eg.EventDispatcher.Instance.dispatchEventWith(egret.Event.CLOSE);
			}
			this._extraData = null;
			// this._upPageExtraData = null;
			for(let i = 0; i < this.numChildren;i++){
				let element = this.getChildAt(i);	
				if(egret.is(element,"eg.IDispose")){
					element['dispose']();
				} 
			}

			// //删除所有的子对象
			// while(this.numChildren > 0){
			// 	let element = this.removeChildAt(0);				
			// 	if(egret.is(element,"eg.IDispose")){
			// 		element['dispose']();
			// 	} 
			// }
		}

		public get uiSkinName():string{
			return this._uiSkinName;
		}

		public set uiSkinName(value:string){
			this._uiSkinName = value;
		}


		private initUISkin(){
			//先检查皮肤资源是否存在	
			if(egret.getDefinitionByName(this._uiSkinName)){				
				egret.superSetter(eg.PageBase,this,'skinName',this._uiSkinName);
			} else {
				eg.log(this._uiSkinName + '皮肤资源未找到');
			}
		}

		public set pageName(value:string){
			this._pageName = value;
		}

		public get pageName():string{
			return this._pageName || this.name;
		}

		/**
		 * 重写Component中的skinName 兼容使用
		 */
		public set skinName(value:any) {			
			this.uiSkinName = value;
		}

		public get skinName():any{			
			// return egret.superGetter(eg.getDefinition(this),this,'skinName');			
			return this.uiSkinName;
		}

		public get isDispose():boolean{
			return this._isDispose;
		}

	}
}