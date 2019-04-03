module test {
	export class TabBarDemo extends eui.Group {
    constructor() {
        super();
    }
    protected createChildren(): void {
        super.createChildren();
		/*
        var theme = new eui.Theme(`resource/default.thm.json`, this.stage);
        var exml = `
        <e:Skin xmlns:e="http://ns.egret.com/eui" states="up,down" height="50"> 
            <e:Label text="{data}" textColor.down="0xFFFFFF" textColor.up="0x666666" horizontalCenter="0" verticalCenter="0"/> 
        </e:Skin>`;
        var tabBar = new eui.TabBar();
        var viewStack = new eui.ViewStack();
        viewStack.y = 100;
        //创建 3 个 group ,每个 group 里面有 1 个按钮
        for (var i: number = 0; i < 3; i ++) {
            var group: eui.Group = new eui.Group();
            group.name = "Group" + i;
            var btn: eui.Button = new eui.Button();
            btn.label = "Button" + i;
            group.addChild(btn);
            viewStack.addChild(group);
        }
        //将 tabBat 的数据源设置为 viewStack
        tabBar.dataProvider = viewStack;
        tabBar.itemRendererSkinName = exml;
        viewStack.selectedIndex = 1;
        this.addChild(viewStack);
        this.addChild(tabBar);
		*/

		  var exml = `
        <e:Skin xmlns:e="http://ns.egret.com/eui" states="up,down" height="50"> 
            <e:Label text="{data}" textColor.down="0xFFFFFF" textColor.up="0x666666" horizontalCenter="0" verticalCenter="0"/> 
        </e:Skin>`;
        var tabBar = new eui.TabBar();
        tabBar.dataProvider = new eui.ArrayCollection(["tab1", "tab2", "tab3"]);
        tabBar.itemRendererSkinName = exml;
        this.addChild(tabBar);
        tabBar.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onBarItemTap, this);
    }

		private onBarItemTap(e: eui.ItemTapEvent): void {
        console.log(e.itemIndex);
    }
}
}