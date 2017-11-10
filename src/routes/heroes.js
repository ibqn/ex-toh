import { Router } from 'express'


const heroes = Router()

heroes.get('/', (req, res) => {
  res.json({
    status: 'success',
    result: 'GET result'
  })
})

export default heroes
