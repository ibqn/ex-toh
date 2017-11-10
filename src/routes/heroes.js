import { Router } from 'express'
import { Hero } from '../models/hero'


const heroes = Router()

// GET all heroes
heroes.get('/', async (req, res) => {
  const heroesList = await Hero.find({})
  res.json({
    status: 'success',
    result: heroesList
  })
})

// GET: get one hero by its ID
heroes.get('/:heroId', async (req, res) => {
  const hero = await Hero.findById(req.params.heroId)
  res.json({
    status: 'success',
    result: hero
  })
})

// POST: add new hero
heroes.post('/', async (req, res) => {
  try {
    const hero = new Hero(req.body)
    const savedHero = await hero.save()
    res.status(201).json({
      status: 'success',
      result: savedHero
    })
  } catch(error) {
    res.status(400).json({
      status: 'failure',
      message: error.message
    })
  }
})

// PUT: update an existing hero by ID
heroes.put('/:heroId', async (req, res) => {
  const hero = await Hero.findOneAndUpdate(req.params.heroId, req.body, { new: true })
  res.json({
    status: 'success',
    result: hero
  })
})

export default heroes
