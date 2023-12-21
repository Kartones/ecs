import { randomAlphanumericstring } from "../utils/random.mjs";

export class EntityManager {
  constructor() {
    this.entities = {};
  }

  addEntity(entityidPrefix = "") {
    const entityId = `${
      entityidPrefix ? entityidPrefix + ":" : ""
    }${randomAlphanumericstring()}`;

    this.entities[entityId] = {
      id: entityId,
    };

    return entityId;
  }

  entityExists(entityId) {
    return this.entities[entityId] !== undefined;
  }
}
