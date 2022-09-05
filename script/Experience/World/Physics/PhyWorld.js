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
        this.glassMaterial = new CANNON.Material('glass')
        this.metalMaterial = new CANNON.Material('metal')

        this.contactMaterial = new CANNON.ContactMaterial(this.plasticMaterial, this.concreteMaterial, {
            friction: 0.5,
            restitution: .95
        })

        this.glassPlasticContactMaterial = new CANNON.ContactMaterial(this.plasticMaterial, this.glassMaterial, {
            friction: .2,
            restitution: .2
        })

        this.metalPlasticMaterial = new CANNON.ContactMaterial(this.plasticMaterial, this.metalMaterial, {
            friction: 0.1,
            restitution: .2
        })


        this.instance.addContactMaterial(this.contactMaterial)
        this.instance.addContactMaterial(this.glassPlasticContactMaterial)
        this.instance.addContactMaterial(this.metalPlasticMaterial)
    }
    
    update() {
        this.instance.fixedStep()
    }
}