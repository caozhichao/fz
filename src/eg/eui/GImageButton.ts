module eg {
	export class GImageButton extends eui.Image implements eg.IDispose{
		private flag:boolean;
		private curMatrix:egret.Matrix;
		private srcX:number;
		private srcY:number;
		private _enabled:boolean;

		public static TOUCH_END:string = 'GImageButton_TOUCH_END';
		public constructor() {
			super();
			this.initUI();
		}

		private initUI():void{			
			this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
			
		}

		protected onTouchBegin(event:egret.TouchEvent):void {
			eg.log('onTouchBegin:' + this.flag);
			if(!this.flag){
				this.flag = true;
				this.srcX = this.x;
				this.srcY = this.y;
				eg.log('x:' + this.srcX + 'y:' + this.srcY); 				
				// this.$stage.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancle, this);
				this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onStageTouchEnd, this);   
				// this.addEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this);        			
				let m:egret.Matrix = new egret.Matrix();
				m.scale(0.9,0.9);
				m.translate(this.x + this.width * 0.1 / 2,this.y + this.height * 0.1 / 2)			
				// this.matrix = m;

				// /*
				//缓动处理
				let a = this.matrix;
				egret.Tween.get(a,{onChange:()=>{				
					this.matrix = a;
					this.curMatrix = a;
				}}).to({a:m.a,b:m.b,c:m.c,d:m.d,tx:m.tx,ty:m.ty},50);			
				// */
			} else {
				event.stopImmediatePropagation();
			}

        }

		private onTouchEnd(evt:egret.TouchEvent):void{
			eg.log('onTouchEnd');
			this.dispatchEventWith(GImageButton.TOUCH_END);
		}

		  /**
         * @private
         * 舞台上触摸弹起事件
         */
        private onStageTouchEnd(event:egret.TouchEvent):void {
            // let stage = event.$currentTarget;
			eg.log('onStageTouchEnd');
			if(event.target == this){
				eg.log('onStageTouchEnd22222');
				this.dispatchEventWith(GImageButton.TOUCH_END);
			}
            // stage.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancle, this);
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onStageTouchEnd, this);      
			// this.removeEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this);      
			egret.Tween.removeTweens(this);
			let m:egret.Matrix = new egret.Matrix();
			m.scale(1,1);
			// m.translate(this.x - this.width * 0.1 / 2,this.y - this.height * 0.1 / 2);
			m.translate(this.srcX,this.srcY);
			// this.matrix = m;			

			// /*	
			let a = this.matrix;
			egret.Tween.get(a,{onChange:()=>{				
				this.matrix = a;
			}}).to({a:m.a,b:m.b,c:m.c,d:m.d,tx:m.tx,ty:m.ty},50).call(()=>{
				this.flag = false;
				eg.log('onStageTouchEnd:' + this.flag);
			},this);
			// */
			// this.flag = false;
        }

		protected onTouchCancle(event:egret.TouchEvent):void {
            let stage = event.$currentTarget;
            stage.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancle, this);
            stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onStageTouchEnd, this);   
			eg.log('onTouchCancle');         
        }

		public set enabled(value:boolean){
			this._enabled = value;		
			this.touchEnabled = value;	
			if(!value){
				var mat:number[] =[0.3086,0.6094,0.082,0,0,0.3086,0.6094,0.082,0,0,0.3086,0.6094,0.082,0,0,0,0,0,1,0];
				var colorMat:egret.ColorMatrixFilter = new egret.ColorMatrixFilter(mat);
				this.filters = [colorMat];
			} else {
				this.filters = [];
			}
		}

		public get enabled():boolean {
            // return this.$Component[eui.sys.ComponentKeys.enabled];
			// return egret.superGetter(eg.GButton,this,'enabled');
			return this._enabled;
        }


		public dispose():void{
			this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
		}

	}
}