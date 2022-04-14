class Game {

  constructor(canvasElement, width, height) {

    this.canvasElement = canvasElement

    this.canvasContext = canvasElement.getContext("2d")

    

    this.width = width

    this.height = height

    

    this.centerX = this.width / 2

    this.centerY = this.height / 2

    

    this.gameEntities = []

    

    this.backgroundColor = "transparent"

    this.backgroundSprite = "thisImageDoesntActuallyExist.png"

  }

  

  update() {

    this.canvasElement.width = this.width

    this.canvasElement.height = this.height

    

    this.canvasContext.fillStyle = this.backgroundColor

    this.canvasContext.fillRect(0, 0, this.width, this.height)

    try {

      this.canvasContext.drawImage(this.backgroundSprite, 0, 0, this.width, this.height)

    } catch(e) {

      // Nothing

    }

    

    this.centerX = this.width / 2

    this.centerY = this.height / 2

    

    this.gameEntities.forEach(entitie => {

      entitie.draw()

      

      entitie.position.x += entitie.velocity.x

      entitie.position.y += entitie.velocity.y

      

      if(entitie.has.gravity) {

        entitie.velocity.y += entitie.weight

      }

      

      if (entitie.collideWithWalls.left) {

        if (entitie.position.x < 0) {

          entitie.position.x = 0

          entitie.velocity.x = 0

        }

      }

      

      if (entitie.collideWithWalls.up) {

        if (entitie.position.y < 0) {

          entitie.position.y = 0

          entitie.velocity.y = 0

        }

      }

      

      if (entitie.collideWithWalls.right) {

        if (entitie.position.x > this.width - entitie.scale.x) {

          entitie.position.x = this.width - entitie.scale.x

          entitie.velocity.x = 0

        }

      }

      

      if (entitie.collideWithWalls.down) {

        if (entitie.position.y > this.height - entitie.scale.y) {

          entitie.position.y = this.height - entitie.scale.y

          entitie.velocity.y = 0

        }

      }

      

      if(entitie.collideWithWalls.all) {

        if(entitie.position.x < 0) {

          entitie.position.x = 0

          entitie.velocity.x = 0

        }

        

        if (entitie.position.y < 0) {

          entitie.position.y = 0

          entitie.velocity.y = 0

        }

        

        if (entitie.position.x > this.width - entitie.scale.x) {

          entitie.position.x = this.width - entitie.scale.x

          entitie.velocity.x = 0

        }

        

        if(entitie.position.y > this.height - entitie.scale.y) {

          entitie.position.y = this.height - entitie.scale.y

          entitie.velocity.y = 0

        }

      }

    })

  }

  

  setBackground(background, type) {

    if(type === "color") this.backgroundColor = background

    

    else if(type === "sprite") this.backgroundSprite = background

    

    else this.backgroundColor = "transparent"

  }

  

  addEntitie(entitie) {

    this.gameEntities.push(entitie)

  }

  

  removeEntitie(entitie) {

    var where = this.gameEntities.indexOf(entitie)

    

    this.gameEntities.forEach(ent => {

      if(ent === entitie) {

        this.gameEntities.splice(where, 1)

      }

    })

  }

}

class Entitie {

  constructor(sunGame, position = {

    x: 0,

    y: 0

  }, scale = {

    x: 0,

    y: 0

  }, velocity = {

    x: 0,

    y: 0

  }, entitieType = "rect") {

    this.sunGame = sunGame

    

    this.position = position

    this.scale = scale

    this.velocity = velocity

    

    this.weight = 1

    

    this.has = {

      gravity: false,

    }

    

    this.collideWithWalls = {

      left: false,

      up: false,

      right: false,

      down: false,

      all: false

    }

    

    this.entitieType = entitieType

    this.entitieColor = "gray"

    this.sprite = "thisImageDoesntActuallyExist.png"

  }

  

  draw() {

    if(this.entitieType === "rect") {

      this.sunGame.canvasContext.fillStyle = this.entitieColor

      this.sunGame.canvasContext.fillRect(this.position.x, this.position.y, this.scale.x, this.scale.y)

      

      this.sunGame.canvasContext.fillStyle = "red"

    }

    

    else if(this.entitieType === "sprite") {

      this.sunGame.canvasContext.drawImage(this.sprite, this.position.x, this.position.y, this.scale.x, this.scale.y)

    }

    

    else {

      this.sunGame.canvasContext.fillStyle = this.entitieColor

      this.sunGame.canvasContext.fillRect(this.position.x, this.position.y, this.scale.x, this.scale.y)

    }

  }

  

  jump(jumpForce) {

    this.velocity.y = -jumpForce

  }

  

  collidingWith(entitie) {

    if(this.position.x + this.scale.x > entitie.position.x && this.position.y + this.scale.y > entitie.position.y && this.position.x < entitie.position.x + entitie.scale.x && this.position.y < entitie.position.y + entitie.scale.y) {

      return true

    }

    

    return false

  }

}

