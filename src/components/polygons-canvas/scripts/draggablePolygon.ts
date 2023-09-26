import { pointToMouse } from "../../../models/Mouse";
import { Point } from "../../../models/Point";
import { Polygon } from "../../../models/Polygon";
import Random from "../../../scripts/random/Random";
import { WindowSize } from "../models/WindowSize";

export function drawDraggablePolygon(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, canvasSize: WindowSize) {
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
    if (e.code == 'ShiftLeft' || e.code == 'ShiftRight' ||
        e.code == 'ControlLeft' || e.code == 'ControlRight') {
      selectedPolygonId = (selectedPolygonId + 1) % polygons.length;
    }
  })

  const polygons = [Polygon(ctx), Polygon(ctx)];
  const xMid = canvasSize.width / 2;
  const yMid = canvasSize.height / 2;
  const polygonScale = 150;
  const root3 = Math.sqrt(3);
  polygons[0].addPoint({x: xMid, y: yMid - root3 * polygonScale});
  polygons[0].addPoint({x: xMid - polygonScale, y: yMid});
  polygons[0].addPoint({x: xMid + polygonScale, y: yMid});

  polygons[1].addPoint({x: xMid, y: yMid - root3 * polygonScale / 2});
  polygons[1].addPoint({x: xMid - polygonScale, y: yMid + root3 * polygonScale / 2});
  polygons[1].addPoint({x: xMid + polygonScale, y: yMid + root3 * polygonScale / 2});
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
      mouse.isLeftClicked = false;
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

    if (mouse.activePoint !== null) {
      ctx.strokeStyle = "white";
      ctx.lineWidth = 2;
      const pos = mouse.activePoint;
      ctx.beginPath();
      ctx.arc(pos.x,pos.y,8,0,Math.PI *2);
      ctx.stroke();
    }
  }

  function randomMovePolygons() {
    if (frameCount % polygonSwitchFrame == 0) {
      polygonMovements = polygons.map(poly => poly.points.map(() => ({ x: 0, y: 0 })));
      for (let i = 0; i < polygonMovements.length; i++) {
        const polygon = polygonMovements[i];
        for (let j = 0; j < polygon.length; j++) {
          polygonMovements[i][j].x = Random.float(-100, 100) / polygonSwitchFrame;
          polygonMovements[i][j].y = Random.float(-100, 100) / polygonSwitchFrame;
        }
      }
    } else {
      for (let i = 0; i < polygons.length; i++) {
        const polygon = polygons[i].points;
        for (let j = 0; j < polygon.length; j++) {
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
          point.y = Math.max(0, Math.min(canvas.width, point.y));
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