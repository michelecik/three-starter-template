import * as THREE from 'three'
import EventEmitter from './EventEmitter';
import Time from "./Time";

export default class PhyTime extends EventEmitter {
    constructor() {
        super()
        this.clock = new THREE.Clock()
        this.oldElapsedTime = 0
        
        this.tick()
    }


    tick() {
        const elapsedTime = this.clock.getElapsedTime()
        const deltaTime = elapsedTime - this.oldElapsedTime
        this.oldElapsedTime = elapsedTime

        this.trigger('tick')

        window.requestAnimationFrame(() => {
            this.tick()
        })
    }

}