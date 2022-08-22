export default class Controller {
    constructor(controllable) {
        this.controllable = controllable

        window.addEventListener('keypress', (e) => {
            switch(e.code) {
                case 'KeyW':
                    this.controllable.moveForward()
                    break
                case 'KeyS':
                    this.controllable.moveBack()
                    break
                case 'KeyD':
                    this.controllable.moveLeft()
                    break
                case 'KeyA':
                    this.controllable.moveRight()
                    break
                case 'Space':
                    this.controllable.jump()
                    break
                case 'KeyR':
                    this.controllable.reset()
            }
        })
    }
}