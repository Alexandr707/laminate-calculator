export class Convertor {
  static toPixels(value: number, maxVal: number, maxPixel: number) {
    return (value / maxVal) * maxPixel;
  }

  static toSantimetrs(pix: number, maxPix: number, maxVal: number) {
    return (pix / maxPix) * maxVal;
  }
}
