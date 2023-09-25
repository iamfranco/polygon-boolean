import { Point, randomPoint } from "./Point";

export const Polygon = (ctx: CanvasRenderingContext2D, color: string = '#000', lineWidth: number = 1) => ({
  points: [] as Point[],
  color: color,
  lineWidth: lineWidth,

  addPoint(p: Point) { this.points.push({x: p.x, y: p.y}) },
  
  draw() {
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

    ctx.fillStyle = color;
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