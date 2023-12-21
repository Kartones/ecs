import { BaseSystem } from "./BaseSystem.mjs";

export class RenderSystem extends BaseSystem {
  #canvas;
  #canvasContext;
  scaleFactor;

  constructor(componentManager, config, logger) {
    super(componentManager, logger);

    this.scaleFactor = config.scaleFactor;

    this._initScreen(config.canvasId, config.canvasWidth, config.canvasHeight);
  }

  update() {
    this.#canvasContext.clearRect(
      0,
      0,
      this.#canvas.width,
      this.#canvas.height
    );

    Object.keys(this.componentManager.components).forEach((entityId) => {
      const positionComponent = this.componentManager.getComponentByType(
        entityId,
        "PositionComponent"
      );
      const renderComponent = this.componentManager.getComponentByType(
        entityId,
        "RenderComponent"
      );
      if (!(positionComponent && renderComponent)) {
        return;
      }

      this._drawSprite(
        renderComponent.sprite,
        positionComponent.x,
        positionComponent.y
      );
    });
  }

  _initScreen(canvasId, canvasWidth, canvasHeight) {
    this.#canvas = document.getElementById(canvasId);
    this.#canvas.width = canvasWidth;
    this.#canvas.height = canvasHeight;

    this.#canvasContext = this.#canvas.getContext("2d");
    // Don't smooth pixels
    this.#canvasContext.imageSmoothingEnabled = false;
  }

  _drawSprite(sprite, x, y) {
    this.#canvasContext.putImageData(
      sprite,
      x * this.scaleFactor,
      y * this.scaleFactor
    );
  }
}
