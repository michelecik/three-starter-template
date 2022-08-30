import * as THREE from 'three'
import * as CANNON from "cannon-es"
import Camera from './Camera'
import Renderer from './Renderer'
import World from './World/World'
import Sizes from "./Utils/Sizes"
import Time from "./Utils/Time"
import Resources from './Utils/Resources'
import sources from './sources.js'
import PhyTime from './Utils/PhyTime'
import PhyWorld from './World/Physics/PhyWorld'

let instance = null

export default class Experience {

    constructor(canvas) {

        if(instance) {
            return instance
        }

        instance = this

        window.experience = this

        this.canvas = canvas

        // setup
        this.sizes = new Sizes()
        this.time = new Time()
        this.phyTime = new PhyTime()
        this.scene = new THREE.Scene()
        
        // this.phyWorld = new CANNON.World()

        // this.phyWorld.gravity.set(0, -9.8, 0)

        this.phyWorld = new PhyWorld()

        this.camera = new Camera()
        this.renderer = new Renderer()        
        this.resources = new Resources(sources)

        this.world = new World()
        
        // resize event
        this.sizes.on('resize', () => {
            this.resize()
        })

        this.time.on('tick', () => {
            this.update()
        })
    }

    resize() {
        this.camera.resize()
        this.renderer.resize()
    }

    update() {
        if (this.collisionManager) this.collisionManager.update()
        
        this.phyWorld.update()
        this.camera.update()
        this.renderer.update()
    }
}