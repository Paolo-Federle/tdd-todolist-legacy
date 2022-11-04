class TodoList {
  constructor() {
    this.id = 0
    this.items = []
  }

  create(str) {
    this.id++
    const item = { id: this.id, text: str, status: 'incomplete', date: new Date().toDateString() }
    this.items.push(item)
    return item
  }

  showAll() {
    return this.items
  }

  setComplete(id) {
    const item = this.findBy(id)
    item.status = 'complete'
    return item
  }

  getByStatus(status) {
    return this.items.filter(item => item.status === status)
  }

  findBy(id) {
    const item = this.items.find(item => item.id === id)
    if (item === undefined) throw new Error('Item not found')
    return item
  }

  deleteBy(id) {
    const item = this.findBy(id)
    const index = this.items.indexOf(item)
    return this.items.splice(index, 1)[0]
  }

  showAllReduced() {
    if (this.items.length > 1) {
      for (let i = 0; i < this.items.length; i++) {
        this.items[i].text = this.items[i].text.substring(0, 20) + '...'
      }
      return this.items
    }
    return this.items
  }

  filterDay(day) {
    const item = this.items.filter((item) => item.date.includes(day))
    if (item === undefined) {
      return []
    }
    return item
  }

}

module.exports = TodoList
