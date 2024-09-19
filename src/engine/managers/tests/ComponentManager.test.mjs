import assert from "node:assert";
import { describe, it } from "node:test";

import { ComponentManager } from "../ComponentManager.mjs";
import { DummyComponent } from "../../components/DummyComponent.mjs";

describe("ComponentManager", () => {
  describe("Adding components", () => {
    it("Creates an entity, if not existed, and adds a component to it", () => {
      const componentManager = new ComponentManager();
      const entityId = "A";
      const dummyComponent = new DummyComponent(entityId);

      assert(Object.keys(componentManager.components).length === 0);

      componentManager.addComponent(dummyComponent);

      assert(Object.keys(componentManager.components).length === 1);
      assert(componentManager.components[entityId].length === 1);
      assert(componentManager.components[entityId][0] === dummyComponent);
    });

    it("Does not create again an entity, if already existed", () => {
      const componentManager = new ComponentManager();
      const entityId = "A";
      const aDummyComponent = new DummyComponent(entityId);
      const anotherDummyComponent = new DummyComponent(entityId);

      componentManager.addComponent(aDummyComponent);
      assert(Object.keys(componentManager.components).length === 1);

      componentManager.addComponent(anotherDummyComponent);
      assert(Object.keys(componentManager.components).length === 1);
    });

    it("Adds components to an existing entity, if already existed", () => {
      const componentManager = new ComponentManager();
      const entityId = "A";
      const aDummyComponent = new DummyComponent(entityId);
      const anotherDummyComponent = new DummyComponent(entityId);

      componentManager.addComponent(aDummyComponent);
      assert(componentManager.components[entityId].length === 1);

      componentManager.addComponent(anotherDummyComponent);
      assert(componentManager.components[entityId].length === 2);
    });

    it("Creates new entities when proceeds", () => {
      const componentManager = new ComponentManager();
      const entityId = "A";
      const aDummyComponent = new DummyComponent(entityId);
      const anotherEntityId = "B";
      const anotherDummyComponent = new DummyComponent(anotherEntityId);

      componentManager.addComponent(aDummyComponent);
      componentManager.addComponent(anotherDummyComponent);
      assert(Object.keys(componentManager.components).length === 2);
    });

    it("Adds components to their corresponding entities", () => {
      const componentManager = new ComponentManager();
      const entityId = "A";
      const aDummyComponent = new DummyComponent(entityId);
      const anotherEntityId = "B";
      const anotherDummyComponent = new DummyComponent(anotherEntityId);
      const aThirdDummyComponent = new DummyComponent(anotherEntityId);

      componentManager.addComponent(aDummyComponent);
      componentManager.addComponent(anotherDummyComponent);
      componentManager.addComponent(aThirdDummyComponent);
      assert(componentManager.components[entityId].length === 1);
      assert(componentManager.components[anotherEntityId].length === 2);
    });
  });
});
