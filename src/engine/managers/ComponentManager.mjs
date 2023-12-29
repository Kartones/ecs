export class ComponentManager {
  #componentsByEntity;

  constructor() {
    this.#componentsByEntity = {};
  }

  addComponent(component) {
    if (!this.#componentsByEntity[component.entityId]) {
      this.#componentsByEntity[component.entityId] = [];
    }
    this.#componentsByEntity[component.entityId].push(component);
  }

  getEntityComponents(entityId) {
    return this.#componentsByEntity[entityId] || [];
  }

  getEntityComponentByType(entityId, componentType) {
    const components = this.getEntityComponents(entityId);
    return components.find((component) => component.type === componentType);
  }

  getComponentsByType(componentType) {
    const components = [];

    Object.values(this.#componentsByEntity).forEach((entityComponents) => {
      entityComponents.forEach((component) => {
        if (componentType === component.type) {
          components.push(component);
          // For now, assume that there is only one component of each type per entity
          return;
        }
      });
    });

    return components;
  }

  // Intended to be used with 2+ component types, due to the extra complexity
  getComponentsByTypes(...componentTypes) {
    const componentsMapTemplate = componentTypes.reduce(
      (acc, componentType) => {
        acc[componentType] = undefined;
        return acc;
      },
      {}
    );

    const componentsByTypes = [];

    Object.values(this.#componentsByEntity).forEach((entityComponents) => {
      let foundComponents = 0;
      const componentsMap = { ...componentsMapTemplate };

      entityComponents.forEach((component) => {
        if (componentTypes.includes(component.type)) {
          componentsMap[component.type] = component;
          foundComponents++;
        }
      });

      if (foundComponents === componentTypes.length) {
        componentsByTypes.push(componentsMap);
      }
    });

    return componentsByTypes;
  }
}
