import * as THREE from 'three'
import * as CANNON from "cannon-es"
import Experience from "../../Experience"
import PhyTime from '../../Utils/PhyTime'


const clock = new THREE.Clock()
let oldElapsed = 0

export default class Physics {
    constructor() {
        this.experience = new Experience()
        this.time = this.experience.phyTime
        this.phy_world = new CANNON.World()
        
        this.phy_world.gravity.set(0,-5, 0)
        

        // this.controller = new Controller(this.phyCharacter)

        this.setMaterial()

        this.time.on('tick', () => {
            this.update()
        })
    }

    setMaterial() {
        
    }
    
    update() {
        this.phy_world.fixedStep()
    }
}