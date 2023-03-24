'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/me', async function (request, reply) {
    return reply.view('layout.hbs')
  })
}
