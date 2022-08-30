import * as THREE from 'three'
import * as CANNON from 'cannon-es'


let instance = null

export default class Player {
    constructor() {

        window.addEventListener('keypress', (e) => {
            this.resetForces()
            
            switch(e.code) {
                case 'Space':
                    this.player.body.applyForce(
                        new CANNON.Vec3(0, 400, -400)
                    )
                    break;
                case 'KeyB':
                    this.player.body.applyForce(
                        new CANNON.Vec3(0, 200, 0)
                    )
            }
        })
    }

    assign(player) {
        this.player = player

        this.player.body.position.set(0, 2, 4)
    }

    resetForces() {
        this.player.body.velocity.set(0,0,0)
    }
}