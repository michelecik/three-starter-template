import * as THREE from 'three'
import { DirectionalLightHelper } from 'three'
import Experience from '../Experience.js'

export default class Environment
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // Setup
        this.setSunLight()
        this.setBackLight()
        this.setHelpers()
        this.setEnvironmentMap()
    }

    setSunLight()
    {
        this.sunLight = new THREE.DirectionalLight('#ffffff', 1)
        this.sunLight.castShadow = true
        this.sunLight.position.set(10, 10, 0)
        this.sunLight.lookAt(this.experience.world)
        this.scene.add(this.sunLight)
    }

    setBackLight() {
        this.backlight = new THREE.DirectionalLight('#ffffff', 1)
        // this.backlight.castShadow = true
        this.backlight.position.set(-10,5,10)
        this.scene.add(this.backlight)
    }

    setHelpers() {
        this.helpers = [this.sunLight,this.backlight]

        this.helpers.forEach(light => {
            const helper = new DirectionalLightHelper(light, 3, '#ff0000')

            // this.scene.add(helper)
        })
    }

    setEnvironmentMap()
    {
        this.environmentMap = {}
        this.environmentMap.intensity = .01
        this.environmentMap.texture = this.resources.items.environmentMapTexture
        
        // this.environmentMap.texture.encoding = THREE.sRGBEncoding
        
        this.scene.environment = this.environmentMap.texture
        
        this.environmentMap.updateMaterials = () =>
        {
            this.scene.traverse((child) =>
            {
                if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
                {
                    child.material.envMap = this.environmentMap.texture
                    child.material.envMapIntensity = this.environmentMap.intensity
                    child.material.needsUpdate = true
                }
            })
        }
        this.environmentMap.updateMaterials()
    }
}