const { expect } = require('chai')
const app = require('../index')
const request = require('request')

const PORT = 3000

describe('API Testing', () => {

  let server

  before(done => {
    server = app.listen(PORT, () => done())
  })

  after(() => {
    server.close()
  })

  describe('POST /notes', () => {
    it('Note should respond with the proper status code (201) and returns a new note', done => {
      const newNote = { note: 'Test note' }
      const options = { json: true, body: newNote }
      request.post(`http://localhost:${PORT}/notes`, options, (err, res, body) => {
        expect(err).to.be.null
        expect(res.statusCode).to.equal(201)
        expect(body).to.be.an.instanceOf(Object)
        expect(body).to.have.property('id')
        expect(body).to.have.property('timestamp')
        done()
      })
    })
  })

  describe('GET /notes', () => {
    it('Getting all notes from the database as an array', done => {
      const options = { json: true }
      request.get(`http://localhost:${PORT}/notes`, options, (err, res, body) => {
        expect(err).to.be.null
        expect(res.statusCode).to.equal(200)
        expect(body).to.be.an.instanceOf(Array)
        done()
      })
    })
  })

  describe('GET /notes/:id', () => {
    const options = { json: true }

    it('Getting a single note by id', done => {
      request.get(`http://localhost:${PORT}/notes/1`, options, (err, res, body) => {
        expect(err).to.be.null
        expect(res.statusCode).to.equal(200)
        expect(body).to.be.an.instanceOf(Object)
        done()
      })
    })
    it('Attempting to get a note that does not exist', done => {
      request.get(`http://localhost:${PORT}/notes/200`, options, (err, res, body) => {
        expect(err).to.be.null
        expect(res.statusCode).to.equal(404)
        done()
      })
    })
  })

  describe('PUT /notes/:id', () => {
    const newNote = { note: 'Updated note' }
    const options = { json: true, body: newNote }

    it('Updates a note by id', done => {
      request.put(`http://localhost:${PORT}/notes/1`, options, (err, res, body) => {
        expect(err).to.be.null
        expect(res.statusCode).to.equal(200)
        expect(body).to.be.an.instanceOf(Object)
        done()
      })
    })
    it('Attempting to update a note that does not exist', done => {
      request.put(`http://localhost:${PORT}/notes/200`, options, (err, res, body) => {
        expect(err).to.be.null
        expect(res.statusCode).to.equal(204)
        done()
      })
    })
  })

  describe('DELETE /notes/:id', () => {
    const options = { json: true }

    it('Deletes notes based on its id', done => {
      request.del(`http://localhost:${PORT}/notes/1`, options, (err, res, body) => {
        expect(err).to.be.null
        expect(res.statusCode).to.equal(200)
        expect(body).to.be.an.instanceOf(Array)
        done()
      })
    })
    it('Attempting to delete a note that does not exist', done => {
      request.del(`http://localhost:${PORT}/notes/200`, options, (err, res, body) => {
        expect(err).to.be.null
        expect(res.statusCode).to.equal(404)
        done()
      })
    })
  })

})
