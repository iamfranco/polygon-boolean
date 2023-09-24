import { useEffect, useState } from 'react';
import './PolygonsCanvas.css';
import { WindowSize } from './models/WindowSize';

const PolygonsCanvas = () => {
  const canvasSize = useWindowSize();

  return (
    <canvas id='polygons-canvas' width={canvasSize.width} height={canvasSize.height}></canvas>
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