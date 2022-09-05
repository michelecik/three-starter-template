import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import Experience from "../Experience";
import colors from '../colors';


export default class Basket {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.phyWorld = this.experience.phyWorld
        this.phyTime = this.experience.phyTime


        this.phyTime.on('tick', () => {
            this.update()
        })

        this.glass = {
            height: 1.5,
            width: 2,
            depth: .1
        }

        this.basket = {
            radius: .4,
            tube: .025 ,
            radialSegments: 10,
        }

        this.createBase()
        this.createBackboard()
        this.createBasket()
        this.createBody()
    }

    createBase() {
        
    }

    createBackboard() {
        this.backboardGeometry = new THREE.BoxGeometry(this.glass.width, this.glass.height, this.glass.depth)
        this.backboardMateral = new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
        })

        this.backboardMesh = new THREE.Mesh(this.backboardGeometry, this.backboardMateral)

        this.backboardMesh.receiveShadow = false

        this.backboardShape = new CANNON.Box(
            new CANNON.Vec3(this.glass.width/2, this.glass.height/2, this.glass.depth/2)
        )

        this.backboardBody = new CANNON.Body({
            shape: this.backboardShape,
            mass: 0,
            material: this.phyWorld.glassMaterial
        })

        this.backboardMesh.position.set(0,3,-4)

        this.backboardBody.position.copy(this.backboardMesh.position)

        this.scene.add(this.backboardMesh)
        this.phyWorld.instance.addBody(this.backboardBody)
    }

    createBasket() {
        // MESH
        this.basketGeometry = new THREE.TorusGeometry(this.basket.radius, this.basket.tube, this.basket.radialSegments, this.basket.radialSegments)
        this.basketMaterial = new THREE.MeshStandardMaterial({
            color: colors.coins,
            metalness: 1,
        })

        this.basketMesh = new THREE.Mesh(this.basketGeometry, this.basketMaterial)

        this.basketMesh.position.set(0,2.5,-3.5)
        this.basketMesh.rotateX(Math.PI / 2)


        // body
        this.basketShape = CANNON.Trimesh.createTorus(this.basket.radius, this.basket.tube, this.basket.radialSegments, this.basket.radialSegments)

        this.basketBody = new CANNON.Body({
            shape: this.basketShape,
            mass: 0,
            material: this.phyWorld.metalMaterial
        })

        this.basketBody.position.copy(this.basketMesh.position)
        this.basketBody.quaternion.copy(this.basketMesh.quaternion)

        this.scene.add(this.basketMesh)
        this.phyWorld.instance.addBody(this.basketBody)

    }


    createBody() {
        this.body = new CANNON.Body({
            mass: 1,
        })
        
    }

    update() {
        this.basketMesh.position.copy(this.basketBody.position)
        this.basketMesh.quaternion.copy(this.basketBody.quaternion)

        this.backboardMesh.position.copy(this.backboardBody.position)
        this.backboardMesh.quaternion.copy(this.backboardBody.quaternion)
    }
}