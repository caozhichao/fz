/**
 * 微信开放数据域
 * 使用 Canvas2DAPI 在 SharedCanvas 渲染一个排行榜，
 * 并在主域中渲染此 SharedCanvas
 */







/**
 * 资源加载组，将所需资源地址以及引用名进行注册
 * 之后可通过assets.引用名方式进行获取
 */
const assetsUrl = {
  icon: "open/assets/icon.png",
  box: "open/assets/box.png",
  panel: "open/assets/panel.png",
  button: "open/assets/button.png",
  title: "open/assets/rankingtitle.png",
  guide:"open/assets/guide.png"  
};

/**
 * 资源加载组，将所需资源地址以及引用名进行注册
 * 之后可通过assets.引用名方式进行获取
 */
let assets = {};
console.log();
/**
 * canvas 大小
 * 这里暂时写死
 * 需要从主域传入
 */
let canvasWidth;
let canvasHeight;



//获取canvas渲染上下文
const context = sharedCanvas.getContext("2d");
context.globalCompositeOperation = "source-over";


/**
 * 所有头像数据
 * 包括姓名，头像图片，得分
 * 排位序号i会根据parge*perPageNum+i+1进行计算
 */
let totalGroup = [{
    key: 1,
    name: "1111111111",
    url: assets.icon,
    scroes: 10000
  },
  {
    key: 2,
    name: "2222222222",
    url: assets.icon,
    scroes: 9000
  },
  {
    key: 3,
    name: "3333333",
    url: assets.icon,
    scroes: 8000
  },
  {
    key: 4,
    name: "4444444",
    url: assets.icon,
    scroes: 7000
  },
  {
    key: 5,
    name: "55555555",
    url: assets.icon,
    scroes: 6000
  },
  {
    key: 6,
    name: "6666666",
    url: assets.icon,
    scroes: 5000
  },
  {
    key: 7,
    name: "7777777",
    url: assets.icon,
    scroes: 4000
  },
  {
    key: 8,
    name: "8888888",
    url: assets.icon,
    scroes: 3000
  },
  {
    key: 9,
    name: "9999999",
    url: assets.icon,
    scroes: 2000
  },
  {
    key: 10,
    name: "1010101010",
    url: assets.icon,
    scroes: 2000
  },
  {
    key: 11,
    name: "111111111111",
    url: assets.icon,
    scroes: 2000
  },
  {
    key: 12,
    name: "121212121212",
    url: assets.icon,
    scroes: 2000
  },
  {
    key: 13,
    name: "13131313",
    url: assets.icon,
    scroes: 2000
  },
  {
    key: 14,
    name: "1414141414",
    url: assets.icon,
    scroes: 2000
  },
  {
    key: 15,
    name: "1515151515",
    url: assets.icon,
    scroes: 2000
  },
  {
    key: 16,
    name: "1616161616",
    url: assets.icon,
    scroes: 2000
  },  
];

for(let i = 0; i < 100; i++){
  totalGroup.push({key:17 + i});
}

let testC;
function testCanvas(){
  testC = wx.createCanvas();
  testC.width = 320;
  testC.height = 500;
  let context2 = testC.getContext('2d');
  // context2.drawImage(assets.guide,0,0,408,720);
  for(let i = 0; i < 10; i++){
    context2.drawImage(assets.box, 0, 0 + i * 50, 320, 45);

    //设置字体
    context2.font = 30 + "px Arial";
    //绘制序号
    context2.fillText("第" + i + '名', 10, 0 + i * 50 + 35);
  }
}
let scrollViewRect;
let scrollMaxRect;

let len = totalGroup.length;
scrollViewRect = {x:0,y:0,width:320,height:150};
scrollMaxRect = {x:0,y:0,width:320,height:len * 50};
let curScrollRect = {x:0,y:0,width:320,height:150};
let cellHeight = 50;

let cs = wx.createCanvas();
cs.width = 320;
cs.height = 150;
let ctx2 = cs.getContext('2d');

