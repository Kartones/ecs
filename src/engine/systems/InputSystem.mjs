import { BaseSystem } from "./BaseSystem.mjs";

export class InputSystem extends BaseSystem {
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

      // TODO: this should be based on user input
      positionComponent.velocity.x += 1;
      positionComponent.velocity.y += 1;

      this.logger.log(
        `Entity ${entityId} velocity is (${positionComponent.velocity.x}, ${positionComponent.velocity.y})`
      );
    });
  }
}
