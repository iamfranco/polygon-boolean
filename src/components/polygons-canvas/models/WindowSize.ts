import Random from "../../../scripts/random/Random";

export interface WindowSize {
  width: number
  height: number
}

export const randomWindowSize = (): WindowSize => {
  return {
    width: Random.int(),
    height: Random.int()
  }
}