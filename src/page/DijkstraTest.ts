module test {
	export class DijkstraTest {
		public constructor() {

			// let g:eg.Graph = new eg.Graph();
			// let d = new eg.Dijkstra(g);
			// d.find(0);
			let d = new eg.Dijkstra();
			d.find(3);
		}
	}
}