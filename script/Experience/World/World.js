import * as THREE from 'three'
import Experience from "../Experience";
import Environment from './Environment';
import Floor from './Floor';
import Ball from './Ball';
import Physics from './Physics/PhyWorld'
import Pin from './Pin';
import Wall from './Wall';
import Player from './Player';
import Cube from './Cube';
import Basket from './Basket';

import colors from '../colors';

export default class World {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.phyTime = this.experience.phyTime
        
        const axesHelper = new THREE.AxesHelper( 10 );
        // this.scene.add( axesHelper );

        window.addEventListener('keypress', (e) => {
            console.log(e.code)
            switch(e.code) {
                case 'Enter':
                    this.createBall()
                    this.setPlayer()
            }
        })

        this.resources.on('ready', () => {    
            this.environment = new Environment()  
        })

        this.player = new Player()

        this.balls = []

        this.createFloor()
        // this.createWalls()
        this.createBall()
        this.createBasket()
        this.setPlayer()
    }


    createFloor() {
        let floor = new Floor()
    }

    createWalls() {
        let wall_1 = new Wall({x:0, y:3, z:-5})
        let wall_2 = new Wall({x:0, y:3, z:5})
        let wall_3 = new Wall({x:5, y:3, z:0}, true)
        let wall_4 = new Wall({x:-5, y:3, z:0}, true)
    }

    createBall() {
        let ball = new Ball()
        this.balls.push(ball)
    }

    setPlayer() {
        let selectedBall = this.balls[this.balls.length - 1]

        this.balls.forEach(ball => {
            ball.mesh.material.color = new THREE.Color(colors.character)
        });

        // TODO: SHADER QUI
        selectedBall.mesh.material.color = new THREE.Color(colors.characterActive)
        
        this.player.assign(selectedBall)
        
    }
    
    createBasket() {
        this.basket = new Basket()
    }
}