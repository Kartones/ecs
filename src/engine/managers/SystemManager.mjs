export class SystemManager {
  #systems;

  constructor() {
    this.#systems = [];
  }

  addSystem(system) {
    this.#systems.push(system);
  }

  update() {
    this.#systems.forEach((system) => {
      system.update();
    });
  }

  info(humanReadable = false) {
    this.#systems.forEach((system) => {
      system.info(humanReadable);
    });
  }
}
