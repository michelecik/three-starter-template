import * as THREE from 'three'
import Experience from "../Experience";
import Environment from './Environment';
import Floor from './Floor';
import Physics from './Physics/Physics'

export default class World {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.phyTime = this.experience.phyTime
        
        const axesHelper = new THREE.AxesHelper( 10 );
        this.scene.add( axesHelper );
        
        this.resources.on('ready', () => {    

            this.environment = new Environment()  
        })

        this.createFloor()
    }


    createFloor() {
        let floor = new Floor()
    }
}