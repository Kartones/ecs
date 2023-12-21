import { PositionComponent } from "./engine/components/PositionComponent.mjs";
import { RenderComponent } from "./engine/components/RenderComponent.mjs";
import { InputSystem } from "./engine/systems/InputSystem.mjs";
import { MovementSystem } from "./engine/systems/MovementSystem.mjs";
import { RenderSystem } from "./engine/systems/RenderSystem.mjs";
import { ComponentManager } from "./engine/managers/ComponentManager.mjs";
import { SystemManager } from "./engine/managers/SystemManager.mjs";
import { EntityManager } from "./engine/managers/EntityManager.mjs";

const logger = console;
const componentManager = new ComponentManager();
const entityManager = new EntityManager();
const systemManager = new SystemManager();

// Entities with desired components
const entity1Id = entityManager.addEntity("E1");

const transformComponent1 = new PositionComponent(0, 0);
const renderComponent1 = new RenderComponent("red");
componentManager.addComponent(entity1Id, transformComponent1);
componentManager.addComponent(entity1Id, renderComponent1);

const entity2Id = entityManager.addEntity("E2");
console.log("TEST: ", entityManager.entityExists(entity2Id));

const transformComponent2 = new PositionComponent(5, 5);
const renderComponent4 = new RenderComponent("blue");
componentManager.addComponent(entity2Id, transformComponent2);
componentManager.addComponent(entity2Id, renderComponent4);

// Systems
const inputSystem = new InputSystem(componentManager, logger);
const movementSystem = new MovementSystem(componentManager, logger);
const renderSystem = new RenderSystem(componentManager, logger);

systemManager.addSystem(inputSystem);
systemManager.addSystem(movementSystem);
systemManager.addSystem(renderSystem);

systemManager.info();

// should be inside the game loop
systemManager.update();
systemManager.update();

systemManager.info();
