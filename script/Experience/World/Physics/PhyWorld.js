import * as THREE from 'three'
import * as CANNON from "cannon-es"
import Experience from "../../Experience"
import PhyTime from '../../Utils/PhyTime'


const clock = new THREE.Clock()
let oldElapsed = 0

export default class PhyWorld {
    constructor() {
        this.experience = new Experience()
        this.time = this.experience.phyTime
        this.instance = new CANNON.World()
        
        this.instance.gravity.set(0,-9.8, 0)
        

        // this.controller = new Controller(this.phyCharacter)

        this.createContactMaterial()

        this.time.on('tick', () => {
            this.update()
        })
    }

    createContactMaterial() {
        this.plasticMaterial = new CANNON.Material('plastic')
        this.concreteMaterial = new CANNON.Material('concrete')

        this.contactMaterial = new CANNON.ContactMaterial(this.plasticMaterial, this.concreteMaterial, {
            friction: 0,
            restitution: .5
        })

        this.instance.addContactMaterial(this.contactMaterial)
    }
    
    update() {
        this.instance.fixedStep()
    }
}