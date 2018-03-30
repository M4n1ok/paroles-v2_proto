import StorangeInstance from '../storage'
import EventManager from '../events/eventManager'

//Libraires
import { TweenMax } from 'gsap'
import { Object3D, Vector3 } from 'three'
import { vec3 } from 'gl-matrix'

// Utils
import M from '../utils/math'

// Components
import Card from './card'
import TitleManager from './titleManager'

class Slider {

  constructor (e, datas) {

    // FAKE DATAS
    this.nCards = datas.length
    this.cardsData = datas
    this.imgs = e
    this.time = null
    this.titleManager = TitleManager
    this.toDirection = 0
    this.maxDeg = 2
    this.position = vec3.create()
    this.object = new Object3D()
    this.cards = []
    this.classInit = true
    this.currentIndex = 0
    this.currentCard = null
    this.init()
  }

  set x (v) {
    this.position[0] = v
    this.needUpdate = true
    if (this.object) this.object.position.set(this.position[0], this.position[1], this.position[2])
  }

  get x () { return this.position[0] }

  set y (v) {
    this.position[1] = v
    this.needUpdate = true
    if (this.object) this.object.position.set(this.position[0], this.position[1], this.position[2])
  }

  get y () { return this.position[1] }

  set z (v) {
    this.position[2] = v
    this.needUpdate = true
    if (this.object) this.object.position.set(this.position[0], this.position[1], this.position[2])
  }

  get z () { return this.position[2] }

  nextSlide () {
    this.currentIndex++
    this.toDirection -= M.TanDeg(75) / 2 * (window.innerWidth / window.innerHeight)

    if (this.currentIndex >= this.cards.length) {
      const card = this.cards[0]
      card.object.position.setX(this.cards[this.cards.length - 1].object.position.x + M.TanDeg(75) / 2 * (window.innerWidth / window.innerHeight))
      this.cards.splice(0, 1)
      this.cards.push(card)
      this.currentIndex--
    }

    this.currentCard = this.cards[this.currentIndex]
    this.updateCardTitle()
    this.titleManager._hide()
    this.time = new Date().getTime() + (0.5 * 1000)
    let to = (this.time - new Date().getTime()) / 1000
    TweenMax.to(this, to, {ease: Expo.easeOut, x: this.toDirection})
  }

  prevSlide () {
    this.currentIndex--
    this.toDirection += M.TanDeg(75) / 2 * (window.innerWidth / window.innerHeight)

    if (this.currentIndex <= 0) {
      const card = this.cards[this.cards.length - 1]
      card.object.position.setX(this.cards[0].object.position.x - M.TanDeg(75) / 2 * (window.innerWidth / window.innerHeight))
      this.cards.pop()
      this.cards.unshift(card)
      this.currentIndex++
    }

    this.currentCard = this.cards[this.currentIndex]
    this.updateCardTitle()
    this.titleManager._hide()
    this.time = new Date().getTime() + (0.5 * 1000)
    let to = (this.time - new Date().getTime()) / 1000
    TweenMax.to(this, to, {ease: Expo.easeOut, x: this.toDirection})
  }

  updateCardTitle() {
    this.titleManager.title = this.currentCard.title
  }

  init () {
    EventManager.slider = this
    this.constructSlider()
  }

  constructSlider () {

    let option = {
      idx: null,
      scaleX: 1,
      scaleY: 1,
      offset: 1,
      direction: 'horizontal',
      background: null,
      foreground: null
    }

    let scaleX = (window.innerWidth / window.innerHeight) * M.TanDeg(75 / 2) * 0.80
    let scaleY = M.TanDeg(75 / 2) * 0.80

    option.scaleX = scaleX
    option.scaleY = scaleY

    let y = 0;
    for (let i = 0; i < this.nCards; i++) {
      option.idx = i
      option.background = this.imgs[y]
      option.foreground = this.imgs[y + 1]

      option.id = this.cardsData[i].id
      option.title = this.cardsData[i].title

      let card = new Card(option)
      this.cards.push(card)
      this.object.add(card.object)

      y += 2

      if(i === 0) {
        this.titleManager.title = card.title
        const TIMEOUT = window.setTimeout(() => {
          this.titleManager._show()
        }, 1000)
      }
    }

    StorangeInstance.scene.add(this.object)
    this.z = -1
  }

  update () {

    for (let i = 0; i < this.nCards; i++) {
      if (this.cards[i].material && EventManager.mouseEventInformations.x){
        this.cards[i].object.material.uniforms.offset.value = EventManager.mouseEventInformations.x / 200
        this.cards[i].object.material.uniforms.time.value = StorangeInstance.time
        //console.log(this.cards[i].object.material.uniforms.offset.value);
      }
      this.cards[i].object.rotation.set(EventManager.mouseEventInformations.y * M.degreesToRads(this.maxDeg), EventManager.mouseEventInformations.x * M.degreesToRads(this.maxDeg), 0)
    }
    this.needUpdate = false
  }

}

export default Slider
