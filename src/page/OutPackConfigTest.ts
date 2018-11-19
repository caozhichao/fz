module test {
	export class OutPackConfigTest extends eg.PageBase{
		public constructor() {
			super();
			// this.init();
			this.resName = ['map'];
		}

		private async init(){
			// await RES.loadConfig('http://hf.rongyi.com/o2o/v4/cf/cf_legao/resource/default.res_8d50bbe1.json','http://hf.rongyi.com/o2o/v4/cf/cf_legao/resource');
			//
			// eg.QueueLoader.Instance.loadGroup('map',0,this,()=>{
			// 	console.log('aaa');
			// })
			// eg.QueueLoader.Instance.loadGroup('preload1');
			// eg.QueueLoader.Instance.loadGroup('map');
		}
	}
}