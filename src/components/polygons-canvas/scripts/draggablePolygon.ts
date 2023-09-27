import { pointToMouse } from "../../../models/Mouse";
import { Point } from "../../../models/Point";
import { Polygon } from "../../../models/Polygon";
import { getPolygonsIntersection } from "../../../scripts/intersectionUtils/IntersectionUtils";
import Random from "../../../scripts/random/Random";
import { WindowSize } from "../models/WindowSize";

export function drawDraggablePolygon(
    canvas: HTMLCanvasElement, 
    ctx: CanvasRenderingContext2D, 
    canvasSize: WindowSize,
    setPolygonsCount: React.Dispatch<React.SetStateAction<number>>,
    setSelectedPolygonId: React.Dispatch<React.SetStateAction<number>>
  ) {
  let mouse = pointToMouse({x: 0, y: 0});
  let playRandomMovement = true;

  canvas.addEventListener('mousedown', (e) => {
    if (e.button == 0) {
      mouse.isLeftClicked = true;
    } else {
      mouse.isRightClicked = true;
    }
  });

  canvas.addEventListener('mouseup', () => {
    mouse.isLeftClicked = false;
    mouse.isRightClicked = false;
  });

  canvas.addEventListener('mousemove', (e) => {
    const bounds = canvas.getBoundingClientRect();
    mouse.x = e.pageX - bounds.left - scrollX;
    mouse.y = e.pageY - bounds.top - scrollY;
  });

  document.addEventListener('keyup', (e) => { 
    if (e.code == 'Space') {
      playRandomMovement = !playRandomMovement;
    }
    if (e.code == 'ArrowUp') {
      selectedPolygonId = (selectedPolygonId - 1 + polygons.length) % polygons.length;
      setSelectedPolygonId(selectedPolygonId);
    }
    if (e.code == 'ArrowDown') {
      selectedPolygonId = (selectedPolygonId + 1) % polygons.length;
      setSelectedPolygonId(selectedPolygonId);
    }
    if (e.code == 'KeyA') {
      polygons.push(Polygon(ctx));
      setPolygonsCount(polygons.length);
      selectedPolygonId = polygons.length - 1;
      setSelectedPolygonId(selectedPolygonId);
    }
    if (e.code == 'KeyI') {
      if (intersectionalPolygons.length == 0) return;

      polygons = [];
      for (let i=0; i<intersectionalPolygons.length; i++) {
        const sourcePolygon = intersectionalPolygons[i];
        polygons.push(Polygon(ctx));
        for (let j=0; j<sourcePolygon.length; j++) {
          polygons[i].addPoint({
            x: sourcePolygon[j].x,
            y: sourcePolygon[j].y
          });
        } 
      }
      intersectionalPolygons = [];
      selectedPolygonId = 0;
      setPolygonsCount(polygons.length);
      setSelectedPolygonId(selectedPolygonId);
    }
  })

  let polygons = [Polygon(ctx), Polygon(ctx)];
  setPolygonsCount(2);
  const xMid = canvasSize.width / 2;
  const yMid = canvasSize.height / 2;
  const polygonScale = 100;
  const root3 = Math.sqrt(3);
  polygons[0].addPoint({x: xMid, y: yMid - root3 * polygonScale});
  polygons[0].addPoint({x: xMid - polygonScale * 2, y: yMid + root3 * polygonScale});
  polygons[0].addPoint({x: xMid + polygonScale * 2, y: yMid + root3 * polygonScale});

  const polygonBScale = 0.75;
  polygons[1].addPoint({x: xMid, y: yMid - root3 * polygonScale * polygonBScale});
  polygons[1].addPoint({x: xMid - polygonScale * polygonBScale * 2, y: yMid + root3 * polygonScale * polygonBScale});
  polygons[1].addPoint({x: xMid + polygonScale * polygonBScale * 2, y: yMid + root3 * polygonScale * polygonBScale});

  let intersectionalPolygons: Point[][] = []; 
  let selectedPolygonId = 0;

  function drawFrame() {
    ctx.strokeStyle = "#000";
    ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
    const polygon = polygons[selectedPolygonId];

    if (!mouse.isDraggingAPoint) {
      mouse.activePoint = polygon.getMouseoverPoint(mouse);
    }

    if (mouse.activePoint == null && mouse.isLeftClicked) {
      polygon.addPoint({x: mouse.x, y: mouse.y});
    }

    if (mouse.activePoint !== null) {
      if (mouse.isLeftClicked) {
        if (mouse.isDraggingAPoint) {
          mouse.activePoint.x = mouse.x;
          mouse.activePoint.y = mouse.y;
        } else {
          mouse.isDraggingAPoint = true
          polygon.lastSelectedIndex = polygon.findPointIndex({x: mouse.activePoint.x, y: mouse.activePoint.y})+1;
        }
      } else if (mouse.isRightClicked) {
        polygon.removePoint(mouse.activePoint);
        mouse.activePoint = null;
      } else {
        mouse.isDraggingAPoint = false;
      }
    }

    for (let i=0; i<polygons.length; i++) {
      const polygon = polygons[i];
      const isSelectedPolygon = i == selectedPolygonId;
      const color = isSelectedPolygon ? '#FFB000' : '#7D7C7C';
      const lineWidth = isSelectedPolygon ? 2 : 1;
      const dotSize = isSelectedPolygon ? 4 : 3;
      polygon.draw(color, lineWidth, dotSize);
    }

    intersectionalPolygons = []; 
    for (let i=0; i<polygons.length; i++) {
      const polygonA = polygons[i].points;
      for (let j=i+1; j<polygons.length; j++) {
        const polygonB = polygons[j].points;
        intersectionalPolygons.push(...getPolygonsIntersection(polygonA, polygonB));
      }
    }
    for (let i=0; i<intersectionalPolygons.length; i++) {
      const points = intersectionalPolygons[i];
      const path2D = new Path2D();
      for (const p of points) {
        path2D.lineTo(p.x, p.y);
      }
      path2D.closePath();
      
      ctx.strokeStyle = '#C71839';
      ctx.fillStyle = '#C7183929';
      ctx.lineWidth = 3;
      ctx.stroke(path2D); 
      ctx.fill(path2D);
    }

    if (mouse.activePoint !== null) {
      ctx.strokeStyle = "white";
      ctx.lineWidth = 2;
      const p = mouse.activePoint;
      ctx.beginPath();
      ctx.arc(p.x,p.y,8,0,Math.PI *2);
      ctx.stroke();

      ctx.font = '13px Inter';
      ctx.fillStyle = '#ffffffcc';
      ctx.fillText(`(${p.x.toFixed(1)}, ${p.y.toFixed(1)})`, p.x, p.y - 10);
    }
  }

  function randomMovePolygons() {
    if (frameCount % polygonSwitchFrame == 0) {
      polygonMovements = polygons.map(poly => poly.points.map(() => ({ x: 0, y: 0 })));
      for (let i = 0; i < polygonMovements.length; i++) {
        const polygon = polygonMovements[i];
        const bigMovementX = Random.float(-50, 50) / polygonSwitchFrame;
        const bigMovementY = Random.float(-50, 50) / polygonSwitchFrame;
        for (let j = 0; j < polygon.length; j++) {
          polygonMovements[i][j].x = bigMovementX + Random.float(-50, 50) / polygonSwitchFrame;
          polygonMovements[i][j].y = bigMovementY + Random.float(-50, 50) / polygonSwitchFrame;
        }
      }
    } else {
      for (let i = 0; i < polygons.length; i++) {
        const polygon = polygons[i].points;
        for (let j = 0; j < polygon.length; j++) {
          if (polygonMovements[i] == undefined) {
            polygonMovements.push([({ x: 0, y: 0 })]);  
          }
          let polygonMovement = polygonMovements[i][j];
          if (polygonMovement == undefined) {
            polygonMovements[i].push(({ x: 0, y: 0 }));
            polygonMovements[i][j].x = Random.float(-300, 300) / polygonSwitchFrame;
            polygonMovements[i][j].y = Random.float(-300, 300) / polygonSwitchFrame;
            polygonMovement = polygonMovements[i][j];
          }
          const point = polygon[j];
          point.x += polygonMovement.x;
          point.y += polygonMovement.y;
          point.x = Math.max(0, Math.min(canvas.width, point.x));
          point.y = Math.max(0, Math.min(canvas.height, point.y));
        }
      }
    }
    frameCount++;
  }

  let frameCount = 0;
  let polygonMovements: Point[][];
  let polygonSwitchFrame = 300;
  function update() {
    if (playRandomMovement) randomMovePolygons();

    drawFrame();
    requestAnimationFrame(update);
  }

  drawFrame();
  requestAnimationFrame(update);
}