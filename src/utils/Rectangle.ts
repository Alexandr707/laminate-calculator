export class Rectangle {
  static getDiagonal(a: number, b?: number): number {
    if (!b) b = a;
    return Math.sqrt(a * a + b * b);
  }

  static getSide(diagonal: number, sideB?: number): number {
    if (sideB) {
      return Math.sqrt(diagonal * diagonal - sideB * sideB);
    } else {
      return diagonal / Math.SQRT2;
    }
  }

  static getArea(a: number, b?: number): number {
    if (!b) b = a;
    return a * b;
  }
}
