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

heroes.get('/search/:term', async (req, res) => {
  try {
    const searchList = await Hero.find({
      name: new RegExp(req.params.term, 'i')
    })
    res.json({
      status: 'success',
      result: searchList
    })
  } catch (error) {
    res.status(400).json({
      status: 'failure',
      message: error.message
    })
  }
})

// GET: get one hero by its ID
heroes.get('/:heroId([0-9,a-f]*)', async (req, res) => {
  const hero = await Hero.findById({ _id: req.params.heroId })
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
heroes.put('/:heroId([0-9,a-f]*)', async (req, res) => {
  try {
    const hero = await Hero.findOneAndUpdate({ _id: req.params.heroId }, req.body, { new: true })
    res.json({
      status: 'success',
      result: hero
    })
  } catch(error) {
    res.status(400).json({
      status: 'failure',
      message: error.message
    })
  }
})

// DELETE: remove an existing hero by ID
heroes.delete('/:heroId([0-9,a-f]*)', async (req, res) => {
  try {
    const hero = await Hero.findOneAndRemove({ _id: req.params.heroId })
    if (hero === null) throw new Error('Item does not exist')
    res.status(204).json()
  } catch(error) {
    res.status(400).json({
      status: 'failure',
      message: error.message
    })
  }
})

export default heroes
