'use strict'

const data = require('../data')

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    reply.type('text/plain')
    return await data()
  })
}
