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
var sunGame = new Game(canvaa, gameWidth, gameHeight)
```
- Add some entitie 
```js
var entitie = new Entitie(sunGame, {
  x: 0, y: 0 // Position
}, {
  x: 30, y: 30 // Scale 
}, {
  x: 0, y: 0 // Velocity
}, entityType)
// entity types: rect, sprite 
