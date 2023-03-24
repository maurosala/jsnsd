const express = require('express')

const boat = require('./model').boat

const app = express()
app.use(express.json())

app.get('/boat/:id', async (req, res, next) => {
  boat.read(req.params.id, (err, r) => {
    if (err) {
      if (err.code === 'E_NOT_FOUND') {
        return res.status(404).json({})
      }
      return res.status(500).json({})
    }

    res.status(200).json(r)
  })
})

app.post('/boat', async (req, res, next) => {
  boat.create(boat.uid(), req.body.data, (err, id) => {
    if (err) return next(err)
    else res.status(201).json({ id })
  })
})

app.use((_req, res) => {
  res.status(404).json({ message: 'not found' })
})

app.use((err, _req, res, _next) => {
  res.status(err.status ?? 500).json({ message: 'internal server error' })
})

module.exports = app
