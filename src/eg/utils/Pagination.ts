module util{
    /**
     * 分页对象 
     * @author caozhichao
     * 
     */
    export class Pagination {
        // 数据
        private  _items : Array<any>;
        // 当前页(1开始)
        private _curPage : number;
        // 每页个数
        private _pageSize : number
        // 总页数
        private  _countPage : number;
        // 当前选项（0开始）
        private _curIndex : number;

        public constructor(pageSize : number) {
            this._pageSize = pageSize;
            this._curPage = 1;
			this._items = [];
        }

        /**
         * 设置分页数据 
         * @param value
         * 
         */
        public set items(value : Array<any>){
            this._items = value;
            this._countPage = this.pageCount(this._items.length);
        }
		
		/**
		 * 获取总页数 
		 * @param len 数据的个数
		 * @return 
		 * 
		 */		
        private pageCount(len : number) : number {
            var count : number;
            len = Math.floor((len - 1) / this._pageSize);
            if (len < 1) {
                count = 1;
            } else {
                count = len + 1;
            }
            return count;
        }
		
		/**
		 * 根据页码获取数据 
		 * @param pageNum   页码
		 * @return 
		 * 
		 */
		private getItemsByPage(pageNum : number) : Array<any> {
			var startIndex : number = (pageNum - 1) * this._pageSize;
			var maxIndex : number = this._items.length;
			return this._items.slice(startIndex, Math.min((startIndex + this._pageSize), maxIndex));
		}
		
		/**
		 * 当前页 
		 * @return 
		 * 
		 */
		public get curPageItems() : Array<any> {
			return this.getItemsByPage(this.curPage);
		}

		/**
		 * 前一页 
		 * 
		 */		
        public toPrePage() : void {
            if (this._curPage > 1) {
                this._curPage--;
            }
        }

		/**
		 * 下一页 
		 * 
		 */		
        public toNextPage() : void {
           this. _curPage = Math.min(this._curPage + 1, this.countPage);
        }


        public  get allLen() : number {
            return this._items == null ? 0 : this._items.length;
        }

        /**
         * 总页数 
         * @return 
         * 
         */
        public get countPage() : number {
            return this._countPage;
        }

        /**
         * 当前页码 
         * @return 
         * 
         */
        public get curPage() : number {
            return this._curPage;
        }

        /**
         * 设置当前页 
         * @param value
         * 
         */
        public set curPage(value : number) {
            this._curPage = Math.max(1, value);
        }

        /**
         * 获取页号 
         * @param id
         * @return -1 该数据不存在
         * 
         */
        public  getPageByItem(item:any) : number {
			var index:number = this._items.indexOf(item);
			if(index != -1)
			{
				return this.getPageByIndex(index);
			}
            return -1;
        }
		
		/**
		 * 获取页号 
		 * @param elementindex
		 * 
		 */
		public  getPageByIndex(index : number) : number {
			if(index >= 0)
			{
//            return int(index / _pageSize) + 1;
				return this.pageCount(index + 1);
			}
			return -1;
		}
        /**
         * 选中当前选项,0开始
         */
        public  setCurItem(index : number) : Boolean {
            if (this._items && index < this._items.length) {
                this._curPage = this.getPageByIndex(index);
                index = index - (this._curPage - 1) * this._pageSize;
                this._curIndex = index;
                return true;
            }
            return false;
        }
		
        /**
         * 是否第一页 
         * @return 
         * 
         */
        public get isFirstPage() : Boolean {
            var flag : Boolean;
            if (this._curPage == 1) {
                flag = true;
            }
            return flag;
        }

        /**
         * 是否最后一页 
         * @return 
         * 
         */
        public get isEndPage() : Boolean {
            var flag : Boolean;
            if (this._curPage == this.countPage) {
                flag = true;
            }
            return flag;
        }

		/**
		 * 获取页码字符串  
		 * @return 
		 * 
		 */		
        public  get pageStr() : String {
            return this._curPage + "/" + this._countPage;
        }
		
        public get pageSize() : number {
            return this._pageSize;
        }
		
		public dispose() : void {
			this._items = null;
		}
    }
}