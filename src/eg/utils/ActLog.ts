module eg {
	export class ActLog {
		private static _instance:ActLog;
		private _logUrl:string;
		private _templateData:string;
		public constructor() {
		}

		public static get Instance():ActLog{
			if(ActLog._instance == null){
				ActLog._instance = new ActLog();
			}
			return ActLog._instance;
		}

		/**
		 * 
		 * 设置数据埋点域名地址
		 */
		public set logUrl(value:string){
			this._logUrl = value;
		}

		/**
		 * 设置埋点数据模版
		 */
		public set templateData(value:any){
			this._templateData = JSON.stringify(value);
		}

		/**
		 * 数据埋点方法
		 * @param addMsgData  增量变动的数据字段		
		 * {event_type:xxx,kv:xx}  字段名称保持和消息文档一致
		 * 
		 */
		public log(addMsgData:any):void{

			/*
			let params:any = JSON.parse(this._templateData);
			let msgData:any = params.message_data[0];
			msgData.event_type = evtType;
			if(kv){
				msgData.kv = kv;
			}
			if(activity_value != undefined){
				msgData.activity_value = activity_value;
			}
			msgData.timestamp = Date.now();

			eg.post(this._logUrl,params,egret.HttpResponseType.TEXT,{"Content-Type":"application/json"});	
			*/							
			//  let params = {
			// 				"timestamp":Date.now(),
			// 				"message_data":msgData,
			// 				"id":"uni-log-id-ac-json",
			// 				"message_name":"rongyi.activity.log.ActivityEventInfo"
			// 			}	
			// eg.post("http://192.168.10.194:28082/activity_log?",params,egret.HttpResponseType.TEXT,{"Content-Type":"application/json"});								

			let params:any = JSON.parse(this._templateData);
			let msgData:any = params.message_data[0];
			
			for (var key in addMsgData) {
				msgData[key] = addMsgData[key];
			}
			msgData.timestamp = Date.now();
			eg.post(this._logUrl,params,egret.HttpResponseType.TEXT,{"Content-Type":"application/json"});
		}

		/**
		 * 发送log请求，发送之前需要设置logUrl地址
		 * 
		 */
		public sendLog(params:any):void{
			eg.post(this._logUrl,params,egret.HttpResponseType.TEXT,{"Content-Type":"application/json"});								
		}

		public getMsgDate(userid:string,event_type:number,kv:any[]=null):any{
			let template:any =  {
									"activity_id":600000,
									"user_id":[
										{
											"type":2,
											"value":userid
										}
									],
									"event_type":event_type,
									"timestamp":Date.now(),
									// "terminal_id":"terminal-1110",
									// "terminal_type":2,
									// "activity_value":"20 seconds",
									// "mall_id":"mall-001",
									"id":"activity-log-id-json-1",
									"activity_type":1,
									"kv":kv									
       		 					};
			return template;
		}
	}

	/**
	 * 
	 * // required string id                  = 1;
//   optional int64 timestamp            = 2;  // 精确到毫秒
//   optional int64 activity_id          = 3;
//   optional ActivityType activity_type = 4;
//   optional string mall_id             = 5;  // 商场编号
//   optional string terminal_id         = 6;  // 点位编号
//   optional TerminalType terminal_type = 7;  // 终端类型
//   optional string terminal_name       = 8;  // 点位名称
//   repeated UserIdentity user_id       = 9;  // 身份标识类型
//   optional EventType event_type       = 10; // 事件类型 
//   optional string activity_value      = 11; // 活动结果（例如中奖金额等）
//   optional string source_user_open_id = 12; // 活动上游用户微信openid
//   repeated KVPair kv                  = 13; // 额外信息
//   optional string session_id          = 14; // 唯一标识用户一次活动参与
//   optional string channel_id          = 15; // 唯一标识渠道
	 * 
	 */
	// export class ActivityEventInfo{
		
	// 	public id:string;
	// 	public timestamp:number;
	// 	public activity_id:number;
	// 	public activity_type:number;


	// }
}