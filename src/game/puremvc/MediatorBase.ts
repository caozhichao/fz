module game {
	/**
	 * MediatorBase 
	 */
	export class MediatorBase extends puremvc.Mediator implements puremvc.IMediator{
		public constructor(mediatorName:string=null, viewComponent:any=null) {
			super(mediatorName,viewComponent);
		}

		onRegister():void{
			super.onRegister();
			//ui初始化完成			
			this.viewComponent.addEventListener(eg.PageBase.INIT_COMPLETE,this.uiInitComplete,this);
			//ui从舞台移除
			this.viewComponent.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.onRemoved,this);
		}

		public uiInitComplete(evt:egret.Event):void{
			eg.log(this.mediatorName + '->uiInitComplete');
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