const { Router } = require('express')
const notes = require('./notes')

const router = new Router()

router.get('/', (req, res) => {
  notes
    .getAll()
    .then(notes => res.json(notes))
})

router.get('/:id', (req, res) => {
  notes
    .getOne(req.params.id)
    .then(note => {
      if (!note) res.sendStatus(404)
      else res.status(200).json(note)
    })
})

router.post('/', ({ body }, res) => {
  notes
    .addOne(body)
    .then(newNote => res.status(201).json(newNote))
})

router.put('/:id', (req, res) => {
  notes
    .updateOne(req.body, req.params.id)
    .then(updateNote => {
      if (!updateNote) res.sendStatus(204)
      else res.status(200).json(updateNote)
    })
})

router.delete('/:id', (req, res) => {
  notes
    .delete(req.params.id)
    .then(deleted => {
      if (!deleted) res.sendStatus(404)
      else res.status(200).json(deleted)
    })
})

module.exports = router
