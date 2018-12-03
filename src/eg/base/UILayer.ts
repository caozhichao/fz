module eg {
	/**
	 * UI 层级划分
	 * 
	 */
	export class UILayer {
		private static _instance:UILayer;

		public static LAYER_SCENCE:string = "scence"; //基础场景层
		public static LAYER_SCENCE_FUNCTION:string = "function"; //场景功能窗口层
		public static LAYER_POPUP:string = "popup"; //功能窗口层
		public static LAYER_ALERT:string = "alert"; //提示窗口层
		public static LAYER_EFFECT:string = "effect"; //飘字层
		public static LAYER_LOADING:string = "loading";
		private layerNames:string[];
		private layers:any;
		private layerContainer:egret.Sprite;

		private _stage:egret.Stage;

		public constructor() {
			this.layerNames = [UILayer.LAYER_SCENCE,UILayer.LAYER_SCENCE_FUNCTION,UILayer.LAYER_POPUP,UILayer.LAYER_ALERT,UILayer.LAYER_EFFECT,UILayer.LAYER_LOADING];
			this.layers = {};
			this.layerContainer = new egret.Sprite();
		}

		public static get Instance():UILayer{
			if(UILayer._instance == null){
				UILayer._instance = new UILayer();
			}
			return UILayer._instance;
		}

		/**
		 * 初始化显示层
		 */
		public init(stage:egret.Stage):void{	
			this._stage = stage;		
			let layer:egret.Sprite;
			for(let i:number = 0; i < this.layerNames.length; i++){
				layer = new egret.Sprite();
				this.layers[this.layerNames[i]] = layer;
				this.layerContainer.addChild(layer);
			}			
			this._stage.addChild(this.layerContainer);
		}

		public getLayerByType(layerName:string):egret.Sprite{
			return this.layers[layerName];
		}

		public get popup():egret.Sprite{
			return this.getLayerByType(UILayer.LAYER_POPUP);
		}

		public get alert():egret.Sprite{
			return this.getLayerByType(UILayer.LAYER_ALERT);
		}

		public get scence():egret.Sprite{
			return this.getLayerByType(UILayer.LAYER_SCENCE);
		}

		public get sceceFunction():egret.Sprite{
			return this.getLayerByType(UILayer.LAYER_SCENCE_FUNCTION);
		}

		public get effect():egret.Sprite{
			return this.getLayerByType(UILayer.LAYER_EFFECT);
		}

		public get loading():egret.Sprite{
			return this.getLayerByType(UILayer.LAYER_LOADING);
		}
	}
}