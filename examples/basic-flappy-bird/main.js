// Setup

var canvas = document.querySelector("#game")

var sunGame = new Game(canvas, 300, 300)

sunGame.enemys = []

var gameLost = false

// Loading sprites

var birdSprite = new Image()

birdSprite.src = "./assets/bird.png"

var backgroundSprite = new Image()

backgroundSprite.src = "./assets/background.png"

var pipeDownSprite = new Image()

pipeDownSprite.src = "./assets/pipeDown.png"

var pipeUpSprite = new Image()

pipeUpSprite.src = "./assets/pipeUp.png"

// Creating bird

var bird = new Entitie(sunGame, {

  x: 50, y: sunGame.centerY

}, {

  x: 34, y: 24

}, {

  x: 0, y: 0

}, "sprite")

bird.sprite = birdSprite

bird.has.gravity = true

bird.collideWithWalls.all = true

addEventListener("touchstart", () => {

  bird.jump(12)

  

  if(gameLost) window.location.reload()

})

// Creating enemys

function spawnEnemys() {

  var enemyUp = new Entitie(sunGame, {

    x: sunGame.width + 30, y: -50 + Math.random() * 50

  }, {

    x: 30, y: 100

  }, {

    x: -3, y: 0

  }, "sprite")

  

  var enemyDown = new Entitie(sunGame, {

    x: sunGame.width + 30, y: sunGame.height - (40 + Math.random() * 50)

  }, {

    x: 30, y: 90

  }, {

    x: -3, y: 0

  }, "sprite")

  

  enemyUp.sprite = pipeUpSprite

  enemyDown.sprite = pipeDownSprite

  

  sunGame.addEntitie(enemyUp)

  sunGame.enemys.push(enemyUp)

  

  sunGame.addEntitie(enemyDown)

  sunGame.enemys.push(enemyDown)

}

setInterval(spawnEnemys, 1300)

  

// Creating game loop

function sunGameLoop() {

  sunGame.update()

  

  sunGame.enemys.forEach(enemy => {

    if(bird.collidingWith(enemy)) {

      gameLost = true

    } 

  })

  

  if(!gameLost) requestAnimationFrame(sunGameLoop)

}

// Adding entities

sunGame.addEntitie(bird)

// Running game

sunGame.setBackground(backgroundSprite, "sprite")

sunGameLoop()

