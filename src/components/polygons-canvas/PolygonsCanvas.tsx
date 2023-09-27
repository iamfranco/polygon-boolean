import { useEffect, useRef, useState } from 'react';
import './PolygonsCanvas.css';
import { WindowSize } from './models/WindowSize';
import { drawDraggablePolygon } from './scripts/draggablePolygon';

interface Props {
  setPolygonsCount: React.Dispatch<React.SetStateAction<number>>,
  setSelectedPolygonId: React.Dispatch<React.SetStateAction<number>>
}

const PolygonsCanvas = ({setPolygonsCount, setSelectedPolygonId} : Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  const canvasSize = useWindowSize();

  useEffect(() => {
    canvas = canvasRef.current!;
    ctx = canvas.getContext('2d')!;

    drawDraggablePolygon(canvas, ctx, canvasSize, setPolygonsCount, setSelectedPolygonId);
    
  }, [canvasSize]);
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
