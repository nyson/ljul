import {RGB} from './Colors.js';
import 'jest';

class mockRng {
  constructor() {
    this.counter = 0;
  }

  next(min, max) {
    const c = (this.counter + min) % max;
    this.counter += 16;
    return c;
  }
};

describe("RGB", () => {
  const hex = "#1080ff";
  const whiteRGB = RGB.fromHex("#ffffff");
  const col = {
    r: 16,
    g: 128,
    b: 255
  };

  describe("construction", () => {
    it('can create an RGB from hex', () => {
      expect(RGB.fromHex(hex).toHex())
        .toEqual(hex);
    });

    it('can even create from incomplete regex', () => {
      expect(RGB.fromHex(hex.substr(1)).toHex())
        .toEqual(hex);
    });

    it('can create an RGB from values', () => {
      expect(new RGB(col.r, col.g, col.b).toHex())
        .toEqual(hex);
    });

    it('can generate a random value from a generator', () => {
      expect(RGB.random(new mockRng()).toHex())
        .toEqual("#001020");
    });
  });

  describe("mutation", () => {
    const a = new RGB(127, 127, 127);
    const b = new RGB(127, 127, 127);

    it('can add two RGB values', () => {
      expect(a.add(b))
        .toEqual(RGB.fromHex("#fefefe"));
    });

    it('handles overflow', () => {
      expect(a.add(whiteRGB))
        .toEqual(whiteRGB);
      expect(a.map(x => x+10000))
        .toEqual(whiteRGB);
    });

    it('handles underflow', () => {
      expect(a.add(new RGB(-255, -255, -255)))
        .toEqual(a);
      expect(a.map(x => x-10000))
        .toEqual(RGB.fromHex("#000000"));
    });

    it('can map a scalar lambda to the color', () => {
      expect(a.map(x => x * 2))
        .toEqual(RGB.fromHex("#fefefe"));
    });
});
});
