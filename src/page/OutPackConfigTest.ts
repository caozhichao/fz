module test {
	export class OutPackConfigTest extends egret.Sprite{
		public constructor() {
			super();
			this.init();
		}

		private async init(){
			await RES.loadConfig('http://hf.rongyi.com/o2o/v4/cf/cf_legao/resource/default.res_8d50bbe1.json','http://hf.rongyi.com/o2o/v4/cf/cf_legao/resource');

			//
			eg.QueueLoader.Instance.loadGroup('map',0,this,()=>{
				console.log('aaa');
			})

		}
	}
}