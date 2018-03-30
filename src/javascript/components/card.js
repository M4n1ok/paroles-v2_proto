// Librairies
import { PlaneBufferGeometry, MeshBasicMaterial, Mesh, DoubleSide, Vector3, Texture, RepeatWrapping, RawShaderMaterial } from 'three'

// Utils
import M from '../utils/math'

//components
import StorageInstance from '../storage'

import fBasic from "../../shaders/basic.frag"
import vBasic from "../../shaders/basic.vert"

class Card {

  constructor (option) {
    this.id = option.id
    this.title = option.title
    this.option = option
    this.classInit = true
    this.offset = 0
    this.init()
  }

  init () {
    this.background = new Texture(this.option.background)
    this.background.wrapS = RepeatWrapping
    this.background.wrapT = RepeatWrapping
    this.background.repeat.set(1, 1)

    this.foreground = new Texture(this.option.foreground)
    this.foreground.wrapS = RepeatWrapping
    this.foreground.wrapT = RepeatWrapping
    this.foreground.repeat.set(1, 1)

    var geometry = new PlaneBufferGeometry(2, 2, 1)
    this.material = new RawShaderMaterial({

      uniforms: {
        background: { type: 't', value: this.background },
        foreground: { type: 't', value: this.foreground },
        offset: { type: 'f', value: this.offset / 200},
        time: { type: 'f', value: StorageInstance.time },
        affect: { type: 'f', value: 1 },
        strength: { type: 'f', value: 1 }
      },
      vertexShader: vBasic,
      fragmentShader: fBasic,

    });
    this.background.needsUpdate = true
    this.foreground.needsUpdate = true
    this.object = new Mesh(geometry, this.material)

    if (this.option.direction == 'horizontal') {
      let value = (this.option.idx * (M.TanDeg(75) * (window.innerWidth / window.innerHeight))) / 2
      this.object.position.set(value, 0, 0)
    } else {
      let value = (this.option.idx * (M.TanDeg(75))) / 2
      this.object.position.set(0, value, 0)
    }

    this.object.scale.set(this.option.scaleX, this.option.scaleY, 1)
  }

  update () {
  }
}

export default Card
