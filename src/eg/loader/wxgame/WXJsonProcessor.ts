module eg {
	export class WXJsonProcessor implements RES.processor.Processor{
		public constructor() {
		}

		async onLoadStart(host: RES.ProcessHost, resource: RES.ResourceInfo){
			let url:string;
			if(resource.url.indexOf('http://') == 0 || resource.url.indexOf('https://') == 0){
				url = resource.url;
			} else {
				url = resource.root + resource.url;
			}
			return await eg.WXCacheManager.Instance.getRes(url);
		}

		onRemoveStart(host: RES.ProcessHost, resource: RES.ResourceInfo){
			return Promise.resolve();
		}
	}
}