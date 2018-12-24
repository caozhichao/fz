module eg {
	export class QueueLoader {
		private static _instance:QueueLoader;
		private resQueue:any[];
		private priority:number;
		private list:any[];
		private loadResName:string;
		private state:string;
		public static LOADING:string = "loading";
		public static FREE:string = "free";
		public static MAX_PRIORITY:number = 10000;
		public constructor() {
			this.resQueue = [];
			this.list = [];
			this.priority = QueueLoader.MAX_PRIORITY;
			RES.setMaxLoadingThread(3);
		}

		public static get Instance():QueueLoader{
			if(QueueLoader._instance == null){
				QueueLoader._instance = new QueueLoader();
			}
			return QueueLoader._instance;
		}

		/**
		 * 加载一个动态创建的资源组
		 */
		public loadArray(name:string,keys:string[],priority:number=-1,thisObject:any=null,onComplete:Function=null,onProgress:Function=null,onError:Function=null):void{
			RES.createGroup(name,keys);
			this.loadGroup(name,priority,thisObject,onComplete,onProgress,onError);
		}

		/**
		 * 加载一个多个资源组
		 */
		public loadGroupArray(groups:string[],priority:number=-1,thisObject:any=null,onComplete:Function=null,onProgress:Function=null,onError:Function=null):void{
			groups.forEach(element => {
				this.loadGroup(element,priority,thisObject,onComplete,onProgress,onError);
			});
		}

		/***
		 * 资源组加载器
		 * @params name 资源组的 组名
		 * @params priority 优先级 数字越大优先级越高
		 * @params thisObject 函数调用对象
		 * @params onComplete 完成函数
		 * @params onProgress 进度函数 {itemsLoaded:evt.itemsLoaded,itemsTotal:evt.itemsTotal}
		 * @params onError    错误函数
		 */
		public loadGroup(name:string,priority:number=-1,thisObject:any=null,onComplete:Function=null,onProgress:Function=null,onError:Function=null):void{
			try {
				//判断资源组配置是否存在,不存在抛出异常
				RES.getGroupByName(name);
				if(priority == -1){
					priority = this.priority--;
				}
				eg.log("新增加载列表:" + name);
				let loadVo:any = {name:name,priority:priority,thisObject:thisObject,onComplete:onComplete,onProgress:onProgress,onError:onError};
				this.resQueue.push(loadVo);		
				if(this.state == QueueLoader.LOADING){
					//加入后入的相同的资源
					if(this.loadResName == name){
						this.list.push(loadVo);
						eg.log("相同组后加入element:" + name + "|" + loadVo.priority);
					}
				}
				this.load();
			} catch (error) {
				eg.log(error.toString());			
			}
		}	

		private load():void{
			if(this.state == QueueLoader.LOADING){
				return;
			}
			//按优先级排序
			this.resQueue.sort((a:any,b:any)=>{
				return b.priority - a.priority;
			});
			let loadVo:any = this.resQueue.shift();
			if(loadVo == null){
				return;
			}

			if(RES.isGroupLoaded(loadVo.name)){
				//已经加载过
				eg.log("已经加载过:" + loadVo.name);
				if(loadVo.onComplete){
					loadVo.onComplete.call(loadVo.thisObject);
				}
				return;
			}

			let self = this;
			//记录当前加载的资源组名称
			this.loadResName = loadVo.name;
			this.state = QueueLoader.LOADING;

			//加载钱，找到队列中所以相同的资源组
			// let list:any[] = [];
			this.list.length = 0;
			this.list.push(loadVo);
			this.resQueue.forEach(element => {
				if(element.name == loadVo.name){
					this.list.push(element);
					eg.log("查找相同组element:" + element.name + "|" + element.priority);
				}
			});

			//添加资源组加载完成事件
			RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, onResourceLoadComplete, this);
			//添加资源组加载失败事件
			RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, onResourceLoadError, this);
			//添加资源组加载进度事件
			RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, onResourceProgress, this);
			//添加资源加载失败事件
			RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResourceItemLoadError, this);

			let name:string = loadVo.name;
			let priority:number = loadVo.priority;

			let t1:number = egret.getTimer();

			eg.log("加载中:" + name + "|" + priority + "|开始时间:" + t1);
			RES.loadGroup(name,priority);

			function onResourceLoadComplete(evt:RES.ResourceEvent):void{	
				let t2:number = egret.getTimer();				
				if(evt.groupName == name){
					this.state = QueueLoader.FREE;									
					removeEventListener();
					self.list.forEach(element => {
						if(element.onComplete){
							element.onComplete.call(element.thisObject,loadVo.name);
						}
						let index:number = self.resQueue.indexOf(element);
						if(index != -1){
							self.resQueue.splice(index,1);
						}
						eg.log("加载完成element:" + element.name + "|" + element.priority + "耗时:" + t2 + "-" + t1 + "=" + (t2 - t1));
					});	
					// eg.log("加载完成:" + loadVo.name  + "|" + loadVo.priority);
					//加载下一个
					self.load();				
				}
			}

			function onResourceLoadError(evt:RES.ResourceEvent):void{
				if(evt.groupName == name){									
					removeEventListener();
					self.list.forEach(element => {
						if(element.onError){
							element.onError.call(element.thisObject);
						}
					});	
				}
			}

			function onResourceProgress(evt:RES.ResourceEvent):void{
				if(evt.groupName == name){										
					// eg.log("资源组:[" + name + "]" + evt.itemsLoaded + "/" + evt.itemsTotal + 'url:' + evt.resItem.url);
					self.list.forEach(element => {
						if(element.onProgress){
							element.onProgress.call(element.thisObject,{itemsLoaded:evt.itemsLoaded,itemsTotal:evt.itemsTotal});
						}
					});	
				}
			}

			function onResourceItemLoadError(evt:RES.ResourceEvent):void{
				//Log.warn(evt.groupName + "|" + evt.resItem.url);
				eg.log(evt.groupName + "|" + evt.resItem.url)
			}

			function removeEventListener():void{				
				RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, onResourceLoadComplete, self);				
				RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, onResourceLoadError, self);				
				RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, onResourceProgress, self);				
				RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResourceItemLoadError, self);
			}
		}
	}	
}

