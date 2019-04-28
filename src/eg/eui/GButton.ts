module eg {
	/**
	 * 
	 * Button类
	 * 
	 * 
	 */
	export class GButton extends eui.Button implements IDispose{	
		private _matrix:egret.Matrix;	
		private _m1:egret.Matrix;
		public constructor() {
			super();			
			this._m1 = egret.Matrix.create();
		}

		protected onTouchBegin(event:egret.TouchEvent):void {
			super.onTouchBegin(event);						
			this.applyScaleMatrix('down');
			console.log('onTouchBegin');
			this.stage.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.onOutSide,this);
		}

		/**
		 * 应用缩放matrix
		 */
		private applyScaleMatrix(type:string):void{
			let w = this.width;
			let h = this.height;			
			let m:egret.Matrix = this._m1;
			m.identity();
			if(type == 'down'){
				m.scale(0.9,0.9);
				m.translate(w * 0.1 / 2,h*0.1/2);
			} else {
				m.scale(1,1);		
			}
			if(!this._matrix){
				this._matrix = this.matrix;
			}
			let m1 = this._matrix.clone().append(m.a,m.b,m.c,m.d,m.tx,m.ty);
			// m1.concat(m);
			// this.matrix = m1;
			let a = this.matrix;
			egret.Tween.get(a,{onChange:()=>{					
				this.matrix = a;				
			}}).to({a:m1.a,b:m1.b,c:m1.c,d:m1.d,tx:m1.tx,ty:m1.ty},50);	
		}

		protected onTouchCancle(event:egret.TouchEvent):void {
			super.onTouchCancle(event);
			console.log('onTouchCancle');
		}

		protected buttonReleased():void {
			console.log('buttonReleased');			
			this.applyScaleMatrix('up');
			this.stage.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.onOutSide,this);
        }

		private onOutSide(evt):void{
			console.log('onOutSide');			
			this.applyScaleMatrix('up');
			this.stage.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.onOutSide,this);
		}

		public dispose():void{			
			eg.log('GButtion dispose');
		}
	}
}