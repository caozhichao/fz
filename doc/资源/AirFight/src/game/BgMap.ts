module game {
    /**
     * 可滚动的底图
     */
    export class BgMap extends egret.DisplayObjectContainer {
        /**图片引用*/
        private bmpArr: egret.Bitmap[];
        /**stage宽*/
        private stageW: number;
        /**stage高*/
        private stageH: number;
        /**纹理本身的高度*/
        private textureHeight: number;
        /**控制滚动速度*/
        public speed: number = 2;
        private _mapid: number = 0;
        public constructor(id:number) {
            super();
            this._mapid = id;
            this.initView();
        }
        /**初始化*/
        private initView() {
            this.stageW = GameUtil.curWidth();
            this.stageH = GameUtil.curHeight();
            var texture: egret.Texture = RES.getRes("bgMap_"+this._mapid);
            this.textureHeight = texture.textureHeight;//保留原始纹理的高度，用于后续的计算
            var rowCount: number = Math.ceil(this.stageH / this.textureHeight) + 1;//计算在当前屏幕中，需要的图片数量
            this.bmpArr = [];
            //创建这些图片，并设置y坐标，让它们连接起来
            for (var i: number = 0; i < rowCount; i++) {
                var bgBmp: egret.Bitmap = new egret.Bitmap(texture);
                bgBmp.y = this.textureHeight * i - (this.textureHeight * rowCount - this.stageH);
                this.bmpArr.push(bgBmp);
                this.addChild(bgBmp);
            }
        }
        /**开始滚动*/
        public start(): void {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
            this.addEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
        }
        /**逐帧运动*/
        private enterFrameHandler(event: egret.Event): void {
            var len: number = this.bmpArr.length;
            for (var i: number = 0; i < len; i++) {
                var bgBmp: egret.Bitmap = this.bmpArr[i];
                bgBmp.y += this.speed;
                //判断超出屏幕后，回到队首，这样来实现循环反复
                if (bgBmp.y > this.stageH) {
                    bgBmp.y = this.bmpArr[0].y - this.textureHeight;
                    this.bmpArr.pop();
                    this.bmpArr.unshift(bgBmp);
                }
            }
        }
        /**暂停滚动*/
        public pause(): void {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
        }
    }

}