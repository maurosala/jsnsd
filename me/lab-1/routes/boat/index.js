'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    return 'boat index'
  })

  fastify.get('/:id', async function (request, reply) {
    return request.params.id + ' boat'
  })
}
