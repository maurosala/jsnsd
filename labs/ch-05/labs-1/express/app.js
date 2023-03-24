const express = require('express')

const boat = require('./model').boat

const app = express()

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

app.use((_req, res) => {
  res.status(404).json({ message: 'not found' })
})

module.exports = app
