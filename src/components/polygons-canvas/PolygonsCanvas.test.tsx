import { act, render } from "@testing-library/react";
import PolygonsCanvas from "./PolygonsCanvas";
import { randomWindowSize } from "./models/WindowSize";

describe('PolygonsCanvas Component', () => {
  let canvas: HTMLCanvasElement;
  beforeEach(() => {
    render(<PolygonsCanvas />);
    canvas = document.querySelector<HTMLCanvasElement>('#polygons-canvas')!;
  });

  it('canvas initial size should match window size', () => {
    expect(canvas.width).toBe(window.innerWidth);
    expect(canvas.height).toBe(window.innerHeight);
  })
  
  it('when window resizes, canvas resize to match new window size', () => {
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