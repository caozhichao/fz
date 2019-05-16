class EUIListTest extends eg.PageBase{
	public _list:eui.List;

	public constructor() {
		super();
		this.uiSkinName = 'skins.EUIListTestSkin';		
	}

	public initComplete(data):void{
		super.initComplete(data);

		/**
		 * 默认Scroller组件下会有个Group容器
		 * 如果是对list做滚动，不要添加到Group容器中(一般是删除默认的Group)
		 * 如果是添加到Group中，list设置了尺寸默认是不会滚动的，如果不设置尺寸，那么list中的所有数据都会一次性绘制好(多数据对性能会有影响)
		 * 
		 * 正确的做法是对list做滚动，当前绘制的数据是当前Scroller的尺寸(list 尺寸与Scroller相同)
		 * 
		 */

		this._list.itemRenderer = ListRenderTest;
		this._list.dataProvider = new eui.ArrayCollection(["1","2","3","4","5","6","7","8"]);	
		this._list.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.itemTap,this);
	}

	private itemTap(evt:eui.ItemTapEvent):void{

		console.log(evt.itemIndex);
		let item:ListRenderTest = evt.itemRenderer as ListRenderTest
		item.show();

	}

}

class ListRenderTest extends eui.ItemRenderer{
	constructor(){
		super();
		this.skinName = 'skins.ListRenderTestSkin';
	}

	public show():void{

		//list 二级列表模拟

		let s:egret.Shape = new egret.Shape();
		s.graphics.beginFill(0x00ff00);
		s.graphics.drawRect(0,0,100,100);
		s.graphics.endFill();
		s.y = 50;
		this.addChild(s);

		//更新对象的高度
		this.height += 50;
		// this.invalidateSize();
	}

}