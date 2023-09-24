import { act, render } from "@testing-library/react";
import PolygonsCanvas from "./PolygonsCanvas";
import { randomWindowSize } from "./models/WindowSize";

describe('PolygonsCanvas Component', () => {
  let canvas: HTMLCanvasElement | null = null;
  beforeEach(() => {
    render(<PolygonsCanvas />);
    canvas = document.querySelector<HTMLCanvasElement>('#polygons-canvas');
  });

  it('canvas should exist', () => {
    expect(canvas).not.toBeNull();
  })

  it('canvas initial size should match window size', () => {
    if (canvas == null) return;
    expect(canvas.width).toBe(window.innerWidth);
    expect(canvas.height).toBe(window.innerHeight);
  })
  
  it('when window resizes, canvas resize to match new window size', () => {
    if (canvas == null) return;

    const windowSize = randomWindowSize();
    act(() => {
      window.innerWidth = windowSize.width;
      window.innerHeight = windowSize.height;
      window.dispatchEvent(new Event('resize'));
    });
    
    expect(canvas.width).toBe(windowSize.width);
    expect(canvas.height).toBe(windowSize.height);
  })
    
});