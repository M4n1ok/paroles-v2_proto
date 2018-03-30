class Storage {

  constructor () {
    this.toUpdate = []
    this.cache = {}
    this.toLoaded = 0
    this.isLoaded = 0
    this.mode = 0
    this.progress = 0
    this.time = 0
    this.scene = null

    this.event = document.createEvent('Event')
    this.event.initEvent('elmtsLoaded', true, true)

  }

  addToUpdate (obj) {
    let emptySlotIdx = null
    for (let i = 0; i < this.toUpdate.length; i++) {
      if (emptySlotIdx == null && this.toUpdate[i] == null) emptySlotIdx = i
      if (this.toUpdate[i] == obj) return
    }
    if (emptySlotIdx != null) this.toUpdate[emptySlotIdx] = obj
    else this.toUpdate.push(obj)
  }

  removeToUpdate (obj) {
    for (let i = 0; i < this.toUpdate.length; i++) {
      if (this.toUpdate[i] == obj) this.toUpdate[i] = null
    }
  }

  addLoaded (v) {
    this.isLoaded += v
    InterfaceManager.loadingProgress(this.isLoaded / this.toLoaded)
    if (this.isLoaded == this.toLoaded) document.dispatchEvent(this.event)
  }

}

let StorageInstance = new Storage()
export default StorageInstance
