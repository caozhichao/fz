window.skins={};
                function __extends(d, b) {
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
                        function __() {
                            this.constructor = d;
                        }
                    __.prototype = b.prototype;
                    d.prototype = new __();
                };
                window.generateEUI = {};
                generateEUI.paths = {};
                generateEUI.styles = undefined;
                generateEUI.skins = {"eui.Button":"resource/eui_skins/ButtonSkin.exml","eui.CheckBox":"resource/eui_skins/CheckBoxSkin.exml","eui.HScrollBar":"resource/eui_skins/HScrollBarSkin.exml","eui.HSlider":"resource/eui_skins/HSliderSkin.exml","eui.Panel":"resource/eui_skins/PanelSkin.exml","eui.TextInput":"resource/eui_skins/TextInputSkin.exml","eui.ProgressBar":"resource/eui_skins/ProgressBarSkin.exml","eui.RadioButton":"resource/eui_skins/RadioButtonSkin.exml","eui.Scroller":"resource/eui_skins/ScrollerSkin.exml","eui.ToggleSwitch":"resource/eui_skins/ToggleSwitchSkin.exml","eui.VScrollBar":"resource/eui_skins/VScrollBarSkin.exml","eui.VSlider":"resource/eui_skins/VSliderSkin.exml","eui.ItemRenderer":"resource/eui_skins/ItemRendererSkin.exml"};generateEUI.paths['resource/assets/game/skins/BezierViewSkin.exml'] = window.skins.BezierViewSkin = (function (_super) {
	__extends(BezierViewSkin, _super);
	function BezierViewSkin() {
		_super.call(this);
		this.skinParts = ["p0","p2","p1","_btn_test","_tf_speed","pMove2","_btn_speed","_tf_time","pMove","_emit"];
		
		this.height = 720;
		this.width = 1280;
		this.elementsContent = [this.p0_i(),this.p2_i(),this.p1_i(),this._Rect1_i(),this._btn_test_i(),this._Label1_i(),this._tf_speed_i(),this.pMove2_i(),this._btn_speed_i(),this._tf_time_i(),this.pMove_i(),this._emit_i()];
	}
	var _proto = BezierViewSkin.prototype;

	_proto.p0_i = function () {
		var t = new eui.Rect();
		this.p0 = t;
		t.anchorOffsetX = 32;
		t.anchorOffsetY = 32;
		t.ellipseHeight = 64;
		t.ellipseWidth = 64;
		t.fillColor = 0xf40707;
		t.height = 64;
		t.width = 64;
		t.x = 50;
		t.y = 437;
		return t;
	};
	_proto.p2_i = function () {
		var t = new eui.Rect();
		this.p2 = t;
		t.anchorOffsetX = 32;
		t.anchorOffsetY = 32;
		t.ellipseHeight = 64;
		t.ellipseWidth = 64;
		t.fillColor = 0x0728f2;
		t.height = 64;
		t.width = 64;
		t.x = 1213.7;
		t.y = 183.97;
		return t;
	};
	_proto.p1_i = function () {
		var t = new eui.Rect();
		this.p1 = t;
		t.anchorOffsetX = 25;
		t.anchorOffsetY = 25;
		t.ellipseHeight = 50;
		t.ellipseWidth = 50;
		t.fillColor = 0x8ee810;
		t.height = 50;
		t.width = 50;
		t.x = 528.52;
		t.y = 22.51;
		return t;
	};
	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.anchorOffsetX = 25;
		t.anchorOffsetY = 25;
		t.ellipseHeight = 50;
		t.ellipseWidth = 50;
		t.fillColor = 0xd3bcbc;
		t.height = 50;
		t.width = 50;
		t.x = 516.4;
		t.y = 441.06;
		return t;
	};
	_proto._btn_test_i = function () {
		var t = new eui.Button();
		this._btn_test = t;
		t.label = "测试";
		t.x = 974;
		t.y = 523;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.text = "速度";
		t.x = 1077.2;
		t.y = 279;
		return t;
	};
	_proto._tf_speed_i = function () {
		var t = new eui.EditableText();
		this._tf_speed = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 57.58;
		t.text = "5";
		t.width = 169.7;
		t.x = 1076;
		t.y = 330;
		return t;
	};
	_proto.pMove2_i = function () {
		var t = new eui.Rect();
		this.pMove2 = t;
		t.anchorOffsetX = 100;
		t.anchorOffsetY = 1;
		t.fillColor = 0xf4d913;
		t.height = 2;
		t.width = 200;
		t.x = 315;
		t.y = 580;
		return t;
	};
	_proto._btn_speed_i = function () {
		var t = new eui.Button();
		this._btn_speed = t;
		t.label = "变速";
		t.x = 1107.2;
		t.y = 523;
		return t;
	};
	_proto._tf_time_i = function () {
		var t = new eui.EditableText();
		this._tf_time = t;
		t.height = 100;
		t.text = "50";
		t.width = 100;
		t.x = 1101;
		t.y = 420;
		return t;
	};
	_proto.pMove_i = function () {
		var t = new eui.Image();
		this.pMove = t;
		t.anchorOffsetX = 40.5;
		t.anchorOffsetY = 40.5;
		t.source = "hongqiu_png";
		t.x = 642;
		t.y = 565;
		return t;
	};
	_proto._emit_i = function () {
		var t = new eui.Button();
		this._emit = t;
		t.label = "暂停";
		t.x = 974;
		t.y = 596;
		return t;
	};
	return BezierViewSkin;
})(eui.Skin);generateEUI.paths['resource/assets/game/skins/DropBallTestSkin.exml'] = window.skins.DropBallTestSkin = (function (_super) {
	__extends(DropBallTestSkin, _super);
	function DropBallTestSkin() {
		_super.call(this);
		this.skinParts = ["c1","c3","c2","_btn"];
		
		this.height = 720;
		this.width = 1280;
		this.elementsContent = [this.c1_i(),this.c3_i(),this.c2_i(),this._btn_i()];
	}
	var _proto = DropBallTestSkin.prototype;

	_proto.c1_i = function () {
		var t = new eui.Rect();
		this.c1 = t;
		t.anchorOffsetX = 32;
		t.anchorOffsetY = 32;
		t.ellipseHeight = 64;
		t.ellipseWidth = 64;
		t.fillColor = 0xf70202;
		t.height = 64;
		t.width = 64;
		t.x = 530;
		t.y = 294;
		return t;
	};
	_proto.c3_i = function () {
		var t = new eui.Rect();
		this.c3 = t;
		t.anchorOffsetX = 32;
		t.anchorOffsetY = 32;
		t.ellipseHeight = 64;
		t.ellipseWidth = 64;
		t.fillColor = 0xf49902;
		t.height = 64;
		t.width = 64;
		t.x = 466;
		t.y = 294;
		return t;
	};
	_proto.c2_i = function () {
		var t = new eui.Rect();
		this.c2 = t;
		t.anchorOffsetX = 32;
		t.anchorOffsetY = 32;
		t.ellipseHeight = 64;
		t.ellipseWidth = 64;
		t.fillColor = 0x071af7;
		t.height = 64;
		t.width = 64;
		t.x = 482;
		t.y = 480.18;
		return t;
	};
	_proto._btn_i = function () {
		var t = new eui.Button();
		this._btn = t;
		t.label = "测试";
		t.x = 839.33;
		t.y = 609.06;
		return t;
	};
	return DropBallTestSkin;
})(eui.Skin);generateEUI.paths['resource/assets/game/skins/FishViewSkin.exml'] = window.skins.FishViewSkin = (function (_super) {
	__extends(FishViewSkin, _super);
	function FishViewSkin() {
		_super.call(this);
		this.skinParts = ["_container"];
		
		this.height = 720;
		this.width = 1280;
		this.elementsContent = [this._container_i()];
	}
	var _proto = FishViewSkin.prototype;

	_proto._container_i = function () {
		var t = new eui.Group();
		this._container = t;
		t.height = 720;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 1280;
		t.elementsContent = [this._Image1_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 720;
		t.left = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "bg3_png";
		t.top = 0;
		t.width = 1280;
		return t;
	};
	return FishViewSkin;
})(eui.Skin);generateEUI.paths['resource/assets/game/skins/landscape_test.exml'] = window.skins.landscape_test = (function (_super) {
	__extends(landscape_test, _super);
	function landscape_test() {
		_super.call(this);
		this.skinParts = [];
		
		this.height = 720;
		this.width = 1280;
		this.elementsContent = [this._Image1_i()];
	}
	var _proto = landscape_test.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 360;
		t.anchorOffsetY = 640;
		t.left = 0;
		t.rotation = 90;
		t.source = "img_main_a0_jpg";
		t.top = 0;
		return t;
	};
	return landscape_test;
})(eui.Skin);generateEUI.paths['resource/assets/game/skins/LoadingUISkin.exml'] = window.skins.LoadingUISkin = (function (_super) {
	__extends(LoadingUISkin, _super);
	function LoadingUISkin() {
		_super.call(this);
		this.skinParts = ["_progress","_progressMask"];
		
		this.height = 1206;
		this.width = 750;
		this.elementsContent = [this._Rect1_i(),this._Group1_i()];
	}
	var _proto = LoadingUISkin.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillAlpha = 0.7;
		t.height = 1206;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 750;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 1206;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 750;
		t.elementsContent = [this._Image1_i(),this._progress_i(),this._progressMask_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "kbg2_png";
		t.y = 583;
		return t;
	};
	_proto._progress_i = function () {
		var t = new eui.Image();
		this._progress = t;
		t.source = "kbg1_png";
		t.width = 566;
		t.x = 92;
		t.y = 583;
		return t;
	};
	_proto._progressMask_i = function () {
		var t = new eui.Image();
		this._progressMask = t;
		t.source = "kbg1_png";
		t.width = 566;
		t.x = 92;
		t.y = 583;
		return t;
	};
	return LoadingUISkin;
})(eui.Skin);generateEUI.paths['resource/assets/game/skins/Map2dSkin.exml'] = window.skins.Map2dSkin = (function (_super) {
	__extends(Map2dSkin, _super);
	function Map2dSkin() {
		_super.call(this);
		this.skinParts = ["_mapImg","_container","_sl","_btn"];
		
		this.height = 720;
		this.width = 1280;
		this.elementsContent = [this._sl_i(),this._btn_i()];
	}
	var _proto = Map2dSkin.prototype;

	_proto._sl_i = function () {
		var t = new eui.Scroller();
		this._sl = t;
		t.bounces = false;
		t.height = 720;
		t.left = 0;
		t.top = 0;
		t.width = 1280;
		t.viewport = this._container_i();
		return t;
	};
	_proto._container_i = function () {
		var t = new eui.Group();
		this._container = t;
		t.elementsContent = [this._mapImg_i()];
		return t;
	};
	_proto._mapImg_i = function () {
		var t = new eui.Image();
		this._mapImg = t;
		t.source = "52b7cb7821232fca53000004_201809211329088743_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._btn_i = function () {
		var t = new eui.Button();
		this._btn = t;
		t.label = "生成数据";
		t.left = 1150;
		t.top = 36;
		return t;
	};
	return Map2dSkin;
})(eui.Skin);generateEUI.paths['resource/assets/game/skins/NumberSXSkin.exml'] = window.skins.NumberSXSkin = (function (_super) {
	__extends(NumberSXSkin, _super);
	function NumberSXSkin() {
		_super.call(this);
		this.skinParts = ["_btn_tips","_btn_reset"];
		
		this.height = 1206;
		this.width = 750;
		this.elementsContent = [this._btn_tips_i(),this._btn_reset_i()];
	}
	var _proto = NumberSXSkin.prototype;

	_proto._btn_tips_i = function () {
		var t = new eui.Button();
		this._btn_tips = t;
		t.label = "提示";
		t.x = 226;
		t.y = 882;
		return t;
	};
	_proto._btn_reset_i = function () {
		var t = new eui.Button();
		this._btn_reset = t;
		t.label = "重置";
		t.x = 430;
		t.y = 882;
		return t;
	};
	return NumberSXSkin;
})(eui.Skin);generateEUI.paths['resource/assets/game/skins/OrientationModeTestSkin.exml'] = window.skins.OrientationModeTestSkin = (function (_super) {
	__extends(OrientationModeTestSkin, _super);
	function OrientationModeTestSkin() {
		_super.call(this);
		this.skinParts = [];
		
		this.height = 750;
		this.width = 1206;
		this.elementsContent = [this._Image1_i(),this._Rect1_i(),this._Image2_i()];
	}
	var _proto = OrientationModeTestSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 375;
		t.anchorOffsetY = 603;
		t.height = 1206;
		t.rotation = 90;
		t.source = "map2_png";
		t.x = 603;
		t.y = 375;
		return t;
	};
	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 200;
		t.width = 200;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.right = 0;
		t.source = "p1_png";
		t.y = 583;
		return t;
	};
	return OrientationModeTestSkin;
})(eui.Skin);generateEUI.paths['resource/assets/game/skins/PageTipsSkin.exml'] = window.skins.PageTipsSkin = (function (_super) {
	__extends(PageTipsSkin, _super);
	function PageTipsSkin() {
		_super.call(this);
		this.skinParts = ["_container"];
		
		this.height = 1206;
		this.width = 750;
		this.elementsContent = [this._Rect1_i(),this._Rect2_i(),this._container_i()];
	}
	var _proto = PageTipsSkin.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillAlpha = 0.7;
		t.fillColor = 0x1b8789;
		t.height = 1206;
		t.left = 0;
		t.top = 0;
		t.width = 750;
		return t;
	};
	_proto._Rect2_i = function () {
		var t = new eui.Rect();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.ellipseHeight = 100;
		t.ellipseWidth = 100;
		t.fillColor = 0xffffff;
		t.height = 300;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 500;
		return t;
	};
	_proto._container_i = function () {
		var t = new eui.Group();
		this._container = t;
		t.height = 1206;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 750;
		t.elementsContent = [this._Image1_i(),this._GImageButton1_i(),this._GImageButton2_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "bg2_png";
		t.visible = false;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._GImageButton1_i = function () {
		var t = new eg.GImageButton();
		t.source = "aa_png";
		t.x = 228;
		t.y = 800;
		return t;
	};
	_proto._GImageButton2_i = function () {
		var t = new eg.GImageButton();
		t.source = "aa_png";
		t.x = 228;
		t.y = 909;
		return t;
	};
	return PageTipsSkin;
})(eui.Skin);generateEUI.paths['resource/assets/game/skins/ParabolaTestSkin.exml'] = window.skins.ParabolaTestSkin = (function (_super) {
	__extends(ParabolaTestSkin, _super);
	function ParabolaTestSkin() {
		_super.call(this);
		this.skinParts = ["p"];
		
		this.height = 1206;
		this.width = 750;
		this.elementsContent = [this.p_i()];
	}
	var _proto = ParabolaTestSkin.prototype;

	_proto.p_i = function () {
		var t = new eui.Rect();
		this.p = t;
		t.anchorOffsetX = 50;
		t.anchorOffsetY = 50;
		t.ellipseHeight = 100;
		t.ellipseWidth = 100;
		t.height = 100;
		t.width = 100;
		t.x = 118;
		t.y = 1138;
		return t;
	};
	return ParabolaTestSkin;
})(eui.Skin);generateEUI.paths['resource/assets/game/skins/PopupBaseUITestSkin.exml'] = window.skins.PopupBaseUITestSkin = (function (_super) {
	__extends(PopupBaseUITestSkin, _super);
	function PopupBaseUITestSkin() {
		_super.call(this);
		this.skinParts = ["_icon","_container"];
		
		this.height = 1206;
		this.width = 750;
		this.elementsContent = [this._container_i()];
	}
	var _proto = PopupBaseUITestSkin.prototype;

	_proto._container_i = function () {
		var t = new eui.Group();
		this._container = t;
		t.anchorOffsetX = 375;
		t.anchorOffsetY = 603;
		t.height = 1206;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 750;
		t.elementsContent = [this._icon_i()];
		return t;
	};
	_proto._icon_i = function () {
		var t = new eui.Image();
		this._icon = t;
		t.source = "p1_png";
		t.x = 320;
		t.y = 520;
		return t;
	};
	return PopupBaseUITestSkin;
})(eui.Skin);generateEUI.paths['resource/assets/game/skins/StageScaleModeTestSkin.exml'] = window.skins.StageScaleModeTestSkin = (function (_super) {
	__extends(StageScaleModeTestSkin, _super);
	function StageScaleModeTestSkin() {
		_super.call(this);
		this.skinParts = [];
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._Rect1_i(),this._Image1_i()];
	}
	var _proto = StageScaleModeTestSkin.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillColor = 0x0940f9;
		t.height = 300;
		t.width = 350;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "img_main_a0_jpg";
		t.width = 720;
		t.x = 0;
		t.y = 312;
		return t;
	};
	return StageScaleModeTestSkin;
})(eui.Skin);generateEUI.paths['resource/assets/game/skins/Test1Skin.exml'] = window.skins.Test1Skin = (function (_super) {
	__extends(Test1Skin, _super);
	function Test1Skin() {
		_super.call(this);
		this.skinParts = ["btn"];
		
		this.height = 1206;
		this.width = 750;
		this.elementsContent = [this.btn_i(),this._Group1_i(),this._GImageButton1_i()];
	}
	var _proto = Test1Skin.prototype;

	_proto.btn_i = function () {
		var t = new eui.Button();
		this.btn = t;
		t.horizontalCenter = 0;
		t.label = "打开界面2";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 50;
		t.width = 50;
		t.x = 204;
		t.y = 349;
		t.elementsContent = [this._Image1_i(),this._Image2_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "img_game_c9_png";
		t.x = -50;
		t.y = -181;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "img_game_d0_png";
		t.x = -56;
		t.y = -264;
		return t;
	};
	_proto._GImageButton1_i = function () {
		var t = new eg.GImageButton();
		t.pixelHitTest = true;
		t.source = "tap_rank_3_png";
		t.x = 293;
		t.y = 1031;
		return t;
	};
	return Test1Skin;
})(eui.Skin);generateEUI.paths['resource/assets/game/skins/Test2Skin.exml'] = window.skins.Test2Skin = (function (_super) {
	__extends(Test2Skin, _super);
	function Test2Skin() {
		_super.call(this);
		this.skinParts = ["btn"];
		
		this.height = 1206;
		this.width = 750;
		this.elementsContent = [this.btn_i()];
	}
	var _proto = Test2Skin.prototype;

	_proto.btn_i = function () {
		var t = new eui.Button();
		this.btn = t;
		t.horizontalCenter = 0;
		t.label = "打开界面1";
		t.verticalCenter = 0;
		return t;
	};
	return Test2Skin;
})(eui.Skin);generateEUI.paths['resource/assets/game/skins/TestSheetSkin.exml'] = window.skins.TestSheetSkin = (function (_super) {
	__extends(TestSheetSkin, _super);
	function TestSheetSkin() {
		_super.call(this);
		this.skinParts = [];
		
		this.height = 1206;
		this.width = 750;
		this.elementsContent = [this._Image1_i()];
	}
	var _proto = TestSheetSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "btn_code";
		t.x = 268;
		t.y = 259;
		return t;
	};
	return TestSheetSkin;
})(eui.Skin);generateEUI.paths['resource/assets/game/skins/ws_test.exml'] = window.ws_test = (function (_super) {
	__extends(ws_test, _super);
	function ws_test() {
		_super.call(this);
		this.skinParts = ["_btn_connect","_btn_send"];
		
		this.height = 720;
		this.width = 1280;
		this.elementsContent = [this._btn_connect_i(),this._Button1_i(),this._EditableText1_i(),this._Label1_i(),this._btn_send_i()];
	}
	var _proto = ws_test.prototype;

	_proto._btn_connect_i = function () {
		var t = new eui.Button();
		this._btn_connect = t;
		t.label = "连接ws";
		t.x = 740;
		t.y = 146;
		return t;
	};
	_proto._Button1_i = function () {
		var t = new eui.Button();
		t.label = "断开";
		t.x = 738;
		t.y = 252;
		return t;
	};
	_proto._EditableText1_i = function () {
		var t = new eui.EditableText();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 308;
		t.text = "输入框";
		t.width = 610;
		t.x = 32;
		t.y = 40;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 298;
		t.text = "显示";
		t.width = 1236;
		t.x = 26;
		t.y = 402;
		return t;
	};
	_proto._btn_send_i = function () {
		var t = new eui.Button();
		this._btn_send = t;
		t.label = "发送";
		t.x = 517;
		t.y = 137;
		return t;
	};
	return ws_test;
})(eui.Skin);generateEUI.paths['resource/assets/game/skins/ZMTestSkin.exml'] = window.skins.ZMTestSkin = (function (_super) {
	__extends(ZMTestSkin, _super);
	function ZMTestSkin() {
		_super.call(this);
		this.skinParts = ["p0","p1","p2","p3","p4","p5","p6","p7","p8","p9","p10","p11","p12","p13","p14","p15","p16","p17","pMove","_container","_btn_test"];
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._container_i(),this._btn_test_i()];
	}
	var _proto = ZMTestSkin.prototype;

	_proto._container_i = function () {
		var t = new eui.Group();
		this._container = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 1004;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 720;
		t.elementsContent = [this._Image1_i(),this.p0_i(),this.p1_i(),this.p2_i(),this.p3_i(),this.p4_i(),this.p5_i(),this.p6_i(),this.p7_i(),this.p8_i(),this.p9_i(),this.p10_i(),this.p11_i(),this.p12_i(),this.p13_i(),this.p14_i(),this.p15_i(),this.p16_i(),this.p17_i(),this.pMove_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "1_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.p0_i = function () {
		var t = new eui.Rect();
		this.p0 = t;
		t.anchorOffsetX = 25;
		t.anchorOffsetY = 25;
		t.ellipseHeight = 50;
		t.ellipseWidth = 50;
		t.fillColor = 0x072ef7;
		t.height = 50;
		t.width = 50;
		t.x = 692.66;
		t.y = 119.33;
		return t;
	};
	_proto.p1_i = function () {
		var t = new eui.Rect();
		this.p1 = t;
		t.anchorOffsetX = 25;
		t.anchorOffsetY = 25;
		t.ellipseHeight = 50;
		t.ellipseWidth = 50;
		t.fillColor = 0x072EF7;
		t.height = 50;
		t.width = 50;
		t.x = 633.66;
		t.y = 148.31;
		return t;
	};
	_proto.p2_i = function () {
		var t = new eui.Rect();
		this.p2 = t;
		t.anchorOffsetX = 25;
		t.anchorOffsetY = 25;
		t.ellipseHeight = 50;
		t.ellipseWidth = 50;
		t.fillColor = 0x072EF7;
		t.height = 50;
		t.width = 50;
		t.x = 614.99;
		t.y = 211;
		return t;
	};
	_proto.p3_i = function () {
		var t = new eui.Rect();
		this.p3 = t;
		t.anchorOffsetX = 25;
		t.anchorOffsetY = 25;
		t.ellipseHeight = 50;
		t.ellipseWidth = 50;
		t.fillColor = 0x072EF7;
		t.height = 50;
		t.width = 50;
		t.x = 615.66;
		t.y = 810;
		return t;
	};
	_proto.p4_i = function () {
		var t = new eui.Rect();
		this.p4 = t;
		t.anchorOffsetX = 25;
		t.anchorOffsetY = 25;
		t.ellipseHeight = 50;
		t.ellipseWidth = 50;
		t.fillColor = 0x072EF7;
		t.height = 50;
		t.width = 50;
		t.x = 596.47;
		t.y = 884.71;
		return t;
	};
	_proto.p5_i = function () {
		var t = new eui.Rect();
		this.p5 = t;
		t.anchorOffsetX = 25;
		t.anchorOffsetY = 25;
		t.ellipseHeight = 50;
		t.ellipseWidth = 50;
		t.fillColor = 0x072EF7;
		t.height = 50;
		t.width = 50;
		t.x = 521.39;
		t.y = 894.67;
		return t;
	};
	_proto.p6_i = function () {
		var t = new eui.Rect();
		this.p6 = t;
		t.anchorOffsetX = 25;
		t.anchorOffsetY = 25;
		t.ellipseHeight = 50;
		t.ellipseWidth = 50;
		t.fillColor = 0x072EF7;
		t.height = 50;
		t.width = 50;
		t.x = 170.63;
		t.y = 894.67;
		return t;
	};
	_proto.p7_i = function () {
		var t = new eui.Rect();
		this.p7 = t;
		t.anchorOffsetX = 25;
		t.anchorOffsetY = 25;
		t.ellipseHeight = 50;
		t.ellipseWidth = 50;
		t.fillColor = 0x072EF7;
		t.height = 50;
		t.width = 50;
		t.x = 87.85;
		t.y = 886.67;
		return t;
	};
	_proto.p8_i = function () {
		var t = new eui.Rect();
		this.p8 = t;
		t.anchorOffsetX = 25;
		t.anchorOffsetY = 25;
		t.ellipseHeight = 50;
		t.ellipseWidth = 50;
		t.fillColor = 0x072EF7;
		t.height = 50;
		t.width = 50;
		t.x = 70.85;
		t.y = 785;
		return t;
	};
	_proto.p9_i = function () {
		var t = new eui.Rect();
		this.p9 = t;
		t.anchorOffsetX = 25;
		t.anchorOffsetY = 25;
		t.ellipseHeight = 50;
		t.ellipseWidth = 50;
		t.fillColor = 0x072EF7;
		t.height = 50;
		t.width = 50;
		t.x = 72.56;
		t.y = 202.25;
		return t;
	};
	_proto.p10_i = function () {
		var t = new eui.Rect();
		this.p10 = t;
		t.anchorOffsetX = 25;
		t.anchorOffsetY = 25;
		t.ellipseHeight = 50;
		t.ellipseWidth = 50;
		t.fillColor = 0x072EF7;
		t.height = 50;
		t.width = 50;
		t.x = 80.19;
		t.y = 133.32;
		return t;
	};
	_proto.p11_i = function () {
		var t = new eui.Rect();
		this.p11 = t;
		t.anchorOffsetX = 25;
		t.anchorOffsetY = 25;
		t.ellipseHeight = 50;
		t.ellipseWidth = 50;
		t.fillColor = 0x072EF7;
		t.height = 50;
		t.width = 50;
		t.x = 149.36;
		t.y = 120;
		return t;
	};
	_proto.p12_i = function () {
		var t = new eui.Rect();
		this.p12 = t;
		t.anchorOffsetX = 25;
		t.anchorOffsetY = 25;
		t.ellipseHeight = 50;
		t.ellipseWidth = 50;
		t.fillColor = 0x072EF7;
		t.height = 50;
		t.width = 50;
		t.x = 410;
		t.y = 117.99;
		return t;
	};
	_proto.p13_i = function () {
		var t = new eui.Rect();
		this.p13 = t;
		t.anchorOffsetX = 25;
		t.anchorOffsetY = 25;
		t.ellipseHeight = 50;
		t.ellipseWidth = 50;
		t.fillColor = 0x072EF7;
		t.height = 50;
		t.width = 50;
		t.x = 495.23;
		t.y = 137.05;
		return t;
	};
	_proto.p14_i = function () {
		var t = new eui.Rect();
		this.p14 = t;
		t.anchorOffsetX = 25;
		t.anchorOffsetY = 25;
		t.ellipseHeight = 50;
		t.ellipseWidth = 50;
		t.fillColor = 0x072EF7;
		t.height = 50;
		t.width = 50;
		t.x = 503.01;
		t.y = 208.67;
		return t;
	};
	_proto.p15_i = function () {
		var t = new eui.Rect();
		this.p15 = t;
		t.anchorOffsetX = 25;
		t.anchorOffsetY = 25;
		t.ellipseHeight = 50;
		t.ellipseWidth = 50;
		t.fillColor = 0x072EF7;
		t.height = 50;
		t.width = 50;
		t.x = 503.01;
		t.y = 662.09;
		return t;
	};
	_proto.p16_i = function () {
		var t = new eui.Rect();
		this.p16 = t;
		t.anchorOffsetX = 25;
		t.anchorOffsetY = 25;
		t.ellipseHeight = 50;
		t.ellipseWidth = 50;
		t.fillColor = 0x072EF7;
		t.height = 50;
		t.width = 50;
		t.x = 498.7;
		t.y = 741.51;
		return t;
	};
	_proto.p17_i = function () {
		var t = new eui.Rect();
		this.p17 = t;
		t.anchorOffsetX = 25;
		t.anchorOffsetY = 25;
		t.ellipseHeight = 50;
		t.ellipseWidth = 50;
		t.fillColor = 0x072EF7;
		t.height = 50;
		t.width = 50;
		t.x = 413.35;
		t.y = 747.31;
		return t;
	};
	_proto.pMove_i = function () {
		var t = new eui.Rect();
		this.pMove = t;
		t.anchorOffsetX = 100;
		t.anchorOffsetY = 1;
		t.fillColor = 0xf2d004;
		t.height = 2;
		t.width = 200;
		t.x = 349.88;
		t.y = 580;
		return t;
	};
	_proto._btn_test_i = function () {
		var t = new eui.Button();
		this._btn_test = t;
		t.label = "测试";
		t.x = 539;
		t.y = 45;
		return t;
	};
	return ZMTestSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ButtonSkin.exml'] = window.skins.ButtonSkin = (function (_super) {
	__extends(ButtonSkin, _super);
	function ButtonSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay","iconDisplay"];
		
		this.minHeight = 50;
		this.minWidth = 100;
		this.elementsContent = [this._Image1_i(),this.labelDisplay_i(),this.iconDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","button_down_png")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
		];
	}
	var _proto = ButtonSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "button_up_png";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.bottom = 8;
		t.left = 8;
		t.right = 8;
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.top = 8;
		t.verticalAlign = "middle";
		return t;
	};
	_proto.iconDisplay_i = function () {
		var t = new eui.Image();
		this.iconDisplay = t;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		return t;
	};
	return ButtonSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/CheckBoxSkin.exml'] = window.skins.CheckBoxSkin = (function (_super) {
	__extends(CheckBoxSkin, _super);
	function CheckBoxSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.elementsContent = [this._Group1_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","alpha",0.7)
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image1","source","checkbox_select_up_png")
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image1","source","checkbox_select_down_png")
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image1","source","checkbox_select_disabled_png")
				])
		];
	}
	var _proto = CheckBoxSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.alpha = 1;
		t.fillMode = "scale";
		t.source = "checkbox_unselect_png";
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Tahoma";
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0x707070;
		t.verticalAlign = "middle";
		return t;
	};
	return CheckBoxSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/HScrollBarSkin.exml'] = window.skins.HScrollBarSkin = (function (_super) {
	__extends(HScrollBarSkin, _super);
	function HScrollBarSkin() {
		_super.call(this);
		this.skinParts = ["thumb"];
		
		this.minHeight = 8;
		this.minWidth = 20;
		this.elementsContent = [this.thumb_i()];
	}
	var _proto = HScrollBarSkin.prototype;

	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.height = 8;
		t.scale9Grid = new egret.Rectangle(3,3,2,2);
		t.source = "roundthumb_png";
		t.verticalCenter = 0;
		t.width = 30;
		return t;
	};
	return HScrollBarSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/HSliderSkin.exml'] = window.skins.HSliderSkin = (function (_super) {
	__extends(HSliderSkin, _super);
	function HSliderSkin() {
		_super.call(this);
		this.skinParts = ["track","thumb"];
		
		this.minHeight = 8;
		this.minWidth = 20;
		this.elementsContent = [this.track_i(),this.thumb_i()];
	}
	var _proto = HSliderSkin.prototype;

	_proto.track_i = function () {
		var t = new eui.Image();
		this.track = t;
		t.height = 6;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "track_sb_png";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.source = "thumb_png";
		t.verticalCenter = 0;
		return t;
	};
	return HSliderSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ItemRendererSkin.exml'] = window.skins.ItemRendererSkin = (function (_super) {
	__extends(ItemRendererSkin, _super);
	function ItemRendererSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.minHeight = 50;
		this.minWidth = 100;
		this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","button_down_png")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
		];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data"],[0],this.labelDisplay,"text");
	}
	var _proto = ItemRendererSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "button_up_png";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.bottom = 8;
		t.fontFamily = "Tahoma";
		t.left = 8;
		t.right = 8;
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.top = 8;
		t.verticalAlign = "middle";
		return t;
	};
	return ItemRendererSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/PanelSkin.exml'] = window.skins.PanelSkin = (function (_super) {
	__extends(PanelSkin, _super);
	function PanelSkin() {
		_super.call(this);
		this.skinParts = ["titleDisplay","moveArea","closeButton"];
		
		this.minHeight = 230;
		this.minWidth = 450;
		this.elementsContent = [this._Image1_i(),this.moveArea_i(),this.closeButton_i()];
	}
	var _proto = PanelSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(2,2,12,12);
		t.source = "border_png";
		t.top = 0;
		return t;
	};
	_proto.moveArea_i = function () {
		var t = new eui.Group();
		this.moveArea = t;
		t.height = 45;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.elementsContent = [this._Image2_i(),this.titleDisplay_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "header_png";
		t.top = 0;
		return t;
	};
	_proto.titleDisplay_i = function () {
		var t = new eui.Label();
		this.titleDisplay = t;
		t.fontFamily = "Tahoma";
		t.left = 15;
		t.right = 5;
		t.size = 20;
		t.textColor = 0xFFFFFF;
		t.verticalCenter = 0;
		t.wordWrap = false;
		return t;
	};
	_proto.closeButton_i = function () {
		var t = new eui.Button();
		this.closeButton = t;
		t.bottom = 5;
		t.horizontalCenter = 0;
		t.label = "close";
		return t;
	};
	return PanelSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ProgressBarSkin.exml'] = window.skins.ProgressBarSkin = (function (_super) {
	__extends(ProgressBarSkin, _super);
	function ProgressBarSkin() {
		_super.call(this);
		this.skinParts = ["thumb","labelDisplay"];
		
		this.minHeight = 18;
		this.minWidth = 30;
		this.elementsContent = [this._Image1_i(),this.thumb_i(),this.labelDisplay_i()];
	}
	var _proto = ProgressBarSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "track_pb_png";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.percentHeight = 100;
		t.source = "thumb_pb_png";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Tahoma";
		t.horizontalCenter = 0;
		t.size = 15;
		t.textAlign = "center";
		t.textColor = 0x707070;
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		return t;
	};
	return ProgressBarSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/RadioButtonSkin.exml'] = window.skins.RadioButtonSkin = (function (_super) {
	__extends(RadioButtonSkin, _super);
	function RadioButtonSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.elementsContent = [this._Group1_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","alpha",0.7)
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image1","source","radiobutton_select_up_png")
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image1","source","radiobutton_select_down_png")
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image1","source","radiobutton_select_disabled_png")
				])
		];
	}
	var _proto = RadioButtonSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.alpha = 1;
		t.fillMode = "scale";
		t.source = "radiobutton_unselect_png";
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Tahoma";
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0x707070;
		t.verticalAlign = "middle";
		return t;
	};
	return RadioButtonSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ScrollerSkin.exml'] = window.skins.ScrollerSkin = (function (_super) {
	__extends(ScrollerSkin, _super);
	function ScrollerSkin() {
		_super.call(this);
		this.skinParts = ["horizontalScrollBar","verticalScrollBar"];
		
		this.minHeight = 20;
		this.minWidth = 20;
		this.elementsContent = [this.horizontalScrollBar_i(),this.verticalScrollBar_i()];
	}
	var _proto = ScrollerSkin.prototype;

	_proto.horizontalScrollBar_i = function () {
		var t = new eui.HScrollBar();
		this.horizontalScrollBar = t;
		t.bottom = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.verticalScrollBar_i = function () {
		var t = new eui.VScrollBar();
		this.verticalScrollBar = t;
		t.percentHeight = 100;
		t.right = 0;
		return t;
	};
	return ScrollerSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/TextInputSkin.exml'] = window.skins.TextInputSkin = (function (_super) {
	__extends(TextInputSkin, _super);
	function TextInputSkin() {
		_super.call(this);
		this.skinParts = ["textDisplay","promptDisplay"];
		
		this.minHeight = 40;
		this.minWidth = 300;
		this.elementsContent = [this._Image1_i(),this._Rect1_i(),this.textDisplay_i()];
		this.promptDisplay_i();
		
		this.states = [
			new eui.State ("normal",
				[
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("textDisplay","textColor",0xff0000)
				])
			,
			new eui.State ("normalWithPrompt",
				[
					new eui.AddItems("promptDisplay","",1,"")
				])
			,
			new eui.State ("disabledWithPrompt",
				[
					new eui.AddItems("promptDisplay","",1,"")
				])
		];
	}
	var _proto = TextInputSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "button_up_png";
		t.percentWidth = 100;
		return t;
	};
	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillColor = 0xffffff;
		t.percentHeight = 100;
		t.percentWidth = 100;
		return t;
	};
	_proto.textDisplay_i = function () {
		var t = new eui.EditableText();
		this.textDisplay = t;
		t.height = 24;
		t.left = "10";
		t.right = "10";
		t.size = 20;
		t.textColor = 0x000000;
		t.verticalCenter = "0";
		t.percentWidth = 100;
		return t;
	};
	_proto.promptDisplay_i = function () {
		var t = new eui.Label();
		this.promptDisplay = t;
		t.height = 24;
		t.left = 10;
		t.right = 10;
		t.size = 20;
		t.textColor = 0xa9a9a9;
		t.touchEnabled = false;
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	return TextInputSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ToggleSwitchSkin.exml'] = window.skins.ToggleSwitchSkin = (function (_super) {
	__extends(ToggleSwitchSkin, _super);
	function ToggleSwitchSkin() {
		_super.call(this);
		this.skinParts = [];
		
		this.elementsContent = [this._Image1_i(),this._Image2_i()];
		this.states = [
			new eui.State ("up",
				[
					new eui.SetProperty("_Image1","source","off_png")
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","off_png")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","source","off_png")
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image2","horizontalCenter",18)
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image2","horizontalCenter",18)
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image2","horizontalCenter",18)
				])
		];
	}
	var _proto = ToggleSwitchSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.source = "on_png";
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		this._Image2 = t;
		t.horizontalCenter = -18;
		t.source = "handle_png";
		t.verticalCenter = 0;
		return t;
	};
	return ToggleSwitchSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/VScrollBarSkin.exml'] = window.skins.VScrollBarSkin = (function (_super) {
	__extends(VScrollBarSkin, _super);
	function VScrollBarSkin() {
		_super.call(this);
		this.skinParts = ["thumb"];
		
		this.minHeight = 20;
		this.minWidth = 8;
		this.elementsContent = [this.thumb_i()];
	}
	var _proto = VScrollBarSkin.prototype;

	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.height = 30;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(3,3,2,2);
		t.source = "roundthumb_png";
		t.width = 8;
		return t;
	};
	return VScrollBarSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/VSliderSkin.exml'] = window.skins.VSliderSkin = (function (_super) {
	__extends(VSliderSkin, _super);
	function VSliderSkin() {
		_super.call(this);
		this.skinParts = ["track","thumb"];
		
		this.minHeight = 30;
		this.minWidth = 25;
		this.elementsContent = [this.track_i(),this.thumb_i()];
	}
	var _proto = VSliderSkin.prototype;

	_proto.track_i = function () {
		var t = new eui.Image();
		this.track = t;
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "track_png";
		t.width = 7;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.horizontalCenter = 0;
		t.source = "thumb_png";
		return t;
	};
	return VSliderSkin;
})(eui.Skin);