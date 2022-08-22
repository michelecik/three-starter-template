import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import Experience from "../Experience";

export default class Floor {
    constructor(pos) {

        if(pos) {
            this.pos = pos
        } else {
            this.pos = { x: 0, y: 0, z: 0 }
        }
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.phyWorld = this.experience.phyWorld
        this.phyTime = this.experience.phyTime


        this.phyTime.on('tick', () => {
            this.update()
        })

        // this.resources = this.experiece.resources

        this.width = 5,
        this.height = .2
        this.depth = 5

        this.setGeometry()
        this.setTextures()
        this.setMaterial()
        this.setMesh()

        this.setShape()
        this.setBody()
    }

    setGeometry() {
        this.geometry = new THREE.BoxGeometry(this.width, this.height ,this.depth)
    }

    setTextures() {
        // set textures we dont care rn
    }

    setMaterial() {
        this.material = new THREE.MeshStandardMaterial({
            color: 0xCCD5FF
        })
    }

    setMesh() {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        
        this.mesh.receiveShadow = true
        this.scene.add(this.mesh)
    }

    setShape() {
        this.shape = new CANNON.Box(
            new CANNON.Vec3(this.width/2, this.height/2, this.depth/2)
        )
    }

    setBody() {
        this.body = new CANNON.Body(
            {
                mass: 0,
                shape: this.shape,
            }
        )
        this.body.position.set(this.pos.x, this.pos.y, this.pos.z)
        this.phyWorld.addBody(this.body)
    }

    update() {
        this.mesh.position.copy(this.body.position)
        this.mesh.quaternion.copy(this.body.quaternion)
    }
}