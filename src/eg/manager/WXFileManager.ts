module eg {
	export class WXFileManager {
		private fs:any;		
		public constructor() {
			//this.fs = wx.getFileSystemManager();
		}

		public init():void{
			//this.WX_ROOT = wx.env.USER_DATA_PATH + "/";
		}

		// public get 

		public static get Instance():WXFileManager{
			return instance;
		}

		// public exists(WXFile:WXFile):boolean{			
		// 	try {
		// 		this.fs.accessSync(WXFile.prefixPath);
		// 		return true;
		// 	} catch (error) {
		// 		return false;
		// 	}			
		// }

		// public read(WXFile:WXFile){			
		// 	return new Promise((resolve,reject)=>{
		// 		// this.fs.readFile({
		// 		// 	filePath:path,
		// 		// 	encoding:'base64',
		// 		// 	success:(res)=>{
		// 		// 		// eg.log(data);
		// 		// 		eg.log(res.data);	
		// 		// 		resolve(res.data);				
		// 		// 	},
		// 		// 	fail:(res)=>{
		// 		// 		eg.log('readFile fail:' + res);
		// 		// 	}
		// 		// })
				
		// 		let image = wx.createImage();
		// 		image.onload = () => {
		// 			const bitmapdata = new egret.BitmapData(image);
		// 			const texture = new egret.Texture();
		// 			texture._setBitmapData(bitmapdata);
		// 			eg.log('texture:' + texture);
		// 			setTimeout(() => {
		// 				resolve(texture);
						
		// 			}, 0)

		// 		}
		// 		image.onerror = (e) => {
		// 			console.error(e)
		// 			// var e = new RES.ResourceManagerError(1001, imageURL);
		// 			// reject(e);
		// 		}
		// 		image.src = WXFile.prefixPath;

		// 	})

		// }
		
		// public write(path:string,data:ArrayBuffer){

		// }

		// public mkdir(WXFile:WXFile){			
		// 	let dirs:string[] = WXFile.getDirList();
		// 	let tempPath:string = '';
		// 	for(let i:number = 0; i < dirs.length;i++){
		// 		tempPath += dirs[i] + '/';
		// 		eg.log('tempPath:' + tempPath);
		// 		if(!this.exists(WXFile)){
		// 			this.fs.mkdirSync(WXFile.WX_ROOT + tempPath);
		// 			eg.log('mkdir:' + WXFile.WX_ROOT + + tempPath);
		// 		}
		// 	}
		// }

		// private getDirList(path:string):string[]{
		// 	let arr = path.split('/');
		// 	arr.pop();
		// 	return arr;
		// }
	}
	let instance:WXFileManager = new WXFileManager();	

	
}