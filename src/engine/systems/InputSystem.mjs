import { BaseSystem } from "./BaseSystem.mjs";

import { POSITION_COMPONENT } from "../components/constants.mjs";

export class InputSystem extends BaseSystem {
  #boundaries;
  #movementSpeed;
  #pressedKeys = new Set();

  constructor(componentManager, config = {}, logger) {
    super(componentManager, logger);

    this.#boundaries = {
      x: config.boundaries.x,
      y: config.boundaries.y,
    };

    this.#movementSpeed = config.movementSpeed || 1;

    this._initInput();
  }

  update() {
    this.componentManager
      .getComponentsByType(POSITION_COMPONENT)
      .forEach((positionComponent) => {
        if (
          this.#pressedKeys.has("KeyA") ||
          this.#pressedKeys.has("ArrowLeft")
        ) {
          positionComponent.velocity.x -= this.#movementSpeed;
        }
        if (
          this.#pressedKeys.has("KeyD") ||
          this.#pressedKeys.has("ArrowRight")
        ) {
          positionComponent.velocity.x += this.#movementSpeed;
        }
        if (this.#pressedKeys.has("KeyW") || this.#pressedKeys.has("ArrowUp")) {
          positionComponent.velocity.y -= this.#movementSpeed;
        }
        if (
          this.#pressedKeys.has("KeyS") ||
          this.#pressedKeys.has("ArrowDown")
        ) {
          positionComponent.velocity.y += this.#movementSpeed;
        }
        if (this.#pressedKeys.has("Space")) {
          positionComponent.velocity.x = 0;
          positionComponent.velocity.y = 0;

          positionComponent.x = Math.floor(Math.random() * this.#boundaries.x);
          positionComponent.y = Math.floor(Math.random() * this.#boundaries.y);
        }

        // this.logger.log(
        //   `${positionComponent.entityId} velocity: (${positionComponent.velocity.x},${positionComponent.velocity.y})`
        // );
      });

    this.#pressedKeys.clear();
  }

  _keyDown(event) {
    this.#pressedKeys.add(event.code);
  }

  _initInput() {
    document.addEventListener("keydown", this._keyDown.bind(this));
  }
}
