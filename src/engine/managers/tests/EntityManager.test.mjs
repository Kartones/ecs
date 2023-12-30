import assert from "node:assert";
import { describe, it } from "node:test";

import { EntityManager, ENTITY_PREFIX_GLUE } from "../EntityManager.mjs";

describe("EntityManager", () => {
  describe("Entities creation", () => {
    it("Allows to specify a prefix when creating an entity", () => {
      const entityManager = new EntityManager();

      const anEntityId = entityManager.addEntity("A");
      const anotherEntityId = entityManager.addEntity("B");

      assert(anEntityId.startsWith(`A${ENTITY_PREFIX_GLUE}`));
      assert(anotherEntityId.startsWith(`B${ENTITY_PREFIX_GLUE}`));
    });

    it("Entity prefix is optional", () => {
      const entityManager = new EntityManager();

      const anEntityId = entityManager.addEntity();
      const anotherEntityId = entityManager.addEntity();

      assert(!anEntityId.startsWith("A"));
      assert(!anotherEntityId.startsWith("B"));
    });

    it("Each new entity gets a different id", () => {
      const entityManager = new EntityManager();

      const anEntityId = entityManager.addEntity();
      const anotherEntityId = entityManager.addEntity();

      assert(anEntityId !== anotherEntityId);
    });

    it("Non-prefix part of entity id is an autoincrement number", () => {
      const entityManager = new EntityManager();

      const anEntityId = entityManager.addEntity();
      const anotherEntityId = entityManager.addEntity();

      assert(anEntityId === "1");
      assert(anotherEntityId === "2");
    });
  });

  describe("Entities existence", () => {
    it("with existing entity, returns true", () => {
      const entityManager = new EntityManager();

      const anEntityId = entityManager.addEntity();

      assert(entityManager.entityExists(anEntityId));
    });

    it("with non-existing entity, returns false", () => {
      const entityManager = new EntityManager();

      assert(!entityManager.entityExists("A"));

      entityManager.addEntity();
      assert(!entityManager.entityExists("A"));
    });
  });
});
