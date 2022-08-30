import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import colors from "../../colors"
import Experience from '../../Experience'
import Wall from './Wall'

export default class Walls {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.phyWorld = this.experience.phyWorld
        this.phyTime = this.experience.phyTime

        this.phyTime.on('tick', () => {
            this.update()
        })

        this.walls = []


        this.wallsQty = 10
        this.distance = 3


        // this.createGroup()
        // this.fillGroup()
        // this.addPhysics()

        this.setWalls()
    }


    setWalls() {
        for(let i = 0; i < this.wallsQty; i++) {

            let wall = new Wall()

            wall.body.position.set(0, .4, -this.distance*i)
            
            this.walls.push(wall)
            
            this.scene.add(wall.mesh)
        }
    }


    createGroup() {
        this.group = new THREE.Group()
        this.helper = new THREE.BoxHelper(this.group, 0xff0000)

        this.scene.add(this.group)
        this.scene.add(this.helper)
    }

    fillGroup() {
        for(let i = 0; i < this.wallsQty; i++) {

            let wall = new Wall()

            wall.mesh.position.set(0, .5, this.distance*i)

            console.log(wall.mesh)

            this.group.add(
                wall.mesh
            )
        }


        this.group.position.z = -this.distance * this.wallsQty
        console.log(this.group.position)

        this.scene.add(this.group)
    }

    addPhysics() {

    }

    update() {
        this.walls.forEach(wall => {
            wall.update()
        });
    }
}