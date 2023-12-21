# ECS Javascript example

## Intro

A very basic Entity Component System implementation in Javascript.

## Tech Details

The presence of an `EntityManager` right now is only for keeping track of all existing entities; `ComponentManager` is the one that associates components with an entity (and thus, keeps track of which components each entity has/contains).

## TO-DOs / Roadmap

- The architecture and implementation might (probably will) mutate in the future, as I plan to integrate some graphics framework (probably [Phaser](https://phaser.io/))
- `InputSystem` does not really handle any input at the moment, is just an skeleton