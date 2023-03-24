'use strict'
const express = require('express')
const app = express()
const router = express.Router()

app.use(express.json())

router.get('/', (req, res) => {
  if (req.params.name === 'mauro') {
    res.status(200).send('Hello, Mauro!')
  }

  res.status(200).send('Hello, World!')
})

router.post('/', (req, res) => {
  const { name } = req.body

  if (!name) {
    return res.status(400).json({ message: 'Missing name' })
  }

  res.status(200).json({ message: 'Hello, World!' })
})

router.delete('/', (req, res) => {
  res.status(401).send()
})

router.put('/', (req, res) => {
  res.status(200).send('not implemented yet')
})

app.use(router)

module.exports = app
