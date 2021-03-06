import Emitter from './emitter'
import titleManagerEvent from './titleManagerEvents'
class EventManager {

  constructor () {
    this.mouseEventInformations = {
      clientX: null,
      clientY: null,
      x: null,
      y: null
    }
    this.slider = null
    this.classInit = true
    this.init()
  }

  init () {
    this.nextBtn = document.querySelector('.js-slideshow-next')
    this.prevBtn = document.querySelector('.js-slideshow-prev')
    this.initEvent()
  }

  initEvent () {
    window.addEventListener('mousemove', (e) => {
      this.mouseEventInformations.clientX = e.clientX
      this.mouseEventInformations.clientY = e.clientY
      this.mouseEventInformations.x = (((e.clientX) / window.innerWidth) - 0.5) * 2
      this.mouseEventInformations.y = (((e.clientY) / window.innerHeight) - 0.5) * 2
      Emitter.emit(titleManagerEvent.skew, this.mouseEventInformations)
    })

    if (this.nextBtn) this.nextBtn.addEventListener('click', () => {
      if (this.slider) this.slider.nextSlide()
    })
    if (this.prevBtn) this.prevBtn.addEventListener('click', () => {
      if (this.slider) this.slider.prevSlide()
    })
  }
}

let evtManager = new EventManager()
export default evtManager
