namespace eg{

export class WXUtil {

    private static _instance:WXUtil;

    /**分享到朋友圈 */
    public static SHARE_TIMELINE:string = "onMenuShareTimeline";
    /**分享给朋友 */
    public static SHARE_APPMESSAGE:string = "onMenuShareAppMessage";
    /**分享到QQ */
    public static SHARE_QQ:string = "onMenuShareQQ";
    /**分享到微博 */
    public static SHARE_WEIBO:string = "onMenuShareWeibo";

	public constructor() {

	}

    public static get Instance():WXUtil{
        if(WXUtil._instance == null){
            WXUtil._instance = new WXUtil();
        }
        return WXUtil._instance;
    }


    /*
	//分享到朋友圈
	public static onMenuShareTimeline(title:string,link:string,imgUrl:string,callback:Function=null,thisObj:any=null):void{		
		 wx.onMenuShareTimeline({
			title: title,
			link:link,
			imgUrl:imgUrl,
			trigger: function (res) {
				// 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
				// alert('用户点击分享到朋友圈');
			},
			success: function (res) {
				// alert('已分享');
				// util.Tips.showMsg('已分享');
				if(callback != null){
					callback.call(thisObj);
				}                				                
			},
			cancel: function (res) {
				// alert('已取消');
			},
			fail: function (res) {
				// alert(JSON.stringify(res));
				// util.Tips.showMsg('操作错误');
			}
		});            
	}

	//分享给朋友
	public static onMenuShareAppMessage(title:string,desc:string,link:string,imgUrl:string,callback:Function=null,thisObj:any=null):void{
		 wx.onMenuShareAppMessage({
			title: title,
			desc: desc,
			link: link,
			imgUrl: imgUrl,
			trigger: function (res) {
				// 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
				// alert('用户点击发送给朋友');
			},
			success: function (res) {
				// alert('已分享');
				// util.Tips.showMsg('已发送');
				if(callback != null){
					callback.call(thisObj);
				}
				// util.RecordUtil.record(Config.pData.openid,6);
                // util.Log.log(Config.pData.openid,10);
                
			},
			cancel: function (res) {
				// alert('已取消');
			},
			fail: function (res) {
				// alert(JSON.stringify(res));
			}
		});
	}

    //分享到QQ
    public static onMenuShareQQ(title:string,desc:string,link:string,imgUrl:string,callback:Function=null,thisObj:any=null):void{
        wx.onMenuShareQQ({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: link, // 分享链接
            imgUrl: imgUrl, // 分享图标
            success: function () { 
                // 用户确认分享后执行的回调函数                
                if(callback != null){
					callback.call(thisObj);
				} 
                
            },
            cancel: function () { 
                // 用户取消分享后执行的回调函数
            }
        });
    }

    //“分享到腾讯微博”
    public static onMenuShareWeibo(title:string,desc:string,link:string,imgUrl:string,callback:Function = null,thisObj:any=null):void{
            wx.onMenuShareWeibo({
                title: title, // 分享标题
                desc: desc, // 分享描述
                link: link, // 分享链接
                imgUrl: imgUrl, // 分享图标
                success: function () { 
                    // 用户确认分享后执行的回调函数
                   if(callback != null){
					    callback.call(thisObj);
				    }                     
                },
                cancel: function () { 
                    // 用户取消分享后执行的回调函数
                }
            });
    }

    //分享到QQ空间
    public static onMenuShareQZone(title:string,desc:string,link:string,imgUrl:string,callback:Function = null,thisObj:any=null):void{
            wx.onMenuShareQZone({
                title: title, // 分享标题
                desc: desc, // 分享描述
                link: link, // 分享链接
                imgUrl: imgUrl, // 分享图标
                success: function () { 
                // 用户确认分享后执行的回调函数
                    if(callback != null){
					    callback.call(thisObj);
				    }                        
                },
                cancel: function () { 
                    // 用户取消分享后执行的回调函数
                }
            });
    }
    */


