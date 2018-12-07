module eg {
	/**
	 * 虚拟摇杆
	 */
	export class VirtualJoystick extends egret.Sprite{		
		private _bg:VirtualBg;
		private _block:MoveBlock;
		private $tempPos1:egret.Point;
		private $tempPos2:egret.Point;
		public constructor() {
			super();
			this.initUI();
		}

		private initUI():void{
			this._bg = new VirtualBg();
			this._block = new MoveBlock();
			this.addChild(this._bg);
			this.addChild(this._block);

			this._block.touchEnabled = true;
			this._block.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onBegin,this);

			this.$tempPos1 = new egret.Point();
			this.$tempPos2 = new egret.Point();
		}

		private onBegin(evt:egret.TouchEvent):void{
			this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onMove,this);
			this.stage.addEventListener(egret.TouchEvent.TOUCH_END,this.onEnd,this);
			this.dispatchEventWith('v_start');
		}

		private onMove(evt:egret.TouchEvent):void{
			eg.log(evt.stageX + '|' + evt.stageY);
			
			
			this.$tempPos1.setTo(this.x,this.y);
			this.$tempPos2.setTo(evt.stageX,evt.stageY);			
			var dist = egret.Point.distance(this.$tempPos1, this.$tempPos2);
			var angle:number = Math.atan2(evt.stageY - this.y, evt.stageX - this.x);

			//手指距离在圆环范围内
			let r = 100 - 30;
			if(dist <= r){					
					this._block.x = evt.stageX - this.x;
					this._block.y = evt.stageY - this.y;
			//手指距离在圆环范围外
			}else{
				this._block.x = Math.cos(angle)*r;
				this._block.y = Math.sin(angle)*r;
			}
			this.dispatchEventWith('v_move',false,angle);
		}

		private onEnd(evt:egret.TouchEvent):void{
			this._block.x = 0;
			this._block.y = 0;
			this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onMove,this);
			this.stage.removeEventListener(egret.TouchEvent.TOUCH_END,this.onEnd,this);
			this.dispatchEventWith('v_over');
		}
	}
	class VirtualBg extends egret.Sprite{
		public constructor(){
			super();
			this.initUI();
		}

		private initUI():void{
			this.graphics.lineStyle(1,0x0BF709);
			this.graphics.drawCircle(0,0,100);
			this.graphics.endFill();
		}
	}
	class MoveBlock extends egret.Sprite{
		public constructor(){
			super();
			this.initUI();
		}

		private initUI():void{
			this.graphics.beginFill(0x0940F9);
			this.graphics.drawCircle(0,0,30);
			this.graphics.endFill();
		}
	}
}