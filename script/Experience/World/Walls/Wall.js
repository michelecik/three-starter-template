import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import colors from "../../colors"
import Experience from '../../Experience'

export default class Wall {
    constructor(distance) {

        this.distance = distance ? distance : undefined
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.phyWorld = this.experience.phyWorld
        this.phyTime = this.experience.phyTime

        this.phyTime.on('tick', () => {
            // this.update()
        })

        this.width = 4
        this.height = 1
        this.depth = .5
        this.positionY = 0


        this.setGeometry()
        this.setMaterial()
        this.setMesh()
        this.setShape()
        this.setBody()
    }

    setGeometry() {
        this.geometry = new THREE.BoxGeometry(this.width, this.height, this.depth)
    }

    setMaterial() {
        this.material = new THREE.MeshStandardMaterial({
            color: colors.floor
        })
    }

    setMesh() {
        this.mesh = new THREE.Mesh(this.geometry, this.material)

        this.mesh.castShadow = true
        this.mesh.receiveShadow = true

        // return this.mesh
        // this.scene.add(this.mesh)
        
    }

    setShape() {
        this.shape = new CANNON.Box(new CANNON.Vec3(this.width/2, this.height/2, this.depth/2))
    }

    setBody() {
        this.body = new CANNON.Body({
            shape: this.shape,
            mass: 0,
            material: this.phyWorld.concreteMaterial
        })

        this.body.position.set(0, this.positionY, 0)

        this.phyWorld.instance.addBody(this.body)
    }

    update() {
        // console.log(this.body.position.z)
        // console.log(this.mesh.position)
        this.body.position.z += .01
        
        this.mesh.position.copy(this.body.position)
        this.mesh.quaternion.copy(this.body.quaternion)
    }
}