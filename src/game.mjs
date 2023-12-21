import { PositionComponent } from "./engine/components/PositionComponent.mjs";
import { RenderComponent } from "./engine/components/RenderComponent.mjs";
import { InputSystem } from "./engine/systems/InputSystem.mjs";
import { MovementSystem } from "./engine/systems/MovementSystem.mjs";
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
      ...config,
    };

    this.#speed = config.engineSpeed;

    this.#logger = new NoConsole();
    // this.logger = console;
    this.#componentManager = new ComponentManager();
    this.#systemManager = new SystemManager();
    this.#entityManager = new EntityManager();

    // Entities & components
    this.#entity1Id = this.#entityManager.addEntity("E1");
    this.#entity2Id = this.#entityManager.addEntity("E2");

    const positionComponent1 = new PositionComponent(50, 50);
    const positionComponent2 = new PositionComponent(100, 75);
    const renderComponent1 = new RenderComponent("red", {
      scaleFactor: config.scaleFactor,
    });
    const renderComponent2 = new RenderComponent("blue", {
      scaleFactor: config.scaleFactor,
    });

    this.#componentManager.addComponent(this.#entity1Id, positionComponent1);
    this.#componentManager.addComponent(this.#entity1Id, renderComponent1);
    this.#componentManager.addComponent(this.#entity2Id, positionComponent2);
    this.#componentManager.addComponent(this.#entity2Id, renderComponent2);

    // Systems
    const inputSystem = new InputSystem(
      this.#componentManager,
      {
        boundaries: BOUNDARIES,
        movementSpeed: MOVEMENT_SPEED,
      },
      this.#logger
    );
    const movementSystem = new MovementSystem(
      this.#componentManager,
      {
        boundaries: BOUNDARIES,
      },
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
