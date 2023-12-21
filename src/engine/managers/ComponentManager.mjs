export class ComponentManager {
  constructor() {
    this.components = {};
  }

  addComponent(entityId, component) {
    if (!this.components[entityId]) {
      this.components[entityId] = [];
    }
    this.components[entityId].push(component);
  }

  getComponents(entityId) {
    return this.components[entityId] || [];
  }

  getComponentByType(entityId, componentType) {
    const components = this.getComponents(entityId);
    return components.find((component) => component.type === componentType);
  }
}
