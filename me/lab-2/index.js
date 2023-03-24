const express = require('express')

const app = express()

app.use('/', async (req, res) => {
  if (req.path !== '/') return res.status(404).send('Not found')

  res.status(200).json({ message: 'Hello World' })
})

const PORT = 3000

app.listen(PORT)
