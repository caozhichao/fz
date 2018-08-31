module eg {
	export class WXImageProcessor implements RES.processor.Processor{
		  async onLoadStart(host, resource:RES.ResourceInfo) {
			  eg.log('host:' + host);
			  eg.log(resource.root + "|" + resource.url + "|" + resource.name + "|" + resource.type + "|" + resource.crc32);			  
			  return await eg.WXCacheManager.Instance.getRes(resource.root + resource.url);
		  }

		  onRemoveStart(host, resource) {

            let texture = host.get(resource);
            texture.dispose();
            return Promise.resolve();
        }
	}
}