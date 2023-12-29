import { BaseComponent } from "./BaseComponent.mjs";

export class PositionComponent extends BaseComponent {
  x;
  y;
  velocity;

  constructor(entityId, x, y) {
    super(entityId);
    this.x = x;
    this.y = y;

    this.velocity = {
      x: 0,
      y: 0,
    };
  }
}
