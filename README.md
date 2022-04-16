# sun
A javascript library for creating games
 
# Installation 
- Download the file **sun.js** in **wah-creator/sun/lib/sun.js**
- Add the file to your project 
- Put this in your HTML head tag

```html
<script src="sun.js"></script>
```

# Usage 
- Create game 
```js
var sunGame = new Game(canvas, gameWidth, gameHeight)
```
- Add some entity
```js
var entitie = new Entity(sunGame, {
  x: 0, y: 0 // Position
}, {
  x: 30, y: 30 // Scale 
}, {
  x: 0, y: 0 // Velocity
}, entityType)

// entity types: rect, sprite 
```
- Add the entity to the game 
```js
sunGame.addEntity(entity)
```
- Create game loop
```js
function gameLoop() {
  sunGame.update()

  requestAnimationFrame(gameLoop)
}
gameLoop()
```
- Enjoy your square without movement.
