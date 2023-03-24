'use strict'

const { promisify } = require('util')
const { boat } = require('../../model')

const read = promisify(boat.read)
const create = promisify(boat.create)

module.exports = async function (fastify, opts) {
  fastify.get('/:id', async function (request, reply) {
    const { id } = request.params

    try {
      return await read(id)
    } catch (err) {
      if (err.message === 'not found') {
        throw fastify.httpErrors.notFound()
      }
      throw err
    }
  })

  fastify.post('/', async function (request, reply) {
    const { data } = request.body

    reply.code(201)
    return { id: await create(boat.uid(), data) }
  })
}
