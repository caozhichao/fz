module eg {
	export class GImageButton extends eui.Image{
		public constructor() {
			super();
			this.initUI();
		}

		private initUI():void{
			this.touchEnabled = true;
			this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
		}

		protected onTouchBegin(event:egret.TouchEvent):void {
            this.$stage.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancle, this);
            this.$stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onStageTouchEnd, this);           
			this.scaleX = this.scaleY = 0.9;
			eg.log(this.width + '|' + this.height);
			//this.x = (1 - 0.9) * this.width;
        }

		  /**
         * @private
         * 舞台上触摸弹起事件
         */
        private onStageTouchEnd(event:egret.Event):void {
            let stage = event.$currentTarget;
            stage.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancle, this);
            stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onStageTouchEnd, this);
            // if (this.contains(event.target)){
            //     this.buttonReleased();
            // }          
			this.scaleX = this.scaleY = 1;
			eg.log('onStageTouchEnd');
        }

		protected onTouchCancle(event:egret.TouchEvent):void {
            let stage = event.$currentTarget;
            stage.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancle, this);
            stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onStageTouchEnd, this);   
			eg.log('onTouchCancle');         
        }

	}
}