//滚动列表
function test2(){

  let i1 = Math.floor(-curScrollRect.y / cellHeight);
  let i2 = Math.ceil((-curScrollRect.y + scrollViewRect.height) / cellHeight);
  let dataArr = totalGroup.slice(i1, i2);
  // /*
  context.save();
  context.rect(scrollViewRect.x, scrollViewRect.y, scrollViewRect.width, scrollViewRect.height);
  context.clip();
  for (let i = 0; i < dataArr.length; i++){
    // console.log(dataArr[i].key);
    context.drawImage(assets.box, 0, curScrollRect.y % cellHeight  + i * 50, 320, 50);
    //设置字体
    context.font = 30 + "px Arial";
    //绘制序号
    context.fillText("第" + dataArr[i].key + '名', 10, curScrollRect.y % cellHeight + i * 50 + 35);
  }
  context.restore();
  // */
  /*
  cs.height = dataArr.length * 50;
  ctx2.clearRect(0, 0, 320, dataArr.length * 50);
  for (let i = 0; i < dataArr.length; i++) {
    // console.log(dataArr[i].key);
    ctx2.drawImage(assets.box, 0, 0 + i * 50, 320, 50);
    //设置字体
    ctx2.font = 30 + "px Arial";
    //绘制序号
    ctx2.fillText("第" + dataArr[i].key + '名', 10, 0 + i * 50 + 35);
  }

  context.drawImage(cs, 0, -curScrollRect.y % cellHeight,320,150,0,0,320,150);
  // context.drawImage(cs, 0, 0,320,150,0,0,320,150);
  */
}

function test3(){
  
  // context.beginPath();
  // context.arc(50,50,50,0,2 * Math.PI);
  context.save();
  context.rect(0, 0, 150, 100);
  context.stroke();
  context.clip();
  context.fillStyle = "green";
  context.fillRect(0, 0, 150, 100);
  context.restore();

  context.fillStyle = '#0000ff';
  context.fillRect(0,100,150,100);
}


/**
 * 创建排行榜
 */
function drawRankPanel() {
  console.log('stageWidth:' + stageWidth + " stageHeight:" + stageHeight);
  context.fillStyle = 'red';
  context.fillRect(0, 0, stageWidth, stageHeight);

  test2();
  // test3();

  // context_drawImage(assets.guide, 0, moveP.y, 320, 320);
  //context.drawImage(assets.guide, 0,-moveP.y,320,300,0,0,320,300);
  // context.drawImage(testC, 0, -moveP.y, 320, 300, 0, 0, 320, 300);



  /*
  //绘制背景
  context_drawImage(assets.panel, offsetX_rankToBorder, offsetY_rankToBorder, rankWidth, rankHeight);
  // //绘制标题
  const title = assets.title;
  //根据title的宽高计算一下位置;
  const titleX = offsetX_rankToBorder + (rankWidth - title.width) / 2;
  const titleY = offsetY_rankToBorder + title.height + 40;
  context_drawImage(title, titleX, titleY);
  // //获取当前要渲染的数据组

  // //起始id
  const startID = perPageMaxNum * page;
  currentGroup = totalGroup.slice(startID, startID + perPageMaxNum);
  // //创建头像Bar
  drawRankByGroup(totalGroup);
  */
  // //创建按钮
  // drawButton()
}
/**
 * 根据屏幕大小初始化所有绘制数据
 */
function init() {
  //排行榜绘制数据初始化,可以在此处进行修改
  rankWidth = stageWidth * 4 / 5;
  rankHeight = stageHeight * 4 / 5;
  barWidth = rankWidth * 4 / 5;
  barHeight = rankWidth / perPageMaxNum;
  offsetX_rankToBorder = (stageWidth - rankWidth) / 2;
  offsetY_rankToBorder = (stageHeight - rankHeight) / 2;
  preOffsetY = (rankHeight - barHeight) / (perPageMaxNum + 1);
  fontSize = Math.floor(stageWidth / 25);
  startX = offsetX_rankToBorder + (rankWidth - barWidth) / 2;
  startY = offsetY_rankToBorder + preOffsetY;
  avatarSize = barHeight - 10;
  intervalX = barWidth / 20;
  textOffsetY = (barHeight + fontSize) / 2;
  textMaxSize = barWidth / 3;
  indexWidth = context.measureText("99").width;

  //按钮绘制数据初始化
  buttonWidth = barWidth / 3;
  buttonHeight = barHeight / 2;
  buttonOffset = rankWidth / 3;
  lastButtonX = offsetX_rankToBorder + buttonOffset - buttonWidth;
  nextButtonX = offsetX_rankToBorder + 2 * buttonOffset;
  nextButtonY = lastButtonY = offsetY_rankToBorder + rankHeight - 50 - buttonHeight;
  let data = wx.getSystemInfoSync();
  canvasWidth = data.windowWidth;
  canvasHeight = data.windowHeight;
}