    /*
	public static initWX(obj:any,thisObj:any,callback:Function):void{         
        obj.debug = eg.isDebug();
        obj.jsApiList.push("showMenuItems");
        // obj.jsApiList.push("chooseImage");
        // obj.jsApiList.push("getLocalImgData");
        // obj.jsApiList.push('addCard');
        // 'onMenuShareTimeline',
        // 'onMenuShareAppMessage',

        obj.jsApiList.push('onMenuShareTimeline');
        obj.jsApiList.push('onMenuShareAppMessage');
        
        wx.config(obj);
        wx.ready(function(){
            wx.hideOptionMenu();
            wx.showMenuItems({
                menuList: [
                    'menuItem:share:appMessage',//分享给朋友
                    'menuItem:share:timeline'
                    //,// 分享到朋友圈
                   // 'menuItem:share:qq',
                    //'menuItem:share:weiboApp',
                   // 'menuItem:share:QZone'
                    // ,"menuItem:copyUrl"
                ]
            });
			callback.call(thisObj);
        });
        wx.error(function(){
            egret.log("config error");
        });
    }
    */
    
    /*
    public static regWX():void{
        var game_url:string = eg.GameData.Instance.cfg.share.link + "?url=" + encodeURIComponent(eg.GameData.Instance.getAPI("oauth") + "?state=" + eg.GameData.Instance.scene) + "&v=" + eg.GameData.Instance.v;
        var game_log_url:string = eg.GameData.Instance.cfg.share.logo + "?v=" + eg.GameData.Instance.v;        
        var title:string = eg.GameData.Instance.cfg.share.title;
        var desc:string = eg.GameData.Instance.cfg.share.desc;    
        WXUtil.onMenuShareTimeline(title+desc,game_url,game_log_url,callback,this);
        WXUtil.onMenuShareAppMessage(title,desc,game_url,game_log_url,callback,this);        
        // WXUtil.onMenuShareQQ(title,desc,game_url,game_log_url,callback,this);
        // WXUtil.onMenuShareWeibo(title,desc,game_url,game_log_url,callback,this);
        // WXUtil.onMenuShareQZone(title,desc,game_url,game_log_url,callback,this);
        let MtaH5 = window['MtaH5'];
        function callback2():void{
            // MtaH5.clickShare('wechat_friend');
            eg.log("分享给朋友");
        }
        function callback():void{            
            // MtaH5.clickShare('wechat_moments');
            eg.log("分享朋友圈");
            //分享记录        
            // if(eg.GameData.Instance.openid != undefined && eg.GameData.Instance.openid != ""){
            //     util.HttpService.getInstance().load(eg.GameData.Instance.getAPI("notify"),{uid:eg.GameData.Instance.openid,store:eg.GameData.Instance.store},this,null,null,egret.URLRequestMethod.POST,false);            
            // }
            // if(eg.GameData.Instance.isGetPrize){
            //     eg.EventDispatcher.Instance.dispatchEvent(new egret.Event("share_success"));
            // }

            // let params:any = {name:"sea_xnzf",nameDesc:"新年祝福",type:"share",typeDesc:"每天分享次数",info:JSON.stringify([{sum: 1}])};
            // eg.post(eg.GameData.Instance.cfg.collect,params);
            //eg.post(eg.GameData.Instance.getAPI('rts'),{openid:eg.GameData.Instance.openid,scene:eg.GameData.Instance.scene,type:5,data:'share'});
        }
    }
    */

    public config(obj:any,callback:Function,thisObj:any):void{
        wx.config(obj);
        wx.ready(function(){
            wx.hideOptionMenu();
            wx.showMenuItems({
                menuList: [
                    'menuItem:share:appMessage',//分享给朋友
                    'menuItem:share:timeline'
                    //,// 分享到朋友圈
                   // 'menuItem:share:qq',
                    //'menuItem:share:weiboApp',
                   // 'menuItem:share:QZone'
                    // ,"menuItem:copyUrl"
                ]
            });
			callback.call(thisObj);
        });
        wx.error(function(){
            egret.log("config error");
        });
    }

    public share(targetType:string,params:any,callback:Function,thisObj:any):void{
        let fun;
        switch(targetType){
            case WXUtil.SHARE_APPMESSAGE:
                fun = wx.onMenuShareAppMessage;
                break;
            case WXUtil.SHARE_TIMELINE:
                fun = wx.onMenuShareTimeline;
                break;
            case WXUtil.SHARE_QQ:
                fun = wx.onMenuShareQQ;
                break;
            case WXUtil.SHARE_WEIBO:
                fun = wx.onMenuShareWeibo;
                break;
        }

        params.trigger = function(res){
            callback('trigger',res);            
        }
        params.success = function(res){
            callback('success',res);
        }
        params.cancel = function(res){
            callback('cancel',res);
        }
        params.fail = function (res){
            callback('fail',res);
        }
        fun(params);
    }

}
}