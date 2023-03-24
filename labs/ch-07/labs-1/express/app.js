const express = require('express')
const got = require('got')

const app = express()
app.use(express.json())

const { BOAT_SERVICE_PORT = 3333, BRAND_SERVICE_PORT = 3334 } = process.env

const boatSrv = `http://localhost:${BOAT_SERVICE_PORT}`
const brandSrv = `http://localhost:${BRAND_SERVICE_PORT}`

app.get('/:id', async (req, res, next) => {
  const { id } = req.params

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

    res.json({
      id: boat?.id,
      color: boat?.color,
      brand: brand?.name
    })
  } catch (err) {
    if (err?.response?.statusCode === 404) {
      next()
      return
    }

    if (err?.response?.statusCode === 400) {
      const badRequest = new Error('bad request')
      badRequest.status = 400

      next(badRequest)
      return
    }

    res.status(500).send({ message: 'internal server error' })
  }
})

// app.use((_req, res) => {
//   res.status(404).json({ message: 'not found' })
// })

// app.use((err, _req, res, _next) => {
//   res.status(err.status ?? 500).json({
//     status: err.status ?? 500,
//     code: err?.code,
//     message: err.message ?? 'internal server error'
//   })
// })

module.exports = app
