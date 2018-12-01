module test {
	export class DragonBonesTest extends egret.Sprite{
		public constructor() {
			super();

			this.test();
		}

		private test():void{

			var dragonbonesData = RES.getRes("chi_ske_json");  
			var textureData = RES.getRes("chi_tex_json");  
			var texture = RES.getRes("chi_tex_png");

			let egretFactory: dragonBones.EgretFactory = dragonBones.EgretFactory.factory;
			egretFactory.parseDragonBonesData(dragonbonesData);  
			egretFactory.parseTextureAtlasData(textureData, texture);

			let armatureDisplay: dragonBones.EgretArmatureDisplay = egretFactory.buildArmatureDisplay("chi");

			this.addChild(armatureDisplay);
			armatureDisplay.x = 100;
			armatureDisplay.y = 100;
			// armatureDisplay.scaleX = 0.5;
			// armatureDisplay.scaleY = 0.5;
			armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE,(evt)=>{
				console.log("aaaaaaaaaaaaaaaa");
			},this);
			armatureDisplay.animation.play("GamePlayer");

		}
	}
}