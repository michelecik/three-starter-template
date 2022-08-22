import * as THREE from 'three'

import Experience from '../Experience';
import EventEmitter from './EventEmitter';

export default class CollisionManager extends EventEmitter {
    constructor(character, targets) {
        super()
        this.character = character
        this.targets = targets
        
        

        this.experience = new Experience()

        this.scene = this.experience.scene

        this.boxes = []

        this.charBoundingBox = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3())
        this.charBoundingBox.setFromObject(character.mesh)

        let boxHelper = new THREE.Box3Helper(this.charBoundingBox, 0xffff00)
        // this.experience.scene.add(boxHelper)

        this.targets.forEach(target => {
            // create boundingBox
            let boundingBox = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3())
            boundingBox.setFromObject(target.mesh)

            this.boxes.push(boundingBox)

            // ss
        });

        
    }

    update() {
        // move bounding box
        this.charBoundingBox.copy(this.character.geometry.boundingBox).applyMatrix4(this.character.mesh.matrixWorld)

        this.boxes.forEach((target, index) => {

            if(this.charBoundingBox.intersectsBox(target)) {
                
                this.scene.remove(this.targets[index].mesh)
                this.targets.splice(index, 1)
                

                // rimuovo il bounding box
                this.boxes.splice(index, 1)

                this.trigger('plusOne')
            }
        })
    }
}