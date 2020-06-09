class Point {
	public constructor(
		public x: number,
		public y: number,
	) {
	}

	public distance(another: Point): number {
		const dx = this.x - another.x
		const dy = this.y - another.y

		return Math.sqrt(dx * dx + dy * dy)
	}
}

class Triangle {
	public constructor(
		public p1: Point,
		public p2: Point,
		public p3: Point,
	) {
	}
}

function area(triangle: Triangle): number {
	const { x: x1, y: y1 } = triangle.p1
	const { x: x2, y: y2 } = triangle.p2
	const { x: x3, y: y3 } = triangle.p3

	return Math.abs(x1 * y2 + x2 * y3 + x3 * y1 - x1 * y3 - x2 * y1 - x3 * y2) / 2
}

function isInTriangle(triangle: Triangle, point: Point) {
	const { p1, p2, p3 } = triangle

	const a = area(triangle)

	const a1 = area(new Triangle(p1, p2, point))
	const a2 = area(new Triangle(p1, point, p3))
	const a3 = area(new Triangle(point, p2, p3))

	return a === (a1 + a2 + a3)
}

const triangle = new Triangle(
	new Point(0, 0),
	new Point(0, 2),
	new Point(2, 0),
)

console.log('(0.5, 0.5)', isInTriangle(triangle, new Point(0.5, 0.5)))
console.log('(1, 1)', isInTriangle(triangle, new Point(1, 1)))
console.log('(1.5, 1.5)', isInTriangle(triangle, new Point(1.5, 1.5)))
console.log('(2, 2)', isInTriangle(triangle, new Point(2, 2)))
