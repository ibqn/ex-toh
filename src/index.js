import http from 'http'
import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import config from './config.json'
import api from './routes/api'
// import bluebird from 'bluebird'


const app = express()
app.server = http.createServer(app)

app.use(morgan('dev'))

mongoose.connect('mongodb://localhost/heroes', { useMongoClient: true })
mongoose.Promise = global.Promise
// mongoose.Promise = bluebird

const db = mongoose.connection
db.on('error', console.log.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('successfully connected to the mondodb server')
})

app.use(bodyParser.json({
	limit: config.bodyLimit
}))

app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    result: `Express js is running on port ${config.port}`
  })
})

app.use('/api', api)

app.server.listen(process.env.PORT || config.port, () => {
  console.log(`Started on port ${app.server.address().port}`)
})

export default app
