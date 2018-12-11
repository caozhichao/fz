module eg {
	/**
	 * MediatorBase 
	 */
	export class MediatorBase extends puremvc.Mediator implements puremvc.IMediator{
		public constructor(mediatorName:string=null, viewComponent:any=null) {
			super(mediatorName,viewComponent);
		}

		onRegister():void{
			super.onRegister();
			// let display:egret.DisplayObject = this.getViewComponent();
			// if(this.viewComponent.stage){
			// 	this.onAdded(null);
			// } else {
			// 	this.viewComponent.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAdded,this);
			// }
			this.viewComponent.addEventListener(eg.PageBase.INIT_COMPLETE,this.uiInitComplete,this);
			this.viewComponent.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.onRemoved,this);
		}

		public uiInitComplete(evt:egret.Event):void{
			
		}

		public onRemoved(evt:egret.Event):void{
			//显示对象从舞台移除时，删除对应的Mediator
			this.facade().removeMediator(this.mediatorName);
			// this.viewComponent.removeEventListener(egret.Event.ADDED_TO_STAGE,this.onAdded,this);
			this.viewComponent.removeEventListener(eg.PageBase.INIT_COMPLETE,this.uiInitComplete,this);
			this.viewComponent.removeEventListener(egret.Event.REMOVED_FROM_STAGE,this.onRemoved,this);
		}

		onRemove():void{
			super.onRemove();			
		}
	}
}