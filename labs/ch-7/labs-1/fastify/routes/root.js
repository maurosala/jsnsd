'use strict'

const got = require('got')
const { BOAT_SERVICE_PORT = 3333, BRAND_SERVICE_PORT = 3334 } = process.env

const boatSrv = `http://localhost:${BOAT_SERVICE_PORT}`
const brandSrv = `http://localhost:${BRAND_SERVICE_PORT}`

module.exports = async function (fastify, opts) {
  fastify.get('/:id', async function (request, reply) {
    const { id } = request.params

    try {
      const boat = await got(`${boatSrv}/${id}`, {
        timeout: {
          request: 1250
        },
        retry: {
          limit: 0
        }
      }).json()
      const brand = await got(`${brandSrv}/${boat?.brand}`, {
        timeout: {
          request: 1250
        },
        retry: {
          limit: 0
        }
      }).json()

      reply.send({
        id: boat?.id,
        color: boat?.color,
        brand: brand?.name
      })
    } catch (err) {
      if (err?.response?.statusCode === 404) {
        reply.code(404).send({ message: 'not found' })
        return
      }

      if (err?.response?.statusCode === 400) {
        reply.code(400).send({ message: 'bad request' })
        return
      }
      reply.code(500).send({ message: 'internal server error' })
    }
  })
}
