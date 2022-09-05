import * as THREE from 'three'
import * as CANNON from 'cannon-es'

import Experience from "../Experience";

export default class Wall {
    constructor(pos,rotate=false) {
        
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.phyWorld = this.experience.phyWorld

        this.position = pos ? pos : new THREE.Vector3(0,0,0)
        this.rotate = rotate

        this.box = {
            width: 10,
            height: 10,
            depth: .1
        }

        this.setMesh()
        this.setBody()
    }

    setMesh() {
        this.mesh = new THREE.Mesh(
            new THREE.PlaneGeometry(this.box.width, this.box.height),
            new THREE.MeshBasicMaterial({
                opacity: 0,
            })
        )
        
        this.mesh.position.set(this.position.x, this.position.y, this.position.z)

        if(this.rotate) {
            this.mesh.rotateY(Math.PI / 2)
        }

        this.scene.add(this.mesh)
    }

    setBody() {
        this.body = new CANNON.Body({
            shape: new CANNON.Plane(),
            mass: 0,
            material: this.phyWorld.concreteMaterial
        })

        this.body.quaternion.copy(this.mesh.quaternion)
        this.body.position.copy(this.mesh.position)
        this.phyWorld.instance.addBody(this.body)
    }
}