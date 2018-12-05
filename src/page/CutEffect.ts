// TypeScript file
module fz {
    import TouchEvent = egret.TouchEvent;

    /***
     * 切割效果
     */
    export class CutEffect extends eg.PageBase{
        private lastX:number;
        private lastY:number;

        constructor(){
            super();
        }

        public initUI(data:any):void{
            super.initUI(data);
            eg.log('CutEffect');

            // this.filters = [new egret.GlowFilter(0x00FFCC,1,6,6)];

            this.stage.addEventListener(TouchEvent.TOUCH_BEGIN,this.onBegin,this);
        }

        private onBegin(evt:TouchEvent):void{
            eg.log('onBegin:' + evt.localX + '|' + evt.localY  + '|' + evt.stageX + '|' + evt.stageY);
            this.stage.addEventListener(TouchEvent.TOUCH_MOVE,this.onMove,this);
            this.stage.addEventListener(TouchEvent.TOUCH_END,this.onEnd,this);

            this.lastX = evt.localX;
            this.lastY = evt.localY;
        }
        private onEnd(evt:TouchEvent):void{
            this.stage.removeEventListener(TouchEvent.TOUCH_MOVE,this.onMove,this);
            this.stage.removeEventListener(TouchEvent.TOUCH_END,this.onEnd,this);
        }

        private onMove(evt:TouchEvent):void{
            eg.log('onMove:' + evt.localX + '|' + evt.localY  + '|' + evt.stageX + '|' + evt.stageY);

            let tempX:number = evt.localX;
            let tempY:number = evt.localY;
            let radians:number = Math.atan2(tempY - this.lastY,tempX - this.lastX);
            let degrees =   radians * 180 / Math.PI;

            let dis = egret.Point.distance(new egret.Point(this.lastX,this.lastY),new egret.Point(tempX,tempY));

            let num = Math.ceil(dis / 10);

            let stepX:number = Math.cos(radians) * 10;
            let stepY:number = Math.sin(radians) * 10;

            // let p = new P();
            // // p.x = evt.localX;
            // // p.y = evt.localY;
            // p.x = this.lastX;
            // p.y = this.lastY;
            // p.rotation = degrees;
            // this.addChild(p);

            for(let i:number = 0; i < num;i++){
                // let p = new P(); 
                let p:P = eg.Pool.Instance.getItemByClass(P);                
                p.play();
                p.x = this.lastX + stepX * i;
                p.y = this.lastY + stepY * i;
                p.rotation = degrees;
                this.addChild(p);
            }

            this.lastX = tempX;
            this.lastY = tempY;

        }
    }

    class P extends egret.Sprite{
        constructor(){
            super();
            this.graphics.beginFill(0xffffff);
            // this.graphics.drawCircle(0,0,10);
            // this.graphics.drawRect(-10,-10,20,20);
            this.graphics.drawRoundRect(-10,-10,20,20,20,20);
            this.graphics.endFill();            
            // egret.Tween.get(this).to({scaleY:1},300).call(()=>{
            //     this.parent.removeChild(this);
            //     egret.Tween.removeTweens(this);
            //     eg.Pool.Instance.recover(this);
            // },this);
        }
        public play():void{
            this.scaleY = 1
            egret.Tween.get(this).to({scaleY:0},300).call(()=>{
                this.parent.removeChild(this);
                egret.Tween.removeTweens(this);
                eg.Pool.Instance.recover(this);
            },this);
        }
    }
}