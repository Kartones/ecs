import { randomAlphanumericstring } from "../utils/random.mjs";

export class EntityManager {
  #entities;

  constructor() {
    this.#entities = [];
  }

  addEntity(entityidPrefix = "") {
    const entityId = `${
      entityidPrefix ? entityidPrefix + ":" : ""
    }${randomAlphanumericstring()}`;

    this.#entities.push(entityId);

    return entityId;
  }

  entityExists(entityId) {
    return this.#entities.includes(entityId);
  }
}
