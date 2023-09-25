import Random from "../scripts/random/Random"

export interface Point {
  x: number,
  y: number
}

export const randomPoint = () => {
  return {
    x: Random.int(0, 300),
    y: Random.int(0, 300)
  }
}