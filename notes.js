module.exports = {

  nextId: 1,

  collection: [],

  getAll() {
    return Promise.resolve(this.collection.slice())
  },

  getOne(id) {
    const get = this.collection.filter(obj => {
      return obj.id == id
    })
    if (get.length) return Promise.resolve(get)
    else return Promise.resolve(false)
  },

  addOne(newNote) {
    const note = Object.assign({}, newNote, {
      id: this.nextId++,
      timestamp: new Date().toJSON()
    })
    this.collection.push(note)
    return Promise.resolve(note)
  },

  updateOne(updateNote, id) {
    for (let i = 0; i < this.collection.length; i++) {
      if (this.collection[i].id == id) {
        this.collection[i].note = updateNote.note

        const note = Object.assign({}, updateNote, {
          id: this.collection[i].id,
          timestamp: this.collection[i].timestamp
        })
        return Promise.resolve(note)
      }

    }
    return Promise.resolve(false)
  },

  delete(id) {
    for (let i = 0; i < this.collection.length; i++) {
      if (this.collection[i].id == id) return Promise.resolve(this.collection.splice(i, 1))
    }
    return Promise.resolve(false)
  }

}
