module eg {
	
	/**
	 * (1-t)P0 + tP1 t[0-1]
	 * @param t  时间 0-1
	 * @param v0 开始的值
	 * @param v1 结束值
	 * @return v 当前t对应的值
	 */
	export function bezier0(t:number,v0:number[],v1:number[]):number[]{

		let len:number = v0.length;
		let v:number[] = [];
		for(let i:number = 0; i < len;i++){
			v[i] = (1-t) * v0[i] + t * v1[i];
		}
		return v;
	}	
}