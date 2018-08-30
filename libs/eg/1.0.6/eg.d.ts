declare module eg {
    class WXSoundProcessor {
        constructor();
    }
}
declare namespace eg {
    class AssetAdapter implements eui.IAssetAdapter {
        /**
         * @language zh_CN
         * 解析素材
         * @param source 待解析的新素材标识符
         * @param compFunc 解析完成回调函数，示例：callBack(content:any,source:string):void;
         * @param thisObject callBack的 this 引用
         */
        getAsset(source: string, compFunc: Function, thisObject: any): void;
    }
}
declare module eg {
    class EgMain extends eui.UILayer {
        private version;
        constructor();
        protected createChildren(): void;
        /**
         * 初始化之前
         */
        protected initBefore(): void;
        /**
         *1.初始化之前，参数获取
         *2.初始化(exml 主题,UI config);
         *3.加载(配置文件加载，第一次加载的资源)
         *4 加载之后，场景创建之前，设置语言包 设置埋点数据(加载之后才能获得相关数据)
         *5.场景创建
         *
         */
        protected runGame(): Promise<void>;
        /**
         * 加载资源
         */
        protected loadRes(): Promise<{}>;
        protected loadResAfter(): void;
        /**
         * 资源配置文件路径 默认是 resource/default.res.json
         * 可以重写该方法设置新的资源配置文件路径
         */
        protected readonly configUrl: string;
        /**
         *
         * 资源 resourceRoot 路径 默认是 resource
         * 可重写该方法
         */
        protected readonly resourceRoot: string;
        /**
         * 首次加载资源的资源组名称 默认是 preload
         * 可重写该方法
         */
        protected readonly preloadName: string;
        protected initEg(): Promise<void>;
        private wxgame();
        /**
         * 注册资源获取适配器
         */
        protected initAssetAdapter(): void;
        /**
         * 主题设置
         */
        protected initTheme(): void;
        protected log(): void;
        /***
         * 加载资源配置文件
         *
         */
        protected loadConfig(url: string, resourceRoot: string): Promise<void>;
        /**
         * 创建场景 重写该方法
         */
        protected createGameScene(): Promise<void>;
        /***
         * 声音解码失败处理
         */
        protected soundException(): void;
        /**
         * 自定义exml资源加载器
         *
         */
        protected customEXMLProcessor(): void;
    }
}
declare namespace eg {
    class ThemeAdapter implements eui.IThemeAdapter {
        /**
         * 解析主题
         * @param url 待解析的主题url
         * @param onSuccess 解析完成回调函数，示例：compFunc(e:egret.Event):void;
         * @param onError 解析失败回调函数，示例：errorFunc():void;
         * @param thisObject 回调的this引用
         */
        getTheme(url: string, onSuccess: Function, onError: Function, thisObject: any): void;
    }
}
declare namespace eg {
    interface IDisplayObject extends eg.IDispose {
        readonly content: egret.DisplayObject;
    }
}
declare namespace eg {
    interface IDispose {
        dispose(): void;
    }
}
declare module eg {
    interface IPage extends IDispose {
        readonly pageType: string;
        readonly pageId: number;
        readonly content: egret.DisplayObject;
        pageData(): any;
        initUI(pageData: any): void;
        enter(): void;
        exit(): any;
        open(): any;
        close(): any;
        resName: string[];
        readonly preNextResName: string[];
        readonly pageSkinName: string;
        /**
         * 页面名称
         */
        readonly pageName: string;
        /**
         * 当前页的额外数据
         */
        curPageExtraData: any;
        /**
         * 上一页的额外数据
         */
        upPageExtraData: any;
        /**
         * 是否关闭释放
         */
        readonly isDispose: boolean;
    }
}
declare module eg {
    class PageBase extends eui.Component implements eg.IPage {
        private _upPageName;
        private _extraData;
        private _upPageExtraData;
        private _skinName;
        private _isDispose;
        private _resName;
        constructor();
        readonly pageType: string;
        readonly pageId: number;
        readonly content: egret.DisplayObject;
        initUI(pageData: any): void;
        pageData(): Promise<{}>;
        open(): Promise<void>;
        private loadRes(groups);
        close(): Promise<void>;
        enter(): void;
        exit(): Promise<{}>;
        resName: string[];
        readonly preNextResName: string[];
        dispose(): void;
        readonly pageSkinName: string;
        setPageSkin(): Promise<{}>;
        readonly pageName: string;
        upPageName: string;
        curPageExtraData: any;
        upPageExtraData: any;
        skinName: any;
        readonly isDispose: boolean;
    }
}
declare module eg {
    class UILayer {
        private static _instance;
        static LAYER_SCENCE: string;
        static LAYER_FULL_SCREEN_WINDOW: string;
        static LAYER_WINDOW: string;
        static LAYER_TIPS_WINDOW: string;
        static LAYER_TIPS_WINDOW_WORDS: string;
        static LAYER_LOADING: string;
        private layerNames;
        private layers;
        private layerContainer;
        private _stage;
        constructor();
        static readonly Instance: UILayer;
        init(stage: egret.Stage): void;
        getLayerByType(layerName: string): egret.Sprite;
        readonly layerWindow: egret.Sprite;
        readonly layerTips: egret.Sprite;
        readonly layerScence: egret.Sprite;
        readonly layerFullScreenWindow: egret.Sprite;
        readonly layerTipsWords: egret.Sprite;
        readonly layerLoading: egret.Sprite;
    }
}
declare module eg {
    class GBitmapLabel extends eui.BitmapLabel implements IDispose {
        constructor();
        /**
         * 设置语言包id(可以在编辑器中直接绑定语言包id)
         */
        languageId: string;
        dispose(): void;
    }
}
declare module eg {
    class GButtion2 extends eui.Button {
        img: eui.Image;
        private _image;
        constructor();
        private initUI();
        private onUIInitComplete(evt);
        image: string;
    }
}
declare module eg {
    /**
     *
     * Button类
     *
     *
     */
    class GButton extends eui.Button implements IDispose {
        constructor();
        protected buttonReleased(): void;
        /**
         * 重写get set 方法 必须同时重写
         *
         */
        enabled: boolean;
        protected getCurrentState(): string;
        protected partAdded(partName: string, instance: any): void;
        protected childrenCreated(): void;
        dispose(): void;
    }
}
declare module eg {
    class GImage extends eui.Image implements IDispose {
        constructor();
        dispose(): void;
    }
}
declare module eg {
    class GImageButton extends eui.Image {
        constructor();
        private initUI();
        protected onTouchBegin(event: egret.TouchEvent): void;
        /**
       * @private
       * 舞台上触摸弹起事件
       */
        private onStageTouchEnd(event);
        protected onTouchCancle(event: egret.TouchEvent): void;
    }
}
declare module eg {
    class GLabel extends eui.Label implements IDispose {
        constructor();
        dispose(): void;
        /**
         * 设置语言包id(可以在编辑器中直接绑定语言包id)
         */
        languageId: string;
    }
}
declare namespace eg {
    class Event extends egret.Event {
        constructor(type: string, bubbles?: boolean, cancelable?: boolean, data?: any);
    }
}
declare module eg {
    class EventDispatcher extends egret.EventDispatcher {
        private static instance;
        constructor();
        static readonly Instance: EventDispatcher;
    }
}
declare module eg {
    class EXMLProcessor implements RES.processor.Processor {
        constructor();
        onLoadStart(host: any, resource: any): Promise<{}>;
        onRemoveStart(host: any, resource: any): Promise<void>;
    }
}
declare module eg {
    class QueueLoader {
        private static _instance;
        private resQueue;
        private priority;
        private list;
        private loadResName;
        private state;
        static LOADING: string;
        static FREE: string;
        static MAX_PRIORITY: number;
        constructor();
        static readonly Instance: QueueLoader;
        /**
         * 加载一个动态创建的资源组
         */
        loadArray(name: string, keys: string[], priority?: number, thisObject?: any, onComplete?: Function, onProgress?: Function, onError?: Function): void;
        /**
         * 加载一个多个资源组
         */
        loadGroupArray(groups: string[], priority?: number, thisObject?: any, onComplete?: Function, onProgress?: Function, onError?: Function): void;
        /***
         * 资源组加载器
         * @params name 资源组的 组名
         * @params priority 优先级 数字越大优先级越高
         * @params thisObject 函数调用对象
         * @params onComplete 完成函数
         * @params onProgress 进度函数 {itemsLoaded:evt.itemsLoaded,itemsTotal:evt.itemsTotal}
         * @params onError    错误函数
         */
        loadGroup(name: string, priority?: number, thisObject?: any, onComplete?: Function, onProgress?: Function, onError?: Function): void;
        private load();
    }
}
declare module eg {
    class WXFile {
        static WX_ROOT: any;
        static CACHE_DIR: string;
        private _remoteUrl;
        private _prefixPath;
        private _path;
        private fs;
        constructor(url: string, path?: string);
        readonly remoteUrl: string;
        /**
         * 判断是否是远程网络资源
         */
        readonly isRemotePath: boolean;
        readonly localPath: string;
        readonly prefixPath: string;
        readonly version: string;
        /**
         * 文件目录
         */
        getDirList(): string[];
        /**
         * 创建文件目录
         */
        mkdir(): void;
        /**
         * 判断文件/目录是否存在
         */
        exists(path: string): boolean;
        writeText(data: string): void;
        /**
         * 读取文件
         */
        read(): Promise<{}>;
        /**
         * 网络下载资源
         */
        downloadFile(): Promise<{}>;
        /**
         * 图片读取
         */
        private readImage();
        /**
         * 文本读取
         */
        private readText();
    }
}
declare module eg {
    class WXFontProcessor {
        constructor();
    }
}
declare module eg {
    class WXImageProcessor implements RES.processor.Processor {
        onLoadStart(host: any, resource: RES.ResourceInfo): Promise<{}>;
        onRemoveStart(host: any, resource: any): Promise<void>;
    }
}
declare module eg {
    class WXJsonProcessor implements RES.processor.Processor {
        constructor();
        onLoadStart(host: RES.ProcessHost, resource: RES.ResourceInfo): Promise<{}>;
        onRemoveStart(host: RES.ProcessHost, resource: RES.ResourceInfo): Promise<void>;
    }
}
declare module eg {
    class WXSheetProcessor implements RES.processor.Processor {
        constructor();
        onLoadStart(host: RES.ProcessHost, resource: RES.ResourceInfo): Promise<egret.SpriteSheet>;
        getData(host: any, resource: any, key: any, subkey: any): egret.Texture;
        onRemoveStart(host: RES.ProcessHost, resource: RES.ResourceInfo): Promise<void>;
    }
}
declare namespace eg {
    class Config {
        static STAGE_W: number;
        static STAGE_H: number;
        static stage: egret.Stage;
        static isAutoUploadPageData: boolean;
        /**
         * 是否开启微信小游戏缓存
         */
        static wxgameCache: boolean;
        /**
         * 显示log
         */
        static showLog: boolean;
        constructor();
        static init(main: egret.DisplayObject): void;
        static isWxgame(): boolean;
    }
}
declare module eg {
    class WXTextProcessor implements RES.processor.Processor {
        constructor();
        onLoadStart(host: RES.ProcessHost, resource: RES.ResourceInfo): Promise<void>;
        onRemoveStart(host: RES.ProcessHost, resource: RES.ResourceInfo): Promise<void>;
    }
}
declare namespace eg {
    interface ILoadingUI extends eg.IDisplayObject {
        progress(cur: number, total: number): void;
        show(msg?: string): any;
        hide(): any;
    }
}
declare namespace eg {
    class Loading {
        private ui;
        private static ins;
        private spr;
        constructor();
        static readonly Instance: Loading;
        /**
         * 设置loading皮肤 必须实现 ILoadingUI 接口
         *  默认是LoadingSimpleUI
         *
         */
        loadingUI: ILoadingUI;
        show(msg?: string): void;
        progress(cur: number, total: number): void;
        hide(): void;
    }
}
declare namespace eg {
    class LoadingSimpleUI extends egret.DisplayObjectContainer implements eg.ILoadingUI {
        private firstRadius;
        private secondRadius;
        private angle;
        private num;
        private frameIndex;
        private thickness;
        private frameRate;
        private frameTime;
        private t1;
        private firstPoints;
        private secondPoints;
        private shape;
        private ani_shape;
        private tf_msg;
        constructor();
        private initUI();
        readonly content: egret.DisplayObject;
        progress(cur: number, total: number): void;
        show(msg?: string): void;
        private showMsg(msg);
        private onFrame(evt);
        hide(): void;
        dispose(): void;
    }
}
declare module eg {
    class LanguageManager {
        private static _instance;
        private _data;
        constructor();
        static readonly Instance: LanguageManager;
        /**
         * 设置语言包数据
         * {
         * 	1000:我是的名字是${0},年龄${1},身高${2},
         * 	1001:无参数文本
         * }
         *
         */
        languageData: any;
        /***
         * 获取语言文本
         * 格式: 我是的名字是${0},年龄${1},身高${2}
         * @params id    语言文本id
         * @params replaceParams  需要替换的参数
         */
        getLanguage(id: string, ...replaceParams: any[]): string;
    }
}
declare module eg {
    class RESManager {
        constructor();
        loadConfig(url: string, resourceRoot: string): Promise<void>;
        static readonly Instance: RESManager;
    }
}
declare module eg {
    /**
     * UI显示管理类
     */
    class UIManager {
        private static instance;
        private _window;
        private _tips;
        private _dic;
        constructor();
        static readonly Instance: UIManager;
        /**
         * 打开显示一个page页 提供3种参数类型
         */
        showUI(cla: Function): void;
        showUI(page: eg.IPage): void;
        showUI(className: string): void;
        /**
         * 添加显示对象到对应的层
         */
        private show(page);
        /**
         * 绑定上一页的额外数据到当前页
         */
        private bindData(page);
        /**
         * 获取上一页的额外数据
         */
        private getPageExtraData(page);
        /**
         * 页面数据上报
         */
        private uploadPageData(page);
    }
}
declare module eg {
    class WXCacheManager {
        private resConfigPath;
        private resFile;
        constructor();
        static readonly Instance: WXCacheManager;
        init(): Promise<{}>;
        private wxResProcessor();
        getRes(url: string): Promise<{}>;
        /**
         * 判断是否需要从远程网络更新文件
         */
        private isUpdateFile(file);
        /**
         * 比较资源版本号
         */
        private compareResVersion(file);
        /**
         * 保存缓存配置文件
         */
        private updateCacheConfig(file);
        /**
         * 清理缓存
         */
        private clearCache();
    }
}
declare module eg {
    class WXFileManager {
        private fs;
        constructor();
        init(): void;
        static readonly Instance: WXFileManager;
    }
}
declare module eg {
    class ActLog {
        private static _instance;
        private _logUrl;
        private _templateData;
        constructor();
        static readonly Instance: ActLog;
        /**
         *
         * 设置数据埋点域名地址
         */
        logUrl: string;
        /**
         * 设置埋点数据模版
         */
        templateData: any;
        /**
         * 数据埋点方法
         * @param addMsgData  增量变动的数据字段
         * {event_type:xxx,kv:xx}  字段名称保持和消息文档一致
         *
         */
        log(addMsgData: any): void;
        /**
         * 发送log请求，发送之前需要设置logUrl地址
         *
         */
        sendLog(params: any): void;
        getMsgDate(userid: string, event_type: number, kv?: any[]): any;
    }
}
declare module eg {
    /**
     * 描述文件 description.json
     */
    class Description {
        private static _instance;
        private _data;
        private _platform;
        constructor();
        static readonly Instance: Description;
        /**
         * 设置配置文件数据
         */
        data: any;
        /**
         * 设置平台标识 52,qa,v4,v8
         */
        platform: string;
        /**
         * 获取游戏API
         */
        getGameAPI(name: string): string;
        /**
         * 获取 wx API
         */
        getWXAPI(name: string): string;
        /**
         * 获取 log API
         */
        getLogAPI(name: string): string;
        /**
         * 获取当前平台的域名
         */
        getDomain(name: string): string;
        getAPI(name: string): string;
        /**
         * 获取语言包数据
         */
        readonly languageData: any;
    }
}
declare module eg {
    /**
     * 获取一个对象的类对象引用。
     */
    function getDefinition(value: any): any;
}
declare module eg {
    /***
     * 网页元素使用
     */
    class HtmlImage implements IDispose {
        private element;
        private _imgUrl;
        constructor(imgUrl: string);
        addEvent(type: string): void;
        private onTouchstart(evt);
        show(imgUrl?: string): void;
        setPosition(xPos: number, yPos: number, w: number, h: number): void;
        hide(isDestroy?: boolean): void;
        dispose(): void;
        getElement(): HTMLImageElement;
    }
}
declare module util {
    /**
     * 分页对象
     * @author caozhichao
     *
     */
    class Pagination {
        private _items;
        private _curPage;
        private _pageSize;
        private _countPage;
        private _curIndex;
        constructor(pageSize: number);
        /**
         * 设置分页数据
         * @param value
         *
         */
        items: Array<any>;
        /**
         * 获取总页数
         * @param len 数据的个数
         * @return
         *
         */
        private pageCount(len);
        /**
         * 根据页码获取数据
         * @param pageNum   页码
         * @return
         *
         */
        private getItemsByPage(pageNum);
        /**
         * 当前页
         * @return
         *
         */
        readonly curPageItems: Array<any>;
        /**
         * 前一页
         *
         */
        toPrePage(): void;
        /**
         * 下一页
         *
         */
        toNextPage(): void;
        readonly allLen: number;
        /**
         * 总页数
         * @return
         *
         */
        readonly countPage: number;
        /**
         * 当前页码
         * @return
         *
         */
        /**
         * 设置当前页
         * @param value
         *
         */
        curPage: number;
        /**
         * 获取页号
         * @param id
         * @return -1 该数据不存在
         *
         */
        getPageByItem(item: any): number;
        /**
         * 获取页号
         * @param elementindex
         *
         */
        getPageByIndex(index: number): number;
        /**
         * 选中当前选项,0开始
         */
        setCurItem(index: number): Boolean;
        /**
         * 是否第一页
         * @return
         *
         */
        readonly isFirstPage: Boolean;
        /**
         * 是否最后一页
         * @return
         *
         */
        readonly isEndPage: Boolean;
        /**
         * 获取页码字符串
         * @return
         *
         */
        readonly pageStr: String;
        readonly pageSize: number;
        dispose(): void;
    }
}
declare module eg {
    /**
      * http://www.html-js.com/article/1528
      * @description 射线法判断点是否在多边形内部
      * @param {Object} p 待判断的点，格式：{ x: X坐标, y: Y坐标 }
      * @param {Array} poly 多边形顶点，数组成员的格式同 p
      * @return {String} 点 p 和多边形 poly 的几何关系
      */
    function rayCasting(p: any, poly: any): "on" | "in" | "out";
}
declare module util {
    /**
* 震动工具
* @author chenkai
* @since 2017/5/24
*
* Example:
* 震动目标obj，1秒内震动10次，震动最大距离10
* ShakeTool.getInstance().shakeObj(obj, 1, 10, 10);
*/
    class ShakeTool {
        private static instance;
        private initX;
        private initY;
        private target;
        private maxDis;
        private count;
        private rate;
        private timer;
        static getInstance(): ShakeTool;
        /**
         * 震动显示对象
         * @param        target    震动目标对象
         * @param        time      震动持续时长（秒）
         * @param        rate      震动频率(一秒震动多少次)
         * @param        maxDis    震动最大距离
         */
        shakeObj(target: egret.DisplayObject, time: number, rate: number, maxDis: number): void;
        private shaking();
        private shakeComplete();
        /**停止震动 */
        stop(): void;
    }
}
declare namespace eg {
    class SoundIcon extends egret.DisplayObjectContainer implements eg.IDispose {
        private icon;
        private _playResName;
        private _pauseResName;
        constructor(playResName?: string, pauseResName?: string);
        private initUI();
        private onClick(evt);
        private change(status);
        dispose(): void;
    }
}
declare module eg {
    class SoundMgr {
        static PLAY: string;
        static CLOSE: string;
        private static _instance;
        private bgSound;
        private bgSoundChannel;
        private backgroundSoundURL;
        private status;
        private isPause;
        constructor();
        static readonly Instance: SoundMgr;
        play(url: string, type?: string): void;
        stopBackgroundSound(): void;
        soundStatus: string;
        pause: boolean;
    }
}
declare module eg {
    function stringToArray(value: string): void;
    /**
     * htmlText 转换成 字符数组
     * (实现不同文本大小，颜色 打字机效果)
     */
    function htmlStringToArray(htmlText: string): egret.ITextElement[];
}
declare module eg {
    class Tips extends egret.Sprite {
        list: Array<Msg>;
        private timer;
        private static instance;
        constructor();
        static readonly Instance: Tips;
        init(stage: egret.Stage): void;
        addMsg(msg: Msg): void;
        private onTimer(evt);
        private onComplete(msg);
        static showMsg(msg: Array<egret.ITextElement>): void;
    }
    class Msg extends egret.Sprite {
        private txt;
        private shape;
        constructor(msg: Array<egret.ITextElement>);
    }
}
/***
 *
 *
 * 工具函数集合
 *
 *
 */
