class AirData {

	/**基础id */
	public id: number = 0;

	/**飞机类型 1我军 2敌军 */
	public type: number = 0;
	/**飞机皮肤 */
	public skin: number = 0;
	/**最大血量 */
	public maxBlood: number = 0;
	/**飞行速度*/
	public speed: number = 0;
	/**与他机相撞产生伤害值 */
	public hitHurt: number = 0;
	/**发射子弹id */
	public bulletid: number = 0;
	/**发射子弹的间隔(毫秒为单位)*/
	public createrate: number = 0;
	/**产生子弹数量 */
	public bulletNum: number = 0;
	/**子弹生成位置 */
	public bulletPos: Array<any> = null;
	/**爆炸特效id */
	public boomid: number = 0;
	/**爆炸音效id */
	public boomsd: number = 0;
	public constructor() {
	}
}