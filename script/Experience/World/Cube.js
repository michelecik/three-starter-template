import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import Experience from '../Experience'
import colors from '../colors'


export default class Cube {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.phyWorld = this.experience.phyWorld
        this.phyTime = this.experience.phyTime

        this.resources = this.experience.resources

        this.phyTime.on('tick', () => {
            this.update()
        })

        this.width = .5
        this.height = .5
        this.depth = .5

        this.setGeometry()
        this.setMaterial()
        this.setTexture()
        this.setMesh()

        this.setShape()
        this.setPhyMaterial()
        this.setBody()
    }

    setGeometry() {
        this.geometry = new THREE.BoxGeometry(this.width, this.height, this.depth)
    }

    setMaterial() {
        this.material = new THREE.MeshStandardMaterial({
            color: colors.character
        })
    }

    setTexture() {
        this.material.map = this.resources.items.basketball
    }

    setMesh() {
        this.mesh = new THREE.Mesh(this.geometry, this.mesh)
        this.scene.add(this.mesh)
    }

    setShape() {
        this.shape = new CANNON.Box(
            new CANNON.Vec3(this.width/2, this.height/2, this.depth/2)
        )
    }

    setPhyMaterial() {

    }

    setBody() {
        this.body = new CANNON.Body({
            mass: 1,
            shape: this.shape,
            material: this.phyWorld.plasticMaterial
        })

        this.body.position.set(0,4,4)
        this.phyWorld.instance.addBody(this.body)
    }

    update() {
        this.mesh.position.copy(this.body.position)
        this.mesh.quaternion.copy(this.body.quaternion)
    }
}