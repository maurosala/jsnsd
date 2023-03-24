const express = require('express')

const app = express()
const data = require('./data')

app.use('/', async (req, res) => {
  if (req.path !== '/') return res.status(404).send('Not found')

  res.status(200).send(await data())
})

module.exports = app
