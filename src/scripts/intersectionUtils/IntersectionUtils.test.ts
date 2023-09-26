import { Point } from "../../models/Point"
import { getLinesIntersection, getPolygonsIntersection } from "./IntersectionUtils";

describe('getLinesIntersection', () => {
  it('Given 2 parallel lines, returns null', () => {
    const lineA: Point[] = [
      {x: 0, y: 0},
      {x: 0, y: 10}
    ];
    const lineB: Point[] = [
      {x: 1, y: 0},
      {x: 1, y: 10}
    ];

    const result = getLinesIntersection(lineA[0],lineA[1],lineB[0],lineB[1]);

    expect(result).toBeNull();
  })

  it('Given 2 overlapping lines, returns overlapping point', () => {
    const lineA: Point[] = [
      {x: 2, y: 0},
      {x: 12, y: 10}
    ];
    const lineB: Point[] = [
      {x: 2, y: 10},
      {x: 12, y: 0}
    ];

    const result = getLinesIntersection(lineA[0],lineA[1],lineB[0],lineB[1]);

    expect(result).not.toBeNull();
    if (result == null) return;
    expect(result.x).toBe(7);
    expect(result.y).toBe(5);
  })

  it('Given 2 non overlapping non parallel lines, returns null', () => {
    const lineA: Point[] = [
      {x: 0, y: 0},
      {x: 10, y: 10}
    ];
    const lineB: Point[] = [
      {x: 100, y: 10},
      {x: 110, y: 0}
    ];

    const result = getLinesIntersection(lineA[0],lineA[1],lineB[0],lineB[1]);

    expect(result).toBeNull();
  })
})

describe('getPolygonsIntersection', () => {
  it('Given 2 non overlapping polygons, returns empty point array array', () => {
    const polygonA: Point[] = [
      {x: 0, y: 0},
      {x: 10, y: 0},
      {x: 0, y: 10}
    ];
    const polygonB: Point[] = [
      {x: 100, y: 0},
      {x: 110, y: 0},
      {x: 100, y: 10}
    ];

    const result = getPolygonsIntersection(polygonA, polygonB);

    expect(result.length).toBe(0);
  })

  it('Given 2 simply overlapping polygons, returns array with overlap polygon', () => {
    const polygonA: Point[] = [
      {x: 0, y: 0},
      {x: 10, y: 0},
      {x: 0, y: 10}
    ];
    const polygonB: Point[] = [
      {x: 5, y: -5},
      {x: 5, y: 10},
      {x: 15, y: 10},
      {x: 15, y: -5},
    ];

    const result = getPolygonsIntersection(polygonA, polygonB);

    expect(result.length).toBe(1);
    const expectedResult: Point[][] = [[
      {x: 5, y: 0},
      {x: 10, y: 0},
      {x: 5, y: 5}
    ]];

    for (let i=0; i<expectedResult.length; i++) {
      for (let j=0; j<expectedResult[i].length; j++) {
        expect(result[i][j].x).toBeCloseTo(expectedResult[i][j].x);
        expect(result[i][j].y).toBeCloseTo(expectedResult[i][j].y);
      }
    }
  })

  it('Given 2 multiple overlapping polygons, returns array with overlap polygons', () => {
    const polygonA: Point[] = [
      {x: 0, y: 0},
      {x: 10, y: 0},
      {x: 10, y: 1},
      {x: 0, y: 1}
    ];
    const polygonB: Point[] = [
      {x: 1, y: -1},
      {x: 2, y: -1},
      {x: 2, y: 2},
      {x: 8, y: 2},
      {x: 8, y: -1},
      {x: 9, y: -1},
      {x: 9, y: 3},
      {x: 1, y: 3}
    ];

    const result = getPolygonsIntersection(polygonA, polygonB);

    expect(result.length).toBe(2);

    const expectedResult: Point[][] = [[
      {x: 1, y: 0},
      {x: 2, y: 0},
      {x: 2, y: 1},
      {x: 1, y: 1}
    ], [
      {x: 8, y: 0},
      {x: 9, y: 0},
      {x: 9, y: 1},
      {x: 8, y: 1}
    ]];

    for (let i=0; i<expectedResult.length; i++) {
      for (let j=0; j<expectedResult[i].length; j++) {
        expect(result[i][j].x).toBeCloseTo(expectedResult[i][j].x);
        expect(result[i][j].y).toBeCloseTo(expectedResult[i][j].y);
      }
    }
  })
})