/**
 * 创建两个点击按钮
 */
function drawButton() {
  context_drawImage(assets.button, nextButtonX, nextButtonY, buttonWidth, buttonHeight);
  context_drawImage(assets.button, lastButtonX, lastButtonY, buttonWidth, buttonHeight);
}


/**
 * 根据当前绘制组绘制排行榜
 */
function drawRankByGroup(currentGroup) {
  for (let i = 0; i < currentGroup.length; i++) {
    const data = currentGroup[i];
    drawByData(data, i);
  }
}

/**
 * 根据绘制信息以及当前i绘制元素
 */
function drawByData(data, i) {
  let x = startX;
  //绘制底框
  context_drawImage(assets.box, startX, startY + i * preOffsetY, barWidth, barHeight);
  x += 10;
  //设置字体
  context.font = fontSize + "px Arial";
  //绘制序号
  context.fillText(data.key + "", x, startY + i * preOffsetY + textOffsetY, textMaxSize);
  x += indexWidth + intervalX;
  //绘制头像
  context_drawImage(assets.icon, x, startY + i * preOffsetY + (barHeight - avatarSize) / 2, avatarSize, avatarSize);
  x += avatarSize + intervalX;
  //绘制名称
  context.fillText(data.name + "", x, startY + i * preOffsetY + textOffsetY, textMaxSize);
  x += textMaxSize + intervalX;
  //绘制分数
  context.fillText(data.scroes + "", x, startY + i * preOffsetY + textOffsetY, textMaxSize);
}

let matrix;

function invertTransformPoint(out) {
  /*
  var a1 = matrix.a;
  var b1 = matrix.b;
  var c1 = matrix.c;
  var d1 = matrix.d;
  var tx1 = matrix.tx;
  var n = a1 * d1 - b1 * c1;

  var a2 = d1 / n;
  var b2 = -b1 / n;
  var c2 = -c1 / n;
  var d2 = a1 / n;
  var tx2 = (c1 * matrix.ty - d1 * tx1) / n;
  var ty2 = -(a1 * matrix.ty - b1 * tx1) / n;
  //return out.setTo(a2 * out.x + c2 * out.y + tx2, b2 * out.x + d2 * out.y + ty2);
  return { x: a2 * out.x + c2 * out.y + tx2, y: b2 * out.x + d2 * out.y + ty2 };
  */
  return {x:out.x,y:out.y};
}

// wx.onTouchStart((event) => {
//   const l = event.changedTouches.length;
//   for (let i = 0; i < l; i++) {
//     onTouchStart(event.changedTouches[i]);
//   }
//   wx.onTouchMove((event)=>{
//     onTouchMove(event.changedTouches[0]);
//   });
//   wx.onTouchEnd((event)=>{
//     wx.offTouchMove();
//     wx.offTouchEnd();
//   })
// });
let p1;
let moveP = {x:0,y:0};
wx.onTouchStart(onTouchStart);

function onTouchMove(event){
  let evt = event.changedTouches[0];
  let p = invertTransformPoint({ x: evt.clientX, y: evt.clientY });
  console.log('onTouchMove:' + p.x + "|" + p.y);
  // moveP = {x:p.x - p1.x,y:p.y - p1.y};
  moveP.x += p.x - p1.x;
  moveP.y += p.y - p1.y;
  // p1 = p;
  renderDirty = true;
  // console.log(moveP.y);
  if(moveP.y > 0){
    moveP.y = 0;
  } else if (moveP.y < -200){
    moveP.y = -200;
  }

  curScrollRect.y += Math.round(p.y - p1.y);
  if (curScrollRect.y > 0){
    curScrollRect.y = 0;
  } else if (curScrollRect.y < scrollViewRect.height - scrollMaxRect.height){
    curScrollRect.y = scrollViewRect.height - scrollMaxRect.height;
  }
  console.log(curScrollRect.y);
  p1 = p;
}

