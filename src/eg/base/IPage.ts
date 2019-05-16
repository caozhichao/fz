module eg {
    /**
     * 界面定义
     */
	export interface IPage extends IDispose{
        /**
         * 界面类型 对应UILayer 层次结构
         */    	
        readonly pageType:string;
        /**
         * 界面id
         */
		readonly pageId:number;
        /**
         * 界面显示对象内容
         */
		readonly content:egret.DisplayObject;
        /**
         * 页面名称
         */
        readonly pageName:string;
        /**
         * 界面预加载数据函数(子类重写)
         */
        pageData();
        /**
         * 初始化UI完成(子类重写该函数)
         */
		initComplete(pageData:any):void;
        enter():void; //显示之前，处理入场动画
        exit();  //退出之前，处理退场动画
        /**
         * 打开页面
         */
        open()   
        /**
         * 关闭页面
         */
        close();
        /**
         * 当前页面需要的资源组名称
         * ["groupNameA",'groupNameB']
         */
        resName:string[];         		
        /**
         * 皮肤名称
         */
        uiSkinName:string;
        

        // /**
        //  * 当前页的额外数据
        //  */
        // curPageExtraData:any;
        // /**
        //  * 上一页的额外数据
        //  */
        // upPageExtraData:any;
        /**
         * 是否关闭释放
         */
        readonly isDispose:boolean;
	}
}