'use strict'

const { promisify } = require('util')
const { boat } = require('../../model')

const read = promisify(boat.read)
const del = promisify(boat.del)

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

  fastify.delete('/:id', async function (request, reply) {
    try {
      await del(request.params.id)
      reply.code(204)
    } catch (err) {
      if (err.message === 'not found') {
        throw fastify.httpErrors.notFound()
      }
      throw err
    }
  })
}
