class Game {

  constructor(canvasElement, width, height) {

    this.canvasElement = canvasElement

    this.canvasContext = canvasElement.getContext("2d")

    

    this.width = width

    this.height = height

    

    this.centerX = this.width / 2

    this.centerY = this.height / 2

    

    this.gameEntitys = []

    

    this.backgroundColor = "transparent"

    

    this.backgroundSprite = "thisImageDoesntActuallyExist.png"

    this.backgroundRepeatX = false

    this.backgroundRepeatY = false

    this.backgroundFillX = true

    this.backgroundFillY = true

  }

  

  update() {

    this.canvasElement.width = this.width

    this.canvasElement.height = this.height

    

    this.canvasContext.fillStyle = this.backgroundColor

    this.canvasContext.fillRect(0, 0, this.width, this.height)

    

    var x = this.width / this.backgroundSprite.width

    var y = this.width / this.backgroundSprite.width

    

    for(let i = 0; i < x; i++) {

      for(let j = 0; j < y; j++) {

        this.canvasContext.drawImage(this.backgroundSprite, this.backgroundRepeatX ? this.backgroundSprite.width * i : 0, this.backgroundRepeatY ? this.backgroundSprite.height * j : 0, this.backgroundFillX ? this.width : this.backgroundSprite.width, this.backgroundFillY ? this.height : this.backgroundSprite.height)

      }

    }

    

    this.centerX = this.width / 2

    this.centerY = this.height / 2

    

    this.gameEntitys.forEach(entity => {

      entity.draw()

      

      entity.position.x += entity.velocity.x

      entity.position.y += entity.velocity.y

      

      if(entity.has.gravity) {

        entity.velocity.x += entity.weight.x

        entity.velocity.y += entity.weight.y

      }

      

      if (entity.collideWithWalls.left) {

        if (entity.position.x < 0) {

          entity.position.x = 0

          entity.velocity.x = 0

        }

      }

      

      if (entity.collideWithWalls.up) {

        if (entity.position.y < 0) {

          entity.position.y = 0

          entity.velocity.y = 0

        }

      }

      

      if (entity.collideWithWalls.right) {

        if (entity.position.x > this.width - entity.scale.x) {

          entity.position.x = this.width - entity.scale.x

          entity.velocity.x = 0

        }

      }

      

      if (entity.collideWithWalls.down) {

        if (entity.position.y > this.height - entity.scale.y) {

          entity.position.y = this.height - entity.scale.y

          entity.velocity.y = 0

        }

      }

      

      if(entity.collideWithWalls.all) {

        if(entity.position.x < 0) {

          entity.position.x = 0

          entity.velocity.x = 0

        }

        

        if (entity.position.y < 0) {

          entity.position.y = 0

          entity.velocity.y = 0

        }

        

        if (entity.position.x > this.width - entity.scale.x) {

          entity.position.x = this.width - entity.scale.x

          entity.velocity.x = 0

        }

        

        if(entity.position.y > this.height - entity.scale.y) {

          entity.position.y = this.height - entity.scale.y

          entity.velocity.y = 0

        }

      }

    })

  }

  

  setBackground(background, type) {

    if(type === "color") this.backgroundColor = background

    

    else if(type === "sprite") this.backgroundSprite = background

    

    else this.backgroundColor = "transparent"

  }

  

  addEntity(entity) {

    this.gameEntitys.push(entity)

  }

  

  removeEntity(entity) {

    this.gameEntitys.forEach((ent, where) => {

      if(ent === entity) {

        this.gameEntitys.splice(where, 1)

      }

    })

  }

}

class Entity {

  constructor(sunGame, position = {

    x: 0,

    y: 0

  }, scale = {

    x: 0,

    y: 0

  }, velocity = {

    x: 0,

    y: 0

  }, entityType = "rect") {

    this.sunGame = sunGame

    

    this.position = position

    this.scale = scale

    this.velocity = velocity

    this.weight = {

      x: 0,

      y: 1

    }

    

    this.has = {

      gravity: false

    }

    

    this.collideWithWalls = {

      left: false,

      up: false,

      right: false,

      down: false,

      all: false

    }

    

    this.entityType = entitieType

    this.entityColor = "gray"

    this.sprite = "thisImageDoesntActuallyExist.png"

  }

  

  draw() {

    if(this.entityType === "rect") {

      this.sunGame.canvasContext.fillStyle = this.entityColor

      this.sunGame.canvasContext.fillRect(this.position.x, this.position.y, this.scale.x, this.scale.y)

      

      this.sunGame.canvasContext.fillStyle = "red"

    }

    

    else if(this.entityType === "sprite") {

      this.sunGame.canvasContext.drawImage(this.sprite, this.position.x, this.position.y, this.scale.x, this.scale.y)

    }

    

    else {

      this.sunGame.canvasContext.fillStyle = this.entityColor

      this.sunGame.canvasContext.fillRect(this.position.x, this.position.y, this.scale.x, this.scale.y)

    }

  }

  

  jump(jumpForce) {

    this.velocity.y = -jumpForce

  }

  collidingWith(entity) {

    if(this.position.x + this.scale.x > entity.position.x && this.position.y + this.scale.y > entity.position.y && this.position.x < entity.position.x + entity.scale.x && this.position.y < entity.position.y + entity.scale.y) {

      return true

    }

    

    return false

  }

}

