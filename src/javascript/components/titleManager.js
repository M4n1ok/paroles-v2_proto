import Emitter from '@/javascript/events/emitter'
import titleManagerEvents from '@/javascript/events/titleManagerEvents'
import { TweenMax, CSSPlugin } from 'gsap'

class TitleManager {
  constructor () {
    this._title = ''
    this._el = document.querySelector('.js-slideshow-title')
    this._visible = false
    this._activeSkew = false
    this._maxDeg = 1
    this._init()
    this._registerEvent()
  }

  _init() {
    this._initBeforeEnterUI()
  }

  get title() {
    return this._title
  }

  set title(title) {
    this._title = title
  }

  _registerEvent() {
    Emitter.on(titleManagerEvents.show, () => {
      this._show()
    })
    Emitter.on(titleManagerEvents.hide, () => {
      this._hide()
    })
    Emitter.on(titleManagerEvents.skew, (event) => {this._skew(event)})
  }

  _initBeforeEnterUI() {
    TweenMax.set(this._el, {y: -65, opacity: 0})
  }

  _show() {
    this._el.innerText = this._title
    let tweenOpts = {}
    tweenOpts.ease = Expo.easeInOut
    tweenOpts.y = 0
    //tweenOpts.onComplete = this._toggleSkew
    TweenMax.to(this._el, 1.25, tweenOpts)
    TweenMax.to(this._el, 1.75, {ease: Expo.easeOut, opacity: 1, onComplete: () => {
      this._toggleSkew()
    }})
  }

  _toggleSkew() {
    this._activeSkew = !this._activeSkew
  }

  _hide() {
    let tweenOpts = {}
    tweenOpts.ease = Expo.easeInOut
    tweenOpts.y = 65
    //tweenOpts.onComplete = this._toggleSkew

    TweenMax.to(this._el, 0.55, tweenOpts)
    TweenMax.to(this._el, 0.65, {ease: Expo.easeOut, opacity: 0, onComplete: () => {
        this._toggleSkew()
        this._initBeforeEnterUI()
        const TimeOut = window.setTimeout(() => {
          this._show()
          window.clearTimeout(TimeOut)
        }, 1)
      }
    })
  }

  _skew (event) {
    if(!this._activeSkew) return
    TweenMax.to(this._el, 1, {ease: Expo.ease, skewY: -event.y * this._maxDeg + 'deg', skewX: event.x * this._maxDeg + 'deg', force3D: true})
  }
}

const instance = new TitleManager()

export default instance
