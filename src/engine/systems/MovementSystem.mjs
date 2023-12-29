import { BaseSystem } from "./BaseSystem.mjs";

import { POSITION_COMPONENT } from "../components/constants.mjs";

export class MovementSystem extends BaseSystem {
  #boundaries;

  constructor(componentManager, config = {}, logger) {
    super(componentManager, logger);

    this.#boundaries = {
      x: config.boundaries.x,
      y: config.boundaries.y,
    };
  }

  update() {
    this.componentManager
      .getComponentsByType(POSITION_COMPONENT)
      .forEach((positionComponent) => {
        positionComponent.x += positionComponent.velocity.x;
        positionComponent.y += positionComponent.velocity.y;

        if (positionComponent.x < 0) {
          positionComponent.x = 0;
          positionComponent.velocity.x = 0;
        }
        if (positionComponent.y < 0) {
          positionComponent.y = 0;
          positionComponent.velocity.y = 0;
        }
        if (positionComponent.x > this.#boundaries.x) {
          positionComponent.x = this.#boundaries.x - 1;
          positionComponent.velocity.x = 0;
        }
        if (positionComponent.y > this.#boundaries.y) {
          positionComponent.y = this.#boundaries.y - 1;
          positionComponent.velocity.y = 0;
        }

        this.logger.log(
          `${positionComponent.entityId} position: (${positionComponent.x},${positionComponent.y})`
        );
      });
  }
}
