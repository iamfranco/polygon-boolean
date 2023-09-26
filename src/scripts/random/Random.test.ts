import Random from "./Random"

describe('Random.int', () => {
  it('Given no input, returns integer between 0 and 1000', () => {
    const result = Random.int();
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThanOrEqual(1000);
    expect(result).toBe(Math.floor(result));
  })

  it('Given input min 1000, returns integer between 1000 and 2000', () => {
    const result = Random.int(1000);
    expect(result).toBeGreaterThanOrEqual(1000);
    expect(result).toBeLessThanOrEqual(2000);
    expect(result).toBe(Math.floor(result));
  })

  it('Given input min 1000 and max 1001, returns integer between 1000 and 1001', () => {
    const result = Random.int(1000, 1001);
    expect(result).toBeGreaterThanOrEqual(1000);
    expect(result).toBeLessThanOrEqual(1001);
    expect(result).toBe(Math.floor(result));
  })

  it('Given input min is greater than max, throw exception', () => {
    const action = () => Random.int(1000, 999);
    expect(action).toThrow("Invalid integer range");
  })
})

describe('Random.float', () => {
  it('Given no input, returns float between -0.5 and 0.5', () => {
    const result = Random.float();
    expect(result).toBeGreaterThanOrEqual(-0.5);
    expect(result).toBeLessThanOrEqual(0.5);
  })

  it('Given input min 0, returns integer between 0 and 1', () => {
    const result = Random.float(0);
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThanOrEqual(1);
  })

  it('Given input min 1.3 and max 3.3, returns integer between 1.3 and 3.3', () => {
    const result = Random.float(1.3, 3.3);
    expect(result).toBeGreaterThanOrEqual(1.3);
    expect(result).toBeLessThanOrEqual(3.3);
  })

  it('Given input min is greater than max, throw exception', () => {
    const action = () => Random.float(3, 1);
    expect(action).toThrow("Invalid float range");
  })
})