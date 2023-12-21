import { BaseComponent } from "./BaseComponent.mjs";

export class PositionComponent extends BaseComponent {
  x;
  y;
  velocity;

  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;

    this.velocity = {
      x: 0,
      y: 0,
    };
  }
}
