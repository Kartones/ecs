export const ENTITY_PREFIX_GLUE = ":";

export class EntityManager {
  #entities;

  constructor() {
    this.#entities = [];
  }

  addEntity(entityidPrefix = "") {
    // For now we don't care about id collisions, as we can't delete entities
    const entityId = `${
      entityidPrefix ? entityidPrefix + ENTITY_PREFIX_GLUE : ""
    }${this.#entities.length + 1}`;

    this.#entities.push(entityId);

    return entityId;
  }

  entityExists(entityId) {
    return this.#entities.includes(entityId);
  }
}
