module test {
	export class WX_addCard_Test extends egret.Sprite{
		private config:any;
		private api_ticket;
		public constructor() {
			super();
			this.initUI();
		}

		private async initUI(){
			let mallId = '54f403eae4b002000cf63762';
			let result:any = await eg.get("http://weixin.preview.rongyi.com/api/wechat/user/js/config?mall_id=" + mallId + "&cardtype=1" + "&url=" +  encodeURIComponent(window.location.href));        
			if(result.meta.errno == 0){  
				let config = result.result.config;   
				this.api_ticket = result.result.api_ticket;
				this.config = config; 
				config.jsApiList.push("showMenuItems");
				config.jsApiList.push("addCard");
				// config.jsApiList.push("chooseImage");
				// config.jsApiList.push("getLocalImgData");        
				config.debug = true;             
				eg.WXUtil.Instance.config(config,()=>{
					eg.log("config");
				},this);
			}

			setTimeout(()=> {
				this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTap,this);
			}, 5000);
		}

		private onTap(evt:egret.TouchEvent):void{

			// let checkJsApi = wx['checkJsApi'];
			// checkJsApi({
			// 	jsApiList: ['addCard'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
			// 	success: function(res) {
			// 		eg.log(res);
			// 	// 以键值对的形式返回，可用的api值true，不可用为false
			// 	// 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
			// 	}
			// });

			// this.api_ticket = 'IpK_1T69hDhZkLQTlwsAXzBwzK3PTs6e4uMkgMQTZU10jm4vn5NhyuGqnKeglAy4yM5OXs5SDB-Rv7oyumG4pQ';

			eg.log('onTap');
			let openid = egret.getOption('openid');
			let cardId = "pj-6xw8Svlqkf4jeiq6U7lMfE_GI";
			let cardExt = {
				code:"",
				openid:openid,
				timestamp:this.config.timestamp, //必须使用这个值
				nonce_str:this.config.nonceStr,	 //必须使用这个值	
				api_ticket:this.api_ticket  // 必须加这个参数，因为签名里面使用了该参数，  cardId 不用加
			}
			eg.log(cardExt);

			let signatureArr = [cardExt.code,cardExt.openid,cardExt.timestamp,cardExt.nonce_str,cardId,this.api_ticket];
			eg.log("-----------------")
			eg.log(signatureArr);
			eg.log("-----------------")
			let arr2 = signatureArr.sort();
			let str = arr2.join('');
			eg.log('str:' + str);
			let  sha1 = window['sha1'];
			var hash = sha1.create();
			hash.update(str);
			let signature = hash.hex();

			cardExt["signature"] = signature;

			let cardExtStr = JSON.stringify(cardExt);
			// cardExtStr = '{"code": "", "openid": "' + cardExt.openid + '", "timestamp": "' + cardExt.timestamp + '","nonce_str":"' + cardExt.nonce_str + '", "signature":"' + cardExt['signature'] +'"}';
			// let obj = JSON.parse(cardExtStr);
			eg.log('cardExtStr:' + cardExtStr);



			wx.addCard({
				cardList: [{
					cardId: cardId,
					cardExt: cardExtStr					
				}], // 需要添加的卡券列表
				success: function (res) {
					var cardList = res.cardList; // 添加的卡券列表信息
				}
			});

		}


	}
}