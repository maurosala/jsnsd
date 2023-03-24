const express = require('express')
const path = require('path')
var hbs = require('express-hbs')

const app = express()
app.engine(
  'hbs',
  hbs.express4({
    partialsDir: __dirname + '/public'
  })
)
// app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'hbs')
app.set('views', __dirname + '/public')

app.get('/me', async (req, res) => {
  res.render('./layout.hbs')
})

module.exports = app
