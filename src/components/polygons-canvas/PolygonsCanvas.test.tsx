import { act, render } from "@testing-library/react";
import PolygonsCanvas from "./PolygonsCanvas";

describe('PolygonsCanvas Component', () => {
  let canvas: HTMLCanvasElement | null = null;
  beforeEach(() => {
    render(<PolygonsCanvas />);
    canvas = document.querySelector<HTMLCanvasElement>('#polygons-canvas');
  });

  test('canvas should exist', () => {
    expect(canvas).not.toBeNull();
  })

  test('canvas initial size should match window size', () => {
    if (canvas == null) return;
    expect(canvas.width).toBe(window.innerWidth);
    expect(canvas.height).toBe(window.innerHeight);
  })
  
  test('when window resizes, canvas resize to match new window size', () => {
    if (canvas == null) return;

    const newWindowWidth = 350;
    const newWindowHeight = 450;
    act(() => {
      window.innerWidth = newWindowWidth;
      window.innerHeight = newWindowHeight;
      window.dispatchEvent(new Event('resize'));
    });
    
    expect(canvas.width).toBe(newWindowWidth);
    expect(canvas.height).toBe(newWindowHeight);
  })
    
});