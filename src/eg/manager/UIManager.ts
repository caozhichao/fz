module eg {
	/**
	 * UI显示管理类
	 */
	export class UIManager {
		private static instance:UIManager;
		private _window:eg.IPage;
		private _tips:eg.IPage;
		//当前显示的窗口字典类 按pageType分类
		private _dic:Object = {};
		public constructor() {
		}

		public static get Instance():UIManager{
			if(UIManager.instance == null){
				UIManager.instance
				UIManager.instance = new UIManager();				
			}
			return UIManager.instance;
		}

		/**
		 * 打开显示一个page页 提供3种参数类型
		 */
		public showUI(cla:Function):void;
		public showUI(page:eg.IPage):void;
		public showUI(className:string):void;
		public showUI(param):void{

			let page:IPage;

			let type = typeof param;
			eg.log('type:' + type);	
			switch(type){
				case 'function':
					page = new param();
					break;
				case 'string':
					page = new (egret.getDefinitionByName(param))();
					break;
				case 'object':
					page = param as IPage;
					break;
			}					
			//绑定上一页的额外数据(同层数据传递)
			this.bindData(page);		
			//添加到显示层
			this.show(page);
			//数据上报
			this.uploadPageData(page);		
		}

		/**
		 * 添加显示对象到对应的层
		 */
		private show(page:IPage):void{
			//open
			page.open();
			let pageType:string = page.pageType;
			let layer:egret.Sprite = UILayer.Instance.getLayerByType(pageType);
			layer.addChild(page.content);
			//关闭上一页
			let upPage:IPage = this._dic[page.pageType];		
			if(upPage && !upPage.isDispose){
				upPage.close();
			}			
			this._dic[page.pageType] = page;

			// switch(pageType){
			// 	case UILayer.LAYER_WINDOW:	
			// 		if(this._window != null){				
			// 			this._window.close();
			// 		}
			// 		this._window = page;				
			// 		break;
			// 	case UILayer.LAYER_TIPS_WINDOW:
			// 		if(this._tips){
			// 			this._tips.close();
			// 		}
			// 		this._tips = page;						
			// 		break;
			// }			
		}

		/**
		 * 绑定上一页的额外数据到当前页
		 */
		private bindData(page:IPage):void{
			let upPage:IPage = this._dic[page.pageType];		
			page.upPageExtraData = this.getPageExtraData(upPage);	
		}
		
		/**
		 * 获取上一页的额外数据
		 */
		private getPageExtraData(page:IPage):any{
			let upPageExtraData = (page?page.curPageExtraData:{})||{};
			upPageExtraData.upPageName = page?page.pageName:"";
			return upPageExtraData;		
		}

		/**
		 * 页面数据上报
		 */
		private uploadPageData(page:IPage):void{
			let upPage:IPage = this._dic[page.pageType];
			//如果是提示类型，同层提示不存在，取对应的window层zuozuo
			if(upPage == null && page.pageType == UILayer.LAYER_TIPS_WINDOW){
				upPage = this._dic[UILayer.LAYER_WINDOW];
			}		
			let curPageName:string = page.pageName;
			let upPageName:string = upPage?upPage.pageName:"";
			if(eg.Config.isAutoUploadPageData && curPageName){
				ActLog.Instance.log({event_type:50,refer_page_name:upPageName,current_page_name:curPageName});
			}
		}
	}
}