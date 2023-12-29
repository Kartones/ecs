function stringifyReplacer(key, value) {
  // skip certain fields
  if (key === "logger") {
    return undefined;
  }
  return value;
}

export class BaseSystem {
  type;
  logger;
  componentManager;

  constructor(componentManager, logger) {
    this.type = this.constructor.name;
    this.logger = logger;
    this.componentManager = componentManager;
  }

  info(humanReadable = false) {
    this.logger.log(
      JSON.stringify(this, stringifyReplacer, humanReadable ? 2 : 0)
    );
  }
}
