const express = require('express')

const app = express()

app.get('/', async (req, res) => {
  res.status(200).send()
})

app.post('/', (req, res) => {
  res.status(405).send()
})

module.exports = app
