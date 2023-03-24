'use strict'

const stream = require('../stream')

module.exports = async function (fastify, opts) {
  fastify.get('/data', async function (request, reply) {
    return stream()
  })
}