function onTouchStart(event){
  const l = event.changedTouches.length;
  let evt = event.changedTouches[0];
  let p = invertTransformPoint({ x: evt.clientX, y: evt.clientY });
  console.log('onTouchStart:' + p.x + "|" + p.y);
  p1 = p;
}
  wx.onTouchMove(onTouchMove);
  wx.onTouchEnd(onTouchEnd);


function onTouchEnd(event){
  console.log('onTouchEnd');
  // wx.offTouchMove(onTouchMove);
  // wx.offTouchEnd(onTouchEnd);
}

/**
 * 点击处理
 */
// function onTouchEnd(event) {
//   // console.log('onTouchEnd:' + event.clientX + "|" + event.clientY);
//   let temp = invertTransformPoint({ x: event.clientX,y:event.clientY});
//   // console.log('temp:' + temp.x + "|" + temp.y);
//   return;
//   // let x = event.clientX * sharedCanvas.width / canvasWidth;
//   // let y = event.clientY * sharedCanvas.height / canvasHeight;
//   // if (x > lastButtonX && x < lastButtonX + buttonWidth &&
//   //   y > lastButtonY && y < lastButtonY + buttonHeight) {
//   //   //在last按钮的范围内
//   //   if (page > 0) {
//   //     buttonClick(0);

//   //   }
//   // }
//   // if (x > nextButtonX && x < nextButtonX + buttonWidth &&
//   //   y > nextButtonY && y < nextButtonY + buttonHeight) {
//   //   //在next按钮的范围内
//   //   if ((page + 1) * perPageMaxNum < totalGroup.length) {
//   //     buttonClick(1);
//   //   }
//   // }

// }
/**
 * 根据传入的buttonKey 执行点击处理
 * 0 为上一页按钮
 * 1 为下一页按钮
 */
function buttonClick(buttonKey) {
  let old_buttonY;
  if (buttonKey == 0) {
    //上一页按钮
    old_buttonY = lastButtonY;
    lastButtonY += 10;
    page--;
    renderDirty = true;
    console.log('上一页' + page);
    setTimeout(() => {
      lastButtonY = old_buttonY;
      //重新渲染必须标脏
      renderDirty = true;
    }, 100);
  } else if (buttonKey == 1) {
    //下一页按钮
    old_buttonY = nextButtonY;
    nextButtonY += 10;
    page++;
    renderDirty = true;
    console.log('下一页' + page);
    setTimeout(() => {
      nextButtonY = old_buttonY;
      //重新渲染必须标脏
      renderDirty = true;
    }, 100);
  }

}

/////////////////////////////////////////////////////////////////// 相关缓存数据

///////////////////////////////////数据相关/////////////////////////////////////

/**
 * 渲染标脏量
 * 会在被标脏（true）后重新渲染
 */
let renderDirty = true;

/**
 * 当前绘制组
 */
let currentGroup = [];
/**
 * 每页最多显示个数
 */
let perPageMaxNum = 5;
/**
 * 当前页数,默认0为第一页
 */
let page = 0;
///////////////////////////////////绘制相关///////////////////////////////
/**
 * 舞台大小
 */
let stageWidth;
let stageHeight;
/**
 * 排行榜大小
 */
let rankWidth;
let rankHeight;

/**
 * 每个头像条目的大小
 */
let barWidth;
let barHeight;
/**
 * 条目与排行榜边界的水平距离
 */
let offsetX_barToRank
/**
 * 绘制排行榜起始点X
 */
let startX;
/**
 * 绘制排行榜起始点Y
 */
let startY;
/**
 * 每行Y轴间隔offsetY
 */
let preOffsetY;
/**
 * 按钮大小
 */
let buttonWidth;
let buttonHeight;
/**
 * 上一页按钮X坐标
 */
