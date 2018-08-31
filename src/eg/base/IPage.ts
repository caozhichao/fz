module eg {
	export interface IPage extends IDispose{	
        readonly pageType:string; //界面类型 对应UILayer 层
		readonly pageId:number;  //pageId             
		readonly content:egret.DisplayObject;
        pageData();	//界面数据	
		initUI(pageData:any):void;  //初始化UI
        enter():void; //显示之前，处理入场动画
        exit();  //退出之前，处理退场动画
        open()   //显示当前页面
        close();  //关闭当前页面
        resName:string[]; //当前页面需要的资源组
		readonly preNextResName:string[];//预加载其他资源组

        readonly pageSkinName:string;  //皮肤class名称
        
        /**
         * 页面名称
         */
        readonly pageName:string;

        /**
         * 当前页的额外数据
         */
        curPageExtraData:any;
        /**
         * 上一页的额外数据
         */
        upPageExtraData:any;

        /**
         * 是否关闭释放
         */
        readonly isDispose:boolean;
	}
}