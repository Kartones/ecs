import { BaseComponent } from "./BaseComponent.mjs";

const colorsMap = {
  red: [255, 0, 0],
  blue: [0, 0, 255],
};

let scaleFactor;

export class RenderComponent extends BaseComponent {
  #sprite;

  constructor(color, config = {}) {
    super();
    if (!colorsMap[color]) {
      throw new Error(`Color '${color}' is not supported`);
    }

    scaleFactor = config.scaleFactor;

    this._initSprite(color);
  }

  draw(canvasContext, x, y) {
    this._drawPixel(canvasContext, x, y);
  }

  _initSprite(color) {
    let colorComponents = new Array();
    for (let pixelNum = 0; pixelNum < scaleFactor * scaleFactor; pixelNum++) {
      // 255 -> no transparency for alpha channel
      colorComponents = colorComponents.concat([...colorsMap[color], 255]);
    }
    let pixels = new ImageData(
      Uint8ClampedArray.from(colorComponents),
      scaleFactor
    );
    this.#sprite = pixels;
  }

  _drawPixel(canvasContext, x, y) {
    canvasContext.putImageData(this.#sprite, x * scaleFactor, y * scaleFactor);
  }
}