declare namespace eg {
    function log(value: any): void;
    function warn(value: any): void;
    /**
     * 是否是debug模式
     *
     */
    function isDebug(): boolean;
    /**
     * get 请求
     */
    function get(url: string, responseType?: string): Promise<{}>;
    /***
     * post 请求
     *
     */
    function post(url: string, params?: any, responseType?: string, requestHeaders?: any): Promise<{}>;
    function request(url: string, method: string, responseType?: string, params?: any, requestHeaders?: any): Promise<{}>;
    function formatReqParams(params: any, contentType: string): any;
    /**
     * 创建一个显示对象
     *
     */
    function createBitmap(resName: string, x?: number, y?: number, touchEnabled?: boolean, isAnchorCenter?: boolean): egret.Bitmap;
    /**
     * 一次添加多个显示对象
     */
    function addChild(parent: egret.DisplayObjectContainer, list: Array<egret.DisplayObject>): void;
    function createRect(w: number, h: number, color: number, alpha?: number, touchEnabled?: boolean): egret.Shape;
    function createTxt(label: string, x: number, y: number, w: number, h: number, size?: number, textColor?: number, textAlign?: string, bold?: boolean, verticalAlign?: string, fontFamily?: string): egret.TextField;
    function createTxt2(label: string, x: number, y: number, size: number, textColor: number, textAlign?: string, bold?: boolean, verticalAlign?: string, fontFamily?: string): egret.TextField;
    function createCircle(radius: number, color: number, alpha?: number): egret.Shape;
    function createRoundRect(w: number, h: number, color: number, alpha?: number, ellipseWidth?: number, ellipseHeight?: number, x?: number, y?: number): egret.Shape;
    /**
     * 根据base64图片数据创建一个Bitmap
     */
    function createBitmapByBase64Image(base64: string): Promise<{}>;
    function utf2buffer(utfstr: string): Uint8Array;
}
declare namespace eg {
    class WXUtil {
        private static _instance;
        /**分享到朋友圈 */
        static SHARE_TIMELINE: string;
        /**分享给朋友 */
        static SHARE_APPMESSAGE: string;
        /**分享到QQ */
        static SHARE_QQ: string;
        /**分享到微博 */
        static SHARE_WEIBO: string;
        constructor();
        static readonly Instance: WXUtil;
        config(obj: any, callback: Function, thisObj: any): void;
        share(targetType: string, params: any, callback: Function, thisObj: any): void;
    }
}
