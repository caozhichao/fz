
/**
 * 版本号生成脚本
 * 格式如下
 * {
 * 	resource/assets/game/test.proto:resource/assets/game/test_1fa6fd2.proto
 * }
 * 
 */

// import * as crypto from 'crypto';
// const crypto = require('crypto');
// const hash = crypto.createHash('crc32');
// var crc = require('crc32');
// import * as crc from 'crc32';
// const crc32 = require("./crc32.js");
// console.log(crc32);

export class VersionPlugin2 implements plugins.Command{
	private info:any = {};
	private _outputDir:string;
	public constructor(outputDir:string) {
		this._outputDir = outputDir;
	}

	async onFile(file: plugins.File) {
		if(file.origin.indexOf('assets/game') != -1 			
			|| file.origin == 'resource/default.res.json'
			|| file.origin == 'resource/config/description.json'
		){
			// console.log('path:' + file.origin);
			// console.log('base:' + file.base);
			// console.log('relative:' + file.relative);
			this.info[file.origin] = file.relative.replace(/\\/g,'/');
			// console.log(file.relative.replace(/\\/g,'/'));
			// hash.update('some data to hash');
			// console.log(hash.digest('hex'));
			// let crc32code = this.generateCrc32Code(file.contents);
			// console.log(file.relative + "|" + crc32code);
		}
		// console.log(file.path.indexOf('assets\\game'));
		return file;
	}

	async onFinish(commandContext:plugins.CommandContext){	
		// console.log(JSON.stringify(this.info));
		commandContext.createFile(this._outputDir + "/version.json",new Buffer(JSON.stringify(this.info)));        
	}

	// generateCrc32Code(buffer) {
	// 	// var crc32 = globals.getCrc32();
	// 	var crc32code = crc32(buffer);
	// 	return crc32code;
	// }
}