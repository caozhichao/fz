namespace eg {
	export interface ILoadingUI  extends eg.IDisplayObject{		
		progress(cur:number,total:number):void;
		show(msg?:string);
		hide();		
	}
}