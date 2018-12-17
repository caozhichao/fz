module game {
	export class ResultBaseVo {
		private _data:any;
		public constructor() {

		}
		
		public set data(value:any){
			this._data = value;
		}

		public get data():any{
			return this._data;
		}
	}
}