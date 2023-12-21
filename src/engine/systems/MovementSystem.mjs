import { BaseSystem } from "./BaseSystem.mjs";

export class MovementSystem extends BaseSystem {
  constructor(componentManager, logger) {
    super(componentManager, logger);
  }

  update() {
    Object.keys(this.componentManager.components).forEach((entityId) => {
      const positionComponent = this.componentManager.getComponentByType(
        entityId,
        "PositionComponent"
      );
      if (!positionComponent) {
        return;
      }

      positionComponent.x += positionComponent.velocity.x;
      positionComponent.y += positionComponent.velocity.y;

      this.logger.log(
        `Entity ${entityId} position is (${positionComponent.x}, ${positionComponent.y})`
      );
    });
  }
}
