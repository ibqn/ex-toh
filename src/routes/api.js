import { Router } from 'express'
import heroes from './heroes'


const api = Router()

api.use('/heroes', heroes)

export default api
