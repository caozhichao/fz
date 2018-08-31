module eg {
	export class WXSheetProcessor implements RES.processor.Processor{
		public constructor() {
		}

		async onLoadStart(host: RES.ProcessHost, resource: RES.ResourceInfo){
			//加载配置
			let jsonUrl:string = resource.root + resource.url;
			let data:any = await eg.WXCacheManager.Instance.getRes(jsonUrl);
			//加载图片
			var index = jsonUrl.lastIndexOf("/");
			let imgUrl:string;
			if (index != -1) {
				imgUrl = jsonUrl.substring(0, index + 1) + data.file;
			}

			let texture:egret.Texture = await eg.WXCacheManager.Instance.getRes(imgUrl) as egret.Texture;			
            var frames: any = data.frames;
            var spriteSheet = new egret.SpriteSheet(texture);
            for (var subkey in frames) {
                var config: any = frames[subkey];
              	spriteSheet.createTexture(subkey, config.x, config.y, config.w, config.h, config.offX, config.offY, config.sourceW, config.sourceH);
                // if (config["scale9grid"]) {
                //     var str: string = config["scale9grid"];
                //     var list: Array<string> = str.split(",");
                //     texture["scale9Grid"] = new egret.Rectangle(parseInt(list[0]), parseInt(list[1]), parseInt(list[2]), parseInt(list[3]));
                // }
                //     if (name) {
                //         this.addSubkey(subkey, name);
                //     }
            }
            return spriteSheet;			
		}

		getData(host, resource, key, subkey) {
			eg.log(key + '|' + subkey);
            let data: egret.SpriteSheet = host.get(resource);
            if (data) {
                return data.getTexture(subkey);
            }
            else {
                console.error(`missing resource : ${key}#${subkey}`);
                return null;
            }
        }

		onRemoveStart(host: RES.ProcessHost, resource: RES.ResourceInfo){
			return Promise.resolve();
		}

	}
}