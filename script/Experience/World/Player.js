import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import Experience from '../Experience'


let instance = null

export default class Player {
    constructor() {
        // this.experience = new Experience()

        this.ray = new CANNON.Ray()

        this.direction = 0

        this.positionIndex = 1

        this.directionIndex = 1


        window.addEventListener('keypress', (e) => {
            if (this.player) {
                switch (e.code) {
                    case 'Space':
                        this.player.body.applyForce(
                            new CANNON.Vec3(this.direction, 400, -400)
                        )
                        this.direction = 0
                        this.player.body.angularVelocity.set(25, this.direction, 0)
                        this.player = undefined
                        break;
                    case 'KeyB':
                        this.player.body.applyForce(
                            new CANNON.Vec3(0, -400, 0)
                        )
                        break;
                    case 'KeyR':
                        this.resetForces()
                        this.player.body.position = this.positions[this.positionIndex]
                        break;
                    case 'KeyD':
                        this.resetForces()
                        this.moveRight()
                        break;
                    case 'KeyA':
                        this.resetForces()
                        this.moveLeft()
                }
            }
        })
    }

    moveRight() {
        this.player.body.position.x += .5
        this.player.body.position.y = 2.5
        this.direction -= 25
    }

    moveLeft() {
        this.player.body.position.x -= .5
        this.player.body.position.y = 2.5
        this.direction += 25
    }

    assign(player) {
        this.player = player

        this.player.setTexture()

        this.player.body.position.set(0, 2.5, 4)
    }

    resetForces() {
        this.player.body.velocity.set(0, 0, 0)
        this.player.body.angularVelocity.set(0, 0, 0)
    }

}