module test {
	export class MotionTest extends egret.Sprite{
		public constructor() {
			super();
			// let shake:Shake = new Shake();
			// shake.start();
			// this.addChild(shake);
		}
	}
}

//微信 ios 12.2 设备运动 页面必须在htts下才有效
//h5重力感应测试地址
// https://wow.techbrood.com/static/20170427/34180.html
// 摇一摇参考

// https://www.cnblogs.com/lr393993507/p/5553507.html

// <!DOCTYPE html>  
// <html lang="en">  
//     <head>  
//         <meta charset="utf-8">  
//     </head>  
//     <body>  
//         <div id="status"></div>     
//     </body>  
//     <script>  
//        var shake=4000,   
//            last_update=0,   
//            count=0,  
//            x=y=z=last_x=last_y=last_z=0;  
//        if(window.DeviceMotionEvent){  
//             window.addEventListener("devicemotion",deviceMotionHandler,false);  
//        }else{  
//          alert("本设备不支持devicemotion事件");  
//        }  
//        console.log(new Date().valueOf());  
//        function deviceMotionHandler(eventData){  
//             var acceleration = eventData.accelerationIncludingGravity,  
//                 currTime=new Date().valueOf(),  
//                 diffTime=currTime-last_update;  
   
//                 if(diffTime>100){  
//                    last_update=currTime;  
//                    x=acceleration.x;  
//                    y=acceleration.y;  
//                    z=acceleration.z;  
//                    var speed=Math.abs(x+y+z-last_x-last_y-last_z)/diffTime*10000  
//                    var status=document.getElementById("status");  
//                    if(speed>shake){  
//                          count++;  
//                          status.innerHTML = "你摇了中"+count+"次" ;  
//                    }  
//                    last_x = x;  
//                    last_y = y;  
//                    last_z = z;  
//                 }  
//        }  
//     </script>  
// </html>