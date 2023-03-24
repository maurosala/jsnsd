const supertest = require('supertest')

const app = require('../app')
const request = supertest(app)

describe('GET /', () => {
  it('should respond with a 200 status code', (done) => {
    request.get('/').expect(200, done)
  })

  it('should respond with a "Hello, World!" message', (done) => {
    request.get('/').expect('Hello, World!', done)
  })
})

describe('POST /', () => {
  it('should respond with a 200 status code', (done) => {
    request
      .post('/')
      .send({ name: 'mauro' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done)
  })

  it('should respond with a "Hello, World!" message', (done) => {
    request
      .post('/')
      .send({ name: 'me' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect({ message: 'Hello, World!' }, done)
  })

  it('should respond with a 400 status code', (done) => {
    request
      .post('/')
      .send({ foo: 'bar' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400, done)
  })
})

describe('DELETE /', () => {
  it('should respond with a 401 status code', (done) => {
    request.delete('/').expect(401, done)
  })
})

describe('PUT /', () => {
  it('should respond with a 200 status code', (done) => {
    request.put('/').expect(200, done)
  })

  it('should respond with a "not implemented yet" message', (done) => {
    request.put('/').expect('not implemented yet', done)
  })
})
