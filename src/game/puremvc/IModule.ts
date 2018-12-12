module game {
	export interface IModule {
		setViewComponent(value:any):void;
		getViewComponent():any;
		setInitCommands(value:Function[]):void;
		getInitCommands():Function[];
	}
}