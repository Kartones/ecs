export class BaseComponent {
  entityId;
  type;

  constructor(entityId) {
    this.entityId = entityId;
    this.type = this.constructor.name;
  }
}
