import * as crypto from 'crypto';

/***
 * 
 * 资源版本号插件
 * 根据资源内容生成对应的md5版本号
 * 
 */
export class VersionPlugin implements plugins.Command{
	private buf:Buffer;    
    private resDic:any = {};
	private commond:string;
	private t1:number;
	// private folder:string[] = ['images','fonts','media','text','skins'];
	private folder:string = '/game/';
	public constructor(commond:string) {
		this.commond = commond;
	}

	async onFile(file:plugins.File){
		this.t1 = Date.now();
		if((file.origin.indexOf('assets/') != -1 && file.origin.indexOf(this.folder) == -1)
				|| file.origin.indexOf('eui_skins') != -1){							
			// console.log('过滤掉的url:' + file.origin);
			return null;
		}


		if(file.path.indexOf('default.res.json') != -1){            
            this.buf = file.contents;
        }  else {
			//console.log(file.origin + "|" + file.contents.length);
            this.resDic[file.origin] = file.contents;
        }		
        return file;		
	}

	async onFinish(commandContext:plugins.CommandContext){		
		// return;

		let  resjson = JSON.parse(this.buf.toString());
        let resources = resjson.resources;

		//1.删除配置文件中的被删除的资源配置项目
		let len = resources.length;
		let resObj;
		let delKeys = [];
		let delList = [];
		for(let i = 0; i < len; i++){
			resObj = resources[i];
			if((resObj.url.indexOf('assets/') != -1 && resObj.url.indexOf(this.folder) == -1)
				|| resObj.url.indexOf('eui_skins') != -1){					
				// console.log(resObj.url);
				delList.push(resObj);
			}			
		}

		//delete
		delList.forEach(element => {
			let index = resources.indexOf(element);			
			if(index != -1){
				resources.splice(index,1);
			}
		});


		//2.删除组中的需要删除的key
		// let groups = resjson.groups;
		// groups.forEach(element => {			
		// 	let keys:string[] = element.keys.split(',');
		// 	delKeys.forEach(element => {
		// 		let index = keys.indexOf(element);
		// 		if(index != -1){
		// 			keys.splice(index,1);
		// 		}
		// 	});
		// 	element.keys = keys.join(",");			
		// });

        resources.forEach(element => {       
			element.url += "?v=" + this.hash(this.resDic["resource/" + element.url]);            			
			console.log("VersionPlugin:" + element.url);
        });		
		if(this.commond == 'publish'){
			//发布替换原有发布的default.res.json
        	commandContext.createFile("resource/default.res.json",new Buffer(JSON.stringify(resjson)));        
		} else {
			//commandContext.createFile("a.json",new Buffer(JSON.stringify(resjson)));
		}  
		console.log("耗时:" + (Date.now() - this.t1));
	}

	hash(content: string | Buffer): string {
        return crypto.createHash('md5').update(content).digest('hex');
    }
}