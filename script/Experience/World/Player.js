import * as THREE from 'three'
import * as CANNON from 'cannon-es'


let instance = null

export default class Player {
    constructor() {

        window.addEventListener('keypress', (e) => {
            // this.resetForces()
            
            switch(e.code) {
                case 'Space':
                    this.player.body.applyForce(
                        new CANNON.Vec3(0, 400, -400),
                    )
                    this.player.body.angularVelocity.set(-100,0,0)
                    break;
                case 'KeyB':
                    this.player.body.applyForce(
                        new CANNON.Vec3(0, -400, 0)
                    )
                    break;
                case 'KeyR':
                    this.resetForces()
                    this.player.body.position.set(0, 2.5, 4)
                    break;
            }
        })
    }

    

    assign(player) {
        this.player = player

        this.player.setTexture()

        this.player.body.position.set(0, 2.5, 4)
    }

    resetForces() {
        this.player.body.velocity.set(0,0,0)
        this.player.body.angularVelocity.set(0,0,0)
    }

}