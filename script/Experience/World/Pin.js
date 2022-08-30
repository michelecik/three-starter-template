import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import Experience from "../Experience"
import colors from '../colors'

export default class Pin {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.phyWorld = this.experience.phyWorld
        this.phyTime = this.experience.phyTime

        this.radiusTop = .1
        this.radiusBottom = .25
        this.height = 1
        this.radialSegments = 10
        this.heightSegments = 10


        this.phyTime.on('tick', () => {
            this.update()
        })

        this.setGeometry()
        this.setMaterial()
        this.setMesh()
        this.setShape()
        this.setBody()
    }

    setGeometry() {
        this.geometry = new THREE.CylinderGeometry(this.radiusTop, this.radiusBottom, this.height, this.radialSegments, this.heightSegments, false,)
    }

    setMaterial() {
        this.material = new THREE.MeshStandardMaterial({
            color: colors.coins
        })
    }

    setMesh() {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.scene.add(this.mesh)
    }

    setShape() {
        this.shape = new CANNON.Cylinder(this.radiusTop, this.radiusBottom, this.height, this.radialSegments)
    }

    setBody() {
        this.body = new CANNON.Body({
            mass: .1,
            shape: this.shape
        })

        this.body.position = new CANNON.Vec3(0,5,-4)

        this.phyWorld.instance.addBody(this.body)
    }

    update() {
        this.mesh.position.copy(this.body.position)
        this.mesh.quaternion.copy(this.body.quaternion)
    }
}