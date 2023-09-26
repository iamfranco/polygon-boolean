const Random = class {
  static int = (min: number = 0, max: number = min + 1000) => {
    if (min > max) throw new Error("Invalid integer range");

    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  static float = (min: number = -0.5, max: number = min + 1) => {
    if (min > max) throw new Error("Invalid float range");

    return Math.random() * (max - min) + min;
  }
}

export default Random;