let lastButtonX;
/**
 * 下一页按钮x坐标
 */
let nextButtonX;
/**
 * 上一页按钮y坐标
 */
let lastButtonY;
/**
 * 下一页按钮y坐标
 */
let nextButtonY;
/**
 * 两个按钮的间距
 */
let buttonOffset;

/**
 * 字体大小
 */
let fontSize;
/**
 * 文本文字Y轴偏移量
 * 可以使文本相对于图片大小居中
 */
let textOffsetY;
/**
 * 头像大小
 */
let avatarSize;
/**
 * 名字文本最大宽度，名称会根据
 */
let textMaxSize;
/**
 * 绘制元素之间的间隔量
 */
let intervalX;
/**
 * 排行榜与舞台边界的水平距离
 */
let offsetX_rankToBorder;
/**
 * 排行榜与舞台边界的竖直距离
 */
let offsetY_rankToBorder;
/**
 * 绘制排名的最大宽度
 */
let indexWidth;

//////////////////////////////////////////////////////////
/**
 * 监听点击
 */
// wx.onTouchEnd((event) => {
//   const l = event.changedTouches.length;
//   for (let i = 0; i < l; i++) {
//     onTouchEnd(event.changedTouches[i]);
//   }
// });


/**
 * 是否加载过资源的标记量
 */
let hasLoadRes;

/**
 * 资源加载
 */
function preloadAssets() {
  let preloaded = 0;
  let count = 0;
  for (let asset in assetsUrl) {
    count++;
    const img = wx.createImage();
    img.onload = () => {
      preloaded++;
      if (preloaded == count) {
        console.log("加载完成");
        hasLoadRes = true;
        // testCanvas();
      }

    }
    img.src = assetsUrl[asset];
    assets[asset] = img;
  }
}


/**
 * 绘制屏幕
 * 这个函数会在加载完所有资源之后被调用
 */
function createScene() {
  if (sharedCanvas.width && sharedCanvas.height) {
    // console.log('初始化完成')
    stageWidth = sharedCanvas.width;
    stageHeight = sharedCanvas.height;
    init();
    return true;
  } else {
    console.log('创建开放数据域失败，请检查是否加载开放数据域资源');
    return false;
  }
}


//记录requestAnimationFrame的ID
let requestAnimationFrameID;
let hasCreateScene;

/**
 * 增加来自主域的监听函数
 */
function addOpenDataContextListener() {
  console.log('增加监听函数')
  wx.onMessage((data) => {
    console.log(data);
    if(data.type == 'changeMatrix'){
      matrix = data;
    }
    if (data.command == 'open') {
      if (!hasCreateScene) {
        //创建并初始化
        hasCreateScene = createScene();
      }
      requestAnimationFrameID = requestAnimationFrame(loop);
    } else if (data.command == 'close' && requestAnimationFrameID) {
      cancelAnimationFrame(requestAnimationFrameID);
      requestAnimationFrameID = null
    } else if (data.command == 'loadRes' && !hasLoadRes) {
      /**
       * 加载资源函数
       * 只需要加载一次
       */
      // console.log('加载资源')
      preloadAssets();
    }
  });
}

addOpenDataContextListener();

/**
 * 循环函数
 * 每帧判断一下是否需要渲染
 * 如果被标脏，则重新渲染
 */
function loop(timestamp) {
  // console.log('timestamp:' + timestamp);
  if (renderDirty) {
    // console.log(`stageWidth :${stageWidth}   stageHeight:${stageHeight}`)
    context.setTransform(1, 0, 0, 1, 0, 0);
    // context.setTransform(matrix.a,matrix.b,matrix.c,matrix.d,matrix.tx,matrix.ty);
    context.clearRect(0, 0, sharedCanvas.width, sharedCanvas.height);
    drawRankPanel();
    renderDirty = false;
  }
  requestAnimationFrameID = requestAnimationFrame(loop);
}

/**
 * 图片绘制函数
 */
function context_drawImage(image, x, y, width, height) {
  if (image.width != 0 && image.height != 0 && context) {
    if (width && height) {
      context.drawImage(image, x, y, width, height);
    } else {
      context.drawImage(image, x, y);
    }
  }
}