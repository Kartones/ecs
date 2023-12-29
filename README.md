# ECS Javascript example

## Intro

A basic [Entity Component System](https://en.wikipedia.org/wiki/Entity_component_system) implementation in vanilla Javascript. 

Captures keyboard input and renders basic pixels in an HTML canvas element.

Can try a demo of the `0.0.1` version at https://kartones.net/demos/028/.

## Tech Details

The presence of an `EntityManager` right now is only for keeping track of all existing entities; `ComponentManager` is the one that associates components with an entity (and thus, keeps track of which components each entity has/contains).

Game updates are done via `setTimeout`, so it is not 100% accurate. Currently set to update each `250` milliseconds.

`InputManager` contains a very naive buffer, and is dependant on the engine/game update speed.
