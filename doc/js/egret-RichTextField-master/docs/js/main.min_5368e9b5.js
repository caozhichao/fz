var __reflect=this&&this.__reflect||function(e,t,i){e.__class__=t,i?i.push(t):i=[t],e.__types__=e.__types__?i.concat(e.__types__):i},__extends=this&&this.__extends||function(e,t){function i(){this.constructor=e}for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r]);i.prototype=t.prototype,e.prototype=new i},__awaiter=this&&this.__awaiter||function(e,t,i,r){return new(i||(i=Promise))(function(n,o){function s(e){try{h(r.next(e))}catch(t){o(t)}}function l(e){try{h(r["throw"](e))}catch(t){o(t)}}function h(e){e.done?n(e.value):new i(function(t){t(e.value)}).then(s,l)}h((r=r.apply(e,t||[])).next())})},__generator=this&&this.__generator||function(e,t){function i(e){return function(t){return r([e,t])}}function r(i){if(n)throw new TypeError("Generator is already executing.");for(;h;)try{if(n=1,o&&(s=o[2&i[0]?"return":i[0]?"throw":"next"])&&!(s=s.call(o,i[1])).done)return s;switch(o=0,s&&(i=[0,s.value]),i[0]){case 0:case 1:s=i;break;case 4:return h.label++,{value:i[1],done:!1};case 5:h.label++,o=i[1],i=[0];continue;case 7:i=h.ops.pop(),h.trys.pop();continue;default:if(s=h.trys,!(s=s.length>0&&s[s.length-1])&&(6===i[0]||2===i[0])){h=0;continue}if(3===i[0]&&(!s||i[1]>s[0]&&i[1]<s[3])){h.label=i[1];break}if(6===i[0]&&h.label<s[1]){h.label=s[1],s=i;break}if(s&&h.label<s[2]){h.label=s[2],h.ops.push(i);break}s[2]&&h.ops.pop(),h.trys.pop();continue}i=t.call(e,h)}catch(r){i=[6,r],o=0}finally{n=s=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}var n,o,s,l,h={label:0,sent:function(){if(1&s[0])throw s[1];return s[1]},trys:[],ops:[]};return l={next:i(0),"throw":i(1),"return":i(2)},"function"==typeof Symbol&&(l[Symbol.iterator]=function(){return this}),l},Main=function(e){function t(){var t=e.call(this)||this;return t.addEventListener(egret.Event.ADDED_TO_STAGE,t.onAddToStage,t),t}return __extends(t,e),t.prototype.onAddToStage=function(e){egret.lifecycle.addLifecycleListener(function(e){e.onUpdate=function(){}}),egret.lifecycle.onPause=function(){egret.ticker.pause()},egret.lifecycle.onResume=function(){egret.ticker.resume()},this.runGame()["catch"](function(e){console.log(e)})},t.prototype.runGame=function(){return __awaiter(this,void 0,void 0,function(){var e;return __generator(this,function(t){switch(t.label){case 0:return[4,this.loadResource()];case 1:return t.sent(),this.createGameScene(),[4,RES.getResAsync("description_json")];case 2:return e=t.sent(),[2]}})})},t.prototype.loadResource=function(){return __awaiter(this,void 0,void 0,function(){var e;return __generator(this,function(t){switch(t.label){case 0:return t.trys.push([0,2,,3]),[4,RES.loadConfig("resource/default.res.json","resource/")];case 1:return t.sent(),[3,3];case 2:return e=t.sent(),console.error(e),[3,3];case 3:return[2]}})})},t.prototype.createGameScene=function(){function e(e){return e.getSymbol(12)+"十个相互陌生、"+e.getSymbol(8)+"身份各异的人受邀前往德文郡海岸边一座孤岛上的豪宅。"+e.getSymbol(8)+e.getSymbol(6)+"客人到齐后，主人却没有出现。"+e.getSymbol(1)+"当晚，"+e.getSymbol(5)+"一个神秘的声音发出指控，"+e.getSymbol(12)+"分别说出每个人心中罪恶的秘密。"+e.getSymbol(11)}var t=new egret.EmojiPlugin(new egret.EmojiConfig([{key:1,res:"PW_png"},{key:2,res:"PY_png"},{key:3,res:"QA_png"},{key:4,res:"RO_png"},{key:5,res:"RS_png"},{key:6,res:"RU_png"},{key:7,res:"RW_png"},{key:8,res:"SA_png"},{key:9,res:"SB_png"},{key:10,res:"SC_png"},{key:11,res:"SD_png"},{key:12,res:"SE_png"}],6,-1)),i=new egret.EmojiSpriteSheet("emoji_json"),r=new egret.EmojiPlugin(new egret.EmojiAnimationConfig([{key:1,res:{tag:"1",sheet:i}},{key:2,res:{tag:"2",sheet:i}},{key:3,res:{tag:"3",sheet:i}},{key:4,res:{tag:"4",sheet:i}},{key:5,res:{tag:"5",sheet:i}},{key:6,res:{tag:"6",sheet:i}},{key:7,res:{tag:"7",sheet:i}},{key:8,res:{tag:"8",sheet:i}},{key:9,res:{tag:"9",sheet:i}},{key:10,res:{tag:"10",sheet:i}},{key:11,res:{tag:"11",sheet:i}},{key:12,res:{tag:"12",sheet:i}},{key:13,res:{tag:"13",sheet:i}},{key:14,res:{tag:"14",sheet:i}},{key:15,res:{tag:"15",sheet:i}}],8,-10)),n=new egret.RichTextField(r);this.addChild(n),n.width=450,n.lineSpacing=20,n.size=24,n.textColor=16777215,n.text=e(n.emojiPlugin),n.height=n.textHeight+5,n.x=this.stage.stageWidth/2-n.width-100,n.y=this.stage.stageHeight/2-n.height-100;var o=new egret.RichTextField(r);this.addChild(o),o.width=450,o.lineSpacing=20,o.size=24,o.textColor=16777215,o.bold=!0,o.italic=!0,o.stroke=3,o.strokeColor=0,o.textFlow=[{text:e(o.emojiPlugin),style:{textColor:16776960}}],o.height=o.textHeight+5,o.x=this.stage.stageWidth/2+100,o.y=this.stage.stageHeight/2-o.height-100;var s=new egret.RichTextField(r);this.addChild(s),s.width=250,s.lineSpacing=20,s.size=24,s.textColor=16777215,s.bold=!0,s.italic=!0,s.stroke=3,s.strokeColor=0;var l=s.emojiPlugin;s.text=""+l.getSymbol(1)+l.getSymbol(2)+l.getSymbol(3)+l.getSymbol(4)+l.getSymbol(5)+l.getSymbol(6)+l.getSymbol(7)+l.getSymbol(8)+l.getSymbol(9)+l.getSymbol(10)+l.getSymbol(11)+l.getSymbol(12)+l.getSymbol(13)+l.getSymbol(14)+l.getSymbol(15),s.height=s.textHeight+5,s.x=this.stage.stageWidth/2-s.width-100,s.y=this.stage.stageHeight/2+100;var h=new egret.RichTextField(t);this.addChild(h),h.width=450,h.lineSpacing=20,h.size=24,h.textColor=16777215,h.bold=!0,h.italic=!1,h.stroke=3,h.strokeColor=0,h.text=e(h.emojiPlugin),h.height=h.textHeight+5,h.x=this.stage.stageWidth/2+100,h.y=this.stage.stageHeight/2+100},t}(egret.DisplayObjectContainer);__reflect(Main.prototype,"Main");var egret;!function(e){var t=function(t){function i(i){var r=t.call(this)||this;return r._textfiled=new e.TextField,r.addChild(r._textfiled),r._emojiplugin=i,r._emojisMcs=[],r}return __extends(i,t),Object.defineProperty(i.prototype,"emojiPlugin",{get:function(){return this._emojiplugin},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"width",{get:function(){return this._textfiled.width},set:function(e){this._textfiled.width=e},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"height",{get:function(){return this._textfiled.height},set:function(e){this._textfiled.height=e},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"textWidth",{get:function(){return this._textfiled.textWidth},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"textHeight",{get:function(){return this._textfiled.textHeight},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"text",{get:function(){return this._textfiled.text},set:function(t){this._matchWidth=e.sys.measureText(this._emojiplugin.match,this.fontFamily,this.size,this.bold,this.italic),this._richText=this._emojiplugin.parser(t),this._textfiled.text=this._richText.result,e.callLater(this.updateEmojis,this)},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"textFlow",{get:function(){return this._textfiled.textFlow},set:function(t){this._matchWidth=e.sys.measureText(this._emojiplugin.match,this.fontFamily,this.size,this.bold,this.italic),this._richText={result:"",emojis:[]};for(var i=0,r=0,n=t;r<n.length;r++){var o=n[r],s=this._emojiplugin.parser(o.text);o.text=s.result,this._richText.result+=s.result;for(var l=0,h=s.emojis;l<h.length;l++){var a=h[l];a.index+=i,this._richText.emojis.push(a)}i+=o.text.length}this._textfiled.textFlow=t,e.callLater(this.updateEmojis,this)},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"textAlign",{get:function(){return this._textfiled.textAlign},set:function(e){this._textfiled.textAlign=e},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"size",{get:function(){return this._textfiled.size},set:function(e){this._textfiled.size=e},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"textColor",{get:function(){return this._textfiled.textColor},set:function(e){this._textfiled.textColor=e},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"stroke",{get:function(){return this._textfiled.stroke},set:function(e){this._textfiled.stroke=e},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"strokeColor",{get:function(){return this._textfiled.strokeColor},set:function(e){this._textfiled.strokeColor=e},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"lineSpacing",{get:function(){return this._textfiled.lineSpacing},set:function(e){this._textfiled.lineSpacing=e},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"bold",{get:function(){return this._textfiled.bold},set:function(e){this._textfiled.bold=e},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"italic",{get:function(){return this._textfiled.italic},set:function(e){this._textfiled.italic=e},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"fontFamily",{get:function(){return this._textfiled.fontFamily},set:function(e){this._textfiled.fontFamily=e},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"emojis",{set:function(t){this._richText||(this._richText={result:"",emojis:null}),this._richText.emojis=t,e.callLater(this.updateEmojis,this)},enumerable:!0,configurable:!0}),i.prototype.add=function(t){this._richText||(this._richText={result:"",emojis:[]}),this._richText.emojis.push(t),e.callLater(this.updateEmojis,this)},i.prototype.remove=function(t){var i=this;if(i._richText&&i._richText.emojis&&i._richText.emojis.length){for(var r=0;r<i._richText.emojis.length;r++)if(i._richText.emojis[r].index==t.index&&i._richText.emojis[r].key==t.key){i._richText.emojis.splice(r,1);break}e.callLater(i.updateEmojis,i)}},i.prototype.clearEmojis=function(){for(;this._emojisMcs.length;){var e=this._emojisMcs.pop();this._emojiplugin.toEmoji(e.key,e.emoji)}},i.prototype.updateEmojis=function(){var t=this,i=t._textfiled,r=t._emojiplugin,n=t._emojisMcs,o=t.fontFamily,s=t.size,l=t.bold,h=t.italic;t.clearEmojis();for(var a=i.$getLinesArr(),u=r.match.length/2>>0,c=(i.textHeight+i.lineSpacing)/i.numLines,f=0,g=t._richText.emojis;f<g.length;f++){var p=g[f],_=r.fromEmoji(p.key);t.addChild(_);for(var y=t._richText.result.substring(0,p.index+u),m=0,d=0,x=0;x<a.length;x++){var b=a[x].elements[0].text.length;if(y.length<d+b){m=x;break}d+=b}_.y=m*c+r.offY,y=y.substring(d,y.length),_.x=e.sys.measureText(y,o,s,l,h)+r.offX-t._matchWidth/2,n.push({key:p.key,emoji:_})}},i}(e.DisplayObjectContainer);e.RichTextField=t,__reflect(t.prototype,"egret.RichTextField");var i=function(){function e(e,t,i){this.value=e,this.offx=t,this.offy=i}return e}();e.EmojiConfig=i,__reflect(i.prototype,"egret.EmojiConfig");var r=function(){function e(e,t,i){this.value=e,this.offx=t,this.offy=i}return e}();e.EmojiAnimationConfig=r,__reflect(r.prototype,"egret.EmojiAnimationConfig");var n=function(){function e(e,t){void 0===t&&(t=-1),this._symbolBegin="[",this._symbolEnd="]",this._config=e,-1!=t?this._match=this.getMatchChar(t):this._match=this.getMatchChar(e instanceof r?2:1),this._pool=[],this._emojiClazz=e instanceof r?l:s;for(var i=0,n=this._config.value;i<n.length;i++){var o=n[i];o.symbol=""+this._symbolBegin+o.key+this._symbolEnd}}return e.prototype.getMatchChar=function(e){for(var t="";e--;)t+=String.fromCharCode(12288);return t},Object.defineProperty(e.prototype,"offX",{get:function(){return this._config.offx},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"offY",{get:function(){return this._config.offy},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"match",{get:function(){return this._match},enumerable:!0,configurable:!0}),e.prototype.getSymbol=function(e){for(var t=0,i=this._config.value;t<i.length;t++){var r=i[t];if(r.key==e)return r.symbol}},e.prototype.search=function(e){for(var t=-1,i=0,r=this._config.value;i<r.length;i++){var n=r[i],o=e.indexOf(n.symbol);o>=0&&(t=-1==t?o:Math.min(o,t))}return t},e.prototype.parser=function(e){for(var t=[];;){var i=this.search(e);if(-1==i)break;var r=e.substring(i,e.indexOf(this._symbolEnd,i)+1),n=r.substring(1,r.length-1);e=e.replace(r,this._match),t.push({key:parseInt(n),symbol:r,index:i})}return{result:e,emojis:t}},e.prototype.getConfig=function(e){for(var t=0,i=this._config.value;t<i.length;t++){var r=i[t];if(r.key==e)return r}return null},e.prototype.fromEmoji=function(e){var t=this.getConfig(e);return this._pool.length?this._pool.pop().initialize(t.res):(new this._emojiClazz).initialize(t.res,this)},e.prototype.toEmoji=function(e,t){t.reset(),t.parent&&t.parent.removeChild(t),this._pool.push(t)},e.prototype.register=function(e){this._ticker=e},e.prototype.getTicker=function(){return this._ticker},e}();e.EmojiPlugin=n,__reflect(n.prototype,"egret.EmojiPlugin");var o=function(e){function t(){return e.call(this,null)||this}return __extends(t,e),t.prototype.initialize=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return this},t.prototype.reset=function(){return this},t}(e.Bitmap);e.Emoji=o,__reflect(o.prototype,"egret.Emoji");var s=function(t){function i(){return t.call(this)||this}return __extends(i,t),i.prototype.initialize=function(t){var i,r=this;return t instanceof e.Texture&&(this.texture=t),i||RES.getResAsync(t,function(e){r.texture=e},this),this},i.prototype.reset=function(){return this.texture=null,this},i}(o);e.EmojiBitmap=s,__reflect(s.prototype,"egret.EmojiBitmap");var l=function(t){function i(){var e=t.call(this)||this;return e.scaleX=e.scaleY=1.2,e}return __extends(i,t),i.prototype.initialize=function(e,t){var i=this;return this._plugin=t,e.sheet.getFramesAsync(e.tag,function(e){i.texture=e[0],i._frames=e,i._index=0,i.play()}),this},i.prototype.reset=function(){return this.stop(),this._plugin=null,this},i.prototype.play=function(){return this._plugin&&this._plugin.getTicker()?void this._plugin.getTicker().add(this,this.render,12):void(this._intervalId=e.setInterval(this.render,this,1e3/12))},i.prototype.stop=function(){return this._plugin&&this._plugin.getTicker()?void this._plugin.getTicker().remove(this,this.render):void(this._intervalId&&(e.clearInterval(this._intervalId),this._intervalId=0))},i.prototype.render=function(){this._index++,this._index>=this._frames.length&&(this._index=0),this.texture=this._frames[this._index]},i}(o);e.EmojiAnimation=l,__reflect(l.prototype,"egret.EmojiAnimation");var h=function(){function e(e){var t=this;RES.getResAsync(e,function(e){var i={},r=e._textureMap;for(var n in r){var o=n.split("_"),s=o[0],l=o[o.length-1];i[s]||(i[s]=[]),i[s].push({order:t.getOrder(l),texture:r[n]})}t._map={};for(var s in i){var h=i[s];h.sort(function(e,t){return e.order>t.order?1:-1}),t._map[s]=[],h.forEach(function(e){t._map[s].push(e.texture)})}if(t._spritesheet=e,t._completes){for(var a=0,u=t._completes;a<u.length;a++){var c=u[a];c.method(t.getFrames(c.tag))}t._completes.length=0}},this)}return e.prototype.getOrder=function(e){for(var t=e.length-1,i=0,r=t;r>=0;){if(isNaN(parseInt(e.charAt(r)))){r++;break}i=r,r--}return parseInt(e.substring(i,t+1))},e.prototype.getFrames=function(e){return this._map[e]},e.prototype.getFramesAsync=function(e,t){return this._map?void t(this.getFrames(e)):(this._completes||(this._completes=[]),void this._completes.push({tag:e,method:t}))},e}();e.EmojiSpriteSheet=h,__reflect(h.prototype,"egret.EmojiSpriteSheet")}(egret||(egret={}));