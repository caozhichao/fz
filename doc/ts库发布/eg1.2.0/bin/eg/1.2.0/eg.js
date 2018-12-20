var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var eg;
(function (eg) {
    var PageBase = (function (_super) {
        __extends(PageBase, _super);
        function PageBase() {
            var _this = _super.call(this) || this;
            //是否释放
            _this._isDispose = false;
            _this.height = eg.Config.STAGE_H;
            return _this;
        }
        Object.defineProperty(PageBase.prototype, "pageType", {
            get: function () {
                return eg.UILayer.LAYER_SCENCE;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PageBase.prototype, "pageId", {
            get: function () {
                return -1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PageBase.prototype, "content", {
            get: function () {
                return this;
            },
            enumerable: true,
            configurable: true
        });
        PageBase.prototype.initUI = function (pageData) {
            eg.log(pageData);
            this.dispatchEventWith(PageBase.INIT_COMPLETE);
        };
        PageBase.prototype.pageData = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, Promise.resolve({})];
                });
            });
        };
        PageBase.prototype.open = function () {
            return __awaiter(this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            eg.Loading.Instance.show();
                            return [4 /*yield*/, this.loadRes(this.resName)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.pageData()];
                        case 2:
                            data = _a.sent();
                            return [4 /*yield*/, this.setPageSkin()];
                        case 3:
                            _a.sent();
                            eg.Loading.Instance.hide();
                            this.initUI(data);
                            this.enter();
                            this.loadRes(this.preNextResName);
                            return [2 /*return*/];
                    }
                });
            });
        };
        PageBase.prototype.loadRes = function (groups) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            var num = 0;
                            var count = 0;
                            if (groups != null && groups.length > 0) {
                                count = groups.length;
                                eg.QueueLoader.Instance.loadGroupArray(groups, eg.QueueLoader.MAX_PRIORITY, _this, onComplete, onProgress);
                            }
                            else {
                                // onComplete();
                                resolve();
                            }
                            function onComplete() {
                                num++;
                                if (num == count) {
                                    resolve();
                                    eg.log("资源加载完成:" + groups);
                                }
                            }
                            function onProgress(progress) {
                                // {itemsLoaded:evt.itemsLoaded,itemsTotal:evt.itemsTotal}
                                eg.Loading.Instance.progress(progress.itemsLoaded, progress.itemsTotal);
                            }
                        })];
                });
            });
        };
        PageBase.prototype.close = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.exit()];
                        case 1:
                            _a.sent();
                            this.dispose();
                            return [2 /*return*/];
                    }
                });
            });
        };
        PageBase.prototype.enter = function () {
        };
        PageBase.prototype.exit = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, Promise.resolve({})];
                });
            });
        };
        Object.defineProperty(PageBase.prototype, "resName", {
            get: function () {
                return this._resName;
            },
            set: function (value) {
                this._resName = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PageBase.prototype, "preNextResName", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        PageBase.prototype.dispose = function () {
            this._isDispose = true;
            if (this.parent) {
                this.parent.removeChild(this);
                eg.EventDispatcher.Instance.dispatchEventWith(egret.Event.CLOSE);
            }
            this._extraData = null;
            this._upPageExtraData = null;
            //删除所有的子对象
            while (this.numChildren > 0) {
                var element = this.removeChildAt(0);
                if (egret.is(element, "eg.IDispose")) {
                    element['dispose']();
                }
            }
        };
        Object.defineProperty(PageBase.prototype, "pageSkinName", {
            get: function () {
                return this._skinName;
            },
            enumerable: true,
            configurable: true
        });
        PageBase.prototype.setPageSkin = function () {
            var self = this;
            return new Promise(function (resolve, reject) {
                self.once(eui.UIEvent.COMPLETE, function (evt) {
                    resolve(); //保证内部组件初始化完成
                }, self);
                if (self.pageSkinName != "" && self.pageSkinName != null) {
                    //先检查皮肤资源是否存在	
                    if (egret.getDefinitionByName(self.pageSkinName)) {
                        // this.skinName = this.pageSkinName;
                        egret.superSetter(eg.PageBase, self, 'skinName', self.pageSkinName);
                    }
                    else {
                        eg.log(self.pageSkinName + '皮肤资源未找到');
                    }
                }
                else {
                    resolve();
                }
            });
        };
        Object.defineProperty(PageBase.prototype, "pageName", {
            get: function () {
                return this.name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PageBase.prototype, "upPageName", {
            get: function () {
                return this._upPageName;
            },
            set: function (value) {
                this._upPageName = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PageBase.prototype, "curPageExtraData", {
            get: function () {
                return this._extraData;
            },
            set: function (extraData) {
                this._extraData = extraData;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PageBase.prototype, "upPageExtraData", {
            get: function () {
                return this._upPageExtraData;
            },
            set: function (extraData) {
                this._upPageExtraData = extraData;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PageBase.prototype, "skinName", {
            get: function () {
                // return egret.superGetter(eg.getDefinition(this),this,'skinName');
                return this.pageSkinName;
            },
            set: function (value) {
                this._skinName = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PageBase.prototype, "isDispose", {
            get: function () {
                return this._isDispose;
            },
            enumerable: true,
            configurable: true
        });
        PageBase.INIT_COMPLETE = 'init_complete';
        return PageBase;
    }(eui.Component));
    eg.PageBase = PageBase;
    __reflect(PageBase.prototype, "eg.PageBase", ["eg.IPage", "eg.IDispose"]);
})(eg || (eg = {}));
var eg;
(function (eg) {
    var Loading = (function () {
        function Loading() {
            // this.ui = new LoadingUI();
            this.ui = new eg.LoadingSimpleUI();
            this.spr = new egret.Sprite();
        }
        Object.defineProperty(Loading, "Instance", {
            get: function () {
                if (Loading.ins == null) {
                    Loading.ins = new Loading();
                }
                return Loading.ins;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Loading.prototype, "loadingUI", {
            /**
             * 设置loading皮肤 必须实现 ILoadingUI 接口
             *  默认是LoadingSimpleUI
             *
             */
            set: function (value) {
                this.ui = value;
            },
            enumerable: true,
            configurable: true
        });
        Loading.prototype.show = function (msg) {
            if (msg === void 0) { msg = ""; }
            eg.log("loading show");
            this.ui.show(msg);
            // eg.Config.stage.addChild(this.ui.content());
            // eg.
            eg.UILayer.Instance.loading.addChild(this.ui.content);
        };
        Loading.prototype.progress = function (cur, total) {
            if (true) {
                //egret.log(cur + "|" + total);
            }
            this.ui.progress(cur, total);
        };
        Loading.prototype.hide = function () {
            eg.log("loading hide");
            // this.spr.once(egret.Event.ENTER_FRAME,onFrame,this);
            // var self = this;
            // function onFrame(evt:egret.Event):void{
            // 	if(self.ui.parent){
            // 		Config.stage.removeChild(self.ui);
            // 	}
            // }
            // Config.stage.removeChild(this.ui);
            this.ui.hide();
            /*
            var self = this;
            setTimeout(()=>{
                if(self.ui.parent){
                    Config.stage.removeChild(self.ui);
                }
            },50);
            */
        };
        return Loading;
    }());
    eg.Loading = Loading;
    __reflect(Loading.prototype, "eg.Loading");
})(eg || (eg = {}));
var eg;
(function (eg) {
    var Eg = (function () {
        function Eg() {
        }
        Eg.getInstance = function () {
            if (Eg._instance == null) {
                Eg._instance = new Eg();
            }
            return Eg._instance;
        };
        Eg.prototype.init = function (dis) {
            //初始化开始
            eg.Config.init(dis);
            //UI层
            eg.UILayer.Instance.init(eg.Config.stage);
            //声音解码异常处理
            // this.soundException();						
        };
        /***
         * 声音解码失败处理
         */
        Eg.prototype.soundException = function () {
            var WinAlerts = window.alert;
            window.alert = function (e) {
                if (e != null && e.indexOf('sound') > -1) {
                    eg.warn("声音解码失败");
                }
                else {
                    // WinAlerts(e);
                    eg.log('soundException:' + e.toString());
                }
            };
        };
        return Eg;
    }());
    eg.Eg = Eg;
    __reflect(Eg.prototype, "eg.Eg");
})(eg || (eg = {}));
var eg;
(function (eg) {
    var EgMain = (function (_super) {
        __extends(EgMain, _super);
        function EgMain() {
            var _this = _super.call(this) || this;
            //代码版本号
            _this.version = "1.2.0";
            return _this;
        }
        EgMain.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            egret.lifecycle.addLifecycleListener(function (context) {
                // custom lifecycle plugin
            });
            egret.lifecycle.onPause = function () {
                egret.ticker.pause();
                eg.log('onPause');
            };
            egret.lifecycle.onResume = function () {
                egret.ticker.resume();
                eg.log('onResume');
            };
            this.runGame().catch(function (e) {
                eg.log('error:' + e.toString());
            });
        };
        /**
         * 初始化之前
         */
        EgMain.prototype.initBefore = function () {
            //获取html页面数据可以放这里
            eg.log('initBefore');
            // this.log();			
        };
        /**
         *1.初始化之前，参数获取
         *2.初始化(exml 主题,UI config);
         *3.加载(配置文件加载，第一次加载的资源)
         *4 加载之后，场景创建之前，设置语言包 设置埋点数据(加载之后才能获得相关数据)
         *5.场景创建
         *
         */
        EgMain.prototype.runGame = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            eg.log('------------------框架初始化开始-------------------------');
                            //框架基础初始化
                            // await this.initEg();
                            eg.Eg.getInstance().init(this);
                            this.initBefore();
                            //注册版本控制器
                            this.initVersionController();
                            //加载资源配置文件
                            return [4 /*yield*/, this.loadConfigs()];
                        case 1:
                            //加载资源配置文件
                            _a.sent();
                            //preload资源加载
                            // await this.loadRes();	
                            //eui皮肤(debug环境，加载exml文件，正式环境使用exmljs文件)	
                            return [4 /*yield*/, this.initTheme()];
                        case 2:
                            //preload资源加载
                            // await this.loadRes();	
                            //eui皮肤(debug环境，加载exml文件，正式环境使用exmljs文件)	
                            _a.sent();
                            this.log();
                            //资源加载完成(处理一些加载后的数据依赖)
                            // this.loadResAfter();
                            eg.log('------------------框架初始化结束---------------------------');
                            this.initComplete();
                            return [2 /*return*/];
                    }
                });
            });
        };
        EgMain.prototype.initComplete = function () {
        };
        /**
         * 加载资源配置文件组 支持包内，包外 资源配置文件
         */
        EgMain.prototype.loadConfigs = function () {
            var _this = this;
            return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                var i;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            i = 0;
                            _a.label = 1;
                        case 1:
                            if (!(i < eg.Config.resConfigs.length)) return [3 /*break*/, 4];
                            eg.log(eg.Config.resConfigs[i].url + ':' + eg.Config.resConfigs[i].resourceRoot);
                            return [4 /*yield*/, RES.loadConfig(eg.Config.resConfigs[i].url, eg.Config.resConfigs[i].resourceRoot)];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            i++;
                            return [3 /*break*/, 1];
                        case 4:
                            resolve();
                            return [2 /*return*/];
                    }
                });
            }); });
        };
        /**
         * 注册版本号控制器
         */
        EgMain.prototype.initVersionController = function () {
            if (eg.Config.versionUrl) {
                var versionController = new eg.VersionController();
                RES.registerVersionController(versionController);
            }
        };
        /**
         * 加载资源
         */
        EgMain.prototype.loadRes = function () {
            var _this = this;
            return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                function onComplete() {
                    eg.Loading.Instance.hide();
                    resolve();
                }
                function onProgress(progress) {
                    eg.Loading.Instance.progress(progress.itemsLoaded, progress.itemsTotal);
                }
                function onError() {
                    eg.log("loadGroup preload onError");
                }
                var self;
                return __generator(this, function (_a) {
                    eg.Loading.Instance.show();
                    //2.默认加载prload资源组
                    eg.QueueLoader.Instance.loadGroup(this.preloadName, -1, this, onComplete, onProgress, onError);
                    self = this;
                    return [2 /*return*/];
                });
            }); });
        };
        EgMain.prototype.loadResAfter = function () {
            eg.log('loadResAfter');
        };
        Object.defineProperty(EgMain.prototype, "preloadName", {
            /**
             * 首次加载资源的资源组名称 默认是 preload
             * 可重写该方法
             */
            get: function () {
                return 'preload';
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 主题设置
         * egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
         * egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
         * load Theme;
         */
        EgMain.prototype.initTheme = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var assetAdapter = new AssetAdapter();
                egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
                egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
                var theme = new eui.Theme("resource/default.thm.json", _this.stage);
                theme.once(eui.UIEvent.COMPLETE, function () {
                    resolve();
                }, _this);
            });
        };
        EgMain.prototype.log = function () {
            eg.log("框架代码版本号:" + this.version);
            eg.log("engineVersion:" + egret.Capabilities.engineVersion);
            eg.log("renderMode:" + egret.Capabilities.renderMode);
            eg.log("runtimeType:" + egret.Capabilities.runtimeType);
            eg.log("os:" + egret.Capabilities.os);
            eg.log("isMobile:" + egret.Capabilities.isMobile);
            eg.log("boundingClientWidth:" + egret.Capabilities.boundingClientWidth);
            eg.log("boundingClientHeight:" + egret.Capabilities.boundingClientHeight);
            eg.log('宽高比:' + egret.Capabilities.boundingClientWidth / egret.Capabilities.boundingClientHeight);
            eg.log("navigator.userAgent:" + window.navigator.userAgent);
            eg.log("window.screen width|height:" + window.screen.width + "|" + window.screen.height);
            // eg.log("STAGE_W|STAGE_H:" + eg.Config.STAGE_W + "|" + eg.Config.STAGE_H);
            eg.log("document.body.clientWidth|document.body.clientHeight" + document.body.clientWidth + "|" + document.body.clientHeight);
            eg.log("eg.Config.STAGE_W|H:" + eg.Config.STAGE_W + "|" + eg.Config.STAGE_H);
            eg.log('devicePixelRatio:' + window.devicePixelRatio);
        };
        /**
         * 创建场景 重写该方法
         */
        EgMain.prototype.createGameScene = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/];
                });
            });
        };
        return EgMain;
    }(eui.UILayer));
    eg.EgMain = EgMain;
    __reflect(EgMain.prototype, "eg.EgMain");
})(eg || (eg = {}));
//微信小游戏环境，必须手动绑定到window中，否则 通过 getDefinitionByName 无法获取到
// if(egret.Capabilities.runtimeType == 'wxgame'){
// window['eg'] = eg;// 后续考虑在发布脚本中绑定
// } 
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var ThemeAdapter = (function () {
    function ThemeAdapter() {
    }
    /**
     * 解析主题
     * @param url 待解析的主题url
     * @param onSuccess 解析完成回调函数，示例：compFunc(e:egret.Event):void;
     * @param onError 解析失败回调函数，示例：errorFunc():void;
     * @param thisObject 回调的this引用
     */
    ThemeAdapter.prototype.getTheme = function (url, onSuccess, onError, thisObject) {
        var _this = this;
        function onResGet(e) {
            onSuccess.call(thisObject, e);
        }
        function onResError(e) {
            if (e.resItem.url == url) {
                RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError, null);
                onError.call(thisObject);
            }
        }
        if (typeof generateEUI !== 'undefined') {
            egret.callLater(function () {
                onSuccess.call(thisObject, generateEUI);
            }, this);
        }
        else if (typeof generateEUI2 !== 'undefined') {
            RES.getResByUrl("resource/gameEui.json", function (data, url) {
                window["JSONParseClass"]["setData"](data);
                egret.callLater(function () {
                    onSuccess.call(thisObject, generateEUI2);
                }, _this);
            }, this, RES.ResourceItem.TYPE_JSON);
        }
        else if (typeof generateJSON !== 'undefined') {
            if (url.indexOf(".exml") > -1) {
                var dataPath = url.split("/");
                dataPath.pop();
                var dirPath = dataPath.join("/") + "_EUI.json";
                if (!generateJSON.paths[url]) {
                    RES.getResByUrl(dirPath, function (data) {
                        window["JSONParseClass"]["setData"](data);
                        egret.callLater(function () {
                            onSuccess.call(thisObject, generateJSON.paths[url]);
                        }, _this);
                    }, this, RES.ResourceItem.TYPE_JSON);
                }
                else {
                    egret.callLater(function () {
                        onSuccess.call(thisObject, generateJSON.paths[url]);
                    }, this);
                }
            }
            else {
                egret.callLater(function () {
                    onSuccess.call(thisObject, generateJSON);
                }, this);
            }
        }
        else {
            RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError, null);
            RES.getResByUrl(url, onResGet, this, RES.ResourceItem.TYPE_TEXT);
        }
    };
    return ThemeAdapter;
}());
__reflect(ThemeAdapter.prototype, "ThemeAdapter", ["eui.IThemeAdapter"]);
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var AssetAdapter = (function () {
    function AssetAdapter() {
    }
    /**
     * @language zh_CN
     * 解析素材
     * @param source 待解析的新素材标识符
     * @param compFunc 解析完成回调函数，示例：callBack(content:any,source:string):void;
     * @param thisObject callBack的 this 引用
     */
    AssetAdapter.prototype.getAsset = function (source, compFunc, thisObject) {
        function onGetRes(data) {
            compFunc.call(thisObject, data, source);
        }
        if (RES.hasRes(source)) {
            var data = RES.getRes(source);
            if (data) {
                onGetRes(data);
            }
            else {
                RES.getResAsync(source, onGetRes, this);
            }
        }
        else {
            RES.getResByUrl(source, onGetRes, this, RES.ResourceItem.TYPE_IMAGE);
        }
    };
    return AssetAdapter;
}());
__reflect(AssetAdapter.prototype, "AssetAdapter", ["eui.IAssetAdapter"]);
var eg;
(function (eg) {
    /**
     * 弹窗基类
     */
    var PopupBaseUI = (function (_super) {
        __extends(PopupBaseUI, _super);
        function PopupBaseUI() {
            return _super.call(this) || this;
        }
        PopupBaseUI.prototype.initUI = function (data) {
            _super.prototype.initUI.call(this, data);
            this._bg = new eui.Rect(eg.Config.STAGE_W, eg.Config.STAGE_H);
            this._bg.fillColor = 0x0;
            this._bg.fillAlpha = PopupBaseUI.MASK_ALPHA;
            this.addChildAt(this._bg, 0);
        };
        PopupBaseUI.prototype.enter = function () {
            return new Promise(function (resolve, reject) {
            });
        };
        Object.defineProperty(PopupBaseUI.prototype, "pageType", {
            get: function () {
                return eg.UILayer.LAYER_POPUP;
            },
            enumerable: true,
            configurable: true
        });
        PopupBaseUI.MASK_ALPHA = 0.7;
        return PopupBaseUI;
    }(eg.PageBase));
    eg.PopupBaseUI = PopupBaseUI;
    __reflect(PopupBaseUI.prototype, "eg.PopupBaseUI");
})(eg || (eg = {}));
var eg;
(function (eg) {
    /**
     * UI 层级划分
     *
     */
    var UILayer = (function () {
        function UILayer() {
            this.layerNames = [UILayer.LAYER_SCENCE, UILayer.LAYER_SCENCE_FUNCTION, UILayer.LAYER_POPUP, UILayer.LAYER_ALERT, UILayer.LAYER_EFFECT, UILayer.LAYER_LOADING];
            this.layers = {};
            this.layerContainer = new egret.Sprite();
        }
        Object.defineProperty(UILayer, "Instance", {
            get: function () {
                if (UILayer._instance == null) {
                    UILayer._instance = new UILayer();
                }
                return UILayer._instance;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 初始化显示层
         */
        UILayer.prototype.init = function (stage) {
            this._stage = stage;
            var layer;
            for (var i = 0; i < this.layerNames.length; i++) {
                layer = new egret.Sprite();
                this.layers[this.layerNames[i]] = layer;
                this.layerContainer.addChild(layer);
            }
            this._stage.addChild(this.layerContainer);
        };
        UILayer.prototype.getLayerByType = function (layerName) {
            return this.layers[layerName];
        };
        Object.defineProperty(UILayer.prototype, "popup", {
            get: function () {
                return this.getLayerByType(UILayer.LAYER_POPUP);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UILayer.prototype, "alert", {
            get: function () {
                return this.getLayerByType(UILayer.LAYER_ALERT);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UILayer.prototype, "scence", {
            get: function () {
                return this.getLayerByType(UILayer.LAYER_SCENCE);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UILayer.prototype, "sceceFunction", {
            get: function () {
                return this.getLayerByType(UILayer.LAYER_SCENCE_FUNCTION);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UILayer.prototype, "effect", {
            get: function () {
                return this.getLayerByType(UILayer.LAYER_EFFECT);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UILayer.prototype, "loading", {
            get: function () {
                return this.getLayerByType(UILayer.LAYER_LOADING);
            },
            enumerable: true,
            configurable: true
        });
        UILayer.LAYER_SCENCE = "scence"; //基础场景层
        UILayer.LAYER_SCENCE_FUNCTION = "function"; //场景功能窗口层
        UILayer.LAYER_POPUP = "popup"; //功能窗口层
        UILayer.LAYER_ALERT = "alert"; //提示窗口层
        UILayer.LAYER_EFFECT = "effect"; //飘字层
        UILayer.LAYER_LOADING = "loading";
        return UILayer;
    }());
    eg.UILayer = UILayer;
    __reflect(UILayer.prototype, "eg.UILayer");
})(eg || (eg = {}));
var eg;
(function (eg) {
    var GBitmapLabel = (function (_super) {
        __extends(GBitmapLabel, _super);
        function GBitmapLabel() {
            return _super.call(this) || this;
        }
        Object.defineProperty(GBitmapLabel.prototype, "languageId", {
            /**
             * 设置语言包id(可以在编辑器中直接绑定语言包id)
             */
            set: function (value) {
                this.text = eg.LanguageManager.Instance.getLanguage(value);
            },
            enumerable: true,
            configurable: true
        });
        GBitmapLabel.prototype.dispose = function () {
        };
        return GBitmapLabel;
    }(eui.BitmapLabel));
    eg.GBitmapLabel = GBitmapLabel;
    __reflect(GBitmapLabel.prototype, "eg.GBitmapLabel", ["eg.IDispose"]);
})(eg || (eg = {}));
var eg;
(function (eg) {
    /**
     *
     * Button类
     *
     *
     */
    var GButton = (function (_super) {
        __extends(GButton, _super);
        //public bgIcon:eui.Image;
        function GButton() {
            var _this = _super.call(this) || this;
            // this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTap,this);
            eg.log('GButton');
            return _this;
        }
        GButton.prototype.buttonReleased = function () {
            eg.log('onTap:' + this.name);
            // let page= this.parent;
            // eg.log(page instanceof PageBase);
            if (eg.Config.isAutoUploadPageData && this.name) {
                var self_1 = this.parent;
                while (self_1) {
                    if (self_1 instanceof eg.PageBase) {
                        eg.log(self_1);
                        break;
                    }
                    self_1 = self_1.parent;
                }
                if (self_1) {
                    //数据埋点上报
                    var page = self_1;
                    eg.ActLog.Instance.log({ event_type: 51, refer_page_name: page.upPageExtraData['upPageName'], current_page_name: page.pageName, element_name: this.name });
                }
            }
        };
        Object.defineProperty(GButton.prototype, "enabled", {
            get: function () {
                // return this.$Component[eui.sys.ComponentKeys.enabled];
                return egret.superGetter(eg.GButton, this, 'enabled');
            },
            /**
             * 重写get set 方法 必须同时重写
             *
             */
            set: function (value) {
                // eg.log('enabled');
                // value = !!value;
                // this.$setEnabled(value);
                egret.superSetter(eg.GButton, this, 'enabled', value);
                if (!value) {
                    var mat = [0.3086, 0.6094, 0.082, 0, 0, 0.3086, 0.6094, 0.082, 0, 0, 0.3086, 0.6094, 0.082, 0, 0, 0, 0, 0, 1, 0];
                    var colorMat = new egret.ColorMatrixFilter(mat);
                    this.filters = [colorMat];
                }
                else {
                    this.filters = [];
                }
            },
            enumerable: true,
            configurable: true
        });
        GButton.prototype.getCurrentState = function () {
            var state = _super.prototype.getCurrentState.call(this);
            if (state == 'down') {
                this.scaleX = this.scaleY = 0.9;
            }
            else {
                this.scaleX = this.scaleY = 1;
            }
            return state;
        };
        GButton.prototype.partAdded = function (partName, instance) {
            eg.log(partName);
        };
        GButton.prototype.childrenCreated = function () {
            //eg.log('childrenCreated:' + this.bgIcon);
            //this.bgIcon.x = -100;
            // this.bgIcon.anchorOffsetX = this.bgIcon.width / 2;
            // this.bgIcon.anchorOffsetY = this.bgIcon.height / 2;
            // for(let i:number = 0; i < this.numChildren; i++){
            // 	let child:eui.UIComponent = this.getChildAt(0) as eui.UIComponent;
            // 	child.percentWidth = child.percentHeight = 100;
            // 	child.horizontalCenter = 0;
            // 	child.verticalCenter = 0;				
            // } 
            //this.invalidateState();
            //let a = this.skin.states;
        };
        //  protected getCurrentState():string {
        //     // if (!this.enabled)
        //     //     return "disabled";
        //     // if (this.touchCaptured)
        //     //     return "down";
        //     // return "up";
        // 	let state:string = super.getCurrentState();
        // 	eg.log('state:' + state);
        // 	return state;
        // }
        GButton.prototype.dispose = function () {
            // this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTap,this);			
            eg.log('GButtion dispose');
        };
        return GButton;
    }(eui.Button));
    eg.GButton = GButton;
    __reflect(GButton.prototype, "eg.GButton", ["eg.IDispose"]);
})(eg || (eg = {}));
var eg;
(function (eg) {
    var GImage = (function (_super) {
        __extends(GImage, _super);
        function GImage() {
            return _super.call(this) || this;
        }
        GImage.prototype.dispose = function () {
        };
        return GImage;
    }(eui.Image));
    eg.GImage = GImage;
    __reflect(GImage.prototype, "eg.GImage", ["eg.IDispose"]);
})(eg || (eg = {}));
var eg;
(function (eg) {
    var GImageButton = (function (_super) {
        __extends(GImageButton, _super);
        function GImageButton() {
            var _this = _super.call(this) || this;
            _this.initUI();
            return _this;
        }
        GImageButton.prototype.initUI = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        };
        GImageButton.prototype.onTouchBegin = function (event) {
            var _this = this;
            eg.log('onTouchBegin:' + this.flag);
            if (!this.flag) {
                this.flag = true;
                this.srcX = this.x;
                this.srcY = this.y;
                eg.log('x:' + this.srcX + 'y:' + this.srcY);
                // this.$stage.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancle, this);
                this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onStageTouchEnd, this);
                // this.addEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this);        			
                var m = new egret.Matrix();
                m.scale(0.9, 0.9);
                m.translate(this.x + this.width * 0.1 / 2, this.y + this.height * 0.1 / 2);
                // this.matrix = m;
                // /*
                //缓动处理
                var a_1 = this.matrix;
                egret.Tween.get(a_1, { onChange: function () {
                        _this.matrix = a_1;
                        _this.curMatrix = a_1;
                    } }).to({ a: m.a, b: m.b, c: m.c, d: m.d, tx: m.tx, ty: m.ty }, 50);
                // */
            }
            else {
                event.stopImmediatePropagation();
            }
        };
        GImageButton.prototype.onTouchEnd = function (evt) {
            eg.log('onTouchEnd');
            this.dispatchEventWith(GImageButton.TOUCH_END);
        };
        /**
       * @private
       * 舞台上触摸弹起事件
       */
        GImageButton.prototype.onStageTouchEnd = function (event) {
            var _this = this;
            // let stage = event.$currentTarget;
            eg.log('onStageTouchEnd');
            if (event.target == this) {
                eg.log('onStageTouchEnd22222');
                this.dispatchEventWith(GImageButton.TOUCH_END);
            }
            // stage.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancle, this);
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onStageTouchEnd, this);
            // this.removeEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this);      
            egret.Tween.removeTweens(this);
            var m = new egret.Matrix();
            m.scale(1, 1);
            // m.translate(this.x - this.width * 0.1 / 2,this.y - this.height * 0.1 / 2);
            m.translate(this.srcX, this.srcY);
            // this.matrix = m;			
            // /*	
            var a = this.matrix;
            egret.Tween.get(a, { onChange: function () {
                    _this.matrix = a;
                } }).to({ a: m.a, b: m.b, c: m.c, d: m.d, tx: m.tx, ty: m.ty }, 50).call(function () {
                _this.flag = false;
                eg.log('onStageTouchEnd:' + _this.flag);
            }, this);
            // */
            // this.flag = false;
        };
        GImageButton.prototype.onTouchCancle = function (event) {
            var stage = event.$currentTarget;
            stage.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancle, this);
            stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onStageTouchEnd, this);
            eg.log('onTouchCancle');
        };
        Object.defineProperty(GImageButton.prototype, "enabled", {
            get: function () {
                // return this.$Component[eui.sys.ComponentKeys.enabled];
                // return egret.superGetter(eg.GButton,this,'enabled');
                return this._enabled;
            },
            set: function (value) {
                this._enabled = value;
                this.touchEnabled = value;
                if (!value) {
                    var mat = [0.3086, 0.6094, 0.082, 0, 0, 0.3086, 0.6094, 0.082, 0, 0, 0.3086, 0.6094, 0.082, 0, 0, 0, 0, 0, 1, 0];
                    var colorMat = new egret.ColorMatrixFilter(mat);
                    this.filters = [colorMat];
                }
                else {
                    this.filters = [];
                }
            },
            enumerable: true,
            configurable: true
        });
        GImageButton.prototype.dispose = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        };
        GImageButton.TOUCH_END = 'GImageButton_TOUCH_END';
        return GImageButton;
    }(eui.Image));
    eg.GImageButton = GImageButton;
    __reflect(GImageButton.prototype, "eg.GImageButton", ["eg.IDispose"]);
})(eg || (eg = {}));
var eg;
(function (eg) {
    var GLabel = (function (_super) {
        __extends(GLabel, _super);
        function GLabel() {
            return _super.call(this) || this;
        }
        GLabel.prototype.dispose = function () {
        };
        Object.defineProperty(GLabel.prototype, "languageId", {
            // public get text():string{
            // 	return egret.superGetter(eg.GLabel,this,'text');
            // }
            // public set text(value:string){
            // 	//支持语言包id设置 格式 @1001
            // 	if(value.indexOf('@') == 0){
            // 		LanguageManager.Instance.getLanguage()
            // 	}
            // 	egret.superSetter(eg.GLabel,this,'text',value);
            // }
            /**
             * 设置语言包id(可以在编辑器中直接绑定语言包id)
             */
            set: function (value) {
                this.text = eg.LanguageManager.Instance.getLanguage(value);
            },
            enumerable: true,
            configurable: true
        });
        return GLabel;
    }(eui.Label));
    eg.GLabel = GLabel;
    __reflect(GLabel.prototype, "eg.GLabel", ["eg.IDispose"]);
})(eg || (eg = {}));
var eg;
(function (eg) {
    var Event = (function (_super) {
        __extends(Event, _super);
        function Event(type, bubbles, cancelable, data) {
            return _super.call(this, type, bubbles, cancelable, data) || this;
        }
        return Event;
    }(egret.Event));
    eg.Event = Event;
    __reflect(Event.prototype, "eg.Event");
})(eg || (eg = {}));
var eg;
(function (eg) {
    var EventDispatcher = (function (_super) {
        __extends(EventDispatcher, _super);
        function EventDispatcher() {
            return _super.call(this) || this;
        }
        Object.defineProperty(EventDispatcher, "Instance", {
            get: function () {
                if (EventDispatcher.instance == null) {
                    EventDispatcher.instance = new EventDispatcher();
                }
                return EventDispatcher.instance;
            },
            enumerable: true,
            configurable: true
        });
        return EventDispatcher;
    }(egret.EventDispatcher));
    eg.EventDispatcher = EventDispatcher;
    __reflect(EventDispatcher.prototype, "eg.EventDispatcher");
})(eg || (eg = {}));
var eg;
(function (eg) {
    var EXMLProcessor = (function () {
        function EXMLProcessor() {
        }
        EXMLProcessor.prototype.onLoadStart = function (host, resource) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            // EXML.load("resource/" + resource.url,(clazz:any,url:string)=>{
                            if (eg.Config.isWxgame()) {
                                resolve();
                            }
                            else {
                                EXML.load(resource.root + resource.url, function (clazz, url) {
                                    // egret.log(egret.getDefinitionByName("BSkin"));
                                    //微信客户端中需要手动绑定对象，不然无法找到class对象
                                    if (egret.Capabilities.runtimeType == 'web') {
                                        var __class__ = clazz.prototype.__class__;
                                        var paths = __class__.split('.');
                                        var length_1 = paths.length;
                                        var definition = window;
                                        for (var i = 0; i < length_1; i++) {
                                            var path = paths[i];
                                            if (definition[path] == null) {
                                                if (i != length_1 - 1) {
                                                    definition[path] = {};
                                                }
                                                else {
                                                    eg.log("注册exml到window:" + __class__);
                                                    definition[path] = clazz;
                                                }
                                            }
                                            definition = definition[path];
                                        }
                                    }
                                    resolve(clazz);
                                }, _this);
                            }
                        })];
                });
            });
        };
        EXMLProcessor.prototype.onRemoveStart = function (host, resource) {
            return Promise.resolve();
        };
        return EXMLProcessor;
    }());
    eg.EXMLProcessor = EXMLProcessor;
    __reflect(EXMLProcessor.prototype, "eg.EXMLProcessor", ["RES.processor.Processor"]);
})(eg || (eg = {}));
var eg;
(function (eg) {
    var QueueLoader = (function () {
        function QueueLoader() {
            this.resQueue = [];
            this.list = [];
            this.priority = QueueLoader.MAX_PRIORITY;
            RES.setMaxLoadingThread(3);
        }
        Object.defineProperty(QueueLoader, "Instance", {
            get: function () {
                if (QueueLoader._instance == null) {
                    QueueLoader._instance = new QueueLoader();
                }
                return QueueLoader._instance;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 加载一个动态创建的资源组
         */
        QueueLoader.prototype.loadArray = function (name, keys, priority, thisObject, onComplete, onProgress, onError) {
            if (priority === void 0) { priority = -1; }
            if (thisObject === void 0) { thisObject = null; }
            if (onComplete === void 0) { onComplete = null; }
            if (onProgress === void 0) { onProgress = null; }
            if (onError === void 0) { onError = null; }
            RES.createGroup(name, keys);
            this.loadGroup(name, priority, thisObject, onComplete, onProgress, onError);
        };
        /**
         * 加载一个多个资源组
         */
        QueueLoader.prototype.loadGroupArray = function (groups, priority, thisObject, onComplete, onProgress, onError) {
            var _this = this;
            if (priority === void 0) { priority = -1; }
            if (thisObject === void 0) { thisObject = null; }
            if (onComplete === void 0) { onComplete = null; }
            if (onProgress === void 0) { onProgress = null; }
            if (onError === void 0) { onError = null; }
            groups.forEach(function (element) {
                _this.loadGroup(element, priority, thisObject, onComplete, onProgress, onError);
            });
        };
        /***
         * 资源组加载器
         * @params name 资源组的 组名
         * @params priority 优先级 数字越大优先级越高
         * @params thisObject 函数调用对象
         * @params onComplete 完成函数
         * @params onProgress 进度函数 {itemsLoaded:evt.itemsLoaded,itemsTotal:evt.itemsTotal}
         * @params onError    错误函数
         */
        QueueLoader.prototype.loadGroup = function (name, priority, thisObject, onComplete, onProgress, onError) {
            if (priority === void 0) { priority = -1; }
            if (thisObject === void 0) { thisObject = null; }
            if (onComplete === void 0) { onComplete = null; }
            if (onProgress === void 0) { onProgress = null; }
            if (onError === void 0) { onError = null; }
            try {
                //判断资源组配置是否存在,不存在抛出异常
                RES.getGroupByName(name);
                if (priority == -1) {
                    priority = this.priority--;
                }
                eg.log("新增加载列表:" + name);
                var loadVo = { name: name, priority: priority, thisObject: thisObject, onComplete: onComplete, onProgress: onProgress, onError: onError };
                this.resQueue.push(loadVo);
                if (this.state == QueueLoader.LOADING) {
                    //加入后入的相同的资源
                    if (this.loadResName == name) {
                        this.list.push(loadVo);
                        eg.log("相同组后加入element:" + name + "|" + loadVo.priority);
                    }
                }
                this.load();
            }
            catch (error) {
                eg.log(error.toString());
            }
        };
        QueueLoader.prototype.load = function () {
            var _this = this;
            if (this.state == QueueLoader.LOADING) {
                return;
            }
            //按优先级排序
            this.resQueue.sort(function (a, b) {
                return b.priority - a.priority;
            });
            var loadVo = this.resQueue.shift();
            if (loadVo == null) {
                return;
            }
            if (RES.isGroupLoaded(loadVo.name)) {
                //已经加载过
                eg.log("已经加载过:" + loadVo.name);
                if (loadVo.onComplete) {
                    loadVo.onComplete.call(loadVo.thisObject);
                }
                return;
            }
            var self = this;
            //记录当前加载的资源组名称
            this.loadResName = loadVo.name;
            this.state = QueueLoader.LOADING;
            //加载钱，找到队列中所以相同的资源组
            // let list:any[] = [];
            this.list.length = 0;
            this.list.push(loadVo);
            this.resQueue.forEach(function (element) {
                if (element.name == loadVo.name) {
                    _this.list.push(element);
                    eg.log("查找相同组element:" + element.name + "|" + element.priority);
                }
            });
            //添加资源组加载完成事件
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, onResourceLoadComplete, this);
            //添加资源组加载失败事件
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, onResourceLoadError, this);
            //添加资源组加载进度事件
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, onResourceProgress, this);
            //添加资源加载失败事件
            RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResourceItemLoadError, this);
            var name = loadVo.name;
            var priority = loadVo.priority;
            var t1 = egret.getTimer();
            eg.log("加载中:" + name + "|" + priority + "|开始时间:" + t1);
            RES.loadGroup(name, priority);
            function onResourceLoadComplete(evt) {
                var t2 = egret.getTimer();
                if (evt.groupName == name) {
                    this.state = QueueLoader.FREE;
                    removeEventListener();
                    self.list.forEach(function (element) {
                        if (element.onComplete) {
                            element.onComplete.call(element.thisObject, loadVo.name);
                        }
                        var index = self.resQueue.indexOf(element);
                        if (index != -1) {
                            self.resQueue.splice(index, 1);
                        }
                        eg.log("加载完成element:" + element.name + "|" + element.priority + "耗时:" + t2 + "-" + t1 + "=" + (t2 - t1));
                    });
                    // eg.log("加载完成:" + loadVo.name  + "|" + loadVo.priority);
                    //加载下一个
                    self.load();
                }
            }
            function onResourceLoadError(evt) {
                if (evt.groupName == name) {
                    removeEventListener();
                    self.list.forEach(function (element) {
                        if (element.onError) {
                            element.onError.call(element.thisObject);
                        }
                    });
                }
            }
            function onResourceProgress(evt) {
                if (evt.groupName == name) {
                    eg.log("资源组:[" + name + "]" + evt.itemsLoaded + "/" + evt.itemsTotal + 'url:' + evt.resItem.url);
                    self.list.forEach(function (element) {
                        if (element.onProgress) {
                            element.onProgress.call(element.thisObject, { itemsLoaded: evt.itemsLoaded, itemsTotal: evt.itemsTotal });
                        }
                    });
                }
            }
            function onResourceItemLoadError(evt) {
                //Log.warn(evt.groupName + "|" + evt.resItem.url);
                eg.log(evt.groupName + "|" + evt.resItem.url);
            }
            function removeEventListener() {
                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, onResourceLoadComplete, self);
                RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, onResourceLoadError, self);
                RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, onResourceProgress, self);
                RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResourceItemLoadError, self);
            }
        };
        QueueLoader.LOADING = "loading";
        QueueLoader.FREE = "free";
        QueueLoader.MAX_PRIORITY = 10000;
        return QueueLoader;
    }());
    eg.QueueLoader = QueueLoader;
    __reflect(QueueLoader.prototype, "eg.QueueLoader");
})(eg || (eg = {}));
var eg;
(function (eg) {
    /***
     * 版本号控制
     */
    var VersionController = (function () {
        function VersionController() {
        }
        VersionController.prototype.init = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                _this.loadVersion(function () {
                    // RES.registerVersionController(this); // 注册好了，会在加载配置文件之前获取版本 调用该方法
                    resolve();
                });
            });
        };
        VersionController.prototype.loadVersion = function (callback) {
            var self = this;
            var loader = new egret.URLLoader();
            //添加加载完成侦听
            loader.once(egret.Event.COMPLETE, onComplete, self);
            //添加加载失败侦听
            loader.once(egret.IOErrorEvent.IO_ERROR, onError, self);
            function onComplete(evt) {
                try {
                    this.info = JSON.parse(loader.data);
                }
                catch (error) {
                    eg.log('version.json 数据错误');
                }
                callback();
                removeEventListeners();
            }
            function onError(evt) {
                eg.log('version.json 加载失败');
                removeEventListeners();
            }
            function removeEventListeners() {
                loader.removeEventListener(egret.Event.COMPLETE, onComplete, self);
                loader.removeEventListener(egret.IOErrorEvent.IO_ERROR, onError, self);
            }
            //微信小游戏本地资源，不可在后面加版本号
            var url = eg.Config.versionUrl;
            if (egret.Capabilities.runtimeType == egret.RuntimeType.WXGAME) {
                if (url.indexOf('http:') != -1 || url.indexOf('https:') != -1) {
                    url += '?' + Date.now();
                }
            }
            else {
                url += '?' + Date.now();
            }
            // if(url.indexOf('http:') != -1 || url.indexOf('https:') != -1){
            // 	url += '?' + Date.now();				
            // }
            // var request:egret.URLRequest = new egret.URLRequest(eg.Config.versionUrl + '?' + Date.now()); //获取最新版本
            var request = new egret.URLRequest(url); //获取最新版本
            //开始加载
            loader.load(request);
        };
        /**
         * 资源加载url变更
         */
        VersionController.prototype.getVirtualUrl = function (url) {
            var index = url.indexOf('resource/');
            var realUrl;
            if (index != -1) {
                var resourceRoot = url.substring(0, index);
                var path = url.substr(index);
                var realPath = this.info[path];
                realUrl = resourceRoot + (realPath ? realPath : path);
                eg.log('url:' + url + '-> realUrl:' + realUrl);
            }
            else {
                realUrl = url;
            }
            return realUrl;
            // let realURL = this.info[url];
            // return realURL?realURL:url;
        };
        return VersionController;
    }());
    eg.VersionController = VersionController;
    __reflect(VersionController.prototype, "eg.VersionController", ["RES.VersionController", "RES.IVersionController"]);
})(eg || (eg = {}));
var eg;
(function (eg) {
    var WXFile = (function () {
        function WXFile(url, path) {
            WXFile.WX_ROOT = wx.env.USER_DATA_PATH + "/";
            this._remoteUrl = url;
            this._path = path;
            eg.log('url:' + this._remoteUrl);
            this.fs = wx.getFileSystemManager();
        }
        Object.defineProperty(WXFile.prototype, "remoteUrl", {
            get: function () {
                return this._remoteUrl;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WXFile.prototype, "isRemotePath", {
            /**
             * 判断是否是远程网络资源
             */
            get: function () {
                return this._remoteUrl.indexOf("http://") == 0 || this._remoteUrl.indexOf("https://") == 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WXFile.prototype, "localPath", {
            get: function () {
                //eg.log('localPath 1:' + this._path);
                if (this._path == null) {
                    var path = void 0;
                    var position = this._remoteUrl.indexOf('resource/');
                    if (position != -1) {
                        path = WXFile.CACHE_DIR + this._remoteUrl.substr(position + 9);
                        path = path.split('?')[0];
                    }
                    this._path = path;
                }
                eg.log('localPath:' + this._path);
                return this._path;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WXFile.prototype, "prefixPath", {
            get: function () {
                if (this.isRemotePath) {
                    return WXFile.WX_ROOT + this.localPath;
                }
                else {
                    //非远程地址，直接使用本地路径(非本地缓存路径)
                    return this._remoteUrl;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WXFile.prototype, "version", {
            get: function () {
                var v;
                var vInfo = this._remoteUrl.split('?')[1];
                // eg.log('vInfo:' + vInfo);
                if (vInfo) {
                    v = vInfo.split('=')[1];
                }
                eg.log('version:' + v);
                return v;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 文件目录
         */
        WXFile.prototype.getDirList = function () {
            var arr = this.localPath.split('/');
            arr.pop();
            return arr;
        };
        /**
         * 创建文件目录
         */
        WXFile.prototype.mkdir = function () {
            var dirs = this.getDirList();
            ///*
            var tempPath = '';
            for (var i = 0; i < dirs.length; i++) {
                tempPath += dirs[i] + '/';
                //eg.log('tempPath:' + tempPath);
                if (!this.exists(tempPath)) {
                    this.fs.mkdirSync(WXFile.WX_ROOT + tempPath);
                    eg.log('mkdir:' + WXFile.WX_ROOT + tempPath);
                }
                // tempPath +='/';
            }
            //*/
            /*
            let dir = dirs.join('/');
            eg.log('dir:' + dir);
            if(!this.exists(dir)){
                let dirPath = WXFile.WX_ROOT + dir + '/';
                eg.log('dirPath:' + dirPath);
                this.fs.mkdirSync(dirPath,true);
            }
            */
        };
        /**
         * 判断文件/目录是否存在
         */
        WXFile.prototype.exists = function (path) {
            path = WXFile.WX_ROOT + path;
            try {
                this.fs.accessSync(path);
                eg.log('exists1:' + path + ' 存在');
                return true;
            }
            catch (error) {
                eg.log('exists2:' + path + ' 不存在');
                return false;
            }
        };
        WXFile.prototype.writeText = function (data) {
            this.mkdir();
            this.fs.writeFile({
                filePath: this.prefixPath,
                data: data,
                encoding: 'utf8',
                success: function (res) {
                    eg.log('writeText success');
                }
            });
        };
        /**
         * 读取文件
         */
        WXFile.prototype.read = function () {
            var _this = this;
            return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                var arr, suffix, result, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            arr = this.localPath.split('.');
                            suffix = arr[arr.length - 1];
                            eg.log('suffix:' + suffix);
                            _a = suffix;
                            switch (_a) {
                                case 'jpg': return [3 /*break*/, 1];
                                case 'png': return [3 /*break*/, 1];
                                case 'json': return [3 /*break*/, 3];
                                case 'text': return [3 /*break*/, 5];
                            }
                            return [3 /*break*/, 7];
                        case 1: return [4 /*yield*/, this.readImage()];
                        case 2:
                            result = _b.sent();
                            return [3 /*break*/, 7];
                        case 3: return [4 /*yield*/, this.readText()];
                        case 4:
                            result = _b.sent();
                            result = JSON.parse(result);
                            return [3 /*break*/, 7];
                        case 5: return [4 /*yield*/, this.readText()];
                        case 6:
                            result = _b.sent();
                            return [3 /*break*/, 7];
                        case 7:
                            resolve(result);
                            return [2 /*return*/];
                    }
                });
            }); });
        };
        /**
         * 网络下载资源
         */
        WXFile.prototype.downloadFile = function () {
            var _this = this;
            //构建文件目录
            return new Promise(function (resovle, reject) {
                _this.mkdir();
                var url = _this.remoteUrl;
                var filePath = _this.prefixPath;
                wx.downloadFile({
                    url: url,
                    filePath: filePath,
                    success: function (res) {
                        eg.log('success');
                        resovle();
                    },
                    fail: function (res) {
                        eg.log('fail');
                        reject();
                    }
                });
            });
        };
        /**
         * 图片读取
         */
        WXFile.prototype.readImage = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var image = wx.createImage();
                image.onload = function () {
                    var bitmapdata = new egret.BitmapData(image);
                    var texture = new egret.Texture();
                    texture._setBitmapData(bitmapdata);
                    eg.log('readImage texture:' + texture);
                    setTimeout(function () {
                        resolve(texture);
                    }, 0);
                };
                image.onerror = function (e) {
                    console.error(e);
                    eg.log('-----------------------');
                    // e = new RES.ResourceManagerError(1001, this.prefixPath);
                    reject(e);
                };
                eg.log('prefixPath:' + _this.prefixPath);
                image.src = _this.prefixPath;
            });
        };
        /**
         * 文本读取
         */
        WXFile.prototype.readText = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                _this.fs.readFile({
                    filePath: _this.prefixPath,
                    encoding: 'utf8',
                    success: function (res) {
                        // eg.log(data);
                        eg.log('readText:' + res.data);
                        resolve(res.data);
                    },
                    fail: function (res) {
                        eg.log('readFile fail:' + res);
                        reject();
                    }
                });
            });
        };
        //资源缓存的总目录
        WXFile.CACHE_DIR = "cache/";
        return WXFile;
    }());
    eg.WXFile = WXFile;
    __reflect(WXFile.prototype, "eg.WXFile");
})(eg || (eg = {}));
var eg;
(function (eg) {
    var WXFontProcessor = (function () {
        function WXFontProcessor() {
        }
        return WXFontProcessor;
    }());
    eg.WXFontProcessor = WXFontProcessor;
    __reflect(WXFontProcessor.prototype, "eg.WXFontProcessor");
})(eg || (eg = {}));
var eg;
(function (eg) {
    var WXImageProcessor = (function () {
        function WXImageProcessor() {
        }
        WXImageProcessor.prototype.onLoadStart = function (host, resource) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            eg.log('host:' + host);
                            eg.log(resource.root + "|" + resource.url + "|" + resource.name + "|" + resource.type + "|" + resource.crc32);
                            return [4 /*yield*/, eg.WXCacheManager.Instance.getRes(resource.root + resource.url)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        WXImageProcessor.prototype.onRemoveStart = function (host, resource) {
            var texture = host.get(resource);
            texture.dispose();
            return Promise.resolve();
        };
        return WXImageProcessor;
    }());
    eg.WXImageProcessor = WXImageProcessor;
    __reflect(WXImageProcessor.prototype, "eg.WXImageProcessor", ["RES.processor.Processor"]);
})(eg || (eg = {}));
var eg;
(function (eg) {
    var WXJsonProcessor = (function () {
        function WXJsonProcessor() {
        }
        WXJsonProcessor.prototype.onLoadStart = function (host, resource) {
            return __awaiter(this, void 0, void 0, function () {
                var url;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (resource.url.indexOf('http://') == 0 || resource.url.indexOf('https://') == 0) {
                                url = resource.url;
                            }
                            else {
                                url = resource.root + resource.url;
                            }
                            return [4 /*yield*/, eg.WXCacheManager.Instance.getRes(url)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        WXJsonProcessor.prototype.onRemoveStart = function (host, resource) {
            return Promise.resolve();
        };
        return WXJsonProcessor;
    }());
    eg.WXJsonProcessor = WXJsonProcessor;
    __reflect(WXJsonProcessor.prototype, "eg.WXJsonProcessor", ["RES.processor.Processor"]);
})(eg || (eg = {}));
var eg;
(function (eg) {
    var WXSheetProcessor = (function () {
        function WXSheetProcessor() {
        }
        WXSheetProcessor.prototype.onLoadStart = function (host, resource) {
            return __awaiter(this, void 0, void 0, function () {
                var jsonUrl, data, index, imgUrl, texture, frames, spriteSheet, subkey, config;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            jsonUrl = resource.root + resource.url;
                            return [4 /*yield*/, eg.WXCacheManager.Instance.getRes(jsonUrl)];
                        case 1:
                            data = _a.sent();
                            index = jsonUrl.lastIndexOf("/");
                            if (index != -1) {
                                imgUrl = jsonUrl.substring(0, index + 1) + data.file;
                            }
                            return [4 /*yield*/, eg.WXCacheManager.Instance.getRes(imgUrl)];
                        case 2:
                            texture = _a.sent();
                            frames = data.frames;
                            spriteSheet = new egret.SpriteSheet(texture);
                            for (subkey in frames) {
                                config = frames[subkey];
                                spriteSheet.createTexture(subkey, config.x, config.y, config.w, config.h, config.offX, config.offY, config.sourceW, config.sourceH);
                                // if (config["scale9grid"]) {
                                //     var str: string = config["scale9grid"];
                                //     var list: Array<string> = str.split(",");
                                //     texture["scale9Grid"] = new egret.Rectangle(parseInt(list[0]), parseInt(list[1]), parseInt(list[2]), parseInt(list[3]));
                                // }
                                //     if (name) {
                                //         this.addSubkey(subkey, name);
                                //     }
                            }
                            return [2 /*return*/, spriteSheet];
                    }
                });
            });
        };
        WXSheetProcessor.prototype.getData = function (host, resource, key, subkey) {
            eg.log(key + '|' + subkey);
            var data = host.get(resource);
            if (data) {
                return data.getTexture(subkey);
            }
            else {
                console.error("missing resource : " + key + "#" + subkey);
                return null;
            }
        };
        WXSheetProcessor.prototype.onRemoveStart = function (host, resource) {
            return Promise.resolve();
        };
        return WXSheetProcessor;
    }());
    eg.WXSheetProcessor = WXSheetProcessor;
    __reflect(WXSheetProcessor.prototype, "eg.WXSheetProcessor", ["RES.processor.Processor"]);
})(eg || (eg = {}));
var eg;
(function (eg) {
    var WXSoundProcessor = (function () {
        function WXSoundProcessor() {
        }
        return WXSoundProcessor;
    }());
    eg.WXSoundProcessor = WXSoundProcessor;
    __reflect(WXSoundProcessor.prototype, "eg.WXSoundProcessor");
})(eg || (eg = {}));
var eg;
(function (eg) {
    var WXTextProcessor = (function () {
        function WXTextProcessor() {
        }
        WXTextProcessor.prototype.onLoadStart = function (host, resource) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/];
                });
            });
        };
        WXTextProcessor.prototype.onRemoveStart = function (host, resource) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/];
                });
            });
        };
        return WXTextProcessor;
    }());
    eg.WXTextProcessor = WXTextProcessor;
    __reflect(WXTextProcessor.prototype, "eg.WXTextProcessor", ["RES.processor.Processor"]);
})(eg || (eg = {}));
var eg;
(function (eg) {
    var Config = (function () {
        function Config() {
        }
        Config.init = function (main) {
            eg.Config.stage = main.stage;
            eg.Config.STAGE_W = main.stage.stageWidth;
            eg.Config.STAGE_H = main.stage.stageHeight;
            eg.Config.DesignScale = eg.Config.STAGE_H / eg.Config.DesignHeight;
            // eg.log("eg.Config.STAGE_W|H:" + eg.Config.STAGE_W + "|" + eg.Config.STAGE_H);	
        };
        Config.isWxgame = function () {
            return egret.Capabilities.runtimeType == 'wxgame';
        };
        //设计稿尺寸
        Config.DesignWidth = 750;
        Config.DesignHeight = 1206;
        Config.isAutoUploadPageData = true;
        /**
         * 是否开启微信小游戏缓存
         */
        Config.wxgameCache = true;
        /**
         * 显示log
         */
        Config.showLog = false;
        //资源文件配置 可以有多个 [{url1,resourceRoot1},{url2,resourceRoot2}]  配置中的文件名称，不可重复，资源组名称不可重复
        Config.resConfigs = [{ url: 'resource/default.res.json', resourceRoot: 'resource/' }];
        return Config;
    }());
    eg.Config = Config;
    __reflect(Config.prototype, "eg.Config");
})(eg || (eg = {}));
var eg;
(function (eg) {
    var LoadingSimpleUI = (function (_super) {
        __extends(LoadingSimpleUI, _super);
        function LoadingSimpleUI() {
            var _this = _super.call(this) || this;
            _this.firstRadius = 50;
            _this.secondRadius = 25;
            //取点的角度间隔
            _this.angle = 30;
            _this.thickness = 5;
            //动画帧频
            _this.frameRate = 20;
            _this.initUI();
            return _this;
        }
        LoadingSimpleUI.prototype.initUI = function () {
            this.frameTime = 1000 / this.frameRate;
            var bg = eg.createRect(eg.Config.STAGE_W, eg.Config.STAGE_H, 0x0, 0.7);
            bg.touchEnabled = true;
            this.addChild(bg);
            //获取圆上的点
            this.firstPoints = [];
            this.secondPoints = [];
            this.num = 360 / this.angle;
            var pX;
            var pY;
            var total = 0;
            var radians;
            for (var i = 0; i < this.num; i++) {
                radians = total * Math.PI / 180;
                pX = Math.cos(radians) * this.firstRadius;
                pY = Math.sin(radians) * this.firstRadius;
                this.firstPoints[i] = { x: pX, y: pY };
                pX = Math.cos(radians) * this.secondRadius;
                pY = Math.sin(radians) * this.secondRadius;
                this.secondPoints[i] = { x: pX, y: pY };
                total += this.angle;
            }
            //画出图形
            this.shape = new egret.Shape();
            this.shape.graphics.lineStyle(this.thickness, 0xD8D8D8);
            var p1;
            var p2;
            for (var i = 0; i < this.num; i++) {
                p1 = this.firstPoints[i];
                p2 = this.secondPoints[i];
                this.shape.graphics.moveTo(p2.x, p2.y);
                this.shape.graphics.lineTo(p1.x, p1.y);
            }
            this.shape.graphics.endFill();
            this.shape.x = eg.Config.STAGE_W / 2;
            this.shape.y = eg.Config.STAGE_H / 2;
            this.addChild(this.shape);
            this.ani_shape = new egret.Shape();
            this.ani_shape.x = eg.Config.STAGE_W / 2;
            this.ani_shape.y = eg.Config.STAGE_H / 2;
            this.ani_shape.graphics.lineStyle(this.thickness, 0x7A7A7A);
            this.addChild(this.ani_shape);
            this.tf_msg = eg.createTxt("", 0, eg.Config.STAGE_H / 2 + 70, eg.Config.STAGE_W, 50, 24, 0xffffff, egret.HorizontalAlign.CENTER);
            this.addChild(this.tf_msg);
            if (true) {
                this.show();
            }
        };
        Object.defineProperty(LoadingSimpleUI.prototype, "content", {
            get: function () {
                return this;
            },
            enumerable: true,
            configurable: true
        });
        LoadingSimpleUI.prototype.progress = function (cur, total) {
        };
        LoadingSimpleUI.prototype.show = function (msg) {
            this.frameIndex = 0;
            this.t1 = egret.getTimer();
            this.addEventListener(egret.Event.ENTER_FRAME, this.onFrame, this);
            this.showMsg(msg);
        };
        LoadingSimpleUI.prototype.showMsg = function (msg) {
            this.tf_msg.text = msg;
        };
        LoadingSimpleUI.prototype.onFrame = function (evt) {
            var t2 = egret.getTimer();
            if (t2 - this.t1 > this.frameTime) {
                var index = this.frameIndex % this.num;
                var p1 = this.firstPoints[index];
                var p2 = this.secondPoints[index];
                this.ani_shape.graphics.clear();
                this.ani_shape.graphics.lineStyle(this.thickness, 0x333333);
                this.ani_shape.graphics.moveTo(p2.x, p2.y);
                this.ani_shape.graphics.lineTo(p1.x, p1.y);
                this.ani_shape.graphics.endFill();
                this.frameIndex++;
                this.t1 = t2;
            }
        };
        LoadingSimpleUI.prototype.hide = function () {
            this.dispose();
        };
        LoadingSimpleUI.prototype.dispose = function () {
            if (this.parent) {
                this.parent.removeChild(this);
            }
            this.removeEventListener(egret.Event.ENTER_FRAME, this.onFrame, this);
        };
        return LoadingSimpleUI;
    }(egret.DisplayObjectContainer));
    eg.LoadingSimpleUI = LoadingSimpleUI;
    __reflect(LoadingSimpleUI.prototype, "eg.LoadingSimpleUI", ["eg.ILoadingUI", "eg.IDisplayObject", "eg.IDispose"]);
})(eg || (eg = {}));
var eg;
(function (eg) {
    var LanguageManager = (function () {
        function LanguageManager() {
        }
        Object.defineProperty(LanguageManager, "Instance", {
            get: function () {
                if (LanguageManager._instance == null) {
                    LanguageManager._instance = new LanguageManager();
                }
                return LanguageManager._instance;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LanguageManager.prototype, "languageData", {
            /**
             * 设置语言包数据
             * {
             * 	1000:我是的名字是${0},年龄${1},身高${2},
             * 	1001:无参数文本
             * }
             *
             */
            set: function (data) {
                this._data = data;
            },
            enumerable: true,
            configurable: true
        });
        /***
         * 获取语言文本
         * 格式: 我是的名字是${0},年龄${1},身高${2}
         * @params id    语言文本id
         * @params replaceParams  需要替换的参数
         */
        LanguageManager.prototype.getLanguage = function (id) {
            var replaceParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                replaceParams[_i - 1] = arguments[_i];
            }
            var str;
            if (this._data == null) {
                eg.log('没有设置语言包数据');
            }
            else {
                str = this._data[id];
            }
            if (str) {
                if (replaceParams) {
                    var len = replaceParams.length;
                    //字符串替换，正则
                    for (var i = 0; i < len; i++) {
                        str = str.replace('${' + i + '}', replaceParams[i]);
                    }
                }
            }
            else {
                eg.log("语言id:" + id + "不存在");
            }
            return str;
        };
        return LanguageManager;
    }());
    eg.LanguageManager = LanguageManager;
    __reflect(LanguageManager.prototype, "eg.LanguageManager");
})(eg || (eg = {}));
var eg;
(function (eg) {
    var RESManager = (function () {
        function RESManager() {
        }
        RESManager.prototype.loadConfig = function (url, resourceRoot) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            eg.log('loadConfig:' + url + " resourceRoot:" + resourceRoot);
                            return [4 /*yield*/, RES.loadConfig(url, resourceRoot)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        Object.defineProperty(RESManager, "Instance", {
            get: function () {
                return instance;
            },
            enumerable: true,
            configurable: true
        });
        return RESManager;
    }());
    eg.RESManager = RESManager;
    __reflect(RESManager.prototype, "eg.RESManager");
    var instance = new RESManager();
})(eg || (eg = {}));
var eg;
(function (eg) {
    /**
     * UI显示管理类
     */
    var UIManager = (function () {
        function UIManager() {
            //当前显示的窗口字典类 按pageType分类
            this._dic = {};
        }
        Object.defineProperty(UIManager, "Instance", {
            get: function () {
                if (UIManager.instance == null) {
                    UIManager.instance;
                    UIManager.instance = new UIManager();
                }
                return UIManager.instance;
            },
            enumerable: true,
            configurable: true
        });
        UIManager.prototype.showUI = function (param) {
            var page;
            var type = typeof param;
            eg.log('type:' + type);
            switch (type) {
                case 'function':
                    page = new param();
                    break;
                case 'string':
                    page = new (egret.getDefinitionByName(param))();
                    break;
                case 'object':
                    page = param;
                    break;
            }
            //绑定上一页的额外数据(同层数据传递)
            this.bindData(page);
            //添加到显示层
            this.show(page);
            //数据上报
            this.uploadPageData(page);
            return page;
        };
        /**
         * 添加显示对象到对应的层
         */
        UIManager.prototype.show = function (page) {
            //open
            page.open();
            var pageType = page.pageType;
            var layer = eg.UILayer.Instance.getLayerByType(pageType);
            layer.addChild(page.content);
            //关闭上一页
            var upPage = this._dic[page.pageType];
            if (upPage && !upPage.isDispose) {
                upPage.close();
            }
            this._dic[page.pageType] = page;
            // switch(pageType){
            // 	case UILayer.LAYER_WINDOW:	
            // 		if(this._window != null){				
            // 			this._window.close();
            // 		}
            // 		this._window = page;				
            // 		break;
            // 	case UILayer.LAYER_TIPS_WINDOW:
            // 		if(this._tips){
            // 			this._tips.close();
            // 		}
            // 		this._tips = page;						
            // 		break;
            // }			
        };
        /**
         * 绑定上一页的额外数据到当前页
         */
        UIManager.prototype.bindData = function (page) {
            var upPage = this._dic[page.pageType];
            page.upPageExtraData = this.getPageExtraData(upPage);
        };
        /**
         * 获取上一页的额外数据
         */
        UIManager.prototype.getPageExtraData = function (page) {
            var upPageExtraData = (page ? page.curPageExtraData : {}) || {};
            upPageExtraData.upPageName = page ? page.pageName : "";
            return upPageExtraData;
        };
        /**
         * 页面数据上报
         */
        UIManager.prototype.uploadPageData = function (page) {
            var upPage = this._dic[page.pageType];
            //如果是提示类型，同层提示不存在，取对应的window层zuozuo
            if (upPage == null && page.pageType == eg.UILayer.LAYER_POPUP) {
                upPage = this._dic[eg.UILayer.LAYER_SCENCE];
            }
            var curPageName = page.pageName;
            var upPageName = upPage ? upPage.pageName : "";
            if (eg.Config.isAutoUploadPageData && curPageName) {
                eg.ActLog.Instance.log({ event_type: 50, refer_page_name: upPageName, current_page_name: curPageName });
            }
        };
        /**
         * 根据UI类型关闭界面
         */
        UIManager.prototype.closeUIByType = function (pageType) {
            var page = this._dic[pageType];
            if (page && !page.isDispose) {
                page.close();
            }
            this._dic[pageType] = null;
        };
        /**
         * 关闭UI
         */
        UIManager.prototype.closeUI = function (page) {
            this.closeUIByType(page.pageType);
        };
        return UIManager;
    }());
    eg.UIManager = UIManager;
    __reflect(UIManager.prototype, "eg.UIManager");
})(eg || (eg = {}));
var eg;
(function (eg) {
    var WXCacheManager = (function () {
        function WXCacheManager() {
            //资源版本号文件路径
            this.resConfigPath = 'wx_version.json';
        }
        Object.defineProperty(WXCacheManager, "Instance", {
            get: function () {
                return instance;
            },
            enumerable: true,
            configurable: true
        });
        WXCacheManager.prototype.init = function () {
            var _this = this;
            return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(egret.Capabilities.runtimeType == 'wxgame')) return [3 /*break*/, 3];
                            eg.log('---------------------------启用wxgame缓存------------------------------');
                            // RES.processor.map('image',new WXImageProcessor());
                            this.wxResProcessor();
                            this.resFile = new eg.WXFile('http://', eg.WXFile.CACHE_DIR + this.resConfigPath);
                            result = void 0;
                            if (!this.resFile.exists(this.resFile.localPath)) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.resFile.read()];
                        case 1:
                            result = _a.sent();
                            _a.label = 2;
                        case 2:
                            // eg.log('resCacheConfig:' + result);	
                            resCacheConfig = result || {};
                            _a.label = 3;
                        case 3:
                            resolve();
                            return [2 /*return*/];
                    }
                });
            }); });
        };
        WXCacheManager.prototype.wxResProcessor = function () {
            RES.processor.map('image', new eg.WXImageProcessor());
            RES.processor.map('text', new eg.WXTextProcessor());
            RES.processor.map('json', new eg.WXJsonProcessor());
            RES.processor.map('sheet', new eg.WXSheetProcessor());
        };
        WXCacheManager.prototype.getRes = function (url) {
            var _this = this;
            //resource/assets/xx
            //1.判断是否有缓存，如果有，则比较版本号，没有则从网络下载，并缓存该文件
            return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                var file, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            file = new eg.WXFile(url);
                            if (!(file.isRemotePath && this.isUpdateFile(file))) return [3 /*break*/, 2];
                            eg.log("网络下载资源");
                            return [4 /*yield*/, file.downloadFile()];
                        case 1:
                            _a.sent();
                            //更新本地配置
                            this.updateCacheConfig(file);
                            _a.label = 2;
                        case 2: return [4 /*yield*/, file.read()];
                        case 3:
                            result = _a.sent();
                            resolve(result);
                            return [2 /*return*/];
                    }
                });
            }); });
        };
        /**
         * 判断是否需要从远程网络更新文件
         */
        WXCacheManager.prototype.isUpdateFile = function (file) {
            //本地无文件，或者版本号不一致则从网络下载更新文件		
            eg.log('isUpdateFile:' + file.remoteUrl);
            return !(file.exists(file.localPath) && this.compareResVersion(file));
        };
        /**
         * 比较资源版本号
         */
        WXCacheManager.prototype.compareResVersion = function (file) {
            var localVersion = resCacheConfig ? resCacheConfig[file.prefixPath] : undefined;
            eg.log('localVersion:' + localVersion + " verson:" + file.version);
            return localVersion == file.version;
        };
        /**
         * 保存缓存配置文件
         */
        WXCacheManager.prototype.updateCacheConfig = function (file) {
            // resCacheConfig = resCacheConfig || {};
            eg.log('updateCacheConfig prefixPath:' + file.prefixPath + '-> version:' + file.version);
            if (file.version) {
                resCacheConfig[file.prefixPath] = file.version;
                var str = JSON.stringify(resCacheConfig);
                eg.log(str);
                this.resFile.writeText(str);
            }
        };
        /**
         * 清理缓存
         */
        WXCacheManager.prototype.clearCache = function () {
            //策略 根据缓存过期时间清理
        };
        return WXCacheManager;
    }());
    eg.WXCacheManager = WXCacheManager;
    __reflect(WXCacheManager.prototype, "eg.WXCacheManager");
    var instance = new WXCacheManager();
    /**
     * 配置数据格式为path:version 的json数据
     *
     */
    var resCacheConfig;
})(eg || (eg = {}));
var eg;
(function (eg) {
    var WXFileManager = (function () {
        function WXFileManager() {
            //this.fs = wx.getFileSystemManager();
        }
        WXFileManager.prototype.init = function () {
            //this.WX_ROOT = wx.env.USER_DATA_PATH + "/";
        };
        Object.defineProperty(WXFileManager, "Instance", {
            // public get 
            get: function () {
                return instance;
            },
            enumerable: true,
            configurable: true
        });
        return WXFileManager;
    }());
    eg.WXFileManager = WXFileManager;
    __reflect(WXFileManager.prototype, "eg.WXFileManager");
    var instance = new WXFileManager();
})(eg || (eg = {}));
var eg;
(function (eg) {
    var WS = (function (_super) {
        __extends(WS, _super);
        function WS() {
            return _super.call(this) || this;
        }
        WS.getInstance = function () {
            if (WS._instance == null) {
                WS._instance = new WS();
            }
            return WS._instance;
        };
        WS.prototype.init = function () {
            this._ws = new egret.WebSocket();
            //创建 WebSocket 对象
            this._ws = new egret.WebSocket();
            //设置数据格式为二进制，默认为字符串
            this._ws.type = egret.WebSocket.TYPE_BINARY;
            //添加收到数据侦听，收到数据会调用此方法
            this._ws.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
            //添加链接打开侦听，连接成功会调用此方法
            this._ws.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
            //添加链接关闭侦听，手动关闭或者服务器关闭连接会调用此方法
            this._ws.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
            //添加异常侦听，出现异常会调用此方法
            this._ws.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
        };
        WS.prototype.connect = function (host, port) {
            this._ws.connect(host, port);
        };
        WS.prototype.connectByUrl = function (url) {
            this._ws.connectByUrl(url);
        };
        WS.prototype.sendData = function (bytes) {
            this._ws.writeBytes(bytes, 0, bytes.bytesAvailable);
            this._ws.flush();
        };
        WS.prototype.onReceiveMessage = function (e) {
            eg.log('onReceiveMessage');
            var bytes = new egret.ByteArray();
            this._ws.readBytes(bytes);
            this.dispatchEventWith(egret.ProgressEvent.SOCKET_DATA, false, bytes);
            // console.log(bytes.length);
            //读取字符串信息
            // var msg:string = bytes.readUTF();
            //读取布尔值信息
            // var boo:boolean = bytes.readBoolean();
            // //读取int值信息
            // var num:number = bytes.readInt();
            // eg.log("收到数据:");
            // eg.log("readUTF : "+msg);
            // eg.log("readBoolean : "+boo.toString());
            // eg.log("readInt : "+num.toString());
        };
        WS.prototype.onSocketOpen = function () {
            eg.log("WebSocketOpen");
            this.dispatchEventWith(egret.Event.CONNECT);
        };
        WS.prototype.onSocketClose = function () {
            eg.log("WebSocketClose");
            this.dispatchEventWith(egret.Event.CLOSE);
        };
        WS.prototype.onSocketError = function () {
            eg.log("WebSocketError");
            this.dispatchEventWith(egret.IOErrorEvent.IO_ERROR);
        };
        WS.prototype.connected = function () {
            return this._ws.connected;
        };
        return WS;
    }(egret.EventDispatcher));
    eg.WS = WS;
    __reflect(WS.prototype, "eg.WS");
})(eg || (eg = {}));
var eg;
(function (eg) {
    var ActLog = (function () {
        function ActLog() {
        }
        Object.defineProperty(ActLog, "Instance", {
            get: function () {
                if (ActLog._instance == null) {
                    ActLog._instance = new ActLog();
                }
                return ActLog._instance;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ActLog.prototype, "logUrl", {
            /**
             *
             * 设置数据埋点域名地址
             */
            set: function (value) {
                this._logUrl = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ActLog.prototype, "templateData", {
            /**
             * 设置埋点数据模版
             */
            set: function (value) {
                this._templateData = JSON.stringify(value);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 数据埋点方法
         * @param addMsgData  增量变动的数据字段
         * {event_type:xxx,kv:xx}  字段名称保持和消息文档一致
         *
         */
        ActLog.prototype.log = function (addMsgData) {
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
            var params = JSON.parse(this._templateData);
            var msgData = params.message_data[0];
            for (var key in addMsgData) {
                msgData[key] = addMsgData[key];
            }
            msgData.timestamp = Date.now();
            eg.post(this._logUrl, params, egret.HttpResponseType.TEXT, { "Content-Type": "application/json" });
        };
        /**
         * 发送log请求，发送之前需要设置logUrl地址
         *
         */
        ActLog.prototype.sendLog = function (params) {
            eg.post(this._logUrl, params, egret.HttpResponseType.TEXT, { "Content-Type": "application/json" });
        };
        ActLog.prototype.getMsgDate = function (userid, event_type, kv) {
            if (kv === void 0) { kv = null; }
            var template = {
                "activity_id": 600000,
                "user_id": [
                    {
                        "type": 2,
                        "value": userid
                    }
                ],
                "event_type": event_type,
                "timestamp": Date.now(),
                // "terminal_id":"terminal-1110",
                // "terminal_type":2,
                // "activity_value":"20 seconds",
                // "mall_id":"mall-001",
                "id": "activity-log-id-json-1",
                "activity_type": 1,
                "kv": kv
            };
            return template;
        };
        return ActLog;
    }());
    eg.ActLog = ActLog;
    __reflect(ActLog.prototype, "eg.ActLog");
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
})(eg || (eg = {}));
var eg;
(function (eg) {
    /**
     * 描述文件 description.json
     */
    var Description = (function () {
        function Description() {
        }
        Object.defineProperty(Description, "Instance", {
            get: function () {
                if (Description._instance == null) {
                    Description._instance = new Description();
                }
                return Description._instance;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Description.prototype, "data", {
            /**
             * 设置配置文件数据
             */
            set: function (value) {
                this._data = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Description.prototype, "platform", {
            get: function () {
                return this._platform;
            },
            /**
             * 设置平台标识 52,qa,v4,v8
             */
            set: function (value) {
                this._platform = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 获取游戏API
         */
        Description.prototype.getGameAPI = function (name) {
            return this.getDomain('game') + this.getAPI(name);
        };
        /**
         * 获取 wx API
         */
        Description.prototype.getWXAPI = function (name) {
            return this.getDomain('wx') + this.getAPI(name);
        };
        /**
         * 获取 log API
         */
        Description.prototype.getLogAPI = function (name) {
            return this.getDomain('log') + this.getAPI(name);
        };
        /**
         * 获取当前平台的域名
         */
        Description.prototype.getDomain = function (name) {
            return this._data['domain']['domain'][this._platform][name];
        };
        Description.prototype.getAPI = function (name) {
            return this._data['domain']['api'][name];
        };
        /**
         * 获取api 优先使用改方法
         * apiType api的类型  游戏 会员 log 微信(根据配置决定)
         * api api的名称
         */
        Description.prototype.getAPI2 = function (apiType, apiName) {
            return this.getDomain(apiType) + this._data['domain']['api'][apiName];
        };
        Object.defineProperty(Description.prototype, "languageData", {
            /**
             * 获取语言包数据
             */
            get: function () {
                return this._data.language;
            },
            enumerable: true,
            configurable: true
        });
        Description.prototype.getValue = function (keys) {
            var type = typeof keys;
            eg.log('type:' + type);
            var keyArr;
            if (type == 'string') {
                keyArr = keys.split('.');
            }
            else {
                keyArr = keys;
            }
            var value = this._data;
            var len = keyArr.length;
            for (var i = 0; i < len; i++) {
                value = value[keyArr[i]];
            }
            return value;
        };
        return Description;
    }());
    eg.Description = Description;
    __reflect(Description.prototype, "eg.Description");
})(eg || (eg = {}));
var eg;
(function (eg) {
    /**
     * 获取一个对象的类对象引用。
     */
    function getDefinition(value) {
        var className = egret.getQualifiedClassName(value);
        return egret.getDefinitionByName(className);
    }
    eg.getDefinition = getDefinition;
})(eg || (eg = {}));
var eg;
(function (eg) {
    /***
     * 网页元素使用
     */
    var HtmlImage = (function () {
        function HtmlImage(imgUrl) {
            var gameDiv = document.getElementById("gameDiv");
            this.element = document.createElement("img");
            this.element.style.position = "absolute";
            gameDiv.appendChild(this.element);
            this.show(imgUrl);
            // this.addEvent('');
        }
        HtmlImage.prototype.addEvent = function (type) {
            this.element.addEventListener('touchstart', this.onTouchstart, false);
        };
        HtmlImage.prototype.onTouchstart = function (evt) {
            eg.log(evt);
        };
        HtmlImage.prototype.show = function (imgUrl) {
            if (imgUrl === void 0) { imgUrl = null; }
            if (imgUrl != null && this._imgUrl != imgUrl) {
                this._imgUrl = imgUrl;
                this.element.src = imgUrl;
            }
            this.element.style.display = "inline";
        };
        HtmlImage.prototype.setPosition = function (xPos, yPos, w, h) {
            var wScale = document.body.clientWidth / eg.Config.STAGE_W;
            var hScale = document.body.clientHeight / eg.Config.STAGE_H;
            eg.log('wScale:' + wScale);
            eg.log('hScale:' + hScale);
            this.element.style.width = w * wScale + "px";
            this.element.style.height = h * hScale + "px";
            this.element.style.left = xPos * wScale + "px";
            this.element.style.top = yPos * hScale + "px";
        };
        HtmlImage.prototype.hide = function (isDestroy) {
            if (isDestroy === void 0) { isDestroy = false; }
            this.element.style.display = "none";
            if (isDestroy) {
                this.dispose();
            }
        };
        HtmlImage.prototype.dispose = function () {
            this.element.parentNode.removeChild(this.element);
        };
        HtmlImage.prototype.getElement = function () {
            return this.element;
        };
        return HtmlImage;
    }());
    eg.HtmlImage = HtmlImage;
    __reflect(HtmlImage.prototype, "eg.HtmlImage", ["eg.IDispose"]);
})(eg || (eg = {}));
// module eg {
// 	export class HttpService {
// 		private static instance:HttpService;
// 		public constructor() {
// 		}
// 		public static getInstance():HttpService{
// 			if(HttpService.instance == null){
// 				HttpService.instance = new  HttpService();
// 			}
// 			return HttpService.instance;
// 		}
// 		/*
// 	   	 * 参数格式化为字符串
// 		 * @params {"id":"100","name":"caozc"}    format "id=100&name=caozc"
// 		 */
// 		public static formatParam(params:any):string{
// 			var msg:string = "";
// 				for (var key in params) {
// 					msg += "&" + key + "=" + params[key];
// 				}
// 			return msg;
// 		}
// 		public load(url:string,params:any,thisObj:any=null,success:Function=null,error:Function=null,method:string=egret.URLRequestMethod.POST,isShowTips:boolean=true):void{
// 			let sendData:any;
// 			if(params instanceof ArrayBuffer){
// 				sendData = params;
// 			} else {
// 				var vars:egret.URLVariables = new egret.URLVariables();					
// 				vars.decode(eg.HttpService.formatParam(params));
// 				sendData = vars;
// 			}
// 			var urlLoader:egret.URLLoader = new egret.URLLoader();
// 			var request:egret.URLRequest = new egret.URLRequest();
// 			request.method = method;
// 			/*
// 			let headers:Array<egret.URLRequestHeader>;
// 			if(requestHeaders == null){
// 				headers = [new egret.URLRequestHeader("Content-Type","application/x-www-form-urlencoded")];				
// 			} else {
// 				headers = requestHeaders;
// 			}
// 			// request.requestHeaders = headers;
// 			*/
// 			if(params != null){
// 				request.data = sendData;
// 			}
// 			request.url = url;
// 			urlLoader.addEventListener(egret.Event.COMPLETE,onComplete,this);
// 			urlLoader.addEventListener(egret.IOErrorEvent.IO_ERROR,onIoError,this);			
// 			urlLoader.load(request);
// 			function onComplete(evt:Event):void{
// 				eg.log('urlLoader.data:' + urlLoader.data);
// 				remove();
// 				let data:any = JSON.parse(urlLoader.data);
// 				// if(data.meta.errno != 0 && isShowTips){
// 				// 	// eg.Tips.showMsg([{text:data.meta.msg}]);
// 				// 	// eg.Config.topLayer.addChild(new views.TipsPage(data.msg));
// 				// }
// 				if(success != null){
// 					success.call(thisObj,data);
// 				}
// 			}
// 			function onIoError(evt:egret.IOErrorEvent):void{
// 				remove();				
// 				if(error != null){					
// 					error.call(thisObj);
// 				} else {						
// 					eg.Tips.showMsg([{text:"网络异常"}]);
// 					// eg.Config.topLayer.addChild(new views.TipsPage('网络异常'));
// 				}
// 			}
// 			function remove():void{
// 				urlLoader.removeEventListener(egret.Event.COMPLETE,onComplete,this);
// 				urlLoader.removeEventListener(egret.IOErrorEvent.IO_ERROR,onIoError,this);				
// 			}
// 		}
// 	}
// } 
var util;
(function (util) {
    /**
     * 分页对象
     * @author caozhichao
     *
     */
    var Pagination = (function () {
        function Pagination(pageSize) {
            this._pageSize = pageSize;
            this._curPage = 1;
            this._items = [];
        }
        Object.defineProperty(Pagination.prototype, "items", {
            /**
             * 设置分页数据
             * @param value
             *
             */
            set: function (value) {
                this._items = value;
                this._countPage = this.pageCount(this._items.length);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 获取总页数
         * @param len 数据的个数
         * @return
         *
         */
        Pagination.prototype.pageCount = function (len) {
            var count;
            len = Math.floor((len - 1) / this._pageSize);
            if (len < 1) {
                count = 1;
            }
            else {
                count = len + 1;
            }
            return count;
        };
        /**
         * 根据页码获取数据
         * @param pageNum   页码
         * @return
         *
         */
        Pagination.prototype.getItemsByPage = function (pageNum) {
            var startIndex = (pageNum - 1) * this._pageSize;
            var maxIndex = this._items.length;
            return this._items.slice(startIndex, Math.min((startIndex + this._pageSize), maxIndex));
        };
        Object.defineProperty(Pagination.prototype, "curPageItems", {
            /**
             * 当前页
             * @return
             *
             */
            get: function () {
                return this.getItemsByPage(this.curPage);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 前一页
         *
         */
        Pagination.prototype.toPrePage = function () {
            if (this._curPage > 1) {
                this._curPage--;
            }
        };
        /**
         * 下一页
         *
         */
        Pagination.prototype.toNextPage = function () {
            this._curPage = Math.min(this._curPage + 1, this.countPage);
        };
        Object.defineProperty(Pagination.prototype, "allLen", {
            get: function () {
                return this._items == null ? 0 : this._items.length;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Pagination.prototype, "countPage", {
            /**
             * 总页数
             * @return
             *
             */
            get: function () {
                return this._countPage;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Pagination.prototype, "curPage", {
            /**
             * 当前页码
             * @return
             *
             */
            get: function () {
                return this._curPage;
            },
            /**
             * 设置当前页
             * @param value
             *
             */
            set: function (value) {
                this._curPage = Math.max(1, value);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 获取页号
         * @param id
         * @return -1 该数据不存在
         *
         */
        Pagination.prototype.getPageByItem = function (item) {
            var index = this._items.indexOf(item);
            if (index != -1) {
                return this.getPageByIndex(index);
            }
            return -1;
        };
        /**
         * 获取页号
         * @param elementindex
         *
         */
        Pagination.prototype.getPageByIndex = function (index) {
            if (index >= 0) {
                //            return int(index / _pageSize) + 1;
                return this.pageCount(index + 1);
            }
            return -1;
        };
        /**
         * 选中当前选项,0开始
         */
        Pagination.prototype.setCurItem = function (index) {
            if (this._items && index < this._items.length) {
                this._curPage = this.getPageByIndex(index);
                index = index - (this._curPage - 1) * this._pageSize;
                this._curIndex = index;
                return true;
            }
            return false;
        };
        Object.defineProperty(Pagination.prototype, "isFirstPage", {
            /**
             * 是否第一页
             * @return
             *
             */
            get: function () {
                var flag;
                if (this._curPage == 1) {
                    flag = true;
                }
                return flag;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Pagination.prototype, "isEndPage", {
            /**
             * 是否最后一页
             * @return
             *
             */
            get: function () {
                var flag;
                if (this._curPage == this.countPage) {
                    flag = true;
                }
                return flag;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Pagination.prototype, "pageStr", {
            /**
             * 获取页码字符串
             * @return
             *
             */
            get: function () {
                return this._curPage + "/" + this._countPage;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Pagination.prototype, "pageSize", {
            get: function () {
                return this._pageSize;
            },
            enumerable: true,
            configurable: true
        });
        Pagination.prototype.dispose = function () {
            this._items = null;
        };
        return Pagination;
    }());
    util.Pagination = Pagination;
    __reflect(Pagination.prototype, "util.Pagination");
})(util || (util = {}));
var eg;
(function (eg) {
    /**
     * 通用对象池
     */
    var Pool = (function () {
        function Pool() {
            this._poolDic = {};
        }
        Object.defineProperty(Pool, "Instance", {
            get: function () {
                if (Pool._instance == null) {
                    Pool._instance = new Pool();
                }
                return Pool._instance;
            },
            enumerable: true,
            configurable: true
        });
        Pool.prototype.getPoolBySign = function (sign) {
            return this._poolDic[sign] || (this._poolDic[sign] = []);
        };
        /**
         * 根据对象的Class获取一个对象
         */
        Pool.prototype.getItemByClass = function (cls) {
            var sign = egret.getQualifiedClassName(cls);
            var pool = this.getPoolBySign(sign);
            eg.log('getItemByClass:' + sign + "|" + pool.length);
            var rst = pool.length ? pool.pop() : new cls();
            return rst;
        };
        /**
         * 放回池中
         */
        Pool.prototype.recover = function (item) {
            var sign = egret.getQualifiedClassName(item);
            var pool = this.getPoolBySign(sign);
            pool.push(item);
            eg.log('recover:' + sign + "|" + pool.length);
        };
        /**
         * 根据对象的class 和 一个 创建该对象的函数获取一个对象
         */
        Pool.prototype.getItemByCreateFun = function (cls, createFun, thisObject) {
            var sign = egret.getQualifiedClassName(cls);
            var pool = this.getPoolBySign(sign);
            var rst = pool.length ? pool.pop() : createFun.call(thisObject);
            return rst;
        };
        return Pool;
    }());
    eg.Pool = Pool;
    __reflect(Pool.prototype, "eg.Pool");
})(eg || (eg = {}));
// module eg {
// 	/**
//  * 长按识别二维码
//  * 创建img标签的二维码，在微信里长按扫描识别
//  * @author chenkai
//  * @since 2017/4/17
//  * 
//  * example:
//  * var qrCode:QRCode = new QRCode("resource/assets/qrcode.jpg");
//  * qrCode.setPosition(100, 100, 200, 200);
//  * qrCode.showHtmlCode();
//  */
// export class QRCode{
//     /**html中<img>标签二维码*/
//     private htmlCode: HTMLImageElement;
//     /**
//      * @param htmlCodeUrl htmlCode二维码链接
//      */
//     public constructor(htmlCodeUrl:string){
//         var gameDiv = document.getElementById("gameDiv");
//         this.htmlCode = document.createElement("img");
//         this.htmlCode.src = htmlCodeUrl;
//         this.htmlCode.style.position = "absolute";
//         this.htmlCode.style.display = "none";
//         gameDiv.appendChild(this.htmlCode);
//     }
//     /**
//      * 显示二维码
//      */ 
//     public showHtmlCode(): void {
//         if(this.htmlCode){
//              this.htmlCode.style.display = "inline";
//         }
//     }
//     /**隐藏二维码*/
//     public hideHtmlCode(): void {
//         if(this.htmlCode) {
//             this.htmlCode.style.display = "none";
//         }
//     }
//     /**
//      * 设置二维码图片位置
//      * @param xPos x坐标
//      * @param yPos y坐标
//      * @param width 宽度
//      * @param height 高度
//      */
//     public setPosition(xPos:number, yPos:number, width:number, height:number){
//         if(this.htmlCode == null){
//             return;
//         }
//         //竖屏
//         if(document.body.clientWidth < document.body.clientHeight){
//             var wScale = document.body.clientWidth / eg.Config.STAGE_W;
//             var hScale = document.body.clientHeight /eg.Config.STAGE_H
//             eg.log('wScale:' + wScale);
//             eg.log('hScale:' + hScale);
//             this.htmlCode.style.width = width * wScale + "px";
//             this.htmlCode.style.height = height * hScale + "px";
//             this.htmlCode.style.left = xPos * wScale + "px";
//             this.htmlCode.style.top = yPos * hScale + "px";
//         //横屏
//         }else{
//             var wScale = document.body.clientWidth / eg.Config.STAGE_H;
//             var hScale = document.body.clientHeight / eg.Config.STAGE_W;
//             this.htmlCode.style.width =height*wScale + "px";
//             this.htmlCode.style.height = width*hScale + "px";
//             this.htmlCode.style.top = (eg.Config.STAGE_W - xPos -width)*hScale + "px";
//             this.htmlCode.style.left = yPos*wScale + "px";
//         }
//     }
//     /**销毁*/
//     public destroy(){
//         if(this.htmlCode){
//             this.htmlCode.parentNode.removeChild(this.htmlCode);
//             this.htmlCode = null;
//         }
//     }
// }
// } 
var eg;
(function (eg) {
    /**
      * http://www.html-js.com/article/1528
      * @description 射线法判断点是否在多边形内部
      * @param {Object} p 待判断的点，格式：{ x: X坐标, y: Y坐标 }
      * @param {Array} poly 多边形顶点，数组成员的格式同 p
      * @return {String} 点 p 和多边形 poly 的几何关系
      */
    function rayCasting(p, poly) {
        var px = p.x, py = p.y, flag = false;
        for (var i = 0, l = poly.length, j = l - 1; i < l; j = i, i++) {
            var sx = poly[i].x, sy = poly[i].y, tx = poly[j].x, ty = poly[j].y;
            // 点与多边形顶点重合
            if ((sx === px && sy === py) || (tx === px && ty === py)) {
                return 'on';
            }
            // 判断线段两端点是否在射线两侧
            if ((sy < py && ty >= py) || (sy >= py && ty < py)) {
                // 线段上与射线 Y 坐标相同的点的 X 坐标
                var x = sx + (py - sy) * (tx - sx) / (ty - sy);
                // 点在多边形的边上
                if (x === px) {
                    return 'on';
                }
                // 射线穿过多边形的边界
                if (x > px) {
                    flag = !flag;
                }
            }
        }
        // 射线穿过多边形边界的次数为奇数时点在多边形内
        return flag ? 'in' : 'out';
    }
    eg.rayCasting = rayCasting;
})(eg || (eg = {}));
var eg;
(function (eg) {
    /**
     * 场景卷屏算法
     */
    var SceneScroll = (function () {
        function SceneScroll(viewWith, viewHeight, maxWidth, maxHeight) {
            this._viewRect = new egret.Rectangle(0, 0, viewWith, viewHeight);
            this._sceneRect = new egret.Rectangle(0, 0, maxWidth, maxHeight);
            this._scrollPoint = new egret.Point(viewWith / 2, viewHeight / 2);
            this._scrollRect = new egret.Rectangle(0, 0, maxWidth - viewWith, maxHeight - viewHeight);
            this.$pos = new egret.Point();
        }
        /**
         * 根据移动目标计算场景的偏移量
         */
        SceneScroll.prototype.updatePostion = function (x, y) {
            var offX = x - this._scrollPoint.x;
            var offY = y - this._scrollPoint.y;
            offX = offX < 0 ? 0 : offX > this._scrollRect.width ? this._scrollRect.width : offX;
            offY = offY < 0 ? 0 : offY > this._scrollRect.height ? this._scrollRect.height : offY;
            offX = offX | 0; //取整
            offY = offY | 0;
            this._sceneRect.x = -offX;
            this._sceneRect.y = -offY;
            this.$pos.setTo(-offX, -offY);
            return this.$pos;
        };
        return SceneScroll;
    }());
    eg.SceneScroll = SceneScroll;
    __reflect(SceneScroll.prototype, "eg.SceneScroll");
})(eg || (eg = {}));
var util;
(function (util) {
    /**
* 震动工具
* @author chenkai
* @since 2017/5/24
*
* Example:
* 震动目标obj，1秒内震动10次，震动最大距离10
* ShakeTool.getInstance().shakeObj(obj, 1, 10, 10);
*/
    var ShakeTool = (function () {
        function ShakeTool() {
            this.count = 0; //计时器次数
            this.timer = new egret.Timer(1000);
        }
        ShakeTool.getInstance = function () {
            if (this.instance == null) {
                this.instance = new ShakeTool();
            }
            return this.instance;
        };
        /**
         * 震动显示对象
         * @param        target    震动目标对象
         * @param        time      震动持续时长（秒）
         * @param        rate      震动频率(一秒震动多少次)
         * @param        maxDis    震动最大距离
         */
        ShakeTool.prototype.shakeObj = function (target, time, rate, maxDis) {
            this.stop();
            this.target = target;
            this.initX = target.x;
            this.initY = target.y;
            this.maxDis = maxDis;
            this.count = time * rate;
            this.rate = rate;
            this.timer.delay = 1000 / rate;
            this.timer.repeatCount = this.count;
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.shaking, this);
            this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.shakeComplete, this);
            this.timer.reset();
            this.timer.start();
        };
        ShakeTool.prototype.shaking = function () {
            egret.Tween.removeTweens(this.target);
            this.target.x = this.initX - this.maxDis + Math.random() * this.maxDis * 2;
            this.target.y = this.initY - this.maxDis + Math.random() * this.maxDis * 2;
            egret.Tween.get(this.target).to({ x: this.initX, y: this.initY }, 999 / this.rate);
        };
        ShakeTool.prototype.shakeComplete = function () {
            if (this.target) {
                egret.Tween.removeTweens(this.target);
                this.target.x = this.initX;
                this.target.y = this.initY;
                this.target = null;
            }
            this.timer.removeEventListener(egret.TimerEvent.TIMER, this.shaking, this);
            this.timer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.shakeComplete, this);
        };
        /**停止震动 */
        ShakeTool.prototype.stop = function () {
            this.shakeComplete();
        };
        return ShakeTool;
    }());
    util.ShakeTool = ShakeTool;
    __reflect(ShakeTool.prototype, "util.ShakeTool");
})(util || (util = {}));
var eg;
(function (eg) {
    var SoundIcon = (function (_super) {
        __extends(SoundIcon, _super);
        function SoundIcon(playResName, pauseResName) {
            if (playResName === void 0) { playResName = 'sound_play_png'; }
            if (pauseResName === void 0) { pauseResName = 'sound_pause_png'; }
            var _this = _super.call(this) || this;
            _this._playResName = playResName;
            _this._pauseResName = pauseResName;
            _this.initUI();
            return _this;
        }
        SoundIcon.prototype.initUI = function () {
            this.icon = eg.createBitmap(this._playResName);
            this.icon.anchorOffsetX = this.icon.width / 2;
            this.icon.anchorOffsetY = this.icon.height / 2;
            this.addChild(this.icon);
            this.change(eg.SoundMgr.Instance.soundStatus);
            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        };
        SoundIcon.prototype.onClick = function (evt) {
            eg.SoundMgr.Instance.soundStatus = eg.SoundMgr.Instance.soundStatus == eg.SoundMgr.PLAY ? eg.SoundMgr.CLOSE : eg.SoundMgr.PLAY;
            this.change(eg.SoundMgr.Instance.soundStatus);
        };
        SoundIcon.prototype.change = function (status) {
            if (status == eg.SoundMgr.PLAY) {
                this.icon.texture = RES.getRes(this._playResName);
                // egret.Tween.get(this.icon,{loop:true}).to({rotation:360},800);
                egret.Tween.get(this.icon, { loop: true }).to({ rotation: 360 }, 2000);
            }
            else {
                this.icon.texture = RES.getRes(this._pauseResName);
                egret.Tween.removeTweens(this.icon);
                this.icon.rotation = 0;
                // this.icon.rotation
            }
        };
        SoundIcon.prototype.dispose = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            egret.Tween.removeTweens(this.icon);
        };
        return SoundIcon;
    }(egret.DisplayObjectContainer));
    eg.SoundIcon = SoundIcon;
    __reflect(SoundIcon.prototype, "eg.SoundIcon", ["eg.IDispose"]);
})(eg || (eg = {}));
var eg;
(function (eg) {
    var SoundMgr = (function () {
        function SoundMgr() {
            this.status = SoundMgr.PLAY;
            this.isPause = false;
        }
        Object.defineProperty(SoundMgr, "Instance", {
            get: function () {
                if (SoundMgr._instance == null) {
                    SoundMgr._instance = new SoundMgr();
                }
                return SoundMgr._instance;
            },
            enumerable: true,
            configurable: true
        });
        SoundMgr.prototype.play = function (url, type) {
            if (type === void 0) { type = egret.Sound.EFFECT; }
            if (this.status == SoundMgr.CLOSE) {
                egret.log("声音关闭状态");
                return;
            }
            var sound = new egret.Sound();
            sound.type = type;
            if (type == egret.Sound.MUSIC) {
                this.stopBackgroundSound();
                if (this.backgroundSoundURL != url) {
                    this.backgroundSoundURL = url;
                    //切换新的背景声音
                    this.bgSound = sound;
                }
                else {
                    var position = 0;
                    if (this.bgSoundChannel) {
                        position = this.bgSoundChannel.position;
                    }
                    this.bgSoundChannel = this.bgSound.play(position);
                    return;
                }
            }
            sound.load(url);
            sound.addEventListener(egret.Event.COMPLETE, onComplete, this);
            sound.addEventListener(egret.IOErrorEvent.IO_ERROR, onIoError, this);
            var self = this;
            function onComplete(evt) {
                remove();
                if (type == egret.Sound.MUSIC) {
                    if (self.status == SoundMgr.PLAY && !self.isPause) {
                        self.bgSoundChannel = sound.play(0);
                    }
                }
                else {
                    egret.log("播放2");
                    sound.play(0, 1);
                }
            }
            function onIoError(evt) {
                remove();
            }
            function remove() {
                sound.removeEventListener(egret.Event.COMPLETE, onComplete, self);
                sound.removeEventListener(egret.IOErrorEvent.IO_ERROR, onIoError, self);
            }
        };
        SoundMgr.prototype.stopBackgroundSound = function () {
            if (this.bgSoundChannel) {
                this.bgSoundChannel.stop();
            }
        };
        Object.defineProperty(SoundMgr.prototype, "soundStatus", {
            get: function () {
                return this.status;
            },
            set: function (value) {
                this.status = value;
                if (this.status == SoundMgr.CLOSE) {
                    this.stopBackgroundSound();
                }
                else {
                    this.play(this.backgroundSoundURL, egret.Sound.MUSIC);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SoundMgr.prototype, "pause", {
            get: function () {
                return this.isPause;
            },
            set: function (value) {
                this.isPause = value;
            },
            enumerable: true,
            configurable: true
        });
        SoundMgr.PLAY = "play";
        SoundMgr.CLOSE = "close";
        return SoundMgr;
    }());
    eg.SoundMgr = SoundMgr;
    __reflect(SoundMgr.prototype, "eg.SoundMgr");
})(eg || (eg = {}));
var eg;
(function (eg) {
    function stringToArray(value) {
    }
    eg.stringToArray = stringToArray;
    /**
     * htmlText 转换成 字符数组
     * (实现不同文本大小，颜色 打字机效果)
     */
    function htmlStringToArray(htmlText) {
        var elements = new egret.HtmlTextParser().parse(htmlText);
        var len = elements.length;
        var list = [];
        for (var i = 0; i < len; i++) {
            var element = elements[i];
            var text = element.text;
            var textLen = text.length;
            var newObj = void 0;
            for (var j = 0; j < textLen; j++) {
                newObj = { text: text.charAt(j), style: element.style };
                list.push(newObj);
            }
        }
        return list;
    }
    eg.htmlStringToArray = htmlStringToArray;
})(eg || (eg = {}));
var eg;
(function (eg) {
    var Tips = (function (_super) {
        __extends(Tips, _super);
        function Tips() {
            var _this = _super.call(this) || this;
            _this.list = new Array();
            _this.timer = new egret.Timer(100);
            _this.timer.addEventListener(egret.TimerEvent.TIMER, _this.onTimer, _this);
            _this.timer.start();
            return _this;
        }
        Object.defineProperty(Tips, "Instance", {
            get: function () {
                if (Tips.instance == null) {
                    Tips.instance = new Tips();
                }
                return Tips.instance;
            },
            enumerable: true,
            configurable: true
        });
        Tips.prototype.init = function (stage) {
            // this._stage = stage;
        };
        Tips.prototype.addMsg = function (msg) {
            this.list.push(msg);
        };
        Tips.prototype.onTimer = function (evt) {
            var msg = this.list.shift();
            if (msg) {
                msg.y = eg.Config.STAGE_H / 2;
                msg.x = (eg.Config.STAGE_W - msg.width) / 2;
                egret.Tween.get(msg).wait(700).to({ y: msg.y - 200, alpha: 1 }, 900).wait(0).call(this.onComplete, this, [msg]);
                // this._stage.addChild(msg);
                eg.UILayer.Instance.effect.addChild(msg);
            }
        };
        Tips.prototype.onComplete = function (msg) {
            // this._stage.removeChild(msg);
            msg.parent.removeChild(msg);
        };
        Tips.showMsg = function (msg) {
            var m = new Msg(msg);
            Tips.Instance.addMsg(m);
        };
        return Tips;
    }(egret.Sprite));
    eg.Tips = Tips;
    __reflect(Tips.prototype, "eg.Tips");
    var Msg = (function (_super) {
        __extends(Msg, _super);
        function Msg(msg) {
            var _this = _super.call(this) || this;
            // this.txt = eg.createTxt("",0,0,Config.STAGE_W,35,30,0x000000,egret.HorizontalAlign.CENTER,false);
            _this.txt = new egret.TextField();
            // this.txt.width = Config.STAGE_W;
            _this.txt.size = 36; //30
            _this.txt.textColor = 0xffffff;
            _this.txt.fontFamily = "Microsoft YaHei,Arial";
            // this.txt.textAlign = egret.HorizontalAlign.CENTER;
            // this.txt.verticalAlign = egret.VerticalAlign.MIDDLE;
            _this.txt.textFlow = msg;
            // this.txt.border = true;
            // this.txt.borderColor = 0xff0000;
            _this.txt.x = 5;
            _this.txt.y = 5;
            //egret.log(this.txt.textWidth + "|" + this.txt.height);
            //提示底
            _this.shape = eg.createRoundRect(_this.txt.textWidth + 10, _this.txt.height + 10, 0x0, 1);
            _this.addChild(_this.shape);
            _this.addChild(_this.txt);
            _this.cacheAsBitmap = true;
            return _this;
        }
        return Msg;
    }(egret.Sprite));
    eg.Msg = Msg;
    __reflect(Msg.prototype, "eg.Msg");
})(eg || (eg = {}));
/***
 *
 *
 * 工具函数集合
 *
 *
 */
var eg;
(function (eg) {
    var $logId = 0;
    function log(value) {
        // if(eg.GameData.Instance.isDebug){				
        if (isDebug()) {
            egret.log("[LOG]" + ($logId++) + " >>> " + value);
        }
    }
    eg.log = log;
    function warn(value) {
        // if(eg.GameData.Instance.isDebug){				
        if (isDebug()) {
            egret.log("[WARN]" + ($logId++) + " >>> " + value);
        }
    }
    eg.warn = warn;
    /**
     * 是否是debug模式
     *
     */
    function isDebug() {
        return true || eg.Config.showLog || parseInt(egret.getOption("debug")) == 1;
    }
    eg.isDebug = isDebug;
    /**
     * get 请求
     */
    function get(url, responseType) {
        if (responseType === void 0) { responseType = egret.HttpResponseType.TEXT; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request(url, egret.HttpMethod.GET, responseType)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    }
    eg.get = get;
    /***
     * post 请求
     *
     */
    function post(url, params, responseType, requestHeaders) {
        if (responseType === void 0) { responseType = egret.HttpResponseType.TEXT; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requestHeaders = requestHeaders || { "Content-Type": "application/x-www-form-urlencoded" };
                        return [4 /*yield*/, request(url, egret.HttpMethod.POST, responseType, params, requestHeaders)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    }
    eg.post = post;
    function request(url, method, responseType, params, requestHeaders) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                eg.log("req >>> " + url);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        if (method == egret.HttpMethod.GET && params != null) {
                            url += "?" + params;
                        }
                        var request = new egret.HttpRequest();
                        request.withCredentials = false;
                        // request.responseType = egret.HttpResponseType.ARRAY_BUFFER;
                        request.responseType = responseType;
                        request.addEventListener(egret.Event.COMPLETE, onGetComplete, _this);
                        request.addEventListener(egret.ProgressEvent.PROGRESS, onGetProgress, _this);
                        request.addEventListener(egret.IOErrorEvent.IO_ERROR, onGetIOError, _this);
                        var timeoutId;
                        function onGetComplete(evt) {
                            clearTimeout(timeoutId);
                            if (evt == null) {
                                eg.log("onGetProgress->onGetComplete");
                            }
                            else {
                                eg.log("onGetComplete");
                            }
                            remove();
                            // resolve(request.response);
                            if (responseType == egret.HttpResponseType.TEXT) {
                                try {
                                    eg.log('http数据:' + request.response);
                                    // eg.log('JSON:' + JSON);			
                                    var result = void 0;
                                    if (request.response != "" && request.response != null) {
                                        result = JSON.parse(request.response);
                                    }
                                    resolve(result);
                                }
                                catch (error) {
                                    eg.log("res <<< 接口数据json解析错误:" + error.toString() + " >>> url:" + url);
                                    reject(error);
                                }
                            }
                            else {
                                resolve(request.response);
                            }
                        }
                        function onGetProgress(evt) {
                            // console.log(evt.bytesLoaded + "/" + evt.bytesTotal);
                            eg.log("progress:" + evt.bytesLoaded + "/" + evt.bytesTotal);
                            if (evt.bytesLoaded == evt.bytesTotal) {
                                if (request.response == undefined || request.response == "") {
                                    eg.log('启动延时执行onGetComplete(null)');
                                    timeoutId = setTimeout(function () {
                                        onGetComplete(null);
                                    }, 0);
                                }
                                else {
                                    onGetComplete(null);
                                }
                            }
                        }
                        function onGetIOError(evt) {
                            eg.log("res <<< 接口网络错误 req url:" + url);
                            remove();
                            reject(evt);
                            eg.EventDispatcher.Instance.dispatchEventWith(egret.IOErrorEvent.IO_ERROR);
                        }
                        function remove() {
                            request.removeEventListener(egret.Event.COMPLETE, onGetComplete, this);
                            request.removeEventListener(egret.ProgressEvent.PROGRESS, onGetProgress, this);
                            request.removeEventListener(egret.IOErrorEvent.IO_ERROR, onGetIOError, this);
                        }
                        request.open(url, method);
                        //添加头信息
                        for (var header in requestHeaders) {
                            request.setRequestHeader(header, requestHeaders[header]);
                        }
                        if (method == egret.HttpMethod.POST && params != null) {
                            request.send(formatReqParams(params, requestHeaders["Content-Type"]));
                            // request.send(JSON.stringify(params));				
                        }
                        else {
                            request.send();
                        }
                    })];
            });
        });
    }
    eg.request = request;
    function formatReqParams(params, contentType) {
        var value;
        if (contentType == "text/json") {
            value = JSON.stringify(params);
        }
        else if (contentType == "application/octet-stream") {
            value = params;
        }
        else if (contentType == "application/json") {
            value = JSON.stringify(params);
        }
        else {
            value = "";
            for (var key in params) {
                if (value != "") {
                    value += "&";
                }
                value += encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
            }
        }
        // eg.log("post参数:" + value);
        return value;
    }
    eg.formatReqParams = formatReqParams;
    /**
     * 创建一个显示对象
     *
     */
    function createBitmap(resName, x, y, touchEnabled, isAnchorCenter) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (touchEnabled === void 0) { touchEnabled = false; }
        if (isAnchorCenter === void 0) { isAnchorCenter = false; }
        var bmp;
        if (RES.hasRes(resName)) {
            bmp = new egret.Bitmap(RES.getRes(resName));
            if (isAnchorCenter) {
                bmp.anchorOffsetX = bmp.width / 2;
                bmp.anchorOffsetY = bmp.height / 2;
            }
            bmp.x = x;
            bmp.y = y;
            bmp.touchEnabled = touchEnabled;
        }
        else {
            eg.log("资源不存在:" + resName);
        }
        return bmp;
    }
    eg.createBitmap = createBitmap;
    /**
     * 一次添加多个显示对象
     */
    function addChild(parent, list) {
        var len = list.length;
        for (var i = 0; i < len; i++) {
            parent.addChild(list[i]);
        }
    }
    eg.addChild = addChild;
    function createRect(w, h, color, alpha, touchEnabled) {
        if (alpha === void 0) { alpha = 1; }
        if (touchEnabled === void 0) { touchEnabled = false; }
        var shape = new egret.Shape();
        shape.graphics.beginFill(color, alpha);
        shape.graphics.drawRect(0, 0, w, h);
        shape.graphics.endFill();
        shape.touchEnabled = touchEnabled;
        return shape;
    }
    eg.createRect = createRect;
    function createTxt(label, x, y, w, h, size, textColor, textAlign, bold, verticalAlign, fontFamily) {
        if (size === void 0) { size = 30; }
        if (textColor === void 0) { textColor = 0x000000; }
        if (textAlign === void 0) { textAlign = egret.HorizontalAlign.LEFT; }
        if (bold === void 0) { bold = false; }
        if (verticalAlign === void 0) { verticalAlign = egret.VerticalAlign.MIDDLE; }
        if (fontFamily === void 0) { fontFamily = "Microsoft YaHei,Arial"; }
        var txt = new egret.TextField();
        txt.width = w;
        txt.height = h;
        txt.textAlign = textAlign;
        txt.verticalAlign = verticalAlign;
        txt.size = size;
        txt.bold = bold;
        // txt.border = true;
        txt.textColor = textColor;
        txt.text = label;
        // txt.fontFamily = "Microsoft YaHei,Arial";
        if (fontFamily != "") {
            // txt.fontFamily = fontFamily;
        }
        txt.x = x;
        txt.y = y;
        return txt;
    }
    eg.createTxt = createTxt;
    function createTxt2(label, x, y, size, textColor, textAlign, bold, verticalAlign, fontFamily) {
        if (textAlign === void 0) { textAlign = egret.HorizontalAlign.LEFT; }
        if (bold === void 0) { bold = false; }
        if (verticalAlign === void 0) { verticalAlign = egret.VerticalAlign.MIDDLE; }
        if (fontFamily === void 0) { fontFamily = "Microsoft YaHei,Arial"; }
        var txt = new egret.TextField();
        txt.textAlign = textAlign;
        txt.verticalAlign = verticalAlign;
        txt.size = size;
        txt.bold = bold;
        // txt.border = true;
        txt.textColor = textColor;
        txt.text = label;
        // txt.fontFamily = "Microsoft YaHei,Arial";
        if (fontFamily != "") {
            // txt.fontFamily = fontFamily;
        }
        txt.x = x;
        txt.y = y;
        return txt;
    }
    eg.createTxt2 = createTxt2;
    function createCircle(radius, color, alpha) {
        if (alpha === void 0) { alpha = 1; }
        var shape = new egret.Shape();
        shape.graphics.beginFill(color, alpha);
        shape.graphics.drawCircle(0, 0, radius);
        shape.graphics.endFill();
        return shape;
    }
    eg.createCircle = createCircle;
    function createRoundRect(w, h, color, alpha, ellipseWidth, ellipseHeight, x, y) {
        if (alpha === void 0) { alpha = 1; }
        if (ellipseWidth === void 0) { ellipseWidth = 15; }
        if (ellipseHeight === void 0) { ellipseHeight = 15; }
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        var shape = new egret.Shape();
        shape.graphics.beginFill(color, alpha);
        //shape.graphics.drawRect(0,0,w,h);
        shape.graphics.drawRoundRect(0, 0, w, h, ellipseWidth, ellipseHeight);
        shape.graphics.endFill();
        shape.x = x;
        shape.y = y;
        return shape;
    }
    eg.createRoundRect = createRoundRect;
    /*
    export async function loadResGroup(name:string){
        return await RES.loadGroup(name);
    }
    */
    /**
     * 根据base64图片数据创建一个Bitmap
     */
    function createBitmapByBase64Image(base64) {
        if (!/^data:image/.test(base64)) {
            base64 = 'data:image/jpeg;base64,' + base64;
        }
        // "data:image/jpeg;base64,"
        return new Promise(function (resolve, reject) {
            eg.log("createBitmapByBase64Image:" + base64.length);
            var img = new Image();
            img.src = base64;
            // img.crossOrigin = '*';
            img.onload = function () {
                eg.log("img.onload");
                var bpd = new egret.BitmapData(img);
                var texture = new egret.Texture();
                texture.bitmapData = bpd;
                var bmp = new egret.Bitmap(texture);
                resolve(bmp);
            };
            img.onerror = function (err) {
                eg.log("err:" + err.toString());
            };
        });
    }
    eg.createBitmapByBase64Image = createBitmapByBase64Image;
    function utf2buffer(utfstr) {
        // var buf = new ArrayBuffer(utfstr.length * 2);
        var bufView = new Uint8Array(utfstr.length);
        for (var i = 0, strlen = utfstr.length; i < strlen; i++) {
            bufView[i] = utfstr.charCodeAt(i);
        }
        return bufView;
    }
    eg.utf2buffer = utf2buffer;
})(eg || (eg = {}));
var eg;
(function (eg) {
    /**
     * 虚拟摇杆
     */
    var VirtualJoystick = (function (_super) {
        __extends(VirtualJoystick, _super);
        function VirtualJoystick() {
            var _this = _super.call(this) || this;
            _this.initUI();
            return _this;
        }
        VirtualJoystick.prototype.initUI = function () {
            this._bg = new VirtualBg();
            this._block = new MoveBlock();
            this.addChild(this._bg);
            this.addChild(this._block);
            this._block.touchEnabled = true;
            this._block.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBegin, this);
            this.$tempPos1 = new egret.Point();
            this.$tempPos2 = new egret.Point();
        };
        VirtualJoystick.prototype.onBegin = function (evt) {
            this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMove, this);
            this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onEnd, this);
            this.dispatchEventWith('v_start');
        };
        VirtualJoystick.prototype.onMove = function (evt) {
            eg.log(evt.stageX + '|' + evt.stageY);
            this.$tempPos1.setTo(this.x, this.y);
            this.$tempPos2.setTo(evt.stageX, evt.stageY);
            var dist = egret.Point.distance(this.$tempPos1, this.$tempPos2);
            var angle = Math.atan2(evt.stageY - this.y, evt.stageX - this.x);
            //手指距离在圆环范围内
            var r = 100 - 30;
            if (dist <= r) {
                this._block.x = evt.stageX - this.x;
                this._block.y = evt.stageY - this.y;
                //手指距离在圆环范围外
            }
            else {
                this._block.x = Math.cos(angle) * r;
                this._block.y = Math.sin(angle) * r;
            }
            this.dispatchEventWith('v_move', false, angle);
        };
        VirtualJoystick.prototype.onEnd = function (evt) {
            this._block.x = 0;
            this._block.y = 0;
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMove, this);
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onEnd, this);
            this.dispatchEventWith('v_over');
        };
        return VirtualJoystick;
    }(egret.Sprite));
    eg.VirtualJoystick = VirtualJoystick;
    __reflect(VirtualJoystick.prototype, "eg.VirtualJoystick");
    var VirtualBg = (function (_super) {
        __extends(VirtualBg, _super);
        function VirtualBg() {
            var _this = _super.call(this) || this;
            _this.initUI();
            return _this;
        }
        VirtualBg.prototype.initUI = function () {
            this.graphics.lineStyle(1, 0x0BF709);
            this.graphics.drawCircle(0, 0, 100);
            this.graphics.endFill();
        };
        return VirtualBg;
    }(egret.Sprite));
    __reflect(VirtualBg.prototype, "VirtualBg");
    var MoveBlock = (function (_super) {
        __extends(MoveBlock, _super);
        function MoveBlock() {
            var _this = _super.call(this) || this;
            _this.initUI();
            return _this;
        }
        MoveBlock.prototype.initUI = function () {
            this.graphics.beginFill(0x0940F9);
            this.graphics.drawCircle(0, 0, 30);
            this.graphics.endFill();
        };
        return MoveBlock;
    }(egret.Sprite));
    __reflect(MoveBlock.prototype, "MoveBlock");
})(eg || (eg = {}));
var eg;
(function (eg) {
    var WXUtil = (function () {
        function WXUtil() {
        }
        Object.defineProperty(WXUtil, "Instance", {
            get: function () {
                if (WXUtil._instance == null) {
                    WXUtil._instance = new WXUtil();
                }
                return WXUtil._instance;
            },
            enumerable: true,
            configurable: true
        });
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
        WXUtil.prototype.config = function (obj, callback, thisObj) {
            wx.config(obj);
            wx.ready(function () {
                wx.hideOptionMenu();
                wx.showMenuItems({
                    menuList: [
                        'menuItem:share:appMessage',
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
            wx.error(function () {
                egret.log("config error");
            });
        };
        WXUtil.prototype.share = function (targetType, params, callback, thisObj) {
            var fun;
            switch (targetType) {
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
            params.trigger = function (res) {
                callback('trigger', res);
            };
            params.success = function (res) {
                callback('success', res);
            };
            params.cancel = function (res) {
                callback('cancel', res);
            };
            params.fail = function (res) {
                callback('fail', res);
            };
            fun(params);
        };
        /**分享到朋友圈 */
        WXUtil.SHARE_TIMELINE = "onMenuShareTimeline";
        /**分享给朋友 */
        WXUtil.SHARE_APPMESSAGE = "onMenuShareAppMessage";
        /**分享到QQ */
        WXUtil.SHARE_QQ = "onMenuShareQQ";
        /**分享到微博 */
        WXUtil.SHARE_WEIBO = "onMenuShareWeibo";
        return WXUtil;
    }());
    eg.WXUtil = WXUtil;
    __reflect(WXUtil.prototype, "eg.WXUtil");
})(eg || (eg = {}));
var eg;
(function (eg) {
    var LinkedList = (function () {
        function LinkedList() {
            this._length = 0;
        }
        LinkedList.prototype.append = function (element) {
            var node = new Node(element);
            if (this._head == null) {
                this._head = node;
            }
            else {
                var current = this._head;
                while (current.next) {
                    current = current.next;
                }
                current.next = node;
            }
            this._length++;
        };
        LinkedList.prototype.removeAt = function (position) {
            //检查越界
            if (position > -1 && position < this._length) {
                var current = this._head;
                var pre = void 0;
                var index = 0;
                if (position == 0) {
                    this._head = current.next;
                }
                else {
                    while (index++ < position) {
                        pre = current;
                        current = current.next;
                    }
                    pre.next = current.next;
                }
                this._length--;
                return current.element;
            }
            return null;
        };
        Object.defineProperty(LinkedList.prototype, "length", {
            get: function () {
                return this._length;
            },
            enumerable: true,
            configurable: true
        });
        return LinkedList;
    }());
    eg.LinkedList = LinkedList;
    __reflect(LinkedList.prototype, "eg.LinkedList");
    var Node = (function () {
        function Node(element) {
        }
        Object.defineProperty(Node.prototype, "element", {
            get: function () {
                return this._element;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Node.prototype, "next", {
            get: function () {
                return this._next;
            },
            set: function (node) {
                this._next = node;
            },
            enumerable: true,
            configurable: true
        });
        return Node;
    }());
    __reflect(Node.prototype, "Node");
})(eg || (eg = {}));
var eg;
(function (eg) {
    /**
     * 队列
     * 先进先出
     */
    var Queue = (function () {
        function Queue() {
            this._items = [];
        }
        /**
         * 入队
         */
        Queue.prototype.enqueue = function (element) {
            this._items.push(element);
        };
        /**
         * 出队
         */
        Queue.prototype.dequeue = function () {
            return this._items.shift();
        };
        Queue.prototype.isEmpty = function () {
            return this.size() == 0;
        };
        /**
         * 第一个元素
         */
        Queue.prototype.front = function () {
            return this._items[0];
        };
        Queue.prototype.size = function () {
            return this._items.length;
        };
        Queue.prototype.toString = function () {
            return this._items.toString();
        };
        return Queue;
    }());
    eg.Queue = Queue;
    __reflect(Queue.prototype, "eg.Queue");
})(eg || (eg = {}));
var eg;
(function (eg) {
    /***
     * 栈
     * 后进先出原则
     */
    var Stack = (function () {
        function Stack() {
            this._items = [];
        }
        /**
         * 入栈
         */
        Stack.prototype.push = function (element) {
            this._items.push(element);
        };
        /**
         *出栈
         */
        Stack.prototype.pop = function () {
            return this._items.pop();
        };
        /**
         * 返回栈顶元素，不改变栈
         */
        Stack.prototype.peek = function () {
            return this._items[this.size() - 1];
        };
        /**
         * 栈的大小
         */
        Stack.prototype.size = function () {
            return this._items.length;
        };
        Stack.prototype.toString = function () {
            return this._items.toString();
        };
        return Stack;
    }());
    eg.Stack = Stack;
    __reflect(Stack.prototype, "eg.Stack");
})(eg || (eg = {}));
