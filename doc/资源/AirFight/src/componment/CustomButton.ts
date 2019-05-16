module componment {
    export class CustomButton extends egret.Sprite {
        private _bg: egret.Bitmap;
        private title: egret.Bitmap;
        public constructor(bgName: string, titleName?: string) {
            super();
            this._bg = GameUtil.createBitmapByName(bgName);
            this.addChild(this._bg);
            this.setEnabeled();
            if (titleName == '' || titleName == undefined || titleName == null)
                return;
            this.title = GameUtil.createBitmapByName(titleName);
            if (this.title.texture == null) {
                this.title.texture = RES.getRes(titleName);
            }
            this.title.x = (this._bg.width - this.title.width) >> 1;
            this.title.y = (this._bg.height - this.title.height) >> 1;
            this.addChild(this.title);
        }

        public setEnabeled(): void {
            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchHandler, this);
            this.addEventListener(egret.TouchEvent.TOUCH_ROLL_OVER, this.onTouchHandler, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.addEventListener(egret.TouchEvent.TOUCH_ROLL_OUT, this.onTouchHandler, this);
        }

        private onTouchHandler(e: egret.TouchEvent): void {
            switch (e.type) {
                case egret.TouchEvent.TOUCH_BEGIN:
                case egret.TouchEvent.TOUCH_ROLL_OVER:
                    this._bg.x = 1;
                    this._bg.y = 1;
                    if (this.title) {
                        this.title.x += 1;
                        this.title.y += 1;
                    }
                    break;
                case egret.TouchEvent.TOUCH_ROLL_OUT:
                case egret.TouchEvent.TOUCH_TAP:
                    this._bg.x = 0;
                    this._bg.y = 0;
                    if (this.title) {
                        this.title.x -= 1;
                        this.title.y -= 1;
                    }
                    break;
            }

        }

        public setTitle(title: string): void {
            this.title = GameUtil.createBitmapByName(title);
            this.title.x = (this._bg.width - this.title.width) >> 1;
            this.title.y = (this._bg.height - this.title.height) >> 1;
            this.addChild(this.title);
        }

        public get bg() {
            return this._bg;
        }
        public set bg(bg: egret.Bitmap) {
            this._bg = bg;
        }
    }
}