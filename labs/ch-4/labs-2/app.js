const express = require('express')
const stream = require('./stream')

const app = express()

app.get('/data', async (req, res) => {
  res.type('text/html')
  stream().pipe(res)
})

module.exports = app
