import { observable } from 'mobx'

class UI {
  @observable modal = null
  @observable menu = false

  displayMenu () {
    this.menu = true
  }

  dismissMenu () {
    this.menu = false
  }

  dismissModal () {
    this.modal = null
  }

  displayModal (content) {
    this.modal = content
  }
}

const ui = new UI()
export default ui
