module eg {
	/**
	 * 
	 * Button类
	 * 
	 * 
	 */
	export class GButton extends eui.Button implements IDispose{
		//public bgIcon:eui.Image;
		public constructor() {
			super();
			// this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTap,this);
			eg.log('GButton');
		}

		protected buttonReleased():void{
			eg.log('onTap:' + this.name);
			// let page= this.parent;
			// eg.log(page instanceof PageBase);
			if(Config.isAutoUploadPageData && this.name){
				let self = this.parent;
				while(self){
					if(self instanceof PageBase){
						eg.log(self);
						break;
					}
					self = self.parent;
				}
				if(self){
					//数据埋点上报
					let page:PageBase = <PageBase>self;
					ActLog.Instance.log({event_type:51,refer_page_name:page.upPageExtraData['upPageName'],current_page_name:page.pageName,element_name:this.name});				
				}
			}
		}

		/**
		 * 重写get set 方法 必须同时重写
		 * 
		 */
		public set enabled(value:boolean){
			// eg.log('enabled');
			// value = !!value;
			// this.$setEnabled(value);
			egret.superSetter(eg.GButton,this,'enabled',value);
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
			return egret.superGetter(eg.GButton,this,'enabled');
        }

		protected getCurrentState():string {
			let state:string = super.getCurrentState();						
			if(state == 'down'){
				this.scaleX = this.scaleY = 0.9;
			} else {			
				this.scaleX = this.scaleY = 1;
			}			
			
			return state;
		}

		protected partAdded(partName:string, instance:any):void {
			eg.log(partName);
        }

		protected childrenCreated():void {
			//eg.log('childrenCreated:' + this.bgIcon);
			//this.bgIcon.x = -100;
			// this.bgIcon.anchorOffsetX = this.bgIcon.width / 2;
			// this.bgIcon.anchorOffsetY = this.bgIcon.height / 2;
			// for(let i:number = 0; i < this.numChildren; i++){
			// 	let child:eui.UIComponent = this.getChildAt(0) as eui.UIComponent;
			// 	child.percentWidth = child.percentHeight = 100;
			// 	child.horizontalCenter = 0;
			// 	child.verticalCenter = 0;				
			// } 
			//this.invalidateState();
			//let a = this.skin.states;
        }


		//  protected getCurrentState():string {
        //     // if (!this.enabled)
        //     //     return "disabled";

        //     // if (this.touchCaptured)
        //     //     return "down";

        //     // return "up";
		// 	let state:string = super.getCurrentState();
		// 	eg.log('state:' + state);
		// 	return state;
        // }
		
		public dispose():void{
			// this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTap,this);			
			eg.log('GButtion dispose');
		}
	}
}