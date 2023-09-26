import { Point, randomPoint } from "./Point";

export const Polygon = (ctx: CanvasRenderingContext2D) => ({
  points: [] as Point[],
  lastSelectedIndex: -1,

  findPointIndex(p: Point) {
    return this.points.findIndex(q => p.x == q.x && p.y == q.y);
  },

  addPoint(p: Point) {
    if (this.lastSelectedIndex == -1) {
      this.points.push({x: p.x, y: p.y})
      this.lastSelectedIndex = 0;
      return; 
    }

    this.points.splice(this.lastSelectedIndex, 0, {x: p.x, y: p.y});
    this.lastSelectedIndex++;
  },

  removePoint(p: Point) {
    const matchingPointIndex = this.findPointIndex(p);
    if (matchingPointIndex == -1) return;

    this.points.splice(matchingPointIndex, 1);;
  },
  
  draw(color: string = 'red', lineWidth: number = 1) {
    const dotSize = 4;
    const path2D = new Path2D();
    for (const p of this.points) {
      path2D.lineTo(p.x, p.y);
    }
    path2D.closePath();
    for (const p of this.points) {
      path2D.moveTo(p.x + dotSize, p.y);
      path2D.arc(p.x, p.y, dotSize, 0, Math.PI * 2);
    }

    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.stroke(path2D);
  },

  getMouseoverPoint(mousePosition: Point, hoverDistance = 10): Point | null {
    if (this.points.length == 0) return null;

    const pointDistanceFromMouse = this.points.map(p => (p.x - mousePosition.x)**2 + (p.y - mousePosition.y)**2);
    const shortestDistance = Math.min(...pointDistanceFromMouse);

    if (shortestDistance > hoverDistance**2) return null;

    const closestPointIndex = pointDistanceFromMouse.indexOf(shortestDistance);
    return this.points[closestPointIndex];
  }
})

export const randomPolygon = (pointCount: number = 4) => {
  const points: Point[] = [...Array(pointCount)].map(() => randomPoint());
  return {
    points: points
  }
}