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
    title: 'Témoignage 1',
    images: {
      background: PATH + 'proto_01_2.png',
      foreground: PATH + 'proto_01_1.png'
    },
    colors: {
      background: 'FCFCFC',
      controls: '343434'
    }
  },
  {
    id: 2,
    title: 'Témoignage 2',
    images: {
      background: PATH + 'proto_02_2.png',
      foreground: PATH + 'proto_02_1.png'
    },
    colors: {
      background: 'FCFCFC',
      controls: '343434'
    }
  },
  {
    id: 3,
    title: 'Témoignage 3',
    images: {
      background: PATH + 'proto_03_2.png',
      foreground: PATH + 'proto_03_1.png'
    },
    colors: {
      background: 'FCFCFC',
      controls: '343434'
    }
  }
]

class SceneManager {

  constructor () {
    this._el = document.querySelector('.main-container')
    this.scene = new Scene()
    this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

    StorageInstance.scene = this.scene
    StorageInstance.camera = this.camera


    this.renderer = new WebGLRenderer({antialias: true})
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setClearColor(0xFCFCFC)
    this._el.insertBefore(this.renderer.domElement, this._el.firstChild)
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
