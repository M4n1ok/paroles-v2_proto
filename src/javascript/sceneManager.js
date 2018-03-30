import StorageInstance from './storage.js'

// Librairies
import { Scene, PerspectiveCamera, WebGLRenderer } from 'three'

//Utils
import Loader from './utils/loader'

// Components
import Slider from './components/slider'

const PATH = '../assets/'

const DATA  = [
  {
    id: 1,
    title: 'entre l\'enfer et le paradis',
    images: {
      background: PATH + 'proto_01_2.png',
      foreground: PATH + 'proto_01_1.png'
    },
    colors: {
      background: 'rgba(128, 234, 71, 0.81)',
      controls: '343434'
    },
    type: 1,
    strength: 1,
    divideTime: 1
  },
  {
    id: 2,
    title: 'Après l\'effort, sans réconfort',
    images: {
      background: PATH + 'proto_02_2.png',
      foreground: PATH + 'proto_02_1.png'
    },
    colors: {
      background: '#ff5716',
      controls: '343434'
    },
    type: 0,
    strength: 0.5,
    divideTime: 2
  },
  {
    id: 3,
    title: 'La splendeur du carnaval',
    images: {
      background: PATH + 'proto_03_2.png',
      foreground: PATH + 'proto_03_1.png'
    },
    colors: {
      background: '#484228fc',
      controls: '343434'
    },
    type: 0,
    strength: 0.5,
    divideTime: 3
  }
]

class SceneManager {

  constructor () {
    this._el = document.querySelector('.main-container')
    this.scene = new Scene()
    this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

    StorageInstance.scene = this.scene
    StorageInstance.camera = this.camera


    this.renderer = new WebGLRenderer({antialias: true, alpha: true})
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setClearColor(0x000000, 0)
    this._el.insertBefore(this.renderer.domElement, this._el.children[1])
    this.classInit = true
    this.init()
  }

  init () {

    const LOADS = []
    DATA.forEach((item) => {
      LOADS.push(Loader.loadImage(item.images.background))
      LOADS.push(Loader.loadImage(item.images.foreground))
    })
    Promise.all(LOADS).then((e) => {
      this.slider = new Slider(e, DATA)
    })

  }

  update () {

    if (this.slider) this.slider.update()
    this.renderer.render(this.scene, this.camera)
  }

}

export default SceneManager
