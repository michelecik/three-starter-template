import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import Experience from '../Experience'
import colors from '../colors'

export default class Ball {
    constructor() {
        
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.phyWorld = this.experience.phyWorld
        this.phyTime = this.experience.phyTime

        this.positionY = 4
        this.radius = .25
        this.segments = 20

        this.phyTime.on('tick', () => {
            this.update()
        })

        this.setGeometry()
        this.setMaterial()
        this.setMesh()

        this.setShape()
        this.setPhyMaterial()
        this.setBody()
    }

    setGeometry() {
        this.geometry = new THREE.SphereGeometry(this.radius, this.segments, this.segments)
    }

    setMaterial() {
        this.material = new THREE.MeshStandardMaterial({
            color: colors.character
        })
    }

    setMesh() {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        
        this.mesh.receiveShadow = true
        this.mesh.castShadow = true
        this.scene.add(this.mesh)
    }

    setShape() {
        this.shape = new CANNON.Sphere(this.radius)
    }

    setPhyMaterial() {
        
    }

    setBody() {
        this.body = new CANNON.Body({
            mass: 1,
            shape: this.shape,
            material: this.phyWorld.plasticMaterial
        })

        this.body.position = new CANNON.Vec3(0,4,4)
        this.phyWorld.instance.addBody(this.body)
    }

    update() {
        this.mesh.position.copy(this.body.position)
        this.mesh.quaternion.copy(this.body.quaternion)
    }
}