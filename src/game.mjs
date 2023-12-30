import { PositionComponent } from "./engine/components/PositionComponent.mjs";
import { RenderComponent } from "./engine/components/RenderComponent.mjs";
import { WorldComponent } from "./engine/components/WorldComponent.mjs";
import { InputSystem } from "./engine/systems/InputSystem.mjs";
import { CenitalView2DMovementSystem as MovementSystem } from "./engine/systems/CenitalView2DMovementSystem.mjs";
import { RenderSystem } from "./engine/systems/RenderSystem.mjs";
import { ComponentManager } from "./engine/managers/ComponentManager.mjs";
import { SystemManager } from "./engine/managers/SystemManager.mjs";
import { EntityManager } from "./engine/managers/EntityManager.mjs";
import { NoConsole } from "./engine/utils/NoConsole.mjs";

const RESOLUTION_WIDTH = 800;
const RESOLUTION_HEIGHT = 600;
const SCALE_FACTOR = 4;
// note that it's used in a setTimeout, so it's in milliseconds, but not guaranteed to be accurate
const ENGINE_SPEED = 250;
const MOVEMENT_SPEED = 1;
const BOUNDARIES = {
  x: Math.floor(RESOLUTION_WIDTH / SCALE_FACTOR),
  y: Math.floor(RESOLUTION_HEIGHT / SCALE_FACTOR),
};

export class Game {
  #logger;
  #componentManager;
  #systemManager;
  #entityManager;
  #worldEntityId;
  #entity1Id;
  #entity2Id;
  #speed;
  #gameUpdateId;

  constructor(config = {}) {
    config = {
      canvasWidth: RESOLUTION_WIDTH,
      canvasHeight: RESOLUTION_HEIGHT,
      scaleFactor: SCALE_FACTOR,
      engineSpeed: ENGINE_SPEED,
      loggingEnabled: true,
      ...config,
    };

    this.#speed = config.engineSpeed;

    this.#logger = config.loggingEnabled ? console : new NoConsole();
    this.#componentManager = new ComponentManager();
    this.#systemManager = new SystemManager();
    this.#entityManager = new EntityManager();

    // Entities & components
    this.#worldEntityId = this.#entityManager.addEntity("W");
    this.#entity1Id = this.#entityManager.addEntity("E");
    this.#entity2Id = this.#entityManager.addEntity("E");

    const worldComponent = new WorldComponent(
      this.#worldEntityId,
      BOUNDARIES.x,
      BOUNDARIES.y
    );
    const positionComponent1 = new PositionComponent(this.#entity1Id, 50, 50);
    const positionComponent2 = new PositionComponent(this.#entity2Id, 100, 75);
    const renderComponent1 = new RenderComponent(this.#entity1Id, "red", {
      scaleFactor: config.scaleFactor,
    });
    const renderComponent2 = new RenderComponent(this.#entity2Id, "blue", {
      scaleFactor: config.scaleFactor,
    });

    this.#componentManager.addComponent(worldComponent);
    this.#componentManager.addComponent(positionComponent1);
    this.#componentManager.addComponent(renderComponent1);
    this.#componentManager.addComponent(positionComponent2);
    this.#componentManager.addComponent(renderComponent2);

    // Systems
    const inputSystem = new InputSystem(
      this.#componentManager,
      {
        movementSpeed: MOVEMENT_SPEED,
      },
      this.#logger
    );
    const movementSystem = new MovementSystem(
      this.#componentManager,
      {}, // No config
      this.#logger
    );
    const renderSystem = new RenderSystem(
      this.#componentManager,
      {
        canvasId: config.canvasId,
        canvasWidth: config.canvasWidth,
        canvasHeight: config.canvasHeight,
        scaleFactor: config.scaleFactor,
      },
      this.#logger
    );

    this.#systemManager.addSystem(inputSystem);
    this.#systemManager.addSystem(movementSystem);
    this.#systemManager.addSystem(renderSystem);

    this.#systemManager.info();
  }

  start() {
    this._update();
  }

  _update() {
    this.#systemManager.update();

    this.#gameUpdateId = setTimeout(this._update.bind(this), this.#speed);
  }
}
