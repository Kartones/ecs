import { BaseSystem } from "./BaseSystem.mjs";

export class RenderSystem extends BaseSystem {
  constructor(componentManager, logger) {
    super(componentManager, logger);
  }

  update() {
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

      this.logger.log(
        `Rendering Entity ${entityId} at (${positionComponent.x}, ${positionComponent.y}) with color '${renderComponent.color}'`
      );
      // TODO: render
    });
  }
}
