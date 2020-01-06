const bounded = x => Math.max(0, Math.min(x, 255));

class RGB {
  constructor(r,g,b) {
    this.red = bounded(r);
    this.green = bounded(g);
    this.blue = bounded(b);
  }

  static fromHex(hex) {
    if(hex[0] === '#') hex = hex.substr(1);
    const x = parseInt(hex, 16);
    const rgb = new RGB(
      Math.floor(x / 65536),
      Math.floor(x / 256) % 256,
      x % 256
    );
    return rgb;
  }

  static random(rng) {
    const g = () => rng.next(0, 255);
    const rgb = new RGB(g(), g(), g());
    return rgb;
  }

  toHex() {
    return '#' + [this.red, this.green, this.blue]
      .map(x => {
        const str = Math.floor(x).toString(16);
        return x >= 16
          ? str
          : "0"+str;
      })
      .join("");
  }

  map(f) {
    const g = x => Math.floor(f(x));
    const rgb = new RGB(g(this.red), g(this.green), g(this.blue));
    return rgb;
  }

  add(other) {
    if(!other instanceof RGB)
      throw new Error("Other object is not an instance of RGB");

    return new RGB(
      this.red + other.red,
      this.green + other.green,
      this.blue + other.blue
    );
  };
}

function genScheme(col, keys, prng) {
  const rgbCol = RGB.fromHex(col).map(x => x/2);
  return keys.reduce((acc, k) => {
    acc[k] = RGB
      .random(prng)
      .map(c => c/4)
      .add(rgbCol)
      .add(RGB.fromHex('#ffffff').map(x => x / 4))
      .toHex();
    return acc;
  }, {});
}

export {RGB, genScheme}
