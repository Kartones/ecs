import { BaseComponent } from "./BaseComponent.mjs";

const colorsMap = {
  red: [255, 0, 0],
  blue: [0, 0, 255],
};

export class RenderComponent extends BaseComponent {
  sprite;

  constructor(entityId, color, config) {
    super(entityId);
    if (!colorsMap[color]) {
      throw new Error(`Color '${color}' is not supported`);
    }

    this._initSprite(color, config.scaleFactor);
  }

  _initSprite(color, scaleFactor) {
    let colorComponents = new Array();
    for (let pixelNum = 0; pixelNum < scaleFactor * scaleFactor; pixelNum++) {
      // 255 -> no transparency for alpha channel
      colorComponents = colorComponents.concat([...colorsMap[color], 255]);
    }
    let pixels = new ImageData(
      Uint8ClampedArray.from(colorComponents),
      scaleFactor
    );
    this.sprite = pixels;
  }
}
