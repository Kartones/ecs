import { BaseSystem } from "./BaseSystem.mjs";

import {
  POSITION_COMPONENT,
  WORLD_COMPONENT,
} from "../components/constants.mjs";

export class MovementSystem extends BaseSystem {
  constructor(componentManager, config = {}, logger) {
    super(componentManager, logger);
  }

  update() {
    const worldComponent =
      this.componentManager.getComponentByType(WORLD_COMPONENT);

    this.componentManager
      .getComponentsByType(POSITION_COMPONENT)
      .forEach((positionComponent) => {
        if (this._canMoveXAxis(positionComponent, worldComponent)) {
          positionComponent.x += positionComponent.velocity.x;
        } else {
          if (positionComponent.velocity.x > 0) {
            positionComponent.velocity.x--;
          } else if (positionComponent.velocity.x < 0) {
            positionComponent.velocity.x++;
          }
        }
        if (this._canMoveYAxis(positionComponent, worldComponent)) {
          positionComponent.y += positionComponent.velocity.y;
        } else {
          if (positionComponent.velocity.y > 0) {
            positionComponent.velocity.y--;
          } else if (positionComponent.velocity.y < 0) {
            positionComponent.velocity.y++;
          }
        }

        this.logger.log(
          `${positionComponent.entityId} position: (${positionComponent.x},${positionComponent.y})`
        );
      });
  }

  _canMoveXAxis(positionComponent, worldComponent) {
    return (
      positionComponent.velocity.x === 0 ||
      (positionComponent.x + positionComponent.velocity.x >= 0 &&
        positionComponent.x + positionComponent.velocity.x <
          worldComponent.width)
    );
  }

  _canMoveYAxis(positionComponent, worldComponent) {
    return (
      positionComponent.velocity.y === 0 ||
      (positionComponent.y + positionComponent.velocity.y >= 0 &&
        positionComponent.y + positionComponent.velocity.y <
          worldComponent.height)
    );
  }
}
