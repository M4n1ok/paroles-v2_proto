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
      background: PATH + 'art1.jpg',
      foreground: ''
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
      background: PATH + 'art2.jpg',
      foreground: ''
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
      background: PATH + 'art3.jpg',
      foreground: ''
    },
    colors: {
      background: 'FCFCFC',
      controls: '343434'
    }
  }
]

class SceneManager {

  constructor () {
    this.scene = new Scene()
    this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

    StorageInstance.scene = this.scene
    StorageInstance.camera = this.camera

    this.renderer = new WebGLRenderer({antialias: true})
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setClearColor(0xFCFCFC)
    document.body.appendChild(this.renderer.domElement)

    this.classInit = true
    this.init()
  }

  init () {

    const LOADS = []
    DATA.forEach((item) => {
      LOADS.push(Loader.loadImage(item.images.background))
    })
    Promise.all(LOADS).then((e) => {
      this.slider = new Slider(e)
    })

  }

  update () {

    if (this.slider) this.slider.update()
    this.renderer.render(this.scene, this.camera)
  }

}

export default SceneManager
