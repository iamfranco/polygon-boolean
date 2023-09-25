import { useEffect, useRef, useState } from 'react';
import './PolygonsCanvas.css';
import { WindowSize } from './models/WindowSize';
import { Polygon } from '../../models/Polygon';
import { pointToMouse } from '../../models/Mouse';
const PolygonsCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;

  useEffect(() => {
    canvas = canvasRef.current!;
    ctx = canvas.getContext('2d')!;

    drawDraggablePolygon(canvas, ctx);
    
  }, []);

  const canvasSize = useWindowSize();

  return (
    <canvas ref={canvasRef} 
      id='polygons-canvas' 
      width={canvasSize.width} 
      height={canvasSize.height} />
  )
}

export default PolygonsCanvas

function useWindowSize(): WindowSize  {
  const [windowSize, setWindowSize] = useState<WindowSize>({ width: 0, height: 0 });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

function drawDraggablePolygon(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  let mouse = pointToMouse({x: 0, y: 0});

  canvas.addEventListener('mousedown', (e) => {
    if (e.button == 0) {
      mouse.isLeftClicked = true;
    } else {
      mouse.isRightClicked = true;
    }
    mouse.hasMouseChanged = true;
  });

  canvas.addEventListener('mouseup', () => {
    mouse.isLeftClicked = false;
    mouse.isRightClicked = false;
    mouse.hasMouseChanged = true;
  });

  canvas.addEventListener('mousemove', (e) => {
    const bounds = canvas.getBoundingClientRect();
    mouse.x = e.pageX - bounds.left - scrollX;
    mouse.y = e.pageY - bounds.top - scrollY;
    mouse.hasMouseChanged = true;
  });

  const polygon = Polygon(ctx);

  function drawFrame() {
    ctx.strokeStyle = "#000";
    ctx.clearRect(0, 0, canvas.width, canvas.height);

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

    polygon.draw();

    if (mouse.activePoint !== null) {
      ctx.strokeStyle = "red";
      const pos = mouse.activePoint;
      ctx.beginPath();
      ctx.arc(pos.x,pos.y,8,0,Math.PI *2);
      ctx.stroke();
    }
  }

  function update() {
    if (mouse.hasMouseChanged) {
      mouse.hasMouseChanged = false;
      drawFrame();
    }
    requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}