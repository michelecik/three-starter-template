import * as THREE from 'three'
import Experience from "../Experience";
import Environment from './Environment';
import Floor from './Floor';
import Ball from './Ball';
import Physics from './Physics/PhyWorld'
import Pin from './Pin';
import Wall from './Walls/Wall';
import Walls from './Walls/Walls';
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
        
        this.resources.on('ready', () => {    
            this.environment = new Environment()  
        })

        window.addEventListener('keypress', (e) => {
            switch(e.code) {
                case 'Enter':
                    this.createBall()
                    this.setPlayer()
            }
        })

        this.player = new Player()

        this.balls = []

        this.createFloor()
        this.createBall()
        this.createBasket()
        this.setPlayer()
    }


    createFloor() {
        let floor = new Floor()
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