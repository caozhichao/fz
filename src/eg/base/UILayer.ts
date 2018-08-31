module eg {
	export class UILayer {
		private static _instance:UILayer;

		public static LAYER_SCENCE:string = "scence"; //基础场景层，最下面的层
		public static LAYER_FULL_SCREEN_WINDOW:string = "full_screen_window"; //全屏功能窗口层
		public static LAYER_WINDOW:string = "window"; //功能窗口层
		public static LAYER_TIPS_WINDOW:string = "tips_window"; //提示窗口层
		public static LAYER_TIPS_WINDOW_WORDS:string = "tips_words"; //飘字层
		public static LAYER_LOADING:string = "loading";
		private layerNames:string[];
		private layers:any;
		private layerContainer:egret.Sprite;

		private _stage:egret.Stage;

		public constructor() {
			this.layerNames = [UILayer.LAYER_SCENCE,UILayer.LAYER_FULL_SCREEN_WINDOW,UILayer.LAYER_WINDOW,UILayer.LAYER_TIPS_WINDOW,UILayer.LAYER_TIPS_WINDOW_WORDS,UILayer.LAYER_LOADING];
			this.layers = {};
			this.layerContainer = new egret.Sprite();
		}

		public static get Instance():UILayer{
			if(UILayer._instance == null){
				UILayer._instance = new UILayer();
			}
			return UILayer._instance;
		}

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

		public get layerWindow():egret.Sprite{
			return this.getLayerByType(UILayer.LAYER_WINDOW);
		}

		public get layerTips():egret.Sprite{
			return this.getLayerByType(UILayer.LAYER_TIPS_WINDOW);
		}

		public get layerScence():egret.Sprite{
			return this.getLayerByType(UILayer.LAYER_SCENCE);
		}

		public get layerFullScreenWindow():egret.Sprite{
			return this.getLayerByType(UILayer.LAYER_FULL_SCREEN_WINDOW);
		}

		public get layerTipsWords():egret.Sprite{
			return this.getLayerByType(UILayer.LAYER_TIPS_WINDOW_WORDS);
		}

		public get layerLoading():egret.Sprite{
			return this.getLayerByType(UILayer.LAYER_LOADING);
		}
	}
}