import { BaseComponent } from "./BaseComponent.mjs";

export class WorldComponent extends BaseComponent {
  width;
  height;

  constructor(entityId, width, height) {
    super(entityId);
    this.width = width;
    this.height = height;
  }
}
