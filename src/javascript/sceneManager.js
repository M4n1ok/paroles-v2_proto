import StorageInstance from './storage.js'

// Librairies
import { Scene, PerspectiveCamera, WebGLRenderer } from 'three'

//Utils
import Loader from './utils/loader'

// Components
import Slider from './components/slider'

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

    Promise.all([
      Loader.loadImage('../assets/art1.jpg'),
      Loader.loadImage('../assets/art2.jpg'),
      Loader.loadImage('../assets/art3.jpg')
    ]).then((e) => {
      this.slider = new Slider(e)
    })

  }

  update () {

    if (this.slider) this.slider.update()
    this.renderer.render(this.scene, this.camera)
  }

}

export default SceneManager
