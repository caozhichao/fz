module eg {
	export class WXFile{
		//微信小游戏用户目录
		public static WX_ROOT;// = wx.env.USER_DATA_PATH + "/";	
		//资源缓存的总目录
		public static CACHE_DIR:string = "cache/";
		//远程网络url 或者是 本地资源地址(缓存的，包中的资源)
		private _remoteUrl:string;	
		//本地完整路径
		private _prefixPath:string;
		//本地路径 不带前缀
		private _path:string;
		//wx fs
		private fs:any;
		public constructor(url:string,path?:string){
			WXFile.WX_ROOT = wx.env.USER_DATA_PATH + "/";
			this._remoteUrl = url;
			this._path = path;
			eg.log('url:' + this._remoteUrl);
			this.fs = wx.getFileSystemManager();
		}

		public get remoteUrl():string{
			return this._remoteUrl;
		}

		/**
		 * 判断是否是远程网络资源
		 */
		public get isRemotePath():boolean{
        	return this._remoteUrl.indexOf("http://") == 0 || this._remoteUrl.indexOf("https://") == 0;
    	}

		public get localPath():string{
			//eg.log('localPath 1:' + this._path);
			if(this._path == null){
				let path:string;
				let position:number = this._remoteUrl.indexOf('resource/');
				if(position != -1){
					path = WXFile.CACHE_DIR + this._remoteUrl.substr(position+9);
					path = path.split('?')[0];
				}
				this._path = path;
			}
			eg.log('localPath:' + this._path);
			return this._path;
		}

		public get prefixPath():string{
			if(this.isRemotePath){
				return WXFile.WX_ROOT + this.localPath;
			} else {
				//非远程地址，直接使用本地路径(非本地缓存路径)
				return this._remoteUrl;
			}
		}	

		public get version():string{
			let v;
			let vInfo = this._remoteUrl.split('?')[1];
			// eg.log('vInfo:' + vInfo);
			if(vInfo){
				v = vInfo.split('=')[1]
			}
			eg.log('version:' + v);
			return v;
		}

		/**
		 * 文件目录
		 */
		public getDirList():string[]{
			let arr = this.localPath.split('/');
			arr.pop();
			return arr;
		}

		/**
		 * 创建文件目录
		 */
		public mkdir(){			
			let dirs:string[] = this.getDirList();
			///*
			let tempPath:string = '';
			for(let i:number = 0; i < dirs.length;i++){
				tempPath += dirs[i] + '/';
				//eg.log('tempPath:' + tempPath);
				if(!this.exists(tempPath)){
					this.fs.mkdirSync(WXFile.WX_ROOT + tempPath);
					eg.log('mkdir:' + WXFile.WX_ROOT + tempPath);
				}
				// tempPath +='/';
			}
			//*/
			/*
			let dir = dirs.join('/');
			eg.log('dir:' + dir);
			if(!this.exists(dir)){
				let dirPath = WXFile.WX_ROOT + dir + '/';
				eg.log('dirPath:' + dirPath);
				this.fs.mkdirSync(dirPath,true);
			}
			*/
		}

		/**
		 * 判断文件/目录是否存在
		 */
		public exists(path:string):boolean{			
			path = WXFile.WX_ROOT + path;
			try {
				this.fs.accessSync(path);
				eg.log('exists1:' + path + ' 存在');
				return true;
			} catch (error) {
				eg.log('exists2:' + path + ' 不存在');
				return false;
			}			
		}

		public writeText(data:string){
			this.mkdir();			
			this.fs.writeFile({
				filePath:this.prefixPath,
				data:data,
				encoding:'utf8',
				success:(res)=>{
					eg.log('writeText success');
				}
			})
		}

		/**
		 * 读取文件
		 */
		public read(){			
			return new Promise(async(resolve,reject)=>{
				// this.fs.readFile({
				// 	filePath:path,
				// 	encoding:'base64',
				// 	success:(res)=>{
				// 		// eg.log(data);
				// 		eg.log(res.data);	
				// 		resolve(res.data);				
				// 	},
				// 	fail:(res)=>{
				// 		eg.log('readFile fail:' + res);
				// 	}
				// })

				let arr:string[] = this.localPath.split('.');
				let suffix:string =arr[arr.length-1];
				eg.log('suffix:' + suffix);
				let result;
				switch(suffix){
					case 'jpg':
					case 'png':
						 result = await this.readImage();
						break;
					case 'json':
						result = await this.readText();
						result = JSON.parse(result);
						break;
					case 'text':
						result = await this.readText();
						break;					
				}
				
				resolve(result);

			})

		}

		/**
		 * 网络下载资源
		 */
		public downloadFile(){
			//构建文件目录
			return new Promise((resovle,reject)=>{
				this.mkdir();					
				let url:string = this.remoteUrl;
				let filePath:string = this.prefixPath;
				wx.downloadFile({
								url:url,
								filePath:filePath,
								success:(res)=>{
									eg.log('success');	
									resovle();							
								},
								fail:(res)=>{
									eg.log('fail');
									reject();
								}
				});
			})
		}

		/**
		 * 图片读取
		 */
		private readImage(){
			return new Promise((resolve,reject)=>{
					let image = wx.createImage();
					image.onload = () => {
						const bitmapdata = new egret.BitmapData(image);
						const texture = new egret.Texture();
						texture._setBitmapData(bitmapdata);
						eg.log('readImage texture:' + texture);
						setTimeout(() => {
							resolve(texture);							
						}, 0)
					}
					image.onerror = (e) => {
						console.error(e)
						eg.log('-----------------------');
						// e = new RES.ResourceManagerError(1001, this.prefixPath);
						reject(e);
					}
					eg.log('prefixPath:' + this.prefixPath);
					image.src = this.prefixPath;
			})
		}

		/**
		 * 文本读取
		 */
		private readText(){
			return new Promise((resolve,reject)=>{
				this.fs.readFile({
						filePath:this.prefixPath,
						encoding:'utf8',
						success:(res)=>{
							// eg.log(data);
							eg.log('readText:' + res.data);	
							resolve(res.data);				
						},
						fail:(res)=>{
							eg.log('readFile fail:' + res);
							reject();
						}
				})
			})
		}

	}
}